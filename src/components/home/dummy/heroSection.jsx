'use client';
import React, { useState, useEffect, useCallback } from 'react';

const HeroSection = () => {

    const heroSliderData = [
  {
    title: 'Welcome Alumni!',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Connect & Network',
    image: 'https://placehold.co/1200x500/10B981/FFFFFF?text=Connect+%26+Network',
  },
  {
    title: 'Give Back To Your Alma Mater',
    image: 'https://placehold.co/1200x500/F59E0B/FFFFFF?text=Give+Back',
  },
];

    const [currentSlide, setCurrentSlide] = useState(0);

    // useCallback helps prevent re-creation of the function on every render
    const nextSlide = useCallback(() => {
        setCurrentSlide(prev => (prev === heroSliderData.length - 1 ? 0 : prev + 1));
    }, []);

    const prevSlide = () => {
        setCurrentSlide(prev => (prev === 0 ? heroSliderData.length - 1 : prev - 1));
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    }

    // Auto-play functionality
    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        return () => clearInterval(slideInterval); // Cleanup on component unmount
    }, [nextSlide]);

    return (
        <div className="relative h-[60vh] w-full overflow-hidden">
            {/* Slides container */}
            <div className="relative h-full whitespace-nowrap transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {heroSliderData.map((slide, index) => (
                    <div
                        key={index}
                        className="inline-block h-full w-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${slide.image}')` }}
                    >
                         <div className="absolute inset-0 bg-black opacity-40"></div>
                         <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white p-4">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                            <button className="bg-white text-black font-semibold py-3 px-8 rounded-lg hover:bg-gray-200 transition duration-300">
                                GET STARTED
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-20">
                &#10094;
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-20">
                &#10095;
            </button>
            
            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                {heroSliderData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? 'bg-white' : 'bg-gray-400'}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default HeroSection