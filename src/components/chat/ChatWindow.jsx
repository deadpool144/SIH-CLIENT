"use client";

import { useState } from "react";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";

export default function MessagePage() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="h-screen flex bg-gray-900 text-white">
      <ChatSidebar
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
      />
      <ChatWindow selectedUser={selectedUser} />
    </div>
  );
}
