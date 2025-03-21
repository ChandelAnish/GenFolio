import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "./store";
// import React from "react";
import { Experience } from "@/types";

// Define the initial state using that type
const initialState: Experience[] = [
  {
    id: 1,
    company: "NoTime Startup",
    role: "Full Stack Developer Intern",
    duration: "Oct 2024 - Present",
    description:
      "Building and enhancing the NoTime Ed-tech platform, focusing on authentication, AI-based learning solutions, and cloud deployment.",
    highlights: [
      "Implemented authentication using JWT",
      "Developed interactive learning modules using Next.js and Tailwind CSS",
      "Integrated AWS for scalable cloud solutions",
      "Worked on Payload CMS for content management",
    ],
  }
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
