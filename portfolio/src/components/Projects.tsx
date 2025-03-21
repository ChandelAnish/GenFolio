"use client";

import React from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { useAppSelector } from "@/store/hooks";

// project theme
// const projectTheme = {
//   headingGradient:
//     "bg-gradient-to-br from-white to-cyan-500 bg-clip-text text-transparent",
//   subtextColor: "text-gray-400",
// };

const Projects: React.FC = () => {
  const projectTheme = useAppSelector((store) => store.theme.projectTheme);
  const projectsData = useAppSelector((store) => store.projects);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          className={`text-4xl font-semibold text-center mb-4 ${projectTheme.headingGradient}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          // viewport={{ once: true }}
        >
          Spotlight Projects
        </motion.h2>
        <motion.p
          className={`${projectTheme.subtextColor} text-center mb-12`}
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
