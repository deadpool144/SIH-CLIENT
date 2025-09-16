"use client";
import { User, Pencil } from "lucide-react";
import { useState } from "react";

export default function ProfileCard() {
  // Dummy Data (replace later with API)
  const [profile] = useState({
    name: "Priyanshu Tiwari",
    batch: "Batch 2022",
    department: "Computer Science",
    role: "Software Engineer | 3rd Year",
  });

  return (
    <div className="bg-[#1e1e1e] p-5 rounded-lg flex flex-col md:flex-row items-center justify-between mb-6 shadow-xl">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mb-4 md:mb-0 md:mr-6">
          <User className="w-14 h-14 text-yellow-400" />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
          <p className="text-gray-400">{profile.batch}</p>
          <p className="text-gray-400">{profile.department}</p>
          <p className="text-gray-400">{profile.role}</p>
        </div>
      </div>
      <button className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 transition-all mt-4 md:mt-0 flex items-center gap-2">
        <Pencil size={18} /> Edit Profile
      </button>
    </div>
  );
}
