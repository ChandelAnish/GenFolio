import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "./store";
import { Project } from "@/types";

// Define the initial state using that type
const initialState: Project[] = [
  {
    title: "",
    description: "",
    technologies: [
      { name: "" },
      { name: "" },
      { name: "" },
      { name: "" },
      { name: "" }
    ],
    link: "",
  }
];

export const projectsSlice = createSlice({
  name: "projects",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    fillProjectsDetails: (state, action: PayloadAction<Project[]>) => {
      return action.payload;
    },
  },
});

export const { fillProjectsDetails } = projectsSlice.actions

export default projectsSlice.reducer;
