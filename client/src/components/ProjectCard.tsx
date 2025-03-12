"use client"

import React from "react";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";

export interface Technology {
  name: string;
}

export interface ProjectCardProps {
  title: string;
  description: string;
  technologies: Technology[];
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  link,
}) => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{
            opacity: 1,
            y: [60,0,20,0] 
        }}
    transition={{ duration: .5}}
    // viewport={{ once: true }}
      className="rounded-lg bg-gradient-to-br from-cyan-900/20 to-black/60 shadow-lg text-white p-8 flex flex-col h-full border-[1px] border-cyan-900 max-w-[35rem]"
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <Link href={link} className="text-gray-400 hover:text-white">
          <LinkIcon />
        </Link>
      </div>

      <p className="text-gray-400 mb-6 flex-grow">{description}</p>

      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="bg-[#2d2b55] text-gray-300 px-4 py-2 rounded-full text-sm"
          >
            {tech.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
