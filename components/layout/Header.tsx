"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";

import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["hero", "about", "skills", "projects", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-blue-500/10 py-2 lg:py-3 border-b border-slate-800/50"
          : "bg-transparent py-4 lg:py-6"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo OTIMIZADA - SEM PARTÍCULAS E AUMENTADA */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center space-x-3 lg:space-x-4 group relative"
          >
            <div className="relative">
              {/* Container da logo aumentado */}
              <div className="h-14 w-14 lg:h-22 lg:w-22 rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                <Image
                  src="/images/hashblue.svg"
                  alt="Erick Reis Logo"
                  width={56}
                  height={56}
                  className="h-12 w-12 lg:h-20 lg:w-20 object-contain filter brightness-125 group-hover:brightness-150 transition-all duration-500"
                  priority
                />
              </div>

              {/* Efeito de brilho sutil no hover - mantido mas mais discreto */}
              <div className="absolute inset-0 rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-cyan-400/3 rounded-xl lg:rounded-2xl" />
              </div>
            </div>

            {/* Texto ajustado para acompanhar o aumento da logo */}
            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-heading font-bold text-white group-hover:text-blue-300 transition-colors duration-300 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Érick Reis
              </span>
              <span className="text-xs lg:text-sm font-mono text-slate-400 group-hover:text-slate-300 transition-colors duration-300 tracking-widest hidden sm:block">
                FULLSTACK DEV
              </span>
            </div>
          </button>

          {/* Desktop Navigation - apenas lg+ */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const sectionName = item.href.replace("#", "");
              const isActive = activeSection === sectionName;

              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(sectionName)}
                  className={`relative px-4 py-2 text-sm font-mono font-medium tracking-widest transition-all duration-300 group/nav-link ${
                    isActive
                      ? "text-blue-400"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {item.name.toUpperCase()}

                  {isActive && (
                    <div className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse" />
                  )}

                  <div className="absolute inset-0 bg-blue-500/0 rounded-lg group-hover/nav-link:bg-blue-500/5 transition-all duration-300 -z-10 border border-transparent group-hover/nav-link:border-blue-500/20" />
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions - apenas lg+ */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              asChild
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-mono font-bold text-sm px-6 py-2.5 rounded-xl shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:scale-105 border-0 overflow-hidden tracking-widest"
            >
              <a href="/docs/curriculo-erick-reis.pdf" download>
                <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10">DOWNLOAD CV</span>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button - MELHORADO */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Botão Download CV mobile compacto */}
            <Button
              asChild
              size="sm"
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-mono font-bold text-xs px-3 py-2 rounded-lg shadow-xl hover:shadow-blue-500/30 transition-all duration-500 hover:scale-105 border-0 overflow-hidden tracking-widest mr-2"
            >
              <a href="/docs/curriculo-erick-reis.pdf" download>
                <Download className="h-3 w-3 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </Button>

            {/* Botão Menu */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="h-10 w-10 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 group"
            >
              {isOpen ? (
                <X className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <Menu className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown - MELHORADO */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-900/98 backdrop-blur-xl border-t border-slate-800/50 shadow-2xl shadow-blue-500/20 animate-in slide-in-from-top-2 duration-300">
            <nav className="flex flex-col p-4 max-h-[80vh] overflow-y-auto">
              {navItems.map((item) => {
                const sectionName = item.href.replace("#", "");
                const isActive = activeSection === sectionName;

                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(sectionName)}
                    className={`flex items-center px-4 py-3 text-base font-mono font-medium tracking-widest rounded-lg transition-all duration-200 group/mobile-link relative overflow-hidden my-1 ${
                      isActive
                        ? "bg-blue-500/15 text-blue-400 border-l-4 border-blue-400"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    <span className="flex-1 text-left">
                      {item.name.toUpperCase()}
                    </span>

                    {isActive && (
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse ml-2" />
                    )}
                  </button>
                );
              })}

              {/* Botão Download no mobile menu */}
              <div className="pt-4 mt-2 border-t border-slate-800/50">
                <Button
                  asChild
                  className="w-full group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-mono font-bold text-sm py-3.5 rounded-xl shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:scale-105 border-0 overflow-hidden tracking-widest"
                  onClick={() => setIsOpen(false)}
                >
                  <a href="/docs/curriculo-erick-reis.pdf" download>
                    <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="relative z-10">DOWNLOAD CV COMPLETO</span>
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
