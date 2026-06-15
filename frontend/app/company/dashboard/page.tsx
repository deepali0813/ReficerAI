"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function CompanyDashboard() {
    const router = useRouter();
    const [products, setProducts] = useState<[]>([]);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products/get");
      const data = await response.json();

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
    }, []);
    

  return (
    <main className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="bg-indigo-700 text-white px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">ReficerAI</h1>

        <div className="space-x-4">
          <button className="hover:underline">Profile</button>
          <button className="hover:underline">Logout</button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-indigo-700">
              Welcome, Company!
            </h2>
            <p className="text-black">
              Manage your products and AI knowledge base.
            </p>
          </div>

          <button
            onClick={() =>
              router.push("/company/dashboard/add-product")
            }
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
          >
            + Add Product
          </button>
        </div>

        <h3 className="text-2xl font-semibold mb-4 text-black">Your Products</h3>

        <div className="space-y-4">
  {loading ? (
    <div className="bg-white rounded-xl shadow-md p-5 text-center">
      Loading products...
    </div>
  ) : products.length === 0 ? (
    <div className="bg-white rounded-xl shadow-md p-5 text-center text-black">
      No products added yet.
    </div>
  ) : (
    products.map((product: any) => (
      <div
        key={product._id}
        className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center"
      >
        <div>
          <h4 className="text-xl font-semibold text-black">
            {product.productName}
          </h4>
          <p className="text-black">
            {product.category}
          </p>
        </div>

        <div className="space-x-3">
          <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
            View
          </button>

          <button className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600">
            Edit
          </button>

          <button className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    ))
  )}
</div>
      </div>
    </main>
  );
}