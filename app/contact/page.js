"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    try {
      const res = await fetch(
        "https://contact-backend-xb06.onrender.com/contact",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.success) {
        setStatus("✅ Message sent successfully!");
        setForm({ name: "", email: "", subject: "", description: "" });
      } else {
        setStatus("❌ Failed to send: " + data.error);
      }
    } catch (error) {
      setStatus("❌ Error: " + error.message);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl max-w-md w-full p-8 text-white">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Contact <span className="text-blue-400">Us</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
              className="peer w-full border border-white/20 bg-transparent text-white placeholder-transparent rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your Name"
            />
            <label
              htmlFor="name"
              className="absolute left-4 -top-3.5 text-sm bg-gray-900 px-1 text-gray-300 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-400"
            >
              Your Name
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="peer w-full border border-white/20 bg-transparent text-white placeholder-transparent rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your Email"
            />
            <label
              htmlFor="email"
              className="absolute left-4 -top-3.5 text-sm bg-gray-900 px-1 text-gray-300 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-400"
            >
              Email Address
            </label>
          </div>

          {/* Subject */}
          <div className="relative">
            <input
              type="text"
              name="subject"
              id="subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="peer w-full border border-white/20 bg-transparent text-white placeholder-transparent rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Subject"
            />
            <label
              htmlFor="subject"
              className="absolute left-4 -top-3.5 text-sm bg-gray-900 px-1 text-gray-300 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-400"
            >
              Subject
            </label>
          </div>

          {/* Message */}
          <div className="relative">
            <textarea
              name="description"
              id="description"
              rows="5"
              value={form.description}
              onChange={handleChange}
              required
              className="peer w-full border border-white/20 bg-transparent text-white placeholder-transparent rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              placeholder="Your Message"
            ></textarea>
            <label
              htmlFor="description"
              className="absolute left-4 -top-3.5 text-sm bg-gray-900 px-1 text-gray-300 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-400"
            >
              Your Message
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all font-medium py-3 rounded-lg shadow-lg"
          >
            Send Message
          </button>
        </form>

        {status && (
          <p className="mt-5 text-center text-sm text-gray-300">{status}</p>
        )}
      </div>
    </main>
  );
}
