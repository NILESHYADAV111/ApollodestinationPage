import { connetDB } from "@/lib/db";
import { Doctor } from "@/model/doctormodel";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connetDB();

  const { searchParams } = new URL(request.url);

  
  
  // Fetch search parameters
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;

  const filters = {};

  // Dynamic filtering based on search parameters
  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { specialization: { $regex: search, $options: "i" } },
      { degree: { $regex: search, $options: "i" } },
      { city: { $regex: search, $options: "i" } },
      { clinicName: { $regex: search, $options: "i" } },
    ];
  }

  // Handle additional filters if provided
  const city = searchParams.get("city");
  const specialization = searchParams.get("specialization");
  const degree = searchParams.get("degree");
  const rating = searchParams.get("rating");
  const consultationFee = searchParams.get("consultationFee");
  const name = searchParams.get("name"); // Added name filter

  if (city) filters.city = { $regex: city, $options: "i" };
  if (specialization) filters.specialization = { $regex: specialization, $options: "i" };
  if (degree) filters.degree = { $regex: degree, $options: "i" };
  if (rating) filters.rating = { $gte: rating }; // Assuming rating is a numeric field
  if (consultationFee) filters.consultationFee = { $lte: consultationFee }; // Assuming fee is numeric
  if (name) filters.name = { $regex: name, $options: "i" }; // Added name filter

  try {
    const skip = (page - 1) * limit;
    const doctors = await Doctor.find(filters).skip(skip).limit(limit);
    const total = await Doctor.countDocuments(filters);

    return NextResponse.json({ total, page, limit, doctors });
  } catch (error) {
    return NextResponse.json(
      {
        message: "error fetching doctors",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

