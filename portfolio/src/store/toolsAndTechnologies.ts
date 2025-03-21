import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "./store";
import { ToolTechnology } from "@/types";

// Define the initial state using that type
const initialState: ToolTechnology[] = [
  {
    name: "React",
    icon: "FaReact",
  },
  {
    name: "Next.js",
    icon: "SiNextdotjs",
  },
  {
    name: "TypeScript",
    icon: "SiTypescript",
  },
  {
    name: "JavaScript",
    icon: "FaJs",
  },
  {
    name: "HTML",
    icon: "FaHtml5",
  },
  {
    name: "CSS",
    icon: "FaCss3Alt",
  },
  {
    name: "Tailwind CSS",
    icon: "SiTailwindcss",
  },
  {
    name: "Angular",
    icon: "SiAngular",
  },
];

export const toolsAndTechnologiesSlice = createSlice({
  name: "toolsAndTechnologies",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    fillToolsAndTechnologiesDetails: (
      state,
      action: PayloadAction<ToolTechnology[]>
    ) => {
      return action.payload;
    },
  },
});

export const { fillToolsAndTechnologiesDetails } =
  toolsAndTechnologiesSlice.actions;

export default toolsAndTechnologiesSlice.reducer;
