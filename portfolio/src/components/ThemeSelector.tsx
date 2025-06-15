"use client";

import { useState, useEffect, useRef } from "react";
import { PaintBucket, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { setTheme } from "@/store/theme";
import { ThemeOption } from "@/types";
import axios from "axios";

export const themes: ThemeOption[] = [
  {
    id: "default",
    name: "Cyan Night",
    primaryColor: "#22d3ee",
    secondaryColor: "#155e75",
    previewColors: ["#22d3ee", "#155e75", "#1e293b", "#0f172a"],
    theme: {
      bodyTheme: {
        backgroundGradientFrom: "from-cyan-600/30",
        backgroundGradientTo: "to-black",
      },
      heroTheme: {
        sectionBackground: "bg-gray-800",
        overlayGradientStart: "from-cyan-700/20",
        overlayGradientEnd: "to-slate-950/40",
        accentColor: "text-cyan-400",
        accentButtonHover: "hover:bg-cyan-300",
        accentBackground: "bg-cyan-400",
        accentHover: "hover:bg-cyan-400",
        accentTextHover: "hover:text-cyan-400",
        heading: "text-white",
        subheading: "text-gray-200",
        navLink: "text-gray-300",
        bodyText: "text-gray-400",
        iconBackground: "bg-gray-700",
        buttonText: "text-gray-900",
        hoverButtonText: "hover:text-gray-900",
      },
      experiencesTheme: {
        headingGradientStart: "from-white",
        headingGradientEnd: "to-cyan-500",
        timelineBackground: "bg-gray-700",
        timelineProgressStart: "from-cyan-500",
        timelineProgressEnd: "to-white",
      },
      experienceCardTheme: {
        timelineDotColor: "bg-cyan-500",
        timelineDotOuterColor: "before:bg-cyan-400",
        cardBgGradient: "bg-gradient-to-br from-cyan-900 to-slate-900",
        companyTextColor: "text-cyan-500",
        roleTextColor: "text-gray-300",
        durationTextColor: "text-gray-400",
        descriptionTextColor: "text-gray-300",
        highlightBgColor: "bg-cyan-900/40",
        highlightTextColor: "text-gray-400",
      },
      projectTheme: {
        headingGradient:
          "bg-gradient-to-br from-white to-cyan-500 bg-clip-text text-transparent",
        subtextColor: "text-gray-400",
      },
      projectCardTheme: {
        containerGradient: "bg-gradient-to-br from-cyan-900/20 to-black/60",
        borderColor: "border-cyan-900",
        titleColor: "text-white",
        linkColor: "text-gray-400",
        linkHoverColor: "hover:text-white",
        descriptionColor: "text-gray-400",
        techBackground: "bg-[#2d2b55]",
        techTextColor: "text-gray-300",
      },
      toolsAndTechnologiesTheme: {
        sectionBg: "bg-[#0f0e1a]/60",
        headingGradient: "bg-gradient-to-br from-white to-cyan-500",
        headingText: "text-transparent",
        chevronColor: "text-gray-400",
      },
      techStackCardTheme: {
        cardBgColor: "bg-[#1a1a2e]",
        iconDefaultColor: "text-cyan-500",
        iconUnknownColor: "text-gray-500",
        nameTextColor: "text-gray-300",
      },
      footerTheme: {
        background: "bg-[#0f0e1a]/60",
        textPrimary: "text-white",
        textSecondary: "text-gray-400",
        iconDefault: "text-gray-400",
        iconHover: "hover:text-white",
        dotColor: "bg-cyan-500",
        copyrightText: "text-gray-500",
      },
    },
  },
  {
    id: "purple",
    name: "Midnight Purple",
    primaryColor: "#a855f7",
    secondaryColor: "#6b21a8",
    previewColors: ["#a855f7", "#6b21a8", "#1e1b4b", "#0f0e1a"],
    theme: {
      bodyTheme: {
        backgroundGradientFrom: "from-purple-600/30",
        backgroundGradientTo: "to-black",
      },
      heroTheme: {
        sectionBackground: "bg-gray-800",
        overlayGradientStart: "from-purple-700/20",
        overlayGradientEnd: "to-slate-950/40",
        accentColor: "text-purple-400",
        accentButtonHover: "hover:bg-purple-300",
        accentBackground: "bg-purple-400",
        accentHover: "hover:bg-purple-400",
        accentTextHover: "hover:text-purple-400",
        heading: "text-white",
        subheading: "text-gray-200",
        navLink: "text-gray-300",
        bodyText: "text-gray-400",
        iconBackground: "bg-gray-700",
        buttonText: "text-gray-900",
        hoverButtonText: "hover:text-gray-900",
      },
      experiencesTheme: {
        headingGradientStart: "from-white",
        headingGradientEnd: "to-purple-500",
        timelineBackground: "bg-gray-700",
        timelineProgressStart: "from-purple-500",
        timelineProgressEnd: "to-white",
      },
      experienceCardTheme: {
        timelineDotColor: "bg-purple-500",
        timelineDotOuterColor: "before:bg-purple-400",
        cardBgGradient: "bg-gradient-to-br from-purple-900 to-slate-900",
        companyTextColor: "text-purple-500",
        roleTextColor: "text-gray-300",
        durationTextColor: "text-gray-400",
        descriptionTextColor: "text-gray-300",
        highlightBgColor: "bg-purple-900/40",
        highlightTextColor: "text-gray-400",
      },
      projectTheme: {
        headingGradient:
          "bg-gradient-to-br from-white to-purple-500 bg-clip-text text-transparent",
        subtextColor: "text-gray-400",
      },
      projectCardTheme: {
        containerGradient: "bg-gradient-to-br from-purple-900/20 to-black/60",
        borderColor: "border-purple-900",
        titleColor: "text-white",
        linkColor: "text-gray-400",
        linkHoverColor: "hover:text-white",
        descriptionColor: "text-gray-400",
        techBackground: "bg-[#2d2b55]",
        techTextColor: "text-gray-300",
      },
      toolsAndTechnologiesTheme: {
        sectionBg: "bg-[#0f0e1a]/60",
        headingGradient: "bg-gradient-to-br from-white to-purple-500",
        headingText: "text-transparent",
        chevronColor: "text-gray-400",
      },
      techStackCardTheme: {
        cardBgColor: "bg-[#1a1a2e]",
        iconDefaultColor: "text-purple-500",
        iconUnknownColor: "text-gray-500",
        nameTextColor: "text-gray-300",
      },
      footerTheme: {
        background: "bg-[#0f0e1a]/60",
        textPrimary: "text-white",
        textSecondary: "text-gray-400",
        iconDefault: "text-gray-400",
        iconHover: "hover:text-white",
        dotColor: "bg-purple-500",
        copyrightText: "text-gray-500",
      },
    },
  },
  {
    id: "emerald",
    name: "Emerald Forest",
    primaryColor: "#10b981",
    secondaryColor: "#065f46",
    previewColors: ["#10b981", "#065f46", "#1a2e05", "#0f1a02"],
    theme: {
      bodyTheme: {
        backgroundGradientFrom: "from-emerald-600/30",
        backgroundGradientTo: "to-black",
      },
      heroTheme: {
        sectionBackground: "bg-gray-800",
        overlayGradientStart: "from-emerald-700/20",
        overlayGradientEnd: "to-slate-950/40",
        accentColor: "text-emerald-400",
        accentButtonHover: "hover:bg-emerald-300",
        accentBackground: "bg-emerald-400",
        accentHover: "hover:bg-emerald-400",
        accentTextHover: "hover:text-emerald-400",
        heading: "text-white",
        subheading: "text-gray-200",
        navLink: "text-gray-300",
        bodyText: "text-gray-400",
        iconBackground: "bg-gray-700",
        buttonText: "text-gray-900",
        hoverButtonText: "hover:text-gray-900",
      },
      experiencesTheme: {
        headingGradientStart: "from-white",
        headingGradientEnd: "to-emerald-500",
        timelineBackground: "bg-gray-700",
        timelineProgressStart: "from-emerald-500",
        timelineProgressEnd: "to-white",
      },
      experienceCardTheme: {
        timelineDotColor: "bg-emerald-500",
        timelineDotOuterColor: "before:bg-emerald-400",
        cardBgGradient: "bg-gradient-to-br from-emerald-900 to-slate-900",
        companyTextColor: "text-emerald-500",
        roleTextColor: "text-gray-300",
        durationTextColor: "text-gray-400",
        descriptionTextColor: "text-gray-300",
        highlightBgColor: "bg-emerald-900/40",
        highlightTextColor: "text-gray-400",
      },
      projectTheme: {
        headingGradient:
          "bg-gradient-to-br from-white to-emerald-500 bg-clip-text text-transparent",
        subtextColor: "text-gray-400",
      },
      projectCardTheme: {
        containerGradient: "bg-gradient-to-br from-emerald-900/20 to-black/60",
        borderColor: "border-emerald-900",
        titleColor: "text-white",
        linkColor: "text-gray-400",
        linkHoverColor: "hover:text-white",
        descriptionColor: "text-gray-400",
        techBackground: "bg-[#2d2b55]",
        techTextColor: "text-gray-300",
      },
      toolsAndTechnologiesTheme: {
        sectionBg: "bg-[#0f0e1a]/60",
        headingGradient: "bg-gradient-to-br from-white to-emerald-500",
        headingText: "text-transparent",
        chevronColor: "text-gray-400",
      },
      techStackCardTheme: {
        cardBgColor: "bg-[#1a1a2e]",
        iconDefaultColor: "text-emerald-500",
        iconUnknownColor: "text-gray-500",
        nameTextColor: "text-gray-300",
      },
      footerTheme: {
        background: "bg-[#0f0e1a]/60",
        textPrimary: "text-white",
        textSecondary: "text-gray-400",
        iconDefault: "text-gray-400",
        iconHover: "hover:text-white",
        dotColor: "bg-emerald-500",
        copyrightText: "text-gray-500",
      },
    },
  },
  {
    id: "amber",
    name: "Golden Sunset",
    primaryColor: "#f59e0b",
    secondaryColor: "#92400e",
    previewColors: ["#f59e0b", "#92400e", "#292524", "#1c1917"],
    theme: {
      bodyTheme: {
        backgroundGradientFrom: "from-amber-600/30",
        backgroundGradientTo: "to-black",
      },
      heroTheme: {
        sectionBackground: "bg-gray-800",
        overlayGradientStart: "from-amber-700/20",
        overlayGradientEnd: "to-slate-950/40",
        accentColor: "text-amber-400",
        accentButtonHover: "hover:bg-amber-300",
        accentBackground: "bg-amber-400",
        accentHover: "hover:bg-amber-400",
        accentTextHover: "hover:text-amber-400",
        heading: "text-white",
        subheading: "text-gray-200",
        navLink: "text-gray-300",
        bodyText: "text-gray-400",
        iconBackground: "bg-gray-700",
        buttonText: "text-gray-900",
        hoverButtonText: "hover:text-gray-900",
      },
      experiencesTheme: {
        headingGradientStart: "from-white",
        headingGradientEnd: "to-amber-500",
        timelineBackground: "bg-gray-700",
        timelineProgressStart: "from-amber-500",
        timelineProgressEnd: "to-white",
      },
      experienceCardTheme: {
        timelineDotColor: "bg-amber-500",
        timelineDotOuterColor: "before:bg-amber-400",
        cardBgGradient: "bg-gradient-to-br from-amber-900 to-slate-900",
        companyTextColor: "text-amber-500",
        roleTextColor: "text-gray-300",
        durationTextColor: "text-gray-400",
        descriptionTextColor: "text-gray-300",
        highlightBgColor: "bg-amber-900/40",
        highlightTextColor: "text-gray-400",
      },
      projectTheme: {
        headingGradient:
          "bg-gradient-to-br from-white to-amber-500 bg-clip-text text-transparent",
        subtextColor: "text-gray-400",
      },
      projectCardTheme: {
        containerGradient: "bg-gradient-to-br from-amber-900/20 to-black/60",
        borderColor: "border-amber-900",
        titleColor: "text-white",
        linkColor: "text-gray-400",
        linkHoverColor: "hover:text-white",
        descriptionColor: "text-gray-400",
        techBackground: "bg-[#2d2b55]",
        techTextColor: "text-gray-300",
      },
      toolsAndTechnologiesTheme: {
        sectionBg: "bg-[#0f0e1a]/60",
        headingGradient: "bg-gradient-to-br from-white to-amber-500",
        headingText: "text-transparent",
        chevronColor: "text-gray-400",
      },
      techStackCardTheme: {
        cardBgColor: "bg-[#1a1a2e]",
        iconDefaultColor: "text-amber-500",
        iconUnknownColor: "text-gray-500",
        nameTextColor: "text-gray-300",
      },
      footerTheme: {
        background: "bg-[#0f0e1a]/60",
        textPrimary: "text-white",
        textSecondary: "text-gray-400",
        iconDefault: "text-gray-400",
        iconHover: "hover:text-white",
        dotColor: "bg-amber-500",
        copyrightText: "text-gray-500",
      },
    },
  },
  {
    id: "sakuraPink",
    name: "Sakura Pink",
    primaryColor: "#ec4899",
    secondaryColor: "#be185d",
    previewColors: ["#ec4899", "#be185d", "#374151", "#111827"],
    theme: {
      bodyTheme: {
        backgroundGradientFrom: "from-pink-900/30",
        backgroundGradientTo: "to-gray-900",
      },
      heroTheme: {
        sectionBackground: "bg-gray-800",
        overlayGradientStart: "from-pink-800/20",
        overlayGradientEnd: "to-gray-900/65",
        accentColor: "text-pink-400",
        accentButtonHover: "hover:bg-pink-600",
        accentBackground: "bg-pink-500",
        accentHover: "hover:bg-pink-400",
        accentTextHover: "hover:text-pink-400",
        heading: "text-gray-100",
        subheading: "text-gray-300",
        navLink: "text-gray-400",
        bodyText: "text-gray-400",
        iconBackground: "bg-gray-700",
        buttonText: "text-white",
        hoverButtonText: "hover:text-white",
      },
      experiencesTheme: {
        headingGradientStart: "from-gray-100",
        headingGradientEnd: "to-pink-400",
        timelineBackground: "bg-gray-700",
        timelineProgressStart: "from-pink-500",
        timelineProgressEnd: "to-fuchsia-400",
      },
      experienceCardTheme: {
        timelineDotColor: "bg-pink-500",
        timelineDotOuterColor: "before:bg-pink-400",
        cardBgGradient: "bg-gradient-to-br from-pink-950/45 to-gray-800",
        companyTextColor: "text-pink-400",
        roleTextColor: "text-gray-300",
        durationTextColor: "text-gray-500",
        descriptionTextColor: "text-gray-400",
        highlightBgColor: "bg-pink-950/30",
        highlightTextColor: "text-gray-400",
      },
      projectTheme: {
        headingGradient:
          "bg-gradient-to-br from-gray-100 to-pink-400 bg-clip-text text-transparent",
        subtextColor: "text-gray-500",
      },
      projectCardTheme: {
        containerGradient: "bg-gradient-to-br from-pink-950/25 to-gray-900/75",
        borderColor: "border-pink-900/40",
        titleColor: "text-gray-100",
        linkColor: "text-gray-500",
        linkHoverColor: "hover:text-pink-400",
        descriptionColor: "text-gray-500",
        techBackground: "bg-gray-700/55",
        techTextColor: "text-gray-400",
      },
      toolsAndTechnologiesTheme: {
        sectionBg: "bg-gray-900/75",
        headingGradient: "bg-gradient-to-br from-gray-100 to-pink-400",
        headingText: "text-transparent",
        chevronColor: "text-gray-500",
      },
      techStackCardTheme: {
        cardBgColor: "bg-gray-800/65",
        iconDefaultColor: "text-pink-400",
        iconUnknownColor: "text-gray-600",
        nameTextColor: "text-gray-400",
      },
      footerTheme: {
        background: "bg-gray-900/85",
        textPrimary: "text-gray-100",
        textSecondary: "text-gray-500",
        iconDefault: "text-gray-500",
        iconHover: "hover:text-pink-400",
        dotColor: "bg-pink-500",
        copyrightText: "text-gray-600",
      },
    },
  },
  {
    id: "crimson",
    name: "Crimson Fire",
    primaryColor: "#ef4444",
    secondaryColor: "#7f1d1d",
    previewColors: ["#ef4444", "#7f1d1d", "#1f2937", "#000000"],
    theme: {
      bodyTheme: {
        backgroundGradientFrom: "from-red-900/40",
        backgroundGradientTo: "to-black",
      },
      heroTheme: {
        sectionBackground: "bg-gray-900",
        overlayGradientStart: "from-red-800/20",
        overlayGradientEnd: "to-black/60",
        accentColor: "text-red-400",
        accentButtonHover: "hover:bg-red-700",
        accentBackground: "bg-red-500",
        accentHover: "hover:bg-red-400",
        accentTextHover: "hover:text-red-400",
        heading: "text-gray-100",
        subheading: "text-gray-300",
        navLink: "text-gray-400",
        bodyText: "text-gray-400",
        iconBackground: "bg-gray-800",
        buttonText: "text-white",
        hoverButtonText: "hover:text-white",
      },
      experiencesTheme: {
        headingGradientStart: "from-gray-100",
        headingGradientEnd: "to-red-400",
        timelineBackground: "bg-gray-800",
        timelineProgressStart: "from-red-500",
        timelineProgressEnd: "to-orange-400",
      },
      experienceCardTheme: {
        timelineDotColor: "bg-red-500",
        timelineDotOuterColor: "before:bg-red-400",
        cardBgGradient: "bg-gradient-to-br from-red-950/60 to-gray-900",
        companyTextColor: "text-red-400",
        roleTextColor: "text-gray-300",
        durationTextColor: "text-gray-500",
        descriptionTextColor: "text-gray-400",
        highlightBgColor: "bg-red-950/30",
        highlightTextColor: "text-gray-400",
      },
      projectTheme: {
        headingGradient:
          "bg-gradient-to-br from-gray-100 to-red-400 bg-clip-text text-transparent",
        subtextColor: "text-gray-500",
      },
      projectCardTheme: {
        containerGradient: "bg-gradient-to-br from-red-950/30 to-black/80",
        borderColor: "border-red-900/50",
        titleColor: "text-gray-100",
        linkColor: "text-gray-500",
        linkHoverColor: "hover:text-red-400",
        descriptionColor: "text-gray-500",
        techBackground: "bg-gray-800/60",
        techTextColor: "text-gray-400",
      },
      toolsAndTechnologiesTheme: {
        sectionBg: "bg-black/70",
        headingGradient: "bg-gradient-to-br from-gray-100 to-red-400",
        headingText: "text-transparent",
        chevronColor: "text-gray-500",
      },
      techStackCardTheme: {
        cardBgColor: "bg-gray-900/80",
        iconDefaultColor: "text-red-400",
        iconUnknownColor: "text-gray-600",
        nameTextColor: "text-gray-400",
      },
      footerTheme: {
        background: "bg-black/80",
        textPrimary: "text-gray-100",
        textSecondary: "text-gray-500",
        iconDefault: "text-gray-500",
        iconHover: "hover:text-red-400",
        dotColor: "bg-red-500",
        copyrightText: "text-gray-600",
      },
    },
  },
];

const ThemeSelector = ({username}: {username: string}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("default");
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const savePreferences = async(theme: string) => {
    try {
      const {data} = await axios.patch(
        `http://localhost:3000/api/${username}/save-preferences`,
        {
          theme,
        }
      );
      console.log(data);
    } catch (error) {
      console.error("Error Saving Preferences to database : ", error);
    }
  };

  // Apply theme change
  const applyTheme = async (themeId: string) => {
    setSelectedTheme(themeId);

    // Find the selected theme
    const theme = themes.find((t) => t.id === themeId);

    if (!theme) return;

    // Dispatch the theme change
    dispatch(setTheme(theme.theme));

    // Save Preferences in DB
    await savePreferences(themeId)

    // Close the modal after selection
    setTimeout(() => setIsOpen(false), 300);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(target) &&
        !target.closest("#theme-toggle-button")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Toggle Button - Now positioned at the bottom */}
      <button
        id="theme-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg z-50 transition-all duration-300"
        aria-label="Toggle theme selector"
      >
        <PaintBucket size={24} className="transition-transform duration-300" />
      </button>

      {/* Theme Selector Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-end z-40">
            <motion.div
              ref={modalRef}
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-gray-900/85 rounded-xl shadow-xl w-full sm:w-96 md:w-96 max-h-[60vh] h-auto mr-9"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-md font-semibold text-gray-300">
                    SELECT THEME
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {themes.map((theme) => (
                    <div
                      key={theme.id}
                      onClick={() => applyTheme(theme.id)}
                      className={`
                        relative p-3 rounded-lg cursor-pointer transition-all duration-200
                        ${
                          selectedTheme === theme.id
                            ? "bg-gray-800 ring-2"
                            : "bg-gray-800/50 hover:bg-gray-800"
                        }
                        ${
                          selectedTheme === theme.id
                            ? `ring-${
                                theme.id === "default" ? "cyan" : theme.id
                              }-400`
                            : ""
                        }
                      `}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-white text-sm">
                          {theme.name}
                        </h3>
                        {selectedTheme === theme.id && (
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: theme.primaryColor }}
                          >
                            <Check size={12} className="text-black" />
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-1">
                        {theme.previewColors.map((color, idx) => (
                          <div
                            key={idx}
                            className="w-5 h-5 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeSelector;
