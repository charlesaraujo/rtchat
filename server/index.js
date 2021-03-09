const express = require('express');
const socketio = require('socket.io');
const http = require('http');
// const cors = require('cors');

const router = require('./router');
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server, { 
    cors:{
        origin:"*"
    }
});

io.on('connection', (socket) => {
    console.log('We have a new connection!!!');

    io.on('disconnect', () =>{
        console.log('User had left!!!');
    })
})

// app.use(cors());
app.use(router);
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));