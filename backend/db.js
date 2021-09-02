const mongoose=require('mongoose')
const mongoURI='mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
const connect_to_Mongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Successfully connected to MongoDatabase")
    })
}
module.exports=connect_to_Mongo