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
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - MAIOR E SEM BORDA */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="h-16 w-16 rounded-full flex items-center justify-center group-hover:bg-primary-default/5 transition-all duration-300 overflow-hidden">
              <Image
                src="/images/hashblue.svg"
                alt="HashBlue Logo"
                width={64}
                height={64}
                className="h-14 w-14 object-contain group-hover:scale-110 transition-transform duration-300"
                priority
              />
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-heading font-semibold text-gray-900 dark:text-white group-hover:text-primary-default transition-colors duration-300">
                Erick Reis
              </span>
              <span className="text-sm font-sans text-gray-500 dark:text-gray-400">
                Full Stack Developer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - CORES CORRETAS NO LIGHT MODE */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navItems.map((item) => {
              const sectionName = item.href.replace("#", "");
              const isActive = activeSection === sectionName;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 py-2 text-base font-heading font-light tracking-wide transition-all duration-300 group/nav-link ${
                    isActive
                      ? "text-primary-default"
                      : "text-gray-700 hover:text-primary-default dark:text-gray-300 dark:hover:text-primary-default"
                  }`}
                >
                  {item.name}

                  {/* Indicador ativo */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-3 right-3 h-0.5 bg-primary-default rounded-full" />
                  )}

                  {/* Efeito hover sutil - background */}
                  <div className="absolute inset-0 bg-primary-default/0 rounded-lg group-hover/nav-link:bg-primary-default/5 transition-all duration-300 -z-10" />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions - TEXTO PRETO NO LIGHT MODE COM REFLEXO AZUL */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <Button
              asChild
              className="bg-primary-default hover:bg-primary-default/90 text-black dark:text-white font-heading font-medium px-6 py-2.5 rounded-lg transition-all duration-300 hover:scale-105 relative overflow-hidden group border-2 border-primary-default/20"
            >
              <Link href="#contact">
                <span className="relative z-10">Download CV</span>

                {/* Efeito de reflexo AZUL no light mode, branco no dark */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 dark:via-white/20" />
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
              className="h-10 w-10 rounded-lg text-gray-600 hover:text-primary-default dark:text-gray-400 dark:hover:text-primary-default hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown - CORES CORRETAS NO LIGHT MODE */}
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
                    className={`flex items-center px-4 py-4 text-base font-heading font-light tracking-wide rounded-lg transition-all duration-200 group/mobile-link ${
                      isActive
                        ? "bg-primary-default/10 text-primary-default border-l-2 border-primary-default"
                        : "text-gray-700 hover:text-primary-default dark:text-gray-300 dark:hover:text-primary-default"
                    }`}
                  >
                    {item.name}

                    {/* Efeito hover sutil no mobile */}
                    <div
                      className={`absolute inset-0 bg-primary-default/0 rounded-lg group-hover/mobile-link:bg-primary-default/5 transition-all duration-300 -z-10 ${
                        isActive ? "bg-primary-default/10" : ""
                      }`}
                    />
                  </Link>
                );
              })}

              {/* CTA Mobile - TEXTO PRETO NO LIGHT MODE COM BORDA */}
              <div className="pt-4 mt-2 border-t border-gray-200 dark:border-gray-700">
                <Button
                  asChild
                  className="w-full bg-primary-default hover:bg-primary-default/90 text-black dark:text-white font-heading font-medium py-3 rounded-lg transition-all duration-300 hover:scale-105 border-2 border-primary-default/20 relative overflow-hidden group"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="#contact">
                    <span className="relative z-10">Download CV</span>

                    {/* Efeito de reflexo AZUL no light mode, branco no dark */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 dark:via-white/20" />
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
