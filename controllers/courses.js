const courseModel = require("../models/courses.js");
const userModel = require("../models/user.js");
const orderModel = require("../models/order.models.js");
const createError = require("../utils/createError.js");

exports.getAllAvail = async (req,res,next) =>{
    try{
        const courses = await courseModel.find();
        res.status(200).json(courses)
    }catch(err){
        next(err)
    }
}


//get all purchased courses
exports.getpurchased = async (req,res,next) =>{
    try{
        const orders = await orderModel.find({buyerId:req.payload.id})
        if (orders) {
            res.status(200).json(orders);
        }else{
            return next(createError(401,"you need to purchase a course to start !"))
        }
    }catch(err){
        next(err)
    }
}


exports.getSingleCourse = async(req,res,next) =>{
    try{
        const userId = req.body.userId;
        const course = await courseModel.findById(req.params.id)
        if(course.buyers.includes(userId))
        {
        res.status(200).json(course)
        }else{
            const {lectures, buyers, ...others} = course._doc
            res.status(200).json(others)
        }
    }catch(err){
        next(err)
    }
}


exports.uploadCourse = async(req,res,next) =>{
    try{
        const user = await userModel.findById(req.payload.id)
        if(user.isSeller){
            const newCourse = new courseModel({userId:user._id ,...req.body})
            await newCourse.save()
            res.status(200).json(newCourse)
        }else{
            return next(createError(401,"you are not allowed to do this action !"))
        }
    }catch(err){
        next(err)
    }
}


exports.deleteCourse = async(req,res,next) =>{
    try{
        const user = await userModel.findById(req.payload.id)
        const course = await courseModel.findById(req.params.id)
        if(user.isAdmin && course.userId===user._id){
        await courseModel.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"course has been deleted successfully !"})
        }else{
            next(createError(401,"only admins can delete the couses !"))
        }
    }catch(err){
        next(err)
    }
}


exports.updateCourse = async (req,res,next) =>{
    try{
        const course = await courseModel.findById(req.params.id)
        if(req.payload.isSeller || course.userId === req.payload.id){
            try{
                const course = await courseModel.findByIdAndUpdate(req.params.id,{
                    $set : req.body
                },{
                    new: true
                })
                res.status(200).json(course)
            }catch(err){
                next(err)
            }
        }else{
            return next(createError(404,"you are not authenticated to process this request !"))
        }
    }catch(err){
        next(err)
    }
}

//get all courses
exports.getAllCourses = async (req,res,next) =>{
    const q = req.query;
    const filters = {
        ...(q.userId && {userId: q.userId}),
        ...(q.search && {name: {$regex: q.search, $options: "i"} })
    }
    try{
        const response = q.show ? await courseModel.find().limit(6) : await courseModel.find(filters).sort({createdAt: -1});
        res.status(200).json(response)
    }catch(err){
        next(err)
    }
}