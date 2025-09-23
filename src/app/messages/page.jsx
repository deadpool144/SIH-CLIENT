"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_BASE_URL ;

export default function MessagePage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Fetch current logged-in user
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get(`${BASE}/api/user/profile/me`, {
          withCredentials: true,
        });
        setCurrentUser(res.data?.data?.user || null); // Adjust if API structure is different
      } catch (err) {
        console.error("Error fetching current user:", err);
      }
    };
    fetchMe();
  }, []);

  // ✅ Fetch all users (with last message preview)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BASE}/api/chats/all`, {
          withCredentials: true,
        });
        setUsers(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // ✅ Fetch messages for selected user
  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${BASE}/api/chats/conversation/${selectedUser._id}`,
          { withCredentials: true }
        );
        setMessages(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [selectedUser]);

  // ✅ Send message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() || !selectedUser) return;

    try {
      const res = await axios.post(
        `${BASE}/api/chats/send`,
        { receiverId: selectedUser._id, text },
        { withCredentials: true }
      );
      setMessages((prev) => [...prev, res.data?.data]);
      setText("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-800 border-r border-gray-700 overflow-y-auto">
        <h2 className="p-4 text-lg font-semibold border-b border-gray-700">
          Chats
        </h2>
        <ul>
          {users
            .filter((u) => u.peer._id !== currentUser?._id) // remove self
            .map(({ peer, lastMessage }) => (
              <li
                key={peer._id}
                onClick={() => setSelectedUser(peer)}
                className={`p-4 cursor-pointer hover:bg-gray-700 transition ${
                  selectedUser?._id === peer._id ? "bg-gray-700" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={peer.profileImage || "/default-avatar.png"}
                    alt={peer.firstName}
                    className="w-10 h-10 rounded-full object-cover border border-gray-600"
                  />
                  <div>
                    <p className="font-medium">
                      {peer.firstName} {peer.lastName}
                    </p>
                    <p className="text-sm text-gray-400">{peer.email}</p>
                    {lastMessage && (
                      <p className="text-xs text-gray-500 mt-1">
                        {lastMessage.text.length > 30
                          ? lastMessage.text.slice(0, 30) + "..."
                          : lastMessage.text}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {!selectedUser ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a user to start chatting
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-700 flex items-center gap-3">
              <img
                src={selectedUser.profileImage || "/default-avatar.png"}
                alt={selectedUser.firstName}
                className="w-10 h-10 rounded-full border border-gray-600"
              />
              <h2 className="font-semibold text-lg">
                {selectedUser.firstName} {selectedUser.lastName}
              </h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex ${
                    msg.sender &&
                    msg.sender._id === selectedUser._id
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                      msg.sender &&
                      msg.sender._id === selectedUser._id
                        ? "bg-gray-700 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-xs text-gray-300 block mt-1">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="p-4 border-t border-gray-700 flex gap-2"
            >
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium"
              >
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
