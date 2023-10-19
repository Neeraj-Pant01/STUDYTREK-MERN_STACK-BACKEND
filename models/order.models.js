const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    courseId:{
        type:String,
        required:true
    },
    courseName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    paymentIntent:{
        type:String,
        required:true
    },
    buyerId:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        required:false
    }
    
},{timestamps:true})

module.exports = mongoose.model('orders',orderSchema);