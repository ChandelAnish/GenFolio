// store/slices/resumeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PersonalInfo {
  fullname: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

interface Education {
  university: string;
  college: string;
  program: string;
  graduation: string;
  grade: string;
}

interface SkillCategory {
  category: string;
  skills: string[];
}

interface Experience {
  company: string;
  location: string;
  position: string;
  duration: string;
  link?: string;
  responsibilities: string[];
}

interface Project {
  title: string;
  duration: string;
  link?: string;
  sourceCode?: string;
  highlights: string[];
}

interface Accomplishment {
  title: string;
  link?: string;
  description: string;
}

interface PositionOfResponsibility {
  title: string;
  duration: string;
  description: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education;
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  accomplishments: Accomplishment[];
  positionsOfResponsibility: PositionOfResponsibility[];
}

interface ResumeState {
  data: ResumeData;
  selectedTheme: string;
  isEditing: boolean;
  fontStyle: string;
}

const initialState: ResumeState = {
  data: {
    personalInfo: {
      fullname: "Aman Singh Chandel",
      email: "chandel.s.aman@gmail.com",
      phone: "(+91) 9572464477",
      linkedin: "linkedin.com/in/chandel-aman",
      github: "github.com/chandel-aman",
    },
    education: {
      university: "Maulana Abul Kalam Azad University of Technology, West Bengal, India",
      college: "Institute of Engineering and Management, Kolkata",
      program: "B.Tech., Computer Science and Engineering with specialization in Internet of Things",
      graduation: "May 2025",
      grade: "9.36 CGPA",
    },
    skills: [
      {
        category: "Frontend",
        skills: [
          "ReactJS",
          "NextJS",
          "Redux",
          "Redux Saga",
          "Context API",
          "Tailwind",
          "CSS",
          "Bootstrap",
          "Material-UI",
          "Jest",
        ],
      },
      {
        category: "Backend",
        skills: [
          "NodeJS",
          "ExpressJS",
          "GraphQL",
          "WebSocket",
          "JWT",
          "RESTful API",
          "OAuth",
          "Vitest",
        ],
      },
      {
        category: "Database",
        skills: ["MongoDB", "Firebase", "PostgreSQL", "AWS", "MySQL", "ORM"],
      },
      {
        category: "Programming",
        skills: [
          "JavaScript",
          "TypeScript",
          "C",
          "C++(Data structures & algorithms)",
        ],
      },
      {
        category: "DevOps & Deployment",
        skills: [
          "Docker",
          "GitHub Actions",
          "EC2",
          "S3",
          "Google Cloud Platform",
          "Azure",
        ],
      },
      {
        category: "Tools",
        skills: [
          "Git/GitHub",
          "Firebase",
          "Postman",
          "VSCode",
          "MongoDB Compass",
          "DeepAR Studio",
        ],
      },
    ],
    experience: [
      {
        company: "Stock Register",
        location: "Remote",
        position: "Web Front-End Development Intern",
        duration: "Feb 2024 - present",
        link: "https://drive.google.com/file/d/1dRGrkMvpMqQpLzFZuR8s4y1Yz2kyYJCP/view?usp=sharing",
        responsibilities: [
          "Translated Figma designs into React components for over 10 pages, ensuring pixel-perfect printability.",
          "Modularized existing code, reducing code lines by 35% through the creation of reusable components.",
          "Utilized React Query and Redux for state management, implementing data caching strategies.",
        ],
      },
      {
        company: "VisualFlow Agency",
        location: "Remote",
        position: "Full Stack Development Intern",
        duration: "July 2023 - Dec 2023",
        responsibilities: [
          "Designed a robust notification architecture on NodeJS for a school web site, serving 5 different roles.",
          "Strengthened security measures by implementing 2-factor authentication across multiple roles using Redux.",
          "Enhanced 2 web applications by crafting efficient REST APIs and controllers, reducing response times by 25% and boosting performance.",
          "Employed Three.JS, DeepAR, and MindAR to enable 3D model rendering and AR integration across 4 diverse categories, including jewellery and sunglasses.",
        ],
      },
    ],
    projects: [
      {
        title: "Real-Time Code Collaboration Platform - NeXCollab",
        duration: "Feb 2023",
        link: "https://nexcollab.vercel.app/",
        sourceCode: "https://github.com/chandel-aman/NeXCollab.git",
        highlights: [
          "Led a 3-member team in spearheading frontend development with ReactJS, during a 36-hour hackathon.",
          "Implemented secure authentication using tokens, achieving a 98% in enhancing access control.",
          "Leveraged PeerJS library to integrate chat and video features, facilitating seamless communication.",
        ],
      },
      {
        title: "Chat Application",
        duration: "June 2023",
        link: "https://chat-application-chandel-aman.vercel.app/login",
        sourceCode: "https://github.com/chandel-aman/Chat-Application.git",
        highlights: [
          "Developed a real-time chat application with group chat functionality using MERN stack, Socket.io, Material UI, and JWT tokens.",
          "Leveraged Context APIs and custom hooks for efficient data management and sharing.",
          "Integrated 2-factor authentication using TOTP and seamless sharing of images, videos, and files.",
        ],
      },
    ],
    accomplishments: [
      {
        title: "GFG Solving For India Hackathon",
        link: "https://drive.google.com/file/d/18W4ZQuc7soWA_YVrFve7nAXlUw2cDOVw/view?usp=sharing",
        description: "(Among top 50). Built a web3-based marketplace direct from farmers to consumers with supply-chain management.",
      },
      {
        title: "E-summit'23: NIT Bhopal",
        link: "https://drive.google.com/file/d/1q6T2FwvkGGlFuAez77MWzuA9p1z2mu93/view?usp=sharing",
        description: "(10/63 Teams). Built a real-time code collaboration platform within 36 hours.",
      },
    ],
    positionsOfResponsibility: [
      {
        title: "Google Developer's Student Club (Web Dev Core Member)",
        duration: "July 2022 - 2023",
        description: "Evangelizing Google's top technologies and empowering the student community of 1500+ students.",
      },
    ],
  },
  selectedTheme: 'default',
  isEditing: false,
  fontStyle: "default"
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    updatePersonalInfo: (state, action: PayloadAction<Partial<PersonalInfo>>) => {
      state.data.personalInfo = { ...state.data.personalInfo, ...action.payload };
    },
    updateEducation: (state, action: PayloadAction<Partial<Education>>) => {
      state.data.education = { ...state.data.education, ...action.payload };
    },
    updateSkill: (state, action: PayloadAction<{ index: number; data: Partial<SkillCategory> }>) => {
      const { index, data } = action.payload;
      state.data.skills[index] = { ...state.data.skills[index], ...data };
    },
    addSkill: (state, action: PayloadAction<SkillCategory>) => {
      state.data.skills.push(action.payload);
    },
    removeSkill: (state, action: PayloadAction<number>) => {
      state.data.skills.splice(action.payload, 1);
    },
    updateExperience: (state, action: PayloadAction<{ index: number; data: Partial<Experience> }>) => {
      const { index, data } = action.payload;
      state.data.experience[index] = { ...state.data.experience[index], ...data };
    },
    addExperience: (state, action: PayloadAction<Experience>) => {
      state.data.experience.push(action.payload);
    },
    removeExperience: (state, action: PayloadAction<number>) => {
      state.data.experience.splice(action.payload, 1);
    },
    updateProject: (state, action: PayloadAction<{ index: number; data: Partial<Project> }>) => {
      const { index, data } = action.payload;
      state.data.projects[index] = { ...state.data.projects[index], ...data };
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.data.projects.push(action.payload);
    },
    removeProject: (state, action: PayloadAction<number>) => {
      state.data.projects.splice(action.payload, 1);
    },
    updateAccomplishment: (state, action: PayloadAction<{ index: number; data: Partial<Accomplishment> }>) => {
      const { index, data } = action.payload;
      state.data.accomplishments[index] = { ...state.data.accomplishments[index], ...data };
    },
    addAccomplishment: (state, action: PayloadAction<Accomplishment>) => {
      state.data.accomplishments.push(action.payload);
    },
    removeAccomplishment: (state, action: PayloadAction<number>) => {
      state.data.accomplishments.splice(action.payload, 1);
    },
    updatePositionOfResponsibility: (state, action: PayloadAction<{ index: number; data: Partial<PositionOfResponsibility> }>) => {
      const { index, data } = action.payload;
      state.data.positionsOfResponsibility[index] = { ...state.data.positionsOfResponsibility[index], ...data };
    },
    addPositionOfResponsibility: (state, action: PayloadAction<PositionOfResponsibility>) => {
      state.data.positionsOfResponsibility.push(action.payload);
    },
    removePositionOfResponsibility: (state, action: PayloadAction<number>) => {
      state.data.positionsOfResponsibility.splice(action.payload, 1);
    },
    setSelectedTheme: (state, action: PayloadAction<string>) => {
      state.selectedTheme = action.payload;
    },
    setFontStyle: (state, action: PayloadAction<string>) => {
      state.fontStyle = action.payload;
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    setResumeData: (state, action: PayloadAction<ResumeData>) => {
      state.data = action.payload;
    }
  }
});

export const {
  updatePersonalInfo,
  updateEducation,
  updateSkill,
  addSkill,
  removeSkill,
  updateExperience,
  addExperience,
  removeExperience,
  updateProject,
  addProject,
  removeProject,
  updateAccomplishment,
  addAccomplishment,
  removeAccomplishment,
  updatePositionOfResponsibility,
  addPositionOfResponsibility,
  removePositionOfResponsibility,
  setSelectedTheme,
  setFontStyle,
  setIsEditing,
  setResumeData
} = resumeSlice.actions;

export default resumeSlice.reducer;