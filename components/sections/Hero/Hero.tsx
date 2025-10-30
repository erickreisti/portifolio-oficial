"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  Download,
  Mail,
  ArrowDown,
  Sparkles,
  Rocket,
  Target,
  Award,
  Clock,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PremiumBackground } from "@/components/layout/PremiumBackground";
import { LazyComponent } from "@/components/optimization/LazyComponent";
import { LazyBackground } from "@/components/optimization/LazyBackground";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";

// 🔥 PARTÍCULAS ESPETACULARES PARA O HERO
const TechParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particlesContainer = containerRef.current;
    const particles: HTMLDivElement[] = []; // ✅ Tipo explícito adicionado

    // Tipos de partículas tech
    const particleTypes = [
      {
        type: "code",
        content: [
          "</>",
          "{}",
          "=>",
          "()",
          "[]",
          "fn",
          "const",
          "let",
          "export",
          "import",
        ],
        color: "text-cyan-400",
      },
      {
        type: "tech",
        content: [
          "React",
          "Next.js",
          "Node.js",
          "TypeScript",
          "Tailwind",
          "PostgreSQL",
        ],
        color: "text-blue-400",
      },
      {
        type: "symbols",
        content: ["⚡", "🚀", "💻", "🎯", "🔥", "🌟", "💫", "✨"],
        color: "text-yellow-400",
      },
    ];

    const createParticle = () => {
      const particleType =
        particleTypes[Math.floor(Math.random() * particleTypes.length)];
      const content =
        particleType.content[
          Math.floor(Math.random() * particleType.content.length)
        ];

      const particle = document.createElement("div");
      particle.className = `absolute font-mono pointer-events-none transition-all duration-1000 ${
        particleType.type === "symbols"
          ? "text-2xl opacity-70"
          : "text-sm opacity-50 font-bold"
      } ${particleType.color}`;

      particle.textContent = content;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.fontSize = `${Math.random() * 14 + 10}px`;
      particle.style.opacity = `${Math.random() * 0.6 + 0.2}`;
      particle.style.zIndex = "1";

      particlesContainer.appendChild(particle);
      particles.push(particle);

      // Configurações de animação únicas para cada partícula
      const duration = Math.random() * 8 + 4;
      const rotation = Math.random() * 360 - 180;
      const scale = Math.random() * 0.5 + 0.5;

      // Animação principal
      gsap.to(particle, {
        y: -Math.random() * 300 - 100,
        x: Math.random() * 200 - 100,
        rotation: rotation,
        scale: scale,
        opacity: 0.8,
        duration: duration,
        ease: "power1.out",
        onComplete: () => {
          gsap.to(particle, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
              particle.remove();
              const index = particles.indexOf(particle);
              if (index > -1) particles.splice(index, 1);
            },
          });
        },
      });

      // Animação de pulsação adicional
      gsap.to(particle, {
        scale: scale * 1.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    };

    // Criar partículas em intervalos diferentes para densidade
    const intervals = [
      setInterval(createParticle, 80), // Partículas rápidas
      setInterval(createParticle, 150), // Partículas médias
      setInterval(createParticle, 300), // Partículas lentas
    ];

    // Partículas especiais (maiores e mais visíveis)
    const createSpecialParticle = () => {
      const specialParticle = document.createElement("div");
      specialParticle.className =
        "absolute text-cyan-300 text-xl font-bold font-mono pointer-events-none";
      specialParticle.textContent = ["⚡", "🚀", "💻"][
        Math.floor(Math.random() * 3)
      ];
      specialParticle.style.left = `${Math.random() * 100}%`;
      specialParticle.style.top = `${Math.random() * 100}%`;
      specialParticle.style.opacity = "0";
      specialParticle.style.zIndex = "2";

      particlesContainer.appendChild(specialParticle);
      particles.push(specialParticle);

      gsap.to(specialParticle, {
        y: -400,
        x: Math.random() * 200 - 100,
        rotation: 360,
        opacity: 1,
        scale: 2,
        duration: 6,
        ease: "power2.out",
        onComplete: () => {
          specialParticle.remove();
          const index = particles.indexOf(specialParticle);
          if (index > -1) particles.splice(index, 1);
        },
      });
    };

    const specialInterval = setInterval(createSpecialParticle, 2000);

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
      clearInterval(specialInterval);
      particles.forEach((particle) => particle.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    />
  );
};

// 🔥 PARTÍCULAS DE CÓDIGO FLUTUANTE
const FloatingCodeParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Linhas de código flutuantes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-cyan-400/30 font-mono text-sm whitespace-nowrap"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 2,
          }}
        >
          {
            [
              "const developer = new FullStackEngineer();",
              "async function createMagic() { ... }",
              "export default function AmazingProject() { ... }",
              "interface Innovation { ideas: string[] }",
              "type TechStack = 'Next.js' | 'React' | 'Node.js';",
              "while(!success) { tryAgain(); }",
              "const excellence = await achievePerfection();",
              "export const creativity = infinite;",
            ][i]
          }
        </motion.div>
      ))}
    </div>
  );
};

// 🔥 EFEITO DE CONEXÕES ENTRE PARTÍCULAS
const ParticleConnections = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configurar canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Interface para as partículas
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    // Partículas para conexões
    const particles: Particle[] = []; // ✅ Tipo explícito adicionado
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Atualizar e desenhar partículas
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Rebater nas bordas
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Desenhar partícula
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6, 182, 212, 0.3)";
        ctx.fill();
      });

      // Desenhar conexões
      ctx.strokeStyle = "rgba(6, 182, 212, 0.1)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

// Texto Hero com Efeito Máquina de Escrever
const TypewriterHeroText = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentLine, setCurrentLine] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const lines = useMemo(
    () => ["IDEIAS EXTRAORDINÁRIAS", "CÓDIGO EXCEPCIONAL", "RESULTADOS REAIS"],
    []
  );

  useEffect(() => {
    const currentLineText = lines[currentLine];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText.length === currentLineText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setCurrentLine((prev) => (prev + 1) % lines.length);
    } else {
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
                  className="inline-block mx-0.5 sm:mx-1 transition-all duration-300 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent hover:scale-110 hover:text-cyan-300"
                  initial={{ y: 100, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
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

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light min-h-[60px] flex items-center justify-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
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
        transition={{ duration: 1, delay: 2.5, ease: "easeOut" }}
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
        transition={{ delay: 3, ease: "easeOut" }}
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
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">
              {stat.value}
              {stat.suffix}
            </div>
            <div className="text-sm text-cyan-300 font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </LazyComponent>
  );
};

// Botões de Ação
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
        transition={{ duration: 0.8, delay: 3.5, ease: "easeOut" }}
      >
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </Button>
        </motion.div>

        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
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

// Scroll Indicator
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
        transition={{ duration: 0.8, delay: 4, ease: "easeOut" }}
      >
        <motion.button
          onClick={onExploreClick}
          className="flex flex-col items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg p-2"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span className="text-sm font-medium">
            Explorar Mais
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-10 h-10 rounded-full border border-cyan-400/30 flex items-center justify-center group-hover:border-cyan-400/50 transition-colors relative"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-full border border-cyan-400/20"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.button>
      </motion.div>
    </LazyComponent>
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
      const tl = gsap.timeline();

      // Animação mais dramática para o background
      tl.fromTo(
        ".hero-bg-element",
        { opacity: 0, scale: 1.2 },
        { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }
      );

      // Animação escalonada mais impressionante
      tl.fromTo(
        ".hero-content-element",
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.3,
          ease: "back.out(1.7)",
        },
        "-=1.5"
      );

      // Efeito de brilho pulsante no background
      gsap.to(".hero-bg-element", {
        opacity: 0.8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const headerHeight = 80;
      const elementPosition = contactSection.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gray-950 section-with-header"
    >
      {/* 🔥 BACKGROUND COM MULTIPLAS CAMADAS DE PARTÍCULAS */}
      <div className="hero-bg-element">
        <LazyBackground priority="high">
          <PremiumBackground intensity="high" />
        </LazyBackground>
      </div>

      {/* 🔥 CAMADAS DE PARTÍCULAS */}
      <div className="hero-bg-element">
        <ParticleConnections />
      </div>

      <div className="hero-bg-element">
        <TechParticles />
      </div>

      <div className="hero-bg-element">
        <FloatingCodeParticles />
      </div>

      {/* 🔥 EFEITO DE GRADIENTE DINÂMICO */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 animate-pulse" />

      {/* CONTEÚDO PRINCIPAL */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-center min-h-screen z-10">
        <div className="hero-content-element">
          <TypewriterHeroText />
        </div>

        <div className="hero-content-element">
          <AnimatedSubtitle />
        </div>

        <div className="hero-content-element">
          <LiveStats />
        </div>

        <div className="hero-content-element">
          <AnimatedActionButtons onContactClick={handleContactClick} />
        </div>

        <div className="hero-content-element">
          <AnimatedScrollIndicator onExploreClick={onExploreClick} />
        </div>
      </div>

      {/* 🔥 EFEITO DE BRILHO NAS BORDAS */}
      <div className="absolute inset-0 border-2 border-cyan-500/10 rounded-none pointer-events-none" />
    </section>
  );
};

export default Hero;
