const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 9000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});



// cd C:\xampp\htdocs\aldas\Viktorina.live\Chat
// node chat_server.js
