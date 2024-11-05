import React from 'react';

const MessageList = ({ messages }) => {
    console.log(messages);
    return (
        <ul>
            {messages.map((message, index) => (
                <li key={index}>{message.content}</li>
            ))}
        </ul>
    );
};

export default MessageList;
