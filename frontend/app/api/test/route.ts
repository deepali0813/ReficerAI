import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Company from "@/models/Company";

export async function GET() {
  try {
    await connectDB();

    const company = await Company.create({
      companyName: "Test Company",
      email: "test@example.com",
      password: "dummy123",
      contact: "9876543210",
      website: "https://test.com",
    });

    return NextResponse.json({
      success: true,
      data: company,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Database connection failed",
    });
  }
}