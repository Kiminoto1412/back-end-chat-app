const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose")

const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoutes")

const app = express();
require("dotenv").config();


app.use(cors());
app.use(express.json());

app.use("/auth",userRoutes)
app.use("/message",messageRoutes)

mongoose.connect(process.env.MONGO_URL,{
    useNewURLParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("DB Connection Successfull")
}).catch((err)=>{
    console.log(err.message);
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server Started on Posrt ${process.env.PORT}`)
})