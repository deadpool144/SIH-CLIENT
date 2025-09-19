"use client";

import React, { useState } from "react";
import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function CreateEventForm({ onEventCreated }) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });
  const [image, setImage] = useState(null); // optional event image
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.location || !form.description) {
      alert("⚠ Please fill all the required fields");
      return;
    }
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("date", form.date);
      fd.append("location", form.location);
      fd.append("description", form.description);
      if (image) fd.append("image", image); // optional image

      const res = await axios.post(`${BASE}/api/event/create`, fd, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200 || res.status === 201) {
        onEventCreated?.(res.data?.data);
        alert("✅ Event created successfully!");
        setForm({ title: "", date: "", location: "", description: "" });
        setImage(null);
        setPreview(null);
      } else {
        alert(res.data?.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error creating event:", err);
      alert(err.response?.data?.message || "Server error while creating event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-amber-100 rounded-2xl p-7 sm:p-10 my-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="w-full p-3 rounded-md border border-gray-400 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-gray-400 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-3 rounded-md border border-gray-400 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Event Description"
          rows={4}
          className="w-full p-3 rounded-md border border-gray-400 bg-gray-50 resize-y text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Image Upload */}
        <div className="flex flex-col gap-3">
          {preview && (
            <img
              src={preview}
              alt="Event Preview"
              className="w-full h-48 object-cover rounded-lg border border-gray-400"
            />
          )}
          <label className="bg-gray-700 text-white py-2 px-4 rounded-md w-fit cursor-pointer hover:bg-gray-800">
            Upload Event Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-800 text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-900 transition-colors disabled:bg-gray-600"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </section>
  );
}
