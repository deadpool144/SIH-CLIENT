"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

// New Skeleton Card for loading state
const EventCardSkeleton = () => (
    <div className="bg-[#23262B] rounded-lg shadow-lg overflow-hidden flex flex-col animate-pulse">
        <div className="h-48 w-full bg-gray-700"></div>
        <div className="p-5 flex flex-col flex-1">
            <div className="h-6 w-24 bg-[#b48a23]/50 rounded-md mb-3"></div>
            <div className="h-7 w-3/4 bg-gray-700 rounded mb-2"></div>
            <div className="h-5 w-1/2 bg-gray-700 rounded mb-2"></div>
            <div className="h-5 w-full bg-gray-700 rounded mt-2"></div>
            <div className="h-5 w-5/6 bg-gray-700 rounded mt-1 mb-4"></div>
            <div className="flex gap-3 mt-auto">
                <div className="h-10 w-24 bg-[#3983ee]/50 rounded-md"></div>
                <div className="h-10 w-24 bg-black/50 rounded-md"></div>
            </div>
        </div>
    </div>
);


export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("All Events");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Search state is not used in the provided code, but kept for potential future use
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
        setIsLoading(true);
        setError(null);
        // Minimum loading time for better UX
        const timer = setTimeout(async () => {
            try {
                const res = await axios.get(`${BASE}/api/event/all`, {
                    withCredentials: true,
                });
                setEvents(res.data?.data || []);
            } catch (err) {
                console.error("Error fetching events:", err);
                setError("Could not fetch events. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        }, 500); // 500ms delay
        return () => clearTimeout(timer);
    };
    fetchEvents();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "Date not specified";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  // Apply filtering + search
  const filteredEvents = events.filter((event) => {
    const matchFilter =
      filter === "All Events" || (event.category && event.category.toLowerCase() === filter.toLowerCase());
    const matchSearch = event.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const categories = [
    "All Events",
    "Conferences",
    "Workshops",
    "Concerts",
    "Networking",
    "Webinars",
    "Culinary",
    "Wellness",
  ];

  const renderEvents = () => {
    if (isLoading) {
        return Array.from({ length: 6 }).map((_, index) => (
            <EventCardSkeleton key={index} />
        ));
    }

    if (error) {
        return <p className="text-center text-red-200 col-span-full">{error}</p>;
    }

    if (filteredEvents.length === 0) {
        return <p className="text-gray-200 col-span-full">No events found for this category.</p>;
    }

    return filteredEvents.map((event) => (
      <div
        key={event._id}
        className="bg-[#23262B] rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1"
      >
        <img
          src={event.imageUrl || `https://placehold.co/600x400/23262B/bca46a?text=${event.title.charAt(0)}`}
          alt={event.title}
          className="h-48 w-full object-cover"
        />
        <div className="p-5 flex flex-col flex-1">
          <span className="inline-block px-3 py-1 mb-3 rounded-md text-white text-sm font-semibold bg-[#b48a23] self-start">
            {event.category || "General"}
          </span>
          <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
          <p className="text-[#bca46a] text-sm mb-2">
            {formatDate(event.date)} • {event.location || "Online"}
          </p>
          <p className="text-gray-300 mb-4 flex-1">{event.description}</p>
          <div className="flex gap-3 mt-auto">
            <button className="bg-[#3983ee] text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-500 transition">
              Join Event
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800 transition">
              Details
            </button>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div className="bg-[#bca46a] min-h-screen font-['Segoe_UI',Arial,sans-serif]">
      <main className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-white mb-2">Upcoming Events</h1>
        <p className="text-[#23262B] text-lg mb-6">
          Explore a world of exciting events happening near you and beyond.
        </p>

        {/* FILTER BUTTONS */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                filter === cat
                  ? "bg-[#3983ee] text-white font-bold"
                  : "bg-[#23262B] text-white hover:bg-[#3983ee]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* EVENTS LIST */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {renderEvents()}
        </div>
      </main>
    </div>
  );
}
