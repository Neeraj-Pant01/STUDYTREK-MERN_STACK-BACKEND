const { getUser, getAllUsers, deleteUser, updateUser } = require("../controllers/users");
const verifyToken = require("../middlewares/jwtVerify");

const router = require("express").Router()

router.get('/get/:id',verifyToken,getUser)
router.get('/',verifyToken,getAllUsers)
router.put('/:id',verifyToken, updateUser)
router.delete('/:id',verifyToken,deleteUser)

module.exports = router;