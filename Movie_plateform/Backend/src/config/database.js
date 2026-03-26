const mongoose = require("mongoose")


const connectedToDb = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Successfully connected to database");
        
    })
}

module.exports = connectedToDb