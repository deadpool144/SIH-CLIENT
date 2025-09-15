"use client";

import { useState, useEffect } from "react";
import { CalendarDays } from "lucide-react";

export default function RecentEvents({ handleMessage }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents([
      { title: "Annual Alumni Gala", date: "October 26, 2024", location: "Grand Ballroom, City Center", desc: "An evening of celebration and networking." },
      { title: "Career Mentorship Workshop", date: "November 15, 2024", location: "University Lecture Hall", desc: "Connect with seasoned alumni mentors." },
      { title: "Startup Pitch Competition", date: "December 5, 2024", location: "Innovation Hub Auditorium", desc: "Witness alumni entrepreneurs pitch ideas." },
    ]);
  }, []);

  return (
    <section className="bg-gray-900 text-center py-16 px-5">
      <h2 className="text-3xl font-bold mb-10 text-gray-100">Recent Events</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-2xl w-full max-w-sm text-left hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
          >
            <h3 className="text-xl mb-2.5 text-white font-semibold">{event.title}</h3>
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <CalendarDays size={14} /> {event.date}
            </p>
            <p className="text-sm text-gray-400">{event.location}</p>
            <p className="text-base my-4 text-gray-300">{event.desc}</p>
            <div className="flex gap-2.5 mt-4">
              <button
                className="bg-blue-600 py-2 px-4 text-white rounded-md hover:bg-blue-700"
                onClick={() => handleMessage("You have successfully joined this event!")}
              >
                Join Event
              </button>
              <button
                className="bg-black border border-gray-600 py-2 px-4 text-white rounded-md hover:bg-gray-700"
                onClick={() => handleMessage("Redirecting to Event Details Page...")}
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
