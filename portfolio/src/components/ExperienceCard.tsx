"use client";

import { useAppSelector } from "@/store/hooks";
import { motion, useScroll, useTransform } from "framer-motion";
import { Circle } from "lucide-react";
import React, { useRef } from "react";

// const experienceCardTheme=  {
//   timelineDotColor: "bg-cyan-500",
//   timelineDotOuterColor: "before:bg-cyan-400",
//   cardBgGradient: "bg-gradient-to-br from-cyan-900 to-slate-900",
//   companyTextColor: "text-cyan-500",
//   roleTextColor: "text-gray-300",
//   durationTextColor: "text-gray-400",
//   descriptionTextColor: "text-gray-300",
//   highlightBgColor: "bg-cyan-900/40",
//   highlightTextColor: "text-gray-400",
// }

interface ExperienceCardProps {
  company: string;
  role: string;
  duration: string;
  description: string;
  highlights: string[];
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  company,
  role,
  duration,
  description,
  highlights,
  index,
}) => {

  const experienceCardTheme = useAppSelector(store=>store.theme.experienceCardTheme);
  const experienceCard = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: experienceCard,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      ref={experienceCard}
      className="relative flex items-start space-x-8"
      style={{ opacity: opacity }}
    >
      {/* Timeline Dot (Aligned with Line) */}
      <motion.div
        className={`relative z-10 flex items-center justify-center w-10 h-10 ${experienceCardTheme.timelineDotColor} rounded-full shadow-lg`}
        whileHover={{ scale: 1.1 }}
      >
        <div
          className={`relative z-10 flex items-center justify-center w-10 h-10 ${experienceCardTheme.timelineDotColor} rounded-full shadow-lg
                before:absolute before:w-16 before:h-16 ${experienceCardTheme.timelineDotOuterColor} before:opacity-40
                before:rounded-full before:-z-10 before:animate-ping`}
        >
          <Circle size={24} />
        </div>
      </motion.div>

      {/* Experience Card */}
      <motion.div
        className={`p-6 ${experienceCardTheme.cardBgGradient} rounded-xl shadow-lg text-white max-w-2xl`}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        // viewport={{ once: true }}
      >
        <h3 className={`text-xl font-semibold ${experienceCardTheme.companyTextColor}`}>{company}</h3>
        <p className={`text-sm ${experienceCardTheme.roleTextColor}`}>{role}</p>
        <p className={`text-xs ${experienceCardTheme.durationTextColor}`}>{duration}</p>
        <p className={`mt-3 ${experienceCardTheme.descriptionTextColor}`}>{description}</p>

        {/* Highlights */}
        {highlights.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {highlights.map((item, i) => (
              <div
                key={i}
                className={`text-sm ${experienceCardTheme.highlightTextColor} ${experienceCardTheme.highlightBgColor} px-3 py-1 rounded-md`}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ExperienceCard;
