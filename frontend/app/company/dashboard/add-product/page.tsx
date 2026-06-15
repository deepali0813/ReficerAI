"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [commonIssues, setCommonIssues] = useState("");
  const [pdfFile, setPdfFile] =
  useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "productName",
      productName
    );
    
    formData.append(
          "category",
      category
    );

    formData.append(
      "description",
      description
    );

    formData.append(
      "handlingInstructions",
      instructions
    );

    formData.append(
      "commonIssues",
      commonIssues
    );

    formData.append(
      "companyEmail",
      "xyz@example.com"
    );
   if (pdfFile) {
    formData.append(
       "pdf",
       pdfFile
     );
   }

    try {
      const response = await fetch(
        "/api/products/add",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Product submitted successfully!");
        console.log(data);

        // Clear form
        setProductName("");
        setCategory("");
        setDescription("");
        setInstructions("");
        setCommonIssues("");
      } else {
        alert(data.message || "Failed to submit product.");
      }
    } catch (error) {
      console.error(error);
      alert("Could not connect to backend.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-8">
          Add New Product
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Product Name */}
          <div>
            <label className="block font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-2">
              Product Category
            </label>
            <input
              type="text"
              placeholder="Electronics, Vehicle, Appliance..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-2">
              Product Description
            </label>
            <textarea
              rows={4}
              placeholder="Brief description of the product..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {/* Images (UI only for now) */}
          <div>
            <label className="block font-medium mb-2">
              Upload Product Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block font-medium mb-2">
              Product Handling Instructions
            </label>
            <textarea
              rows={5}
              placeholder="Write installation, maintenance and usage instructions..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>
       
          {/* PDFs (UI only for now) */}
          <input
            type="file"
            accept=".pdf"
            className="w-full border rounded-lg p-3"
            onChange={(e) => {
             const file = e.target.files?.[0];

             if (file) {
                 setPdfFile(file);
              } 
            }}
          /> 

          {/* Common Issues */}
          <div>
            <label className="block font-medium mb-2">
              Common Issues & Troubleshooting
            </label>
            <textarea
              rows={4}
              placeholder="Example: If the device doesn't start, check the power cable..."
              value={commonIssues}
              onChange={(e) => setCommonIssues(e.target.value)}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg"
          >
            Save Product
          </button>
        </form>
      </div>
    </main>
  );
}