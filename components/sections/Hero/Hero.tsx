"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Download, Mail, ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PremiumBackground } from "@/components/layout/PremiumBackground";
import { LazyComponent } from "@/components/optimization/LazyComponent";
import { LazyBackground } from "@/components/optimization/LazyBackground";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";

// Componente de Partículas Otimizado
const TechParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particlesContainer = containerRef.current;
    const particles: HTMLDivElement[] = [];

    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className =
        "absolute text-xs font-mono text-tech-cyan-400 opacity-40 pointer-events-none z-40";

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
        "[]",
        "fn",
        "const",
        "let",
      ];
      particle.textContent =
        codeChars[Math.floor(Math.random() * codeChars.length)];

      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.fontSize = `${Math.random() * 12 + 10}px`;
      particle.style.opacity = `${Math.random() * 0.6 + 0.2}`;
      particle.style.zIndex = "40";

      particlesContainer.appendChild(particle);
      particles.push(particle);

      const duration = Math.random() * 4 + 3;
      const rotation = Math.random() * 360 - 180;

      gsap.to(particle, {
        y: -200,
        x: Math.random() * 100 - 50,
        rotation: rotation,
        opacity: 0.8,
        duration: duration,
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

    const interval = setInterval(createParticle, 150);
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

// Grid Tecnológico Dinâmico
const DynamicTechGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const grid = gridRef.current;

    gsap.to(grid, {
      backgroundPosition: "100px 100px",
      duration: 20,
      repeat: -1,
      ease: "none",
    });
  }, []);

  return (
    <LazyComponent animation="fadeIn" delay={100}>
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none opacity-5 z-30"
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 99%, rgba(6,182,212,0.1) 100%),
            linear-gradient(180deg, transparent 99%, rgba(6,182,212,0.1) 100%)
          `,
          backgroundSize: "100px 100px",
        }}
      />
    </LazyComponent>
  );
};

// Background Interativo com Mouse
const InteractiveBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;

      gsap.to(containerRef.current, {
        background: `
          radial-gradient(circle at ${x}% ${y}%, 
            rgba(6, 182, 212, 0.1) 0%,
            rgba(59, 130, 246, 0.05) 30%,
            transparent 70%
          )
        `,
        duration: 0.5,
        ease: "power2.out",
      });
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

// Texto Hero com Efeito Máquina de Escrever
const TypewriterHeroText = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentLine, setCurrentLine] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const lines = useMemo(
    () => ["VISÃO ESTRATÉGICA", "ENGENHARIA DE PONTA", "RESULTADOS CONCRETOS"],
    []
  );

  useEffect(() => {
    const currentLineText = lines[currentLine];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText.length === currentLineText.length) {
      // Pausa no final da linha
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length === 0) {
      // Move para a próxima linha
      setIsDeleting(false);
      setCurrentLine((prev) => (prev + 1) % lines.length);
    } else {
      // Digitação ou deleção
      const speed = isDeleting ? 50 : 100;
      const nextText = isDeleting
        ? currentLineText.slice(0, displayText.length - 1)
        : currentLineText.slice(0, displayText.length + 1);

      timeout = setTimeout(() => setDisplayText(nextText), speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentLine, lines]);

  return (
    <LazyComponent animation="fadeUp" delay={200}>
      <div className="text-center w-full mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
          {lines.map((line, lineIndex) => (
            <motion.div
              key={lineIndex}
              className="overflow-hidden mb-2 sm:mb-4"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.3 + lineIndex * 0.2,
                ease: "easeOut",
              }}
            >
              {line.split("").map((char, charIndex) => (
                <motion.span
                  key={`${lineIndex}-${charIndex}`}
                  className="inline-block mx-0.5 sm:mx-1 transition-all duration-300 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent hover:scale-110 hover:text-tech-cyan-300"
                  initial={{
                    y: 100,
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + lineIndex * 0.3 + charIndex * 0.03,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.2,
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>
          ))}
        </h1>

        {/* Linha atual da máquina de escrever */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light min-h-[60px] flex items-center justify-center">
            <span className="bg-gradient-to-r from-tech-cyan-400 to-tech-blue-400 bg-clip-text text-transparent">
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="ml-1"
              >
                |
              </motion.span>
            </span>
          </p>
        </motion.div>
      </div>
    </LazyComponent>
  );
};

// Subtítulo Animado
const AnimatedSubtitle = () => {
  const fullText =
    "Transformo visões ambiciosas em soluções digitais com tecnologia de ponta";
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, fullText]);

  return (
    <LazyComponent animation="fadeUp" delay={300}>
      <motion.p
        className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 2.5,
          ease: "easeOut",
        }}
      >
        {displayText}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="ml-1"
        >
          |
        </motion.span>
      </motion.p>
    </LazyComponent>
  );
};

// Estatísticas Animadas
const LiveStats = () => {
  const [projects, setProjects] = useState(0);
  const [experience, setExperience] = useState(0);
  const [clients, setClients] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);

  const stats = useMemo(
    () => [
      { value: projects, label: "Projetos", suffix: "+" },
      { value: experience, label: "Anos Exp", suffix: "+" },
      { value: clients, label: "Clientes", suffix: "+" },
      { value: satisfaction, label: "Satisfação", suffix: "%" },
    ],
    [projects, experience, clients, satisfaction]
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
    animateValue(setSatisfaction, 100, 2500);
  }, []);

  return (
    <LazyComponent animation="fadeUp" delay={400}>
      <motion.div
        className="flex justify-center gap-6 sm:gap-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 3,
          ease: "easeOut",
        }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 3.2 + index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{ scale: 1.1, y: -5 }}
          >
            <div className="text-2xl sm:text-3xl font-black text-tech-cyan-400">
              {stat.value}
              {stat.suffix}
            </div>
            <div className="text-sm text-tech-cyan-300 font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </LazyComponent>
  );
};

// Botões de Ação com Animação Contínua
const AnimatedActionButtons = ({
  onContactClick,
}: {
  onContactClick: () => void;
}) => {
  return (
    <LazyComponent animation="fadeUp" delay={500}>
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 3.5,
          ease: "easeOut",
        }}
      >
        {/* Botão Principal com Efeito Pulsante Contínuo */}
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Button
            onClick={onContactClick}
            variant="premium"
            size="xl"
            className="gap-3 relative overflow-hidden group"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Mail className="w-5 h-5" />
            </motion.div>
            INICIAR PROJETO
            {/* Efeito de brilho contínuo */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </Button>
        </motion.div>

        {/* Botão Secundário com Flutuação Suave */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Button
            variant="neon"
            size="xl"
            className="gap-3"
            onClick={() =>
              window.open("/docs/curriculo-erick-reis.pdf", "_blank")
            }
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Download className="w-5 h-5" />
            </motion.div>
            BAIXAR CV
          </Button>
        </motion.div>
      </motion.div>
    </LazyComponent>
  );
};

// Scroll Indicator com Animação Contínua
const AnimatedScrollIndicator = ({
  onExploreClick,
}: {
  onExploreClick: () => void;
}) => {
  return (
    <LazyComponent animation="fadeUp" delay={600}>
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 4,
          ease: "easeOut",
        }}
      >
        <motion.button
          onClick={onExploreClick}
          className="flex flex-col items-center gap-2 text-tech-cyan-400 hover:text-tech-cyan-300 transition-colors group focus:outline-none focus:ring-2 focus:ring-tech-cyan-500 rounded-lg p-2"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span className="text-sm font-medium">
            Explorar Mais
          </motion.span>

          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-10 h-10 rounded-full border border-tech-cyan-400/30 flex items-center justify-center group-hover:border-tech-cyan-400/50 transition-colors relative"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.div>

            {/* Pulsar externo */}
            <motion.div
              className="absolute inset-0 rounded-full border border-tech-cyan-400/20"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.button>
      </motion.div>
    </LazyComponent>
  );
};

// Elementos Flutuantes Neon
const FloatingNeonElements = () => {
  const elements = [
    { id: 1, x: "10%", y: "20%", delay: 0 },
    { id: 2, x: "85%", y: "30%", delay: 1 },
    { id: 3, x: "15%", y: "70%", delay: 2 },
    { id: 4, x: "90%", y: "80%", delay: 3 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{ left: element.x, top: element.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="w-6 h-6 text-tech-cyan-400 opacity-50" />
        </motion.div>
      ))}
    </div>
  );
};

// Interface Principal do Hero
interface HeroProps {
  onExploreClick: () => void;
}

export const Hero = ({ onExploreClick }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  usePerformanceMonitor("HeroSection");

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animação de entrada em cascata
      const tl = gsap.timeline();

      // Background elements primeiro
      tl.fromTo(
        ".hero-bg-element",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
      );

      // Conteúdo principal
      tl.fromTo(
        ".hero-content-element",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // Elementos interativos
      tl.fromTo(
        ".hero-interactive-element",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.3"
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
      className="relative min-h-screen overflow-hidden bg-gray-950" // Fundo escuro sólido
    >
      {/* Background Effects - COM FUNDO ESCURO CORRETO */}
      <div className="hero-bg-element">
        <LazyBackground priority="high">
          <PremiumBackground intensity="high" />
        </LazyBackground>
      </div>

      <div className="hero-bg-element">
        <DynamicTechGrid />
      </div>

      <div className="hero-bg-element">
        <TechParticles />
      </div>

      <div className="hero-bg-element">
        <InteractiveBackground />
      </div>

      <FloatingNeonElements />

      {/* Conteúdo Principal */}
      <div className="relative z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-center min-h-screen">
        {/* Título com Máquina de Escrever */}
        <div className="hero-content-element">
          <TypewriterHeroText />
        </div>

        {/* Subtítulo Animado */}
        <div className="hero-content-element">
          <AnimatedSubtitle />
        </div>

        {/* Estatísticas em Tempo Real */}
        <div className="hero-content-element">
          <LiveStats />
        </div>

        {/* Botões de Ação com Animações Contínuas */}
        <div className="hero-interactive-element">
          <AnimatedActionButtons onContactClick={handleContactClick} />
        </div>

        {/* Scroll Indicator com Animação Contínua */}
        <div className="hero-interactive-element">
          <AnimatedScrollIndicator onExploreClick={onExploreClick} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
