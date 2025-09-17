"use client";
import { useSelector } from "react-redux";
import { Users, Heart, Award } from "lucide-react";
import { useState, useEffect } from "react";

export default function ContributionSection() {
  const contribution = useSelector((state) => state.user.user.contribution);

  if (!contribution) return null;

  const [mentorship, setMentorship] = useState(contribution.mentorship || false);
  const [donation, setDonation] = useState(contribution.donation || false);

  useEffect(() => {
    setMentorship(contribution.mentorship || false);
    setDonation(contribution.donation || false);
  }, [contribution]);

  return (
    <div className="bg-[#1e1e1e] p-5 rounded-lg mb-6 shadow-xl">
      <h2 className="text-xl font-bold mb-5">Contribution & Engagement</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Mentorship */}
        <div>
          <h3 className="mb-2 text-gray-300 flex items-center gap-2">
            <Users size={18} /> Mentorship
          </h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-gray-300">Available for Mentorship</span>
            <input
              type="checkbox"
              checked={mentorship}
              onChange={() => setMentorship(!mentorship)}
              className="hidden"
            />
            <div
              className={`w-11 h-6 rounded-full relative ${
                mentorship ? "bg-yellow-400" : "bg-gray-600"
              } transition-colors`}
            >
              <div
                className={`w-4 h-4 bg-black rounded-full absolute top-1 ${
                  mentorship ? "right-1" : "left-1"
                } transition-all`}
              ></div>
            </div>
          </label>
        </div>

        {/* Donation */}
        <div>
          <h3 className="mb-2 text-gray-300 flex items-center gap-2">
            <Heart size={18} /> Donation Status
          </h3>
          <div className="flex items-center gap-3 mb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={donation}
                onChange={() => setDonation(!donation)}
                className="hidden"
              />
              <div
                className={`w-11 h-6 rounded-full relative ${
                  donation ? "bg-yellow-400" : "bg-gray-600"
                } transition-colors`}
              >
                <div
                  className={`w-4 h-4 bg-black rounded-full absolute top-1 ${
                    donation ? "right-1" : "left-1"
                  } transition-all`}
                ></div>
              </div>
            </label>
            <span
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                donation ? "bg-yellow-400 text-black" : "bg-gray-600 text-white"
              }`}
            >
              {donation ? "Active Donor" : "Inactive"}
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            Last Donation: {contribution.lastDonation || "-"}
          </p>
          <p className="text-yellow-400 text-2xl font-bold mt-1">
            {contribution.totalDonations || 0}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-700 rounded-lg text-center">
            <h3 className="text-sm text-gray-300">Events Attended</h3>
            <p className="text-2xl font-bold text-white mt-1">
              {contribution.eventsAttended || 0}
            </p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg text-center">
            <h3 className="text-sm text-gray-300 flex items-center justify-center gap-1">
              <Award size={16} /> Leader Rank
            </h3>
            <p className="text-2xl font-bold text-white mt-1">
              #{contribution.leaderRank || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
