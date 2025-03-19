import { Schema } from "mongoose";

// Profile Data Schema
const ProfileSchema = new Schema({
  name: { type: String, required: true },
  githubUsername: { type: String, required: true },
  linkedinUsername: { type: String, required: true },
  email: { type: String, required: true },
  designation: { type: String, required: true },
  about: { type: String, required: true },
  profileImage: { type: String, required: true }
});

// Experience Schema
const ExperienceSchema = new Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  highlights: [{ type: String }]
});

// Project Schema
const ProjectSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, default: null },
  technologies: [{ type: String }],
  link: { type: String, required: true }
});

// Skills Schema
const SkillSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true }
});

// Main user input Schema
export const UserInputSchema = new Schema({
  profileData: { type: ProfileSchema, required: true },
  experience: { type: [ExperienceSchema], required: true },
  projects: { type: [ProjectSchema], required: true },
  skills: { type: [SkillSchema], required: true }
});
