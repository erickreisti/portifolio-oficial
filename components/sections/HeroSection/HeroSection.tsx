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

// Sistema de Partículas de Código Refatorado
const TechParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particlesContainer = containerRef.current;
    let animationFrame: number;

    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className =
        "absolute text-xs font-mono opacity-0 pointer-events-none";

      const colors = [
        "text-cyan-400",
        "text-blue-400",
        "text-purple-400",
        "text-emerald-400",
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.classList.add(color);

      const codeChars = [
        "{",
        "}",
        "<",
        ">",
        "/",
        ";",
        "=",
        "()",
        "=>",
        "const",
        "function",
      ];
      particle.textContent =
        codeChars[Math.floor(Math.random() * codeChars.length)];

      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.fontSize = `${Math.random() * 12 + 10}px`;

      particlesContainer.appendChild(particle);

      const duration = Math.random() * 4 + 3;
      const delay = Math.random() * 2;

      gsap.to(particle, {
        opacity: 1,
        duration: 0.5,
        delay: delay,
        ease: "power1.out",
      });

      gsap.to(particle, {
        y: `-=${Math.random() * 200 + 100}`,
        x: `+=${Math.random() * 100 - 50}`,
        rotation: Math.random() * 360,
        duration: duration,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.to(particle, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => particle.remove(),
          });
        },
      });
    };

    const animate = () => {
      if (Math.random() > 0.7) {
        createParticle();
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      particlesContainer.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    />
  );
};

// Grid Tecnológico Refatorado
const TechGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".grid-line", {
        backgroundPosition: "100% 100%",
        duration: 40,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".grid-dot", {
        scale: 0,
        opacity: 0,
        duration: 3,
        stagger: {
          each: 0.2,
          repeat: -1,
          yoyo: true,
          from: "random",
        },
        ease: "sine.inOut",
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={gridRef}
      className="absolute inset-0 pointer-events-none opacity-20"
    >
      <div className="grid-line absolute inset-0 bg-[linear-gradient(90deg,transparent_99%,rgba(6,182,212,0.1)_100%)] bg-[length:50px_50px]" />
      <div className="grid-line absolute inset-0 bg-[linear-gradient(180deg,transparent_99%,rgba(6,182,212,0.1)_100%)] bg-[length:50px_50px]" />

      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={i}
          className="grid-dot absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${(i % 5) * 25}%`,
            top: `${Math.floor(i / 5) * 25}%`,
          }}
        />
      ))}
    </div>
  );
};

// Texto Holográfico Refatorado
const HolographicText = ({ words }: { words: string[] }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray(".hologram-char");

      gsap.fromTo(
        chars,
        {
          y: 100,
          opacity: 0,
          rotationX: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          stagger: {
            each: 0.02,
            from: "center",
          },
          ease: "back.out(1.7)",
          delay: 0.3,
        }
      );
    }, textRef);

    return () => ctx.revert();
  }, [words]);

  return (
    <div ref={textRef} className="text-center w-full mb-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-tight">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="block mb-2 sm:mb-4">
            {word.split("").map((letter, letterIndex) => (
              <span
                key={`${wordIndex}-${letterIndex}`}
                className="hologram-char inline-block mx-1 sm:mx-2 transition-all duration-300 bg-gradient-to-b from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent hover:scale-110 hover:text-cyan-300"
                style={{ transformStyle: "preserve-3d" }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </span>
        ))}
      </h1>
    </div>
  );
};

// Botões Refatorados - Simples e Funcionais
const ActionButton = ({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  className?: string;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const baseClasses =
    "relative overflow-hidden font-bold text-lg py-4 px-8 rounded-2xl border-0 group transition-all duration-300 transform hover:scale-105 active:scale-95";

  const variants = {
    primary:
      "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl hover:shadow-cyan-500/25",
    secondary:
      "bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 hover:border-white/30 shadow-2xl",
  };

  const content = (
    <motion.button
      ref={buttonRef}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>

      {/* Efeito de brilho para botão primário */}
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      )}
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} download={href.includes("curriculo")}>
        {content}
      </a>
    );
  }

  return content;
};

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
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        y: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full ${
        isScrolled
          ? "h-16 bg-gray-950/95 backdrop-blur-xl border-b border-gray-800/80 shadow-2xl"
          : "h-20 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <motion.button
          onClick={() => onNavClick("hero")}
          className="flex items-center gap-3 group nav-item"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-3 p-2 rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-700/30 group-hover:border-cyan-400/50 transition-all duration-500">
            <div className="relative">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="/images/hashblue.svg"
                  alt="Erick Reis Logo"
                  width={40}
                  height={40}
                  className="brightness-125 group-hover:brightness-150 transition-all duration-500"
                />
              </motion.div>
            </div>

            <div className="text-left hidden sm:block">
              <h3 className="text-lg font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                ÉRICK REIS
              </h3>
              <p className="text-xs font-mono text-gray-400 tracking-widest">
                FULLSTACK ENGINEER
              </p>
            </div>
          </div>
        </motion.button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item, index) => {
            const sectionName = item.href.replace("#", "");
            const isActive = activeSection === sectionName;

            return (
              <motion.button
                key={item.name}
                onClick={() => onNavClick(sectionName)}
                className={`nav-item px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isActive
                    ? "text-cyan-400 bg-cyan-400/10 border border-cyan-400/20"
                    : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                {item.name}
              </motion.button>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <motion.div
          className="hidden lg:flex items-center gap-3 nav-item"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ActionButton
            href="/docs/curriculo-erick-reis.pdf"
            variant="primary"
            className="text-sm py-2 px-6"
          >
            <Download className="w-4 h-4" />
            DOWNLOAD CV
          </ActionButton>
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <ActionButton
            href="/docs/curriculo-erick-reis.pdf"
            variant="primary"
            className="text-sm p-2"
          >
            <Download className="w-4 h-4" />
          </ActionButton>

          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileMenuToggle}
            className="w-10 h-10 rounded-xl text-white/80 hover:text-white bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/20"
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
            className="absolute top-full left-0 right-0 backdrop-blur-xl bg-gray-950/95 border-b border-white/5 lg:hidden"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item, index) => {
                const sectionName = item.href.replace("#", "");
                const isActive = activeSection === sectionName;

                return (
                  <motion.button
                    key={item.name}
                    onClick={() => {
                      onNavClick(sectionName);
                      onMobileMenuToggle();
                    }}
                    className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive
                        ? "text-cyan-400 bg-cyan-400/10 border border-cyan-400/20"
                        : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.name}
                    {isActive && (
                      <div className="w-2 h-2 bg-cyan-400 rounded-full" />
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
                <ActionButton
                  href="/docs/curriculo-erick-reis.pdf"
                  variant="primary"
                  className="w-full justify-center"
                >
                  <Download className="w-4 h-4" />
                  DOWNLOAD CV
                </ActionButton>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

const HeroContent = ({
  headerHeight,
  onExploreClick,
}: {
  headerHeight: number;
  onExploreClick: () => void;
}) => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animação do subtítulo
      tl.fromTo(
        ".hero-subtitle",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 1,
          ease: "power2.out",
        }
      );

      // Animação dos botões
      tl.fromTo(
        ".hero-button",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const titleWords = ["IDEIAS", "EXTRAORDINÁRIAS", "CÓDIGO", "EXCEPCIONAL"];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
      style={{
        paddingTop: `${headerHeight}px`,
        marginTop: `-${headerHeight}px`,
      }}
    >
      {/* Background Effects */}
      <PremiumBackground intensity="high" />
      <TechGrid />
      <TechParticles />

      {/* Conteúdo Principal */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Título */}
        <HolographicText words={titleWords} />

        {/* Subtítulo */}
        <div className="hero-subtitle max-w-3xl mx-auto mb-12">
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light leading-relaxed">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Transformo visões ambiciosas em soluções digitais com tecnologia
              de ponta
            </span>
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <ActionButton
            onClick={() => onExploreClick()}
            variant="primary"
            className="hero-button"
          >
            <Mail className="w-5 h-5" />
            INICIAR PROJETO
          </ActionButton>

          <ActionButton
            href="/docs/curriculo-erick-reis.pdf"
            variant="secondary"
            className="hero-button"
          >
            <Download className="w-5 h-5" />
            BAIXAR CV
          </ActionButton>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={onExploreClick}
          className="hero-button flex flex-col items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-sm font-medium">Explorar Mais</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-10 h-10 rounded-full border border-cyan-400/30 flex items-center justify-center hover:border-cyan-400/50 transition-colors"
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.button>
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
      setIsScrolled(window.scrollY > 50);
    };

    const handleActiveSection = () => {
      const sections = ["hero", "about", "skills", "projects", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        return element && element.getBoundingClientRect().top <= 100;
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
      const offsetPosition = element.offsetTop - headerHeight;
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
