const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('blogs',blogSchema)