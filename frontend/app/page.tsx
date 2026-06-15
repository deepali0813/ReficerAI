"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function Home() {
  const [role, setRole] = useState<"user" | "company" | null>(null);
  const router = useRouter();

  const goTo = (path: string) => {
    if (!role) return;
    router.push(`${path}?role=${role}`);
  };

  return (
    <main className="min-h-screen bg-hero flex items-center justify-center">
      <div className="glass-bg rounded-3xl p-10 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-indigo-700">
          <div className="logo-placeholder">
            <Image
    src="/reficerai_logo.png"
    alt="ReficerAI Logo"
    width={800}
    height={800}
    className="object-contain"
  />
  
            
          </div>
          
        </h1>

        <p className="text-center text-gray-500 mt-6 mb-6 ">
          AI Powered Product Support Platform
        </p>

        {/* Step 1: Choose Role */}
        {!role && (
          <>
            <h2 className="text-xl font-semibold text-center mb-5">
              Continue as
            </h2>

            <div className="space-y-4">
              <button
                onClick={() => setRole("user")}
                className="w-full py-3 rounded-lg hover:bg-white text-white text-lg hover:text-black text-lg"
              >
                User
              </button>

              <button
                onClick={() => setRole("company")}
                className="w-full py-3 rounded-lg  hover:bg-white text-white text-lg hover:text-black text-lg"
              >
                Company
              </button>
            </div>
          </>
        )}

        {/* Step 2: Login / Signup */}
        {role && (
          <>
            <h2 className="text-xl font-semibold text-center mb-2">
              {role === "user" ? "User Portal" : "Company Portal"}
            </h2>

            <p className="text-center text-gray-300 mb-6">
              Choose an option below
            </p>

            <div className="space-y-3">
              <button
                onClick={() => goTo("/login")}
                className="w-full hover:bg-white text-white text-lg hover:text-black text-lg py-3 rounded-lg"
              >
                Login
              </button>

              <button
                onClick={() => goTo("/signup")}
                className="w-full  hover:bg-white text-white text-lg hover:text-black text-lg py-3 rounded-lg"
              >
                Sign Up
              </button>

              <button
                onClick={() => setRole(null)}
                className="w-full mt-3 text-gray-600 hover:text-white"
              >
                ← Back
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}