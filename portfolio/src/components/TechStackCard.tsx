"use client"

import React from "react";
import { motion } from "framer-motion";
import { getIcon } from "@/lib/icons";
import * as RiIcons from "react-icons/ri";
import { useAppSelector } from "@/store/hooks";

// const techStackCardTheme = {
//   cardBgColor: "bg-[#1a1a2e]",
//   iconDefaultColor: "text-cyan-500",
//   iconUnknownColor: "text-gray-500",
//   nameTextColor: "text-gray-300",
// };

interface TechStackCardProps {
  name: string;
  icon: string;
  index: number;
}

const TechStackCard: React.FC<TechStackCardProps> = ({ name, icon, index }) => {
  const techStackCardTheme = useAppSelector(store => store.theme.techStackCardTheme)
  const IconComponent = getIcon(icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeInOut" }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="flex flex-col items-center"
    >
      <div className={`${techStackCardTheme.cardBgColor} p-4 rounded-lg mb-2 w-16 h-16 flex items-center justify-center`}>
        {IconComponent && (
          <IconComponent
            size={40}
            className={
              IconComponent === RiIcons.RiQuestionLine
                ? techStackCardTheme.iconUnknownColor
                : techStackCardTheme.iconDefaultColor
            }
          />
        )}
      </div>
      <span className={`${techStackCardTheme.nameTextColor} text-sm`}>{name}</span>
    </motion.div>
  );
};

export default TechStackCard;