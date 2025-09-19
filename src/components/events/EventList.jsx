"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function EventList({ refresh }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${BASE}/api/event/all`, {
          withCredentials: true,
        });
        setEvents(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, [refresh]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="max-w-5xl mx-auto my-12 px-4">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">
        Upcoming Events
      </h2>
      {events.length === 0 ? (
        <p className="text-gray-400">
          No events yet. Be the first to create one!
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-yellow-50 rounded-xl shadow-md overflow-hidden"
            >
              {/* Event Image */}
              {event.imageUrl && (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {event.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {formatDate(event.date)} • {event.location}
                </p>
                <p className="mt-3 text-gray-700">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
