import React ,{useState,useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

let socket;

const Chat = () => {
     const [name,setName] = useState('');
     const [room,setRoom] = useState('');
     const ENDPOINT = 'localhost:5000'
    useEffect(() => {
        const {name,room} = queryString.parse(window.location.search)
        //console.log(window.location.search) //this shows us that the query string turns the string that we get from the window.location.search into object where it give us only the text in the search
        //console.log(data)
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);
        socket.emit('join',{ name,room })
        //note here we can send from one local host to another using the socket here we have defined teh port we want to send to then we gave the order emit and it will send it to the order .on which mean recive that have teh same name as the emitter
        // i had a problem here wiht the cors
        // the proplem here was because i havent specified the cores header for the server
        console.log(socket)
    }, [ENDPOINT,window.location.search])
    return (
        <div>
            <h1>Chat</h1>
        </div>
    )
}

export default Chat
