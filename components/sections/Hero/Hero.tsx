"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Download, Mail, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PremiumBackground } from "@/components/layout/PremiumBackground";
import { LazyComponent } from "@/components/optimization/LazyComponent";
import { LazyBackground } from "@/components/optimization/LazyBackground";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";

// Componente de Partículas (agora compartilhado com o Header)
const TechParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particlesContainer = containerRef.current;
    const particles: HTMLDivElement[] = [];

    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className =
        "absolute text-xs font-mono text-tech-cyan-400 opacity-20 pointer-events-none z-40";

      const codeChars = ["{", "}", "<", ">", "/", ";", "=", "()", "=>"];
      particle.textContent =
        codeChars[Math.floor(Math.random() * codeChars.length)];

      // Partículas começam desde o topo (incluindo área do header)
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      particlesContainer.appendChild(particle);
      particles.push(particle);

      gsap.to(particle, {
        opacity: 0.6,
        y: -150, // Movimento mais longo para passar pelo header
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 180,
        duration: Math.random() * 4 + 3,
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

    const interval = setInterval(createParticle, 200); // Mais partículas
    return () => {
      clearInterval(interval);
      particles.forEach((particle) => particle.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-40"
    />
  );
};

// Grid Tecnológico (compartilhado)
const TechGrid = () => {
  return (
    <LazyComponent animation="fadeIn" delay={100}>
      <div className="absolute inset-0 pointer-events-none opacity-5 z-30">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_99%,rgba(6,182,212,0.1)_100%)] bg-[length:100px_100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_99%,rgba(6,182,212,0.1)_100%)] bg-[length:100px_100px]" />
      </div>
    </LazyComponent>
  );
};

// Background Interativo (compartilhado)
const InteractiveBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;

      containerRef.current.style.background = `
        radial-gradient(circle at ${x}% ${y}%, 
          rgba(6, 182, 212, 0.1) 0%,
          rgba(59, 130, 246, 0.05) 30%,
          transparent 70%
        )
      `;
    };

    let throttled = false;
    const throttledMouseMove = (e: MouseEvent) => {
      if (!throttled) {
        handleMouseMove(e);
        throttled = true;
        setTimeout(() => {
          throttled = false;
        }, 16);
      }
    };

    window.addEventListener("mousemove", throttledMouseMove);
    return () => window.removeEventListener("mousemove", throttledMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 transition-all duration-1000 ease-out pointer-events-none z-20"
    />
  );
};

// Texto Hero Animado
const AnimatedHeroText = () => {
  const textRef = useRef<HTMLDivElement>(null);

  const titleLines = useMemo(
    () => ["IDEIAS EXTRAORDINÁRIAS", "CÓDIGO EXCEPCIONAL", "RESULTADOS REAIS"],
    []
  );

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
          rotationY: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          rotationY: 0,
          duration: 1,
          stagger: 0.03,
          ease: "back.out(1.7)",
          delay: 0.5,
        }
      );
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <LazyComponent animation="fadeUp" delay={200}>
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
                  className="hero-char inline-block mx-0.5 sm:mx-1 transition-all duration-300 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent hover:scale-110 hover:text-tech-cyan-300 transform-style-preserve-3d"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </motion.div>
          ))}
        </h1>
      </div>
    </LazyComponent>
  );
};

// Typewriter Subtitle
const TypewriterSubtitle = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = useMemo(
    () =>
      "Transformo visões ambiciosas em soluções digitais com tecnologia de ponta",
    []
  );

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <LazyComponent animation="fadeUp" delay={300}>
      <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light leading-relaxed min-h-[120px] flex items-center justify-center">
        <span className="bg-gradient-to-r from-tech-cyan-400 to-tech-blue-400 bg-clip-text text-transparent">
          {displayText}
          <span className="animate-pulse">|</span>
        </span>
      </p>
    </LazyComponent>
  );
};

// Live Stats
const LiveStats = () => {
  const [projects, setProjects] = useState(0);
  const [experience, setExperience] = useState(0);
  const [clients, setClients] = useState(0);

  const stats = useMemo(
    () => [
      { value: projects, label: "Projetos", suffix: "+" },
      { value: experience, label: "Anos Exp", suffix: "+" },
      { value: clients, label: "Clientes", suffix: "+" },
    ],
    [projects, experience, clients]
  );

  useEffect(() => {
    const animateValue = (
      setter: React.Dispatch<React.SetStateAction<number>>,
      end: number,
      duration: number
    ) => {
      let start = 0;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setter(end);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    animateValue(setProjects, 50, 2000);
    animateValue(setExperience, 5, 1800);
    animateValue(setClients, 30, 2200);
  }, []);

  return (
    <LazyComponent animation="fadeUp" delay={400}>
      <motion.div
        className="flex justify-center gap-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
      >
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl sm:text-3xl font-black text-tech-cyan-400">
              {stat.value}
              {stat.suffix}
            </div>
            <div className="text-sm text-tech-cyan-300 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </LazyComponent>
  );
};

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero = ({ onExploreClick }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  usePerformanceMonitor("HeroSection");

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 2.5, ease: "power2.out" }
      );

      gsap.fromTo(
        ".hero-action-button",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          delay: 3,
          ease: "back.out(1.7)",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-tech-blue-900 to-tech-cyan-900"
    >
      {/* Background compartilhado com Header */}
      <div className="absolute inset-0 z-10">
        <LazyBackground priority="high">
          <PremiumBackground intensity="high" />
        </LazyBackground>
      </div>

      {/* Elementos visuais compartilhados */}
      <TechGrid />
      <TechParticles />
      <InteractiveBackground />

      {/* Header fixo - agora parte do Hero visualmente */}

      {/* Conteúdo Principal (abaixo do header) */}
      <div className="relative z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-center min-h-screen">
        {/* Título */}
        <AnimatedHeroText />

        {/* Subtítulo com Typewriter */}
        <motion.div
          className="hero-subtitle max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <TypewriterSubtitle />
        </motion.div>

        {/* Estatísticas em Tempo Real */}
        <LiveStats />

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <motion.div
            className="hero-action-button"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3 }}
          >
            <Button
              onClick={handleContactClick}
              variant="premium"
              size="xl"
              className="gap-3"
            >
              <Mail className="w-5 h-5" />
              INICIAR PROJETO
            </Button>
          </motion.div>

          <motion.div
            className="hero-action-button"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.2 }}
          >
            <Button
              variant="neon"
              size="xl"
              className="gap-3"
              onClick={() =>
                window.open("/docs/curriculo-erick-reis.pdf", "_blank")
              }
            >
              <Download className="w-5 h-5" />
              BAIXAR CV
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="hero-action-button flex flex-col items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.4 }}
        >
          <motion.button
            onClick={onExploreClick}
            className="flex flex-col items-center gap-2 text-tech-cyan-400 hover:text-tech-cyan-300 transition-colors group focus:outline-none focus:ring-2 focus:ring-tech-cyan-500 rounded-lg p-2"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-medium">Explorar Mais</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-10 h-10 rounded-full border border-tech-cyan-400/30 flex items-center justify-center group-hover:border-tech-cyan-400/50 transition-colors"
            >
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
