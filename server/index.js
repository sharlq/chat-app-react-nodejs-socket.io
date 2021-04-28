const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const { setServers } = require('dns');

const PORT = process.env.PORT || 5000 ; // because when deployment because the sevrver will going to require a spicific prot and it will be there

const app = express();
const server = http.createServer(app)
const io = socketio(server);

server.listen(PORT, ()=> console.log(`sever has started on port ${PORT}`))