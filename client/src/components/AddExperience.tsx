// components/AddExperience.tsx
"use client";

import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import ExperienceForm from "./ExperienceForm";

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
  highlights: string[];
}

const defaultExperience: Experience = {
  company: "",
  role: "",
  duration: "",
  description: "",
  highlights: [""],
};

export default function AddExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([
    defaultExperience,
  ]);
  const [currentExperience, setCurrentExperience] =
    useState<Experience>(defaultExperience);
  const [isEditing, setIsEditing] = useState(true);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const saveExperience = (experienceToSave: Experience) => {
    if (editIndex !== null) {
      // Update existing experience
      setExperiences((prev) =>
        prev.map((exp, i) => (i === editIndex ? experienceToSave : exp))
      );
    } else {
      // Add new experience
      setExperiences((prev) => [...prev, experienceToSave]);
    }

    // Reset form
    setCurrentExperience(defaultExperience);
    setIsEditing(false);
    setEditIndex(null);
  };

  const startNewExperience = () => {
    setCurrentExperience(defaultExperience);
    setIsEditing(true);
    setEditIndex(null);
  };

  const editExperience = (index: number) => {
    setCurrentExperience(experiences[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const deleteExperience = (index: number) => {
    setExperiences((prev) => prev.filter((_, i) => i !== index));
    if (editIndex === index) {
      setCurrentExperience(defaultExperience);
      setIsEditing(false);
      setEditIndex(null);
    }
  };

  const handleContinue = () => {
    const validExperiences = experiences.filter((exp) => exp.company !== "");
    console.log(validExperiences);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto p-4 md:p-6 bg-transparent text-white min-h-screen"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent text-center">
          Professional Experience
        </h1>

        {/* Experience Cards */}
        {experiences.length > 0 && (
          <motion.div
            className="mb-8 space-y-4 flex flex-col items-center"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            {experiences.map((exp, index) =>
              // Skip the first default empty experience
              index === 0 && exp.company === "" ? null : (
                <ExperienceCard
                  key={index}
                  experience={exp}
                  onEdit={() => editExperience(index)}
                  onDelete={() => deleteExperience(index)}
                />
              )
            )}
            {/* </AnimatePresence> */}
          </motion.div>
        )}

        {/* Add/Edit Experience Form */}
        {isEditing ? (
          <ExperienceForm
            experience={currentExperience}
            setExperience={setCurrentExperience}
            onSave={saveExperience}
            onCancel={() => {
              setIsEditing(false);
              setCurrentExperience(defaultExperience);
              setEditIndex(null);
            }}
            editMode={editIndex !== null}
          />
        ) : (
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            layout
            onClick={startNewExperience}
            className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-700 rounded-lg text-cyan-400 hover:border-cyan-500 hover:text-cyan-300 transition-colors"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add New Experience
          </motion.button>
        )}

        {/* Continue Button */}
        {experiences.some((exp) => exp.company !== "") && !isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <button
              onClick={handleContinue}
              className="w-full bg-cyan-500 text-white py-3 rounded-lg font-medium hover:bg-cyan-600 transition-colors"
            >
              Continue
            </button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
