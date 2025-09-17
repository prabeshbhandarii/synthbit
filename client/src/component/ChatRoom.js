import { useParams } from "react-router-dom";
import Chat from "../component/Chat.js";
import { useState, useRef, useEffect } from 'react';

function ChatRoom() {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const socket = useRef(null);
  const roomId = useParams().roomId;

  useEffect(() => {
    socket.current = new WebSocket(`ws://localhost:8000?roomId=${roomId}`);

    socket.current.onopen = () => {
      // console.log('client connected to server');
    };

    socket.current.onmessage = (msg) => {
      setMessage(msg.data);
    };

    socket.current.onclose = () => {
      console.log('disconnected from server');
    };

  }, [roomId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;

    setMessage(inputValue);
    socket.current.send(inputValue);
    console.log(socket.current);

    inputRef.current.value = '';
  };

  return (
    <div>
      <Chat message={message} />
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter text" ref={inputRef} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ChatRoom;
