"use client";
import Image from "next/image";

// Simple header with logo
const SimpleHeader = () => (
  <div className="py-6 px-8">
    <div className="text-[#36c1f2] text-3xl font-bold tracking-wider">✴ logo</div>
  </div>
);

// Dummy leaderboard data
const leaderboardData = [
  { rank: 1, name: "Priya Sharma", points: 10000, img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { rank: 2, name: "Arjun Singh", points: 7500, img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { rank: 3, name: "Meera Patel", points: 5000, img: "https://randomuser.me/api/portraits/women/64.jpg" },
  { rank: 4, name: "Karthik Rao", points: 4000, img: "https://randomuser.me/api/portraits/men/67.jpg" },
  { rank: 5, name: "Ananya Gupta", points: 3500, img: "https://randomuser.me/api/portraits/women/50.jpg" },
  { rank: 6, name: "Rohan Verma", points: 3000, img: "https://randomuser.me/api/portraits/men/50.jpg" },
  { rank: 7, name: "Sneha Reddy", points: 2500, img: "https://randomuser.me/api/portraits/women/51.jpg" },
  { rank: 8, name: "Vikram Kumar", points: 2000, img: "https://randomuser.me/api/portraits/men/51.jpg" },
];

// Component for single leaderboard entry
const LeaderboardItem = ({ user }) => {
  const { rank, name, points, img } = user;

  // Different border colors for top 3
  const rankStyles = {
    1: { border: "border-yellow-400", rankBg: "bg-yellow-400 text-yellow-900" },
    2: { border: "border-gray-400", rankBg: "bg-gray-300 text-gray-800" },
    3: { border: "border-amber-600", rankBg: "bg-amber-600 text-amber-100" },
  };

  const style = rankStyles[rank] || { border: "border-transparent", rankBg: "bg-gray-600 text-white" };

  return (
    <div
      className={`flex items-center p-3 rounded-lg bg-gray-800 shadow-lg mb-3 
                  transition-all duration-300 hover:bg-gray-700 hover:shadow-xl 
                  transform hover:scale-[1.02] border-l-4 ${style.border}`}
    >
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full 
                    font-bold text-lg mr-4 ${style.rankBg}`}
      >
        {rank}
      </div>
      <div className="flex items-center flex-grow">
        <Image
          src={img}
          alt={name}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
        />
        <p className="text-lg font-semibold text-gray-100 ml-4">{name}</p>
      </div>
      <div className="text-xl font-bold text-[#36c1f2] w-28 text-right pr-4">
        {points.toLocaleString("en-IN")}
      </div>
    </div>
  );
};

// Leaderboard page
export default function Page() {
  return (
    <div className="bg-gray-900 text-white font-['Segoe_UI',_Arial,_sans-serif] min-h-screen">
      <SimpleHeader />
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-10">
          Leaderboard
        </h1>

        {/* Column Headers */}
        <div className="flex items-center px-4 py-2 text-gray-400 uppercase text-sm font-semibold mb-3">
          <div className="w-10 mr-4 text-center">Rank</div>
          <div className="flex-grow pl-16">Name</div>
          <div className="w-28 text-right pr-4">Points</div>
        </div>

        {/* Leaderboard Items */}
        <div className="space-y-3">
          {leaderboardData.map((user) => (
            <LeaderboardItem key={user.rank} user={user} />
          ))}
        </div>
      </main>
    </div>
  );
}
