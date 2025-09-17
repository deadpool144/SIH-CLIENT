"use client";
import { Mail, Phone, Linkedin, MapPin } from "lucide-react";
import { useSelector } from "react-redux";

export default function ContactCard() {
  const contact = useSelector((state) => state.user.user.contact);
  const {users} = useSelector((state) => state.auth);
  if(!users?.name || !users.email) return null;

  if (!contact) return null;

  return (
    <div className="bg-[#1e1e1e] p-5 rounded-lg mb-6 shadow-xl">
      <h2 className="text-xl font-bold mb-4">Contact Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col items-center text-center">
          <Mail className="w-5 h-5 text-blue-400 mb-1" />
          <p className="text-white">{users.email}</p>
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
