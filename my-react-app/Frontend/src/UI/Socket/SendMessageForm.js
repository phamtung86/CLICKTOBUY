import React, { useState } from 'react';

const SendMessageForm = ({ onSend }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (message.trim()) {
            onSend({ content: message });
            console.log(message);
        }
        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default SendMessageForm;
