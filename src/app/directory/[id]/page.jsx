"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Wrench,
  Award,
  Loader2, // For a better loading spinner
} from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

// A simple helper component for displaying stats
function InfoCard({ label, value }) {
  // Don't render the card if value is missing/null/undefined, but allow 0
  if (!value && value !== 0) return null;

  return (
    <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700/50">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

export default function AlumniProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return; // not found id
      setLoading(true);
      try {
        const res = await axios.get(`${BASE}/api/alumni/profile/${id}`, {
          withCredentials: true,
        });
        setProfile(res.data?.data || null);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);


  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }


  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl text-gray-400">Profile not found.</p>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-black text-white p-4 md:p-8">
    

      <div className="max-w-4xl mx-auto bg-gray-900/70 backdrop-blur-lg border border-gray-700/30 p-6 md:p-10 rounded-2xl shadow-2xl">
        

        <div className="flex flex-col items-center text-center">
          <img
            src={profile.profile?.profileImage || "/default-avatar.png"}
            alt={profile.user?.firstName || 'Profile'}
            className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-blue-500 mb-6 object-cover shadow-lg"
          />
          <h2 className="text-3xl font-bold text-white capitalize">
            {profile.user?.firstName} {profile.user?.lastName}
          </h2>


          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-3 text-gray-400">
            {profile.profile?.role && (
              <span className="flex items-center gap-2 text-base">
                <Briefcase size={16} />
                {profile.profile.role}
              </span>
            )}
            {profile.contact?.location && (
              <span className="flex items-center gap-2 text-base">
                <MapPin size={16} />
                {profile.contact.location}
              </span>
            )}
          </div>
        </div>


        <div className="my-8 border-t border-gray-700/50" />


        <div className="space-y-10">
          

          {profile.education && (
            <div>
              <h3 className="flex items-center gap-3 text-xl font-semibold text-blue-400 mb-4">
                <GraduationCap />
                Education
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InfoCard 
                  label="10th Grade" 
                  value={profile.education.tenth ? `${profile.education.tenth}%` : null} 
                />
                <InfoCard 
                  label="12th Grade" 
                  value={profile.education.twelfth ? `${profile.education.twelfth}%` : null} 
                />
                <InfoCard 
                  label="CGPA" 
                  value={profile.education.cgpa} 
                />
              </div>
            </div>
          )}

          {/* --- Skills Section --- */}
          {profile.skills && profile.skills.length > 0 && (
            <div>
              <h3 className="flex items-center gap-3 text-xl font-semibold text-blue-400 mb-4">
                <Wrench />
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((s, i) => (
                  <span
                    key={i}
                    className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-sm font-medium border border-gray-600/50"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* --- Work Experience Section --- */}
          {profile.workExperience && profile.workExperience.length > 0 && (
            <div>
              <h3 className="flex items-center gap-3 text-xl font-semibold text-blue-400 mb-4">
                <Briefcase />
                Work Experience
              </h3>
              <div className="space-y-6">
                {profile.workExperience.map((job, i) => (
                  <div key={i} className="pl-4 border-l-2 border-blue-500 relative">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-500" />
                    
                    <p className="text-lg font-semibold text-white">
                      {job.title}
                    </p>
                    <p className="text-base text-gray-300">
                      {job.company}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">{job.duration}</p>
                    {job.description && (
                      <p className="text-gray-300 mt-2">{job.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- Contributions Section --- */}
          {profile.contribution && (
            <div>
              <h3 className="flex items-center gap-3 text-xl font-semibold text-blue-400 mb-4">
                <Award />
                Contributions
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <InfoCard
                  label="Mentorship"
                  value={profile.contribution.mentorship ? "Yes" : "No"}
                />
                <InfoCard
                  label="Donation"
                  value={profile.contribution.donation ? "Yes" : "No"}
                />
                <InfoCard
                  label="Events Attended"
                  value={profile.contribution.eventsAttended}
                />
                <InfoCard
                  label="Leaderboard Rank"
                  value={profile.contribution.leaderRank ? `#${profile.contribution.leaderRank}` : null}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";

// const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

// export default function AlumniProfilePage() {
//   const { id } = useParams();
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get(`${BASE}/api/alumni/profile/${id}`, {
//           withCredentials: true,
//         });
//         setProfile(res.data?.data || null);
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//       }
//     };
//     if (id) fetchProfile();
//   }, [id]);

//   if (!profile) return <div className="text-center p-20">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-black text-white p-8">
//       <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg">
//         <div className="flex flex-col items-center">
//           <img
//             src={profile.profile?.profileImage || "/default-avatar.png"}
//             alt={profile.user?.firstName}
//             className="w-32 h-32 rounded-full border-4 border-blue-600 mb-6"
//           />
//           <h2 className="text-3xl font-bold">
//             {profile.user?.firstName} {profile.user?.lastName}
//           </h2>
//           <p className="text-gray-400">{profile.profile?.role}</p>
//           <p className="text-gray-500">{profile.contact?.location}</p>
//         </div>

//         <div className="mt-8 space-y-6">
//           <div>
//             <h3 className="text-xl font-semibold text-blue-400">Education</h3>
//             <p>10th: {profile.education?.tenth}</p>
//             <p>12th: {profile.education?.twelfth}</p>
//             <p>CGPA: {profile.education?.cgpa}</p>
//           </div>

//           <div>
//             <h3 className="text-xl font-semibold text-blue-400">Skills</h3>
//             <ul className="list-disc ml-6">
//               {profile.skills?.map((s, i) => (
//                 <li key={i}>{s}</li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-xl font-semibold text-blue-400">
//               Work Experience
//             </h3>
//             {profile.workExperience?.map((job, i) => (
//               <div key={i} className="mt-2 border-b border-gray-700 pb-2">
//                 <p className="font-semibold">
//                   {job.title} @ {job.company}
//                 </p>
//                 <p className="text-gray-400">{job.duration}</p>
//                 <p>{job.description}</p>
//               </div>
//             ))}
//           </div>

//           <div>
//             <h3 className="text-xl font-semibold text-blue-400">
//               Contributions
//             </h3>
//             <p>Mentorship: {profile.contribution?.mentorship ? "Yes" : "No"}</p>
//             <p>Donation: {profile.contribution?.donation ? "Yes" : "No"}</p>
//             <p>Events Attended: {profile.contribution?.eventsAttended}</p>
//             <p>Leaderboard Rank: {profile.contribution?.leaderRank}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
