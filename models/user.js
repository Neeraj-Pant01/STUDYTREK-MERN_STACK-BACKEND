const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isSeller:{
        type:Boolean,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    profilepic:{
        type:String,
        required:false
    }
},{timestamps:true})

module.exports = mongoose.model('users',userSchema)