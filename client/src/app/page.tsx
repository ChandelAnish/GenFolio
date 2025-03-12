import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import SkillsAndTechnologies from "@/components/SkillsAndTechnologies";

export default function Home() {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-t from-cyan-600/30 to-black">
        <Hero />
        <Experience />
        <Projects/>
        <SkillsAndTechnologies/>
        <Footer/>
      </div>
    </>
  );
}
