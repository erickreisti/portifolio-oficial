// components/sections/HeroSection/HeroSection.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";
import { Download, Mail, ArrowDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PremiumBackground } from "@/components/layout/PremiumBackground";

// Itens de navegação em português
const navItems = [
  { name: "Início", href: "#hero" },
  { name: "Sobre", href: "#about" },
  { name: "Habilidades", href: "#skills" },
  { name: "Projetos", href: "#projects" },
  { name: "Contato", href: "#contact" },
];

// Sistema de Partículas Simplificado - MAIS VISÍVEIS
const TechParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particlesContainer = containerRef.current;
    const particles: HTMLDivElement[] = [];

    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className =
        "absolute text-xs font-mono text-cyan-400 opacity-30 pointer-events-none";

      const codeChars = ["{", "}", "<", ">", "/", ";", "=", "()", "=>"];
      particle.textContent =
        codeChars[Math.floor(Math.random() * codeChars.length)];

      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      particlesContainer.appendChild(particle);
      particles.push(particle);

      gsap.to(particle, {
        opacity: 0.8,
        y: -100,
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 180,
        duration: Math.random() * 3 + 2,
        ease: "power1.out",
        onComplete: () => {
          gsap.to(particle, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
              particle.remove();
              const index = particles.indexOf(particle);
              if (index > -1) particles.splice(index, 1);
            },
          });
        },
      });
    };

    const interval = setInterval(createParticle, 250);

    return () => {
      clearInterval(interval);
      particles.forEach((particle) => particle.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    />
  );
};

// Grid Tecnológico Simplificado
const TechGrid = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-10">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_99%,rgba(6,182,212,0.1)_100%)] bg-[length:100px_100px]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_99%,rgba(6,182,212,0.1)_100%)] bg-[length:100px_100px]" />
    </div>
  );
};

// Texto Principal com Animação
const HeroText = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      const chars = textRef.current?.querySelectorAll(".hero-char");
      if (!chars) return;

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
          duration: 1,
          stagger: 0.03,
          ease: "back.out(1.7)",
          delay: 0.5,
        }
      );
    }, textRef);

    return () => ctx.revert();
  }, []);

  const titleLines = [
    "IDEIAS EXTRAORDINÁRIAS",
    "CÓDIGO EXCEPCIONAL",
    "RESULTADOS REAIS",
  ];

  return (
    <div ref={textRef} className="text-center w-full mb-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
        {titleLines.map((line, lineIndex) => (
          <motion.div
            key={lineIndex}
            className="overflow-hidden mb-2 sm:mb-4"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 + lineIndex * 0.2 }}
          >
            {line.split("").map((char, charIndex) => (
              <span
                key={`${lineIndex}-${charIndex}`}
                className="hero-char inline-block mx-0.5 sm:mx-1 transition-all duration-300 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent hover:scale-110 hover:text-cyan-300"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </motion.div>
        ))}
      </h1>
    </div>
  );
};

// Botão Melhorado - Com variantes e efeitos refinados, foco estilizado e textos em português
const ImprovedButton = ({
  children,
  onClick,
  href,
  variant = "primary",
  size = "default",
  className = "",
  icon,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "sm" | "lg";
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-2xl hover:shadow-cyan-500/25";
      case "secondary":
        return "bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 hover:border-white/30 shadow-2xl";
      case "outline":
        return "bg-transparent border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/80 shadow-lg hover:shadow-cyan-500/25";
      default:
        return "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-2xl hover:shadow-cyan-500/25";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "py-2 px-4 text-sm";
      case "lg":
        return "py-4 px-8 text-lg";
      default:
        return "py-3 px-6";
    }
  };

  const handleMouseEnter = () => {
    if (!buttonRef.current || disabled) return;

    for (let i = 0; i < 4; i++) {
      const particle = document.createElement("div");
      particle.className =
        "absolute w-1 h-1 bg-cyan-400 rounded-full pointer-events-none";
      particle.style.left = "50%";
      particle.style.top = "50%";

      buttonRef.current.appendChild(particle);

      gsap.to(particle, {
        x: Math.random() * 40 - 20,
        y: Math.random() * 40 - 20,
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => particle.remove(),
      });
    }
  };

  const buttonContent = (
    <motion.button
      ref={buttonRef}
      className={`
        relative font-bold rounded-2xl border-0 transition-all duration-300 transform hover:scale-105 active:scale-95
        flex items-center justify-center gap-3 group overflow-hidden ${getVariantClasses()} ${getSizeClasses()} ${className}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
      `}
      whileHover={!disabled ? { y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      disabled={disabled}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      )}
    </motion.button>
  );

  if (href) {
    return (
      <a
        href={href}
        download={href.includes("curriculo")}
        className={`inline-block focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-2xl ${
          disabled ? "pointer-events-none" : ""
        }`}
      >
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
};

// Header Refinado
const RefinedHeader = ({
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
      transition={{ duration: 0.6 }}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full
        ${
          isScrolled
            ? "h-16 bg-gray-950/95 backdrop-blur-xl border-b border-gray-800/50 shadow-xl"
            : "h-20 bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <motion.button
          onClick={() => onNavClick("hero")}
          className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-lg p-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-3 p-2 rounded-xl bg-gradient-to-r from-gray-900/30 to-gray-800/20 backdrop-blur-sm border border-gray-700/20 group-hover:border-cyan-400/30 transition-all duration-300">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/images/hashblue.svg"
                alt="Erick Reis Logo"
                width={36}
                height={36}
                className="brightness-125"
              />
            </motion.div>
            <div className="text-left hidden sm:block">
              <h3 className="text-base sm:text-lg font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
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
                className={`
                  px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 border
                  ${
                    isActive
                      ? "text-cyan-400 bg-cyan-400/10 border-cyan-400/20"
                      : "text-gray-300 hover:text-white hover:bg-white/5 border-transparent"
                  }
                  focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
                `}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                {item.name}
              </motion.button>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <motion.div
          className="hidden lg:flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ImprovedButton
            href="/docs/curriculo-erick-reis.pdf"
            variant="outline"
            size="sm"
            icon={<Download className="w-4 h-4" />}
          >
            CV
          </ImprovedButton>
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <ImprovedButton
            href="/docs/curriculo-erick-reis.pdf"
            variant="outline"
            size="sm"
            icon={<Download className="w-4 h-4" />}
          >
            CV
          </ImprovedButton>
          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileMenuToggle}
            className="w-10 h-10 rounded-xl text-white/80 hover:text-white bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
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
            className="absolute top-full left-0 right-0 bg-gray-950/95 backdrop-blur-xl border-b border-gray-800/50 lg:hidden overflow-hidden"
          >
            <nav className="p-4 space-y-2">
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
                    className={`
                      w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 border
                      ${
                        isActive
                          ? "text-cyan-400 bg-cyan-400/10 border-cyan-400/20"
                          : "text-gray-300 hover:text-white hover:bg-white/5 border-transparent"
                      }
                      focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
                    `}
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
                <ImprovedButton
                  href="/docs/curriculo-erick-reis.pdf"
                  variant="outline"
                  className="w-full justify-center"
                  icon={<Download className="w-4 h-4" />}
                >
                  BAIXAR CV
                </ImprovedButton>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Hero Content
const HeroContent = ({ onExploreClick }: { onExploreClick: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: "power2.out" }
      );

      gsap.fromTo(
        ".hero-action-button",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          delay: 2,
          ease: "back.out(1.7)",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleContactClick = () => {
    // Navega para a seção de contato
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen pt-20 overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
    >
      {/* Background Effects */}
      <PremiumBackground intensity="high" />
      <TechGrid />
      <TechParticles />

      {/* Conteúdo Principal */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-grow flex flex-col justify-center">
        {/* Título */}
        <HeroText />

        {/* Subtítulo */}
        <motion.div
          className="hero-subtitle max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light leading-relaxed">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Transformo visões ambiciosas em soluções digitais com tecnologia
              de ponta
            </span>
          </p>
        </motion.div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <motion.div
            className="hero-action-button"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <ImprovedButton
              onClick={handleContactClick}
              variant="primary"
              icon={<Mail className="w-5 h-5" />}
            >
              INICIAR PROJETO
            </ImprovedButton>
          </motion.div>

          <motion.div
            className="hero-action-button"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            <ImprovedButton
              href="/docs/curriculo-erick-reis.pdf"
              variant="outline"
              icon={<Download className="w-5 h-5" />}
            >
              BAIXAR CV
            </ImprovedButton>
          </motion.div>
        </div>

        {/* Scroll Indicator Centralizado */}
        <motion.div
          className="hero-action-button flex flex-col items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
        >
          <motion.button
            onClick={onExploreClick}
            className="flex flex-col items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-lg p-2"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-medium">Explorar Mais</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-10 h-10 rounded-full border border-cyan-400/30 flex items-center justify-center group-hover:border-cyan-400/50 transition-colors"
            >
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export const HeroSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleActiveSection = () => {
      const sections = ["hero", "about", "skills", "projects", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        const scrollPadding = 100; // Offset para considerar o header fixo

        return rect.top <= scrollPadding && rect.bottom >= scrollPadding;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleActiveSection);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleActiveSection);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Offset para o header fixo
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="relative">
      <RefinedHeader
        isScrolled={isScrolled}
        activeSection={activeSection}
        onNavClick={scrollToSection}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <HeroContent onExploreClick={() => scrollToSection("about")} />
    </div>
  );
};
