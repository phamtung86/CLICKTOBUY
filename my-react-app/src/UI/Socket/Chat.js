import React, { useEffect, useState } from 'react';
import MessageList from './MessageList.js';
import SendMessageForm from './SendMessageForm.js';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const webSocket = new WebSocket('ws://localhost:8080/CLICKTOBUY/websocket/chat');
        setSocket(webSocket);

        webSocket.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        webSocket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            webSocket.close();
        };
    }, []);

    const handleSendMessage = (message) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
        }
    };

    return (
        <div>
            <h1>Messaging App</h1>
            <SendMessageForm onSend={handleSendMessage} />
            <MessageList messages={messages} />
        </div>
    );
};

export default Chat;
