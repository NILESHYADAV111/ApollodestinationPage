import mongoose  from "mongoose";

const mongoDBURI = process.env.mongoDB_URI;


export const connetDB = async()=>{
    try{
        await mongoose.connect(mongoDBURI);
        console.log("connection succesfull");
    }catch(error){
       throw error;
    };
    
}
