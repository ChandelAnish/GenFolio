// components/AddExperience.tsx
"use client";

import React, { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import ExperienceForm from "./ExperienceForm";
import { useRouter } from "next/navigation";
import { Experience } from "@/types";
import { useAppDispatch } from "@/hooks/customHooks";
import {
  fillExperiences,
  fillInitialProfileDetails,
} from "@/store/portfolioDetailsSlice";

const defaultExperience: Experience = {
  company: "",
  role: "",
  duration: "",
  description: "",
  highlights: [""],
};

export default function AddExperience() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const [experiences, setExperiences] = useState<Experience[]>([
    defaultExperience,
  ]);
  const [currentExperience, setCurrentExperience] =
    useState<Experience>(defaultExperience);
  const [isEditing, setIsEditing] = useState(true);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    // load profile data details from session storage
    const sessionProfileData = JSON.parse(
      sessionStorage.getItem("portfolioDetails") ?? "{}"
    );
    if (Object.keys(sessionProfileData).length != 0) {
      // console.log(sessionProfileData);
      dispatch(fillInitialProfileDetails(sessionProfileData));
      setExperiences(sessionProfileData.experience)
    }
  },[]);

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
    setLoading(true);
    const validExperiences = experiences.filter((exp) => exp.company !== "");
    // console.log(validExperiences);
    dispatch(fillExperiences(validExperiences));
    setLoading(false);
    router.push("/portfolio-details/add-projects");
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
            className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-700 rounded-lg text-cyan-400 hover:border-cyan-500 hover:text-cyan-300 transition-colors max-w-2xl mx-auto"
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
            className="mt-8 max-w-2xl mx-auto"
          >
            <button
              onClick={handleContinue}
              className="w-full bg-cyan-500 text-white py-3 rounded-lg font-medium hover:bg-cyan-600 transition-colors flex items-center justify-center"
            >
              {loading && (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              Continue
            </button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
