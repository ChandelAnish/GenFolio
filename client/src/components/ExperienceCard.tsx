"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { LucideIcon } from "lucide-react";
import React, { useRef } from "react";

interface ExperienceCardProps {
  company: string;
  role: string;
  duration: string;
  description: string;
  highlights: string[];
  icon: React.ReactNode;
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  company,
  role,
  duration,
  description,
  highlights,
  icon,
  index,
}) => {
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
        className="relative z-10 flex items-center justify-center w-10 h-10 bg-cyan-500 rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
      >
        <div
          className="relative z-10 flex items-center justify-center w-10 h-10 bg-cyan-500 rounded-full shadow-lg
                before:absolute before:w-16 before:h-16 before:bg-cyan-400 before:opacity-40
                before:rounded-full before:-z-10 before:animate-ping"
        >
          {icon}
        </div>
      </motion.div>

      {/* Experience Card */}
      <motion.div
        className="p-6 bg-gradient-to-br from-cyan-900 to-slate-900 rounded-xl shadow-lg text-white max-w-2xl"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        // viewport={{ once: true }}
      >
        <h3 className="text-xl font-semibold text-cyan-500">{company}</h3>
        <p className="text-sm text-gray-300">{role}</p>
        <p className="text-xs text-gray-400">{duration}</p>
        <p className="mt-3 text-gray-300">{description}</p>

        {/* Highlights */}
        {highlights.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {highlights.map((item, i) => (
              <div
                key={i}
                className="text-sm text-gray-400 bg-cyan-900/40 px-3 py-1 rounded-md"
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
