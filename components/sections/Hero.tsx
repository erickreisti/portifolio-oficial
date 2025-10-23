"use client";

import Link from "next/link";
import { Download, Mail, Cpu, CircuitBoard, Binary, Cog } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import MotionDiv from "@/components/ui/MotionDiv";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Efeito de partículas otimizado
  useEffect(() => {
    if (!mounted) return;

    const particles = particlesRef.current;
    if (!particles) return;

    const createParticles = (
      circleCount: number,
      techCount: number,
      connectionCount: number
    ) => {
      // Limpar partículas existentes
      particles.innerHTML = "";

      // Partículas circulares
      for (let i = 0; i < circleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "particle particle-circle";
        particle.style.width = `${Math.random() * 6 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.background = `radial-gradient(circle, rgba(59, 130, 246, 0.9) 0%, rgba(37, 99, 235, 0.7) 100%)`;
        particle.style.animation = `float ${
          Math.random() * 8 + 6
        }s infinite ease-in-out ${Math.random() * 3}s`;
        particles.appendChild(particle);
      }

      // Partículas tech
      for (let i = 0; i < techCount; i++) {
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

      // Conexões
      for (let i = 0; i < connectionCount; i++) {
        const connection = document.createElement("div");
        connection.className = "particle-connection";
        connection.style.width = `${Math.random() * 80 + 40}px`;
        connection.style.left = `${Math.random() * 100}%`;
        connection.style.top = `${Math.random() * 100}%`;
        connection.style.transform = `rotate(${Math.random() * 360}deg)`;
        connection.style.animation = `connection-pulse ${
          Math.random() * 6 + 4
        }s infinite ease-in-out ${Math.random() * 2}s`;
        particles.appendChild(connection);
      }
    };

    // Responsive particles
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        createParticles(15, 12, 8);
      } else {
        createParticles(25, 18, 12);
      }
    }

    return () => {
      if (particles) particles.innerHTML = "";
    };
  }, [mounted]);

  // Efeitos de animação melhorados
  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Timeline principal com sequência mais impressionante
      const masterTimeline = gsap.timeline();

      // 1. Fade in do background e partículas
      masterTimeline.fromTo(
        ".hero-bg-elements",
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" }
      );

      // 2. Animação em cascata do título principal
      masterTimeline.fromTo(
        ".title-line-1",
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotationX: 90,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          transformOrigin: "center bottom",
        },
        "+=0.2"
      );

      masterTimeline.fromTo(
        ".title-line-2",
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotationX: -90,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.4,
          ease: "back.out(1.7)",
          transformOrigin: "center top",
        },
        "-=0.8"
      );

      // 3. Descrição com efeito de digitação
      masterTimeline.fromTo(
        ".hero-description",
        {
          y: 60,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power2.out",
        },
        "-=0.6"
      );

      // 4. Badge com efeito de surgimento
      masterTimeline.fromTo(
        ".name-badge",
        {
          scale: 0,
          opacity: 0,
          rotationY: 180,
        },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: 0.9,
          ease: "back.out(1.8)",
        },
        "-=0.4"
      );

      // 5. Botões com efeito de escada
      masterTimeline.fromTo(
        ".cta-primary",
        {
          y: 80,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3"
      );

      masterTimeline.fromTo(
        ".cta-secondary",
        {
          y: 80,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // 6. Stats com efeito de flutuação
      masterTimeline.fromTo(
        ".hero-stats",
        {
          x: 100,
          opacity: 0,
          scale: 0.9,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // 7. Scroll indicator com delay
      masterTimeline.fromTo(
        ".scroll-indicator",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "+=0.5"
      );

      // Animações contínuas após a entrada
      gsap.to(".floating-tech", {
        y: 30,
        rotation: 5,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.8,
          from: "random",
        },
      });

      // Animação mais complexa para stats
      gsap.to(".stat-item", {
        keyframes: {
          "0%": {
            y: 0,
            x: 0,
            rotation: 0,
            scale: 1,
          },
          "25%": {
            y: -15,
            x: 10,
            rotation: 1,
            scale: 1.02,
          },
          "50%": {
            y: -10,
            x: -8,
            rotation: -1,
            scale: 1.01,
          },
          "75%": {
            y: -18,
            x: 6,
            rotation: 2,
            scale: 1.03,
          },
          "100%": {
            y: 0,
            x: 0,
            rotation: 0,
            scale: 1,
          },
        },
        duration: 8,
        repeat: -1,
        ease: "sine.inOut",
        stagger: {
          each: 0.6,
          from: "random",
        },
      });

      // Efeito de pulso sutil nos botões
      gsap.to(".cta-primary, .cta-secondary", {
        scale: 1.02,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    }, heroRef);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mounted]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (!mounted) {
    return (
      <section className="min-h-screen relative overflow-hidden bg-slate-950 pt-32 pb-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="min-h-[75vh] flex items-center justify-center">
            <div className="text-center">
              <div className="h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl animate-pulse mx-auto mb-4" />
              <div className="h-8 w-64 bg-slate-800 rounded animate-pulse mx-auto" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen relative overflow-hidden bg-slate-950 pt-32 pb-32"
    >
      {/* Background Elements */}
      <div className="hero-bg-elements">
        <div className="gradient-bg gradient-shift absolute inset-0 bg-gradient-to-br from-slate-800/40 via-slate-900/50 to-slate-700/30" />

        <div
          ref={particlesRef}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Elementos Tech Flutuantes */}
        <div className="absolute top-32 left-10 floating-tech">
          <CircuitBoard className="h-16 w-16 text-blue-400/50" />
        </div>
        <div
          className="absolute top-48 right-20 floating-tech"
          style={{ animationDelay: "1s" }}
        >
          <Binary className="h-12 w-12 text-purple-400/50" />
        </div>
        <div
          className="absolute bottom-48 left-20 floating-tech"
          style={{ animationDelay: "2s" }}
        >
          <Cog className="h-14 w-14 text-cyan-400/50" />
        </div>
        <div
          className="absolute bottom-32 right-10 floating-tech"
          style={{ animationDelay: "1.5s" }}
        >
          <Cpu className="h-10 w-10 text-green-400/50" />
        </div>

        {/* Efeitos de Luz com Animação */}
        <div
          className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "10s", animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "12s", animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="min-h-[75vh] flex items-center justify-between">
          <div className="text-center lg:text-left w-full lg:w-2/3">
            {/* Título Principal com Animação em Cascata */}
            <div className="main-cta mb-16">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black text-white mb-12 leading-tight">
                <span className="title-line-1 block bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-6">
                  IDEIAS EXTRAORDINÁRIAS
                </span>
                <span className="title-line-2 block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent text-5xl sm:text-6xl lg:text-7xl">
                  CÓDIGO EXCEPCIONAL
                </span>
              </h1>
            </div>

            {/* Descrição com Efeito de Destaque */}
            <MotionDiv
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="hero-description mb-10"
            >
              <p className="text-2xl sm:text-3xl text-white/90 font-sans font-light max-w-3xl leading-relaxed">
                Transformo{" "}
                <span className="text-blue-300 font-semibold relative">
                  <span className="relative z-10">visões ambiciosas</span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-400/30 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
                </span>{" "}
                em{" "}
                <span className="text-purple-300 font-semibold relative">
                  <span className="relative z-10">soluções digitais</span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-400/30 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
                </span>{" "}
                com{" "}
                <span className="text-cyan-300 font-semibold relative">
                  <span className="relative z-10">tecnologia de ponta</span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-cyan-400/30 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
                </span>{" "}
                e{" "}
                <span className="text-green-300 font-semibold relative">
                  <span className="relative z-10">performance máxima</span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-green-400/30 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
                </span>
              </p>
            </MotionDiv>

            {/* Badge com Efeito de Cartão */}
            <div className="name-badge mb-10">
              <div className="inline-flex items-center space-x-6 bg-white/5 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/10 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 group">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-lg font-sans font-medium text-white/70">
                    Desenvolvido por
                  </span>
                </div>
                <div className="h-6 w-px bg-white/20" />
                <span className="text-xl font-heading font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                  Érick Reis
                </span>
                <div className="h-6 w-px bg-white/20" />
                <div className="flex items-center space-x-2">
                  <Cpu className="h-4 w-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-mono font-medium text-blue-400 uppercase tracking-wider group-hover:text-blue-300 transition-colors duration-300">
                    Fullstack
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs com Efeitos Melhorados */}
            <div className="cta-buttons mb-24">
              <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
                <Button
                  asChild
                  size="lg"
                  className="cta-primary group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-heading font-bold text-lg px-14 py-7 rounded-2xl shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 hover:scale-110 border-0 overflow-hidden"
                  style={{
                    transform: `translate(${mousePosition.x * 0.3}px, ${
                      mousePosition.y * 0.3
                    }px)`,
                  }}
                >
                  <Link href="#contact">
                    <Mail className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    INICIAR PROJETO
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="cta-secondary group relative bg-white/20 backdrop-blur-lg border-white/40 text-white hover:bg-white/30 font-heading font-semibold text-lg px-12 py-7 rounded-2xl shadow-2xl hover:shadow-white/30 transition-all duration-500 hover:scale-110 overflow-hidden"
                  style={{
                    transform: `translate(${mousePosition.x * 0.2}px, ${
                      mousePosition.y * 0.2
                    }px)`,
                  }}
                >
                  <a href="/docs/curriculo-erick-reis.pdf" download>
                    <Download className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    VER PORTFÓLIO
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Stats com Design Melhorado */}
          <div className="hero-stats hidden lg:flex flex-col items-end justify-center space-y-16 w-1/3 pr-8">
            {[
              {
                number: "50+",
                label: "Projetos Concluídos",
                icon: "🚀",
                delay: 0,
                color: "from-blue-400 to-cyan-400",
              },
              {
                number: "5+",
                label: "Anos de Experiência",
                icon: "💎",
                delay: 0.3,
                color: "from-purple-400 to-pink-400",
              },
              {
                number: "100%",
                label: "Qualidade Garantida",
                icon: "⭐",
                delay: 0.6,
                color: "from-amber-400 to-yellow-400",
              },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="stat-item group cursor-pointer opacity-90 hover:opacity-100 transition-all duration-300 text-right floating-stat"
                style={{
                  transform: `translate(${mousePosition.x * 0.1}px, ${
                    mousePosition.y * 0.1
                  }px)`,
                  animationDelay: `${stat.delay}s`,
                }}
              >
                <div className="flex items-center justify-end space-x-4 mb-3">
                  <div
                    className={`text-2xl group-hover:scale-110 transition-transform duration-300 stat-icon bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.icon}
                  </div>
                </div>
                <div
                  className={`text-3xl font-heading font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300`}
                >
                  {stat.number}
                </div>
                <div className="text-white/80 font-sans text-sm group-hover:text-white transition-colors duration-300 max-w-[140px] ml-auto leading-relaxed">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator Melhorado */}
      <div className="scroll-indicator absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30">
        <button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center space-y-3 group cursor-pointer transition-all duration-300 hover:scale-110"
          aria-label="Scroll para a seção About"
        >
          <span className="text-white/70 text-xs font-mono font-light tracking-widest group-hover:text-white transition-colors duration-300 group-hover:scale-105">
            EXPLORAR MAIS
          </span>
          <div className="w-px h-20 bg-gradient-to-b from-blue-400/90 to-transparent relative group-hover:from-cyan-400 transition-colors duration-300">
            <div className="absolute top-0 w-1 h-6 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full animate-bounce group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300" />
          </div>
        </button>
      </div>
    </section>
  );
};
