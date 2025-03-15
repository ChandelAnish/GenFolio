import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import React from "react";
import { Experience } from "@/types";

// Define the initial state using that type
const initialState: Experience[] = [
  {
    id: 1,
    company: "Englience AI Labs",
    role: "Full Stack Engineer (AI - Intern)",
    duration: "Sep 2024 - Dec 2024",
    description:
      "Working on AI-driven course generation and activity creation systems.",
    highlights: [
      "Refactored codebase using SOLID principles",
      "Integrated knowledge base for custom document uploads",
      "Developed AI agent for generating 6 types of activities",
      "Enhanced system scalability and integration",
    ],
  },
  {
    id: 2,
    company: "Englience AI Labs",
    role: "Full Stack Engineer (AI - Intern)",
    duration: "Sep 2024 - Dec 2024",
    description:
      "Working on AI-driven course generation and activity creation systems.",
    highlights: [
      "Refactored codebase using SOLID principles",
      "Integrated knowledge base for custom document uploads",
      "Developed AI agent for generating 6 types of activities",
      "Enhanced system scalability and integration",
    ],
  },
  {
    id: 3,
    company: "Englience AI Labs",
    role: "Full Stack Engineer (AI - Intern)",
    duration: "Sep 2024 - Dec 2024",
    description:
      "Working on AI-driven course generation and activity creation systems.",
    highlights: [
      "Refactored codebase using SOLID principles",
      "Integrated knowledge base for custom document uploads",
      "Developed AI agent for generating 6 types of activities",
      "Enhanced system scalability and integration",
    ],
  },
  {
    id: 4,
    company: "Google Summer of Code",
    role: "Full Stack Developer (Contributor)",
    duration: "May 2024 - Nov 2024",
    description:
      "Contributing to open-source development focusing on file storage and security improvements.",
    highlights: [
      "Refactored codebase using SOLID principles",
      "Integrated knowledge base for custom document uploads",
      "Developed AI agent for generating 6 types of activities",
      "Enhanced system scalability and integration",
    ],
  },
];

export const experiencesSlice = createSlice({
  name: "experiences",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    fillExperiencesDetails: (state, action: PayloadAction<Experience[]>) => {
      return action.payload;
    },
  },
});

export const { fillExperiencesDetails } = experiencesSlice.actions

export default experiencesSlice.reducer;
