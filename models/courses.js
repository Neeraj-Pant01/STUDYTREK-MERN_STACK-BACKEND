const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")
const mongooseVirtuals = require("mongoose-lean-virtuals");

const courseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    likes: {
        type: Array,
        default: []
    },
    stars: {
        type: Number,
        max: 5,
        default: 0
    },
    totalStars: {
        type: Number,
        max: 5,
        default: 0
    },
    buyers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ]
    ,
    picture: {
        type: String,
        required: false
    },
    notes: {
        type: String,
        required: true
    },
    lectures: {
        type: [String],
        required: true
    },
    testSeries: {
        type: String,
        required: true
    },
    interviewQuestions: {
        type: String
    },
    features: {
        type: [String]
    },
    others: {
        type: [mongoose.Schema.Types.Mixed]
    }
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

courseSchema.plugin(mongoosePaginate)
courseSchema.plugin(mongooseVirtuals)

courseSchema.virtual('user', {
    ref: 'users',
    localField: 'userId',
    foreignField: "_id",
    justOne: true
})

module.exports = mongoose.model('courses', courseSchema)
