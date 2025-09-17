"use client";
import { useSelector } from "react-redux";
import { MessageSquare, ThumbsUp } from "lucide-react";

export default function PostsSection() {
  const posts = useSelector((state) => state.user.user.posts);

  if (!posts || posts.length === 0) return null;

  return (
    <div className="bg-[#1e1e1e] p-5 rounded-lg mb-6 shadow-xl">
      <h2 className="text-xl font-bold mb-4">Posts & Activity</h2>
      <div className="space-y-4">
        {posts.map((post, idx) => (
          <div key={idx} className="border-b border-gray-600 pb-4 last:border-0">
            <h3 className="font-bold text-white">{post.title || "Untitled Post"}</h3>
            <p className="text-gray-400 mt-1 text-sm">{post.content || "-"}</p>
            <p className="text-gray-500 text-xs mt-2 flex gap-4 items-center">
              <span className="flex items-center gap-1">
                <ThumbsUp size={14} /> {post.likes || 0}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare size={14} /> {post.replies || 0}
              </span>
            </p>
          </div>
        ))}
      </div>
      <button className="bg-gray-700 font-semibold px-5 py-2 rounded-full hover:bg-gray-600 text-white block mx-auto mt-4 transition">
        View All My Posts
      </button>
    </div>
  );
}
