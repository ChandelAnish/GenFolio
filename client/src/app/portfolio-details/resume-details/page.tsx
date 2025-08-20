"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiGlobe, FiFileText, FiCheck, FiArrowRight } from "react-icons/fi";

interface GenerationOption {
  id: "portfolio" | "both";
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
      recommended?: boolean;
}

interface GenerationChoiceProps {
  onChoiceSelect: (choice: "portfolio" | "both") => void;
  isLoading?: boolean;
  className?: string;
}

const generationOptions: GenerationOption[] = [
  {
    id: "portfolio",
    title: "Portfolio Website Only",
    description: "Create a stunning portfolio website to showcase your work",
    icon: FiGlobe,
    features: [
      "Responsive portfolio website",
      "Professional design templates",
      "Project showcase gallery",
      "Contact form integration",
      "SEO optimized",
    ],
  },
  {
    id: "both",
    title: "Portfolio + Resume",
    description: "Get both a portfolio website and a downloadable resume",
    icon: ({ className }: { className?: string }) => (
      <div className={`flex items-center space-x-1.5 ${className}`}>
        <FiGlobe />
        <span className="text-sm font-bold">+</span>
        <FiFileText />
      </div>
    ),
    features: [
      "Everything in Portfolio Website",
      "Professional PDF resume",
      "ATS-friendly format",
      "Multiple resume templates",
      "One-click download",
      "Auto-sync with portfolio data",
    ],
    recommended: true,
  },
];

export default function GenerationChoice({ 
  onChoiceSelect, 
  isLoading = false, 
  className = "" 
}: GenerationChoiceProps) {
  const [selectedOption, setSelectedOption] = useState<"portfolio" | "both" | null>("both");
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const handleOptionSelect = (optionId: "portfolio" | "both"): void => {
    setSelectedOption(optionId);
  };

  const handleContinue = (): void => {
    if (selectedOption) {
      onChoiceSelect(selectedOption);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className={`min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-6xl w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Choose Your Generation Option
          </h1>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Select what you&apos;d like us to generate for you. You can always add more later.
          </p>
        </motion.div>

        {/* Options Grid */}
        <motion.div
          className="grid lg:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {generationOptions.map((option) => {
            const IconComponent = option.icon;
            const isSelected = selectedOption === option.id;
            const isHovered = hoveredOption === option.id;

            return (
              <motion.div
                key={option.id}
                className={`relative border rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                  isSelected
                    ? "border-cyan-400 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 shadow-xl shadow-cyan-500/20"
                    : "border-gray-700 hover:border-cyan-500 bg-gray-800/30 backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-500/10"
                }`}
                variants={itemVariants}
                onMouseEnter={() => setHoveredOption(option.id)}
                onMouseLeave={() => setHoveredOption(null)}
                onClick={() => handleOptionSelect(option.id)}
                whileTap={{ scale: 0.98 }}
              >
                {/* Recommended Badge */}
                {option.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                      ✨ Recommended
                    </div>
                  </div>
                )}

                {/* Selection Indicator */}
                <div className={`absolute top-4 right-4 w-7 h-7 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  isSelected
                    ? "border-cyan-400 bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg"
                    : "border-gray-600 hover:border-cyan-500"
                }`}>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3, type: "spring" }}
                      className="flex items-center justify-center h-full"
                    >
                      <FiCheck className="text-white text-sm font-bold" />
                    </motion.div>
                  )}
                </div>

                {/* Icon */}
                <div className={`${
                  option.id === "both" ? "w-24 h-16" : "w-16 h-16"
                } rounded-full flex items-center justify-center mb-5 transition-all duration-300 relative ${
                  isSelected || isHovered
                    ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/10 shadow-lg"
                    : "bg-gray-800/50"
                }`}>
                  {(isSelected || isHovered) && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/5 animate-pulse" />
                  )}
                  <IconComponent className={`text-2xl transition-colors duration-300 relative z-10 ${
                    isSelected ? "text-cyan-400" : isHovered ? "text-cyan-300" : "text-gray-400"
                  }`} />
                </div>

                {/* Content */}
                <div className="text-left mb-6">
                  <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                    isSelected ? "text-white" : "text-gray-100"
                  }`}>
                    {option.title}
                  </h3>
                  <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                    isSelected ? "text-gray-300" : "text-gray-400"
                  }`}>
                    {option.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-6">
                  {option.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-center text-sm transition-colors duration-300 ${
                        isSelected ? "text-gray-200" : "text-gray-300"
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0 transition-colors duration-300 ${
                        isSelected ? "bg-cyan-400" : "bg-cyan-500"
                      }`} />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Continue Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={handleContinue}
            disabled={!selectedOption || isLoading}
            className={`relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 overflow-hidden ${
              selectedOption && !isLoading
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 shadow-xl hover:shadow-cyan-500/25"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            {selectedOption && !isLoading && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            )}
            <span className="relative z-10 flex items-center gap-3">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <FiArrowRight className="text-xl" />
                </>
              )}
            </span>
          </button>

          {selectedOption && !isLoading && (
            <motion.p
              className="text-gray-400 text-sm mt-4 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              You selected: <span className="text-cyan-400">{generationOptions.find(opt => opt.id === selectedOption)?.title}</span>
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}