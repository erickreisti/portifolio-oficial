"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/optimization/OptimizedImage";

const navItems = [
  { name: "Início", href: "#hero" },
  { name: "Sobre", href: "#about" },
  { name: "Habilidades", href: "#skills" },
  { name: "Projetos", href: "#projects" },
  { name: "Contato", href: "#contact" },
];

interface HeaderProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

export const Header = ({ activeSection, onNavClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(0.3);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = document.getElementById("hero")?.offsetHeight || 800;

      // Ajusta a opacidade baseado no scroll (mais opaco conforme desce)
      const opacity = Math.min(0.95, 0.3 + (scrollY / heroHeight) * 0.8);
      setHeaderOpacity(opacity);

      setIsScrolled(scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavClick(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500"
      style={{
        background: `rgba(15, 23, 42, ${headerOpacity})`,
        backdropFilter: `blur(${isScrolled ? "24px" : "16px"}) saturate(180%)`,
        borderBottom: isScrolled
          ? "1px solid rgba(6, 182, 212, 0.1)"
          : "1px solid transparent",
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <motion.button
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-tech-cyan-500 rounded-lg p-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 p-2 rounded-xl bg-gradient-to-r from-gray-900/20 to-gray-800/10 backdrop-blur-sm border border-tech-cyan-500/10 group-hover:border-tech-cyan-400/20 transition-all duration-300">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <OptimizedImage
                src="/images/hashblue.svg"
                alt="Erick Reis Logo"
                width={36}
                height={36}
                priority={true}
                className="brightness-125"
              />
            </motion.div>
            <div className="text-left hidden sm:block">
              <motion.h3
                className="text-base sm:text-lg font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                ÉRICK REIS
              </motion.h3>
              <motion.p
                className="text-xs font-mono text-tech-cyan-400 tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                FULLSTACK ENGINEER
              </motion.p>
            </div>
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
                onClick={() => handleNavClick(sectionName)}
                className={`
                  relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                  group overflow-hidden
                  ${
                    isActive
                      ? "text-tech-cyan-400"
                      : "text-gray-300 hover:text-white"
                  }
                  focus:outline-none focus:ring-2 focus:ring-tech-cyan-500
                `}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                {/* Background hover */}
                <div
                  className={`
                  absolute inset-0 rounded-lg transition-all duration-300
                  ${
                    isActive
                      ? "bg-tech-cyan-400/10 border border-tech-cyan-400/20"
                      : "bg-transparent group-hover:bg-white/5"
                  }
                `}
                />

                {/* Text */}
                <span className="relative z-10 font-semibold">{item.name}</span>

                {/* Underline animado */}
                <motion.div
                  className={`
                    absolute bottom-0 left-0 right-0 h-0.5 rounded-full
                    ${isActive ? "bg-tech-cyan-400" : "bg-tech-cyan-400/0"}
                  `}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />

                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-tech-cyan-400/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </motion.button>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <motion.div
          className="hidden lg:flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            variant="neon"
            size="sm"
            className="gap-2 backdrop-blur-sm"
            onClick={() => handleNavClick("contact")}
          >
            <Download className="w-4 h-4" />
            CV
          </Button>
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <Button
            variant="neon"
            size="sm"
            className="gap-2 backdrop-blur-sm"
            onClick={() => handleNavClick("contact")}
          >
            <Download className="w-4 h-4" />
            CV
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 rounded-xl text-white/80 hover:text-white bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-tech-cyan-500"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-gray-950/95 backdrop-blur-xl border-b border-tech-cyan-800/50 lg:hidden overflow-hidden"
            style={{
              background: `rgba(15, 23, 42, 0.98)`,
              backdropFilter: "blur(24px) saturate(180%)",
            }}
          >
            <nav className="p-4 space-y-2">
              {navItems.map((item, index) => {
                const sectionName = item.href.replace("#", "");
                const isActive = activeSection === sectionName;

                return (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavClick(sectionName)}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 border relative overflow-hidden
                      ${
                        isActive
                          ? "text-tech-cyan-400 bg-tech-cyan-400/10 border-tech-cyan-400/20"
                          : "text-gray-300 hover:text-white hover:bg-white/5 border-transparent"
                      }
                      focus:outline-none focus:ring-2 focus:ring-tech-cyan-500
                    `}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Underline para mobile */}
                    <motion.div
                      className={`
                        absolute bottom-0 left-0 right-0 h-0.5 rounded-full
                        ${isActive ? "bg-tech-cyan-400" : "bg-tech-cyan-400/0"}
                      `}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    <span className="relative z-10 font-semibold">
                      {item.name}
                    </span>

                    {isActive && (
                      <motion.div
                        className="w-2 h-2 bg-tech-cyan-400 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    )}
                  </motion.button>
                );
              })}
              <motion.div
                className="pt-4 border-t border-gray-700/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  variant="neon"
                  className="w-full justify-center gap-2 backdrop-blur-sm"
                  onClick={() => handleNavClick("contact")}
                >
                  <Download className="w-4 h-4" />
                  BAIXAR CV
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
