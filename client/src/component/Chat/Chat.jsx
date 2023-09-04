import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSend } from 'react-icons/ai';
import { BiExit } from 'react-icons/bi';
import io from 'socket.io-client';
import Bubble from '../Bubble/Bubble';
import './chatStyle.css';

function Chat ({socket, setSocket, author, room, setShowJoinForm}){

      const divRef = useRef(null);


      const [message, setMessage] = useState("");
      const [messageList, setMessageList] = useState([]);
      async function sendMessage(event) {
            if(message !== '') {
                  const messageData = {
                        id: socket.id,
                        message: message,
                        author: author,
                        room: room,
                        time: getTime(),
                  }
                  await socket.emit("sendMessage",messageData);
                  setMessageList((list)=>[...list, messageData]);
                  setMessage("");
            }
      }
      useEffect(()=>{
            socket.off("recievedMessage").on("recievedMessage",(data)=>{
                  setMessageList((list)=>[...list, data]);
            })
            socket.off("joinedRoom").on("joinedRoom",(data)=>{
                  console.log(data.author+ " joined");
                  data.status = "joined";
                  setMessageList((list)=>[...list, data]);
            })

            socket.off("exited").on("exited",(data)=>{
                  console.log("Exited");
                  setMessageList((list)=>[...list, data]);
            })
      },[messageList, socket]);

      
      function getTime() {
            const day = new Date();
            const hh = day.getHours()>12 ? day.getHours()-12: day.getHours();
            const mm = day.getMinutes()>9 ? day.getMinutes(): '0'+day.getMinutes();
            const time = `${hh>9?hh:'0'+hh}:${mm} ${day.getHours()>11 ? "pm" : "am"}`;
            return time;
      }

      function exitChat() {
            
            socket.emit("exited",{room:room, author:author});
            socket.disconnect();
            setSocket(io.connect('http://localhost:3001'));
            setShowJoinForm(false);
      }

      return (
            <div className="chat" ref={divRef}>
                  <div className="chat-header">
                        <div className="content">
                              <h1>Hello <span className="spl">{author}</span></h1>
                              <p>You are now joined Room <span className="spl">{room}</span></p>
                        </div>
                        <div className="exit btn">
                              <BiExit className="chat-exit" onClick={exitChat} title="Exit from chat" />
                        </div>
                  </div>
                  <div className="chat-body">
                        {
                              messageList.map((messageData) => {
                                    return (
                                          messageData.message ?
                                          <Bubble key={socket.id} socketId={socket.id} messageData={messageData} author={author} /> :
                                          <p className="join-message">{messageData.author} {messageData.status} this room</p>
                                    )

                        })}
                  </div>
                  <div className="chat-foot">
                        <input type="text" name="message" placeholder="Type your message" value={message} onChange={
                              (event)=>{
                                    setMessage(event.target.value);
                              }
                        } onKeyPress={(event)=> {
                              event.key === 'Enter' && sendMessage();
                        }} />
                        <button type="button" onClick={sendMessage}><AiOutlineSend className="send-icon"/></button>
                  </div>
            </div>
      )
}

export default Chat;