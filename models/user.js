const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")
const mongooseVirtuals = require("mongoose-lean-virtuals");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
        
    },
    number:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    isSeller:{
        type:Boolean,
        default:false,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    profilepic:{
        type:String,
        required:false
    },
    purchasedCourses:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"courses"
        }
    ]
    ,
    otherinfo:{
        type:[mongoose.Schema.Types.Mixed]
    }
},
{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals: true}
})

userSchema.plugin(mongoosePaginate)
userSchema.plugin(mongooseVirtuals);

userSchema.virtual('courses',{
    ref:"courses",
    localField:"_id",
    foreignField:"userId",
    justOne:true
})

module.exports = mongoose.model('users',userSchema)