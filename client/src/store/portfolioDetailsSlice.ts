import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Experience, ProfileData, Project } from "@/types";

export interface PortfolioDetails {
  profileData: ProfileData;
  experience: Experience[];
  projects: Project[];
}

// Define the initial state using that type
const initialState: PortfolioDetails = {
  profileData: {
    name: "",
    githubUsername: "",
    linkedinUsername: "",
    email: "",
    designation: "",
    about: "",
    profileImage: null,
  },

  experience: [
    {
      company: "",
      role: "",
      duration: "",
      description: "",
      highlights: [""],
    },
  ],

  projects: [
    {
      title: "",
      description: "",
      technologies: [],
      link: "",
    },
  ],
};

export const portfolioDetailsSlice = createSlice({
  name: "portfolioDetails",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    fillprofileDetails: (state, action: PayloadAction<ProfileData>) => {
      return { ...state, profileData: action.payload };
    },
    fillExperiences: (state, action: PayloadAction<Experience[]>) => {
      return { ...state, experience: action.payload };
    },
    fillProjects: (state, action: PayloadAction<Project[]>) => {
      return { ...state, projects: action.payload };
    },
  },
});

export const { fillprofileDetails, fillExperiences, fillProjects } =
  portfolioDetailsSlice.actions;

export default portfolioDetailsSlice.reducer;
