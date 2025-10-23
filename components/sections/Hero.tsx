"use client";

import Link from "next/link";
import {
  Download,
  Mail,
  Cpu,
  CircuitBoard,
  Binary,
  Cog,
  Sparkles,
} from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import MotionDiv from "@/components/ui/MotionDiv";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Otimização: useCallback para evitar recriações desnecessárias
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Mouse move effect otimizado - MOVIDO PARA FORA DO useEffect
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isMobile) {
        const x = (e.clientX / window.innerWidth - 0.5) * 25;
        const y = (e.clientY / window.innerHeight - 0.5) * 25;
        setMousePosition({ x, y });
      }
    },
    [isMobile]
  );

  useEffect(() => {
    setMounted(true);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  // Efeito de partículas otimizado
  useEffect(() => {
    if (!mounted || !particlesRef.current) return;

    const particles = particlesRef.current;

    const createParticle = (type: string, styles: any) => {
      const particle = document.createElement("div");
      Object.assign(particle.style, styles);
      particle.className = `particle particle-${type}`;
      return particle;
    };

    const particleConfig = {
      circles: isMobile ? 12 : 30,
      tech: isMobile ? 8 : 20,
      connections: isMobile ? 6 : 15,
    };

    particles.innerHTML = "";

    // Partículas circulares
    for (let i = 0; i < particleConfig.circles; i++) {
      const size = Math.random() * (isMobile ? 4 : 8) + 2;
      particles.appendChild(
        createParticle("circle", {
          width: `${size}px`,
          height: `${size}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `radial-gradient(circle, 
          rgba(59, 130, 246, ${0.7 + Math.random() * 0.3}) 0%, 
          rgba(37, 99, 235, ${0.5 + Math.random() * 0.3}) 100%)`,
          animation: `float ${Math.random() * 10 + 8}s infinite ease-in-out ${
            Math.random() * 5
          }s`,
          filter: `blur(${Math.random() * 2 + 1}px)`,
        })
      );
    }

    // Conexões de rede
    for (let i = 0; i < particleConfig.connections; i++) {
      particles.appendChild(
        createParticle("connection", {
          width: `${Math.random() * (isMobile ? 60 : 120) + 30}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          transform: `rotate(${Math.random() * 360}deg)`,
          background: `linear-gradient(90deg, 
          transparent 0%, 
          rgba(59, 130, 246, ${0.3 + Math.random() * 0.3}) 50%, 
          transparent 100%)`,
          animation: `connection-pulse ${
            Math.random() * 8 + 6
          }s infinite ease-in-out ${Math.random() * 3}s`,
        })
      );
    }

    return () => {
      particles.innerHTML = "";
    };
  }, [mounted, isMobile]);

  // Efeitos de animação principal otimizados
  useEffect(() => {
    if (!mounted || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // Configuração de performance
      gsap.config({
        force3D: true,
        autoSleep: 60,
      });

      const masterTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Animação de entrada sequencial
      masterTimeline
        .fromTo(
          ".hero-bg-elements",
          { opacity: 0 },
          { opacity: 1, duration: 1.5 }
        )
        .fromTo(
          ".title-line-1",
          {
            y: isMobile ? 60 : 120,
            opacity: 0,
            rotationX: 45,
            filter: "blur(10px)",
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "back.out(1.7)",
          },
          "+=0.2"
        )
        .fromTo(
          ".title-line-2",
          {
            y: isMobile ? 60 : 120,
            opacity: 0,
            rotationX: -45,
            filter: "blur(10px)",
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "back.out(1.7)",
          },
          "-=0.8"
        )
        .fromTo(
          ".hero-description",
          {
            y: 50,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
          },
          "-=0.6"
        )
        .fromTo(
          ".name-badge",
          {
            scale: 0,
            opacity: 0,
            rotationY: 90,
          },
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            duration: 0.8,
            ease: "back.out(2)",
          },
          "-=0.4"
        )
        .fromTo(
          ".cta-primary",
          {
            y: 60,
            opacity: 0,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
          },
          "-=0.3"
        )
        .fromTo(
          ".cta-secondary",
          {
            y: 60,
            opacity: 0,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
          },
          "-=0.5"
        );

      // Animações contínuas apenas para desktop
      if (!isMobile) {
        // Floating elements com física mais realista
        gsap.to(".floating-tech", {
          y: "random(-30, 30)",
          x: "random(-20, 20)",
          rotation: "random(-5, 5)",
          duration: "random(8, 12)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.5,
        });

        // Efeito de respiração nos stats
        gsap.to(".stat-item", {
          y: -10,
          scale: 1.05,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 1,
        });
      }

      // Efeito de pulso sutil nos CTAs
      gsap.to(".cta-button", {
        scale: 1.02,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    // Adiciona event listener para mouse move
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      ctx.revert();
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [mounted, isMobile, handleMouseMove]); // Adicionado handleMouseMove como dependência

  // Efeito de parallax suave
  const parallaxStyle = !isMobile
    ? {
        transform: `translate3d(${mousePosition.x * 0.3}px, ${
          mousePosition.y * 0.3
        }px, 0)`,
        transition: "transform 0.1s ease-out",
      }
    : {};

  const statsParallaxStyle = !isMobile
    ? {
        transform: `translate3d(${mousePosition.x * 0.1}px, ${
          mousePosition.y * 0.1
        }px, 0)`,
      }
    : {};

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Loading state otimizado
  if (!mounted) {
    return (
      <section className="min-h-screen relative overflow-hidden bg-slate-950 pt-20 pb-20 md:pt-32 md:pb-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="min-h-[70vh] md:min-h-[75vh] flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl animate-pulse mx-auto" />
              <div className="h-8 w-64 bg-slate-800 rounded animate-pulse mx-auto" />
              <div className="h-4 w-48 bg-slate-800 rounded animate-pulse mx-auto" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const statsData = [
    {
      number: "50+",
      label: "Projetos Concluídos",
      icon: "🚀",
      color: "from-blue-400 to-cyan-400",
      gradient: "bg-gradient-to-r from-blue-400 to-cyan-400",
    },
    {
      number: "5+",
      label: "Anos de Experiência",
      icon: "💎",
      color: "from-purple-400 to-pink-400",
      gradient: "bg-gradient-to-r from-purple-400 to-pink-400",
    },
    {
      number: "100%",
      label: "Qualidade Garantida",
      icon: "⭐",
      color: "from-amber-400 to-yellow-400",
      gradient: "bg-gradient-to-r from-amber-400 to-yellow-400",
    },
  ];

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen relative overflow-hidden bg-slate-950 pt-20 pb-20 md:pt-32 md:pb-32"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Elements Otimizados */}
      <div className="hero-bg-elements">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/10" />

        <div
          ref={particlesRef}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Elementos Tech Flutuantes com Performance */}
        {!isMobile && (
          <div className="floating-elements">
            <div className="absolute top-32 left-10 floating-tech">
              <CircuitBoard className="h-16 w-16 text-blue-400/40 animate-pulse" />
            </div>
            <div className="absolute top-48 right-20 floating-tech">
              <Binary
                className="h-12 w-12 text-purple-400/40 animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
            <div className="absolute bottom-48 left-20 floating-tech">
              <Cog
                className="h-14 w-14 text-cyan-400/40 animate-pulse"
                style={{ animationDelay: "2s" }}
              />
            </div>
            <div className="absolute bottom-32 right-10 floating-tech">
              <Cpu
                className="h-10 w-10 text-green-400/40 animate-pulse"
                style={{ animationDelay: "1.5s" }}
              />
            </div>
          </div>
        )}

        {/* Efeitos de Luz com Performance */}
        <div className="light-effects">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
          <div
            className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "4s" }}
          />
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="min-h-[70vh] md:min-h-[75vh] flex items-center">
          <div className="text-center w-full">
            {/* Título Principal com Efeitos */}
            <div ref={titleRef} className="main-title mb-8 md:mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white mb-6 md:mb-12 leading-tight">
                <span className="title-line-1 block bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-4 md:mb-6">
                  IDEIAS EXTRAORDINÁRIAS
                </span>
                <span className="title-line-2 block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent relative">
                  CÓDIGO EXCEPCIONAL
                  {/* Efeito de brilho no título */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-cyan-400/0 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-1000" />
                </span>
              </h1>
            </div>

            {/* Descrição Dinâmica */}
            <MotionDiv
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hero-description mb-8 md:mb-12"
            >
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-sans font-light max-w-4xl mx-auto leading-relaxed px-4 md:px-0">
                Transformo{" "}
                <span className="text-blue-300 font-semibold relative inline-block">
                  <span className="relative z-10">visões ambiciosas</span>
                  <Sparkles className="absolute -top-2 -right-2 h-3 w-3 text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>{" "}
                em{" "}
                <span className="text-purple-300 font-semibold relative inline-block group">
                  <span className="relative z-10">soluções digitais</span>
                </span>{" "}
                com{" "}
                <span className="text-cyan-300 font-semibold relative inline-block group">
                  <span className="relative z-10">tecnologia de ponta</span>
                </span>
                {!isMobile && (
                  <>
                    {" "}
                    e{" "}
                    <span className="text-green-300 font-semibold relative inline-block group">
                      <span className="relative z-10">performance máxima</span>
                    </span>
                  </>
                )}
              </p>
            </MotionDiv>

            {/* Badge Interativa */}
            <div className="name-badge mb-8 md:mb-12">
              <div
                className="inline-flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6 bg-white/5 backdrop-blur-xl rounded-2xl px-6 py-4 md:px-8 md:py-5 border border-white/10 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105 group cursor-pointer"
                style={parallaxStyle}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                  <span className="text-sm md:text-base font-sans font-medium text-white/70">
                    Desenvolvido por
                  </span>
                </div>
                <div className="hidden sm:block h-6 w-px bg-white/20" />
                <span className="text-lg md:text-xl font-heading font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                  Érick Reis
                </span>
                <div className="hidden sm:block h-6 w-px bg-white/20" />
                <div className="flex items-center space-x-2 group-hover:scale-110 transition-transform duration-300">
                  <Cpu className="h-4 w-4 text-blue-400" />
                  <span className="text-xs md:text-sm font-mono font-medium text-blue-400 uppercase tracking-wider">
                    Fullstack
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs com Efeitos Avançados */}
            <div className="cta-section mb-12 md:mb-20">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4 md:px-0">
                <Button
                  asChild
                  size={isMobile ? "default" : "lg"}
                  className="cta-button cta-primary group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-heading font-bold text-base md:text-lg px-8 md:px-16 py-6 md:py-8 rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105 border-0 overflow-hidden"
                  style={parallaxStyle}
                >
                  <Link href="#contact">
                    <Mail className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    INICIAR PROJETO
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size={isMobile ? "default" : "lg"}
                  className="cta-button cta-secondary group relative bg-white/10 backdrop-blur-lg border-white/30 text-white hover:bg-white/20 font-heading font-semibold text-base md:text-lg px-6 md:px-14 py-6 md:py-8 rounded-2xl shadow-2xl hover:shadow-white/40 transition-all duration-500 hover:scale-105 overflow-hidden"
                  style={parallaxStyle}
                >
                  <a href="/docs/curriculo-erick-reis.pdf" download>
                    <Download className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    BAIXAR CV
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Stats Responsivos */}
            <div className={`stats-container ${isMobile ? "px-4" : ""}`}>
              <div
                className={
                  isMobile
                    ? "grid grid-cols-3 gap-4"
                    : "hidden lg:flex flex-col items-end space-y-12 absolute right-8 top-1/2 -translate-y-1/2"
                }
              >
                {statsData.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`stat-item group cursor-pointer transition-all duration-500 hover:scale-110 ${
                      isMobile ? "text-center" : "text-right"
                    }`}
                    style={isMobile ? {} : statsParallaxStyle}
                  >
                    <div
                      className={`${
                        isMobile
                          ? "mb-2"
                          : "flex items-center justify-end space-x-3 mb-3"
                      }`}
                    >
                      <div
                        className={`text-2xl ${
                          isMobile ? "mx-auto" : ""
                        } group-hover:scale-110 transition-transform duration-300`}
                      >
                        {stat.icon}
                      </div>
                    </div>
                    <div
                      className={`${
                        stat.color
                      } bg-clip-text text-transparent font-heading font-bold ${
                        isMobile ? "text-2xl mb-1" : "text-3xl mb-2"
                      } group-hover:scale-105 transition-transform duration-300`}
                    >
                      {stat.number}
                    </div>
                    <div
                      className={`text-white/80 font-sans ${
                        isMobile
                          ? "text-xs"
                          : "text-sm max-w-[140px] ml-auto leading-relaxed"
                      } group-hover:text-white transition-colors duration-300`}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator Melhorado */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center space-y-3 group cursor-pointer transition-all duration-300 hover:scale-110"
          aria-label="Scroll para a próxima seção"
        >
          <span className="text-white/70 text-xs font-mono font-light tracking-widest group-hover:text-white transition-colors duration-300">
            EXPLORAR
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-blue-400 to-transparent relative overflow-hidden">
            <div className="absolute top-0 w-full h-6 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full animate-bounce group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300" />
          </div>
        </button>
      </div>
    </section>
  );
};
