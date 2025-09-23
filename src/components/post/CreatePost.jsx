"use client";

import { useState } from "react";
import axios from "axios";
import { Image, Send, X, ChevronDown, ChevronUp } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

// Custom alert/modal component
const CustomModal = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-white max-w-sm w-full mx-4 text-center">
      <p className="mb-6">{message}</p>
      <button
        onClick={onClose}
        className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Close
      </button>
    </div>
  </div>
);

export default function CreatePost({ onPostCreated }) {
  const [postContent, setPostContent] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setSelectedImages((prev) => [...prev, ...newImages]);
    setShowPreview(true);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postContent.trim() && selectedImages.length === 0) {
      setModalMessage("Please write something or upload images!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("description", postContent);
    selectedImages.forEach((file) => formData.append("images", file));

    try {
      const res = await axios.post(`${BASE}/api/posts/create`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201) {
        onPostCreated?.(res.data?.data);
        setPostContent("");
        setSelectedImages([]);
        setShowPreview(false);
      }
    } catch (err) {
      console.error("Error creating post:", err);
      setModalMessage(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-800 rounded-xl shadow-lg p-6 w-11/12 max-w-5xl mx-auto my-12 font-sans">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">Create New Job Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full min-h-[110px] text-lg p-4 rounded-lg border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y placeholder-gray-400"
          placeholder="What's on your mind?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>

        {/* Dropdown Image Preview */}
        {selectedImages.length > 0 && (
          <div className="border border-gray-700 rounded-lg">
            <button
              type="button"
              onClick={() => setShowPreview((prev) => !prev)}
              className="flex justify-between items-center w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-t-lg transition-colors"
            >
              <span className="font-medium text-gray-200">
                Selected Images ({selectedImages.length})
              </span>
              {showPreview ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {showPreview && (
              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gray-800">
                {selectedImages.map((file, i) => (
                  <div key={i} className="relative">
                    <img
                      src={file.preview}
                      alt="preview"
                      className="rounded-lg w-full h-32 object-cover shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="absolute top-1 right-1 bg-gray-900 text-white rounded-full p-1 shadow-md hover:bg-gray-700 transition-colors"
                    >
                      <X size={16} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <label className="bg-blue-600 text-white py-2 px-5 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-blue-700 transition-colors">
            <Image size={18} />
            Upload Images
            <input
              type="file"
              multiple
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg flex items-center gap-2 ml-auto hover:bg-blue-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            <Send size={18} />
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>

      {/* Render custom modal if message exists */}
      {modalMessage && <CustomModal message={modalMessage} onClose={() => setModalMessage(null)} />}
    </section>
  );
}
