import React from 'react'

const Input = ({message,setMessage,sendMessage}) => {
    return (
        <div className="input">
            <input 
             className="textbox"
             value={message}
             placeholder="Type message ..."
             onChange={(e)=>setMessage(e.target.value)}
             onKeyPress={event => event.key =="Enter" ? sendMessage(event):null}/>
            <button className="input-btn" onClick={(event)=>sendMessage(event)}>SEND</button>
        </div>
    )
}

export default Input
