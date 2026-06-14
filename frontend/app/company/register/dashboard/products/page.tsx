"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [role, setRole] = useState<"user" | "company" | null>(null);
  const router = useRouter();

  const navigate = (path: string) => {
    if (!role) {
      alert("Please select whether you are a User or Company.");
      return;
    }
    router.push(`${path}?role=${role}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-[420px]">
        <h1 className="text-4xl font-bold text-center text-indigo-700">
          ReficerAI
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          AI Powered Product Support Platform
        </p>

        <h2 className="text-xl font-semibold text-center mb-5">
          Are you a User or a Company?
        </h2>

        <div className="space-y-4">
          <button
            onClick={() => setRole("user")}
            className={`w-full py-3 rounded-lg border text-lg transition ${
              role === "user"
                ? "bg-indigo-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            👤 User
          </button>

          <button
            onClick={() => setRole("company")}
            className={`w-full py-3 rounded-lg border text-lg transition ${
              role === "company"
                ? "bg-indigo-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            🏢 Company
          </button>
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg"
          >
            Sign Up
          </button>
        </div>
      </div>
    </main>
  );
}