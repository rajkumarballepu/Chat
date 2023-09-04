import React, { useState } from 'react';
import './style.css';

export default function JoinForm({socket, setData, setShowJoinForm}) {
    
    const [room, setRoom] = useState("");
    const [username, setUsername] = useState("");

    function joinRoom(event) {
        event.preventDefault();
        if(room !== '' || username !== ''   ) {
            socket.emit("joinRoom", {room: room, author: username});
            setData({room: room, username: username});
            setShowJoinForm(true);
        }
    }

    return (
        <form className="join-form">
            <h1>Join Chat</h1>
            <input type="text"
            value={username}
            onChange={
            (event)=> {
                    setUsername(event.target.value);
                }
            }
            placeholder='Your name' />
            <input
                type="text"
                name="room"
                value={room}
                onChange={(event)=>{
                    setRoom(event.target.value)
                }
            }
            placeholder="Room number" />
            <button onClick={joinRoom} >Join</button>
        </form>
    )
}
