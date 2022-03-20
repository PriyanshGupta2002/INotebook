const mongoose=require('mongoose')
const mongoURI='mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
const connect_to_Mongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Successfully connected to MongoDatabase")
    })
}


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://Priyansh:Priyansh@25@inotebook.iv9bk.mongodb.net/inotebook?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// const connect_to_Mongo=()=>{client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// })};

module.exports=connect_to_Mongo