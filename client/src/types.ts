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
  stargazers_count: number;
  topics: string[] | [];
  updated_at: string;
  fork: boolean;
}

export interface Project {
  title: string;
  description: string | null;
  technologies: string[] | [];
  link: string;
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

