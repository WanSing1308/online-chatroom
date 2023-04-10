const User = require("../models/user");
const Chatroom = require("../models/chatroom");

createUser = async (req,res)=>{

    console.log(req.body);
    try{
        const user =  await User.findOne({username:req.body.userName})

        if (user){
            res.json({success:false,message:"user already exists"})
        }

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
    const {userID} = req.params
    try{
        const result = await User.findOne({_id:userID},"chatrooms").populate({
            path: "chatrooms",
            select: "chatroomName"
          });

        res.json({chatrooms:result.chatrooms})
    }
    catch(err){
        res.json({success:false,error:err})
    }
    
}

sendMessage = async (req,res)=>{
    const {chatroomID,userID} = req.params
    const {content} =  req.body

    try{
        if (!userID)
            throw "userId needed"

        const user = await User.findById({_id:userID})

        if (!user)
            throw "user not exist"

        await Chatroom.findOneAndUpdate({_id:chatroomID},{$push:{messages:{sender:user._id,content:content}}})
        res.json({success:true})
    }
    catch(err){
        res.json({success:false,error:err})
    }
}

getMessage = async (req,res)=>{

    const {chatroomID,userID} = req.params
    try{
        let result = await Chatroom.findOne({_id:chatroomID},"messages").populate({
            path: "messages.sender",
            select: "userName"
          });
        result = result.toObject()
        result.messages = result.messages.map(message => ({...message,fromSelf:userID==message.sender._id}))
        res.json(result.messages)
    }
    catch(err){
        res.json({sucess:false,error:err})
    }
}

addUser = async (req,res)=>{

    const {chatroomID}= req.params
    const {userName} = req.body
    try{

        const user = await User.findOneAndUpdate({userName:userName},{$push:{chatrooms:chatroomID}})

        await Chatroom.findOneAndUpdate({_id:chatroomID},{$push:{members:user._id}})

        res.json({success:true})
    } 
    catch(err){
        res.json({success:false})
    }
}

deleteMessage = async (req,res)=>{

    const {chatroomID,messageID} = req.params
    try{
        await Chatroom.findOneAndUpdate(
            {
                _id:chatroomID,
                "messages._id":messageID
            },
            {$pull:{messages:{_id:messageID}}}
            )

        res.json({success:true})
    }
    catch(err){
        res.json({success:false,error:err})
    }
}

module.exports = {createUser,userLogin,createChatroom,sendMessage,getMessage,fetchChatrooms,deleteMessage,addUser}