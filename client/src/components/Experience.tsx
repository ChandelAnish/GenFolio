"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Briefcase, Code } from "lucide-react";
import ExperienceCard from "./ExperienceCard";

const experiences = [
  {
    id: 1,
    company: "Englience AI Labs",
    role: "Full Stack Engineer (AI - Intern)",
    duration: "Sep 2024 - Dec 2024",
    description:
      "Working on AI-driven course generation and activity creation systems.",
    highlights: [
      "Refactored codebase using SOLID principles",
      "Integrated knowledge base for custom document uploads",
      "Developed AI agent for generating 6 types of activities",
      "Enhanced system scalability and integration",
    ],
    icon: <Briefcase size={24} />,
  },
  {
    id: 2,
    company: "Englience AI Labs",
    role: "Full Stack Engineer (AI - Intern)",
    duration: "Sep 2024 - Dec 2024",
    description:
      "Working on AI-driven course generation and activity creation systems.",
    highlights: [
      "Refactored codebase using SOLID principles",
      "Integrated knowledge base for custom document uploads",
      "Developed AI agent for generating 6 types of activities",
      "Enhanced system scalability and integration",
    ],
    icon: <Briefcase size={24} />,
  },
  {
    id: 3,
    company: "Englience AI Labs",
    role: "Full Stack Engineer (AI - Intern)",
    duration: "Sep 2024 - Dec 2024",
    description:
      "Working on AI-driven course generation and activity creation systems.",
    highlights: [
      "Refactored codebase using SOLID principles",
      "Integrated knowledge base for custom document uploads",
      "Developed AI agent for generating 6 types of activities",
      "Enhanced system scalability and integration",
    ],
    icon: <Briefcase size={24} />,
  },
  {
    id: 4,
    company: "Google Summer of Code",
    role: "Full Stack Developer (Contributor)",
    duration: "May 2024 - Nov 2024",
    description:
      "Contributing to open-source development focusing on file storage and security improvements.",
    highlights: [
      "Refactored codebase using SOLID principles",
      "Integrated knowledge base for custom document uploads",
      "Developed AI agent for generating 6 types of activities",
      "Enhanced system scalability and integration",
    ],
    icon: <Code size={24} />,
  },
];

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start start", "end start"],
  });

  return (
    <div
      ref={timelineRef}
      className="relative flex flex-col items-center min-h-screen px-6 py-16"
    >
      <motion.h1 className="text-4xl font-semibold bg-gradient-to-br from-white to-cyan-500 bg-clip-text text-transparent mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5}}
              // viewport={{ once: true }}
      >
        Experience
      </motion.h1>
      
      {/* Experience Section */}
      <div className="relative space-y-16">
        {/* Background timeline */}
        <div className="absolute left-[16px] top-[62px] h-full w-2 bg-gray-700 rounded z-0"></div>
        
        {/* Animated progress line */}
        <motion.div
          className="absolute left-[16px] top-0 w-2 bg-gradient-to-t from-cyan-500 to-white rounded-full z-10"
          style={{ 
            height: "100%", 
            scaleY: scrollYProgress,
            originY: 0 
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {experiences.map((exp, index) => (
          <ExperienceCard
            key={exp.id}
            company={exp.company}
            role={exp.role}
            duration={exp.duration}
            description={exp.description}
            highlights={exp.highlights}
            icon={exp.icon}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}