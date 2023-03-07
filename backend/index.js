const express = require("express")
const path = require("path")

const server = express();
server.use(express.static(__dirname+"/"))

server.get("/",(req,res)=>{
    res.sendFile(path.resolve(__dirname+"/../online-chatroom/public/index.html"))
})

server.listen(3000,()=>{
    console.log("server running");
})