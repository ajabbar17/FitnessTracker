"use client"

import Image from "next/image";
import Link from "next/link";

// components/HeroSection.jsx
const Hero = () => {
    return (
      <div className="relative bg-gray-100">
        <div className="relative">
          <Image
            src="/hero.jpg" // Update with actual image path
            alt="Hero Background"
            width={600}
            height={600}
            className="w-full h-screen object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="text-center px-7  md:w-1/2 text-white">
              <h1 className="text-4xl font-bold md:text-6xl">REACH YOUR BEST</h1>
              <p className="mt-4 text-lg md:text-xl">
              Whether you're starting your fitness journey or striving for your personal best, we're here to guide you every step of the way.
              </p>
              <div className="mt-6 font-bold">
                <Link href="/auth/signup">
                  <button className="bg-white font-bold text-black  px-10 hover:bg-gray-300 transition-all py-3 rounded">
                    SIGN UP
                  </button>
                </Link>
                <p className="mt-4">
                  Already a member?{' '}
                  <Link href="/auth/login" className="underline">
                    Log In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Hero;
  