import Header from "@/components/sections/Header/Header";
import Hero from "@/components/sections/Hero/Hero";
import { About } from "@/components/sections/About/About";
import { Skills } from "@/components/sections/Skills/Skills";
import Projects from "@/components/sections/Projects/Projects";
import { Contact } from "@/components/sections/Contact/Contact";
import { Footer } from "@/components/sections/Footer/Footer";

export default function HomePage() {
  return (
    <>
      {/* Header separado do Hero para facilitar manutenção */}
      <Header />

      {/* Hero apenas com o conteúdo do topo (headline, subtitle, CTAs, backgrounds) */}
      <Hero />

      <main className="min-h-screen">
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
