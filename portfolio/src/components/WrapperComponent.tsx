"use client"

import { useAppSelector } from "@/store/hooks";
// import ThemeSelector from "./ThemeSelector";
import Hero from "./Hero";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Footer from "./Footer";
import ToolsAndTechnologies from "./ToolsAndTechnologies";


// const bodyTheme = {
//   backgroundGradientFrom: "from-cyan-600/30",
//   backgroundGradientTo: "to-black",
// };

export default function PortfolioWrapper() {

  const bodyTheme = useAppSelector(store => store.theme.bodyTheme)

  return (
    <>
      <div 
        className={`w-full min-h-screen flex flex-col justify-center bg-gradient-to-t ${bodyTheme.backgroundGradientFrom} ${bodyTheme.backgroundGradientTo}`}
      >
        <Hero />
        <Experiences />
        <Projects/>
        <ToolsAndTechnologies />
        <Footer/>
      </div>
    </>
  );
}
