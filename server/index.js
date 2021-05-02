const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router')
const {addUser,removeUser,getUser} = require('./users')


const PORT = process.env.PORT || 5000 ; 

const app = express();
const server = http.createServer(app)
const io = socketio(server,{
    
    cors:{
        origin:"*",
        methods:["GET","POST"]
    },
  
},{  wsEngine: require("eiows").Server }); 

io.on('connection', (socket)=>{
    console.log('we have a new connection!!!');

    socket.on('join',({name,room},callback)=>{
        console.log(name, room)
        const {error,user}=addUser({id:socket.id,name,room})
        if(error) return callback(error);
        socket.join(user.room);
     
        socket.emit('message',{user:'admin',text:`${user.name},welcome to the room ${user.room}`})
        
        socket.broadcast.to(user.room).emit('message',{user:"admin",text:`${user.name}, has joined!`})
      

       
        callback()
      
     

    });
    
   
    socket.on('sendMessage',(message,callback)=>{
        const user = getUser(socket.id)
        io.to(user.room).emit('message',{user:user.name,text: message})
        callback();
    })
 
  
    
  

    socket.on('dsconnect',()=>{
        console.log('User had left !!!')
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message',{user: 'admin' ,text:`${user.name} has left.`})
        }
    })
})

app.use(router);



server.listen(PORT, ()=> console.log(`sever has started on port ${PORT}`))