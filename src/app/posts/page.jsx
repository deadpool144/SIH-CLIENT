"use client";

import { useState } from "react";
import CreatePost from "@/components/post/CreatePost";
import PostList from "@/components/post/PostList";

export default function PostsPage() {
  const [refresh, setRefresh] = useState(false);

  const handlePostCreated = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="bg-gray-950 min-h-screen py-10">
      <CreatePost onPostCreated={handlePostCreated} />
      <PostList refresh={refresh} />
    </div>
  );
}
