import React, { useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import Chat from './component/Chat/Chat';
import JoinForm from './component/joinForm/JoinForm';


function App() {
  const [socket, setSocket] = useState(io.connect('http://localhost:3001'));
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [showJoinForm, setShowJoinForm ] = useState(false);
  
  function setData(data) {
    setRoom(data.room);
    setUsername(data.username);
  }

  return (
    <div className="App">
      {!showJoinForm ? <JoinForm socket={socket} setData={setData} setShowJoinForm={setShowJoinForm} /> :
        <Chat socket={socket} setSocket={setSocket} author={username} room={room} setShowJoinForm={setShowJoinForm}/>
      }
    </div>
  );
}

export default App;
