"use client"

import React from "react";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Project } from "@/types";
import { useAppSelector } from "@/store/hooks";

// const projectCardTheme = {
//   containerGradient: "bg-gradient-to-br from-cyan-900/20 to-black/60",
//   borderColor: "border-cyan-900",
//   titleColor: "text-white",
//   linkColor: "text-gray-400",
//   linkHoverColor: "hover:text-white",
//   descriptionColor: "text-gray-400",
//   techBackground: "bg-[#2d2b55]",
//   techTextColor: "text-gray-300",
// };

const ProjectCard: React.FC<Project> = ({
  title,
  description,
  technologies,
  link,
}) => {

  const projectCardTheme = useAppSelector(store => store.theme.projectCardTheme)

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: [60, 0, 20, 0] }}
      transition={{ duration: 0.5 }}
      // viewport={{ once: true }}
      className={`rounded-lg ${projectCardTheme.containerGradient} shadow-lg ${projectCardTheme.titleColor} p-8 flex flex-col h-full border-[1px] ${projectCardTheme.borderColor} max-w-[35rem]`}
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className={`text-2xl font-bold ${projectCardTheme.titleColor}`}>{title}</h3>
        <Link href={link} className={`${projectCardTheme.linkColor} ${projectCardTheme.linkHoverColor}`}>
          <LinkIcon />
        </Link>
      </div>

      <p className={`${projectCardTheme.descriptionColor} mb-6 flex-grow`}>{description}</p>

      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className={`${projectCardTheme.techBackground} ${projectCardTheme.techTextColor} px-4 py-2 rounded-full text-sm`}
          >
            {tech.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
