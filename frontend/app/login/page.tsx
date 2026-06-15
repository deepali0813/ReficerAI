"use client";
import Image from "next/image";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const role = searchParams.get("role");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (role === "company") {
      try {
        const response = await fetch("/api/company/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await response.json();

        if (data.success) {
          alert("Login successful!");
          router.push("/company/dashboard");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong.");
      }
    } else {
  try {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Login successful!");

      // Optional: store user info for the MVP
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/user/dashboard");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
}
  };

  return (
    <main className="min-h-screen bg-hero flex items-center justify-center">
      <div className="glass-bg rounded-3xl p-10 w-full max-w-md">
          <div className="logo-placeholder">
                      <Image
              src="/reficerai_logo.png"
              alt="ReficerAI Logo"
              width={800}
              height={800}
              className="object-contain rounded-3x"
            />
                    </div>
        <h1 className="text-3xl font-bold text-center text-black mt-10">
            
                      
          {role === "company" ? "Company Login" : "User Login"}
        </h1>

        <div className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <button
            onClick={handleLogin}
            className="w-full hover:bg-white text-white text-lg hover:text-black text-lg py-3 rounded-lg "
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
}