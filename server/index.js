const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');
const { Socket } = require('dgram');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
      cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
      },
});

io.on("connection",(socket) => {
      console.log(socket.id);
      socket.on("joinRoom", (room) => {
            socket.join(room.room);
                  socket.to(room.room).emit("joinedRoom", room);
            console.log(`${room.author} Joined ${room.room} ${socket.id}`);
      })

      socket.on("sendMessage", (data) => {
            try {
                  socket.to(data.room).emit("recievedMessage", data);
            } catch (error) {
                  console.log(error.message);
            }
      });

      socket.on("exited", (data) => {
            data.status = "exited";
            socket.to(data.room).emit("exited", data);
      })

      socket.on("disconnect", () => {
            console.log("User Disconnected", socket.id);
      });
});

server.listen(3001, ()=>{
      console.log("Server started on 3001")
})