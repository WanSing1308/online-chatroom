const express = require("express");
const mongoose = require("mongoose")
const path = require("path");
const {Server} = require("socket.io")
var cors = require('cors');

const router = require("./router/router")
require("dotenv").config();
const PORT = process.env.PORT||3000;
const app = express();

console.clear()

app.use(express.static(path.resolve(__dirname+ "/../online-chatroom/build")));
app.use(express.static("public"));
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/api",router)
app.get("/",(req,res)=>{
    res.sendFile(path.resolve(__dirname+"/../online-chatroom/build/index.html"))
})

app.use("*",(req,res)=>{
    res.json({error:"404"})
})

async function start(){
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected")
        const server = app.listen(PORT,()=>{
            console.log(`server running on ${PORT}`);
        })
        setUpSocket(server)
    }
    catch(err){
        console.log("can't connect to DB")
    }
}
const onlineUser = new Map();

function setUpSocket(server){
    const io = new Server(server,{
        cors: {
          origin: "http://localhost:3000"
        }
      })
    io.on("connection",(socket)=>{
        
        socket.on("login",(data)=>{
            const {userID,userName} = data
            onlineUser.set(userID,{socketID:socket.id,userName:userName})
        })
        socket.on("logout",(userID)=>{
            onlineUser.delete(userID)
        })
        socket.on("join",(roomID)=>{
            socket.join(roomID)
        })
        socket.on("leave",(roomID)=>{
            socket.leave(roomID)
        })
        socket.on("send-msg",(roomID)=>{
            socket.to(roomID).emit("reload-msg")
        })
        socket.on("delete-msg",(roomID)=>{
            socket.to(roomID).emit("reload-msg")
        })
        socket.on("invite-to-room",(userName)=>{
            for (let [key,value] of onlineUser.entries()){
                value.userName === userName && socket.to(value.socketID).emit("reload-room") 
            }
            
        })

    })
    
}
start()


