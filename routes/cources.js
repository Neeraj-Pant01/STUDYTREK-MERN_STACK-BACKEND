const { getAllAvail, getpurchased, getSingleCourse, uploadCourse, deleteCourse, updateCourse, getAllCourses } = require("../controllers/courses")
const verifyToken = require("../middlewares/jwtVerify")

const router = require("express").Router()

//get all available courses
router.get('/all',getAllAvail)

//get all purchased courses
router.get('/all/orders',verifyToken,getpurchased)

//get a single course
router.get('/:id',getSingleCourse)

//upload a course
router.post('/upload',verifyToken,uploadCourse)

//update a course
router.put('/:id',verifyToken, updateCourse)

//delete a course
router.delete('/delete/:id',verifyToken,deleteCourse)

//get all  courses with query
router.get('/',getAllCourses)
module.exports = router