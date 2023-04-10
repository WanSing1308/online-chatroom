const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    chatrooms:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chatroom"
    }]
})
module.exports = mongoose.model("User",UserSchema);