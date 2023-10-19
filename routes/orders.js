const { purchaseCourse } = require("../controllers/order");
const verifyToken = require("../middlewares/jwtVerify");

const router = require("express").Router();

router.post('/buy/:id',verifyToken,purchaseCourse)

module.exports = router;