"use client";

import { useState, useEffect, useRef } from "react";
import { PaintBucket, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@/store/theme";
import { setSelectedTheme, setFontStyle } from "@/store/resumeSlice";
import { RootState } from "@/store/store";
import { ThemeOption } from "@/types";
import axios from "axios";
import {
  Inter,
  Roboto,
  Lato,
  Open_Sans,
  Montserrat,
  Playfair_Display,
  Crimson_Text,
  Merriweather,
  PT_Serif,
} from "next/font/google";

// Initialize Google Fonts
const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});
const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });
const crimsonText = Crimson_Text({
  weight: ["400", "600"],
  subsets: ["latin"],
});
const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});
const ptSerif = PT_Serif({ weight: ["400", "700"], subsets: ["latin"] });

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

// Resume themes
const resumeThemes = [
  { id: "default", name: "Professional" },
  { id: "modern", name: "Modern" },
  { id: "creative", name: "Creative" },
  { id: "minimal", name: "Minimal" },
];

// Font styles
const fontStyles = [
  { id: "default", name: "Default", font: inter },
  { id: "roboto", name: "Roboto", font: roboto },
  { id: "lato", name: "Lato", font: lato },
  { id: "openSans", name: "Open Sans", font: openSans },
  { id: "montserrat", name: "Montserrat", font: montserrat },
  { id: "playfair", name: "Playfair Display", font: playfair },
  { id: "crimsonText", name: "Crimson Text", font: crimsonText },
  { id: "merriweather", name: "Merriweather", font: merriweather },
  { id: "ptSerif", name: "PT Serif", font: ptSerif },
];

interface ThemeSelectorProps {
  username: string;
  variant?: "portfolio" | "resume";
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  username,
  variant = "portfolio",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedThemeLocal] = useState("default");
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  // Get current resume theme and font from Redux
  const resumeTheme = useSelector(
    (state: RootState) => state.resume.selectedTheme
  );
  const fontStyle = useSelector((state: RootState) => state.resume.fontStyle);

  const savePreferences = async (theme: string, fontStyle?: string) => {
    try {
      const payload =
        variant === "resume"
          ? { theme, fontStyle, variant }
          : { theme, variant };

      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/${username}/save-preferences`,
        payload
      );
      console.log(data);
    } catch (error) {
      console.error("Error Saving Preferences to database : ", error);
    }
  };

  // Apply theme change for portfolio
  const applyPortfolioTheme = async (themeId: string) => {
    setSelectedThemeLocal(themeId);

    // Find the selected theme
    const theme = themes.find((t) => t.id === themeId);

    if (!theme) return;

    // Dispatch the theme change
    dispatch(setTheme(theme.theme));

    // Close the modal after selection
    setTimeout(() => setIsOpen(false), 300);

    // Save Preferences in DB
    await savePreferences(themeId);
  };

  // Apply theme change for resume
  const applyResumeTheme = async (themeId: string) => {
    dispatch(setSelectedTheme(themeId));
    await savePreferences(themeId, fontStyle);
  };

  // Apply font change for resume
  const applyFontStyle = async (fontId: string) => {
    dispatch(setFontStyle(fontId));
    await savePreferences(resumeTheme, fontId);
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
      {/* Toggle Button */}
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
          <div className="fixed inset-0 bg-black/50 flex items-center justify-end z-50">
            <motion.div
              ref={modalRef}
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-gray-900/85 rounded-xl shadow-xl w-full sm:w-96 md:w-96 max-h-[70vh] h-auto mr-9"
            >
              <div className="p-5">
                {variant === "portfolio" ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-md font-semibold text-gray-300">
                        SELECT THEME
                      </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {themes.map((theme) => (
                        <div
                          key={theme.id}
                          onClick={() => applyPortfolioTheme(theme.id)}
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
                  </>
                ) : (
                  <>
                    {/* Resume Themes Section */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-md font-semibold text-gray-300">
                          RESUME THEMES
                        </h2>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {resumeThemes.map((theme) => (
                          <div
                            key={theme.id}
                            onClick={() => applyResumeTheme(theme.id)}
                            className={`
                              relative p-3 rounded-lg cursor-pointer transition-all duration-200
                              ${
                                resumeTheme === theme.id
                                  ? "bg-gray-700 ring-2 ring-cyan-400"
                                  : "bg-gray-700/35 hover:bg-gray-700"
                              }
                            `}
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-white text-sm">
                                {theme.name}
                              </h3>
                              {resumeTheme === theme.id && (
                                <div className="w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center">
                                  <Check size={12} className="text-black" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Font Styles Section */}
                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-md font-semibold text-gray-300">
                          FONT STYLES
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 gap-2 max-h-48 p-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
                        {fontStyles.map((font) => (
                          <div
                            key={font.id}
                            onClick={() => applyFontStyle(font.id)}
                            className={`
                              relative p-3 rounded-lg cursor-pointer transition-all duration-200
                              ${
                                fontStyle === font.id
                                  ? "bg-gray-700 ring-2 ring-cyan-400"
                                  : "bg-gray-700/35 hover:bg-gray-700"
                              }
                            `}
                          >
                            <div className="flex items-center justify-between">
                              <h3
                                className={`font-medium text-white text-sm ${font.font.className}`}
                              >
                                {font.name}
                              </h3>
                              {fontStyle === font.id && (
                                <div className="w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center">
                                  <Check size={12} className="text-black" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeSelector;
