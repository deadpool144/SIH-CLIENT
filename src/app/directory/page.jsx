"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

// SearchBar (unchanged)
const SearchBar = ({ onSearch }) => (
  <div className="flex justify-center my-9 px-4">
    <input
      type="text"
      placeholder="Search alumni..."
      onChange={(e) => onSearch(e.target.value)}
      className="bg-gray-800 border-none rounded-lg w-full max-w-xl py-4 px-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

// Alumni Card (unchanged)
const AlumniCard = ({ alumni }) => (
  <Link href={`/directory/${alumni._id}`}>
    <div className="bg-gray-800 rounded-2xl w-full max-w-xs sm:w-72 p-8 flex flex-col items-center shadow-lg transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
      <img
        src={alumni.profile?.profileImage || "/default-avatar.png"}
        alt={alumni.user?.firstName}
        className="w-20 h-20 rounded-full object-cover mb-6 border-2 border-black"
      />
      <h3 className="text-xl font-bold mb-1 text-center text-white">
        {alumni.user?.firstName} {alumni.user?.lastName}
      </h3>
      <p className="text-gray-300 text-sm mb-2 text-center">
        Batch of {alumni.profile?.batch}
      </p>
      <p className="text-gray-400 text-base mb-4 text-center">
        {alumni.profile?.company || "Company"} | {alumni.profile?.role}
      </p>
      <button className="w-full mt-auto bg-blue-600 text-white border-none rounded-lg py-3 text-lg font-semibold cursor-pointer transition-colors duration-200 hover:bg-blue-700">
        Connect
      </button>
    </div>
  </Link>
);

// New Skeleton Card for loading state
const AlumniCardSkeleton = () => (
    <div className="bg-gray-800 rounded-2xl w-full max-w-xs sm:w-72 p-8 flex flex-col items-center shadow-lg animate-pulse">
      <div className="w-20 h-20 rounded-full bg-gray-700 mb-6"></div>
      <div className="h-6 w-3/4 bg-gray-700 rounded mb-2"></div>
      <div className="h-4 w-1/2 bg-gray-700 rounded mb-2"></div>
      <div className="h-5 w-5/6 bg-gray-700 rounded mb-4"></div>
      <div className="w-full mt-auto bg-gray-700 rounded-lg h-12"></div>
    </div>
);


export default function AlumniDirectoryPage() {
  const [alumni, setAlumni] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await axios.get(`${BASE}/api/alumni/all`, {
          withCredentials: true,
        });
        if (res.data?.data) {
          setAlumni(res.data.data);
          setFiltered(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching alumni:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAlumni();
  }, []);

  const handleSearch = (query) => {
    if (isLoading) return; // Prevent searching while loading
    setFiltered(
      alumni.filter((a) =>
        `${a.user?.firstName} ${a.user?.lastName}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    );
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <SearchBar onSearch={handleSearch} />

      <main className="px-4 py-8">
        <h1 className="text-center text-4xl my-12 font-bold tracking-wider">
          Alumni Directory
        </h1>
        <div className="flex flex-wrap justify-center gap-8 mb-20">
          {isLoading ? (
            // Show 8 skeleton cards while loading
            Array.from({ length: 8 }).map((_, index) => (
                <AlumniCardSkeleton key={index} />
            ))
          ) : (
            // Show actual alumni cards once loaded
            filtered.map((alumnus) => (
              <AlumniCard key={alumnus._id} alumni={alumnus} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
