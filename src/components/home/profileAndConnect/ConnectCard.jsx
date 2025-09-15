"use client";

import Link from "next/link";

export default function ConnectCard() {
  return (
    <section className="bg-gray-800 text-white py-16 px-5">
      <div className="max-w-4xl mx-auto text-center bg-gray-900/70 rounded-2xl shadow-lg p-10">
        <h2 className="text-3xl font-bold mb-4">Connect with the Alumni Network</h2>
        <p className="text-gray-300 mb-6 text-lg">
          Join our alumni portal to reconnect with peers, explore opportunities, and contribute to the community.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/auth/login"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="px-6 py-3 rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
}
