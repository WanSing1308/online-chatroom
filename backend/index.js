const express = require("express");
const mongoose = require("mongoose")
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT||3000;
const server = express();
/* const {createUser} = require("./controller/db") */

server.use(express.static(path.resolve(__dirname+ "/../online-chatroom/build")));
server.use(express.static("public"));
server.use(express.json())

server.get("/",(req,res)=>{
    res.sendFile(path.resolve(__dirname+"/../online-chatroom/build/index.html"))
})
/* server.post("/adduser",createUser()) */

server.use("*",(req,res)=>{
    res.send("Page not found")
})
async function start(){
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected")
        server.listen(PORT,()=>{
            console.log(`server running on ${PORT}`);
        })
    }
    catch(err){
        console.log(`Error: ${err}`)
    }
    
}
start()
