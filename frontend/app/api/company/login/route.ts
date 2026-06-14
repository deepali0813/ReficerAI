import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Company from "@/models/Company";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    // Check if company exists
    const company = await Company.findOne({ email });

    if (!company) {
      return NextResponse.json(
        {
          success: false,
          message: "Company not found.",
        },
        { status: 404 }
      );
    }

    // Check password
    if (company.password !== password) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Login successful!",
        company: {
          id: company._id,
          companyName: company.companyName,
          email: company.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}