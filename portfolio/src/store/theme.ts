import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "./store";
import { Theme } from "@/types";

// Define the initial state using that type
const defaultTheme: Theme = {
  bodyTheme:{
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
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: defaultTheme,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      return action.payload;
    }
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;