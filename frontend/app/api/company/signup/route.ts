import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Company from "@/models/Company";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { companyName, email, password, contact, website } = body;

    // Check if company already exists
    const existingCompany = await Company.findOne({ email });

    if (existingCompany) {
      return NextResponse.json(
        {
          success: false,
          message: "Company already registered with this email.",
        },
        { status: 400 }
      );
    }

    // Create new company
    const company = await Company.create({
      companyName,
      email,
      password,
      contact,
      website,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Company registered successfully!",
        company,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}