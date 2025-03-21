"use client";

import React, { useRef } from "react";
import { Github, Linkedin, Mail, Eye } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAppSelector } from "@/store/hooks";

// const heroTheme= {
//   sectionBackground: "bg-gray-800",
//   overlayGradientStart: "from-cyan-700/20",
//   overlayGradientEnd: "to-slate-950/40",
//   accentColor: "text-cyan-400",
//   accentButtonHover: "hover:bg-cyan-300",
//   accentBackground: "bg-cyan-400",
//   accentHover: "hover:bg-cyan-400",
//   accentTextHover: "hover:text-cyan-400",
//   heading: "text-white",
//   subheading: "text-gray-200",
//   navLink: "text-gray-300",
//   bodyText: "text-gray-400",
//   iconBackground: "bg-gray-700",
//   buttonText: "text-gray-900",
//   hoverButtonText: "hover:text-gray-900",
// }

const Hero = () => {
  const heroTheme = useAppSelector(store => store.theme.heroTheme)
  const introduction = useAppSelector(store => store.introduction);
  const connect = useAppSelector(store => store.connect);

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
        className={`w-full max-w-7xl ${heroTheme.sectionBackground} rounded-3xl p-4 sm:p-6 md:p-8 relative overflow-hidden shadow-2xl`}
      >
        <div className={`absolute inset-0 bg-gradient-to-b ${heroTheme.overlayGradientStart} ${heroTheme.overlayGradientEnd} shadow-lg pointer-events-none`} />

        <div className="lg:mx-24 md:mx-12">
          {/* Navigation - Responsive */}
          <nav className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-28">
            <div className={`${heroTheme.heading} text-xl font-bold mb-4 sm:mb-0`}>
              Portfolio.
            </div>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
              <a href="#" className={`${heroTheme.accentColor} text-sm md:text-base`}>
                Home
              </a>
              <a
                href="#"
                className={`${heroTheme.navLink} ${heroTheme.accentTextHover} text-sm md:text-base`}
              >
                Experience
              </a>
              <a
                href="#"
                className={`${heroTheme.navLink} ${heroTheme.accentTextHover} text-sm md:text-base`}
              >
                Projects
              </a>
              <a
                href="#"
                className={`${heroTheme.navLink} ${heroTheme.accentTextHover} text-sm md:text-base`}
              >
                Skills
              </a>
              <a
                href="#"
                className={`${heroTheme.navLink} ${heroTheme.accentTextHover} text-sm md:text-base`}
              >
                Contact
              </a>
            </div>
          </nav>

          {/* Main Content - Responsive */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left Content */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
              <h2 className={`${heroTheme.subheading} text-lg sm:text-xl mb-2`}>
                Hello, It's Me
              </h2>
              <h1 className={`${heroTheme.heading} text-3xl sm:text-4xl md:text-5xl font-bold mb-2`}>
                {introduction.name}
              </h1>
              <div className="mb-4">
                <span className={`${heroTheme.navLink}`}>And I'm a </span>
                <span className={`${heroTheme.accentColor} font-medium`}>
                  {introduction.designation}
                </span>
              </div>

              <p className={`${heroTheme.bodyText} mb-6 max-w-md mx-auto md:mx-0 text-sm sm:text-base`}>
                {introduction.about}
              </p>

              {/* Social Icons - Centered on mobile, left-aligned on larger screens */}
              <div className="flex justify-center md:justify-start gap-4 mb-8">
                <a
                  href={connect.github}
                  className={`w-8 h-8 rounded-full ${heroTheme.iconBackground} flex items-center justify-center ${heroTheme.accentColor} ${heroTheme.accentHover} ${heroTheme.hoverButtonText} transition-colors`}
                >
                  <Github size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </a>
                <a
                  href={connect.linkedin}
                  className={`w-8 h-8 rounded-full ${heroTheme.iconBackground} flex items-center justify-center ${heroTheme.accentColor} ${heroTheme.accentHover} ${heroTheme.hoverButtonText} transition-colors`}
                >
                  <Linkedin
                    size={16}
                    className="sm:w-4 sm:h-4 md:w-5 md:h-5"
                  />
                </a>
                <a
                  href={`mailto:${connect.mail}`}
                  className={`w-8 h-8 rounded-full ${heroTheme.iconBackground} flex items-center justify-center ${heroTheme.accentColor} ${heroTheme.accentHover} ${heroTheme.hoverButtonText} transition-colors`}
                >
                  <Mail size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </a>
                <p
                  className={`w-8 h-8 rounded-full ${heroTheme.iconBackground} flex items-center justify-center ${heroTheme.accentColor} ${heroTheme.accentHover} ${heroTheme.hoverButtonText} transition-colors`}
                >
                  <Eye
                    size={16}
                    className="sm:w-4 sm:h-4 md:w-5 md:h-5"
                  />
                </p>
              </div>

              {/* CTA Button */}
              <button className={`${heroTheme.accentBackground} ${heroTheme.buttonText} font-medium py-2 px-6 rounded-full ${heroTheme.accentButtonHover} transition-colors text-sm sm:text-base`}>
                Download CV
              </button>
            </div>

            {/* Right Content - Profile Image (responsive sizes) */}
            <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
              <div className="relative">
                <div className={`absolute inset-0 ${heroTheme.accentBackground} rounded-full opacity-20 blur-xl transform scale-110`} />
                <div className={`relative w-48 h-48 sm:w-96 sm:h-96 md:w-72 md:h-72 lg:w-96 lg:h-96 ${heroTheme.accentBackground} rounded-tl-full rounded-tr-full rounded-bl-full rounded-br-full overflow-hidden`}>
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