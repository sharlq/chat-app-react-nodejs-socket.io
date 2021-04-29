const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router')
const {addUser,removeUser,getUser,getUserInRoom} = require('./users')


const PORT = process.env.PORT || 5000 ; // because when deployment because the sevrver will going to require a spicific prot and it will be there

const app = express();
const server = http.createServer(app)
const io = socketio(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
}); // this have solved it by defining the cores for the socket server

io.on('connection', (socket)=>{
    console.log('we have a new connection!!!');

    socket.on('join',({name,room},callback)=>{
        console.log(name, room)

        const {error,user}=addUser({id:socket.id,name,room})

        if(error) return callback(error);
        socket.join(user.room);
        // this joins user in room .join is used to subscribe the user into a channel
        /* And then simply use to or in (they are the same) when broadcasting or emitting:

            io.to('some room').emit('some event');
        */
        socket.emit('message',{user:'admin',text:`${user.name},welcome to the room ${user.room}`})
        //this will send message only to the spicific user to welcome him to the chat
        socket.broadcast.to(user.room).emit('message',{user:"admin",text:`${user.naem}, has joined!`})
        // this will send a message to every body that that user has joined


        callback()
      /*  if(error){
            callback({error: 'error'}) // this pass object to the emiter to its third argument where its a call back function 
        }*/

     

    });
    // i forgot to add the callback as an argument to the one above it ended up missing the one below

    // the emiting part of the message will be happening in the front end and here we are expecting the event on the backend so we are waiting on send message
   
    socket.on('send',(message,callback)=>{
        const user = getUser(socket.id)
        console.log(user)
        io.to(user.room).emit('message',{user:user.name,text: message})
        callback();
    })
   
  
    
    // it apears to be the problem is that this lestiner doest get the event

    socket.on('dsconnect',()=>{
        console.log('User had left !!!')
    })
})

app.use(router);


server.listen(PORT, ()=> console.log(`sever has started on port ${PORT}`))