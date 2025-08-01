const { register, login, getUser, loginWithGoogle, registerSeller } = require("../controllers/auth");

const router = require("express").Router()

router.post('/register',register)

router.post('/login',login)

//sign in with google
router.post('/google',loginWithGoogle)

//register as seller
router.post('/seller/register',registerSeller)

//login as seller
// router.post('/seller/login')

module.exports = router;

