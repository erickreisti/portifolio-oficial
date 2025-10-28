// components/layout/Header/Header.tsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Download, Sparkles } from "lucide-react";
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
      setIsScrolled(window.scrollY > 20);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full overflow-hidden font-poppins h-20 ${
        isScrolled
          ? "py-4 border-b border-blue-400/10 backdrop-blur-xl bg-gray-950/90 h-16"
          : "py-6 border-b border-transparent backdrop-blur-none bg-transparent"
      }`}
    >
      {/* Background que se integra PERFEITAMENTE com o Hero */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Mesmos gradientes do Hero */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 15% 25%, rgba(59, 130, 246, 0.25) 0%, transparent 60%),
              radial-gradient(circle at 85% 15%, rgba(139, 92, 246, 0.2) 0%, transparent 60%),
              radial-gradient(circle at 45% 75%, rgba(16, 185, 129, 0.15) 0%, transparent 60%),
              radial-gradient(circle at 75% 85%, rgba(245, 158, 11, 0.1) 0%, transparent 60%),
              radial-gradient(circle at 25% 45%, rgba(239, 68, 68, 0.1) 0%, transparent 60%),
              linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)
            `,
          }}
        />

        {/* Mesmos elementos orb do Hero - posicionados no topo */}
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full filter blur-3xl"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -top-16 -right-16 w-32 h-32 bg-purple-500/08 rounded-full filter blur-3xl"
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-center">
        <div className="flex items-center justify-between w-full h-full">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-4 bg-transparent border-none cursor-pointer transition-all duration-500 hover:scale-105 p-3 rounded-2xl hover:bg-blue-500/5 relative overflow-hidden outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <motion.div
              className="h-14 w-14 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-500 bg-gradient-to-br from-blue-500/10 to-purple-500/5 border border-white/10 shadow-2xl hover:shadow-blue-500/10 group"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/images/hashblue.svg"
                alt="Erick Reis Logo"
                width={56}
                height={56}
                className="h-10 w-10 object-contain brightness-125 group-hover:brightness-150 transition-all duration-500"
                priority
              />
            </motion.div>
            <div className="flex flex-col items-start">
              <span className="text-xl font-bold text-white bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Érick Reis
              </span>
              <span className="text-xs font-mono text-gray-400 transition-all duration-300 flex items-center gap-1 mt-0.5 group-hover:text-gray-300">
                <Sparkles className="w-3 h-3 text-gray-500 group-hover:text-blue-400 transition-colors duration-300" />
                FULLSTACK
              </span>
            </div>
          </motion.button>

          {/* Desktop Navigation */}
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
                  className={`relative px-5 py-3 text-sm font-mono font-semibold tracking-wider transition-all duration-300 rounded-xl border-none cursor-pointer outline-none ${
                    isActive
                      ? "text-white bg-white/10 backdrop-blur-xl"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <span>{item.name.toUpperCase()}</span>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-2 left-5 right-5 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                      layoutId="navIndicator"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <motion.div
            className="hidden lg:flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              asChild
              className="bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-sm px-6 py-3 rounded-xl border border-white/10 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 relative overflow-hidden group"
            >
              <a
                href="/docs/curriculo-erick-reis.pdf"
                download
                onMouseDown={(e) => e.preventDefault()}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>DOWNLOAD CV</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </a>
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-xl border border-white/10 shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105"
            >
              <a
                href="/docs/curriculo-erick-reis.pdf"
                download
                onMouseDown={(e) => e.preventDefault()}
              >
                <Download className="w-4 h-4" />
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="w-12 h-12 rounded-xl text-white/70 hover:text-white bg-gray-900/30 backdrop-blur-xl border border-white/10 hover:bg-gray-800/50 hover:border-white/20 transition-all duration-300 hover:scale-105 outline-none"
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

        {/* Mobile Menu Dropdown com background integrado */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 bg-gray-950/95 backdrop-blur-xl border-t border-blue-400/10 shadow-2xl shadow-blue-500/10 overflow-hidden lg:hidden"
            >
              {/* Background integrado com o Hero */}
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(circle at 15% 25%, rgba(59, 130, 246, 0.25) 0%, transparent 60%),
                    radial-gradient(circle at 85% 15%, rgba(139, 92, 246, 0.2) 0%, transparent 60%),
                    radial-gradient(circle at 45% 75%, rgba(16, 185, 129, 0.15) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 100%)
                  `,
                }}
              />

              <nav className="flex flex-col p-6 gap-2 relative z-10">
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
                      className={`flex items-center justify-between px-4 py-4 text-sm font-mono font-semibold tracking-wider rounded-xl transition-all duration-300 border-none cursor-pointer text-left outline-none ${
                        isActive
                          ? "text-white bg-white/10 border-l-2 border-blue-400"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ x: 0 }}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <span>{item.name.toUpperCase()}</span>
                      {isActive && (
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      )}
                    </motion.button>
                  );
                })}

                <motion.div
                  className="pt-6 mt-4 border-t border-blue-400/10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    asChild
                    className="w-full bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl border border-white/10 shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105"
                    onClick={() => setIsOpen(false)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <a
                      href="/docs/curriculo-erick-reis.pdf"
                      download
                      className="flex items-center justify-center gap-3"
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
