const User = require("../models/user");
const Chatroom = require("../models/chatroom");

/* createUser = async (req,res)=>{
    console.log(req.body)
    res.json({testing:true})
}

function createChatroom(req,res){
    const {chatroomName,userName} = req.body
    User.findOne({name:userName}).exec((err,user)=>{
        if (err){
            console.log("error happened in finding the user")
            res.json({success:false})
        }
        if (!user){
            console.log("User not exist")
            res.json({success:false})
        }
        Chatroom.findOneAndUpdate({name:chatroomName},{$push:{members:user._id}},{new:true},(err,chatroom)=>{
            if (err)
            res.json({success:false})
            else
                res.json({success:true})
        })
    })
}
function sendMessage(req,res){

}
function deleteRoom(req,res){

}
function deleteMessage(req,res){

}
function UserLogin(req,res){
    
}
module.exports = {createUser} */