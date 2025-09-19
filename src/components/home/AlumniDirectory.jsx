"use client";

import { useState, useEffect } from "react";
import { Users } from "lucide-react";
import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function AlumniDirectory({ handleMessage }) {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await axios.get(`${BASE}/api/alumni/random?count=5`, {
          withCredentials: true,
        });
        setAlumni(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching alumni:", err);
      }
    };
    fetchAlumni();
  }, []);

  return (
    <section className="bg-gray-900 text-center py-16 px-5">
      <h2 className="text-3xl font-bold mb-10 text-gray-100">
        Explore the Alumni Directory
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {alumni.map((person, index) => {
          const name = `${person.user?.firstName || ""} ${
            person.user?.lastName || ""
          }`.trim();
          const batch = person.profile?.batch || "N/A";
          const company =
            person.workExperience?.length > 0
              ? person.workExperience[0]?.company
              : "Unknown Company";

          return (
            <div
              key={index}
              className="bg-gray-800 pt-5 rounded-2xl w-40 cursor-pointer 
                       hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 
                       transition-all duration-300"
              onClick={() => handleMessage(`Viewing ${name}'s profile`)}
            >
              <img
                src={person.profile?.profileImage || "/default-avatar.png"}
                alt={name}
                className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-blue-600 object-cover"
              />
              <h3 className="text-base font-semibold mt-1 text-white">
                {name}
              </h3>
              <p className="text-sm text-gray-400">{`Batch of ${batch}`}</p>
              <p className="text-xs text-gray-500 pb-4">{company}</p>
            </div>
          );
        })}
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
