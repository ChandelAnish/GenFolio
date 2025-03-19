import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    introduction: {
      name: "Anish Singh Chandel",
      designation: "Full-Stack Developer",
      about:
        "Versatile full-stack developer skilled in frontend, backend, databases, and deployment.",
      profileImage: "/anishIMG.jpg",
    },
    experiences: [
      {
        id: 1,
        company: "Englience AI Labs",
        role: "Full Stack Engineer (AI - Intern)",
        duration: "Sep 2024 - Dec 2024",
        description:
          "Working on AI-driven course generation and activity creation systems.",
        highlights: [
          "Refactored codebase using SOLID principles",
          "Integrated knowledge base for custom document uploads",
          "Developed AI agent for generating 6 types of activities",
          "Enhanced system scalability and integration",
        ],
      },
    ],
    projects: [
      {
        title: "NeXCollab",
        description:
          "Real-Time Code Collaboration Platform built during a 36-hour hackathon. Led frontend development with a focus...",
        technologies: [
          { name: "ReactJS" },
          { name: "ExpressJS" },
          { name: "PeerJS" },
          { name: "Socket.io" },
        ],
        link: "/projects/nexcollab",
      },
      {
        title: "Zeph - AI Quiz Companion",
        description:
          "Advanced AI-powered quiz platform supporting multiple-choice, true/false, and short answer questions. Features...",
        technologies: [
          { name: "NextJS" },
          { name: "Node.js" },
          { name: "OpenAI" },
          { name: "Document Processing" },
        ],
        link: "/projects/zeph",
      },
      {
        title: "Sphere",
        description:
          "Feature-rich chat platform built with MERN stack, featuring group chat functionality and advanced security measures.",
        technologies: [
          { name: "MongoDB" },
          { name: "Express" },
          { name: "React" },
          { name: "Node.js" },
          { name: "Socket.io" },
          { name: "Material UI" },
        ],
        link: "/projects/sphere",
      },
    ],
    toolsAndTechnologies: [
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

    ],
    connect: {
      msg1: "Available for freelance work, innovative projects, and exciting internship opportunities. Let's create something amazing together—get in touch!",
      github: "https://github.com/ChandelAnish",
      linkedin: "https://www.linkedin.com/in/as-chandel",
      mail: "anish8427singh#gmail.com",
      msg2: "Let's innovate together—available for new ventures!",
    },
  });
}
