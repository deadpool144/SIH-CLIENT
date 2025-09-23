"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, User, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import LogoutButton from "@/components/LogoutButton";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Directory", path: "/directory" },
  { name: "Events", path: "/events" },
  { name: "Donate", path: "/donate" },
  { name: "Leaderboard", path: "/leaderboard" },
  { name: "JOB Portal", path: "/posts" },
  { name: "Messages", path: "/messages" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isLoggedIn, users } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav
        className="flex justify-between items-center p-4 px-8 
                   bg-gray-900/80 backdrop-blur-lg sticky top-0 z-40 
                   shadow-md border-b border-gray-700/50"
      >
        {/* Logo */}
        <div className="text-xl font-bold flex items-center gap-2 text-white">
          <Link
          className="flex items-center gap-2"
            href="/">
              <GraduationCap /> GradLink
          </Link>
          
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6">
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

        {/* Auth (Desktop) */}
        <div className="hidden md:flex gap-3 items-center">
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
              {users?.name ? `Hi, ${users.name}` : "Profile"}
            </Link>
          )}
        </div>

        {/* Menu (always visible) */}
        <button className="text-white ml-4" onClick={() => setSidebarOpen(true)}>
          <Menu size={28} />
        </button>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-50 flex transition ${
          sidebarOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`flex-1 bg-black/50 transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar content */}
        <div
          className={`w-72 bg-gray-900/80 backdrop-blur-lg border-l border-gray-700/50 p-6 flex flex-col shadow-lg transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white">Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`block font-medium transition-colors ${
                      isActive
                        ? "text-blue-500 border-b border-blue-500 pb-1"
                        : "text-white hover:text-blue-500"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto pt-6 border-t border-gray-700">
            {!isLoggedIn ? (
              <div className="flex flex-col gap-3">
                <Link
                  href="/auth/login"
                  onClick={() => setSidebarOpen(false)}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-center text-sm hover:bg-blue-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setSidebarOpen(false)}
                  className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 text-center text-sm hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/profile/me"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                    pathname === "/profile/me"
                      ? "bg-blue-600 text-white"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  <User size={16} /> Profile
                </Link>
                <LogoutButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
