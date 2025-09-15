"use client";

import { useState, useEffect } from "react";

export default function AlumniSpotlight({ handleMessage }) {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    setAlumni([
      { name: "Sarah Lee", title: "Software Engineer @ Google", img: "https://randomuser.me/api/portraits/women/12.jpg" },
      { name: "Michael Brown", title: "Product Manager @ Amazon", img: "https://randomuser.me/api/portraits/men/32.jpg" },
      { name: "Emily Johnson", title: "Data Scientist @ Microsoft", img: "https://randomuser.me/api/portraits/women/68.jpg" },
    ]);
  }, []);

  return (
    <section className="py-16 px-[8%] text-center bg-gray-900">
      <h2 className="text-3xl font-bold mb-10 text-white">Alumni Spotlight</h2>
      <div className="flex gap-8 justify-center flex-wrap">
        {alumni.map((person, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-2xl w-60 text-white text-center cursor-pointer 
                       hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 
                       transition-all duration-300"
            onClick={() => handleMessage(`Opening ${person.name}'s profile`)}
          >
            <img
              src={person.img}
              alt={person.name}
              className="w-24 h-24 rounded-full object-cover mb-4 mx-auto border-4 border-blue-600"
            />
            <h3 className="my-2 text-lg font-semibold">{person.name}</h3>
            <p className="text-sm text-gray-400">{person.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
