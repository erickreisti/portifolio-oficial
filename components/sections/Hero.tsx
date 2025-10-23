"use client";

import Link from "next/link";
import { Download, Mail, Cpu } from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import MotionDiv from "@/components/ui/MotionDiv";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isMobile) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
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

  // Efeitos de animação
  useEffect(() => {
    if (!mounted || !heroRef.current) return;

    const ctx = gsap.context(() => {
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
            y: isMobile ? 40 : 100,
            opacity: 0,
            rotationX: isMobile ? 20 : 30,
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: isMobile ? 0.8 : 1.2,
            ease: "back.out(1.7)",
          },
          "+=0.1"
        )
        .fromTo(
          ".title-line-2",
          {
            y: isMobile ? 40 : 100,
            opacity: 0,
            rotationX: isMobile ? -20 : -30,
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
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
          },
          {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0.7 : 1,
          },
          isMobile ? "-=0.4" : "-=0.6"
        )
        .fromTo(
          ".cta-primary",
          {
            y: isMobile ? 40 : 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0.5 : 0.7,
          },
          isMobile ? "-=0.1" : "-=0.3"
        )
        .fromTo(
          ".cta-secondary",
          {
            y: isMobile ? 40 : 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0.5 : 0.7,
          },
          isMobile ? "-=0.3" : "-=0.5"
        );

      // Animações para elementos flutuantes
      if (!isMobile) {
        gsap.to(".floating-tech", {
          y: "random(-15, 15)",
          x: "random(-10, 10)",
          rotation: "random(-2, 2)",
          duration: "random(4, 8)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
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
        transform: `translate3d(${mousePosition.x * 0.2}px, ${
          mousePosition.y * 0.2
        }px, 0)`,
      }
    : {};

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
      {/* Background Elements */}
      <div className="hero-bg-elements absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/10" />

        {/* Elementos flutuantes com neon */}
        {!isMobile && (
          <div className="floating-elements">
            <div className="absolute top-32 left-10 floating-tech">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circuit-board h-16 w-16 animate-neon-cyan interactive-glow"
                aria-hidden="true"
              >
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M11 9h4a2 2 0 0 0 2-2V3"></path>
                <circle cx="9" cy="9" r="2"></circle>
                <path d="M7 21v-4a2 2 0 0 1 2-2h4"></path>
                <circle cx="15" cy="15" r="2"></circle>
              </svg>
            </div>
            <div className="absolute top-48 right-20 floating-tech">
              <svg
                className="h-12 w-12 animate-neon-purple interactive-glow"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="absolute bottom-48 left-20 floating-tech">
              <svg
                className="h-14 w-14 animate-neon-blue interactive-glow"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Efeitos de luz */}
        <div className="light-effects">
          <div
            className={`${
              isMobile ? "w-40 h-40 blur-2xl" : "w-80 h-80 blur-3xl"
            } absolute top-1/4 left-1/4 bg-blue-500/10 rounded-full animate-pulse`}
          />
          <div
            className={`${
              isMobile ? "w-48 h-48 blur-2xl" : "w-96 h-96 blur-3xl"
            } absolute bottom-1/3 right-1/4 bg-purple-500/10 rounded-full animate-pulse`}
            style={{ animationDelay: "2s" }}
          />
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-5 lg:px-8 relative z-10">
        <div className="min-h-[70vh] md:min-h-[75vh] flex flex-col items-center justify-center text-center">
          {/* Título Principal */}
          <div className="main-title mb-8 md:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white mb-6 md:mb-8 leading-tight">
              <span className="title-line-1 block bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-4 md:mb-6">
                IDEIAS EXTRAORDINÁRIAS
              </span>
              <span className="title-line-2 block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                CÓDIGO EXCEPCIONAL
              </span>
            </h1>
          </div>

          {/* Descrição */}
          <MotionDiv
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-description mb-8 md:mb-10"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-sans font-light max-w-2xl leading-relaxed">
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
            </p>
          </MotionDiv>

          {/* Badge */}
          <div className="name-badge mb-8 md:mb-10">
            <div
              className="inline-flex items-center space-x-4 bg-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl px-6 py-4 border border-white/10 shadow-xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105 group cursor-pointer interactive"
              style={parallaxStyle}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                <span className="text-sm font-sans font-medium text-white/70">
                  Desenvolvido por
                </span>
              </div>
              <div className="h-6 w-px bg-white/20" />
              <span className="text-lg font-heading font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                Érick Reis
              </span>
              <div className="h-6 w-px bg-white/20" />
              <div className="flex items-center space-x-2 group-hover:scale-110 transition-transform duration-300">
                <Cpu className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-mono font-medium text-blue-400 uppercase tracking-wider">
                  Fullstack
                </span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="cta-section">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full">
              <Button
                asChild
                size={isMobile ? "default" : "lg"}
                className="cta-primary group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-heading font-bold text-base md:text-lg w-full sm:w-auto px-8 md:px-14 py-6 md:py-7 rounded-xl md:rounded-2xl shadow-xl hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105 border-0 overflow-hidden interactive"
                style={parallaxStyle}
              >
                <Link href="#contact">
                  <Mail className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  INICIAR PROJETO
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl md:rounded-2xl" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size={isMobile ? "default" : "lg"}
                className="cta-secondary group relative bg-white/10 backdrop-blur-lg border-white/30 text-white hover:bg-white/20 font-heading font-semibold text-base md:text-lg w-full sm:w-auto px-6 md:px-12 py-6 md:py-7 rounded-xl md:rounded-2xl shadow-xl hover:shadow-white/40 transition-all duration-500 hover:scale-105 overflow-hidden interactive"
                style={parallaxStyle}
              >
                <a href="/docs/curriculo-erick-reis.pdf" download>
                  <Download className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  BAIXAR CV
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl md:rounded-2xl" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-30">
        <button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center space-y-2 md:space-y-3 group cursor-pointer transition-all duration-300 hover:scale-110 interactive"
          aria-label="Scroll para a próxima seção"
        >
          <span className="text-white/70 text-xs font-mono font-light tracking-widest group-hover:text-white transition-colors duration-300">
            EXPLORAR
          </span>
          <div className="w-px h-12 md:h-16 bg-gradient-to-b from-blue-400 to-transparent relative overflow-hidden">
            <div className="absolute top-0 w-full h-4 md:h-6 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};
