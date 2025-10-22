"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/layout/ThemeToggle";

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
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo SEM BORDA - apenas a imagem limpa */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Container da logo - SEM BORDA */}
              <div className="h-14 w-14 rounded-full flex items-center justify-center group-hover:shadow-blue-500/30 transition-all duration-300 overflow-hidden">
                <Image
                  src="/images/hashblue.svg"
                  alt="HashBlue Logo"
                  width={56}
                  height={56}
                  className="h-12 w-12 object-contain group-hover:scale-110 transition-transform duration-300"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors duration-300">
                Erick Reis
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Full Stack Developer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => {
              const sectionName = item.href.replace("#", "");
              const isActive = activeSection === sectionName;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-1 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-blue-500 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                  }`}
                >
                  {item.name}

                  {/* Indicador ativo azul sólido */}
                  {isActive && (
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                  )}

                  {/* Efeito hover azul */}
                  <div
                    className={`absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-500 rounded-full transition-all duration-300 ${
                      isActive ? "scale-100" : "scale-0 group-hover:scale-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions - Botão azul com reflexo */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <Button
              asChild
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <Link href="#contact">
                <span className="relative z-10">Download CV</span>

                {/* Efeito de reflexo no hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-3">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="h-10 w-10 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-lg">
            <nav className="flex flex-col p-4">
              {navItems.map((item) => {
                const sectionName = item.href.replace("#", "");
                const isActive = activeSection === sectionName;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-l-2 border-blue-500"
                        : "text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* CTA Mobile com efeito de reflexo */}
              <div className="pt-4 mt-2 border-t border-gray-200 dark:border-gray-700">
                <Button
                  asChild
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg relative overflow-hidden group"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="#contact">
                    <span className="relative z-10">Download CV</span>

                    {/* Efeito de reflexo no hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
