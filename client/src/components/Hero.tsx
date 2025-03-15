"use client";

import React from "react";
import Link from "next/link";
import { GiArtificialHive } from "react-icons/gi";
import { VscDebugStart } from "react-icons/vsc";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 lg:px-8">
      {/* Main content */}
      <div className="flex flex-col items-center z-10 text-center">
        {/* Avatar */}
        <motion.div
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-4 sm:mb-6"
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <GiArtificialHive className="text-cyan-500 w-full h-full" />
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-white to-cyan-500 bg-clip-text text-transparent"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          Welcome to GenFolio!
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-sm sm:text-base md:text-lg text-gray-400 mb-8 sm:mb-12 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
        >
          Effortlessly build, customize, and showcase your portfolio using AI.
          🚀 Let's create!
        </motion.p>

        {/* Build Portfolio button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
          className="w-full sm:w-auto"
        >
          <Link
            href="/dashboard"
            className="w-full sm:w-auto bg-black border border-cyan-600 text-cyan-500 px-4 sm:px-6 py-2 sm:py-3 rounded-full flex items-center justify-center hover:bg-cyan-900 hover:bg-opacity-20 transition-all duration-300 text-sm sm:text-base"
          >
            <VscDebugStart size={18} className="mr-2" />
            Build Portfolio
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
