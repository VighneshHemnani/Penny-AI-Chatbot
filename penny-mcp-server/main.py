import os
import logging
import re # For UUID validation
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional, Literal
import asyncpg # <--- NEW: Import asyncpg
from decimal import Decimal as PyDecimal # Import Decimal for Python's Decimal type
from datetime import datetime
from dotenv import load_dotenv # For loading .env locally, if used
import urllib.parse

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load environment variables from .env file (if running locally)
load_dotenv()

app = FastAPI()

# --- Database Connection Pool (asyncpg) ---
# We'll use a global variable for the connection pool.
# It's better practice to inject this via FastAPI's dependency injection
# or a custom state object, but for simplicity here, a global works.
db_pool = None

@app.on_event("startup")
async def startup_event():
    global db_pool
    password = "p£X0)q37?]8a"
    encodedpassword = urllib.parse.quote_plus(password)
    database_url = f"postgresql://paymentappuser:{encodedpassword}@apidb.app.dev.virginvoyages.com:5432/paymentdb"
    if not database_url:
        logger.error("DATABASE_URL environment variable is not set!")
        raise RuntimeError("DATABASE_URL environment variable is not set. Cannot connect to database.")
    
    logger.info("Connecting to PostgreSQL database using asyncpg...")
    try:
        # Create a connection pool
        db_pool = await asyncpg.create_pool(database_url)
        logger.info("PostgreSQL database connected (asyncpg pool created).")
    except Exception as e:
        logger.error(f"Failed to connect to PostgreSQL database: {e}", exc_info=True)
        raise

@app.on_event("shutdown")
async def shutdown_event():
    global db_pool
    if db_pool:
        logger.info("Closing PostgreSQL database connection pool...")
        await db_pool.close()
        logger.info("PostgreSQL database connection pool closed.")

# --- Mock Database ---
# MOCK_DB = {
#     "transactions": [
#         {"id": "t1", "userId": "user123", "amount": 1500.0, "status": "completed", "transactionDate": "2025-05-01", "notes": "Flight to Paris", "currency": "USD"},
#         {"id": "t2", "userId": "user123", "amount": 250.0, "status": "pending", "transactionDate": "2025-06-05", "notes": "Hotel booking", "currency": "USD"},
#         {"id": "t3", "userId": "user456", "amount": 500.0, "status": "refunded", "transactionDate": "2025-04-10", "notes": "Cruise deposit", "currency": "USD"}
#     ],
#     "policies": [
#         {"id": "p1", "category": "refund", "policyName": "Standard Refund Policy", "policyText": "Full refunds are available within 24 hours of booking confirmation. After 24 hours, a 20% cancellation fee applies. No refunds 7 days before departure.", "disclosureLevel": "public"},
#         {"id": "p2", "category": "payment_methods", "policyName": "Accepted Payment Methods", "policyText": "We accept Visa, MasterCard, American Express, and PayPal. Bank transfers are accepted for bookings over $1000.", "disclosureLevel": "public"},
#         {"id": "p3", "category": "data_retention", "policyName": "Payment Data Retention", "policyText": "Payment transaction data is retained for 7 years for auditing purposes.", "disclosureLevel": "internal"}
#     ],
#     "products": [
#         {"id": "prod1", "name": "European River Cruise", "price": 2500.0, "currency": "USD"},
#         {"id": "prod2", "name": "Caribbean All-Inclusive", "price": 1800.0, "currency": "USD"}
#     ]
# }
# def get_payment_status_tool(user_id: str, transaction_id: Optional[str] = None) -> str:
#     """Retrieves payment status for a user, optionally for a specific transaction."""
#     logger.info(f"MCP Server: Executing get_payment_status_tool for user {user_id}, transaction {transaction_id}")
#     user_transactions = [t for t in MOCK_DB["transactions"] if t["userId"] == user_id]
#     if not user_transactions:
#         return "No transactions found for this user."
#     if transaction_id:
#         transaction = next((t for t in user_transactions if t["id"] == transaction_id), None)
#         return f"Transaction {transaction_id} status: {transaction['status']}" if transaction else "Transaction not found."
#     latest_transaction = max(user_transactions, key=lambda x: x["transactionDate"])
#     return f"Latest transaction status ({latest_transaction['id']}): {latest_transaction['status']} (Amount: {latest_transaction['amount']} {latest_transaction['currency']})"

# def get_payment_history_tool(user_id: str) -> str:
#     """Retrieves payment history for a user."""
#     logger.info(f"MCP Server: Executing get_payment_history_tool for user {user_id}")
#     user_transactions = [t for t in MOCK_DB["transactions"] if t["userId"] == user_id]
#     if not user_transactions:
#         return "No payment history found."
#     history_str = "Payment History:\n"
#     for t in user_transactions:
#         history_str += f"- ID: {t['id']}, Amount: {t['amount']} {t['currency']}, Status: {t['status']}, Date: {t['transactionDate']}, Notes: {t['notes']}\n"
#     return history_str

# def get_policy_tool(category: str, disclosure_level: str = "public") -> str:
#     """Retrieves a business policy based on category and disclosure level."""
#     logger.info(f"MCP Server: Executing get_policy_tool for category {category}, disclosure {disclosure_level}")
#     relevant_policies = [
#         p for p in MOCK_DB["policies"]
#         if p["category"] == category and p["disclosureLevel"] == disclosure_level
#     ]
#     if not relevant_policies:
#         return f"No policy found for category '{category}' with disclosure level '{disclosure_level}'."
#     return "\n".join([f"Policy '{p['policyName']}': {p['policyText']}'" for p in relevant_policies])

# --- NEW Tools for PostgreSQL Database (Payments table) using asyncpg ---
def format_payment_logs(logs: List[Dict[str, Any]]) -> str:
    if not logs:
        return "No payment logs found matching the criteria."
    formatted_list =[]
    for l in logs:
        formatted_list.append(
            f" - Payment Token: {l.get('payment_token','N/A')}\n"
            f"   Step: {l.get('payment_step', 'N/A')}\n"
            f"   Request: {l.get('rq_payload', 'N/A')}\n"
            f"   Response: {l.get('rs_payload', 'N/A')}\n")
    return "Found logs:\n" + "\n".join(formatted_list)


def format_payment_results(payments: List[Dict[str, Any]]) -> str:
    """Helper to format payment query results into a readable string."""
    if not payments:
        return "No payments found matching the criteria."

    formatted_list = []
    for p in payments:
        # Convert datetime objects to string for consistent output
        transaction_date = p.get('transaction_date_time')
        if isinstance(transaction_date, datetime):
            transaction_date = transaction_date.isoformat() # or .strftime('%Y-%m-%d %H:%M:%S')

        # Convert Decimal objects to string
        amount = p.get('amount')
        if isinstance(amount, PyDecimal):
            amount = str(amount)

        formatted_list.append(
            f"  - Payment Token: {p.get('payment_token', 'N/A')}\n"
            f"    Reference Number: {p.get('reference_number', 'N/A')}\n"
            f"    Booking ID: {p.get('booking_id', 'N/A')}\n"
            # f"    Client ID: {p.get('client_id', 'N/A')}\n"
            f"    Amount: {amount} {p.get('currency', 'N/A')}\n"
            f"    Status: {p.get('status', 'N/A')}\n"
            # f"    Gateway Status: {p.get('gateway_status', 'N/A')}\n"
            f"    Transaction Date: {transaction_date}\n"
            # f"    Payment Type: {p.get('payment_type', 'N/A')}\n"
            f"    Card Scheme: {p.get('scheme', 'N/A')}\n"
            f"    Masked Card Number: {p.get('masked_pan', 'N/A')}\n"
        )
    return "Found payments:\n" + "\n".join(formatted_list)

async def get_payment_status_by_payment_token(payment_token: str) -> str:
    """
    Retrieves the payment status for a given unique payment token (UUID).
    Args:
        payment_token: The unique UUID identifying the payment.
    Returns:
        A string indicating the payment status or if not found.
    """
    logger.info(f"MCP Server: Executing get_payment_status_by_payment_token for token: {payment_token}")
    try:
        if not re.match(r"^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$", payment_token):
             return f"Invalid payment token format: '{payment_token}'. Please provide a valid UUID."

        async with db_pool.acquire() as connection:
            # Note: Column names in SQL are usually snake_case, matching your @map names
            row = await connection.fetchrow(
                """
                SELECT status, payment_token
                FROM payments
                WHERE payment_token = $1
                """,
                payment_token
            )
        
        if row:
            # asyncpg returns Row objects, which can be treated like dicts
            status = row['status'] if row['status'] else "N/A"

            return (f"Payment with token '{row['payment_token']}' has status: {status} ")
        else:
            return f"Payment with token '{payment_token}' not found."
    except Exception as e:
        logger.error(f"Error in get_payment_status_by_payment_token: {e}", exc_info=True)
        return f"An error occurred while fetching payment status: {e}"

async def find_a_payment(
    reference_number: Optional[str] = None,
    booking_id: Optional[int] = None,
    currency: Optional[str] = None,
    amount: Optional[PyDecimal] = None,
    last_four_digits: Optional[str] = None, # Will require JOIN to payment_x_method
    card_scheme: Optional[str] = None # Will require JOIN to payment_x_method
) -> str:
    """
    Finds one or more payments based on various optional parameters.
    Returns a list of matching payments or a single payment.
    Args:
        reference_number: Optional payment reference number.
        booking_id: Optional booking ID.
        currency: Optional currency code (e.g., "USD").
        amount: Optional payment amount.
        last_four_digits: Optional last four digits of the card (from PaymentMethods).
        card_scheme: Optional card scheme (e.g., "Visa", "MasterCard") (from PaymentMethods).
    """
    logger.info(f"MCP Server: Executing find_a_payment with params: {locals()}")
    
    query = """
        SELECT
            p.payment_token,
            p.reference_number,
            p.currency, p.amount, p.status,
            p.booking_id, p.transaction_date_time,
            pxm.masked_pan, pxm.card_scheme
        FROM payments AS p
        JOIN payment_x_method pxm ON p.payment_token = pxm.payment_token
        WHERE 1 = 1
    """
    params = []
    param_count = 1

    if reference_number:
        query += f" AND p.reference_number = ${param_count}"
        params.append(reference_number)
        param_count += 1
    if booking_id is not None:
        query += f" AND p.booking_id = ${param_count}"
        params.append(booking_id)
        param_count += 1
    if currency:
        query += f" AND p.currency = ${param_count}" # Case-insensitive like
        params.append(currency)
        param_count += 1
    if amount is not None:
        query += f" AND p.amount = ${param_count}"
        params.append(PyDecimal(str(amount))) # Ensure Decimal for asyncpg
        param_count += 1
    if last_four_digits:
        query += f" AND pxm.masked_pan LIKE ${param_count}"
        params.append(f"%{last_four_digits}%")
        param_count += 1
    if card_scheme:
        query += f" AND pxm.card_scheme LIKE ${param_count}"
        params.append(f"%{card_scheme}%")
        param_count += 1

    logger.info(f"MCP Server: Params: '{params}'")
    logger.info(f"MCP Server: query: '{query}'")
    try:
        async with db_pool.acquire() as connection:
            rows = await connection.fetch(query, *params)
        
        payments_data = [dict(row) for row in rows]
        return format_payment_results(payments_data)
    except Exception as e:
        logger.error(f"Error in find_a_payment: {e}", exc_info=True)
        return f"An error occurred while finding payments: {e}"

async def get_payment_history_by_booking_id(booking_id: int) -> str:
    """
    Finds all payments associated with a specific booking ID.
    Args:
        booking_id: The required booking ID.
    Returns:
        A list of payments for the booking or if none found.
    """
    logger.info(f"MCP Server: Executing get_payment_history_by_booking_id for booking ID: {booking_id}")
    try:
        async with db_pool.acquire() as connection:
            rows = await connection.fetch(
                """
                SELECT
                    payment_token, reference_number, booking_id, client_id, currency, amount,
                    status, gateway_status, transaction_date_time, payment_type
                FROM payments
                WHERE booking_id = $1
                """,
                booking_id
            )
        payments_data = [dict(row) for row in rows]
        return format_payment_results(payments_data)
    except Exception as e:
        logger.error(f"Error in get_payment_history_by_booking_id: {e}", exc_info=True)
        return f"An error occurred while fetching payment history by booking ID: {e}"

async def get_payment_logs_by_token(payment_token: str) ->str:
    logger.info(f"MCP Server: Executing get_payment_logs_by_token for token: {payment_token}")
    try:
        async with db_pool.acquire() as connection:
            rows = await connection.fetch(
                """
                SELECT
                    payment_token, rq_payload, rs_payload, payment_step
                FROM payment_logs
                WHERE payment_step = 'Fexco Error Callback' and payment_token = $1
                """,
                payment_token
            )
            json_string = format_payment_logs(rows)
            return json_string
    except Exception as e:
        logger.error(f"Error in get_payment_logs_by_token: {e}", exc_info=True)
        return f"An error occurred while fetching payment history by client ID: {e}"

async def get_full_payment_history_by_client_id(client_id: int) -> str:
    """
    Finds all payments associated with a specific client ID.
    Args:
        client_id: The required client ID.
    Returns:
        A list of payments for the client or if none found.
    """
    logger.info(f"MCP Server: Executing get_full_payment_history_by_client_id for client ID: {client_id}")
    try:
        async with db_pool.acquire() as connection:
            rows = await connection.fetch(
                """
                SELECT
                    payment_token, reference_number, booking_id, currency, amount,
                    status, transaction_date_time, payment_type
                FROM payments
                WHERE client_id = $1
                """,
                client_id
            )
        payments_data = [dict(row) for row in rows]
        return format_payment_results(payments_data)
    except Exception as e:
        logger.error(f"Error in get_full_payment_history_by_client_id: {e}", exc_info=True)
        return f"An error occurred while fetching payment history by client ID: {e}"


# --- MCP Server Request/Response Models ---
class ToolCall(BaseModel):
    tool_name: str
    args: Dict[str, Any]

class ToolResult(BaseModel):
    tool_name: str
    result: Any
    status: Literal["success", "failure"]
    error_message: Optional[str] = None

# --- MCP Server Endpoint ---
@app.post("/mcp", response_model=ToolResult)
async def mcp_invoke_tool(tool_call: ToolCall):
    """
    MCP endpoint to invoke a tool based on the provided tool_name and arguments.
    """
    logger.info(f"MCP Server: Received tool invocation for '{tool_call.tool_name}' with args: {tool_call.args}")

    tool_functions = {
        # "get_payment_status_tool": get_payment_status_tool,  # Existing mock tool
        # "get_payment_history_tool": get_payment_history_tool, # Existing mock tool
        # "get_policy_tool": get_policy_tool,                  # Existing mock tool
        # --- New asyncpg-backed tools ---
        "get_payment_status_by_payment_token": get_payment_status_by_payment_token,
        "find_a_payment": find_a_payment,
        "get_payment_history_by_booking_id": get_payment_history_by_booking_id,
        "get_full_payment_history_by_client_id": get_full_payment_history_by_client_id,
        "get_payment_logs_by_token":get_payment_logs_by_token
    }

    if tool_call.tool_name not in tool_functions:
        logger.error(f"MCP Server: Tool '{tool_call.tool_name}' not found.")
        raise HTTPException(status_code=404, detail=f"Tool '{tool_call.tool_name}' not found.")

    try:
        # Execute the tool function using arguments from the ToolCall
        # This will be an await call for the new async tools
        result = await tool_functions[tool_call.tool_name](**tool_call.args)
        logger.info(f"MCP Server: Tool '{tool_call.tool_name}' executed successfully.")
        return ToolResult(tool_name=tool_call.tool_name, result=result, status="success")
    except TypeError as e:
        logger.error(f"MCP Server: TypeError when executing tool '{tool_call.tool_name}' with args {tool_call.args}: {e}")
        return ToolResult(tool_name=tool_call.tool_name, result=None, status="failure", error_message=f"Invalid arguments for tool: {e}. Please check tool documentation.")
    except Exception as e:
        logger.error(f"MCP Server: Error executing tool '{tool_call.tool_name}': {e}", exc_info=True)
        return ToolResult(tool_name=tool_call.tool_name, result=None, status="failure", error_message=f"Error executing tool: {e}")

# --- Health Check Endpoint ---
@app.get("/")
async def read_root():
    return {"message": "Penny MCP Server is running!"}