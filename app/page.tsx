import HeroSection from "@/components/HeroSection";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <About />
      <Skills />
      <Projects />
      <Experience />
    </main>
  );
}
