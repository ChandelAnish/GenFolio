"use client";

import React, { useState, useRef, useEffect } from "react";
// Import AI icon from react-icons
import { GiArtificialHive } from "react-icons/gi";
import { motion } from "framer-motion";
import { useAppSelector } from "@/store/hooks";

interface PromptButtonProps {
  handlePromptSubmit: (prompt: string) => void;
  buttonText?: string;
  placeholder?: string;
}

const PromptButton: React.FC<PromptButtonProps> = ({
  handlePromptSubmit,
  buttonText = "Prompt",
  placeholder = "Enter your prompt here...",
}) => {
  const buttonTheme = useAppSelector(
    (store) => store.theme.heroTheme.accentBackground
  );

  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const promptBoxRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      await handlePromptSubmit(prompt);
      setPrompt("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting prompt:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Close prompt box when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        promptBoxRef.current &&
        !promptBoxRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg z-50 transition-all duration-300 flex items-center justify-center">
      <motion.button
        initial={{ rotate: 0 }}
        whileHover={{
          rotate: 180,
        }}
        transition={{
          duration: .3
        }}
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={buttonText}
      >
        <GiArtificialHive size={24} />
      </motion.button>

      {isOpen && (
        <div
          ref={promptBoxRef}
          className="absolute bottom-full right-0 mb-2 z-20 w-80 sm:w-96 bg-white dark:bg-gray-800/95 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 transform origin-bottom-right"
        >
          <div className="px-4 pt-4">
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-300">
              MODIFY WITH AI
            </h3>
          </div>
          <div className="p-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="outline-none w-full h-24 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-1 focus:ring-slate-500 focus:border-transparent dark:bg-gray-900/30 dark:text-white dark:placeholder-gray-400 resize-none"
              autoFocus
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading || !prompt.trim()}
                className={`px-4 py-2 rounded-md bg-cyan-300 hover:bg-cyan-400 text-slate-300 transition-colors ${
                  isLoading || !prompt.trim()
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                } dark:bg-cyan-500 dark:hover:bg-cyan-600 dark:text-white`}
              >
                {isLoading ? (
                  <span className="inline-flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptButton;