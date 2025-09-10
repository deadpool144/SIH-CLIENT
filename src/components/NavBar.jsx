'use client';
import React, { useState } from 'react';

const Navbar = () => {
    // State for mobile menu
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white p-4 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <a href="#" className="font-bold text-xl text-gray-800">Logo</a>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex justify-center items-center flex-grow">
                    <ul className="flex space-x-8">
                        <li><a href="#" className="text-gray-600 hover:text-blue-500 font-semibold transition-colors">Home</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500 font-semibold transition-colors">About</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500 font-semibold transition-colors">Gallery</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500 font-semibold transition-colors">Events</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500 font-semibold transition-colors">Search</a></li>
                    </ul>
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center space-x-2">
                    <button className="text-gray-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300">Login</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold">Sign Up</button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsOpen(!isOpen)} aria-label="Open menu">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                 <div className="md:hidden mt-4">
                     <ul className="flex flex-col space-y-4 items-center">
                        <li><a href="#" className="text-gray-600 hover:text-blue-500 font-semibold block py-2">Home</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500 font-semibold block py-2">About</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500 font-semibold block py-2">Gallery</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500 font-semibold block py-2">Events</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500 font-semibold block py-2">Search</a></li>
                    </ul>
                    <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-gray-200">
                         <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-full font-semibold">Login</button>
                         <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 w-full font-semibold mt-2">Sign Up</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;