import mongoose from "mongoose";

export const connectToDb = (URL)=>{
    mongoose.connect(URL
    ).then(()=>{
        console.log("Connected to MongoDB")
    }).catch((err)=>{
        console.log(err) 
    })
}

