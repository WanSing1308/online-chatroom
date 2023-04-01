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
        console.log(user);
        if (user) 
            res.json({userID:user._id,success:true})
        else
            res.json({success:false,message:"username or password incorrect"}) 
    }
    catch(err){
        res.json({sucess:false,message:err})
    }
}

createChatroom = async (req,res)=>{
    console.log("createChatroom")
    const {userID} = req.params;
    const {chatroomName} = req.body
    try{
        const chatroom = await Chatroom.create({chatroomName:chatroomName})
        const user = await User.findByIdAndUpdate({_id:userID},{$push:{chatrooms:chatroom._id}})
        await Chatroom.findOneAndUpdate({_id:chatroom._id},{$push:{members:user._id}})
        res.json({success:true})
    }
    catch(err){
        res.json({succes:false,error:err})
    }
}

fetchChatrooms = async (req,res)=>{
    console.log("fetchChatrooms")
    const {userID} = req.params
    try{
        const chatrooms = await User.findOne({_id:userID},"chatrooms").populate({
            path: "chatrooms",
            select: "chatroomName"
          });
        console.log("fetchChatrooms success")
        res.json(chatrooms)
    }
    catch(err){
        res.json({success:false,error:err})
    }
    
}



sendMessage = async (req,res)=>{
    console.log("sendMessage");
    const {chatroomID,userID} = req.params
    
    const {content} =  req.body
    try{
        if (!userID)
            throw "userId needed"

        const user = await User.findById({_id:userID})
        if (!user)
            throw "user not exist"

        await Chatroom.findOneAndUpdate({_id:chatroomID},{$push:{messages:{sender:user._id,content:content}}})
        console.log("sendMessage success");
        res.json({success:true})
    }
    catch(err){
        res.json({success:false,error:err})
    }
}

getMessage = async (req,res)=>{
    console.log("getMessage")
    const {chatroomID,userID} = req.params
    try{
        let messages = await Chatroom.findOne({_id:chatroomID},"messages").populate({
            path: "messages.sender",
            select: "userName"
          });
        console.log(2);
        messages = messages.toObject()
        console.log(3);

        messages.messages = messages.messages.map(message => ({...message,fromSelf:userID==message.sender._id}))

        res.json(messages)
    }
    catch(err){
        res.json({sucess:false,error:err})
    }
}

addUser = async (req,res)=>{
    console.log("addUser")
    const {chatroomID}= req.params
    const {userName} = req.body
    console.log(userName)
    console.log(chatroomID)
    try{
        const user = await User.findOneAndUpdate({userName:userName},{$push:{chatrooms:chatroomID}})
        await Chatroom.findOneAndUpdate({_id:chatroomID},{$push:{members:user._id}})
        console.log("addUser success")
        res.json({success:true})
    } 
    catch(err){
        res.json({success:false})
    }
}

deleteMessage = async (req,res)=>{
    console.log("deleteMessage");
    const {chatroomID,messageID} = req.params
    try{
        await Chatroom.findOneAndUpdate(
            {
                _id:chatroomID,
                "messages._id":messageID
            },
            {$pull:{messages:{_id:messageID}}}
            )
            console.log("deleteMessage success");
        res.json({success:true})
    }
    catch(err){
        res.json({success:false,error:err})
    }
}

module.exports = {createUser,userLogin,createChatroom,sendMessage,getMessage,fetchChatrooms,deleteMessage,addUser}