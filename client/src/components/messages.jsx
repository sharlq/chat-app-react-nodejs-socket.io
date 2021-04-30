import React from 'react'
import Message from "./message"

const Messages = ({messages,name}) => {
    return (
        <div className="messages">
           {messages.map((i)=><Message name={i.user} text={i.text} user={name}/>)}
            <div></div>
        </div>
    )
}

export default Messages
