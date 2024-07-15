const userModel = require("../models/user.js");
const createError = require("../utils/createError.js");

exports.getUser = async(req,res,next)=>{
    try{
        const user = await userModel.findById(req.params.id)
        if(!user) return next(createError(404,"user not found"))

        const {password, ...others} = user._doc;
        res.status(200).json(others)
    }catch(err){
        next(err)
    }
}

exports.getAllUsers = async (req,res,next) =>{
    if(req.payload.isAdmin){
        const users = await userModel.find().sort({createdAt: -1});
        res.status(200).json(users)
    }else{
        return next(createError(404, "you are not allowed to take this action !"))
    }
}

exports.deleteUser = async (req,res,next) =>{
    if(req.payload.isAdmin){
        try{
            await userModel.findByIdAndDelete(req.params.id);
            res.status(200).json({message:"user has been deleted !"})
        }catch(err){
            next(err)
        }
    }else{
        return next(createError(404,"you are not allowed to take this action !"))
    }
}

exports.updateUser = async (req,res,next) =>{
    if(req.payload.id === req.params.id){
        try{
            const user = await userModel.findByIdAndUpdate(req.params.id,{
                $set: req.body
            },{
                new: true
            })
            res.status(200).json(user)
        }catch(err){
            console.log(err)
        }
    }else{
        return next(createError(404,"you are not allowed to take this action"))
    }
}