# penny-agent/main.py
import os
import logging
import json # For parsing JSON from LLM output
import httpx # To call the MCP server
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import BaseModel, ValidationError
from typing import List, Dict, Any, Optional, Literal
from dotenv import load_dotenv
import re

# LangChain imports
from langchain_core.prompts import PromptTemplate
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = FastAPI()

# --- Configuration ---
LLM_SERVICE_URL = os.getenv("LLM_SERVICE_URL", "http://llm-service:8000")
PENNY_MCP_SERVER_URL = os.getenv("PENNY_MCP_SERVER_URL", "http://penny-mcp-server:8000") # NEW URL
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_BASE_URL = os.getenv("GROQ_BASE_URL")

# --- LLM Setup (connects to the llama.cpp server) ---
llm = ChatOpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key="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",
    temperature=0.0, # Lower temperature for better structured output for parsing
    model_name="deepseek-r1-distill-llama-70b"
)

# --- Mock Logging (Centralized in Penny Agent for this demo) ---
MOCK_LOGS = []

def log_request_response(userId: str, requestText: str, responseText: str, agentName: str, category: Optional[str] = None, urgency: Optional[str] = None):
    """Logs the request and response to a mock log."""
    log_entry = {
        "timestamp": str(os.getenv("CURRENT_TIME", "2025-06-09T12:00:00Z")),
        "userId": userId,
        "requestText": requestText,
        "responseText": responseText,
        "agentName": agentName,
        "category": category,
        "urgency": urgency
    }
    MOCK_LOGS.append(log_entry)
    logger.info(f"SYSTEM LOG ({agentName}): User: {requestText} -> Response: {responseText[:100]}...")


# --- Agent Functionality ---

# Simple in-memory conversation history (for demo only)
conversation_memory: Dict[str, List[Any]] = {}

def get_memory(user_id: str) -> List[Any]:
    return conversation_memory.setdefault(user_id, [])

def add_to_memory(user_id: str, message: Any):
    get_memory(user_id).append(message)

# --- MCP Client Models ---
class ToolCall(BaseModel):
    tool_name: str
    args: Dict[str, Any]

class ToolResult(BaseModel):
    tool_name: str
    result: Any
    status: Literal["success", "failure"]
    error_message: Optional[str] = None

# --- LangChain Chains (Penny's core logic) ---

PROMPT_FILE_PATH = os.path.join(os.path.dirname(__file__), "prompts", "penny_system_prompt.txt")

try:
    with open(PROMPT_FILE_PATH, "r", encoding="utf-8") as f:
        penny_system_prompt_content = f.read()
    print(f"Successfully loaded prompt from: {PROMPT_FILE_PATH}") # For debugging
except FileNotFoundError:
    error_message = f"CRITICAL ERROR: System prompt file not found at {PROMPT_FILE_PATH}. Application cannot start."
    logger.exception(error_message) # Logs the full traceback
    raise RuntimeError(error_message) # Re-raise as a RuntimeError to stop startup
except Exception as e:
    error_message = f"CRITICAL ERROR: Failed to load system prompt file '{PROMPT_FILE_PATH}': {e}. Application cannot start."
    logger.exception(error_message) # Logs the full traceback
    raise RuntimeError(error_message)

penny_agent_prompt_template = PromptTemplate.from_template(penny_system_prompt_content)

# --- MCP Client Logic (within Penny Agent) ---
async def call_mcp_server(tool_name: str, args: Dict[str, Any]) -> ToolResult:
    """Calls the Penny MCP Server to execute a tool."""
    logger.info(f"Penny: Attempting to call MCP Server for tool '{tool_name}' with args: {args}")
    payload = ToolCall(tool_name=tool_name, args=args).model_dump()
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(f"{PENNY_MCP_SERVER_URL}/mcp", json=payload)
            response.raise_for_status() # Raises HTTPStatusError for 4xx/5xx responses
            tool_result = ToolResult(**response.json())
            logger.info(f"Penny: Received tool result from MCP Server: {tool_result.status}")
            return tool_result
        except httpx.HTTPStatusError as e:
            logger.error(f"HTTP Error calling MCP Server: {e.response.status_code} - {e.response.text}")
            return ToolResult(tool_name=tool_name, result=None, status="failure", error_message=f"HTTP Error: {e.response.status_code} {e.response.text}")
        except httpx.RequestError as e:
            logger.error(f"Network Error calling MCP Server: {e}")
            return ToolResult(tool_name=tool_name, result=None, status="failure", error_message=f"Network Error: {e}")
        except ValidationError as e:
            logger.error(f"Pydantic validation error parsing MCP Server response: {e}")
            return ToolResult(tool_name=tool_name, result=None, status="failure", error_message=f"Invalid response from MCP Server: {e}")
        except Exception as e:
            logger.error(f"Unexpected error calling MCP Server: {e}", exc_info=True)
            return ToolResult(tool_name=tool_name, result=None, status="failure", error_message=f"Unexpected error: {e}")

# --- LangChain Runnable (This will now handle the Thought->Action->Observation->Answer cycle) ---
async def penny_agent_logic(input_data: Dict[str, Any]) -> str:
    human_input = input_data["human_input"]
    chat_history = input_data["chat_history"]
    user_id = input_data["user_id"]

    logger.info(f"[{user_id}] Starting penny_agent_logic for input: '{human_input}'")
    logger.info(f"[{user_id}] Current chat history (raw): {chat_history}")

    # Initialize variables for the loop
    current_llm_response_content = ""
    tool_observation = "No tool call was made or tool did not return an observation yet." # Initial default
    iteration_count = 0
    final_answer_text = ""
    
    # Track the ongoing conversation context for the LLM within the loop
    # This will be updated if a tool call leads to a refined thought/question from LLM
    cumulative_chat_context = "\n".join(chat_history)
    
    # To handle potential multiple tool calls, we'll append to observation list.
    # The prompt should be designed to handle multiple observations gracefully.
    observations_history = []

    MAX_TOOL_CALL_ITERATIONS = 3

    while iteration_count < MAX_TOOL_CALL_ITERATIONS:
        iteration_count += 1
        logger.info(f"[{user_id}] Iteration {iteration_count}/{MAX_TOOL_CALL_ITERATIONS}")

        # Construct the prompt for this iteration
        # The LLM needs to see the current user input, the full chat history,
        # and any observations from previous tool calls in *this* turn.
        current_observation_context = "\n".join(observations_history) if observations_history else tool_observation # Initial empty for first, then accumulated
        
        prompt_for_llm = penny_agent_prompt_template.format(
            human_input=human_input,
            chat_history=cumulative_chat_context, # This stays the original chat history for the user's turn
            user_id=user_id,
            tool_observation=current_observation_context # Pass accumulated observations
        )
        logger.info(f"\nPrompt for Penny for Iteration {iteration_count}: \n {prompt_for_llm}\n")
        llm_response = await llm.ainvoke(prompt_for_llm)
        current_llm_response_content = llm_response.content
        logger.info(f"[{user_id}] Penny (LLM Iteration {iteration_count}): Response:\n{current_llm_response_content}")

        # Try to parse a tool call
        tool_call_json_str = None
        tool_call_start_idx = current_llm_response_content.find('```json')
        tool_call_end_idx = current_llm_response_content.find('```', tool_call_start_idx + len('```json')) # Corrected end index search

        if tool_call_start_idx != -1 and tool_call_end_idx != -1:
            tool_call_json_str = current_llm_response_content[tool_call_start_idx + len('```json'):tool_call_end_idx].strip()
            logger.info(f"[{user_id}] Penny: Detected potential tool call JSON in iteration {iteration_count}: {tool_call_json_str}")

            try:
                tool_call_parsed = ToolCall(**json.loads(tool_call_json_str))
                logger.info(f"[{user_id}] Penny: Parsed tool call: {tool_call_parsed.tool_name}({tool_call_parsed.args})")

                # Execute the tool call via MCP Server
                mcp_tool_result = await call_mcp_server(tool_call_parsed.tool_name, tool_call_parsed.args)
                
                # Format the new observation clearly for the LLM's next turn
                new_observation_entry = (
                    f"Observation from tool '{mcp_tool_result.tool_name}': "
                    f"Status: '{mcp_tool_result.status}'. "
                    f"Result: {mcp_tool_result.result}. "
                    f"Error: {mcp_tool_result.error_message}"
                )
                observations_history.append(new_observation_entry)
                logger.info(f"[{user_id}] Penny: Added observation to history: {new_observation_entry}")

                # Continue loop if a tool was successfully called and we haven't hit max iterations.
                # The LLM's prompt guides it to output a final answer if it's done.
                # If the LLM produces another tool call, the loop will continue.

            except json.JSONDecodeError as e:
                logger.error(f"[{user_id}] Penny: Error parsing LLM's tool call JSON in iteration {iteration_count}: {e}")
                final_answer_text = "I had trouble understanding my internal tools due to a formatting error. Can you please rephrase or try again?"
                break # Exit loop on unrecoverable parsing error
            except ValidationError as e:
                logger.error(f"[{user_id}] Penny: Validation error for tool call in iteration {iteration_count}: {e}")
                final_answer_text = "I understood a tool call, but its arguments were invalid. Can you please rephrase or try again?"
                break # Exit loop on invalid argument error
            except Exception as e:
                logger.error(f"[{user_id}] Penny: Unexpected error during tool execution in iteration {iteration_count}: {e}", exc_info=True)
                final_answer_text = "I encountered an unexpected issue trying to use my tools. Please try again."
                break # Exit loop on unexpected tool execution error
        else:
            # No tool call detected, assume this LLM response contains the final answer
            logger.info(f"[{user_id}] Penny: No tool call detected in iteration {iteration_count}. Assuming final answer.")
            final_answer_text = current_llm_response_content
            break # Exit loop as LLM indicates it's done or cannot use tools

    # If the loop finishes due to max_iterations, and we still don't have a final_answer_text,
    # it means the LLM kept trying to call tools without resolving.
    if not final_answer_text:
        final_answer_text = current_llm_response_content # Fallback to the last LLM response content
        logger.warning(f"[{user_id}] Penny: Max iterations reached ({MAX_TOOL_CALL_ITERATIONS}). Using last LLM response as final answer.")
        if "## Answer" not in final_answer_text: # If it's a Thought, make it more user-friendly
             final_answer_text = "I've processed your request, but I couldn't fully resolve it with my available tools within the allowed attempts. Could you provide more details or rephrase your question?"
    return final_answer_text


# --- FastAPI Endpoints ---

class ChatRequest(BaseModel):
    user_id: str
    message: str

@app.get("/")
async def get_root():
    return {"message": "Penny Agent is running!"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await websocket.accept()
    logger.info(f"[{user_id}] Penny: WebSocket connection accepted.")
    current_memory = get_memory(user_id)
    if not current_memory:
        add_to_memory(user_id, SystemMessage(content="Welcome to Penny, your Payments Agent! How can I assist you today?"))
        await websocket.send_json({"type": "agent_message", "content": "Welcome to Penny, your Payments Agent! How can I assist you today?"})

    try:
        while True:
            logger.info(f"[{user_id}] Penny: Waiting to receive text message...")
            data = await websocket.receive_text()
            logger.info(f"[{user_id}] Penny: Received raw data from frontend: {data}")

            user_message = data
            add_to_memory(user_id, HumanMessage(content=user_message))

            logger.info(f"[{user_id}] Penny received request from user {user_id}: {user_message}")

            # --- Execute Penny's Agent Logic (Thought->Action->Observation->Answer) ---
            penny_reponse = await penny_agent_logic({
                "human_input": user_message,
                "chat_history": [f"{msg.type}: {msg.content}" for msg in current_memory],
                "user_id": user_id
            })

            pattern = re.compile(r"(?:Answer:|##\s*Answer)\s*(.*?)(?=\n##|$)", re.DOTALL | re.IGNORECASE)
            match = pattern.search(penny_reponse)
            if match:
                final_response_content = match.group(1).strip()
            else:
                # Fallback: If no explicit Answer marker, return the whole text (or a default message)
                final_response_content = penny_reponse.strip()

            # --- Urgency Detection (from original message) ---
            category_for_log = "payments_query" # Default
            urgency_for_log = "low" # Default
            if "urgent" in user_message.lower() or "immediately" in user_message.lower():
                urgency_for_log = "high"
            elif "soon" in user_message.lower():
                urgency_for_log = "medium"

            final_agent_response = f"{final_response_content}"

            add_to_memory(user_id, AIMessage(content=final_agent_response))
            await websocket.send_json({"type": "agent_message", "content": final_agent_response})
            logger.info(f"[{user_id}] Penny: Sent response to frontend.")

            # Log the request
            log_request_response(
                userId=user_id,
                requestText=user_message,
                responseText=final_agent_response,
                agentName="Penny", # Agent name is always Penny here
                category=category_for_log,
                urgency=urgency_for_log
            )

    except WebSocketDisconnect:
        logger.info(f"[{user_id}] Client disconnected.")
    except Exception as e:
        import traceback
        logger.error(f"[{user_id}] FATAL ERROR in WebSocket endpoint: {e}")
        traceback.print_exc()
        await websocket.send_json({"type": "error", "content": f"An unexpected error occurred in Penny: {e}"})
    finally:
        logger.info(f"[{user_id}] Penny: WebSocket connection closed for user.")
        await websocket.close()