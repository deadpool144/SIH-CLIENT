"use client";

import { useState, useEffect } from "react";
import { Camera } from "lucide-react";

export default function Gallery({ handleMessage }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages([
      "https://placehold.co/180x180/2c3e50/ffffff?text=Event+1",
      "https://placehold.co/180x180/34495e/ffffff?text=Event+2",
      "https://placehold.co/180x180/7f8c8d/ffffff?text=Event+3",
      "https://placehold.co/180x180/95a5a6/ffffff?text=Event+4",
    ]);
  }, []);

  return (
    <section className="text-center py-12 px-5 bg-gray-900">
      <h2 className="text-3xl font-bold mb-8 text-white">Photo Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Event ${index + 1}`}
            className="w-full h-44 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>
      <button
        className="mt-8 bg-transparent text-cyan-400 border-2 border-cyan-400 py-3 px-6 rounded-lg hover:bg-cyan-400 hover:text-white flex items-center gap-2 mx-auto"
        onClick={() => handleMessage("Opening full gallery...")}
      >
        <Camera size={20} /> View Full Gallery
      </button>
    </section>
  );
}
