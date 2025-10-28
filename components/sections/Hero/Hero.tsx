// components/sections/Hero/Hero.tsx
"use client";

import {
  Download,
  Mail,
  ArrowDown,
  Sparkles,
  Zap,
  Cpu,
  Code2,
  Server,
  Database,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./Hero.module.css";

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(80);

  // Refs para animação GSAP
  const titleLettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);
  const neonElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Motion values para efeito 3D
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  // Detectar mobile e altura do header
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    const updateHeaderHeight = () => {
      const header = document.querySelector("header");
      if (header) setHeaderHeight(header.offsetHeight);
    };

    checkMobile();
    updateHeaderHeight();

    const header = document.querySelector("header");
    if (header) {
      const observer = new ResizeObserver(updateHeaderHeight);
      observer.observe(header);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animação de entrada BLASTER PREMIUM
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Background com gradiente animado
      tl.fromTo(
        `.${styles.heroBg}`,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" }
      );

      // Elementos neon flutuantes
      const neonElements = neonElementsRef.current.filter(Boolean);
      tl.fromTo(
        neonElements,
        {
          opacity: 0,
          scale: 0,
          y: 100,
          rotation: -180,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 1.5,
          ease: "back.out(1.7)",
          stagger: 0.15,
        },
        "+=0.3"
      );

      // Título com efeito BLASTER
      const titleLetters = titleLettersRef.current.filter(Boolean);
      tl.fromTo(
        titleLetters,
        {
          opacity: 0,
          y: 80,
          scale: 1.2,
          rotationX: 90,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.02,
        },
        "-=0.5"
      );

      // Subtítulo
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }

      // Botões com efeito premium
      const validButtons = buttonsRef.current.filter(
        Boolean
      ) as HTMLDivElement[];
      if (validButtons.length > 0) {
        tl.fromTo(
          validButtons,
          {
            opacity: 0,
            scale: 0.8,
            y: 40,
            rotationY: 90,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotationY: 0,
            duration: 0.7,
            ease: "back.out(1.7)",
            stagger: 0.15,
          },
          "-=0.2"
        );
      }

      // Scroll indicator
      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            y: 20,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.1"
        );
      }

      // Animações contínuas BLASTER dos elementos neon
      const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
      neonElements.forEach((element, index) => {
        floatTl.to(
          element,
          {
            y: -25 - index * 5,
            rotation: index % 2 === 0 ? 15 : -15,
            duration: 4 + index * 0.5,
            ease: "sine.inOut",
          },
          index * 0.2
        );
      });

      // Pulsação neon BLASTER
      const pulseTl = gsap.timeline({ repeat: -1, yoyo: true });
      pulseTl.to(`.${styles.neonElement}`, {
        filter: "drop-shadow(0 0 20px currentColor) brightness(1.4)",
        duration: 2.5,
        ease: "sine.inOut",
        stagger: {
          each: 0.3,
          from: "random",
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!titleRef.current || isMobile) return;

    const rect = titleRef.current.getBoundingClientRect();
    const mouseXValue = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseYValue = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(mouseXValue);
    mouseY.set(mouseYValue);
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleButtonHover = (index: number) => {
    const button = buttonsRef.current[index];
    if (button) {
      gsap.to(button, {
        scale: 1.08,
        y: -4,
        rotationY: 5,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleButtonLeave = (index: number) => {
    const button = buttonsRef.current[index];
    if (button) {
      gsap.to(button, {
        scale: 1,
        y: 0,
        rotationY: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: offsetPosition, autoKill: false },
        ease: "power2.inOut",
      });
    }
  };

  // Funções helper para refs
  const setButtonRef = (index: number) => (el: HTMLDivElement | null) => {
    buttonsRef.current[index] = el;
  };

  const setNeonElementRef = (index: number) => (el: HTMLDivElement | null) => {
    neonElementsRef.current[index] = el;
  };

  const setTitleLetterRef =
    (wordIndex: number, letterIndex: number) =>
    (el: HTMLSpanElement | null) => {
      const index = wordIndex * 50 + letterIndex;
      titleLettersRef.current[index] = el;
    };

  const titleWords = ["IDEIAS", "EXTRAORDINÁRIAS", "CÓDIGO", "EXCEPCIONAL"];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative bg-gray-950 overflow-hidden flex items-center justify-center min-h-screen w-full"
      style={{
        height: `calc(100vh - ${headerHeight}px)`,
        minHeight: `calc(100vh - ${headerHeight}px)`,
        marginTop: `${headerHeight}px`,
      }}
    >
      {/* Background BLASTER PREMIUM */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className={styles.heroBg}
          style={{
            background: `
              radial-gradient(circle at 15% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 60%),
              radial-gradient(circle at 85% 15%, rgba(139, 92, 246, 0.25) 0%, transparent 60%),
              radial-gradient(circle at 45% 75%, rgba(16, 185, 129, 0.2) 0%, transparent 60%),
              radial-gradient(circle at 75% 85%, rgba(245, 158, 11, 0.15) 0%, transparent 60%),
              radial-gradient(circle at 25% 45%, rgba(239, 68, 68, 0.15) 0%, transparent 60%),
              radial-gradient(circle at 60% 30%, rgba(168, 85, 247, 0.2) 0%, transparent 60%),
              linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)
            `,
          }}
        />

        {/* Elementos de fundo animados BLASTER */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-72 h-72 bg-cyan-500/15 rounded-full filter blur-3xl"
          animate={{
            opacity: [0.1, 0.25, 0.1],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/5 w-64 h-64 bg-purple-500/12 rounded-full filter blur-3xl"
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-56 h-56 bg-emerald-500/10 rounded-full filter blur-3xl"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Elementos Neon Flutuantes BLASTER */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { Icon: Code2, color: "text-cyan-400", size: "text-3xl" },
          { Icon: Cpu, color: "text-purple-400", size: "text-3xl" },
          { Icon: Zap, color: "text-green-400", size: "text-2xl" },
          { Icon: Sparkles, color: "text-amber-400", size: "text-2xl" },
          { Icon: Server, color: "text-blue-400", size: "text-xl" },
          { Icon: Database, color: "text-emerald-400", size: "text-xl" },
          { Icon: Globe, color: "text-indigo-400", size: "text-2xl" },
        ].map(({ Icon, color, size }, index) => (
          <motion.div
            key={index}
            ref={setNeonElementRef(index)}
            className={`absolute ${styles.neonElement} ${color} ${size}`}
            style={{
              top: `${[20, 25, 60, 65, 40, 45, 50][index]}%`,
              left: `${[15, 80, 20, 75, 85, 10, 50][index]}%`,
            }}
          >
            <Icon className={`${styles.neonIcon} w-full h-full`} />
          </motion.div>
        ))}
      </div>

      {/* Conteúdo Principal BLASTER PREMIUM */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Conteúdo Central */}
        <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto flex-1 py-12 lg:py-16">
          {/* Título Principal BLASTER */}
          <div
            ref={titleRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="text-center mb-8 lg:mb-12 w-full"
          >
            <motion.h1
              style={{
                rotateX: isHovering && !isMobile ? rotateX : 0,
                rotateY: isHovering && !isMobile ? rotateY : 0,
                transformStyle: "preserve-3d",
              }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 lg:mb-6 leading-tight lg:leading-none cursor-default transform-gpu"
            >
              {titleWords.map((word, wordIndex) => (
                <span key={wordIndex} className="block mb-2 lg:mb-3">
                  {word.split("").map((letter, letterIndex) => (
                    <span
                      key={`${wordIndex}-${letterIndex}`}
                      ref={setTitleLetterRef(wordIndex, letterIndex)}
                      className="inline-block mx-0.5 lg:mx-1 hover:scale-110 hover:text-cyan-300 transition-transform duration-200"
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  ))}
                </span>
              ))}
            </motion.h1>
          </div>

          {/* Subtítulo BLASTER */}
          <div className="w-full max-w-4xl mx-auto mb-8 lg:mb-12 px-4">
            <motion.p
              ref={subtitleRef}
              className="text-lg sm:text-xl lg:text-2xl text-gray-300 text-center leading-relaxed font-light"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                Transformo visões ambiciosas em soluções digitais com tecnologia
                de ponta e código impecável
              </span>
            </motion.p>
          </div>

          {/* Botões CTA BLASTER PREMIUM */}
          <div className="w-full max-w-md lg:max-w-lg mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 items-center justify-center w-full px-4">
              <div
                ref={setButtonRef(0)}
                className="w-full sm:w-auto"
                onMouseEnter={() => handleButtonHover(0)}
                onMouseLeave={() => handleButtonLeave(0)}
              >
                <Button
                  asChild
                  className="w-full bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white font-bold text-lg lg:text-xl py-6 lg:py-7 px-8 lg:px-10 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border border-white/20 relative overflow-hidden group"
                >
                  <a
                    href="#contact"
                    className="flex items-center justify-center gap-3"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <Mail className="w-6 h-6 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-bold tracking-wide">
                      INICIAR PROJETO
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </a>
                </Button>
              </div>

              <div
                ref={setButtonRef(1)}
                className="w-full sm:w-auto"
                onMouseEnter={() => handleButtonHover(1)}
                onMouseLeave={() => handleButtonLeave(1)}
              >
                <Button
                  asChild
                  className="w-full bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold text-lg lg:text-xl py-6 lg:py-7 px-8 lg:px-10 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-white/15 hover:border-white/30 relative overflow-hidden group"
                >
                  <a
                    href="/docs/curriculo-erick-reis.pdf"
                    download
                    className="flex items-center justify-center gap-3"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <Download className="w-6 h-6 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-bold tracking-wide">BAIXAR CV</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator BLASTER */}
        <div className="w-full flex justify-center items-center pb-6 lg:pb-8">
          <motion.button
            ref={scrollIndicatorRef}
            onClick={() => scrollToSection("about")}
            className="bg-transparent border-none rounded-full transition-all duration-400 hover:bg-white/5 cursor-pointer p-4 flex flex-col items-center gap-3 group"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <motion.span
              className="text-cyan-400 text-xs font-mono font-semibold tracking-widest uppercase group-hover:text-cyan-300"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Explorar Mais
            </motion.span>

            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-12 h-12 rounded-full flex items-center justify-center border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-xl group-hover:border-cyan-400/60 group-hover:bg-cyan-400/20 transition-all duration-300"
            >
              <ArrowDown className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
