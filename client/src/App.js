import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import ChatRoom from './component/ChatRoom.js';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const createRoom = async () => {
    const newRoomId = uuidv4();
    setRoomId(newRoomId);
    navigate(`/${newRoomId}`);
  };

  return (
    <>
      <button onClick={createRoom}>Create Room</button>
      <Routes>
        <Route path="/:roomId" element={<ChatRoom roomId={roomId} />} />
      </Routes>
    </>
  );
}

export default App;