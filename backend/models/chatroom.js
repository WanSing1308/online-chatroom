const mongoose = require("mongoose")

const ChatroomSchema = mongoose.Schema({
    chatroomName:{
      type:String,
      required:true
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    messages:[{
      sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      },
      time:{
        type:Date,
        default:Date.now
      },
      content:{
        type:String,
        required:true,
      }
    }]
})

module.exports = mongoose.model("Chatroom",ChatroomSchema)

 