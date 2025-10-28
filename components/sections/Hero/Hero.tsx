// components/sections/Hero/Hero.tsx - TAMANHO PERFEITO
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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  // Detectar mobile e altura do header
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    const updateHeaderHeight = () => {
      const header = document.querySelector("header");
      if (header) setHeaderHeight(header.offsetHeight);
    };

    checkMobile();
    updateHeaderHeight();

    // Aguardar o header renderizar
    setTimeout(updateHeaderHeight, 100);

    window.addEventListener("resize", checkMobile);
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  // Animação de entrada OTIMIZADA
  useEffect(() => {
    if (!heroRef.current) return;

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
          opacity: 0.8,
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

  // Configuração dos elementos neon (menos e menores)
  const neonConfigs = [
    {
      Icon: Code2,
      color: "text-cyan-400",
      size: "text-2xl",
      top: "20%",
      left: "15%",
    },
    {
      Icon: Cpu,
      color: "text-purple-400",
      size: "text-2xl",
      top: "25%",
      left: "80%",
    },
    {
      Icon: Zap,
      color: "text-green-400",
      size: "text-xl",
      top: "70%",
      left: "20%",
    },
    {
      Icon: Sparkles,
      color: "text-amber-400",
      size: "text-xl",
      top: "65%",
      left: "75%",
    },
    {
      Icon: Globe,
      color: "text-blue-400",
      size: "text-lg",
      top: "45%",
      left: "85%",
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
      {/* BACKGROUND SIMPLIFICADO */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 15% 25%, rgba(59, 130, 246, 0.2) 0%, transparent 60%),
              radial-gradient(circle at 85% 15%, rgba(139, 92, 246, 0.15) 0%, transparent 60%),
              radial-gradient(circle at 45% 75%, rgba(16, 185, 129, 0.1) 0%, transparent 60%),
              linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)
            `,
          }}
        />

        {/* ELEMENTOS ORB PEQUENOS */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-48 h-48 bg-cyan-500/10 rounded-full filter blur-3xl"
          animate={{
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/5 w-40 h-40 bg-purple-500/08 rounded-full filter blur-3xl"
          animate={{
            opacity: [0.1, 0.12, 0.1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* ELEMENTOS NEON REDUZIDOS */}
      <div className="absolute inset-0 pointer-events-none">
        {neonConfigs.map(({ Icon, color, size, top, left }, index) => (
          <motion.div
            key={index}
            ref={setNeonElementRef(index)}
            className={`absolute ${color} ${size} opacity-70`}
            style={{ top, left }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon className="w-full h-full drop-shadow-lg" />
          </motion.div>
        ))}
      </div>

      {/* CONTEÚDO PRINCIPAL COMPACTO */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6">
        {/* CONTEÚDO CENTRAL - ESPAÇAMENTOS COMPACTOS */}
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
          {/* TÍTULO COMPACTO */}
          <div
            ref={titleRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="text-center mb-6 w-full"
          >
            <motion.h1
              style={{
                rotateX: isHovering && !isMobile ? rotateX : 0,
                rotateY: isHovering && !isMobile ? rotateY : 0,
                transformStyle: "preserve-3d",
              }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight cursor-default"
            >
              {titleWords.map((word, wordIndex) => (
                <span key={wordIndex} className="block mb-1">
                  {word.split("").map((letter, letterIndex) => (
                    <span
                      key={`${wordIndex}-${letterIndex}`}
                      ref={setTitleLetterRef(wordIndex, letterIndex)}
                      className="inline-block mx-0.5 hover:scale-110 hover:text-cyan-300 transition-transform duration-200"
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  ))}
                </span>
              ))}
            </motion.h1>
          </div>

          {/* SUBTÍTULO COMPACTO */}
          <div className="w-full max-w-2xl mx-auto mb-8">
            <motion.p
              ref={subtitleRef}
              className="text-base sm:text-lg md:text-xl text-gray-300 text-center leading-relaxed"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Transformo visões ambiciosas em soluções digitais com tecnologia
                de ponta e código impecável
              </span>
            </motion.p>
          </div>

          {/* BOTÕES COMPACTOS */}
          <div className="w-full max-w-md mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full">
              {/* BOTÃO PRIMÁRIO */}
              <div ref={setButtonRef(0)} className="w-full sm:w-auto">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-base py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20"
                >
                  <a
                    href="#contact"
                    className="flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    <span>INICIAR PROJETO</span>
                  </a>
                </Button>
              </div>

              {/* BOTÃO SECUNDÁRIO */}
              <div ref={setButtonRef(1)} className="w-full sm:w-auto">
                <Button
                  asChild
                  className="w-full bg-white/10 backdrop-blur-lg border border-white/20 text-white font-semibold text-base py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/15"
                >
                  <a
                    href="/docs/curriculo-erick-reis.pdf"
                    download
                    className="flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>BAIXAR CV</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* SCROLL INDICATOR PEQUENO */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <motion.button
            ref={scrollIndicatorRef}
            onClick={() => scrollToSection("about")}
            className="bg-transparent border-none cursor-pointer p-2 flex flex-col items-center gap-1 group"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="text-cyan-400 text-xs font-mono uppercase"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Explorar
            </motion.span>

            <motion.div
              animate={{
                y: [0, 5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center border border-cyan-400/30 bg-cyan-400/10 group-hover:border-cyan-400/50"
            >
              <ArrowDown className="w-3 h-3 text-cyan-400" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
