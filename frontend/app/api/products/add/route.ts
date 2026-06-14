import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(req: Request) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Read request body
    const body = await req.json();

    const {
      productName,
      category,
      description,
      handlingInstructions,
      commonIssues,
      companyEmail,
    } = body;

    // Create new product
    const product = await Product.create({
      productName,
      category,
      description,
      handlingInstructions,
      commonIssues,
      companyEmail,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product added successfully!",
        product,
      },
      { status: 201 }
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