import React ,{useState,useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import {Card,CardContent,Button,Typography,TextField,AppBar,Toolbar} from '@material-ui/core'

let socket;

const Chat = () => {
     const [name,setName] = useState('');
     const [room,setRoom] = useState('');
     const [message,setMessage] = useState("")
     const [messages,setMessages] = useState([]);
     const ENDPOINT = 'localhost:5000'
    useEffect(() => {
        const {name,room} = queryString.parse(window.location.search)
        //console.log(window.location.search) //this shows us that the query string turns the string that we get from the window.location.search into object where it give us only the text in the search
        //console.log(data)
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);
        socket.emit('join',{ name,room },(error)=>{

            console.log(error)
            //this is a call back function recive informations from the .on
        })
        //note here we can send from one local host to another using the socket here we have defined teh port we want to send to then we gave the order emit and it will send it to the order .on which mean recive that have teh same name as the emitter
        // i had a problem here wiht the cors
        // the proplem here was because i havent specified the cores header for the server
        return ()=>{
            socket.emit('dsconnect');
            socket.off()// it turns the socet off for the user 
        }
    }, [ENDPOINT,window.location.search])

    useEffect(()=>{
        socket.on('message',(message)=>{
                setMessages([...messages,message])
                // spread + add 
        })
    },[messages]);

    //function for sending messages
    const sendMessage = (event) =>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage',message, ()=>setMessage("") )
        }
    }
    console.log(message,messages)
    return (
        <Card className="chat">
             <AppBar position="static">
                <Toolbar className="bar">
                    <Typography variant="h6" >
                    {room}
                    </Typography>
                    <Button  color="inherit">Logout</Button>
                </Toolbar>
             </AppBar>
             <CardContent>
           <div>seperator<br/>
           seperate
           </div>
           </CardContent>
           <div className="input">
            <input className="textbox" variant="outlined" value={message}
             onChange={(e)=>setMessage(e.target.value)}
             onKeyPress={event => event.key =="Enter" ? sendMessage(event):null}/>
            <button className="input-btn">SEND</button>
            </div>
        </Card>
    )
}

export default Chat

