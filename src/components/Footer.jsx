"use client";

import Link from "next/link";
import { useState } from "react";

const Footer = () => {
  const institutionName = "Your Institution Name";
  const [open, setOpen] = useState(false);

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "#",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.765s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.765-1.75 1.765zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.784 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "#",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.959.192-1.333 1.588-1.333h2.412v-3h-3.412c-3.123 0-4.588 2.083-4.588 4.583v1.417z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "#",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.145 4.771 1.691 4.981 4.945.021 3.327.021 3.684 0 7.012-.216 3.262-1.734 4.779-4.991 4.938-1.28.06-1.637.061-4.902.061s-3.626 0-4.901-.061c-3.256-.159-4.773-1.676-4.98-4.938-.021-3.328-.021-3.685 0-7.012.209-3.255 1.729-4.8 4.98-4.945 1.264-.058 1.64-.07 4.898-.07zm0-2.163c-3.259 0-3.667.014-4.942.067-4.296.22-6.521 2.446-6.741 6.741-.053 1.275-.067 1.684-.067 4.942s.014 3.668.067 4.943c.22 4.295 2.446 6.521 6.741 6.741 1.275.054 1.684.067 4.942.067s3.668-.013 4.943-.067c4.295-.22 6.521-2.446 6.741-6.741.054-1.275.067-1.684.067-4.943s-.013-3.667-.067-4.942c-.22-4.295-2.446-6.521-6.741-6.741-1.275-.054-1.684-.067-4.942-.067zm0 5.864c-3.462 0-6.262 2.8-6.262 6.262s2.8 6.262 6.262 6.262 6.262-2.8 6.262-6.262-2.8-6.262-6.262-6.262zm0 10.399c-2.288 0-4.137-1.849-4.137-4.137s1.849-4.137 4.137-4.137 4.137 1.849 4.137 4.137-1.849 4.137-4.137 4.137zm6.406-11.455c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.44-.645 1.44-1.44s-.645-1.44-1.44-1.44z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      url: "#",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.111 0-5.35 2.986-4.977 6.002-4.453-.223-8.08-2.353-10.648-5.748-.465.807-.723 1.745-.723 2.75 0 1.914.938 3.593 2.375 4.571-.871-.026-1.688-.268-2.433-.671v.064c0 3.235 2.308 5.94 5.341 6.568-.568.154-1.168.21-1.785.21-.439 0-.875-.04-1.299-.126.852 2.645 3.31 4.593 6.287 4.646-2.275 1.786-5.132 2.859-8.498 2.859-.55 0-1.094-.033-1.631-.096 2.973 1.914 6.471 3.033 10.276 3.033 12.33 0 19.006-10.364 19.006-19.336 0-.306-.007-.611-.02-.916.828-.598 1.552-1.353 2.12-2.216z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-gray-950 text-gray-300 p-8 md:p-12 mt-auto">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Column 1: Our Community */}
          <div className="flex flex-col items-start space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">Our Community</h3>
            <Link href="#" className="hover:text-blue-400 transition-colors duration-300">About Us</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors duration-300">Mission & Vision</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors duration-300">Leadership Team</Link>

            {/* Manage Institute dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="hover:text-blue-400 font-medium transition-colors duration-300"
              >
                Manage Institute ▾
              </button>
              {open && (
                <div className="absolute mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                  <Link
                    href="/institute/login"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                  <Link
                    href="/institute/register"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            <div className="flex space-x-4 mt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  aria-label={link.name}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {link.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-start space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">Quick Links</h3>
            <Link href="#" className="hover:text-blue-400 transition-colors duration-300">Alumni Directory</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors duration-300">Events Calendar</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors duration-300">Job Board / Careers</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors duration-300">Mentorship Program</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors duration-300">News & Updates</Link>
          </div>

          {/* Column 3: Support & Info */}
          <div className="flex flex-col items-start space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">Support & Information</h3>
            <Link href="#" className="hover:text-blue-400 transition-colors duration-300">Contact Us</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors duration-300">FAQ / Help Center</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors duration-300">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors duration-300">Terms of Service</Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          <p className="mb-2">
            &copy; {new Date().getFullYear()} {institutionName} Alumni Association. All Rights Reserved.
          </p>
          <p>Your lifelong connection to {institutionName}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
