"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Download, Moon, Sun } from "lucide-react";

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
  const [isDark, setIsDark] = useState(true);

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

  const toggleTheme = () => {
    setIsDark(!isDark);
    // Aqui você integraria com seu sistema de tema
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-blue-500/10 py-3 border-b border-slate-800/50"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - MAIOR E SEM BORDA */}
          <Link
            href="#hero"
            className="flex items-center space-x-4 group relative"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("hero")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="relative">
              {/* Container da logo sem borda */}
              <div className="h-20 w-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                <Image
                  src="/images/hashblue.svg"
                  alt="Erick Reis Logo"
                  width={80}
                  height={80}
                  className="h-18 w-18 object-contain filter"
                  priority
                />
              </div>

              {/* Efeito de brilho pulsante - mantido mas sem blur */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/10 rounded-2xl opacity-0  transition-opacity duration-500" />

              {/* Partículas ao redor da logo */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 particle delay-200" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 particle delay-500" />
            </div>

            <div className="flex flex-col">
              <span className="text-2xl font-heading font-bold text-white group-hover:text-blue-300 transition-colors duration-300 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Erick Reis
              </span>
              <span className="text-sm font-mono text-slate-400 group-hover:text-slate-300 transition-colors duration-300 tracking-widest">
                FULLSTACK DEV
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const sectionName = item.href.replace("#", "");
              const isActive = activeSection === sectionName;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-mono font-medium tracking-widest transition-all duration-300 group/nav-link ${
                    isActive
                      ? "text-blue-400 neon-pulse"
                      : "text-slate-300 hover:text-white"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(sectionName)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {item.name.toUpperCase()}

                  {/* Indicador ativo animado */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full pulse-glow" />
                  )}

                  {/* Efeito hover com brilho */}
                  <div className="absolute inset-0 bg-blue-500/0 rounded-lg group-hover/nav-link:bg-blue-500/5 transition-all duration-300 -z-10 border border-transparent group-hover/nav-link:border-blue-500/20" />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Toggle Theme - MAIS RELUZENTE */}
            <button
              onClick={toggleTheme}
              className="relative h-12 w-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 group/toggle hover:scale-110 pulse-glow"
            >
              {/* Ícone do sol/lua com mais brilho */}
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-300 group-hover/toggle:text-yellow-200 transition-colors duration-300 filter drop-shadow-[0_0_10px_rgba(255,255,0,0.5)]" />
              ) : (
                <Moon className="h-5 w-5 text-blue-300 group-hover/toggle:text-blue-200 transition-colors duration-300 filter drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              )}

              {/* Efeito de brilho interno */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent rounded-xl opacity-0 group-hover/toggle:opacity-100 transition-opacity duration-300" />

              {/* Partículas de brilho */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover/toggle:opacity-100 transition-opacity duration-500 animate-pulse" />
              <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover/toggle:opacity-100 transition-opacity duration-500 animate-pulse delay-200" />
            </button>

            <Button
              asChild
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-mono font-bold text-sm px-6 py-2.5 rounded-xl shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:scale-105 border-0 pulse-glow overflow-hidden tracking-widest"
            >
              <a href="/docs/curriculo-erick-reis.pdf" download>
                <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10">DOWNLOAD CV</span>

                {/* Efeito de reflexo */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Toggle Theme Mobile - MAIS RELUZENTE */}
            <button
              onClick={toggleTheme}
              className="relative h-12 w-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 group/toggle hover:scale-110 pulse-glow"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-300 group-hover/toggle:text-yellow-200 transition-colors duration-300 filter drop-shadow-[0_0_10px_rgba(255,255,0,0.5)]" />
              ) : (
                <Moon className="h-5 w-5 text-blue-300 group-hover/toggle:text-blue-200 transition-colors duration-300 filter drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              )}

              {/* Efeito de brilho interno */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent rounded-xl opacity-0 group-hover/toggle:opacity-100 transition-opacity duration-300" />
            </button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="h-12 w-12 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 group"
            >
              {isOpen ? (
                <X className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <Menu className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              )}

              <div className="absolute inset-0 bg-blue-500/0 rounded-xl group-hover:bg-blue-500/10 transition-all duration-300 -z-10" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/50 shadow-2xl shadow-blue-500/20">
            <nav className="flex flex-col p-4">
              {navItems.map((item) => {
                const sectionName = item.href.replace("#", "");
                const isActive = activeSection === sectionName;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      document
                        .getElementById(sectionName)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`flex items-center px-4 py-4 text-sm font-mono font-medium tracking-widest rounded-lg transition-all duration-200 group/mobile-link relative overflow-hidden ${
                      isActive
                        ? "bg-blue-500/10 text-blue-400 border-l-2 border-blue-400 neon-pulse"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {item.name.toUpperCase()}

                    <div
                      className={`absolute inset-0 bg-blue-500/0 rounded-lg group-hover/mobile-link:bg-blue-500/10 transition-all duration-300 -z-10 ${
                        isActive ? "bg-blue-500/10" : ""
                      }`}
                    />
                  </Link>
                );
              })}

              {/* CTA Mobile */}
              <div className="pt-4 mt-2 border-t border-slate-800/50">
                <Button
                  asChild
                  className="w-full group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-mono font-bold text-sm py-4 rounded-xl shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:scale-105 border-0 pulse-glow overflow-hidden tracking-widest"
                  onClick={() => setIsOpen(false)}
                >
                  <a href="/docs/curriculo-erick-reis.pdf" download>
                    <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="relative z-10">DOWNLOAD CV</span>

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl" />
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
