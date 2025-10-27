// web-frontend/pages/index.js
import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, List, Typography, Space, Flex, message, Avatar } from 'antd'; // Import Avatar
import Head from 'next/head';

const { TextArea } = Input;
const { Text } = Typography;

// --- Paths to Assets ---
const PENNY_LOADING_GIF_PATH = '/spinner.gif';
const BACKGROUND_IMAGE_PATH = '/background-image.jpg';
const HEADER_BACKGROUND_IMAGE_PATH = '/header-bg.svg'; // Using .svg as discussed
const PENNY_AVATAR_PATH = '/penny-avatar.jpg'; // <-- NEW: Path for Penny's avatar image

// --- Color Palette ---
const COLORS = {
    darkRed: '#9E1F14',
    brightRed: '#BB271A',
    darkGrey: '#141414',
    white: '#FFFFFF',
    lightGrey: '#f0f2f5',
    lightBlue: '#e6f7ff',
    borderGrey: '#ddd',
    textBlue: '#1890ff',
    textGreen: '#52c41a',
    onlineGreen: '#52c41a', // Specific green for online indicator
};

const Home = () => {
    const [messageHistory, setMessageHistory] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const wsRef = useRef(null);
    const userId = "user123";
    const messagesEndRef = useRef(null);

    const [isLoadingResponse, setIsLoadingResponse] = useState(false);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messageHistory, isLoadingResponse]);

    useEffect(() => {
        const connectWebSocket = () => {
            const ws = new WebSocket(`ws://localhost:8001/ws?user_id=${userId}`);
            ws.onopen = () => {
                console.log('WebSocket Connected');
                setIsConnected(true);
                message.success('Connected to Penny Agent!');
            };
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'agent_message') {
                    setMessageHistory((prev) => [...prev, { type: 'agent', content: data.content }]);
                    setIsLoadingResponse(false);
                } else if (data.type === 'error') {
                    message.error(`Agent Error: ${data.content}`);
                    setIsLoadingResponse(false);
                }
            };
            ws.onclose = () => {
                console.log('WebSocket Disconnected');
                setIsConnected(false);
                message.info('Disconnected from Penny Agent. Attempting to reconnect...');
                setIsLoadingResponse(false);
                setTimeout(connectWebSocket, 3000);
            };
            ws.onerror = (error) => {
                console.error('WebSocket Error:', error);
                message.error('WebSocket connection error!');
                ws.close();
            };
            wsRef.current = ws;
        };

        connectWebSocket();

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);

    const sendMessage = () => {
        if (wsRef.current && isConnected && inputValue.trim()) {
            const userMessage = inputValue.trim();
            setMessageHistory((prev) => [...prev, { type: 'user', content: userMessage }]);
            wsRef.current.send(userMessage);
            setInputValue('');
            setIsLoadingResponse(true);
        } else if (!isConnected) {
            console.log('Not connected, cannot send message.');
            message.warning('Not connected to the agent. Please wait for connection.');
        }
    };

    return (
        <Flex
            vertical
            style={{
                minHeight: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                backgroundImage: `url(${BACKGROUND_IMAGE_PATH})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                position: 'relative',
            }}
        >
            <Head>
                <title>Penny AI Agent Demo</title>
            </Head>

            {/* Dark Glassy Transparent Overlay (THE EFFECT) */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(8px) saturate(150%)',
                WebkitBackdropFilter: 'blur(8px) saturate(150%)',
                zIndex: 1,
            }} />

            {/* Main Chat Interface Container (Background is WHITE) */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                maxWidth: '800px',
                height: 'calc(100vh - 40px)',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                backgroundColor: COLORS.white,
            }}>
                {/* Chat Interface Header */}
                <Flex
                    align="center" // Align items vertically in the center
                    justify="center" // Center content horizontally within the Flex
                    style={{
                        padding: '16px',
                        backgroundImage: `url(${HEADER_BACKGROUND_IMAGE_PATH})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        borderBottom: `1px solid ${COLORS.borderGrey}`,
                        borderRadius: '12px 12px 0 0',
                        gap: '10px', // Space between avatar and title
                    }}
                >
                    {/* Penny's Avatar with Online Indicator */}
                    <div style={{ position: 'relative' }}>
                        <Avatar size={50} src={PENNY_AVATAR_PATH} /> {/* Penny's circular avatar */}
                        {isConnected && ( // Show green dot only if connected
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: COLORS.onlineGreen,
                                border: `2px solid ${COLORS.white}`, // White border for visibility
                            }} />
                        )}
                    </div>
                    {/* Header Title */}
                    <Typography.Title
                        level={3}
                        style={{
                            margin: '0', // Remove default margin from Ant Design Title
                            fontWeight: 'bold',
                            letterSpacing: '2px',
                            color: COLORS.white,
                            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                            textTransform: 'uppercase',
                        }}
                    >
                        PENNY
                    </Typography.Title>
                </Flex>

                {/* Message List */}
                <List
                    style={{ flexGrow: 1, overflowY: 'auto', padding: '16px', borderBottom: `1px solid ${COLORS.borderGrey}` }}
                    dataSource={messageHistory}
                    renderItem={(item) => (
                        <List.Item
                            style={{
                                justifyContent: item.type === 'user' ? 'flex-end' : 'flex-start',
                                padding: '8px 0',
                                borderBottom: 'none'
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: item.type === 'user' ? COLORS.lightGrey : COLORS.lightBlue,
                                    borderRadius: '8px',
                                    padding: '10px 15px',
                                    maxWidth: '80%',
                                    wordWrap: 'break-word',
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                                }}
                            >
                                <Text strong style={{ color: item.type === 'user' ? COLORS.textBlue : COLORS.brightRed }}>
                                    {item.type === 'user' ? 'You' : 'Penny'}:
                                </Text>
                                <br />
                                <Text>{item.content}</Text>
                            </div>
                        </List.Item>
                    )}
                />

                {/* Loading indicator */}
                {isLoadingResponse && (
                    <div style={{ padding: '8px 16px', display: 'flex', justifyContent: 'flex-start' }}>
                        <div
                            style={{
                                backgroundColor: COLORS.lightBlue,
                                borderRadius: '8px',
                                padding: '10px 15px',
                                maxWidth: '80%',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <Text strong style={{ color: COLORS.brightRed }}>Penny:</Text>
                            <img src={PENNY_LOADING_GIF_PATH} alt="One moment..." style={{ width: '30px', height: '30px', marginLeft: '8px' }} />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />

                {/* Input Area */}
                <Space.Compact
                    style={{
                        width: '100%',
                        padding: '16px',
                        borderTop: `1px solid ${COLORS.borderGrey}`,
                        borderRadius: '0 0 12px 12px',
                        backgroundColor: COLORS.white,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        flexShrink: 0,
                    }}
                >
                    <TextArea
                        rows={3}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={isConnected ? "Type your message..." : "Connecting to agent..."}
                        onPressEnter={(e) => {
                            if (!e.shiftKey) {
                                e.preventDefault();
                                sendMessage();
                            }
                        }}
                        disabled={!isConnected || isLoadingResponse}
                        style={{
                            flexGrow: 1,
                            flexShrink: 1,
                            flexBasis: 'auto',
                            minWidth: '0',
                            marginRight: '0px',
                            borderRadius: '8px',
                            backgroundColor: COLORS.white,
                            color: COLORS.darkGrey,
                            border: `1px solid ${COLORS.borderGrey}`,
                        }}
                    />
                    <Button
                        type="primary"
                        onClick={sendMessage}
                        disabled={!isConnected || isLoadingResponse}
                        style={{
                            height: 'auto',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            backgroundColor: COLORS.brightRed,
                            borderColor: COLORS.brightRed,
                            color: COLORS.white,
                            flexShrink: 0,
                        }}
                    >
                        Send
                    </Button>
                </Space.Compact>
            </div>
        </Flex>
    );
};

export default Home;