import React, {useState} from 'react'
import {Link} from 'react-router-dom'
const Join = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    return (
        <div className="outer-container">
        <div className="inner-container">
            <h1>Join</h1>
            <div><input type="text" onChange={(e)=>{setName(e.target.value)}} placeholder="name"/></div>
            <div><input type="text" onChange={(e)=>{setRoom(e.target.value)}} placeholder="room"/></div>
            <Link onClick={e=>(!name||!room)?e.preventDefault():null} to={`/chat?name=${name}&room=${room}`}>
            <button className="button" type="submit">JOIN</button>
            </Link>
        </div>
        </div>
    )
}

export default Join
