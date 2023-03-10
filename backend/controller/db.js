const User = require("../models/user");
const Chatroom = require("../models/chatroom");

createUser = async (req,res)=>{
    console.log("creatUser")
    try{
        const user =  await User.findOne({username:req.body.userName})
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
    console.log("userLogin")
    try{
        const user =  await User.findOne(req.body)
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
    console.log("createChatroom")
    const {chatroomName,userName} = req.body
    try{
        const user = await User.findOne({userName:userName})
        await Chatroom.create({chatroomName:chatroomName})
        await Chatroom.findOneAndUpdate({chatroomName:chatroomName},{$push:{members:user._id}})
        res.json({success:true})
    }
    catch(err){
        res.json({succes:false,error:err})
    }
}
/* AddUser = async (req,res)=>{
    const {chatroomName,userName} = req.body
    try{
        const user = await User.findOne({name:userName})
        await Chatroom.create({name:chatroomName})
        await Chatroom.findOneAndUpdate({name:chatroomName},{$push:{members:user._id}})
        res.json({success:true})
    }
    catch(err){
        res.json({succes:false,error:err})
    }
} */

sendMessage = async (req,res)=>{
    console.log("sendMessage");
    const {content,userName,chatroomName} =   req.body
    try{
        const user = await User.findOne({userName:userName})
        await Chatroom.findOneAndUpdate({chatroomName:chatroomName},{$push:{messages:{sender:user._id,content:content}}})
        console.log("sendMessage success");
        res.json({success:true})
    }
    catch(err){
        res.json({success:false,error:err})
    }
}
getMessage = async (req,res)=>{
    console.log("getMessage")
    const {chatroomName} = req.body
    try{
        const messages = await Chatroom.findOne({chatroomName:chatroomName},"messages").populate({
            path: "messages.sender",
            select: "userName"
          });
          console.log(messages)
          console.log("getMessage success")
        res.json(messages)
    }
    catch(err){
        res.json({sucess:false,error:err})
    }
}
fetchChatrooms = async (req,res)=>{
    console.log("fetchChatrooms")
    const {userName} = req.body
    try{
        const user = await User.findOne({userName:userName})
        const chatrooms = await Chatroom.find({members:user._id})
        console.log("fetchChatrooms success")
        res.json(chatrooms)
    }
    catch(err){
        res.json({success:false,error:err})
    }
    
}

deleteMessage = async (req,res)=>{
    console.log("deleteMessage");
    const {messageId} = req.params
    try{
        await Chatroom.findOneAndUpdate(
            {"messages._id":messageId},
            {$pull:{messages:{_id:messageId}}}
            )
            console.log("deleteMessage success");
        res.json({success:true})
    }
    catch(err){
        res.json({success:false,error:err})
    }
}

module.exports = {createUser,userLogin,createChatroom,sendMessage,getMessage,fetchChatrooms,deleteMessage}