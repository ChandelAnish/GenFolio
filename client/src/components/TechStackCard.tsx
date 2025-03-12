import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export interface TechStackCardProps {
  name: string;
  icon: string;
  index: number;
}

const TechStackCard: React.FC<TechStackCardProps> = ({ name, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeInOut",
      }}
      whileHover={{ 
        scale: 1.05,
        y: -5
      }}
      className="flex flex-col items-center"
    >
      <div className="bg-[#1a1a2e] p-4 rounded-lg mb-2 w-16 h-16 flex items-center justify-center">
        <Image 
          src={icon} 
          alt={name} 
          width={40} 
          height={40} 
          className="object-contain"
        />
      </div>
      <span className="text-gray-300 text-sm">{name}</span>
    </motion.div>
  );
};

export default TechStackCard;