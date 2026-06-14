import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { productId, message } = await req.json();

    return NextResponse.json({
      success: true,
      response: `This is a temporary AI response for product ${productId}. You asked: "${message}"`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}