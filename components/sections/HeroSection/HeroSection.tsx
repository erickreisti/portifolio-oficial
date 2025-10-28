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
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Dados de navegação
const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

// Componente Header Integrado
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full overflow-hidden font-poppins ${
        isScrolled ? "h-16 py-3 backdrop-blur-md" : "h-20 py-4 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50 h-full flex items-center">
        <div className="flex items-center justify-between w-full h-full">
          {/* Logo */}
          <motion.button
            onClick={() => onNavClick("hero")}
            className="flex items-center gap-3 bg-transparent border-none cursor-pointer transition-all duration-500 p-2 rounded-lg outline-none group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
                  className={`relative px-5 py-2.5 text-sm font-mono font-bold tracking-widest transition-all duration-300 rounded-lg cursor-pointer outline-none ${
                    isActive
                      ? "text-white bg-white/10 backdrop-blur-lg"
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

          {/* Desktop Actions */}
          <motion.div
            className="hidden lg:flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              asChild
              className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl border-0 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 hover:scale-105 relative overflow-hidden group"
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
              className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white p-2.5 rounded-xl border-0 shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105"
            >
              <a href="/docs/curriculo-erick-reis.pdf" download>
                <Download className="w-4 h-4" />
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onMobileMenuToggle}
              className="w-10 h-10 rounded-xl text-white/80 hover:text-white bg-white/10 backdrop-blur-xl border-0 hover:bg-white/20 transition-all duration-300 hover:scale-105 outline-none"
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
              className="absolute top-full left-0 right-0 backdrop-blur-xl bg-gray-950/90 shadow-2xl shadow-cyan-500/10 overflow-hidden lg:hidden"
            >
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
                      onClick={() => {
                        onNavClick(sectionName);
                        onMobileMenuToggle();
                      }}
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

// Componente Hero Integrado
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
  const [isLoaded, setIsLoaded] = useState(false);

  // Refs para animação GSAP
  const titleLettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);
  const neonElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Motion values para efeito 3D
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXSpring = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const mouseYSpring = useSpring(mouseY, { damping: 20, stiffness: 300 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  // Configurações
  const titleWords = ["IDEIAS", "EXTRAORDINÁRIAS", "CÓDIGO", "EXCEPCIONAL"];
  const neonConfigs = [
    {
      Icon: Crown,
      color: "text-yellow-400",
      size: "text-2xl",
      top: "15%",
      left: "10%",
    },
    {
      Icon: Code2,
      color: "text-cyan-400",
      size: "text-3xl",
      top: "20%",
      left: "85%",
    },
    {
      Icon: Cpu,
      color: "text-purple-400",
      size: "text-2xl",
      top: "70%",
      left: "15%",
    },
    {
      Icon: Zap,
      color: "text-green-400",
      size: "text-2xl",
      top: "65%",
      left: "80%",
    },
    {
      Icon: Sparkles,
      color: "text-amber-400",
      size: "text-xl",
      top: "35%",
      left: "5%",
    },
    {
      Icon: Globe,
      color: "text-blue-400",
      size: "text-xl",
      top: "40%",
      left: "90%",
    },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    setTimeout(() => setIsLoaded(true), 300);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animação de entrada
  useEffect(() => {
    if (!heroRef.current || !isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Elementos neon
      const neonElements = neonElementsRef.current.filter(Boolean);
      tl.fromTo(
        neonElements,
        {
          opacity: 0,
          scale: 0,
          y: 80,
        },
        {
          opacity: 0.9,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          stagger: 0.1,
        }
      );

      // Título
      const titleLetters = titleLettersRef.current.filter(Boolean);
      tl.fromTo(
        titleLetters,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.03,
        },
        "-=0.5"
      );

      // Animações contínuas
      neonElements.forEach((element, index) => {
        gsap.to(element, {
          y: -15 - index * 2,
          rotation: index % 2 === 0 ? 8 : -8,
          duration: 4 + index,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.5,
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!titleRef.current || isMobile) return;
    const rect = titleRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const setTitleLetterRef =
    (wordIndex: number, letterIndex: number) =>
    (el: HTMLSpanElement | null) => {
      titleLettersRef.current[wordIndex * 50 + letterIndex] = el;
    };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative bg-gray-950 overflow-hidden flex items-center justify-center w-full"
      style={{
        height: `calc(100vh - ${headerHeight}px)`,
        minHeight: `calc(100vh - ${headerHeight}px)`,
        marginTop: `${headerHeight}px`,
      }}
    >
      {/* Elementos Neon */}
      <div className="absolute inset-0 pointer-events-none">
        {neonConfigs.map(({ Icon, color, size, top, left }, index) => (
          <motion.div
            key={index}
            ref={(el) => {
              neonElementsRef.current[index] = el;
            }}
            className={`absolute ${color} ${size} opacity-80 filter drop-shadow-lg`}
            style={{ top, left }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, index % 2 === 0 ? 8 : -8, 0],
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
          >
            <Icon className="w-full h-full" />
          </motion.div>
        ))}
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto">
          {/* Título */}
          <div
            ref={titleRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => !isMobile && setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="text-center mb-6 lg:mb-8 w-full"
          >
            <motion.h1
              style={{
                rotateX: isHovering && !isMobile ? rotateX : 0,
                rotateY: isHovering && !isMobile ? rotateY : 0,
                transformStyle: "preserve-3d",
              }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 lg:mb-6 leading-tight cursor-default transform-gpu"
            >
              {titleWords.map((word, wordIndex) => (
                <span key={wordIndex} className="block mb-2 lg:mb-3">
                  {word.split("").map((letter, letterIndex) => (
                    <span
                      key={`${wordIndex}-${letterIndex}`}
                      ref={setTitleLetterRef(wordIndex, letterIndex)}
                      className="inline-block mx-0.5 lg:mx-1 hover:scale-110 hover:text-cyan-300 transition-transform duration-200 hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  ))}
                </span>
              ))}
            </motion.h1>
          </div>

          {/* Subtítulo */}
          <div className="w-full max-w-3xl mx-auto mb-8 lg:mb-10">
            <motion.p
              ref={subtitleRef}
              className="text-xl sm:text-2xl lg:text-3xl text-gray-300 text-center leading-relaxed font-light"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-size-200 animate-gradient font-medium">
                Transformo visões ambiciosas em soluções digitais com tecnologia
                de ponta e código impecável
              </span>
            </motion.p>
          </div>

          {/* Botões */}
          <div className="w-full max-w-lg mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 items-center justify-center w-full">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 text-white font-black text-lg lg:text-xl py-5 lg:py-6 px-8 lg:px-10 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group"
                >
                  <a
                    href="#contact"
                    className="flex items-center justify-center gap-3 relative z-10"
                  >
                    <Mail className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="font-black tracking-widest drop-shadow-lg">
                      INICIAR PROJETO
                    </span>
                  </a>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button
                  asChild
                  className="w-full bg-white/15 backdrop-blur-2xl border border-white/30 text-white font-black text-lg lg:text-xl py-5 lg:py-6 px-8 lg:px-10 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/25 hover:border-white/50 relative overflow-hidden group"
                >
                  <a
                    href="/docs/curriculo-erick-reis.pdf"
                    download
                    className="flex items-center justify-center gap-3 relative z-10"
                  >
                    <Download className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 group-hover:translate-y-1 transition-transform duration-300" />
                    <span className="font-black tracking-widest drop-shadow-lg">
                      BAIXAR CV
                    </span>
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.button
            ref={scrollIndicatorRef}
            onClick={onExploreClick}
            className="bg-transparent border-none cursor-pointer p-3 flex flex-col items-center gap-2 group"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="text-cyan-400 text-sm font-mono font-semibold tracking-widest uppercase group-hover:text-cyan-300"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Explorar Mais
            </motion.span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-xl group-hover:border-cyan-400/50 group-hover:bg-cyan-400/20 transition-all duration-300"
            >
              <ArrowDown className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

// Componente Principal Unificado
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

    // Initial call
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
      {/* Background Compartilhado */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 15% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 60%),
              radial-gradient(circle at 85% 15%, rgba(139, 92, 246, 0.25) 0%, transparent 60%),
              radial-gradient(circle at 45% 75%, rgba(16, 185, 129, 0.2) 0%, transparent 60%),
              radial-gradient(circle at 75% 85%, rgba(245, 158, 11, 0.15) 0%, transparent 60%),
              radial-gradient(circle at 25% 45%, rgba(239, 68, 68, 0.15) 0%, transparent 60%),
              radial-gradient(circle at 60% 30%, rgba(168, 85, 247, 0.2) 0%, transparent 60%),
              linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)
            `,
          }}
        />

        {/* Elementos Orb */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-64 h-64 bg-cyan-500/15 rounded-full filter blur-3xl"
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/5 w-56 h-56 bg-purple-500/12 rounded-full filter blur-3xl"
          animate={{ opacity: [0.15, 0.25, 0.15], scale: [1, 1.15, 1] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Header Integrado */}
      <Header
        isScrolled={isScrolled}
        activeSection={activeSection}
        onNavClick={scrollToSection}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Hero Content */}
      <HeroContent
        headerHeight={headerHeight}
        onExploreClick={() => scrollToSection("about")}
      />
    </div>
  );
};
