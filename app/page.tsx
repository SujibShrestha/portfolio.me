import HeroSection from "@/components/HeroSection";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/ui/Projects";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <About />
      <Skills />
      <Projects />
    </main>
  );
}
