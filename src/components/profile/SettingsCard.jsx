"use client";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Settings, KeyRound } from "lucide-react";

export default function SettingsCard() {
  const user = useSelector((state) => state.user.user);
  const [active, setActive] = useState("");

  if (!user || !user.name) return null;

  return (
    <div className="bg-[#1e1e1e] p-5 rounded-lg mb-6 shadow-xl">
      <h2 className="text-xl font-bold mb-4">Settings</h2>

      <button
        onClick={() => setActive("update")}
        className={`w-full px-4 py-3 rounded-md mb-3 font-semibold flex items-center gap-2 ${
          active === "update"
            ? "bg-yellow-400 text-black"
            : "bg-gray-700 text-white hover:bg-gray-600"
        }`}
      >
        <Settings size={18} /> Update Profile Information
      </button>

      <button
        onClick={() => setActive("password")}
        className={`w-full px-4 py-3 rounded-md font-semibold flex items-center gap-2 ${
          active === "password"
            ? "bg-yellow-400 text-black"
            : "bg-gray-700 text-white hover:bg-gray-600"
        }`}
      >
        <KeyRound size={18} /> Change Password
      </button>
    </div>
  );
}
