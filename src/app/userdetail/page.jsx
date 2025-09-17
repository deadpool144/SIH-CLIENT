"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Plus, Trash } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

function MessageModal({ state, setState }) {
  const { isVisible, message, onConfirm } = state;
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-2xl w-full max-w-sm border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-3">Notification</h3>
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setState({ isVisible: false, message: "", onConfirm: null })}
            className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (onConfirm) onConfirm();
              setState({ isVisible: false, message: "", onConfirm: null });
            }}
            className="px-4 py-2 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-500"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProfileFormPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // image preview + cleanup
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // modal
  const [modalState, setModalState] = useState({ isVisible: false, message: "", onConfirm: null });

  // form state (everything EXCEPT User schema fields)
  const [formData, setFormData] = useState({
    batch: "",
    department: "",
    role: "",
    phone: "",
    linkedin: "",
    location: "",
    tenth: "",
    twelfth: "",
    cgpa: "",
    skills: [""],
    workExperience: [{ title: "", company: "", duration: "", description: "" }],
    mentorship: false,
    donation: false,
    lastDonation: "",
    totalDonations: "",
    eventsAttended: "",
    leaderRank: "",
  });

  // cleanup object URL when component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // --- handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleCheckbox = (name, checked) => {
    setFormData((p) => ({ ...p, [name]: checked }));
  };

  // skills dynamic
  const handleSkillChange = (idx, value) => {
    setFormData((p) => {
      const skills = [...p.skills];
      skills[idx] = value;
      return { ...p, skills };
    });
  };
  const addSkill = () => setFormData((p) => ({ ...p, skills: [...p.skills, ""] }));
  const removeSkill = (idx) =>
    setFormData((p) => ({ ...p, skills: p.skills.filter((_, i) => i !== idx) }));

  // work experience dynamic
  const handleWorkChange = (idx, field, value) => {
    setFormData((p) => {
      const workExperience = [...p.workExperience];
      workExperience[idx] = { ...workExperience[idx], [field]: value };
      return { ...p, workExperience };
    });
  };
  const addWork = () =>
    setFormData((p) => ({ ...p, workExperience: [...p.workExperience, { title: "", company: "", duration: "", description: "" }] }));
  const removeWork = (idx) =>
    setFormData((p) => ({ ...p, workExperience: p.workExperience.filter((_, i) => i !== idx) }));

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // revoke previous preview
    if (preview) URL.revokeObjectURL(preview);
    setProfileImage(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  // build FormData and submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();

      // simple fields
      const simpleKeys = [
        "batch",
        "department",
        "role",
        "phone",
        "linkedin",
        "location",
        "tenth",
        "twelfth",
        "cgpa",
        "lastDonation",
        "totalDonations",
        "eventsAttended",
        "leaderRank",
      ];
      simpleKeys.forEach((k) => fd.append(k, formData[k] ?? ""));

      // boolean flags
      fd.append("mentorship", formData.mentorship ? "true" : "false");
      fd.append("donation", formData.donation ? "true" : "false");

      // arrays: skills[] and workExperience[0][field]
      formData.skills.forEach((s) => fd.append("skills[]", s ?? ""));
      formData.workExperience.forEach((job, i) => {
        Object.keys(job).forEach((key) => {
          fd.append(`workExperience[${i}][${key}]`, job[key] ?? "");
        });
      });

      // file
      if (profileImage) fd.append("profileImage", profileImage);

      // DEBUG: uncomment during dev
      // for (let pair of fd.entries()) console.log(pair[0], pair[1]);

      const res = await axios.post(`${BASE}/api/user/profile/update`, fd, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200 || res.status === 201) {
        setModalState({
          isVisible: true,
          message: "Profile saved successfully!",
          onConfirm: () => router.push("/profile/me"),
        });
      } else {
        setModalState({
          isVisible: true,
          message: res.data?.message || "Unexpected response from server",
          onConfirm: null,
        });
      }
    } catch (err) {
      console.error("Profile save error:", err);
      setModalState({
        isVisible: true,
        message: err.response?.data?.message || err.message || "Error saving profile",
        onConfirm: null,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-[#1e1e1e] text-white p-8 rounded-xl shadow-lg space-y-8">
        <h2 className="text-2xl font-bold text-yellow-400 text-center">Complete Your Profile</h2>

        {/* IMAGE */}
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-yellow-400 shadow-md">
            {preview ? (
              <img src={preview} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
              </div>
            )}
          </div>
          <label className="mt-3 inline-flex items-center gap-2 bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 cursor-pointer">
            <span>Upload Image</span>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        {/* BASIC */}
        <div>
          <h3 className="text-lg font-semibold text-gray-300 mb-3">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="batch" value={formData.batch} onChange={handleChange} placeholder="Batch (e.g. 2022)" className="p-3 rounded bg-gray-800 border border-gray-700" />
            <input name="department" value={formData.department} onChange={handleChange} placeholder="Department (e.g. CSE)" className="p-3 rounded bg-gray-800 border border-gray-700" />
            <input name="role" value={formData.role} onChange={handleChange} placeholder="Role / Designation" className="p-3 rounded bg-gray-800 border border-gray-700" />
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold text-gray-300 mb-3">Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="p-3 rounded bg-gray-800 border border-gray-700" />
            <input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn URL" className="p-3 rounded bg-gray-800 border border-gray-700" />
            <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="p-3 rounded bg-gray-800 border border-gray-700" />
          </div>
        </div>

        {/* EDUCATION */}
        <div>
          <h3 className="text-lg font-semibold text-gray-300 mb-3">Academic</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="tenth" value={formData.tenth} onChange={handleChange} placeholder="10th %" className="p-3 rounded bg-gray-800 border border-gray-700" />
            <input name="twelfth" value={formData.twelfth} onChange={handleChange} placeholder="12th %" className="p-3 rounded bg-gray-800 border border-gray-700" />
            <input name="cgpa" value={formData.cgpa} onChange={handleChange} placeholder="CGPA" className="p-3 rounded bg-gray-800 border border-gray-700" />
          </div>
        </div>

        {/* SKILLS */}
        <div>
          <h3 className="text-lg font-semibold text-gray-300 mb-3">Skills</h3>
          <div className="space-y-3">
            {formData.skills.map((s, i) => (
              <div key={i} className="flex gap-3">
                <input value={s} onChange={(e) => handleSkillChange(i, e.target.value)} placeholder="e.g. React" className="flex-1 p-3 rounded bg-gray-800 border border-gray-700" />
                <button type="button" onClick={() => removeSkill(i)} className="p-2 rounded bg-red-600 hover:bg-red-500">
                  <Trash size={16} />
                </button>
              </div>
            ))}
            <button type="button" onClick={addSkill} className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-500">
              <Plus size={16} /> Add Skill
            </button>
          </div>
        </div>

        {/* WORK */}
        <div>
          <h3 className="text-lg font-semibold text-gray-300 mb-3">Work Experience</h3>
          <div className="space-y-4">
            {formData.workExperience.map((job, i) => (
              <div key={i} className="p-4 bg-gray-800 rounded border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input value={job.title} onChange={(e) => handleWorkChange(i, "title", e.target.value)} placeholder="Job Title" className="p-3 rounded bg-gray-700 border border-gray-600" />
                  <input value={job.company} onChange={(e) => handleWorkChange(i, "company", e.target.value)} placeholder="Company" className="p-3 rounded bg-gray-700 border border-gray-600" />
                  <input value={job.duration} onChange={(e) => handleWorkChange(i, "duration", e.target.value)} placeholder="Duration (eg. Jun 2020 - Dec 2022)" className="p-3 rounded bg-gray-700 border border-gray-600" />
                  <textarea value={job.description} onChange={(e) => handleWorkChange(i, "description", e.target.value)} placeholder="Description" className="p-3 rounded bg-gray-700 border border-gray-600 col-span-1 md:col-span-2" rows={4} />
                </div>
                <div className="flex justify-end mt-2">
                  <button type="button" onClick={() => removeWork(i)} className="p-2 rounded bg-red-600 hover:bg-red-500">
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={addWork} className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-500">
              <Plus size={16} /> Add Work
            </button>
          </div>
        </div>

        {/* CONTRIBUTION */}
        <div>
          <h3 className="text-lg font-semibold text-gray-300 mb-3">Contribution & Engagement</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={formData.mentorship} onChange={(e) => handleCheckbox("mentorship", e.target.checked)} />
              <span>Available for Mentorship</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={formData.donation} onChange={(e) => handleCheckbox("donation", e.target.checked)} />
              <span>Active Donor</span>
            </label>
            <input name="lastDonation" value={formData.lastDonation} onChange={handleChange} placeholder="Last Donation (date or note)" className="p-3 rounded bg-gray-800 border border-gray-700" />
            <input name="totalDonations" value={formData.totalDonations} onChange={handleChange} placeholder="Total Donations (₹)" className="p-3 rounded bg-gray-800 border border-gray-700" />
            <input name="eventsAttended" value={formData.eventsAttended} onChange={handleChange} placeholder="Events Attended (number)" className="p-3 rounded bg-gray-800 border border-gray-700" />
            <input name="leaderRank" value={formData.leaderRank} onChange={handleChange} placeholder="Leaderboard Rank" className="p-3 rounded bg-gray-800 border border-gray-700" />
          </div>
        </div>

        {/* SUBMIT */}
        <div>
          <button disabled={loading} type="submit" className="w-full py-3 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-500 disabled:opacity-60">
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>

      <MessageModal state={modalState} setState={setModalState} />
    </div>
  );
}
