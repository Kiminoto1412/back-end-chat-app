const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");

const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/auth", userRoutes);
app.use("/messages", messageRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on Posrt ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

//store all online user in this
global.onlineUsers = new Map();

//checkเมื่อมีคนconnect เข้ามา
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log("connect",onlineUsers)
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    // ถ้าคนที่จะส่งไปonlineอยู่ จะส่งmessageไปด้วย "msg-recieve" event
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });

//   socket.on("disconnect",() =>{
//     console.log("dis")
//     // ไม่สามารถ delete map by valueได้
//     onlineUsers.delete(socket.id)
//     console.log("dis",onlineUsers)
//   })
});
