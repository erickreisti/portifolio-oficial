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

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

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

  // Efeito de partículas otimizado para mobile
  useEffect(() => {
    if (!mounted || !particlesRef.current) return;

    const particles = particlesRef.current;

    const createParticle = (type: string, styles: any, className = "") => {
      const particle = document.createElement("div");
      Object.assign(particle.style, styles);
      particle.className = `particle particle-${type} ${className}`;
      return particle;
    };

    const particleConfig = {
      circles: isMobile ? 15 : 50,
      connections: isMobile ? 8 : 25,
      stars: isMobile ? 10 : 20,
      clusters: isMobile ? 5 : 12,
    };

    particles.innerHTML = "";

    // Cores disponíveis para partículas
    const particleColors = [
      { name: "blue", class: "particle-blue" },
      { name: "purple", class: "particle-purple" },
      { name: "cyan", class: "particle-cyan" },
      { name: "pink", class: "particle-pink" },
      { name: "green", class: "particle-green" },
      { name: "amber", class: "particle-amber" },
    ];

    const shinyTypes = ["particle-shiny", "particle-fast", "particle-large"];

    // Partículas circulares coloridas
    for (let i = 0; i < particleConfig.circles; i++) {
      const size = Math.random() * (isMobile ? 4 : 10) + 2;
      const color =
        particleColors[Math.floor(Math.random() * particleColors.length)];
      const isShiny = Math.random() > 0.7;
      const shinyClass = isShiny
        ? shinyTypes[Math.floor(Math.random() * shinyTypes.length)]
        : "";

      particles.appendChild(
        createParticle(
          "circle",
          {
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            zIndex: Math.floor(Math.random() * 10),
          },
          `${color.class} ${shinyClass}`
        )
      );
    }

    // Partículas estrela brilhantes
    for (let i = 0; i < particleConfig.stars; i++) {
      const size = Math.random() * (isMobile ? 2 : 4) + 1;
      particles.appendChild(
        createParticle(
          "star",
          {
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            zIndex: Math.floor(Math.random() * 5),
          },
          "particle-star"
        )
      );
    }

    // Clusters de partículas
    for (let i = 0; i < particleConfig.clusters; i++) {
      const cluster = document.createElement("div");
      cluster.className = "particle-cluster";
      cluster.style.left = `${Math.random() * 100}%`;
      cluster.style.top = `${Math.random() * 100}%`;
      cluster.style.setProperty("--tx", `${Math.random() * 20 - 10}px`);
      cluster.style.setProperty("--ty", `${Math.random() * 20 - 10}px`);

      // Adicionar partículas ao cluster
      for (let j = 0; j < (isMobile ? 2 : 4); j++) {
        const size = Math.random() * 2 + 1;
        const color =
          particleColors[Math.floor(Math.random() * particleColors.length)];
        const miniParticle = createParticle(
          "mini",
          {
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 20 - 10}px`,
            top: `${Math.random() * 20 - 10}px`,
          },
          color.class
        );
        cluster.appendChild(miniParticle);
      }

      particles.appendChild(cluster);
    }

    // Conexões de rede coloridas (apenas desktop)
    if (!isMobile) {
      const connectionColors = [
        "particle-connection-blue",
        "particle-connection-purple",
        "particle-connection-cyan",
      ];

      for (let i = 0; i < particleConfig.connections; i++) {
        const colorClass =
          connectionColors[Math.floor(Math.random() * connectionColors.length)];
        particles.appendChild(
          createParticle(
            "connection",
            {
              width: `${Math.random() * 150 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            },
            colorClass
          )
        );
      }
    }

    // Partículas especiais grandes (apenas desktop)
    if (!isMobile) {
      for (let i = 0; i < 8; i++) {
        const size = Math.random() * 15 + 8;
        const color =
          particleColors[Math.floor(Math.random() * particleColors.length)];
        particles.appendChild(
          createParticle(
            "special",
            {
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            },
            `${color.class} particle-large`
          )
        );
      }
    }

    return () => {
      particles.innerHTML = "";
    };
  }, [mounted, isMobile]);

  // Efeitos de animação otimizados para mobile
  useEffect(() => {
    if (!mounted || !heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.config({
        force3D: true,
        autoSleep: 60,
      });

      const masterTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      masterTimeline
        .fromTo(
          ".hero-bg-elements",
          { opacity: 0 },
          { opacity: 1, duration: isMobile ? 1 : 1.5 }
        )
        .fromTo(
          ".title-line-1",
          {
            y: isMobile ? 40 : 120,
            opacity: 0,
            rotationX: isMobile ? 30 : 45,
            filter: "blur(10px)",
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            filter: "blur(0px)",
            duration: isMobile ? 0.8 : 1.2,
            ease: "back.out(1.7)",
          },
          "+=0.1"
        )
        .fromTo(
          ".title-line-2",
          {
            y: isMobile ? 40 : 120,
            opacity: 0,
            rotationX: isMobile ? -30 : -45,
            filter: "blur(10px)",
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            filter: "blur(0px)",
            duration: isMobile ? 1 : 1.4,
            ease: "back.out(1.7)",
          },
          isMobile ? "-=0.6" : "-=0.8"
        )
        .fromTo(
          ".hero-description",
          {
            y: isMobile ? 30 : 50,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: isMobile ? 0.7 : 1,
          },
          isMobile ? "-=0.4" : "-=0.6"
        )
        .fromTo(
          ".name-badge",
          {
            scale: 0,
            opacity: 0,
            rotationY: isMobile ? 45 : 90,
          },
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            duration: isMobile ? 0.6 : 0.8,
            ease: "back.out(2)",
          },
          isMobile ? "-=0.2" : "-=0.4"
        )
        .fromTo(
          ".cta-primary",
          {
            y: isMobile ? 40 : 60,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: isMobile ? 0.5 : 0.7,
          },
          isMobile ? "-=0.1" : "-=0.3"
        )
        .fromTo(
          ".cta-secondary",
          {
            y: isMobile ? 40 : 60,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: isMobile ? 0.5 : 0.7,
          },
          isMobile ? "-=0.3" : "-=0.5"
        );

      if (!isMobile) {
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

        gsap.to(".stat-item", {
          y: -10,
          scale: 1.05,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 1,
        });

        // Animação para partículas especiais
        gsap.to(".particle-large", {
          scale: "random(0.8, 1.2)",
          rotation: "random(-180, 180)",
          duration: "random(4, 8)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.5,
        });
      }

      // Efeito de pulso mais sutil em mobile
      gsap.to(".cta-button", {
        scale: isMobile ? 1.01 : 1.02,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Animação para clusters
      gsap.to(".particle-cluster", {
        x: "random(-10, 10)",
        y: "random(-10, 10)",
        duration: "random(6, 12)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1,
      });
    }, heroRef);

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      ctx.revert();
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [mounted, isMobile, handleMouseMove]);

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

  const statsData = [
    {
      number: "50+",
      label: "Projetos",
      icon: "🚀",
      color: "from-blue-400 to-cyan-400",
    },
    {
      number: "5+",
      label: "Anos Exp",
      icon: "💎",
      color: "from-green-400 to-emerald-400",
    },
    {
      number: "100%",
      label: "Qualidade",
      icon: "⭐",
      color: "from-amber-400 to-yellow-400",
    },
  ];

  if (!mounted) {
    return (
      <section className="min-h-screen relative overflow-hidden bg-slate-950 pt-16 pb-16 md:pt-32 md:pb-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="min-h-[70vh] md:min-h-[75vh] flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="h-12 w-12 md:h-16 md:w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl animate-pulse mx-auto" />
              <div className="h-6 w-48 md:h-8 md:w-64 bg-slate-800 rounded animate-pulse mx-auto" />
              <div className="h-3 w-32 md:h-4 md:w-48 bg-slate-800 rounded animate-pulse mx-auto" />
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
      className="min-h-screen relative overflow-hidden bg-slate-950 pt-16 pb-16 md:pt-32 md:pb-32"
    >
      {/* Background Elements - Otimizado para mobile COM MAIS PARTÍCULAS */}
      <div className="hero-bg-elements">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/10" />

        {/* Container de partículas - AGORA COM MAIS PARTÍCULAS */}
        <div
          ref={particlesRef}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        />

        {/* Elementos apenas para desktop */}
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

        {/* Efeitos de luz otimizados para mobile */}
        <div className="light-effects">
          <div
            className={`${
              isMobile ? "w-40 h-40 blur-2xl" : "w-80 h-80 blur-3xl"
            } absolute top-1/4 left-1/4 bg-blue-500/10 rounded-full animate-pulse-slow`}
          />
          <div
            className={`${
              isMobile ? "w-48 h-48 blur-2xl" : "w-96 h-96 blur-3xl"
            } absolute bottom-1/3 right-1/4 bg-purple-500/10 rounded-full animate-pulse-slow`}
            style={{ animationDelay: "2s" }}
          />
          {!isMobile && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"
              style={{ animationDelay: "4s" }}
            />
          )}
        </div>
      </div>

      {/* Conteúdo Principal - Totalmente responsivo */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-5 lg:px-8 relative z-10">
        <div className="min-h-[70vh] md:min-h-[75vh] flex flex-col lg:flex-row items-center justify-between">
          {/* Conteúdo de Texto e CTAs - Layout mobile otimizado */}
          <div className="text-center lg:text-left w-full lg:w-2/3 xl:w-3/4 lg:pr-8 xl:pr-16">
            {/* Título Principal - Tamanhos responsivos */}
            <div ref={titleRef} className="main-title mb-6 md:mb-12">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-black text-white mb-4 md:mb-10 leading-tight">
                <span className="title-line-1 block bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-3 md:mb-6">
                  IDEIAS EXTRAORDINÁRIAS
                </span>
                <span className="title-line-2 block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent relative text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                  CÓDIGO EXCEPCIONAL
                </span>
              </h1>
            </div>

            {/* Descrição - Texto adaptado para mobile */}
            <MotionDiv
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hero-description mb-6 md:mb-10"
            >
              <p className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl text-white/90 font-sans font-light max-w-2xl lg:max-w-2xl xl:max-w-3xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0">
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
                </span>
                {!isMobile && (
                  <>
                    {" "}
                    e{" "}
                    <span className="text-green-300 font-semibold">
                      performance máxima
                    </span>
                  </>
                )}
              </p>
            </MotionDiv>

            {/* Badge - Compacto no mobile */}
            <div className="name-badge mb-6 md:mb-10">
              <div
                className="inline-flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-6 bg-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl px-4 py-3 md:px-8 md:py-5 border border-white/10 shadow-xl md:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105 group cursor-pointer"
                style={parallaxStyle}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-ping" />
                  <span className="text-xs sm:text-sm md:text-base font-sans font-medium text-white/70">
                    Desenvolvido por
                  </span>
                </div>
                <div className="hidden sm:block h-4 md:h-6 w-px bg-white/20" />
                <span className="text-sm sm:text-base md:text-lg lg:text-xl font-heading font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                  Érick Reis
                </span>
                <div className="hidden sm:block h-4 md:h-6 w-px bg-white/20" />
                <div className="flex items-center space-x-1 md:space-x-2 group-hover:scale-110 transition-transform duration-300">
                  <Cpu className="h-3 w-3 md:h-4 md:w-4 text-blue-400" />
                  <span className="text-xs font-mono font-medium text-blue-400 uppercase tracking-wider">
                    Fullstack
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs - Botões empilhados no mobile */}
            <div className="cta-section mb-6 lg:mb-0">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6 w-full">
                <Button
                  asChild
                  size={isMobile ? "default" : "lg"}
                  className="cta-button cta-primary group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-heading font-bold text-sm sm:text-base md:text-lg w-full sm:w-auto px-6 md:px-14 py-4 md:py-7 rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105 border-0 overflow-hidden"
                  style={parallaxStyle}
                >
                  <Link href="#contact">
                    <Mail className="mr-2 h-4 w-4 md:mr-3 md:h-5 md:w-5 group-hover:scale-110 transition-transform duration-300" />
                    INICIAR PROJETO
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl md:rounded-2xl" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size={isMobile ? "default" : "lg"}
                  className="cta-button cta-secondary group relative bg-white/10 backdrop-blur-lg border-white/30 text-white hover:bg-white/20 font-heading font-semibold text-sm sm:text-base md:text-lg w-full sm:w-auto px-4 md:px-12 py-4 md:py-7 rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl hover:shadow-white/40 transition-all duration-500 hover:scale-105 overflow-hidden"
                  style={parallaxStyle}
                >
                  <a href="/docs/curriculo-erick-reis.pdf" download>
                    <Download className="mr-2 h-4 w-4 md:mr-3 md:h-5 md:w-5 group-hover:scale-110 transition-transform duration-300" />
                    BAIXAR CV
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl md:rounded-2xl" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Desktop */}
          {!isMobile && (
            <div className="hidden lg:flex flex-col justify-center space-y-12 lg:space-y-16 xl:space-y-20 w-1/4 xl:w-1/5 pl-8 border-l border-white/10">
              {statsData.map((stat, index) => (
                <div
                  key={stat.label}
                  className="stat-item group cursor-pointer transition-all duration-500 hover:scale-110 text-center lg:text-right"
                  style={statsParallaxStyle}
                >
                  <div className="flex lg:flex-col xl:flex-row items-center justify-end space-x-3 lg:space-x-0 xl:space-x-3 mb-3">
                    <div
                      className={`
                      text-2xl lg:text-3xl xl:text-2xl 
                      group-hover:scale-110 transition-transform duration-300
                      filter
                      ${
                        stat.icon === "🚀"
                          ? "drop-shadow-[0_0_20px_rgba(59,130,246,0.9)]"
                          : ""
                      }
                      ${
                        stat.icon === "💎"
                          ? "drop-shadow-[0_0_20px_rgba(34,197,94,0.9)]"
                          : ""
                      }
                      ${
                        stat.icon === "⭐"
                          ? "drop-shadow-[0_0_20px_rgba(234,179,8,0.9)]"
                          : ""
                      }
                    `}
                    >
                      {stat.icon}
                    </div>
                  </div>
                  <div
                    className={`${stat.color} bg-clip-text text-transparent font-heading font-bold text-3xl lg:text-4xl xl:text-3xl mb-2 group-hover:scale-105 transition-transform duration-300`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-white/80 font-sans text-sm lg:text-xs xl:text-sm group-hover:text-white transition-colors duration-300 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Mobile - Posicionado abaixo dos CTAs */}
        {isMobile && (
          <div className="mt-6 px-2">
            <div className="grid grid-cols-3 gap-3">
              {statsData.map((stat, index) => (
                <div
                  key={stat.label}
                  className="stat-item group cursor-pointer transition-all duration-500 hover:scale-105 text-center p-2"
                >
                  <div
                    className={`
                    text-xl mb-1 group-hover:scale-110 transition-transform duration-300
                    filter
                    ${
                      stat.icon === "🚀"
                        ? "drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]"
                        : ""
                    }
                    ${
                      stat.icon === "💎"
                        ? "drop-shadow-[0_0_12px_rgba(34,197,94,0.9)]"
                        : ""
                    }
                    ${
                      stat.icon === "⭐"
                        ? "drop-shadow-[0_0_12px_rgba(234,179,8,0.9)]"
                        : ""
                    }
                  `}
                  >
                    {stat.icon}
                  </div>
                  <div
                    className={`${stat.color} bg-clip-text text-transparent font-heading font-bold text-lg mb-1 group-hover:scale-105 transition-transform duration-300`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-white/80 font-sans text-xs group-hover:text-white transition-colors duration-300 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Scroll Indicator - Menor no mobile */}
      <div className="scroll-indicator absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-30">
        <button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center space-y-2 md:space-y-3 group cursor-pointer transition-all duration-300 hover:scale-110"
          aria-label="Scroll para a próxima seção"
        >
          <span className="text-white/70 text-xs font-mono font-light tracking-widest group-hover:text-white transition-colors duration-300">
            EXPLORAR
          </span>
          <div className="w-px h-12 md:h-16 bg-gradient-to-b from-blue-400 to-transparent relative overflow-hidden">
            <div className="absolute top-0 w-full h-4 md:h-6 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full animate-bounce group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300" />
          </div>
        </button>
      </div>
    </section>
  );
};
