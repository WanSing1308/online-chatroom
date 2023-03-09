const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chatrooms"
    }]
})
module.exports = mongoose.model("User",UserSchema);