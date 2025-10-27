module.exports = {

"[project]/pages/index.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// web-frontend/pages/index.js
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/input/index.js [ssr] (ecmascript) <export default as Input>"); // Import Avatar
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [ssr] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/list/index.js [ssr] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/typography/index.js [ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/space/index.js [ssr] (ecmascript) <locals> <export default as Space>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$flex$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flex$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/flex/index.js [ssr] (ecmascript) <export default as Flex>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/message/index.js [ssr] (ecmascript) <export default as message>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/avatar/index.js [ssr] (ecmascript) <export default as Avatar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
;
;
;
;
const { TextArea } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"];
const { Text } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"];
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
    onlineGreen: '#52c41a'
};
const Home = ()=>{
    const [messageHistory, setMessageHistory] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [inputValue, setInputValue] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const wsRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const userId = "user123";
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [isLoadingResponse, setIsLoadingResponse] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: "smooth"
            });
        }
    }, [
        messageHistory,
        isLoadingResponse
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const connectWebSocket = ()=>{
            const ws = new WebSocket(`ws://localhost:8001/ws?user_id=${userId}`);
            ws.onopen = ()=>{
                console.log('WebSocket Connected');
                setIsConnected(true);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Connected to Penny Agent!');
            };
            ws.onmessage = (event)=>{
                const data = JSON.parse(event.data);
                if (data.type === 'agent_message') {
                    setMessageHistory((prev)=>[
                            ...prev,
                            {
                                type: 'agent',
                                content: data.content
                            }
                        ]);
                    setIsLoadingResponse(false);
                } else if (data.type === 'error') {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(`Agent Error: ${data.content}`);
                    setIsLoadingResponse(false);
                }
            };
            ws.onclose = ()=>{
                console.log('WebSocket Disconnected');
                setIsConnected(false);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].info('Disconnected from Penny Agent. Attempting to reconnect...');
                setIsLoadingResponse(false);
                setTimeout(connectWebSocket, 3000);
            };
            ws.onerror = (error)=>{
                console.error('WebSocket Error:', error);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('WebSocket connection error!');
                ws.close();
            };
            wsRef.current = ws;
        };
        connectWebSocket();
        return ()=>{
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);
    const sendMessage = ()=>{
        if (wsRef.current && isConnected && inputValue.trim()) {
            const userMessage = inputValue.trim();
            setMessageHistory((prev)=>[
                    ...prev,
                    {
                        type: 'user',
                        content: userMessage
                    }
                ]);
            wsRef.current.send(userMessage);
            setInputValue('');
            setIsLoadingResponse(true);
        } else if (!isConnected) {
            console.log('Not connected, cannot send message.');
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].warning('Not connected to the agent. Please wait for connection.');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$flex$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flex$3e$__["Flex"], {
        vertical: true,
        style: {
            minHeight: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            backgroundImage: `url(${BACKGROUND_IMAGE_PATH})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            position: 'relative'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                    children: "Penny AI Agent Demo"
                }, void 0, false, {
                    fileName: "[project]/pages/index.js",
                    lineNumber: 117,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 116,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(8px) saturate(150%)',
                    WebkitBackdropFilter: 'blur(8px) saturate(150%)',
                    zIndex: 1
                }
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 121,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
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
                    backgroundColor: COLORS.white
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$flex$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flex$3e$__["Flex"], {
                        align: "center" // Align items vertically in the center
                        ,
                        justify: "center" // Center content horizontally within the Flex
                        ,
                        style: {
                            padding: '16px',
                            backgroundImage: `url(${HEADER_BACKGROUND_IMAGE_PATH})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            borderBottom: `1px solid ${COLORS.borderGrey}`,
                            borderRadius: '12px 12px 0 0',
                            gap: '10px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    position: 'relative'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                        size: 50,
                                        src: PENNY_AVATAR_PATH
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 164,
                                        columnNumber: 25
                                    }, this),
                                    " ",
                                    isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0,
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '50%',
                                            backgroundColor: COLORS.onlineGreen,
                                            border: `2px solid ${COLORS.white}`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 166,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 163,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"].Title, {
                                level: 3,
                                style: {
                                    margin: '0',
                                    fontWeight: 'bold',
                                    letterSpacing: '2px',
                                    color: COLORS.white,
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                    textTransform: 'uppercase'
                                },
                                children: "PENNY"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 179,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 148,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                        style: {
                            flexGrow: 1,
                            overflowY: 'auto',
                            padding: '16px',
                            borderBottom: `1px solid ${COLORS.borderGrey}`
                        },
                        dataSource: messageHistory,
                        renderItem: (item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"].Item, {
                                style: {
                                    justifyContent: item.type === 'user' ? 'flex-end' : 'flex-start',
                                    padding: '8px 0',
                                    borderBottom: 'none'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        backgroundColor: item.type === 'user' ? COLORS.lightGrey : COLORS.lightBlue,
                                        borderRadius: '8px',
                                        padding: '10px 15px',
                                        maxWidth: '80%',
                                        wordWrap: 'break-word',
                                        boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Text, {
                                            strong: true,
                                            style: {
                                                color: item.type === 'user' ? COLORS.textBlue : COLORS.brightRed
                                            },
                                            children: [
                                                item.type === 'user' ? 'You' : 'Penny',
                                                ":"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/index.js",
                                            lineNumber: 216,
                                            columnNumber: 33
                                        }, void 0),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/pages/index.js",
                                            lineNumber: 219,
                                            columnNumber: 33
                                        }, void 0),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Text, {
                                            children: item.content
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.js",
                                            lineNumber: 220,
                                            columnNumber: 33
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/index.js",
                                    lineNumber: 206,
                                    columnNumber: 29
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 199,
                                columnNumber: 25
                            }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 195,
                        columnNumber: 17
                    }, this),
                    isLoadingResponse && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '8px 16px',
                            display: 'flex',
                            justifyContent: 'flex-start'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                backgroundColor: COLORS.lightBlue,
                                borderRadius: '8px',
                                padding: '10px 15px',
                                maxWidth: '80%',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                                display: 'flex',
                                alignItems: 'center'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Text, {
                                    strong: true,
                                    style: {
                                        color: COLORS.brightRed
                                    },
                                    children: "Penny:"
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.js",
                                    lineNumber: 240,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: PENNY_LOADING_GIF_PATH,
                                    alt: "One moment...",
                                    style: {
                                        width: '30px',
                                        height: '30px',
                                        marginLeft: '8px'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.js",
                                    lineNumber: 241,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/index.js",
                            lineNumber: 229,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 228,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        ref: messagesEndRef
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 245,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"].Compact, {
                        style: {
                            width: '100%',
                            padding: '16px',
                            borderTop: `1px solid ${COLORS.borderGrey}`,
                            borderRadius: '0 0 12px 12px',
                            backgroundColor: COLORS.white,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            flexShrink: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(TextArea, {
                                rows: 3,
                                value: inputValue,
                                onChange: (e)=>setInputValue(e.target.value),
                                placeholder: isConnected ? "Type your message..." : "Connecting to agent...",
                                onPressEnter: (e)=>{
                                    if (!e.shiftKey) {
                                        e.preventDefault();
                                        sendMessage();
                                    }
                                },
                                disabled: !isConnected || isLoadingResponse,
                                style: {
                                    flexGrow: 1,
                                    flexShrink: 1,
                                    flexBasis: 'auto',
                                    minWidth: '0',
                                    marginRight: '0px',
                                    borderRadius: '8px',
                                    backgroundColor: COLORS.white,
                                    color: COLORS.darkGrey,
                                    border: `1px solid ${COLORS.borderGrey}`
                                }
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 261,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                type: "primary",
                                onClick: sendMessage,
                                disabled: !isConnected || isLoadingResponse,
                                style: {
                                    height: 'auto',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    backgroundColor: COLORS.brightRed,
                                    borderColor: COLORS.brightRed,
                                    color: COLORS.white,
                                    flexShrink: 0
                                },
                                children: "Send"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 285,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 248,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 134,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.js",
        lineNumber: 101,
        columnNumber: 9
    }, this);
};
const __TURBOPACK__default__export__ = Home;
}}),

};

//# sourceMappingURL=pages_index_ce3157d5.js.map