const blogModel = require("../models/blog.model")

exports.postAblog = async (req,res,next) =>{
    try{
        const newBlog = new blogModel({
            userId: req.payload.id,
            ...req.body
        })
        await newBlog.save()
        res.status(200).json(newBlog);
    }catch(err){
        next(err)
    }
}

exports.getAblog = async (req,res,next) =>{
    try{
        const blog = await blogModel.findById(req.params.id)
        res.status(200).json(blog)
    }catch(err){

    }
}

exports.getAllBlogs = async (req,res,next) =>{
    try{
        const blogs = await blogModel.find().sort({createdAt: -1})
        res.status(200).json(blogs)
    }catch(err){
        next(err)
    }
}

exports.deleteBlog = async (req,res,next) =>{
    try{
        const blog = await blogModel.findById(req.params.id)

        if(blog.userId === req.payload.id){
            try{
               await blogModel.findByIdAndDelete(req.params.id)
               res.status(200).json({message:"user has been deleted successfully !"})
            }catch(err){
                next(err)
            }
        }
    }catch(err){
        next(err)
    }
}

//get a users all blogs 
exports.getAllProfileBlogs = async (req,res,next) =>{
    try{
        const blogs = await blogModel.find({userId:req.payload.id})
        res.status(200).json(blogs)
    }catch(err){
        next(err)
    }
}

