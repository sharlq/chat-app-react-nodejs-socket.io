import React from 'react'
import Message from "./message"

const Messages = ({messages,name,refferance}) => {
    return (
        <div ref={refferance} className="messages">
           {messages.map((i)=><Message name={i.user} text={i.text} user={name}/>)}
            <div></div>
        </div>
    )
}

export default Messages
