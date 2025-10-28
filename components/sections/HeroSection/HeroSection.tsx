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
  Heart,
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
        isScrolled
          ? "h-16 py-3 bg-gray-950/80 backdrop-blur-xl border-b border-white/5"
          : "h-20 py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50 h-full flex items-center">
        <div className="flex items-center justify-between w-full h-full">
          {/* Logo - Igual ao Footer */}
          <motion.button
            onClick={() => onNavClick("hero")}
            className="flex items-center gap-3 bg-transparent border-none cursor-pointer transition-all duration-500 p-2 rounded-xl outline-none group hover:bg-white/5"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4 p-2 rounded-2xl bg-gradient-to-r from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-blue-400/50 transition-all duration-500 hover:scale-105">
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
                <div className="absolute -inset-2 bg-blue-500/10 rounded-xl blur-xl group-hover:bg-blue-500/20 transition-all duration-500" />
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
                      ? "text-white bg-white/10 border-white/20 shadow-lg shadow-cyan-500/10"
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

        {/* Mobile Menu Dropdown - NÃO TRANSPARENTE */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 backdrop-blur-xl bg-gray-950/95 border-b border-white/5 shadow-2xl shadow-cyan-500/10 overflow-hidden lg:hidden"
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
                          className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
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
      glow: "shadow-yellow-400/20",
      size: "text-2xl",
      top: "15%",
      left: "10%",
    },
    {
      Icon: Code2,
      color: "text-cyan-400",
      glow: "shadow-cyan-400/20",
      size: "text-3xl",
      top: "20%",
      left: "85%",
    },
    {
      Icon: Cpu,
      color: "text-purple-400",
      glow: "shadow-purple-400/20",
      size: "text-2xl",
      top: "70%",
      left: "15%",
    },
    {
      Icon: Zap,
      color: "text-green-400",
      glow: "shadow-green-400/20",
      size: "text-2xl",
      top: "65%",
      left: "80%",
    },
    {
      Icon: Sparkles,
      color: "text-amber-400",
      glow: "shadow-amber-400/20",
      size: "text-xl",
      top: "35%",
      left: "5%",
    },
    {
      Icon: Globe,
      color: "text-blue-400",
      glow: "shadow-blue-400/20",
      size: "text-xl",
      top: "40%",
      left: "90%",
    },
    {
      Icon: Brain,
      color: "text-pink-400",
      glow: "shadow-pink-400/20",
      size: "text-2xl",
      top: "80%",
      left: "90%",
    },
    {
      Icon: Rocket,
      color: "text-red-400",
      glow: "shadow-red-400/20",
      size: "text-xl",
      top: "10%",
      left: "50%",
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
      className="relative overflow-hidden flex items-center justify-center w-full"
      style={{
        height: `calc(100vh - ${headerHeight}px)`,
        minHeight: `calc(100vh - ${headerHeight}px)`,
        marginTop: `${headerHeight}px`,
      }}
    >
      {/* Elementos Neon Flutuantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {neonConfigs.map(({ Icon, color, glow, size, top, left }, index) => (
          <motion.div
            key={index}
            ref={(el) => {
              neonElementsRef.current[index] = el;
            }}
            className={`absolute ${color} ${size} ${glow} opacity-90 filter drop-shadow-lg backdrop-blur-sm`}
            style={{ top, left }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, index % 2 === 0 ? 10 : -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.3,
            }}
          >
            <Icon className="w-full h-full" />
          </motion.div>
        ))}
      </div>

      {/* Conteúdo Principal - ESPAÇAMENTOS RESPONSIVOS MELHORADOS */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto">
          {/* Título Principal - ESPAÇAMENTOS OTIMIZADOS */}
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
                    <span
                      key={`${wordIndex}-${letterIndex}`}
                      ref={setTitleLetterRef(wordIndex, letterIndex)}
                      className="inline-block mx-0.5 sm:mx-1 lg:mx-1.5 hover:scale-110 hover:text-cyan-300 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent"
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  ))}
                </span>
              ))}
            </motion.h1>
          </div>

          {/* Subtítulo - ESPAÇAMENTOS RESPONSIVOS */}
          <div className="w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto mb-6 sm:mb-8 lg:mb-10">
            <motion.p
              ref={subtitleRef}
              className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-300 text-center leading-relaxed sm:leading-loose font-light px-2 sm:px-4"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-size-200 animate-gradient font-medium">
                Transformo visões ambiciosas em soluções digitais com tecnologia
                de ponta e código impecável
              </span>
            </motion.p>
          </div>

          {/* Botões de Ação - ESPAÇAMENTOS RESPONSIVOS */}
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
                  className="w-full bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 text-white font-black text-base sm:text-lg lg:text-xl py-4 sm:py-5 lg:py-6 px-6 sm:px-8 lg:px-10 rounded-2xl shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 relative overflow-hidden group border-0"
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

        {/* Scroll Indicator - POSICIONAMENTO RESPONSIVO */}
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.button
            ref={scrollIndicatorRef}
            onClick={onExploreClick}
            className="bg-transparent border-none cursor-pointer p-2 sm:p-3 flex flex-col items-center gap-1 sm:gap-2 group"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="text-cyan-400 text-xs sm:text-sm font-mono font-semibold tracking-widest uppercase group-hover:text-cyan-300"
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
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-xl group-hover:border-cyan-400/50 group-hover:bg-cyan-400/20 transition-all duration-300"
            >
              <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 group-hover:text-cyan-300" />
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
      {/* Background Compartilhado Único */}
      <div className="absolute inset-0 overflow-hidden bg-gray-950">
        {/* Gradientes Radiais Dinâmicos */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(circle at 15% 25%, rgba(59, 130, 246, 0.4) 0%, transparent 60%),
               radial-gradient(circle at 85% 15%, rgba(139, 92, 246, 0.35) 0%, transparent 60%),
               radial-gradient(circle at 45% 75%, rgba(16, 185, 129, 0.3) 0%, transparent 60%)`,
              `radial-gradient(circle at 25% 15%, rgba(59, 130, 246, 0.35) 0%, transparent 60%),
               radial-gradient(circle at 75% 25%, rgba(139, 92, 246, 0.4) 0%, transparent 60%),
               radial-gradient(circle at 55% 85%, rgba(16, 185, 129, 0.25) 0%, transparent 60%)`,
              `radial-gradient(circle at 35% 35%, rgba(59, 130, 246, 0.3) 0%, transparent 60%),
               radial-gradient(circle at 65% 65%, rgba(139, 92, 246, 0.35) 0%, transparent 60%),
               radial-gradient(circle at 85% 45%, rgba(16, 185, 129, 0.4) 0%, transparent 60%)`,
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Grid Sutil */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Elementos Orb Animados */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-64 sm:w-72 lg:w-80 h-64 sm:h-72 lg:h-80 bg-cyan-500/20 rounded-full filter blur-3xl"
          animate={{
            opacity: [0.1, 0.25, 0.1],
            scale: [1, 1.3, 1],
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/5 w-56 sm:w-64 lg:w-72 h-56 sm:h-64 lg:h-72 bg-purple-500/18 rounded-full filter blur-3xl"
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [1, 1.25, 1],
            x: [0, -15, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-2/3 left-1/3 w-48 sm:w-56 lg:w-64 h-48 sm:h-56 lg:h-64 bg-blue-500/15 rounded-full filter blur-3xl"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Overlay de brilho */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/40 via-transparent to-gray-950/60" />
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
