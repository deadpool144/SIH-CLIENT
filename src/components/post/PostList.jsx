"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Heart, MessageCircle } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function PostList({ refresh }) {
  const [posts, setPosts] = useState([]);
  const [showComments, setShowComments] = useState({});

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${BASE}/api/posts/all`, { withCredentials: true });
      setPosts(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  const handleLike = async (postId) => {
    try {
      const res = await axios.post(`${BASE}/api/posts/${postId}/like`, {}, { withCredentials: true });
      setPosts((prev) => prev.map((p) => (p._id === postId ? res.data?.data : p)));
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleComment = async (postId, text) => {
    try {
      const res = await axios.post(
        `${BASE}/api/posts/${postId}/comment`,
        { text },
        { withCredentials: true }
      );
      setPosts((prev) =>
        prev.map((p) => (p._id === postId ? { ...p, comments: [...p.comments, res.data?.data] } : p))
      );
    } catch (err) {
      console.error("Error commenting:", err);
    }
  };

  const toggleComments = (postId) => {
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <section className="mt-8 space-y-8 max-w-4xl mx-auto">
      {posts.map((post) => (
        <div key={post._id} className="bg-white rounded-lg shadow-xl p-6 hover:shadow-2xl transition">
          {/* Author */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={post.userId?.profileImage || "/default-avatar.png"}
              alt={post.userId?.firstName}
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                {post.userId?.firstName} {post.userId?.lastName}
              </h3>
              <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
            </div>
          </div>

          {/* Description */}
          <p className="mb-4 text-gray-800">{post.description}</p>

          {/* Images (slider if multiple) */}
          {post.images?.length > 0 && (
            <div className="relative w-full overflow-x-auto flex gap-3 pb-2">
              {post.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="post"
                  className="rounded-lg w-72 h-64 object-cover flex-shrink-0 shadow"
                />
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-6 border-t pt-4 text-gray-600">
            <button
              onClick={() => handleLike(post._id)}
              className={`flex items-center gap-2 ${post.likes.includes(post.userId?._id) ? "text-blue-600" : "hover:text-blue-600"}`}
            >
              <Heart size={18} /> {post.likes?.length || 0}
            </button>
            <button
              onClick={() => toggleComments(post._id)}
              className="flex items-center gap-2 hover:text-blue-600"
            >
              <MessageCircle size={18} /> {post.comments?.length || 0}
            </button>
          </div>

          {/* Comments */}
          {showComments[post._id] && (
            <div className="mt-4 space-y-3">
              {post.comments?.map((c, i) => (
                <div key={i} className="flex items-start gap-3">
                  <img
                    src={c.userId?.profileImage || "/default-avatar.png"}
                    alt={c.userId?.firstName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="bg-gray-100 p-3 rounded-lg flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {c.userId?.firstName} {c.userId?.lastName}
                    </p>
                    <p className="text-sm text-gray-700">{c.text}</p>
                  </div>
                </div>
              ))}

              {/* Add Comment */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const text = e.target.comment.value;
                  if (text.trim()) {
                    handleComment(post._id, text);
                    e.target.reset();
                  }
                }}
                className="flex items-center gap-2 mt-2"
              >
                <input
                  type="text"
                  name="comment"
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="text-blue-600 font-semibold hover:text-blue-800">
                  Post
                </button>
              </form>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
