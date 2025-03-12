"use client";

import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f0e1a]/60 py-10 text-white text-center pt-96">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h2 className="text-lg font-semibold">Let's Connect!</h2>
        <p className="text-gray-400 mt-2 max-w-lg">
          Currently available for freelance work and interesting projects. Drop
          me a line if you'd like to collaborate!
        </p>

        <div className="flex gap-6 mt-4">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
            <FaGithub size={24} className="text-gray-400 hover:text-white" />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} className="text-gray-400 hover:text-white" />
          </a>
          <a href="mailto:your.email@example.com">
            <FaEnvelope size={24} className="text-gray-400 hover:text-white" />
          </a>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <span className="h-3 w-3 bg-green-500 rounded-full"></span>
          <p className="text-gray-400">Available for new projects</p>
        </div>

        <p className="text-gray-500 text-sm mt-4">
          &copy; {new Date().getFullYear()} Anish Chandel | Built with ❤️ in India
        </p>
      </div>
    </footer>
  );
};

export default Footer;
