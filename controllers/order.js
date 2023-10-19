const courseModel = require("../models/courses.js")
const orderModel = require("../models/order.models.js")


exports.purchaseCourse = async(req,res,next) =>{
    try{
        const course = await courseModel.findById(req.params.id)
        const neworder = new orderModel({
            courseId:course._id,
            courseName:course.name,
            desc:course.desc,
            price:course.price,
            buyerId:req.payload.id,
            paymentIntent:req.body.paymentIntent
        })
        await neworder.save();
        res.status(200).json(neworder)
    }catch(err){
        next(err)
    }
}