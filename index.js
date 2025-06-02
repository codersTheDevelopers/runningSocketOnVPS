// // server.js
// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: "*",  // allow all origins
//         methods: ["GET", "POST"]
//     }
// });

// io.on('connection', (socket) => {
//     console.log('Client connected:', socket.id);
//     socket.on('disconnect', () => {
//         console.log('Client disconnected:', socket.id);
//     });
// });
// //hello world how you are doing

// server.listen(3000, () => {
//     console.log('Server running at http://localhost:3000');
// });

const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!\n');
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}\nServer shut down after 2 minutes.`);

    // Automatically close server after 2 minutes
    setTimeout(() => {
        server.close(() => {
            console.log('Server shut down after 2 minutes.');
        });
    }, 2 * 60 * 1000); // 2 minutes
});
