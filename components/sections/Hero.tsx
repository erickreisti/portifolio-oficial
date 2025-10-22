"use client";

import Link from "next/link";
import {
  Download,
  Mail,
  Cpu,
  Zap,
  Globe,
  CircuitBoard,
  Binary,
  Cog,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import MotionDiv from "@/components/ui/MotionDiv";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Efeito de partículas tech mais evidentes
  useEffect(() => {
    const particles = particlesRef.current;
    if (!particles) return;

    // Partículas circulares tradicionais - MAIS BRILHANTES
    for (let i = 0; i < 35; i++) {
      const particle = document.createElement("div");
      particle.className = "particle particle-circle";
      particle.style.width = `${Math.random() * 8 + 3}px`;
      particle.style.height = particle.style.width;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.background = `radial-gradient(circle, rgba(59, 130, 246, 0.9) 0%, rgba(37, 99, 235, 0.7) 100%)`;
      particle.style.animation = `float ${
        Math.random() * 8 + 6
      }s infinite ease-in-out ${Math.random() * 3}s`;
      particles.appendChild(particle);
    }

    // Partículas tech (linhas, triângulos, quadrados) - MAIS BRILHANTES
    for (let i = 0; i < 25; i++) {
      const techParticle = document.createElement("div");
      const types = ["line", "triangle", "square"];
      const type = types[Math.floor(Math.random() * types.length)];

      techParticle.className = `particle particle-tech particle-${type}`;
      techParticle.style.left = `${Math.random() * 100}%`;
      techParticle.style.top = `${Math.random() * 100}%`;
      techParticle.style.animation = `tech-float ${
        Math.random() * 12 + 8
      }s infinite ease-in-out ${Math.random() * 5}s`;

      particles.appendChild(techParticle);
    }

    // Partículas de conexão (linhas entre partículas) - MAIS BRILHANTES
    for (let i = 0; i < 20; i++) {
      const connection = document.createElement("div");
      connection.className = "particle-connection";
      connection.style.width = `${Math.random() * 100 + 60}px`;
      connection.style.left = `${Math.random() * 100}%`;
      connection.style.top = `${Math.random() * 100}%`;
      connection.style.transform = `rotate(${Math.random() * 360}deg)`;
      connection.style.animation = `connection-pulse ${
        Math.random() * 6 + 4
      }s infinite ease-in-out ${Math.random() * 2}s`;
      particles.appendChild(connection);
    }

    return () => {
      if (particles) particles.innerHTML = "";
    };
  }, []);

  // Efeitos de animação
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animação da chamada principal
      tl.fromTo(
        ".main-cta",
        { y: 100, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" }
      )
        .fromTo(
          ".hero-description",
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
          "-=1.0"
        )
        .fromTo(
          ".name-badge",
          { y: -40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "back.out(1.5)" },
          "-=0.8"
        )
        .fromTo(
          ".cta-buttons",
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: "power2.out" },
          "-=0.6"
        )
        .fromTo(
          ".hero-stats",
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
          "-=0.4"
        );

      // Animação contínua dos elementos flutuantes
      gsap.to(".floating-tech", {
        y: 30,
        rotation: 5,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.6,
      });

      // Animação zigue-zague para stats
      gsap.to(".stat-item", {
        y: -15,
        x: 10,
        rotation: 2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.8,
          from: "random",
        },
      });

      // Animação mais complexa para stats (zigue-zague)
      gsap.to(".stat-item", {
        keyframes: {
          "0%": { y: 0, x: 0, rotation: 0 },
          "25%": { y: -12, x: 8, rotation: 1 },
          "50%": { y: -8, x: -6, rotation: -1 },
          "75%": { y: -15, x: 4, rotation: 2 },
          "100%": { y: 0, x: 0, rotation: 0 },
        },
        duration: 6,
        repeat: -1,
        ease: "sine.inOut",
        stagger: {
          each: 0.5,
          from: "random",
        },
      });
    }, heroRef);

    // Efeito de movimento do mouse
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 25,
        y: (e.clientY / window.innerHeight - 0.5) * 25,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Função para scroll suave até a seção about
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen relative overflow-hidden bg-slate-950 pt-32 pb-32" // Aumentado pb para mais espaço
    >
      {/* Background Gradiente Acentuado */}
      <div className="gradient-bg gradient-shift absolute inset-0 bg-gradient-to-br from-slate-800/30 via-slate-900/40 to-slate-700/20" />

      {/* Partículas Tech - MAIS BRILHANTES */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Elementos Tech Flutuantes */}
      <div className="absolute top-32 left-10 floating-tech">
        <CircuitBoard className="h-16 w-16 text-blue-400/40" />
      </div>
      <div
        className="absolute top-48 right-20 floating-tech"
        style={{ animationDelay: "1s" }}
      >
        <Binary className="h-12 w-12 text-purple-400/40" />
      </div>
      <div
        className="absolute bottom-48 left-20 floating-tech"
        style={{ animationDelay: "2s" }}
      >
        <Cog className="h-14 w-14 text-cyan-400/40" />
      </div>
      <div
        className="absolute bottom-32 right-10 floating-tech"
        style={{ animationDelay: "1.5s" }}
      >
        <Cpu className="h-10 w-10 text-green-400/40" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="min-h-[75vh] flex items-center justify-between">
          {" "}
          {/* Altura reduzida para mais espaço abaixo */}
          {/* Conteúdo Principal (Esquerda) */}
          <div className="text-center lg:text-left w-full lg:w-2/3">
            {/* CHAMADA PRINCIPAL (MAIOR DESTAQUE) */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="main-cta mb-16"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black text-white mb-12 leading-tight">
                <span className="block bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-6">
                  IDEIAS EXTRAORDINÁRIAS
                </span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent text-5xl sm:text-6xl lg:text-7xl">
                  CÓDIGO EXCEPCIONAL
                </span>
              </h1>
            </MotionDiv>

            {/* Descrição Impactante */}
            <MotionDiv
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="hero-description mb-10"
            >
              <p className="text-2xl sm:text-3xl text-white/90 font-sans font-light max-w-3xl leading-relaxed">
                Transformo{" "}
                <span className="text-blue-300 font-semibold">
                  visões ambiciosas
                </span>{" "}
                em{" "}
                <span className="text-purple-300 font-semibold">
                  soluções digitais
                </span>{" "}
                com{" "}
                <span className="text-cyan-300 font-semibold">
                  tecnologia de ponta
                </span>{" "}
                e{" "}
                <span className="text-green-300 font-semibold">
                  performance máxima
                </span>
              </p>
            </MotionDiv>

            {/* Nome com Badge Integrado */}
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="name-badge mb-10"
            >
              <div className="inline-flex items-center space-x-6 bg-white/5 backdrop-blur-lg rounded-2xl px-8 py-4 border border-white/10 shadow-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-lg font-sans font-medium text-white/70">
                    Desenvolvido por
                  </span>
                </div>
                <div className="h-6 w-px bg-white/20" />
                <span className="text-xl font-heading font-bold text-white">
                  Érick Reis
                </span>
                <div className="h-6 w-px bg-white/20" />
                <div className="flex items-center space-x-2">
                  <Cpu className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-mono font-medium text-blue-400 uppercase tracking-wider">
                    Fullstack
                  </span>
                </div>
              </div>
            </MotionDiv>

            {/* CTAs com Máximo Destaque */}
            <MotionDiv
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="cta-buttons mb-24" // Aumentado significativamente o margin-bottom
            >
              <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
                <Button
                  asChild
                  size="lg"
                  className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-heading font-bold text-lg px-14 py-7 rounded-2xl shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:scale-105 border-0 pulse-glow overflow-hidden"
                  style={{
                    transform: `translate(${mousePosition.x * 0.3}px, ${
                      mousePosition.y * 0.3
                    }px)`,
                  }}
                >
                  <Link href="#contact">
                    <Mail className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    INICIAR PROJETO
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="group relative bg-white/15 backdrop-blur-md border-white/30 text-white hover:bg-white/25 font-heading font-semibold text-lg px-12 py-7 rounded-2xl shadow-2xl hover:shadow-white/20 transition-all duration-500 hover:scale-105 overflow-hidden"
                  style={{
                    transform: `translate(${mousePosition.x * 0.2}px, ${
                      mousePosition.y * 0.2
                    }px)`,
                  }}
                >
                  <a href="/docs/curriculo-erick-reis.pdf" download>
                    <Download className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    VER PORTFÓLIO
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl" />
                  </a>
                </Button>
              </div>
            </MotionDiv>
          </div>
          {/* Stats em Coluna (Direita) com animação zigue-zague */}
          <MotionDiv
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="hero-stats hidden lg:flex flex-col items-end justify-center space-y-16 w-1/3 pr-8" // Aumentado space-y
          >
            {[
              {
                number: "50+",
                label: "Projetos Concluídos",
                icon: "🚀",
                delay: 0,
              },
              {
                number: "5+",
                label: "Anos de Experiência",
                icon: "💎",
                delay: 0.3,
              },
              {
                number: "100%",
                label: "Qualidade Garantida",
                icon: "⭐",
                delay: 0.6,
              },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="stat-item group cursor-pointer opacity-80 hover:opacity-100 transition-all duration-300 text-right floating-stat"
                style={{
                  transform: `translate(${mousePosition.x * 0.1}px, ${
                    mousePosition.y * 0.1
                  }px)`,
                  animationDelay: `${stat.delay}s`,
                }}
              >
                <div className="flex items-center justify-end space-x-4 mb-3">
                  <div className="text-2xl group-hover:scale-110 transition-transform duration-300 stat-icon">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-heading font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-white/60 font-sans text-sm group-hover:text-white/80 transition-colors duration-300 max-w-[140px] ml-auto">
                  {stat.label}
                </div>
              </div>
            ))}
          </MotionDiv>
        </div>
      </div>

      {/* Scroll Indicator Tech - Mais espaço acima */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30">
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center space-y-3 group cursor-pointer transition-all duration-300 hover:scale-110"
          aria-label="Scroll para a seção About"
        >
          <span className="text-white/60 text-xs font-mono font-light tracking-widest group-hover:text-white transition-colors duration-300">
            EXPLORAR MAIS
          </span>
          <div className="w-px h-20 bg-gradient-to-b from-blue-400/80 to-transparent relative group-hover:from-blue-300 transition-colors duration-300">
            <div className="absolute top-0 w-1 h-6 bg-blue-400 rounded-full animate-bounce pulse-glow group-hover:bg-blue-300 transition-colors duration-300" />
          </div>
        </button>
      </div>

      {/* Efeitos de Luz Tech */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
    </section>
  );
};
