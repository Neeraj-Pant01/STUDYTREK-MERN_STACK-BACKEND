const { postAblog, deleteBlog, getAblog, getAllBlogs, getAllProfileBlogs } = require("../controllers/blogs.controller");
const verifyToken = require("../middlewares/jwtVerify");

const router = require("express").Router();

//post a blog
router.post('/',verifyToken,postAblog)

//delete a blog
router.delete('/:id',verifyToken,deleteBlog)

//get a blog
router.get('/:id',getAblog)

//get all blogs
router.get('/blogs',getAllBlogs)

//get user's all blogs
router.get('/all',verifyToken,getAllProfileBlogs)

module.exports = router;