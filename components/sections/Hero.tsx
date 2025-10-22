"use client";

import Link from "next/link";
import { Download, Mail, Code, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";

import { Button } from "@/components/ui/button";
import AvatarPic from "@/public/images/avatar.webp";

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const fullstackRef = useRef<HTMLSpanElement>(null);
  const sparkleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline principal
      const tl = gsap.timeline();

      // Animação do badge de apresentação
      tl.from(".hero-badge", {
        opacity: 0,
        y: -20,
        scale: 0.8,
        duration: 0.6,
        ease: "back.out(1.5)",
      });

      // Animação ESPECIAL para "FullStack" - MAIS IMPACTANTE
      tl.fromTo(
        fullstackRef.current,
        {
          opacity: 0,
          scale: 0.3,
          rotationY: -90,
          filter: "blur(15px)",
          backgroundPosition: "200% 0%",
        },
        {
          opacity: 1,
          scale: 1.1,
          rotationY: 0,
          filter: "blur(0px)",
          backgroundPosition: "0% 0%",
          duration: 1.5,
          ease: "power4.out",
        },
        "-=0.3"
      ).to(fullstackRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });

      // Efeito de brilho pulsante contínuo MAIS VISÍVEL
      gsap.to(fullstackRef.current, {
        backgroundPosition: "200% 0%",
        duration: 4,
        repeat: -1,
        ease: "none",
        delay: 2,
      });

      // Animação das linhas do título
      tl.fromTo(
        ".hero-title-line",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // Animação da descrição
      tl.fromTo(
        ".hero-description",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.3"
      );

      // Animação dos botões
      tl.fromTo(
        ".hero-buttons",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
        },
        "-=0.2"
      );

      // Animação das stats
      tl.fromTo(
        ".hero-stats > div",
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.5)",
        },
        "-=0.3"
      );

      // Animação da imagem - MAIS SUAVE
      tl.fromTo(
        ".hero-image",
        {
          opacity: 0,
          scale: 0.85,
          rotationY: 10,
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.8"
      );

      // Efeito de brilho no avatar
      if (sparkleRef.current) {
        gsap.fromTo(
          sparkleRef.current,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            delay: 1.5,
            ease: "power2.out",
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-32 pb-20 lg:pt-36 lg:pb-24 bg-background relative overflow-hidden"
      ref={heroRef}
    >
      {/* Background sutil como RainbowIT */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-background dark:from-gray-900/30 dark:to-background" />

      {/* Elemento decorativo sutil */}
      <div className="absolute top-20 right-10 opacity-5">
        <Code className="h-32 w-32 text-primary-default" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-between lg:flex-row lg:space-x-16">
          {/* 1. Conteúdo de Texto e CTAs */}
          <div className="lg:w-7/12 order-2 lg:order-1 mt-12 lg:mt-0 text-center lg:text-left">
            {/* Tag / Nome */}
            <div className="hero-badge">
              <span className="inline-flex items-center text-sm font-heading font-semibold uppercase tracking-widest text-primary-default bg-primary-default/10 px-4 py-2 rounded-full border border-primary-default/20">
                <Sparkles className="h-4 w-4 mr-2" />
                Olá, eu sou Érick Reis
              </span>
            </div>

            {/* Título de Impacto - COM FONT POIPPINS */}
            <h1 className="mt-8 text-4xl font-heading font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
              <div>
                Desenvolvedor{" "}
                <span
                  ref={fullstackRef}
                  className="font-heading font-black bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 bg-[length:200%_100%] bg-clip-text text-transparent inline-block px-1 py-1"
                  style={{
                    background:
                      "linear-gradient(90deg, #3b82f6, #60a5fa, #38bdf8, #3b82f6)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    textShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
                  }}
                >
                  FullStack
                </span>
              </div>
              <div className="hero-title-line mt-4 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-semibold">
                Transformando Ideias
              </div>
              <div className="hero-title-line text-primary-default font-heading font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
                em Código.
              </div>
            </h1>

            {/* Descrição - COM FONT OPEN SANS */}
            <div className="hero-description">
              <p className="mt-8 max-w-2xl mx-auto lg:mx-0 text-lg sm:text-xl text-foreground/70 leading-relaxed font-sans font-medium">
                Especializado em criar{" "}
                <strong className="text-foreground font-sans font-semibold">
                  soluções digitais completas
                </strong>{" "}
                - do front-end ao back-end. Domino tecnologias modernas como{" "}
                <strong className="text-foreground font-sans font-semibold">
                  Next.js
                </strong>
                ,{" "}
                <strong className="text-foreground font-sans font-semibold">
                  TypeScript
                </strong>
                ,{" "}
                <strong className="text-foreground font-sans font-semibold">
                  Node.js
                </strong>{" "}
                e{" "}
                <strong className="text-foreground font-sans font-semibold">
                  Tailwind CSS
                </strong>{" "}
                para entregar aplicações{" "}
                <strong className="text-foreground font-sans font-semibold">
                  rápidas, escaláveis e com excelente UX
                </strong>
                .
              </p>
            </div>

            {/* CTAs com reflexo */}
            <div className="hero-buttons mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0 justify-center lg:justify-start">
              {/* Botão Principal */}
              <Button
                asChild
                size="lg"
                className="h-14 text-base font-heading font-semibold bg-primary-default hover:bg-primary-default/90 text-black dark:text-white px-8 rounded-xl shadow-2xl hover:shadow-primary-default/40 transition-all duration-300 hover:scale-105 relative overflow-hidden group border-2 border-primary-default/20"
              >
                <Link href="#contact">
                  <Mail className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Vamos Conversar
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 dark:via-white/30" />
                </Link>
              </Button>

              {/* Botão Secundário */}
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 text-base font-heading font-semibold border-2 border-primary-default/30 text-primary-default hover:bg-primary-default/10 hover:border-primary-default px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
              >
                <a href="/docs/curriculo-erick-reis.pdf" download>
                  <Download className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Baixar CV
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-default/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </a>
              </Button>
            </div>

            {/* Stats/Info adicional */}
            <div className="hero-stats mt-12 flex flex-wrap gap-6 sm:gap-8 justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-heading font-bold text-primary-default bg-primary-default/10 px-3 sm:px-4 py-2 rounded-lg">
                  5+
                </div>
                <div className="text-sm sm:text-base text-foreground/60 mt-2 font-sans font-medium">
                  Anos de Experiência
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-heading font-bold text-primary-default bg-primary-default/10 px-3 sm:px-4 py-2 rounded-lg">
                  50+
                </div>
                <div className="text-sm sm:text-base text-foreground/60 mt-2 font-sans font-medium">
                  Projetos Entregues
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-heading font-bold text-primary-default bg-primary-default/10 px-3 sm:px-4 py-2 rounded-lg">
                  100%
                </div>
                <div className="text-sm sm:text-base text-foreground/60 mt-2 font-sans font-medium">
                  Satisfação do Cliente
                </div>
              </div>
            </div>
          </div>

          {/* 2. Avatar com efeito especial - TAMANHO AJUSTADO */}
          <div className="lg:w-5/12 order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="hero-image relative h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96 rounded-full overflow-hidden border-4 border-primary-default/40 shadow-2xl bg-card group hover:shadow-primary-default/30 transition-all duration-500 hover:border-primary-default/60">
                <Image
                  src={AvatarPic}
                  alt="Avatar de Erick Reis"
                  fill
                  priority
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-default/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div
                ref={sparkleRef}
                className="absolute -inset-4 sm:-inset-5 rounded-full bg-gradient-to-r from-primary-default/20 to-transparent opacity-0 blur-xl pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator melhorado */}
        <div className="mt-16 lg:mt-1 flex justify-center">
          <div
            className="flex flex-col items-center text-foreground/60 hover:text-primary-default transition-all duration-300 cursor-pointer group"
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="text-sm font-sans font-medium mb-3 group-hover:scale-110 transition-transform">
              Explore Mais
            </span>
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center group-hover:border-primary-default transition-colors">
              <div className="w-1 h-3 bg-current rounded-full mt-2 animate-bounce group-hover:bg-primary-default transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
