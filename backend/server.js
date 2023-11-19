// require('dotenv').config()

// const express = require('express')
// const mongoose = require('mongoose')
// const workoutRoutes = require('./routes/workouts')
// const userRoutes= require('./routes/user');
// const profileRoutes= require('./routes/profile');
// const cors= require('cors');
// const http= require('http');
// const {Server}= require('socket.io');
// // express app
// const app = express()
// app.use(cors());
// // middleware
// app.use(express.json())

// app.use((req, res, next) => {
//   console.log(req.path, req.method)
//   next()
// })

// // routes
// app.use('/api/workouts', workoutRoutes)
// app.use('/api/user', userRoutes);
// app.use('/api/profile', profileRoutes);

// //socket
// const server= http.createServer(app);
// const io= new Server(server, {
//     cors: {
//       origin:" http://localhost:5173",
//       methods: ["GET", "POST"],
//     },
// });

// io.on("connection", (socket)=>{
//   console.log("Hello Socket");
//   console.log(`user connected: ${socket.id}`);
// });
// // connect to db
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     // listen for requests
//     app.listen(process.env.PORT, () => {
//       console.log('connected to db & listening on port', process.env.PORT)
//     })
//   })
//   .catch((error) => {
//     console.log(error)
//   })

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const friendsRoutes= require("./routes/friends");
const { addFriend } = require("./controllers/socketController");
const cors = require("cors");
// const http = require('http')
const { Server } = require("socket.io");

// express app
const app = express();
app.use(cors());

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/friends", friendsRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // create HTTP server using app.listen
    const server = app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });

    // create Socket.IO instance
    const io = new Server(server, {
      cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    // handle WebSocket connections
    io.on("connection", (socket) => {
      const { userid, username } = socket.handshake.query;
      console.log("Hello Socket");
      // console.log(`user connected: ${socket.id}`)
      console.log(userid);
      // Attach userid and username to the socket object
      socket.userid = userid;
      socket.username = username;
      socket.on("add_friend", (friendName, cb)=>{
           addFriend(socket, friendName, cb);
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
