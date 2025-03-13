"use client";

import { useAppSelector } from "@/store/hooks";
import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer: React.FC = () => {

  const connect = useAppSelector(store=>store.connect)

  return (
    <footer className="bg-[#0f0e1a]/60 py-10 text-white text-center pt-96">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h2 className="text-lg font-semibold">Let's Connect!</h2>
        <p className="text-gray-400 mt-2 max-w-lg">
        {connect.msg1}
        </p>

        <div className="flex gap-6 mt-4">
          <a href={connect.github} target="_blank" rel="noopener noreferrer">
            <FaGithub size={24} className="text-gray-400 hover:text-white" />
          </a>
          <a href={connect.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} className="text-gray-400 hover:text-white" />
          </a>
          <a href={`mailto:${connect.mail}`}>
            <FaEnvelope size={24} className="text-gray-400 hover:text-white" />
          </a>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <span className="h-3 w-3 bg-cyan-500 rounded-full"></span>
          <p className="text-gray-400">{connect.msg2}</p>
        </div>

        <p className="text-gray-500 text-sm mt-4">
          &copy; {new Date().getFullYear()} AS Chandel
        </p>
      </div>
    </footer>
  );
};

export default Footer;
