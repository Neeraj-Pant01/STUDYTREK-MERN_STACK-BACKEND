const bcrypt = require("bcrypt");
const userModel = require("../models/user.js");
const createError = require("../utils/createError.js")
const jwt = require('jsonwebtoken')

exports.register = async(req,res,next)=>{
    try{
        const user = await userModel.findOne({email:req.body.email})
        if(user) return next(createError(400, "user with this email is alredy exists !"))

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt)

        const newUSer = new userModel({...req.body, password:hashPass,isSeller:false, isAdmin:false})
        
        await newUSer.save()
        res.status(200).json(newUSer);
    }catch(err){
        next(err)
    }
}

//register as seller
exports.registerSeller = async(req,res,next)=>{
    try{
        const user = await userModel.findOne({email:req.body.email})
        if(user) return next(createError(400, "user with this email is alredy exists !"))

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt)

        const newUSer = new userModel({...req.body, password:hashPass, isSeller:true})
        await newUSer.save()
        res.status(200).json(newUSer);
    }catch(err){
        next(err)
    }
}

exports.login = async(req,res,next)=>{
    try{
        const user = await userModel.findOne({email:req.body.email});
        if(!user) return next(createError(404, "no such user is found with this email"))

        const isCorrect = await bcrypt.compare(req.body.password, user.password)

        if(!isCorrect) return next(createError(401, "email or password didn't matched"))

        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin, isSeller:user.isSeller},process.env.JWTKEY,{expiresIn:"1d"})
        const {password,...others} = user._doc;

        res.status(200).json({...others, token})
    }catch(err){
        next(err)
    }
}


//login with google
exports.loginWithGoogle = async (req,res,next) =>{
    try{
        const user = await userModel.findOne({email:req.body.email})

        if(user){
            const token = jwt.sign({id:user._id, isAdmin:user.isAdmin, isSeller:user.isSeller},process.env.JWTKEY,{expiresIn:"1d"})
            const {password,...others} = user._doc;
            
            res.status(200).json({...others, token})
        }else{
            const newUser = new userModel(req.body)
            const savedUser = await newUser.save()
            const token = jwt.sign({id:savedUser._id, isAdmin:savedUser.isAdmin, isSeller:savedUser.isSeller},process.env.JWTKEY,{expiresIn:"1d"})
            const {password,...others} = savedUser._doc;
            res.status(200).json({...others, token})
        }
    }catch(err){
        next(err)
    }
}
