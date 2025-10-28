// app/page.tsx
import { HeroSection } from "@/components/sections/HeroSection/HeroSection";
import { About } from "@/components/sections/About/About";
import { Skills } from "@/components/sections/Skills/Skills";
import { Projects } from "@/components/sections/Projects/Projects";
import { Contact } from "@/components/sections/Contact/Contact";
import { Footer } from "@/components/layout/Footer/Footer";

export default function HomePage() {
  return (
    <>
      {/* ⭐ AGORA HEADER E HERO SÃO UM COMPONENTE ÚNICO ⭐ */}
      <HeroSection />

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
