import { connetDB } from "@/lib/db";
import { Doctor } from "@/model/doctormodel";
import { NextResponse,NextRequest } from "next/server";




connetDB();


export async function POST(request){
   try{
    // await connetDB();
    const formData = await request.formData();
    const name = formData.get("name");
    const specialization = formData.get("specialization");
    const degree = formData.get("degree");
    const city = formData.get("city");
    const experience = Number(formData.get("experience"));
    const clinicName = formData.get("clinicName");
    const visitFee = Number(formData.get("visitFee"));
    const onLineFee = Number(formData.get("onLineFee"));
    const image = formData.get("image");

    
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = `data:${image.type};base64,${buffer.toString('base64')}`;

    if(!name || !specialization || !degree || !city || !experience || !clinicName || !onLineFee || !visitFee  || !image){
       return NextResponse.json(
            {message:"All fields and image is required"},
            {status:500}
        )
    };


    if (isNaN(onLineFee) || isNaN(visitFee) || isNaN(experience)) {
        return NextResponse.json(
          { message: "Experience, Online Fee and Visit Fee must be valid numbers" },
          { status: 400 }
        );
      }

    if(!image || typeof image === "string"){
        return NextResponse.json(
            {message:"Image file is required"},
            {status:400}
        )
    };

    const imageType = ["image/png","image/jpg","image/jpeg"];
    if(!imageType.includes(image.type)){
        return NextResponse.json(
            {message:"only jpg or png or jpeg file are allowed"},
            {status:400}
        )
    };

    const maxSize = 5 * 1024 * 1024;
    console.log(maxSize);
    if(image.size > maxSize){
        return NextResponse.json(
            {message:"image file should be less than 5MB"},
            {status:400}
        )
    };



 
   
    const doctor = new Doctor({name,specialization,degree,city,experience,clinicName,onLineFee,visitFee,image: base64Image});

      

    await doctor.save();

    return NextResponse.json({ message: "Form data received successfully" });

   }catch(error){
    console.error("Internal server error",error);
    return NextResponse.json(
        { message: "Internal server error", error: error.message },
        { status: 500 }
    )
   }



}

