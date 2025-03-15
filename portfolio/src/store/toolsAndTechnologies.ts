import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { ToolTechnology } from "@/types";

// Define the initial state using that type
const initialState: ToolTechnology[] = [
  { name: "JavaScript", icon: "/icons/javascript.svg" },
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "ReactJS", icon: "/icons/react.svg" },
  { name: "NextJS", icon: "/icons/nextjs.svg" },
  { name: "Redux", icon: "/icons/redux.svg" },
  { name: "NodeJS", icon: "/icons/nodejs.svg" },
  { name: "ExpressJS", icon: "/icons/express.svg" },
  { name: "Python", icon: "/icons/python.svg" },
  { name: "Firebase", icon: "/icons/firebase.svg" },
  { name: "MySQL", icon: "/icons/mysql.svg" },
  { name: "MongoDB", icon: "/icons/mongodb.svg" },
  { name: "GraphQL", icon: "/icons/graphql.svg" },
];

export const toolsAndTechnologiesSlice = createSlice({
  name: "toolsAndTechnologies",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    fillToolsAndTechnologiesDetails: (state, action: PayloadAction<ToolTechnology[]>) => {
      return action.payload;
    },
  },
});

export const { fillToolsAndTechnologiesDetails } = toolsAndTechnologiesSlice.actions

export default toolsAndTechnologiesSlice.reducer;
