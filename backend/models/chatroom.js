const mongoose = require("mongoose")

const ChatroomSchema = mongoose.Schema({
    chatroomname:{
      type:String,
      required:true
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    messages:[{
      sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
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

 