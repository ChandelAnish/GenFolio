// components/ExperienceCard.tsx
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Experience } from "@/types"; 

interface ExperienceCardProps {
  experience: Experience;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ExperienceCard({
  experience,
  onEdit,
  onDelete,
}: ExperienceCardProps) {
  const { company, role, duration, description, highlights } = experience;
  return (
    <motion.div
      className="p-6 bg-gradient-to-br from-cyan-900/70 to-slate-900/70 rounded-xl shadow-lg text-white max-w-2xl flex w-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      exit={{ opacity: 0, y: 0 }}
      viewport={{ once: true }}
    >
      <div>
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
      </div>


      {/* buttons */}
      <div className="flex space-x-3 sm:self-start self-end ml-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEdit}
          className="px-3 py-1 bg-cyan-700/30 rounded-md text-cyan-400 hover:bg-cyan-900 transition-colors text-sm"
        >
          Edit
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDelete}
          className="px-3 py-1 bg-cyan-700/30 rounded-md text-red-400 hover:bg-cyan-900 transition-colors text-sm"
        >
          Delete
        </motion.button>
      </div>
    </motion.div>
  );
}
