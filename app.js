// Import Libraries, Modules, & Middlewares
const express = require('express');
const path = require('path');
const http = require('http');
const chatRouter = require('./routes/chat-route');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// Declare PORT Variable
const PORT = process.env.PORT || 5000;

// Use express to Specify Static Files Path
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use Routers
app.use('/', chatRouter);

// Fire socket io Events
io.on('connection', (socket) => {
  console.log('User is Connected');
  socket.on('disconnect', () => {
    console.log('User is Disconnected');
  });

  socket.on('chat message', (chatmsg) => {
    io.emit('chat message', chatmsg);
  });
});

// Listen to Server on Specific PORT
server.listen(PORT, () => {
  console.log(`Serve is Running on Port: ${PORT}`);
});