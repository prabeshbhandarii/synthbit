import { useEffect, useState } from 'react';

const Chat = ({message}) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (message) {
            setMessages(prev => [...prev, message]);
        }
    }, [message]);

    return (
        <div>
            <h1>Chat box</h1>
            <ul>
                {messages.map((msg, i) => (
                    <li key={i}>{msg}</li>
                ))}
            </ul>
        </div>
    );
}

export default Chat;