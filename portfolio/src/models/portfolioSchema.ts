import { Schema } from "mongoose";

const IntroductionSchema = new Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  about: { type: String, required: true },
  profileImage: { type: String, required: true },
  resumeUrl: {type: String}
});

const ExperienceSchema = new Schema({
  id: { type: Number, required: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  highlights: [{ type: String }]
});

const TechnologySchema = new Schema({
  name: { type: String, required: true }
});

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [TechnologySchema], // Array of embedded documents
  link: { type: String, required: true }
});

const ToolTechnologySchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true }
});

const ConnectSchema = new Schema({
  msg1: { type: String, required: true },
  github: { type: String, required: true },
  linkedin: { type: String, required: true },
  mail: { type: String, required: true },
  msg2: { type: String, required: true }
});

export const PortfolioSchema = new Schema({
  introduction: { type: IntroductionSchema, required: true },
  experiences: [ExperienceSchema],
  projects: [ProjectSchema],
  toolsAndTechnologies: [ToolTechnologySchema],
  connect: { type: ConnectSchema, required: true }
});
