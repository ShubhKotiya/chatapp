const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

const server = createServer(app);


const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});


io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  }); 
  

server.listen(port, () => {
    console.log(`SERVER RUNNING AT http://localhost:${port}`)
});

