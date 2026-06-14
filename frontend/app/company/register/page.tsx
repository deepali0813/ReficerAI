"use client";

export default function CompanyRegister() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 py-10">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[550px]">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Complete Company Profile
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Company Name"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="email"
            placeholder="Official Email"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Contact Number"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Website URL"
            className="w-full border rounded-lg p-3"
          />

          <textarea
            placeholder="Company Description"
            rows={4}
            className="w-full border rounded-lg p-3"
          ></textarea>

          <label className="block text-gray-700 font-medium">
            Upload Company Logo
          </label>

          <input
            type="file"
            className="w-full border rounded-lg p-3"
          />

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 mt-4">
            Save & Continue
          </button>
        </div>
      </div>
    </main>
  );
}