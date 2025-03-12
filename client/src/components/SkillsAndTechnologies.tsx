"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TechStackCard from "./TechStackCard";
import { ChevronDown } from "lucide-react";

interface Technology {
  name: string;
  icon: string;
}

const technologies: Technology[] = [
  { name: "JavaScript", icon: "/icons/javascript.svg" },
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "ReactJS", icon: "/icons/react.svg" },
  { name: "NextJS", icon: "/icons/nextjs.svg" },
  { name: "Redux", icon: "/icons/redux.svg" },
  { name: "NodeJS", icon: "/icons/nodejs.svg" },
  { name: "ExpressJS", icon: "/icons/express.svg" },
  { name: "Python", icon: "/icons/python.svg" },
  { name: "Firebase", icon: "/icons/firebase.svg" },
  { name: "MySQL", icon: "/icons/mysql.svg" },
  { name: "MongoDB", icon: "/icons/mongodb.svg" },
  { name: "GraphQL", icon: "/icons/graphql.svg" },
];

const SkillsAndTechnologies: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="py-20 mt-9 bg-[#0f0e1a]/60">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          // viewport={{once: true}}
          className="text-4xl font-semibold text-center mb-16 bg-gradient-to-br from-white to-cyan-500 bg-clip-text text-transparent"
        >
          Skills & Technologies
        </motion.h2>

        {/* Display the first 10 technologies */}
        <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center mb-12" layout>
          {technologies.slice(0, 10).map((tech, index) => (
            <TechStackCard
              key={index}
              name={tech.name}
              icon={tech.icon}
              index={index}
            />
          ))}
        </motion.div>

        {/* Expandable Section */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center mt-6 overflow-hidden"
            >
              {technologies.slice(10).map((tech, index) => (
                <TechStackCard
                  key={index + 10}
                  name={tech.name}
                  icon={tech.icon}
                  index={index + 10}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.div
          className="flex justify-center mt-8 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => setExpanded(!expanded)}
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration:1, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{
                // repeat: !expanded ? Infinity : 0,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <ChevronDown className="text-gray-400" size={32} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsAndTechnologies;
