export interface Introduction {
  name: string;
  designation: string;
  about: string;
  profileImage: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
  highlights: string[];
}

export interface Technology {
  name: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: Technology[];
  link: string;
}

export interface ToolTechnology {
  name: string;
  icon: string;
}

export interface Connect {
  msg1: string;
  github: string;
  linkedin: string;
  mail: string;
  msg2: string;
}

export interface PortfolioData {
  introduction: Introduction;
  experiences: Experience[];
  projects: Project[];
  toolsAndTechnologies: ToolTechnology[];
  connect: Connect;
}
