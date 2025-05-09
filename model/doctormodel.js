import mongoose from "mongoose";

const doctorInformationShema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    clinicName:{
        type:String,
        required:true
    },
    onLineFee:{
        type:Number,
        required:true
    },
    visitFee:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
});

export const Doctor = mongoose.models.Doctor || mongoose.model("Doctor",doctorInformationShema);