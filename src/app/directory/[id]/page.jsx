"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function AlumniProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE}/api/alumni/profile/${id}`, {
          withCredentials: true,
        });
        setProfile(res.data?.data || null);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    if (id) fetchProfile();
  }, [id]);

  if (!profile) return <div className="text-center p-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <img
            src={profile.profile?.profileImage || "/default-avatar.png"}
            alt={profile.user?.firstName}
            className="w-32 h-32 rounded-full border-4 border-blue-600 mb-6"
          />
          <h2 className="text-3xl font-bold">
            {profile.user?.firstName} {profile.user?.lastName}
          </h2>
          <p className="text-gray-400">{profile.profile?.role}</p>
          <p className="text-gray-500">{profile.contact?.location}</p>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-blue-400">Education</h3>
            <p>10th: {profile.education?.tenth}</p>
            <p>12th: {profile.education?.twelfth}</p>
            <p>CGPA: {profile.education?.cgpa}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-400">Skills</h3>
            <ul className="list-disc ml-6">
              {profile.skills?.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-400">
              Work Experience
            </h3>
            {profile.workExperience?.map((job, i) => (
              <div key={i} className="mt-2 border-b border-gray-700 pb-2">
                <p className="font-semibold">
                  {job.title} @ {job.company}
                </p>
                <p className="text-gray-400">{job.duration}</p>
                <p>{job.description}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-400">
              Contributions
            </h3>
            <p>Mentorship: {profile.contribution?.mentorship ? "Yes" : "No"}</p>
            <p>Donation: {profile.contribution?.donation ? "Yes" : "No"}</p>
            <p>Events Attended: {profile.contribution?.eventsAttended}</p>
            <p>Leaderboard Rank: {profile.contribution?.leaderRank}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
