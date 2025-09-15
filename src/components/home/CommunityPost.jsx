"use client";

import { useState, useEffect } from "react";

export default function CommunityPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts([
      { title: "Building a Sustainable Future", author: "Community Team", image: "https://placehold.co/800x400/334455/ffffff?text=Sustainable+Future", desc: "Our alumni are leading sustainable initiatives across industries." },
      { title: "Alumni Mentorship Program Launch", author: "Alumni Office", image: "https://placehold.co/800x400/556677/ffffff?text=Mentorship", desc: "We are excited to announce the Alumni Mentorship Program." },
      { title: "Tech Talk: AI and the Future", author: "Tech Club", image: "https://placehold.co/800x400/778899/ffffff?text=AI+Tech+Talk", desc: "Join our upcoming tech talk where alumni share AI research." },
    ]);
  }, []);

  return (
    <section className="text-center py-10 px-5 bg-slate-900">
      <h2 className="text-3xl font-bold mb-8 text-white">Latest from the Community</h2>
      {posts.map((post, index) => (
        <div key={index} className="max-w-3xl my-5 mx-auto bg-gray-800 p-5 rounded-lg text-left">
          <h3 className="text-xl font-bold text-white">{post.title}</h3>
          <p className="text-sm text-gray-400 mb-4">by {post.author}</p>
          <img src={post.image} alt={post.title} className="w-full rounded-lg my-4" />
          <p className="text-gray-300 my-4">{post.desc}</p>
          <div className="flex justify-between mt-4">
            <a href="#" className="text-sm text-cyan-400 hover:underline">Assist</a>
            <a href="#" className="text-sm text-cyan-400 hover:underline">View all posts →</a>
          </div>
        </div>
      ))}
    </section>
  );
}
