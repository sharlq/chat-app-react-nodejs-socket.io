import React ,{useState,useEffect,useRef} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import {Card,CardContent} from '@material-ui/core'
import Input from "./Input"
import Infobar from "./infobar"
import Messages from "./Messages"
let socket;

const Chat = () => {
     const [name,setName] = useState('');
     const [room,setRoom] = useState('');
     const [message,setMessage] = useState("")
     const [messages,setMessages] = useState([]);
     const messagesRef = useRef();
     const messagesBox= document.getElementById("messagesBox")
     const ENDPOINT = 'https://real-time-chat-app-shehab.herokuapp.com/' 

    useEffect(() => {
        const {name,room} = queryString.parse(window.location.search)
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);
        socket.emit('join',{ name,room },(error)=>{
        if(error){
        console.log(error)}
            
        })
        
        return ()=>{
            socket.emit('dsconnect');
            socket.off()
        }
    }, [ENDPOINT,window.location.search])

    useEffect(()=>{
        socket.on('message',(message)=>{
                setMessages([...messages,message])
       
        })
        if(messagesBox){
            messagesBox.scrollTo(0, messagesRef.current.scrollHeight);}
    },[message]);

    
    const sendMessage = (event) =>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage',message, ()=>setMessage("") )
        }
        
    }

    return (
        <Card className="chat">
            <Infobar room={room}/>
            <CardContent  id="messagesBox" className="messages-container">
           <Messages ref={messagesRef} messages={messages} name={name}/>
           </CardContent>
           <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        </Card>
    )
}

export default Chat

