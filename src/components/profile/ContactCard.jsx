"use client";
import { Mail, Phone, Linkedin, MapPin } from "lucide-react";
import { useState } from "react";

export default function ContactCard() {
  const [contact] = useState({
    email: "priyanshu.tiwari@example.com",
    phone: "+1 (555) 123-4567",
    linkedin: "linkedin.com/in/priyanshu",
    location: "Bengaluru, India",
  });

  return (
    <div className="bg-[#1e1e1e] p-5 rounded-lg mb-6 shadow-xl">
      <h2 className="text-xl font-bold mb-4 ">
        Contact Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col items-center text-center">
          <Mail className="w-5 h-5 text-blue-400 mb-1" />
          <p className="text-white">{contact.email}</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Phone className="w-5 h-5 text-green-400 mb-1" />
          <p className="text-white">{contact.phone}</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Linkedin className="w-5 h-5 text-blue-600 mb-1" />
          <a
            href={`https://${contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {contact.linkedin}
          </a>
        </div>
        <div className="flex flex-col items-center text-center">
          <MapPin className="w-5 h-5 text-red-400 mb-1" />
          <p className="text-white">{contact.location}</p>
        </div>
      </div>
    </div>
  );
}
