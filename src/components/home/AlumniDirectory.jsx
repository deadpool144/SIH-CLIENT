"use client";

import { useState, useEffect } from "react";
import { Users } from "lucide-react";

export default function AlumniDirectory({ handleMessage }) {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    setAlumni([
      { name: "David Lee", year: "2003", img: "https://randomuser.me/api/portraits/men/1.jpg" },
      { name: "Emily White", year: "2012", img: "https://randomuser.me/api/portraits/women/2.jpg" },
      { name: "Omar Khan", year: "2003", img: "https://randomuser.me/api/portraits/men/3.jpg" },
      { name: "Jessica Brown", year: "2018", img: "https://randomuser.me/api/portraits/women/4.jpg" },
    ]);
  }, []);

  return (
    <section className="bg-gray-900 text-center py-16 px-5">
      <h2 className="text-3xl font-bold mb-10 text-gray-100">Explore the Alumni Directory</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {alumni.map((person, index) => (
          <div
            key={index}
            className="bg-gray-800 pt-5 rounded-2xl w-40 cursor-pointer 
                       hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 
                       transition-all duration-300"
            onClick={() => handleMessage(`Viewing ${person.name}'s profile`)}
          >
            <img
              src={person.img}
              alt={person.name}
              className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-blue-600"
            />
            <h3 className="text-base font-semibold mt-1">{person.name}</h3>
            <p className="text-sm text-gray-400 pb-4">{person.year}</p>
          </div>
        ))}
      </div>
      <button
        className="mt-10 py-3 px-6 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
        onClick={() => handleMessage("Redirecting to Full Alumni Directory...")}
      >
        <Users size={20} /> View All Alumni
      </button>
    </section>
  );
}
