import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
export async function POST(req: Request) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Read request body
    const formData = await req.formData();
    const productName =
  formData.get("productName") as string;

const category =
  formData.get("category") as string;

const description =
  formData.get("description") as string;

const handlingInstructions =
  formData.get("handlingInstructions") as string;

const commonIssues =
  formData.get("commonIssues") as string;

const companyEmail =
  formData.get("companyEmail") as string;

const pdf =
  formData.get("pdf") as File;
console.log("PDF received:", pdf?.name);
if (!pdf) {
  return NextResponse.json(
    {
      success: false,
      message: "PDF is required"
    },
    { status: 400 }
  );
}
const bytes = await pdf.arrayBuffer();

const buffer = Buffer.from(bytes);

const uploadDir = path.join(
  process.cwd(),
  "uploads"
);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true
  });
}

const pdfPath = path.join(
  uploadDir,
  pdf.name
);

fs.writeFileSync(
  pdfPath,
  buffer
);

console.log("Saved PDF:", pdfPath);
    // Create new product
    const product = await Product.create({
      productName,
      category,
      description,
      handlingInstructions,
      commonIssues,
      companyEmail,
      documentUrls: [pdfPath]
    });
    const indexName =
    `product_${product._id}`;
    await new Promise(
      (resolve, reject) => {
    
        exec(
          `python ../backend/run_indexer.py "${pdfPath}" "${indexName}"`,
          (error, stdout, stderr) => {
    
            console.log(stdout);

           if (stderr) {
             console.error(stderr);
}
    
            if (error) {
              reject(error);
              return;
            }
    
            resolve(true);
          }
        );
    
      }
    );
    product.mossIndexId =
    indexName;

    await product.save();
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