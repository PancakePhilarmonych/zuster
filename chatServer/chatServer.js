const express = require('express');
const app = express();
const path = require('path')

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const startServer = (port) => {
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
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
    console.log(`listening on *:${port}`);
  });
}

module.exports = startServer
