import React from 'react'
import './bubbleStyle.css'

export default function Bubble({messageData, author, socketId}) {
    return (
        <div className='bubble-container' id={messageData.id === socketId ? "you" : "other"}>
            {
                console.log(`${socketId === messageData.id} ${socketId} ${messageData.id}`)
            }
            <div className="username">{messageData.id === socketId ? 'You' : messageData.author}</div>
            <div className="bubble">{messageData.message}</div>
            <div className="date">{messageData.time}</div>
        </div>
    )
}
