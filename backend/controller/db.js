const User = require("../models/user");
const Chatroom = require("../models/chatroom");

createUser = async (req,res)=>{
    try{
        const user =  await User.findOne({username:req.body.username})
        if (user)
            res.json({success:false,message:"user already exists"})
        else{
            await User.create(req.body)
            res.json({success:true})
        }   
    }
    catch(err){
        res.json({success:false,message:err})
    }
}
userLogin = async (req,res)=>{
    try{
        const user =  await User.findOne(req.body)
        console.log("login")
        if (user) 
            res.json({success:true})
        else
            res.json({success:false,message:"username or password incorrect"}) 
    }
    catch(err){
        res.json({sucess:false,message:err})
    }
}
createChatroom = async (req,res)=>{
    const {chatroomname,username} = req.body
    try{
        const user = await User.findOne({username:username})
        await Chatroom.create({chatroomname:chatroomname})
        await Chatroom.findOneAndUpdate({chatroomname:chatroomname},{$push:{members:user._id}})
        res.json({sucess:true})
    }
    catch(err){
        res.json({succes:false,error:err})
    }
}
AddUser = async (req,res)=>{
    const {chatroomName,userName} = req.body
    try{
        const user = await User.findOne({name:userName})
        await Chatroom.create({name:chatroomName})
        await Chatroom.findOneAndUpdate({name:chatroomName},{$push:{members:user._id}})
        res.json({sucess:true})
    }
    catch(err){
        res.json({succes:false,error:err})
    }
}
sendMessage = async (req,res)=>{
    const {content,username,chatroomname} =   req.body
    try{
        const user = await User.findOne({username:username})
        await Chatroom.findOneAndUpdate({chatroomname:chatroomname},{$push:{messages:{sender:user._id,content:content}}})
        res.json({success:true})
    }
    catch(err){
        res.json({success:false,error:err})
    }
}
getMessage = async (req,res)=>{
    console.log("getMessage")
    const {chatroomname} = req.body
    try{
        const messages = await Chatroom.findOne({chatroomname:chatroomname},"messages")
        /* .populate({
            path: "messages.sender",
            select: "username"
          }); */
        res.json(messages)
    }
    catch(err){
        res.json({sucess:false,error:err})
    }
}
fetchChatrooms = async (req,res)=>{
    console.log("fetching chatrooms")
    const {username} = req.body
    try{
        const user = await User.findOne({username:username})
        const chatrooms = await Chatroom.find({members:user._id})
        res.json(chatrooms)
    }
    catch(err){
        res.json({sucess:false,error:err})
    }
}

module.exports = {createUser,userLogin,createChatroom,sendMessage,getMessage,fetchChatrooms}