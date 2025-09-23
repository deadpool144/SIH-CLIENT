"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Heart, MessageCircle } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

// Skeleton card to be shown while data is loading
const PostCardSkeleton = () => (
  <div className="bg-gray-800 rounded-2xl w-full max-w-4xl p-6 shadow-lg animate-pulse">
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 rounded-full bg-gray-700 mr-4"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
        <div className="h-3 bg-gray-700 rounded w-1/4"></div>
      </div>
    </div>
    <div className="h-6 bg-gray-700 rounded w-4/5 mb-4"></div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-700 rounded"></div>
      <div className="h-3 bg-gray-700 rounded w-5/6"></div>
      <div className="h-3 bg-gray-700 rounded w-4/6"></div>
    </div>
    <div className="flex justify-between items-center mt-6">
      <div className="h-5 bg-gray-700 rounded w-1/5"></div>
      <div className="h-5 bg-gray-700 rounded w-1/5"></div>
    </div>
  </div>
);

export default function PostList({ refresh }) {
  const [posts, setPosts] = useState([]);
  const [showComments, setShowComments] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE}/api/posts/all`, { withCredentials: true });
      setPosts(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setIsLoading(false);
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
    <section className="mt-8 space-y-8 max-w-4xl mx-auto py-16 px-5 bg-gray-900 min-h-screen">
      {isLoading ? (
        // Show 3 skeleton cards while loading
        Array.from({ length: 3 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))
      ) : (
        posts.map((post) => (
          <div key={post._id} className="bg-gray-800 rounded-lg shadow-xl p-6 transition-transform duration-300 hover:scale-[1.01] cursor-pointer">
            {/* Author */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={post.userId?.profileImage || "https://placehold.co/40x40/4B5563/FFFFFF?text=P"}
                alt={post.userId?.firstName}
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-600"
              />
              <div>
                <h3 className="font-bold text-gray-100 text-lg">
                  {post.userId?.firstName} {post.userId?.lastName}
                </h3>
                <p className="text-sm text-gray-400">{new Date(post.createdAt).toLocaleString()}</p>
              </div>
            </div>

            {/* Description */}
            <p className="mb-4 text-gray-300">{post.description}</p>

            {/* Images (slider if multiple) */}
            {post.images?.length > 0 && (
              <div className="relative w-full overflow-x-auto flex gap-3 pb-2 mb-4">
                {post.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="post"
                    className="rounded-lg w-72 h-64 object-cover flex-shrink-0 shadow-lg"
                  />
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-6 border-t border-gray-700 pt-4 text-gray-400">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(post._id);
                }}
                className={`flex items-center gap-2 transition-colors ${
                  post.likes.includes(post.userId?._id)
                    ? "text-red-400"
                    : "hover:text-red-400"
                }`}
              >
                <Heart size={18} /> {post.likes?.length || 0}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleComments(post._id);
                }}
                className="flex items-center gap-2 hover:text-blue-400 transition-colors"
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
                      src={c.userId?.profileImage || "https://placehold.co/32x32/4B5563/FFFFFF?text=C"}
                      alt={c.userId?.firstName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="bg-gray-700 p-3 rounded-lg flex-1">
                      <p className="text-sm font-semibold text-gray-100">
                        {c.userId?.firstName} {c.userId?.lastName}
                      </p>
                      <p className="text-sm text-gray-300">{c.text}</p>
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
                    className="flex-1 px-3 py-2 text-sm border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                  />
                  <button type="submit" className="text-blue-400 font-semibold hover:text-blue-200">
                    Post
                  </button>
                </form>
              </div>
            )}
          </div>
        ))
      )}
    </section>
  );
}
