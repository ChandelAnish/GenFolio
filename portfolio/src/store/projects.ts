import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Project } from "@/types";

// Define the initial state using that type
const initialState: Project[] = [
  {
    title: "NeXCollab",
    description:
      "Real-Time Code Collaboration Platform built during a 36-hour hackathon. Led frontend development with a focus...",
    technologies: [
      { name: "ReactJS" },
      { name: "ExpressJS" },
      { name: "PeerJS" },
      { name: "Socket.io" },
    ],
    link: "/projects/nexcollab",
  },
  {
    title: "Zeph - AI Quiz Companion",
    description:
      "Advanced AI-powered quiz platform supporting multiple-choice, true/false, and short answer questions. Features...",
    technologies: [
      { name: "NextJS" },
      { name: "Node.js" },
      { name: "OpenAI" },
      { name: "Document Processing" },
    ],
    link: "/projects/zeph",
  },
  {
    title: "Sphere",
    description:
      "Feature-rich chat platform built with MERN stack, featuring group chat functionality and advanced security measures.",
    technologies: [
      { name: "MongoDB" },
      { name: "Express" },
      { name: "React" },
      { name: "Node.js" },
      { name: "Socket.io" },
      { name: "Material UI" },
    ],
    link: "/projects/sphere",
  },
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
