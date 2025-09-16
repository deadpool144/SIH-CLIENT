"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LogOut } from "lucide-react";
import { clearUserDetails } from "@/lib/features/authSlice";

export default function LogoutButton({ className = "" }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  const handleLogout = async () => {
    try {
      await axios.post(
        `${baseUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(clearUserDetails());
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center gap-2 text-sm text-red-400 hover:text-red-500 ${className}`}
    >
      <LogOut size={16} />
      Logout
    </button>
  );
}
