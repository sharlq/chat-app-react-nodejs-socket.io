const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router')
const { setServers } = require('dns');
const { Socket } = require('dgram');
const { callbackify } = require('util');

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

    socket.on('join',({name,room})=>{
        console.log(name, room)

        
      /*  if(error){
            callback({error: 'error'}) // this pass object to the emiter to its third argument where its a call back function 
        }*/
    })
    
    socket.on('disconnect',()=>{
        console.log('User had left !!!')
    })
})

app.use(router);


server.listen(PORT, ()=> console.log(`sever has started on port ${PORT}`))