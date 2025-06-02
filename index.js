const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins (for testing)
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Listen for a message from a client
    socket.on('messageFromClient', (data) => {
        console.log(`Message from ${socket.id}:`, data);

        // Broadcast to all other sockets except the sender
        socket.broadcast.emit('messageFromServer', data);

    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server listening at http://localhost:3000');
});


process.on('SIGINT', () => {
    console.log('Shutting down server...');
    io.close(() => {
        server.close(() => {
            process.exit(0);
        });
    });
});