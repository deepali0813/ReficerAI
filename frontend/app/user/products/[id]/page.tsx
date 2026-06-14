"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
}

export default function ProductPage() {
  const { id } = useParams();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [chat, setChat] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi! I'm ReficerAI. How can I help you with this product?",
    },
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: message,
    };

    setChat((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    productId: id,
    message: userMessage.content,
    history: chat,
  }),
});

const data = await response.json();

const aiMessage: ChatMessage = {
  id: Date.now() + 1,
  role: "assistant",
  content:
    data.response ||
    "Sorry, I couldn't process your request right now.",
};

setChat((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      setChat((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            "Something went wrong while connecting to the AI service.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="bg-indigo-700 text-white px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">ReficerAI</h1>

        <div className="space-x-4">
          <button className="hover:underline">Dashboard</button>
          <button className="hover:underline">Logout</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Details */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h1 className="text-3xl font-bold text-indigo-700 mb-6">
              Product Details
            </h1>

            <div className="space-y-5">
              <div>
                <h2 className="font-semibold text-gray-800">
                  Product ID
                </h2>
                <p className="text-gray-500 break-all">
                  {String(id)}
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-gray-800">
                  Product Name
                </h2>
                <p className="text-gray-500">
                  Demo Product
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-gray-800">
                  Category
                </h2>
                <p className="text-gray-500">
                  Electronics
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-gray-800">
                  Description
                </h2>
                <p className="text-gray-500">
                  This is a placeholder description. It can later
                  be fetched from MongoDB using the product ID.
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-gray-800">
                  Handling Instructions
                </h2>
                <p className="text-gray-500">
                  Read the manual carefully before use. Keep the
                  product in a safe and dry environment.
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-gray-800">
                  Common Issues
                </h2>
                <p className="text-gray-500">
                  Battery drain, connectivity issues, unexpected
                  restart, or setup problems.
                </p>
              </div>
            </div>
          </div>

          {/* AI Chat */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col h-[75vh]">
            <h1 className="text-3xl font-bold text-indigo-700 mb-2">
              Ask ReficerAI
            </h1>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-indigo-700">
                🤖 <strong>ReficerAI Assistant</strong>
                <br />
                Ask questions about this product, troubleshooting,
                handling instructions, or common issues.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto border rounded-lg p-4 bg-slate-50">
              {chat.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-4 ${
                    msg.role === "user"
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block px-4 py-2 rounded-xl max-w-[80%] ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {msg.content}
                  </span>
                </div>
              ))}

              {isLoading && (
                <p className="text-sm text-gray-500 italic">
                  ReficerAI is thinking...
                </p>
              )}
            </div>

            <div className="mt-4 flex gap-3">
              <input
                type="text"
                placeholder="Ask something about this product..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                className="flex-1 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <button
                onClick={sendMessage}
                disabled={isLoading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}