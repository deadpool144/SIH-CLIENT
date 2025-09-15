"use client";

import { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";

export default function ChairmanMessage({ handleMessage }) {
  const [chairman, setChairman] = useState(null);

  useEffect(() => {
    setChairman({
      name: "Dr. Alistair Finch",
      role: "Chairman, Alumni Association",
      image: "https://placehold.co/350x450/111820/ffffff?text=Dr.+Alistair+Finch",
      message: `It fills me with immense pride to witness the incredible achievements of our alumni community. This portal is a testament to our collective strength and dedication to fostering lifelong connections. I encourage each of you to engage, share your successes, and support the next generation of leaders. Together, we build a brighter future.`,
    });
  }, []);

  if (!chairman) return null;

  return (
    <section className="bg-slate-900 text-white py-16 px-5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
        <div className="flex-shrink-0">
          <img src={chairman.image} alt={chairman.name} className="w-80 rounded-xl shadow-lg" />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-5">A Message from the Chairman</h2>
          <p className="text-base leading-relaxed mb-4 text-gray-300">
            "{chairman.message}"
          </p>
          <p className="font-semibold">- {chairman.name}</p>
          <p className="text-sm text-gray-400">{chairman.role}</p>
          <button
            className="mt-6 bg-black text-cyan-300 py-3 px-5 rounded-lg hover:bg-gray-800 flex items-center gap-2 mx-auto md:mx-0"
            onClick={() => handleMessage("Redirecting to the full Chairman's message...")}
          >
            <BookOpen size={18} /> Read More
          </button>
        </div>
      </div>
    </section>
  );
}
