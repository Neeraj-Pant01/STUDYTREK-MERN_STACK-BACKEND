const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    likes:{
        type:Array,
        default:[]
    },
    stars:{
        type:Number,
        max:5,
        default:0
    },
    totalStars:{
        type:Number,
        max:5,
        default:0
    },
    buyers:{
        type:Array,
        default:[]
    },
    picture:{
        type:String,
        required:false
    },
    notes:{
        type:String,
        required: true
    },
    lectures:{
        type:String,
        required:true
    },
    testSeries:{
        type:String,
        required: true
    },
    interviewQuestions:{
        type:String
    },
    features:{
        type:String
    }

},{timestamps:true})

module.exports = mongoose.model('courses',courseSchema)