export interface Introduction {
  name: string;
  designation: string;
  about: string;
  profileImage: string;
  resume?:string,
  visitorCount?:number;
  resumeUrl?: string
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


// Theme 
export interface Theme {
  bodyTheme:{
    backgroundGradientFrom: string,
    backgroundGradientTo: string,
  },
  heroTheme: {
    sectionBackground: string;
    overlayGradientStart: string;
    overlayGradientEnd: string;
    accentColor: string;
    accentButtonHover: string;
    accentBackground: string;
    accentHover: string;
    accentTextHover: string;
    heading: string;
    subheading: string;
    navLink: string;
    bodyText: string;
    iconBackground: string;
    buttonText: string;
    hoverButtonText: string;
  };
  experiencesTheme: {
    headingGradientStart: string;
    headingGradientEnd: string;
    timelineBackground: string;
    timelineProgressStart: string;
    timelineProgressEnd: string;
  };
  experienceCardTheme: {
    timelineDotColor: string;
    timelineDotOuterColor: string;
    cardBgGradient: string;
    companyTextColor: string;
    roleTextColor: string;
    durationTextColor: string;
    descriptionTextColor: string;
    highlightBgColor: string;
    highlightTextColor: string;
  };
  projectTheme: {
    headingGradient: string;
    subtextColor: string;
  };
  projectCardTheme: {
    containerGradient: string;
    borderColor: string;
    titleColor: string;
    linkColor: string;
    linkHoverColor: string;
    descriptionColor: string;
    techBackground: string;
    techTextColor: string;
  };
  toolsAndTechnologiesTheme: {
    sectionBg: string;
    headingGradient: string;
    headingText: string;
    chevronColor: string;
  };
  techStackCardTheme: {
    cardBgColor: string;
    iconDefaultColor: string;
    iconUnknownColor: string;
    nameTextColor: string;
  };
  footerTheme: {
    background: string;
    textPrimary: string;
    textSecondary: string;
    iconDefault: string;
    iconHover: string;
    dotColor: string;
    copyrightText: string;
  };
}

export interface ThemeOption {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  previewColors: string[];
  theme: Theme;
}