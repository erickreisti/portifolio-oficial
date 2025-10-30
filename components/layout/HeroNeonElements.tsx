"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import {
  Rocket,
  Code,
  Globe,
  Database,
  Server,
  Smartphone,
  Zap,
  Sparkles,
  Cpu,
  Binary,
  CircuitBoard,
  Satellite,
  Atom,
  CpuIcon,
} from "lucide-react";
import { LazyComponent } from "@/components/optimization/LazyComponent";

/* ---------------- NEON ELEMENT ESPECIAL PARA HERO ---------------- */
// Versão mais elaborada e impactante para a primeira impressão
const HeroNeonElement: React.FC<{
  Icon: any;
  position: string;
  color: string;
  delay?: number;
  size?: "sm" | "md" | "lg";
  pulseIntensity?: "low" | "medium" | "high";
}> = ({
  Icon,
  position,
  color,
  delay = 0,
  size = "md",
  pulseIntensity = "medium",
}) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(elementRef, { once: true, amount: 0.1 });
  const [isHovered, setIsHovered] = useState(false);

  // Tamanhos personalizados para o Hero
  const sizeClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
  };

  // Intensidade do pulso
  const pulseClasses = {
    low: "opacity-40",
    medium: "opacity-60",
    high: "opacity-80",
  };

  useEffect(() => {
    if (!isInView || !elementRef.current || !glowRef.current) return;

    const ctx = gsap.context(() => {
      // Animação de entrada mais dramática
      gsap.fromTo(
        elementRef.current!,
        {
          opacity: 0,
          scale: 0,
          y: 150,
          rotation: -360,
          filter: "blur(20px)",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "back.out(2)",
          delay: delay * 0.2,
        }
      );

      // Animação de flutuação mais pronunciada
      gsap.to(elementRef.current!, {
        y: -25,
        rotation: 8,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: delay * 0.3,
      });

      // Efeito de glow pulsante
      gsap.to(glowRef.current!, {
        scale: 1.5,
        opacity: 0.8,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: delay * 0.4,
      });

      // Efeito de brilho intermitente
      gsap.to(elementRef.current!, {
        filter: "drop-shadow(0 0 15px currentColor)",
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: delay * 0.5,
      });
    }, elementRef);

    return () => ctx.revert();
  }, [isInView, delay]);

  // Efeito de hover
  useEffect(() => {
    if (!elementRef.current) return;

    if (isHovered) {
      gsap.to(elementRef.current, {
        scale: 1.3,
        rotation: 15,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(elementRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    }
  }, [isHovered]);

  return (
    <LazyComponent animation="fadeIn" delay={delay * 100}>
      <div
        ref={elementRef}
        className={`absolute ${position} pointer-events-none cursor-pointer transition-all duration-500 ${sizeClasses[size]} ${pulseClasses[pulseIntensity]}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          filter: "drop-shadow(0 0 10px currentColor)",
        }}
      >
        {/* Glow effect */}
        <div
          ref={glowRef}
          className={`absolute inset-0 rounded-full blur-xl ${color} opacity-30 -z-10`}
          style={{
            width: "200%",
            height: "200%",
            top: "-50%",
            left: "-50%",
          }}
        />

        {/* Ícone principal */}
        <Icon className={`${color} drop-shadow-2xl`} />

        {/* Partículas orbitais (apenas para elementos grandes) */}
        {size === "lg" && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${color} opacity-70`}
                style={{
                  top: "50%",
                  left: "50%",
                }}
                animate={{
                  x: [0, Math.cos(i * 120) * 30, 0],
                  y: [0, Math.sin(i * 120) * 30, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 1.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        )}
      </div>
    </LazyComponent>
  );
};

/* ---------------- ELEMENTOS DE CÓDIGO FLUTUANTE ---------------- */
// Partículas de código que se movem pela tela
const FloatingCodeParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-cyan-400/40 font-mono text-sm font-bold whitespace-nowrap"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -200, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 0.8, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut",
          }}
        >
          {
            [
              "⚡ FULLSTACK",
              "🚀 NEXT.JS",
              "💻 REACT",
              "🔷 TYPESCRIPT",
              "📱 NODE.JS",
              "🎯 TAILWIND",
              "⚛️ INNOVATION",
              "🌟 CREATIVE",
              "🚀 PERFORMANCE",
              "💫 EXCELLENCE",
              "🔥 PASSION",
              "🎨 DESIGN",
            ][i]
          }
        </motion.div>
      ))}
    </div>
  );
};

/* ---------------- LINHAS DE CONEXÃO DINÂMICAS ---------------- */
// Cria uma rede de conexões entre os elementos
const DynamicConnections: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Partículas para as conexões
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }

    const particles: Particle[] = [];
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 3 + 1,
        color:
          i % 3 === 0
            ? "rgba(6, 182, 212, 0.6)"
            : i % 3 === 1
            ? "rgba(37, 99, 235, 0.4)"
            : "rgba(168, 85, 247, 0.3)",
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

        // Desenhar partícula com glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Efeito de glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = particle.color
          .replace("0.6", "0.2")
          .replace("0.4", "0.1")
          .replace("0.3", "0.1");
        ctx.fill();
      });

      // Desenhar conexões com efeito mais visível
      ctx.strokeStyle = "rgba(6, 182, 212, 0.15)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]); // Linha tracejada

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.setLineDash([]); // Reset do dash
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

/* ---------------- NEON ELEMENTS ESPECIAL PARA HERO ---------------- */
export const HeroNeonElements: React.FC = () => {
  // Elementos principais - mais elaborados e diversos
  const heroNeonElements = [
    // Elementos grandes e centrais
    {
      Icon: Rocket,
      position: "top-20 left-10",
      color: "text-cyan-400",
      delay: 0,
      size: "lg" as const,
      pulseIntensity: "high" as const,
    },
    {
      Icon: Atom,
      position: "top-32 right-16",
      color: "text-blue-400",
      delay: 1,
      size: "lg" as const,
      pulseIntensity: "high" as const,
    },
    {
      Icon: CircuitBoard,
      position: "bottom-40 left-20",
      color: "text-purple-400",
      delay: 2,
      size: "lg" as const,
      pulseIntensity: "high" as const,
    },
    {
      Icon: Satellite,
      position: "bottom-32 right-24",
      color: "text-cyan-400",
      delay: 3,
      size: "lg" as const,
      pulseIntensity: "high" as const,
    },

    // Elementos médios
    {
      Icon: Zap,
      position: "top-48 left-1/4",
      color: "text-yellow-400",
      delay: 4,
      size: "md" as const,
      pulseIntensity: "medium" as const,
    },
    {
      Icon: Binary,
      position: "top-40 right-1/3",
      color: "text-green-400",
      delay: 5,
      size: "md" as const,
      pulseIntensity: "medium" as const,
    },
    {
      Icon: CpuIcon,
      position: "bottom-48 left-1/3",
      color: "text-red-400",
      delay: 6,
      size: "md" as const,
      pulseIntensity: "medium" as const,
    },
    {
      Icon: Sparkles,
      position: "bottom-36 right-1/4",
      color: "text-cyan-400",
      delay: 7,
      size: "md" as const,
      pulseIntensity: "medium" as const,
    },

    // Elementos pequenos (background)
    {
      Icon: Code,
      position: "top-16 right-32",
      color: "text-cyan-300",
      delay: 8,
      size: "sm" as const,
      pulseIntensity: "low" as const,
    },
    {
      Icon: Server,
      position: "bottom-24 left-32",
      color: "text-blue-300",
      delay: 9,
      size: "sm" as const,
      pulseIntensity: "low" as const,
    },
    {
      Icon: Database,
      position: "top-56 left-40",
      color: "text-purple-300",
      delay: 10,
      size: "sm" as const,
      pulseIntensity: "low" as const,
    },
    {
      Icon: Globe,
      position: "bottom-52 right-40",
      color: "text-cyan-300",
      delay: 11,
      size: "sm" as const,
      pulseIntensity: "low" as const,
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Camada 1: Conexões dinâmicas */}
      <DynamicConnections />

      {/* Camada 2: Partículas de código */}
      <FloatingCodeParticles />

      {/* Camada 3: Elementos neon principais */}
      {heroNeonElements.map((element, idx) => (
        <HeroNeonElement key={`hero-neon-${idx}`} {...element} />
      ))}

      {/* Camada 4: Efeito de brilho global */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 animate-pulse" />
    </div>
  );
};

export default HeroNeonElements;
