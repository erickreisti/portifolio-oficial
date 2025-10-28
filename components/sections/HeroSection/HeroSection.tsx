// components/sections/HeroSection/HeroSection.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";
import {
  Download,
  Mail,
  ArrowDown,
  Sparkles,
  Zap,
  Cpu,
  Code2,
  Globe,
  Crown,
  Menu,
  X,
  Brain,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PremiumBackground } from "@/components/layout/PremiumBackground";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Header = ({
  isScrolled,
  activeSection,
  onNavClick,
  isMobileMenuOpen,
  onMobileMenuToggle,
}: {
  isScrolled: boolean;
  activeSection: string;
  onNavClick: (sectionId: string) => void;
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}) => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full font-poppins ${
        isScrolled
          ? "h-16 py-3 bg-gray-950/95 backdrop-blur-xl border-b border-gray-800/80 shadow-2xl"
          : "h-20 py-4 bg-transparent"
      }`}
      style={{
        background: isScrolled ? "rgba(15, 23, 42, 0.95)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: isScrolled
          ? "1px solid rgba(255, 255, 255, 0.08)"
          : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50 h-full flex items-center">
        <div className="flex items-center justify-between w-full h-full">
          {/* Logo */}
          <motion.button
            onClick={() => onNavClick("hero")}
            className="flex items-center gap-3 bg-transparent border-none cursor-pointer transition-all duration-500 p-2 rounded-xl outline-none group hover:bg-white/5"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4 p-2 rounded-2xl bg-gradient-to-r from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-tech-cyan/50 transition-all duration-500 hover:scale-105">
              <div className="relative">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="rounded-xl overflow-hidden"
                >
                  <Image
                    src="/images/hashblue.svg"
                    alt="Erick Reis Logo"
                    width={48}
                    height={48}
                    className="brightness-125 group-hover:brightness-150 transition-all duration-500"
                  />
                </motion.div>
                <div className="absolute -inset-2 bg-tech-cyan/10 rounded-xl blur-xl group-hover:bg-tech-cyan/20 transition-all duration-500" />
              </div>

              <div className="text-left hidden sm:block">
                <h3 className="text-lg font-black bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent group-hover:from-blue-200 group-hover:to-cyan-300 transition-all duration-500">
                  ÉRICK REIS
                </h3>
                <p className="text-xs font-mono text-gray-400 group-hover:text-gray-300 tracking-widest bg-gray-800/50 px-2 py-1 rounded mt-1">
                  FULLSTACK ENGINEER
                </p>
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
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                  onClick={() => onNavClick(sectionName)}
                  className={`relative px-5 py-2.5 text-sm font-mono font-bold tracking-widest transition-all duration-300 rounded-xl cursor-pointer outline-none backdrop-blur-lg border ${
                    isActive
                      ? "text-white bg-white/10 border-white/20 shadow-lg shadow-tech-cyan/10"
                      : "text-white/80 hover:text-white hover:bg-white/5 border-transparent hover:border-white/10"
                  }`}
                  whileHover={{ y: -1, scale: 1.02 }}
                  whileTap={{ y: 0 }}
                >
                  <span className="relative z-10">
                    {item.name.toUpperCase()}
                  </span>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-tech-cyan to-tech-purple rounded-full"
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

          {/* Desktop Actions */}
          <motion.div
            className="hidden lg:flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              asChild
              className="bg-gradient-to-r from-tech-cyan to-tech-purple hover:from-tech-cyan/90 hover:to-tech-purple/90 text-white font-bold text-sm px-6 py-2.5 rounded-xl border-0 shadow-2xl hover:shadow-tech-cyan/25 transition-all duration-500 hover:scale-105 relative overflow-hidden group"
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

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-tech-cyan to-tech-purple hover:from-tech-cyan/90 hover:to-tech-purple/90 text-white p-2.5 rounded-xl border-0 shadow-xl hover:shadow-tech-cyan/20 transition-all duration-300 hover:scale-105"
            >
              <a href="/docs/curriculo-erick-reis.pdf" download>
                <Download className="w-4 h-4" />
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onMobileMenuToggle}
              className="w-10 h-10 rounded-xl text-white/80 hover:text-white bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 backdrop-blur-xl bg-gray-950/95 border-b border-white/5 shadow-2xl shadow-tech-cyan/10 overflow-hidden lg:hidden"
            >
              <nav className="flex flex-col p-4 gap-2 relative z-10 bg-gray-900/95 rounded-b-2xl">
                {navItems.map((item, index) => {
                  const sectionName = item.href.replace("#", "");
                  const isActive = activeSection === sectionName;

                  return (
                    <motion.button
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        onNavClick(sectionName);
                        onMobileMenuToggle();
                      }}
                      className={`flex items-center justify-between px-4 py-3 text-sm font-mono font-bold tracking-wider rounded-xl transition-all duration-300 cursor-pointer text-left outline-none border ${
                        isActive
                          ? "text-white bg-white/10 border-white/20 shadow-lg"
                          : "text-white/80 hover:text-white hover:bg-white/5 border-gray-700/50 hover:border-white/20"
                      }`}
                      whileHover={{ x: 3 }}
                      whileTap={{ x: 0 }}
                    >
                      <span>{item.name.toUpperCase()}</span>
                      {isActive && (
                        <motion.div
                          className="w-2 h-2 bg-gradient-to-r from-tech-cyan to-tech-purple rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.button>
                  );
                })}

                <motion.div
                  className="pt-4 mt-2 border-t border-gray-700/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-tech-cyan to-tech-purple hover:from-tech-cyan/90 hover:to-tech-purple/90 text-white font-bold py-3 rounded-xl border-0 shadow-xl hover:shadow-tech-cyan/20 transition-all duration-300 hover:scale-105"
                    onClick={onMobileMenuToggle}
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

// Componente de Partícula Otimizada
const FloatingParticle = ({
  Icon,
  position,
  color,
  delay = 0,
  size = "text-2xl",
}: {
  Icon: any;
  position: string;
  color: string;
  delay?: number;
  size?: string;
}) => (
  <motion.div
    className={`absolute ${position} ${size}`}
    initial={{ opacity: 0, scale: 0, y: 100 }}
    animate={{
      opacity: [0.7, 1, 0.7],
      scale: [1, 1.1, 1],
      y: [0, -25, 0],
      rotate: [0, 5, 0],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
  >
    <Icon className={`${color} drop-shadow-[0_0_10px_currentColor]`} />
  </motion.div>
);

const HeroContent = ({
  headerHeight,
  onExploreClick,
}: {
  headerHeight: number;
  onExploreClick: () => void;
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Motion values para efeito 3D
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXSpring = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const mouseYSpring = useSpring(mouseY, { damping: 25, stiffness: 200 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  // Configurações das partículas - POSIÇÕES CORRIGIDAS
  const particlesConfig = [
    {
      Icon: Crown,
      position: "top-[15%] left-[10%]",
      color: "text-amber-400",
      delay: 0,
      size: "text-2xl",
    },
    {
      Icon: Code2,
      position: "top-[20%] right-[15%]",
      color: "text-tech-cyan",
      delay: 1,
      size: "text-3xl",
    },
    {
      Icon: Cpu,
      position: "bottom-[40%] left-[15%]",
      color: "text-tech-purple",
      delay: 2,
      size: "text-2xl",
    },
    {
      Icon: Zap,
      position: "bottom-[30%] right-[20%]",
      color: "text-tech-green",
      delay: 3,
      size: "text-2xl",
    },
    {
      Icon: Sparkles,
      position: "top-[35%] left-[5%]",
      color: "text-amber-400",
      delay: 4,
      size: "text-xl",
    },
    {
      Icon: Globe,
      position: "top-[40%] right-[10%]",
      color: "text-tech-blue",
      delay: 5,
      size: "text-xl",
    },
    {
      Icon: Brain,
      position: "bottom-[20%] right-[10%]",
      color: "text-tech-pink",
      delay: 6,
      size: "text-2xl",
    },
    {
      Icon: Rocket,
      position: "bottom-[25%] left-[20%]",
      color: "text-tech-orange",
      delay: 7,
      size: "text-xl",
    },
  ];

  const titleWords = ["IDEIAS", "EXTRAORDINÁRIAS", "CÓDIGO", "EXCEPCIONAL"];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!titleRef.current || isMobile) return;
    const rect = titleRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative overflow-hidden flex items-center justify-center w-full"
      style={{
        height: `calc(100vh - ${headerHeight}px)`,
        minHeight: `calc(100vh - ${headerHeight}px)`,
        marginTop: `${headerHeight}px`,
      }}
    >
      {/* Background Premium */}
      <PremiumBackground intensity="high" />

      {/* Partículas Flutuantes - CORRIGIDAS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particlesConfig.map((particle, index) => (
          <FloatingParticle key={index} {...particle} />
        ))}
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto">
          {/* Título Principal */}
          <div
            ref={titleRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => !isMobile && setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="text-center w-full mb-4 sm:mb-6 lg:mb-8"
          >
            <motion.h1
              style={{
                rotateX: isHovering && !isMobile ? rotateX : 0,
                rotateY: isHovering && !isMobile ? rotateY : 0,
                transformStyle: "preserve-3d",
              }}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl font-black text-white leading-tight cursor-default transform-gpu"
            >
              {titleWords.map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className={`block ${
                    wordIndex === 0
                      ? "mb-1 sm:mb-2 lg:mb-3"
                      : wordIndex === 1
                      ? "mb-1 sm:mb-2 lg:mb-3"
                      : wordIndex === 2
                      ? "mb-1 sm:mb-2 lg:mb-3"
                      : "mb-0"
                  }`}
                >
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      className="inline-block mx-0.5 sm:mx-1 lg:mx-1.5 hover:scale-110 hover:text-tech-cyan transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(6,182,212,0.8)] bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>
          </div>

          {/* Subtítulo */}
          <div className="w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto mb-6 sm:mb-8 lg:mb-10">
            <motion.p
              className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-300 text-center leading-relaxed sm:leading-loose font-light px-2 sm:px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-tech-cyan via-tech-blue to-tech-purple bg-clip-text text-transparent bg-size-200 animate-gradient font-medium">
                Transformo visões ambiciosas em soluções digitais com tecnologia
                de ponta e código impecável
              </span>
            </motion.p>
          </div>

          {/* Botões de Ação */}
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto mb-6 sm:mb-8 lg:mb-10">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 items-center justify-center w-full">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-full sm:w-auto flex-1 sm:flex-none"
              >
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-tech-cyan via-tech-purple to-tech-pink hover:from-tech-cyan/90 hover:via-tech-purple/90 hover:to-tech-pink/90 text-white font-black text-base sm:text-lg lg:text-xl py-4 sm:py-5 lg:py-6 px-6 sm:px-8 lg:px-10 rounded-2xl shadow-2xl hover:shadow-tech-cyan/30 transition-all duration-500 relative overflow-hidden group border-0"
                >
                  <a
                    href="#contact"
                    className="flex items-center justify-center gap-2 sm:gap-3 relative z-10"
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="font-black tracking-widest text-sm sm:text-base drop-shadow-lg">
                      INICIAR PROJETO
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </a>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-full sm:w-auto flex-1 sm:flex-none"
              >
                <Button
                  asChild
                  className="w-full bg-white/15 backdrop-blur-2xl border border-white/30 text-white font-black text-base sm:text-lg lg:text-xl py-4 sm:py-5 lg:py-6 px-6 sm:px-8 lg:px-10 rounded-2xl shadow-2xl hover:shadow-white/20 transition-all duration-500 hover:bg-white/25 hover:border-white/50 relative overflow-hidden group"
                >
                  <a
                    href="/docs/curriculo-erick-reis.pdf"
                    download
                    className="flex items-center justify-center gap-2 sm:gap-3 relative z-10"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:scale-110 group-hover:translate-y-1 transition-transform duration-300" />
                    <span className="font-black tracking-widest text-sm sm:text-base drop-shadow-lg">
                      BAIXAR CV
                    </span>
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.button
            onClick={onExploreClick}
            className="bg-transparent border-none cursor-pointer p-2 sm:p-3 flex flex-col items-center gap-1 sm:gap-2 group"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="text-tech-cyan text-xs sm:text-sm font-mono font-semibold tracking-widest uppercase group-hover:text-tech-cyan/80"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Explorar Mais
            </motion.span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-tech-cyan/30 bg-tech-cyan/10 backdrop-blur-xl group-hover:border-tech-cyan/50 group-hover:bg-tech-cyan/20 transition-all duration-300"
            >
              <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 text-tech-cyan group-hover:text-tech-cyan/80" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export const HeroSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(80);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    const handleActiveSection = () => {
      const sections = ["hero", "about", "skills", "projects", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        return (
          element &&
          element.getBoundingClientRect().top <= 100 &&
          element.getBoundingClientRect().bottom >= 100
        );
      });
      if (current) setActiveSection(current);
    };

    const updateHeaderHeight = () => {
      const header = document.querySelector("header");
      if (header) setHeaderHeight(header.offsetHeight);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleActiveSection);
    window.addEventListener("resize", updateHeaderHeight);

    updateHeaderHeight();
    setTimeout(updateHeaderHeight, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleActiveSection);
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <Header
        isScrolled={isScrolled}
        activeSection={activeSection}
        onNavClick={scrollToSection}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <HeroContent
        headerHeight={headerHeight}
        onExploreClick={() => scrollToSection("about")}
      />
    </div>
  );
};
