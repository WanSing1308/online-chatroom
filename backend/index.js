const express = require("express");
const mongoose = require("mongoose")
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT||3000;
const app = express();
const router = require("./router/router")

async function start(){
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected")
        app.listen(PORT,()=>{
            console.log(`server running on ${PORT}`);
        })
    }
    catch(err){
        console.log("can't connect to DB")
    }
}

app.use(express.static(path.resolve(__dirname+ "/../online-chatroom/build")));
app.use(express.static("public"));

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/api",router)
app.get("/",(req,res)=>{
    res.sendFile(path.resolve(__dirname+"/../online-chatroom/build/index.html"))
})

app.use("*",(req,res)=>{
    res.json({error:"404"})
})

start()
