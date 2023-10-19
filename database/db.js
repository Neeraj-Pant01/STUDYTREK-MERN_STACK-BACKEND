const mongoose = require("mongoose");

module.exports = connection = async () =>{
    try{
        await mongoose.connect(`${process.env.DBURL}`)
        console.log("database is connected sucessfully !")
    }catch(err){
        console.log(err)
    }
}