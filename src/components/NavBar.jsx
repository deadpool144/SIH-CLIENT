"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, User } from "lucide-react";
import { useSelector } from "react-redux";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Directory", path: "/directory" },
  { name: "Events", path: "/events" },
  { name: "Donate", path: "/donate" },
  { name: "Leaderboard", path: "/leaderboard" },
  { name: "Posts", path: "/posts" },
  { name: "Messages", path: "/messages" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  return (
    <nav
      className="flex justify-between items-center p-4 px-8 
                 bg-gray-900/80 backdrop-blur-lg sticky top-0 z-40 
                 shadow-md border-b border-gray-700/50"
    >
      {/* Logo */}
      <div className="text-xl font-bold flex items-center gap-2">
        <GraduationCap /> Alumni Portal
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex gap-6 list-none m-0 p-0">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`font-medium transition-colors ${
                  isActive
                    ? "text-blue-500 border-b-2 border-blue-500 pb-1"
                    : "text-white hover:text-blue-500"
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Auth Buttons */}
      <div className="flex gap-3 items-center">
        {!isLoggedIn ? (
          <>
            <Link
              href="/auth/login"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 text-sm hover:bg-blue-600 hover:text-white transition-colors"
            >
              Register
            </Link>
          </>
        ) : (
          <Link
            href="/profile/me"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 transition-colors"
          >
            <User size={16} />
            {user?.name ? `Hi, ${user.name}` : "Profile"}
          </Link>
        )}
      </div>
    </nav>
  );
}