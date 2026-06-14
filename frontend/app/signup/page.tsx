"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const role = searchParams.get("role");

  // Company fields
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // User field (for future use)
  const [fullName, setFullName] = useState("");

  const handleSignup = async () => {
    if (!email || !password || (role === "user" && !fullName)) {
  alert("Please fill in all required fields.");
  return;
}

    if (role === "company") {
      try {
        const response = await fetch("/api/company/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyName,
            email,
            password,
            contact,
            website,
          }),
        });

        const data = await response.json();

        if (data.success) {
          alert("Company registered successfully!");
          router.push("/company/dashboard");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong!");
      }
    } else {
  try {
    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fullName,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("User registered successfully!");
      router.push("/login?role=user");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  }
}
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">
        <h1 className="text-3xl font-bold text-center text-indigo-700">
          {role === "company" ? "Company Sign Up" : "User Sign Up"}
        </h1>

        <div className="space-y-4 mt-8">
          {role === "company" ? (
            <>
              <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="email"
                placeholder="Official Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                placeholder="Contact Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                placeholder="Website URL"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full border rounded-lg p-3"
              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg p-3"
              />
            </>
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <button
            onClick={handleSignup}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Create Account
          </button>
        </div>
      </div>
    </main>
  );
}