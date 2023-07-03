const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors()); // Add cors middleware

// --- defining the server
const server = http.createServer(app);
const SYS_USER = 'System';
let chatroom = '';
let userlist = [];

// Setup server with cors (cross origin resource sharing) for methods: get/post
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
})

// Listen for client connects
io.on('connection', (socket) => {
    console.log(`User connected [ID: ${socket.id}].`);

    // Add a user to a room
    socket.on('join_room', (data) => {
        const { username, room } = data;
        socket.join(room);
        chatroom = room;
        userlist.push({id: socket.id, username, room });
        chatRoomUsers = userlist.filter((user) => user.room === room);
        socket.to(room).emit('chatroom_users', chatRoomUsers);
        socket.emit('chatroom_users', chatRoomUsers);

        // Current Timestamp
        let __createdtime__ = Date.now();

        socket.to(room).emit('receive_message', {
            message: `${username} has joined the chat room.`,
            username: SYS_USER,
            __createdtime__,
        });

        // Send welcome message
        socket.emit('receive_message', {
            message: `Welcome $(username)`,
            username: SYS_USER,
            __createdtime__,
        })
    });
});



app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(4000, () => 'Server is running on port 4000');