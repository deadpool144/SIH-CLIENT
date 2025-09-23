"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import HeroImage from "../../../public/hero.jpg";
import Image from "next/image";

export default function Hero({ handleMessage }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() === "") {
      handleMessage("Please enter a search term!");
    } else {
      handleMessage(`Searching for: ${query}`);
    }
  };

  return (
    <section className="flex flex-col md:flex-row justify-between items-center py-16 px-[8%] min-h-[90vh]">
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
          Welcome to Your <br />
          <span className="text-blue-500">Alumni Connect Portal</span>
        </h1>
        <p className="mt-4 mb-8 text-base max-w-md mx-auto md:mx-0 text-gray-300">
          Reconnect with fellow graduates, explore career opportunities, and stay updated on university events. Your lifelong connection starts here.
        </p>
        <div className="flex max-w-md mx-auto md:mx-0">
          <input
            type="text"
            className="flex-1 p-3 rounded-l-lg border-2 border-gray-600 bg-black text-white focus:outline-none focus:border-blue-500"
            placeholder="Search alumni by name, batch, or company..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 px-6 rounded-r-lg hover:bg-blue-700 flex items-center justify-center"
          >
            <Search size={20} />
          </button>
        </div>
      </div>
      <div className="flex-1 flex justify-center mt-10 md:mt-0 md:pl-10">
        <Image
          src={HeroImage}
          alt="Hero Image"
          className="w-full h-auto max-w-md"
          priority
        />
      </div>
    </section>
  );
}
