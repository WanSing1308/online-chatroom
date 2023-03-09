const User = require("../models/user");
const Chatroom = require("../models/chatroom");

createUser = async (req,res)=>{
    const {name,password} = req.body
    try{
        await User.create({name,password})
        res.json({success:true})
    }
    catch(err){
        res.json({success:false})
    }
}
userLogin = async (req,res)=>{
    
    try{
        const user =  await User.findOne(req.body)
        if (user)
        {   
            res.json({success:true})
        }
        else{
            res.json({success:false,message:"username or password incorrect"})
        }
        
    }
    catch(err){

        res.json({sucess:false,message:"Error occured"})
    }
}
createChatroom = async (req,res)=>{
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
    const {content,username,chatroomName} =   req.body
    console.log(content,username)
    try{
        const user = await User.findOne({name:username})
        await Chatroom.findOneAndUpdate({name:chatroomName},{$push:{messages:{sender:user._id,content:content}}})
        res.json({sucess:true})
    }
    catch(err){
        res.json({succes:false,error:err})
    }
}
getMessage = async (req,res)=>{
    const {chatroomName} = req.body
    try{
        const messages = await Chatroom.findOne({name:chatroomName},"messages")
        res.json(messages)
    }
    catch(err){
        res.json({sucess:false,error:err})
    }
}
function deleteRoom(req,res){

}
function deleteMessage(req,res){

}

module.exports = {createUser,userLogin,createChatroom,sendMessage,getMessage}