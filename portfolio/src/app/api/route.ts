import { NextResponse } from "next/server";

const portfolioData = {
  introduction: {
    name: "Anish Singh Chandel",
    designation: "Full-Stack Developer | AI Enthusiast",
    about:
      "Versatile full-stack developer proficient in frontend, backend, databases, and AI-driven solutions. Passionate about building scalable applications and innovative tech solutions.",
    profileImage: "/anishIMG.jpg",
  },
  experiences: [
    {
      id: 1,
      company: "NoTime Startup",
      role: "Full Stack Developer Intern",
      duration: "Oct 2024 - Present",
      description:
        "Building and enhancing the NoTime Ed-tech platform, focusing on authentication, AI-based learning solutions, and cloud deployment.",
      highlights: [
        "Implemented authentication using JWT",
        "Developed interactive learning modules using Next.js and Tailwind CSS",
        "Integrated AWS for scalable cloud solutions",
        "Worked on Payload CMS for content management",
      ],
    },
    {
      id: 2,
      company: "NoTime Startup",
      role: "Full Stack Developer Intern",
      duration: "Oct 2024 - Present",
      description:
        "Building and enhancing the NoTime Ed-tech platform, focusing on authentication, AI-based learning solutions, and cloud deployment.",
      highlights: [
        "Implemented authentication using JWT",
        "Developed interactive learning modules using Next.js and Tailwind CSS",
        "Integrated AWS for scalable cloud solutions",
        "Worked on Payload CMS for content management",
      ],
    },
    {
      id: 3,
      company: "NoTime Startup",
      role: "Full Stack Developer Intern",
      duration: "Oct 2024 - Present",
      description:
        "Building and enhancing the NoTime Ed-tech platform, focusing on authentication, AI-based learning solutions, and cloud deployment.",
      highlights: [
        "Implemented authentication using JWT",
        "Developed interactive learning modules using Next.js and Tailwind CSS",
        "Integrated AWS for scalable cloud solutions",
        "Worked on Payload CMS for content management",
      ],
    },
  ],
  projects: [
    {
      title: "FusionFLOW",
      description: "A dynamic social connectivity and productivity web app with real-time chat, video calling, email messaging, location tracking, and expense management.",
      technologies: [
        { name: "ReactJS" },
        { name: "Node.js" },
        { name: "MongoDB" },
        { name: "WebRTC" },
        { name: "WebSocket" }
      ],
      link: "/projects/fusionflow",
    },
    {
      title: "HireHub",
      description: "A labor hiring platform where recruiters post jobs, and laborers apply and get hired. Features secure authentication and admin monitoring.",
      technologies: [
        { name: "Next.js" },
        { name: "Prisma ORM" },
        { name: "MySQL" },
        { name: "Tailwind CSS" }
      ],
      link: "/projects/hirehub",
    },
    {
      title: "Rakshak",
      description: "A disaster management web app for real-time disaster tracking, emergency alerts, and resource coordination.",
      technologies: [
        { name: "React" },
        { name: "Node.js" },
        { name: "MongoDB" },
        { name: "Leaflet.js" }
      ],
      link: "/projects/rakshak",
    },
    {
      title: "NutriTrack",
      description: "An AI-powered mobile app that generates diet plans, tracks meals and water intake, and monitors health progress.",
      technologies: [
        { name: "Kotlin" },
        { name: "AI/ML" },
        { name: "Firebase" }
      ],
      link: "/projects/nutritrack",
    },
    {
      title: "Saarthi",
      description: "A communication assistant for disabled individuals that converts sign language to text using AI.",
      technologies: [
        { name: "Python" },
        { name: "TensorFlow" },
        { name: "OpenCV" }
      ],
      link: "/projects/saarthi",
    },
  ],
  toolsAndTechnologies: [
    {
      name: "React",
      icon: "FaReact",
    },
    {
      name: "Next.js",
      icon: "SiNextdotjs",
    },
    {
      name: "TypeScript",
      icon: "SiTypescript",
    },
    {
      name: "JavaScript",
      icon: "FaJs",
    },
    {
      name: "HTML",
      icon: "FaHtml5",
    },
    {
      name: "CSS",
      icon: "FaCss3Alt",
    },
    {
      name: "Tailwind CSS",
      icon: "SiTailwindcss",
    },
    {
      name: "Angular",
      icon: "SiAngular",
    },
  ],
  connect: {
    msg1: "Available for freelance work, innovative projects, and internship opportunities. Let's create something groundbreaking together!",
    github: "https://github.com/ChandelAnish",
    linkedin: "https://www.linkedin.com/in/as-chandel",
    mail: "anish8427singh@gmail.com",
    msg2: "Let's collaborate and build the future!",
  },
};

export async function GET() {
  return NextResponse.json(portfolioData);
}
