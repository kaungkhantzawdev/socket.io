const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);


app.get('/', (req, res)=>{
  res.sendFile(__dirname+'/public/index.html');
})


io.on('connection', (socket) => {
  console.log('socket connected with user'+ socket.id);

  socket.on('chat', (data) => {
    console.log(data);
    io.emit('chat', data)
  });

  socket.on('typing', (data) => {
    console.log(data);
    socket.broadcast.emit('typing', data);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})

server.listen(4000, () => console.log('listing on port 4000'));
