"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { useAppSelector } from "@/store/hooks";

// const experiencesTheme= {
//   headingGradientStart: "from-white",
//   headingGradientEnd: "to-cyan-500",
//   timelineBackground: "bg-gray-700",
//   timelineProgressStart: "from-cyan-500",
//   timelineProgressEnd: "to-white",
// }

export default function Experiences() {

  const experiencesTheme = useAppSelector(store => store.theme.experiencesTheme);
  const experiences = useAppSelector(store => store.experiences);

  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start start", "end start"],
  });

  return (
    <div
      id="experience"
      ref={timelineRef}
      className="relative flex flex-col items-center min-h-screen px-6 py-16"
    >
      <motion.h1 
        className={`text-4xl font-semibold bg-gradient-to-br ${experiencesTheme.headingGradientStart} ${experiencesTheme.headingGradientEnd} bg-clip-text text-transparent mb-12`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        // viewport={{ once: true }}
      >
        Experience
      </motion.h1>
      
      {/* Experience Section */}
      <div className="relative space-y-16">
        {/* Background timeline */}
        <div className={`absolute left-[16px] top-[62px] h-full w-2 ${experiencesTheme.timelineBackground} rounded z-0`}></div>
        
        {/* Animated progress line */}
        <motion.div
          className={`absolute left-[16px] top-0 w-2 bg-gradient-to-t ${experiencesTheme.timelineProgressStart} ${experiencesTheme.timelineProgressEnd} rounded-full z-10`}
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
            index={index}
          />
        ))}
      </div>
    </div>
  );
}