// components/layout/Header/Header.tsx - COMPLETAMENTE TRANSPARENTE
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Download, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

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
      setIsScrolled(window.scrollY > 30);
    };

    const handleActiveSection = () => {
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
    window.addEventListener("scroll", handleActiveSection);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleActiveSection);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      // HEADER COMPLETAMENTE TRANSPARENTE - USA BACKGROUND DO HERO
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full overflow-hidden font-poppins ${
        isScrolled
          ? "h-16 py-3 backdrop-blur-md" // APENAS BLUR SUAVE
          : "h-20 py-4 backdrop-blur-sm"
      }`}
    >
      {/* SEM BACKGROUND PRÓPRIO - USA APENAS O DO HERO */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50 h-full flex items-center">
        <div className="flex items-center justify-between w-full h-full">
          {/* LOGO PURA E ELEGANTE */}
          <motion.button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 bg-transparent border-none cursor-pointer transition-all duration-500 p-2 rounded-lg outline-none group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <motion.div
              className="h-12 w-12 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-500"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Image
                src="/images/hashblue.svg"
                alt="Erick Reis Logo"
                width={48}
                height={48}
                className="h-8 w-8 object-contain brightness-125 transition-all duration-500"
                priority
              />
            </motion.div>
            <div className="flex flex-col items-start">
              <span className="text-lg font-black text-white bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
                ÉRICK REIS
              </span>
              <span className="text-xs font-mono text-cyan-400/80 transition-all duration-300 flex items-center gap-1 mt-0.5 group-hover:text-cyan-300">
                <Crown className="w-3 h-3 text-amber-400" />
                FULLSTACK ENGINEER
              </span>
            </div>
          </motion.button>

          {/* DESKTOP NAVIGATION - TRANSPARENTE */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => {
              const sectionName = item.href.replace("#", "");
              const isActive = activeSection === sectionName;

              return (
                <motion.button
                  key={item.name}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                  onClick={() => scrollToSection(sectionName)}
                  onMouseDown={(e) => e.preventDefault()}
                  className={`relative px-5 py-2.5 text-sm font-mono font-bold tracking-widest transition-all duration-300 rounded-lg cursor-pointer outline-none ${
                    isActive
                      ? "text-white bg-white/10 backdrop-blur-lg" // FUNDO SUTIL
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                  whileHover={{ y: -1, scale: 1.02 }}
                  whileTap={{ y: 0 }}
                >
                  <span className="relative z-10">
                    {item.name.toUpperCase()}
                  </span>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                      layoutId="navIndicator"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* DESKTOP ACTIONS */}
          <motion.div
            className="hidden lg:flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              asChild
              className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl border-0 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 hover:scale-105 relative overflow-hidden group"
              onMouseDown={(e) => e.preventDefault()}
            >
              <a
                href="/docs/curriculo-erick-reis.pdf"
                download
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-bold">DOWNLOAD CV</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </a>
            </Button>
          </motion.div>

          {/* MOBILE MENU BUTTON */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white p-2.5 rounded-xl border-0 shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105"
              onMouseDown={(e) => e.preventDefault()}
            >
              <a href="/docs/curriculo-erick-reis.pdf" download>
                <Download className="w-4 h-4" />
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-xl text-white/80 hover:text-white bg-white/10 backdrop-blur-xl border-0 hover:bg-white/20 transition-all duration-300 hover:scale-105 outline-none"
              onMouseDown={(e) => e.preventDefault()}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN - TRANSPARENTE */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 backdrop-blur-xl bg-gray-950/90 shadow-2xl shadow-cyan-500/10 overflow-hidden lg:hidden"
            >
              {/* USA O BACKGROUND DO HERO COM TRANSPARÊNCIA */}

              <nav className="flex flex-col p-4 gap-1 relative z-10">
                {navItems.map((item, index) => {
                  const sectionName = item.href.replace("#", "");
                  const isActive = activeSection === sectionName;

                  return (
                    <motion.button
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => scrollToSection(sectionName)}
                      onMouseDown={(e) => e.preventDefault()}
                      className={`flex items-center justify-between px-4 py-3 text-sm font-mono font-bold tracking-wider rounded-lg transition-all duration-300 cursor-pointer text-left outline-none ${
                        isActive
                          ? "text-white bg-white/10"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      }`}
                      whileHover={{ x: 3 }}
                      whileTap={{ x: 0 }}
                    >
                      <span>{item.name.toUpperCase()}</span>
                      {isActive && (
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                      )}
                    </motion.button>
                  );
                })}

                <motion.div
                  className="pt-4 mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl border-0 shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105"
                    onClick={() => setIsOpen(false)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <a
                      href="/docs/curriculo-erick-reis.pdf"
                      download
                      className="flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>DOWNLOAD CV</span>
                    </a>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
