import Experiences from "@/components/Experiences";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import ToolsAndTechnologies from "@/components/ToolsAndTechnologies";

export default function Portfolio() {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-t from-cyan-600/30 to-black">
        <Hero />
        <Experiences />
        <Projects/>
        <ToolsAndTechnologies/>
        <Footer/>
      </div>
    </>
  );
}
