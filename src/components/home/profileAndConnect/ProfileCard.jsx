"use client";

import { Eye, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function ProfileCard({ handleMessage }) {
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const users=useSelector((state)=>state.auth.users);

  const viewProfile = () => {
    handleMessage?.("Redirecting to profile page...");
    router.push("/profile/me");
  };

  const editProfile = () => {
    handleMessage?.("Opening profile editor...");
    router.push("/profile/me?edit=true");
  };

  return (
    <section className="bg-slate-900 max-w-2xl mx-auto my-12 p-8 text-center rounded-xl shadow-2xl">
      <img
        src={user?.profileImage || "https://via.placeholder.com/150"}
        alt={`${users?.name || "User"}'s profile`}
        className="w-24 h-24 rounded-full object-cover mb-4 mx-auto border-4 border-blue-500"
      />
      <h2 className="mb-2 text-2xl font-semibold capitalize">
        Welcome Back, {users?.name || "User"}!
      </h2>
      <p className="text-gray-400">Your personalized alumni experience awaits.</p>
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="py-2 px-5 rounded-lg font-medium bg-blue-600 text-white hover:opacity-80 transition-opacity flex items-center gap-2"
          onClick={viewProfile}
        >
          <Eye size={18} /> View Profile
        </button>
        <button
          className="py-2 px-5 rounded-lg font-medium bg-black text-blue-500 border border-blue-500 hover:opacity-80 transition-opacity flex items-center gap-2"
          onClick={editProfile}
        >
          <Edit size={18} /> Edit Profile
        </button>
      </div>
    </section>
  );
}
