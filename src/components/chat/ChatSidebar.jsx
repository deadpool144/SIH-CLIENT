"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function ChatSidebar({ onSelectUser, selectedUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BASE}/api/user/all`, {
          withCredentials: true,
        });
        setUsers(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="w-1/3 bg-gray-800 text-white border-r border-gray-700 overflow-y-auto">
      <h2 className="p-4 text-lg font-semibold border-b border-gray-700">
        Chats
      </h2>
      <ul>
        {users.map((user) => (
          <li
            key={user._id}
            onClick={() => onSelectUser(user)}
            className={`p-4 cursor-pointer hover:bg-gray-700 transition ${
              selectedUser?._id === user._id ? "bg-gray-700" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={user.profile?.profileImage || "/default-avatar.png"}
                alt={user.firstName}
                className="w-10 h-10 rounded-full object-cover border border-gray-600"
              />
              <div>
                <p className="font-medium">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
