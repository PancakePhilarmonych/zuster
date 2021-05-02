const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);


const startServer = (port) => {
  app.use(express.static(__dirname + '/node_modules'));

  app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    console.log("Server lOG");
  });

   io.on('connection', (socket) => {
     console.log('a user connected');

     socket.on('disconnect', () => {
       console.log('user disconnected');
     });

     socket.on('chat message', (msg) => {
       console.log('message: ' + msg);
     });

     socket.on('chat message', (msg) => {
       io.emit('chat message', msg);
     });

     socket.broadcast.emit('hi');
   });

  http.listen(port, () => {
    console.log(io)
    console.log(`listening on *:${port}`);
  });
}

module.exports = startServer
