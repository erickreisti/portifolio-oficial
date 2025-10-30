"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X, Rocket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/optimization/OptimizedImage";

// Dados padronizados
const NAV_ITEMS = [
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
      const heroHeight = document.getElementById("hero")?.offsetHeight || 600;

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
      className="fixed-header" // Classe CSS global
      style={{
        background: `rgba(15, 23, 42, ${headerOpacity})`,
        backdropFilter: `blur(${isScrolled ? "20px" : "12px"}) saturate(180%)`,
        borderBottom: isScrolled
          ? "1px solid rgba(6, 182, 212, 0.15)"
          : "1px solid transparent",
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.button
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg p-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 p-2 rounded-xl bg-gradient-to-r from-gray-900/10 to-gray-800/5 backdrop-blur-sm border border-cyan-500/10 group-hover:border-cyan-400/20 transition-all duration-300">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <OptimizedImage
                src="/images/hashblue.svg"
                alt="Erick Reis Logo"
                width={32}
                height={32}
                priority={true}
                className="brightness-125"
              />
            </motion.div>
            <div className="text-left hidden sm:block">
              <motion.h3
                className="text-base font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                ÉRICK REIS
              </motion.h3>
              <motion.p
                className="text-xs font-mono text-cyan-400/80 tracking-widest"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                FULLSTACK ENGINEER
              </motion.p>
            </div>
          </div>
        </motion.button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item, index) => {
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
                      ? "text-cyan-400"
                      : "text-gray-300 hover:text-white"
                  }
                  focus:outline-none focus:ring-2 focus:ring-cyan-500
                `}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                <motion.div
                  className={`
                    absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/10 to-blue-400/5 border border-cyan-400/20
                    ${isActive ? "opacity-100" : "opacity-0"}
                  `}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <span className="relative z-10 font-semibold tracking-wide flex items-center gap-2">
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: 0.1,
                      }}
                    >
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                    </motion.div>
                  )}
                  {item.name}
                </span>

                <motion.div
                  className={`
                    absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full
                  `}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </motion.button>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <motion.div
          className="hidden lg:flex items-center gap-3"
          initial={{ opacity: 0, x: 20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="neon"
              size="sm"
              className="gap-2 backdrop-blur-sm relative overflow-hidden group"
              onClick={() =>
                window.open("/docs/curriculo-erick-reis.pdf", "_blank")
              }
            >
              <motion.div
                className="relative"
                whileHover={{
                  y: [0, -2, 0],
                  transition: { duration: 0.6, repeat: Infinity },
                }}
              >
                <Download className="w-4 h-4" />
              </motion.div>
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                BAIXAR CV
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.div
          className="flex lg:hidden items-center gap-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="neon"
              size="sm"
              className="gap-2 backdrop-blur-sm"
              onClick={() =>
                window.open("/docs/curriculo-erick-reis.pdf", "_blank")
              }
            >
              <Download className="w-4 h-4" />
              CV
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9 rounded-xl text-white/80 hover:text-white bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 relative overflow-hidden"
            >
              <motion.div
                animate={{
                  rotate: isMobileMenuOpen ? 180 : 0,
                  scale: isMobileMenuOpen ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4 }}
            className="absolute top-full left-0 right-0 bg-gray-950/98 backdrop-blur-xl border-b border-cyan-800/20 lg:hidden overflow-hidden"
            style={{
              background: `rgba(15, 23, 42, 0.98)`,
              backdropFilter: "blur(20px) saturate(180%)",
            }}
          >
            <nav className="p-4 space-y-2">
              {NAV_ITEMS.map((item, index) => {
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
                          ? "text-cyan-400 bg-gradient-to-r from-cyan-400/10 to-blue-400/5 border-cyan-400/20"
                          : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-white/5 hover:to-cyan-400/5 border-transparent"
                      }
                      focus:outline-none focus:ring-2 focus:ring-cyan-500
                    `}
                    initial={{ x: -30, opacity: 0, scale: 0.9 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className={`
                        absolute left-3 w-1 h-6 rounded-full bg-gradient-to-b from-cyan-400 to-blue-400
                        ${isActive ? "opacity-100" : "opacity-0"}
                      `}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{
                        scaleX: isActive ? 1 : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    />

                    <span className="relative z-10 font-semibold ml-6 flex items-center gap-3">
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            delay: 0.2,
                          }}
                        >
                          <Sparkles className="w-3 h-3 text-cyan-400" />
                        </motion.div>
                      )}
                      {item.name}
                    </span>

                    {isActive && (
                      <motion.div
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: 0.3,
                          type: "spring",
                          stiffness: 200,
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}

              <motion.div
                className="pt-4 border-t border-gray-700/30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="neon"
                    className="w-full justify-center gap-2 backdrop-blur-sm"
                    onClick={() =>
                      window.open("/docs/curriculo-erick-reis.pdf", "_blank")
                    }
                  >
                    <Download className="w-4 h-4" />
                    BAIXAR CV
                  </Button>
                </motion.div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
