import React, { useState } from "react";
import { db } from "../firebase/config"; // Adjust path if needed
import { collection, addDoc, Timestamp } from "firebase/firestore";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.message) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        ...form,
        createdAt: Timestamp.now(),
      });
      setSuccess("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error("Error saving message:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-950 px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-indigo-950 backdrop-blur-2xl rounded-xl shadow-lg max-w-2xl w-full p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Contact Us</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4 text-center">{success}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name *"
            className="border border-gray-300 px-4 py-3 rounded-lg w-full"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email *"
            className="border border-gray-300 px-4 py-3 rounded-lg w-full"
            required
          />
        </div>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="border border-gray-300 px-4 py-3 rounded-lg w-full mb-4"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your message *"
          rows={5}
          className="border border-gray-300 px-4 py-3 rounded-lg w-full mb-6"
          required
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg w-full"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
