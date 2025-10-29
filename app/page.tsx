"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/sections/Header/Header";
import Hero from "@/components/sections/Hero/Hero";
import { About } from "@/components/sections/About/About";
import { Skills } from "@/components/sections/Skills/Skills";
import Projects from "@/components/sections/Projects/Projects";
import { Contact } from "@/components/sections/Contact/Contact";
import { Footer } from "@/components/sections/Footer/Footer";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Observer para detectar seção ativa no scroll
  useEffect(() => {
    const sections = ["hero", "about", "skills", "projects", "contact"];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      // Scroll suave considerando o header sticky
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleExploreClick = () => {
    handleNavClick("about");
  };

  return (
    <>
      <Header activeSection={activeSection} onNavClick={handleNavClick} />
      <Hero onExploreClick={handleExploreClick} />
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
