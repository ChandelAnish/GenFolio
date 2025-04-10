import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "./store";
// import React from "react";
import { Experience } from "@/types";

// Define the initial state using that type
const initialState: Experience[] = [
  {
    id: 1,
    company: "",
    role: "",
    duration: "",
    description:
      "",
    highlights: [
      "",
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
