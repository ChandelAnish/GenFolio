export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
  highlights: string[] | [];
}

export interface GithubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  topics: string[] | [];
}

export interface Project {
  id: number;
  title: string;
  description: string | null;
  link: string;
  technologies: string[] | [];
}

export interface ProfileData {
  name: string;
  githubUsername: string;
  linkedinUsername: string;
  email: string;
  designation: string;
  about: string;
  profileImage: string | null;
}

export interface Skill {
  id: string;
  name: string;
  category: "frontend" | "backend" | "database" | "devops" | "mobile" | "other";
}