// components/sections/Hero/Hero.tsx - ESPAÇAMENTOS OTIMIZADOS
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
  Crown,
  Trophy,
  Star,
  Gem,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(80);
  const [isLoaded, setIsLoaded] = useState(false);

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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  // Detectar mobile e altura do header
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    const updateHeaderHeight = () => {
      const header = document.querySelector("header");
      if (header) setHeaderHeight(header.offsetHeight);
    };

    checkMobile();
    updateHeaderHeight();

    setTimeout(updateHeaderHeight, 100);
    setTimeout(() => setIsLoaded(true), 300);

    window.addEventListener("resize", checkMobile);
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  // Animação de entrada OTIMIZADA
  useEffect(() => {
    if (!heroRef.current || !isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Elementos neon flutuantes
      const neonElements = neonElementsRef.current.filter(Boolean);
      tl.fromTo(
        neonElements,
        {
          opacity: 0,
          scale: 0,
          y: 80,
        },
        {
          opacity: 0.9,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          stagger: 0.1,
        }
      );

      // Título
      const titleLetters = titleLettersRef.current.filter(Boolean);
      tl.fromTo(
        titleLetters,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.03,
        },
        "-=0.5"
      );

      // Subtítulo
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }

      // Botões
      const validButtons = buttonsRef.current.filter(
        Boolean
      ) as HTMLDivElement[];
      if (validButtons.length > 0) {
        tl.fromTo(
          validButtons,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1,
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
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.1"
        );
      }

      // Animações contínuas suaves
      neonElements.forEach((element, index) => {
        gsap.to(element, {
          y: -15 - index * 2,
          rotation: index % 2 === 0 ? 8 : -8,
          duration: 4 + index,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.5,
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isLoaded]);

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
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

  // Configuração dos elementos neon
  const neonConfigs = [
    {
      Icon: Crown,
      color: "text-yellow-400",
      size: "text-2xl",
      top: "15%",
      left: "10%",
    },
    {
      Icon: Code2,
      color: "text-cyan-400",
      size: "text-3xl",
      top: "20%",
      left: "85%",
    },
    {
      Icon: Cpu,
      color: "text-purple-400",
      size: "text-2xl",
      top: "70%",
      left: "15%",
    },
    {
      Icon: Zap,
      color: "text-green-400",
      size: "text-2xl",
      top: "65%",
      left: "80%",
    },
    {
      Icon: Sparkles,
      color: "text-amber-400",
      size: "text-xl",
      top: "35%",
      left: "5%",
    },
    {
      Icon: Globe,
      color: "text-blue-400",
      size: "text-xl",
      top: "40%",
      left: "90%",
    },
  ];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative bg-gray-950 overflow-hidden flex items-center justify-center w-full"
      style={{
        height: `calc(100vh - ${headerHeight}px)`,
        minHeight: `calc(100vh - ${headerHeight}px)`,
        marginTop: `${headerHeight}px`,
      }}
    >
      {/* BACKGROUND MEGA PREMIUM */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
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

        {/* ELEMENTOS ORB */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-64 h-64 bg-cyan-500/15 rounded-full filter blur-3xl"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/5 w-56 h-56 bg-purple-500/12 rounded-full filter blur-3xl"
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* ELEMENTOS NEON */}
      <div className="absolute inset-0 pointer-events-none">
        {neonConfigs.map(({ Icon, color, size, top, left }, index) => (
          <motion.div
            key={index}
            ref={setNeonElementRef(index)}
            className={`absolute ${color} ${size} opacity-80 filter drop-shadow-lg`}
            style={{ top, left }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, index % 2 === 0 ? 8 : -8, 0],
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
          >
            <Icon className="w-full h-full" />
          </motion.div>
        ))}
      </div>

      {/* CONTEÚDO PRINCIPAL COM ESPAÇAMENTOS OTIMIZADOS */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* CONTEÚDO CENTRAL - ESPAÇAMENTOS PERFEITOS */}
        <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto">
          {/* TÍTULO COM ESPAÇAMENTO OTIMIZADO */}
          <div
            ref={titleRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="text-center mb-6 lg:mb-8 w-full"
          >
            <motion.h1
              style={{
                rotateX: isHovering && !isMobile ? rotateX : 0,
                rotateY: isHovering && !isMobile ? rotateY : 0,
                transformStyle: "preserve-3d",
              }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 lg:mb-6 leading-tight cursor-default transform-gpu"
            >
              {titleWords.map((word, wordIndex) => (
                <span key={wordIndex} className="block mb-2 lg:mb-3">
                  {word.split("").map((letter, letterIndex) => (
                    <span
                      key={`${wordIndex}-${letterIndex}`}
                      ref={setTitleLetterRef(wordIndex, letterIndex)}
                      className="inline-block mx-0.5 lg:mx-1 hover:scale-110 hover:text-cyan-300 transition-transform duration-200 hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  ))}
                </span>
              ))}
            </motion.h1>
          </div>

          {/* SUBTÍTULO COM ESPAÇAMENTO PERFEITO */}
          <div className="w-full max-w-3xl mx-auto mb-8 lg:mb-10">
            <motion.p
              ref={subtitleRef}
              className="text-xl sm:text-2xl lg:text-3xl text-gray-300 text-center leading-relaxed font-light"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-size-200 animate-gradient font-medium">
                Transformo visões ambiciosas em soluções digitais com tecnologia
                de ponta e código impecável
              </span>
            </motion.p>
          </div>

          {/* BOTÕES COM ESPAÇAMENTO IDEAL */}
          <div className="w-full max-w-lg mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 items-center justify-center w-full">
              {/* BOTÃO PRIMÁRIO */}
              <div ref={setButtonRef(0)} className="w-full sm:w-auto">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white font-bold text-lg lg:text-xl py-5 lg:py-6 px-8 lg:px-10 rounded-xl lg:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-white/20 relative overflow-hidden group"
                >
                  <a
                    href="#contact"
                    className="flex items-center justify-center gap-3"
                  >
                    <Mail className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-bold tracking-wide">
                      INICIAR PROJETO
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </a>
                </Button>
              </div>

              {/* BOTÃO SECUNDÁRIO */}
              <div ref={setButtonRef(1)} className="w-full sm:w-auto">
                <Button
                  asChild
                  className="w-full bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold text-lg lg:text-xl py-5 lg:py-6 px-8 lg:px-10 rounded-xl lg:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/15 hover:border-white/30 relative overflow-hidden group"
                >
                  <a
                    href="/docs/curriculo-erick-reis.pdf"
                    download
                    className="flex items-center justify-center gap-3"
                  >
                    <Download className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-bold tracking-wide">BAIXAR CV</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* SCROLL INDICATOR POSICIONADO PERFEITAMENTE */}
        <div className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.button
            ref={scrollIndicatorRef}
            onClick={() => scrollToSection("about")}
            className="bg-transparent border-none cursor-pointer p-3 flex flex-col items-center gap-2 group"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="text-cyan-400 text-sm font-mono font-semibold tracking-widest uppercase group-hover:text-cyan-300"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Explorar Mais
            </motion.span>

            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-xl group-hover:border-cyan-400/50 group-hover:bg-cyan-400/20 transition-all duration-300"
            >
              <ArrowDown className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300" />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* LOADING SIMPLES */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 bg-gray-950 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full"
            />
          </motion.div>
        </div>
      )}
    </section>
  );
};
