"use client";
import { useState } from "react";

export default function RecordsCard() {
  const [academic] = useState({
    scores: { tenth: "95%", twelfth: "92%", cgpa: "9.0/10" },
    skills: ["React", "Node.js", "TypeScript", "AWS", "Python", "SQL"],
  });

  const [workExperience] = useState([
    {
      title: "Software Engineer",
      company: "Infosys",
      duration: "2022 - Present",
      description:
        "Built high-performance web apps with React & Node.js. Integrated APIs and optimized databases.",
    },
    {
      title: "Intern",
      company: "Tech Solutions",
      duration: "2021",
      description: "Worked on CRM tool with Django and front-end enhancements.",
    },
  ]);

  return (
    <div className="bg-[#1e1e1e] p-5 rounded-lg mb-6 shadow-xl">
      <h2 className="text-xl font-bold mb-4 ">
        Academic & Professional Records
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:border-r md:border-gray-600 md:pr-6">
          <h3 className="font-bold mb-2 text-gray-300">Academic Scores</h3>
          <p className="text-gray-400">10th Grade: {academic.scores.tenth}</p>
          <p className="text-gray-400">12th Grade: {academic.scores.twelfth}</p>
          <p className="text-gray-400">College CGPA: {academic.scores.cgpa}</p>

          <h3 className="font-bold mt-4 mb-2 text-gray-300">Technical Skills</h3>
          <div className="flex flex-wrap gap-2">
            {academic.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-2 text-gray-300">Work Experience</h3>
          {workExperience.map((job, idx) => (
            <div key={idx} className="mb-4">
              <p className="font-semibold text-white">{job.title}</p>
              <p className="text-gray-400">
                {job.company} • {job.duration}
              </p>
              <p className="text-gray-300 mt-1 text-sm">{job.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
