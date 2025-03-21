"use client";

import { useAppSelector } from "@/store/hooks";
import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

// const footerTheme = {
//   background: "bg-[#0f0e1a]/60",
//   textPrimary: "text-white",
//   textSecondary: "text-gray-400",
//   iconDefault: "text-gray-400",
//   iconHover: "hover:text-white",
//   dotColor: "bg-cyan-500",
//   copyrightText: "text-gray-500",
// };

const Footer: React.FC = () => {
  const footerTheme = useAppSelector((store) => store.theme.footerTheme);
  const connect = useAppSelector((store) => store.connect);

  return (
    <footer className={`${footerTheme.background} py-10 ${footerTheme.textPrimary} text-center pt-96`}>
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h2 className="text-lg font-semibold">Let's Connect!</h2>
        <p className={`${footerTheme.textSecondary} mt-2 max-w-lg`}>{connect.msg1}</p>

        <div className="flex gap-6 mt-4">
          <a href={connect.github} target="_blank" rel="noopener noreferrer">
            <FaGithub size={24} className={`${footerTheme.iconDefault} ${footerTheme.iconHover}`} />
          </a>
          <a href={connect.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} className={`${footerTheme.iconDefault} ${footerTheme.iconHover}`} />
          </a>
          <a href={`mailto:${connect.mail}`}>
            <FaEnvelope size={24} className={`${footerTheme.iconDefault} ${footerTheme.iconHover}`} />
          </a>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <span className={`h-3 w-3 ${footerTheme.dotColor} rounded-full`}></span>
          <p className={footerTheme.textSecondary}>{connect.msg2}</p>
        </div>

        <p className={`${footerTheme.copyrightText} text-sm mt-4`}>
          &copy; {new Date().getFullYear()} AS Chandel
        </p>
      </div>
    </footer>
  );
};

export default Footer;