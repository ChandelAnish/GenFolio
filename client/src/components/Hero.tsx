"use client";

import React, { useRef } from "react";
import { Camera, MessageCircle, Mail, UserCheck } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAppSelector } from "@/store/hooks";


const Hero = () => {

  const introduction = useAppSelector(store=>store.introduction)

  const heroSection = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroSection,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="w-full min-h-screen flex justify-center p-4">
      <motion.div
        ref={heroSection}
        style={{ opacity: opacity }}
        className="w-full max-w-7xl bg-gray-800 rounded-3xl p-4 sm:p-6 md:p-8 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-700/20 to-slate-950/40 shadow-lg pointer-events-none" />

        <div className="lg:mx-24 md:mx-12">
          {/* Navigation - Responsive */}
          <nav className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-28">
            <div className="text-white text-xl font-bold mb-4 sm:mb-0">
              Portfolio.
            </div>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
              <a href="#" className="text-cyan-400 text-sm md:text-base">
                Home
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-cyan-400 text-sm md:text-base"
              >
                Experience
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-cyan-400 text-sm md:text-base"
              >
                Projects
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-cyan-400 text-sm md:text-base"
              >
                Skills
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-cyan-400 text-sm md:text-base"
              >
                Contact
              </a>
            </div>
          </nav>

          {/* Main Content - Responsive */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left Content */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
              <h2 className="text-gray-200 text-lg sm:text-xl mb-2">
                Hello, It's Me
              </h2>
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                {introduction.name}
              </h1>
              <div className="mb-4">
                <span className="text-gray-300">And I'm a </span>
                <span className="text-cyan-400 font-medium">
                  {introduction.designation}
                </span>
              </div>

              <p className="text-gray-400 mb-6 max-w-md mx-auto md:mx-0 text-sm sm:text-base">
                {introduction.about}
              </p>

              {/* Social Icons - Centered on mobile, left-aligned on larger screens */}
              <div className="flex justify-center md:justify-start gap-4 mb-8">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-colors"
                >
                  <Camera size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-colors"
                >
                  <MessageCircle
                    size={16}
                    className="sm:w-4 sm:h-4 md:w-5 md:h-5"
                  />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-colors"
                >
                  <Mail size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-colors"
                >
                  <UserCheck
                    size={16}
                    className="sm:w-4 sm:h-4 md:w-5 md:h-5"
                  />
                </a>
              </div>

              {/* CTA Button */}
              <button className="bg-cyan-400 text-gray-900 font-medium py-2 px-6 rounded-full hover:bg-cyan-300 transition-colors text-sm sm:text-base">
                Download CV
              </button>
            </div>

            {/* Right Content - Profile Image (responsive sizes) */}
            <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400 rounded-full opacity-20 blur-xl transform scale-110" />
                <div className="relative w-48 h-48 sm:w-96 sm:h-96 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-cyan-400 rounded-tl-full rounded-tr-full rounded-bl-full rounded-br-full overflow-hidden">
                  <img
                    src={introduction.profileImage}
                    alt="profile-picture"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
