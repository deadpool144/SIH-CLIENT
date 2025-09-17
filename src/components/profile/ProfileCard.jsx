"use client";
import { User, Pencil } from "lucide-react";
import { useSelector } from "react-redux";

export default function ProfileCard() {
  const user = useSelector((state) => state.user.user);
  const {users} = useSelector((state) => state.auth);
  if(!users?.name) return null;
  // if (!user?.name) return null;

  return (
    <div className="bg-[#1e1e1e] p-5 rounded-lg flex flex-col md:flex-row items-center justify-between mb-6 shadow-xl">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center mb-4 md:mb-0 md:mr-6">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-14 h-14 text-yellow-400" />
          )}
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-white">{users.name}</h1>
          <p className="text-gray-400">{user.batch}</p>
          <p className="text-gray-400">{user.department}</p>
          <p className="text-gray-400">{user.role}</p>
        </div>
      </div>
      <button className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 transition-all mt-4 md:mt-0 flex items-center gap-2">
        <Pencil size={18} /> Edit Profile
      </button>
    </div>
  );
}
