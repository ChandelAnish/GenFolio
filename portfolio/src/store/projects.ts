import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "./store";
import { Project } from "@/types";

// Define the initial state using that type
const initialState: Project[] = [
  {
    title: "FusionFLOW",
    description: "A dynamic social connectivity and productivity web app with real-time chat, video calling, email messaging, location tracking, and expense management.",
    technologies: [
      { name: "ReactJS" },
      { name: "Node.js" },
      { name: "MongoDB" },
      { name: "WebRTC" },
      { name: "WebSocket" }
    ],
    link: "/projects/fusionflow",
  },
  {
    title: "HireHub",
    description: "A labor hiring platform where recruiters post jobs, and laborers apply and get hired. Features secure authentication and admin monitoring.",
    technologies: [
      { name: "Next.js" },
      { name: "Prisma ORM" },
      { name: "MySQL" },
      { name: "Tailwind CSS" }
    ],
    link: "/projects/hirehub",
  },
  {
    title: "Rakshak",
    description: "A disaster management web app for real-time disaster tracking, emergency alerts, and resource coordination.",
    technologies: [
      { name: "React" },
      { name: "Node.js" },
      { name: "MongoDB" },
      { name: "Leaflet.js" }
    ],
    link: "/projects/rakshak",
  },
  {
    title: "NutriTrack",
    description: "An AI-powered mobile app that generates diet plans, tracks meals and water intake, and monitors health progress.",
    technologies: [
      { name: "Kotlin" },
      { name: "AI/ML" },
      { name: "Firebase" }
    ],
    link: "/projects/nutritrack",
  },
  {
    title: "Saarthi",
    description: "A communication assistant for disabled individuals that converts sign language to text using AI.",
    technologies: [
      { name: "Python" },
      { name: "TensorFlow" },
      { name: "OpenCV" }
    ],
    link: "/projects/saarthi",
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
