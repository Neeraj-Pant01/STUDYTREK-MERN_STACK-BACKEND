const express = require("express");
const connection = require("./database/db.js")
const dotenv = require("dotenv").config()
const cors = require("cors")
const authRoute = require("./routes/auth.js")
const userRoute = require("./routes/users.js")
const courseRoute = require("./routes/cources.js")
const orderRoute = require("./routes/orders.js")

const app = express();
app.use(express.json())    
app.use(cors())

app.use((err,req,res,next)=>{
    const errStatus = err.status || 500;
    const errMessage = err.message || "something went wrong !"
    return res.status(errStatus).send(errMessage)
})

app.use('/api/v1/auth',authRoute)
app.use('/api/v1/users',userRoute)
app.use('/api/v1/courses',courseRoute)
app.use('/api/v1/orders',orderRoute)

const port = 9000;

app.listen(port,()=>{
    connection()
    console.log(`app is listening at the port ${port} `)
})