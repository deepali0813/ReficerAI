"use client";

import { useRouter } from "next/navigation";

const products = [
  {
    id: 1,
    name: "Scooter X200",
    category: "Electric Vehicle",
  },
  {
    id: 2,
    name: "Water Purifier Pro",
    category: "Home Appliance",
  },
];

export default function CompanyDashboard() {
  const router = useRouter();

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
            <p className="text-gray-500">
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

        <h3 className="text-2xl font-semibold mb-4">Your Products</h3>

        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center"
            >
              <div>
                <h4 className="text-xl font-semibold">
                  {product.name}
                </h4>
                <p className="text-gray-500">
                  {product.category}
                </p>
              </div>

              <div className="space-x-3">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  View
                </button>

                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">
                  Edit
                </button>

                <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}