const express = require('express');
const socketio = require('socket.io');
const http = require('http');
// const cors = require('cors');

const router = require('./router');
const { addUser, removeUser, getUser, getUsersInroom } = require('./users');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server, { 
    cors:{
        origin:"*"
    }
});

io.on('connection', (socket) => {
    socket.on('join', ({name,room}, callback) =>{
        const { error, user } = addUser({id:socket.id, name, room});
    


        if(error) return callback({error: "error"});

        socket.emit('message', {user:'admin', text: `${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user:"admin,", text: `${user.name}, has joined!`});
        
        socket.join(user.room);

        callback();
        
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        iio.to(user.room).emit('message', {user: user.name, text: message});

        callback();
    })

    io.on('disconnect', () =>{
        console.log('User had left!!!');
    });
})

// app.use(cors());
app.use(router);
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));