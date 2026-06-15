"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  productName: string;
  category: string;
}

export default function UserDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  console.log("Products state updated:", products);
}, [products]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products/get");
      const data = await response.json();
      console.log(data)
      if (data.success) {
        setProducts(data.products);
      } else {
        alert("Failed to load products.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while fetching products.");
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);
if (loading) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-semibold text-indigo-700">
        Loading products...
      </h1>
    </main>
  );
}
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
        <h2 className="text-3xl font-bold text-indigo-700">
          Welcome!
        </h2>

        <p className="text-black mt-2 mb-8">
          Browse products and ask AI for help.
        </p>

        {/* Search Bar */}
        <div className="mb-8 text-black">
          <input
            type="text"
            placeholder="🔍 Search products..."
            className="w-full border rounded-xl p-4 shadow-sm"
          />
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-black">
                {product.productName}
              </h3>

              <p className="text-black mt-2">
                {product.category}
              </p>

              <button
                onClick={() =>
                  router.push(`/user/products/${product._id}`)
                }
                className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
              >
                Ask AI / View Product
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}