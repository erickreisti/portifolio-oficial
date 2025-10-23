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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Detecta se é mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Efeito de partículas otimizado para mobile
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
        particle.style.width = `${
          Math.random() * (isMobile ? 4 : 6) + (isMobile ? 1 : 2)
        }px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.background = `radial-gradient(circle, rgba(59, 130, 246, 0.9) 0%, rgba(37, 99, 235, 0.7) 100%)`;
        particle.style.animation = `float ${
          Math.random() * 8 + 6
        }s infinite ease-in-out ${Math.random() * 3}s`;
        particles.appendChild(particle);
      }

      // Partículas tech (menos em mobile)
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

      // Conexões (menos em mobile)
      for (let i = 0; i < connectionCount; i++) {
        const connection = document.createElement("div");
        connection.className = "particle-connection";
        connection.style.width = `${
          Math.random() * (isMobile ? 40 : 80) + (isMobile ? 20 : 40)
        }px`;
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
    if (isMobile) {
      createParticles(8, 6, 4); // Menos partículas em mobile
    } else {
      createParticles(25, 18, 12);
    }

    return () => {
      if (particles) particles.innerHTML = "";
    };
  }, [mounted, isMobile]);

  // Efeitos de animação otimizados para mobile
  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Timeline principal com ajustes para mobile
      const masterTimeline = gsap.timeline();

      // 1. Fade in do background e partículas
      masterTimeline.fromTo(
        ".hero-bg-elements",
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" }
      );

      // 2. Animação em cascata do título principal - ajustado para mobile
      masterTimeline.fromTo(
        ".title-line-1",
        {
          y: isMobile ? 50 : 100,
          opacity: 0,
          scale: 0.8,
          rotationX: isMobile ? 45 : 90,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: isMobile ? 0.8 : 1.2,
          ease: "back.out(1.4)",
          transformOrigin: "center bottom",
        },
        "+=0.1"
      );

      masterTimeline.fromTo(
        ".title-line-2",
        {
          y: isMobile ? 50 : 100,
          opacity: 0,
          scale: 0.8,
          rotationX: isMobile ? -45 : -90,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: isMobile ? 1 : 1.4,
          ease: "back.out(1.4)",
          transformOrigin: "center top",
        },
        isMobile ? "-=0.5" : "-=0.8"
      );

      // 3. Descrição com efeito mais simples em mobile
      masterTimeline.fromTo(
        ".hero-description",
        {
          y: isMobile ? 30 : 60,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.8 : 1.1,
          ease: "power2.out",
        },
        isMobile ? "-=0.3" : "-=0.6"
      );

      // 4. Badge com efeito de surgimento
      masterTimeline.fromTo(
        ".name-badge",
        {
          scale: 0,
          opacity: 0,
          rotationY: isMobile ? 90 : 180,
        },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: isMobile ? 0.6 : 0.9,
          ease: "back.out(1.6)",
        },
        isMobile ? "-=0.2" : "-=0.4"
      );

      // 5. Botões com efeito de escada - ajustado para mobile
      masterTimeline.fromTo(
        ".cta-primary",
        {
          y: isMobile ? 40 : 80,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.6 : 0.8,
          ease: "power2.out",
        },
        isMobile ? "-=0.1" : "-=0.3"
      );

      masterTimeline.fromTo(
        ".cta-secondary",
        {
          y: isMobile ? 40 : 80,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.6 : 0.8,
          ease: "power2.out",
        },
        isMobile ? "-=0.3" : "-=0.5"
      );

      // 6. Stats mobile - aparece em linha no mobile
      if (!isMobile) {
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
      } else {
        // Stats mobile - animação diferente
        masterTimeline.fromTo(
          ".hero-stats-mobile .stat-item",
          {
            y: 30,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.2,
          },
          "-=0.2"
        );
      }

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
        "+=0.3"
      );

      // Animações contínuas mais leves em mobile
      if (!isMobile) {
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

        // Animação mais complexa para stats desktop
        gsap.to(".stat-item", {
          keyframes: {
            "0%": { y: 0, x: 0, rotation: 0, scale: 1 },
            "25%": { y: -15, x: 10, rotation: 1, scale: 1.02 },
            "50%": { y: -10, x: -8, rotation: -1, scale: 1.01 },
            "75%": { y: -18, x: 6, rotation: 2, scale: 1.03 },
            "100%": { y: 0, x: 0, rotation: 0, scale: 1 },
          },
          duration: 8,
          repeat: -1,
          ease: "sine.inOut",
          stagger: {
            each: 0.6,
            from: "random",
          },
        });
      }

      // Efeito de pulso sutil nos botões (mais leve em mobile)
      gsap.to(".cta-primary, .cta-secondary", {
        scale: isMobile ? 1.01 : 1.02,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    }, heroRef);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        });
      }
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      ctx.revert();
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [mounted, isMobile]);

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
      <section className="min-h-screen relative overflow-hidden bg-slate-950 pt-20 pb-20 md:pt-32 md:pb-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="min-h-[70vh] md:min-h-[75vh] flex items-center justify-center">
            <div className="text-center">
              <div className="h-12 w-12 md:h-16 md:w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl animate-pulse mx-auto mb-4" />
              <div className="h-6 w-48 md:h-8 md:w-64 bg-slate-800 rounded animate-pulse mx-auto" />
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
      className="min-h-screen relative overflow-hidden bg-slate-950 pt-20 pb-20 md:pt-32 md:pb-32"
    >
      {/* Background Elements - Otimizado para mobile */}
      <div className="hero-bg-elements">
        <div className="gradient-bg gradient-shift absolute inset-0 bg-gradient-to-br from-slate-800/40 via-slate-900/50 to-slate-700/30" />

        <div
          ref={particlesRef}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Elementos Tech Flutuantes - Escondidos em mobile */}
        {!isMobile && (
          <>
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
          </>
        )}

        {/* Efeitos de Luz com Animação - Mais sutis em mobile */}
        <div
          className="absolute top-1/4 left-1/4 w-40 h-40 md:w-80 md:h-80 bg-blue-500/15 rounded-full blur-2xl md:blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-purple-500/15 rounded-full blur-2xl md:blur-3xl animate-pulse"
          style={{ animationDuration: "10s", animationDelay: "1s" }}
        />
        {!isMobile && (
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "12s", animationDelay: "2s" }}
          />
        )}
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="min-h-[70vh] md:min-h-[75vh] flex items-center justify-between">
          <div className="text-center w-full">
            {/* Título Principal com Ajustes para Mobile */}
            <div className="main-cta mb-8 md:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white mb-6 md:mb-12 leading-tight">
                <span className="title-line-1 block bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-6xl">
                  IDEIAS EXTRAORDINÁRIAS
                </span>
                <span className="title-line-2 block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent text-xl sm:text-2xl md:text-5xl lg:text-7xl">
                  CÓDIGO EXCEPCIONAL
                </span>
              </h1>
            </div>

            {/* Descrição com Texto Adaptado para Mobile */}
            <MotionDiv
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="hero-description mb-6 md:mb-10"
            >
              <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-white/90 font-sans font-light max-w-3xl leading-relaxed px-4 md:px-0">
                Transformo{" "}
                <span className="text-blue-300 font-semibold relative">
                  <span className="relative z-10">visões ambiciosas</span>
                </span>{" "}
                em{" "}
                <span className="text-purple-300 font-semibold relative">
                  <span className="relative z-10">soluções digitais</span>
                </span>{" "}
                com{" "}
                <span className="text-cyan-300 font-semibold relative">
                  <span className="relative z-10">tecnologia de ponta</span>
                </span>{" "}
                {!isMobile && (
                  <>
                    e{" "}
                    <span className="text-green-300 font-semibold relative">
                      <span className="relative z-10">performance máxima</span>
                    </span>
                  </>
                )}
              </p>
            </MotionDiv>

            {/* Badge com Layout Adaptado para Mobile */}
            <div className="name-badge mb-6 md:mb-10 px-4 md:px-0">
              <div className="inline-flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6 bg-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl px-4 py-3 md:px-8 md:py-4 border border-white/10 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 group">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm md:text-lg font-sans font-medium text-white/70">
                    Desenvolvido por
                  </span>
                </div>
                <div className="hidden sm:block h-4 md:h-6 w-px bg-white/20" />
                <span className="text-base md:text-xl font-heading font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                  Érick Reis
                </span>
                <div className="hidden sm:block h-4 md:h-6 w-px bg-white/20" />
                <div className="flex items-center space-x-1 md:space-x-2">
                  <Cpu className="h-3 w-3 md:h-4 md:w-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs md:text-sm font-mono font-medium text-blue-400 uppercase tracking-wider group-hover:text-blue-300 transition-colors duration-300">
                    Fullstack
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs com Layout de Coluna em Mobile */}
            <div className="cta-buttons mb-12 md:mb-24 px-4 md:px-0">
              <div className="flex flex-col items-center space-y-4 md:space-y-6 md:flex-row md:space-x-6 lg:space-x-8">
                <Button
                  asChild
                  size={isMobile ? "default" : "lg"}
                  className="cta-primary group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-heading font-bold text-base md:text-lg w-full md:w-auto px-8 md:px-14 py-4 md:py-7 rounded-xl md:rounded-2xl shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105 border-0 overflow-hidden"
                  style={{
                    transform: !isMobile
                      ? `translate(${mousePosition.x * 0.3}px, ${
                          mousePosition.y * 0.3
                        }px)`
                      : "none",
                  }}
                >
                  <Link href="#contact">
                    <Mail className="mr-2 md:mr-3 h-4 w-4 md:h-6 md:w-6 group-hover:scale-110 transition-transform duration-300" />
                    INICIAR PROJETO
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl md:rounded-2xl" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size={isMobile ? "default" : "lg"}
                  className="cta-secondary group relative bg-white/20 backdrop-blur-lg border-white/40 text-white hover:bg-white/30 font-heading font-semibold text-base md:text-lg w-full md:w-auto px-6 md:px-12 py-4 md:py-7 rounded-xl md:rounded-2xl shadow-2xl hover:shadow-white/30 transition-all duration-500 hover:scale-105 overflow-hidden"
                  style={{
                    transform: !isMobile
                      ? `translate(${mousePosition.x * 0.2}px, ${
                          mousePosition.y * 0.2
                        }px)`
                      : "none",
                  }}
                >
                  <a href="/docs/curriculo-erick-reis.pdf" download>
                    <Download className="mr-2 md:mr-3 h-4 w-4 md:h-6 md:w-6 group-hover:scale-110 transition-transform duration-300" />
                    VER PORTFÓLIO
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl md:rounded-2xl" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Stats Mobile - Layout Horizontal */}
            {isMobile && (
              <div className="hero-stats-mobile mb-8 px-4">
                <div className="flex justify-between space-x-4">
                  {[
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
                      color: "from-purple-400 to-pink-400",
                    },
                    {
                      number: "100%",
                      label: "Qualidade",
                      icon: "⭐",
                      color: "from-amber-400 to-yellow-400",
                    },
                  ].map((stat, index) => (
                    <div
                      key={stat.label}
                      className="stat-item group cursor-pointer opacity-90 hover:opacity-100 transition-all duration-300 text-center flex-1"
                    >
                      <div className="text-lg md:text-2xl mb-1 stat-icon bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        {stat.icon}
                      </div>
                      <div
                        className={`text-xl md:text-3xl font-heading font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 group-hover:scale-105 transition-transform duration-300`}
                      >
                        {stat.number}
                      </div>
                      <div className="text-white/80 font-sans text-xs group-hover:text-white transition-colors duration-300">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Stats Desktop */}
          {!isMobile && (
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
          )}
        </div>
      </div>

      {/* Scroll Indicator Melhorado para Mobile */}
      <div className="scroll-indicator absolute bottom-6 md:bottom-12 left-1/2 transform -translate-x-1/2 z-30">
        <button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center space-y-2 md:space-y-3 group cursor-pointer transition-all duration-300 hover:scale-110"
          aria-label="Scroll para a seção About"
        >
          <span className="text-white/70 text-xs font-mono font-light tracking-widest group-hover:text-white transition-colors duration-300 group-hover:scale-105">
            EXPLORAR MAIS
          </span>
          <div className="w-px h-12 md:h-20 bg-gradient-to-b from-blue-400/90 to-transparent relative group-hover:from-cyan-400 transition-colors duration-300">
            <div className="absolute top-0 w-1 h-4 md:h-6 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full animate-bounce group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300" />
          </div>
        </button>
      </div>
    </section>
  );
};
