"use client";

import React from "react";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";
import { motion } from "framer-motion";

const projectsData: ProjectCardProps[] = [
  {
    title: "NeXCollab",
    description:
      "Real-Time Code Collaboration Platform built during a 36-hour hackathon. Led frontend development with a focus...",
    technologies: [
      { name: "ReactJS" },
      { name: "ExpressJS" },
      { name: "PeerJS" },
      { name: "Socket.io" },
    ],
    link: "/projects/nexcollab",
  },
  {
    title: "Zeph - AI Quiz Companion",
    description:
      "Advanced AI-powered quiz platform supporting multiple-choice, true/false, and short answer questions. Features...",
    technologies: [
      { name: "NextJS" },
      { name: "Node.js" },
      { name: "OpenAI" },
      { name: "Document Processing" },
    ],
    link: "/projects/zeph",
  },
  {
    title: "Sphere",
    description:
      "Feature-rich chat platform built with MERN stack, featuring group chat functionality and advanced security measures.",
    technologies: [
      { name: "MongoDB" },
      { name: "Express" },
      { name: "React" },
      { name: "Node.js" },
      { name: "Socket.io" },
      { name: "Material UI" },
    ],
    link: "/projects/sphere",
  },
];

const Projects: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-semibold text-center mb-4 bg-gradient-to-br from-white to-cyan-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          // viewport={{ once: true }}
        >
          Spotlight Projects
        </motion.h2>
        <motion.p
          className="text-gray-400 text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          // viewport={{ once: true }}
        >
          Explore some of my recent work and creative endeavors
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl m-auto">
          {projectsData.map((project, index) => (
            <div
              key={index}
              className={
                projectsData.length % 2 !== 0 &&
                index === projectsData.length - 1
                  ? "md:col-span-2 flex justify-center"
                  : "flex justify-center"
              }
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
