import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Experience, ProfileData, Project, Skill } from "@/types";

export interface PortfolioDetails {
  profileData: ProfileData;
  experience: Experience[];
  projects: Project[];
  skills: Skill[]
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
      id:-1,
      title: "",
      description: "",
      technologies: [],
      link: "",
    },
  ],

  skills: []
};

export const portfolioDetailsSlice = createSlice({
  name: "portfolioDetails",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    fillInitialProfileDetails: (state, action: PayloadAction<PortfolioDetails>) => {
      return action.payload;
    },
    fillprofileDetails: (state, action: PayloadAction<ProfileData>) => {
      sessionStorage.setItem("portfolioDetails", JSON.stringify({ ...state, profileData: action.payload }))
      return { ...state, profileData: action.payload };
    },
    fillExperiences: (state, action: PayloadAction<Experience[]>) => {
      sessionStorage.setItem("portfolioDetails", JSON.stringify({ ...state, experience: action.payload }))
      return { ...state, experience: action.payload };
    },
    fillProjects: (state, action: PayloadAction<Project[]>) => {
      sessionStorage.setItem("portfolioDetails", JSON.stringify({ ...state, projects: action.payload }))
      return { ...state, projects: action.payload };
    },
    fillSkills: (state, action: PayloadAction<Skill[]>) => {
      sessionStorage.setItem("portfolioDetails", JSON.stringify({ ...state, skills: action.payload }))
      return { ...state, skills: action.payload };
    },
  },
});

export const { fillInitialProfileDetails, fillprofileDetails, fillExperiences, fillProjects, fillSkills } =
  portfolioDetailsSlice.actions;

export default portfolioDetailsSlice.reducer;
