"use client";

import {
  Download,
  Mail,
  ArrowDown,
  Sparkles,
  Zap,
  Cpu,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(80);

  // Motion values para efeito 3D
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  // Detectar mobile e altura do header
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    const updateHeaderHeight = () => {
      const header = document.querySelector("header");
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    checkMobile();
    updateHeaderHeight();

    // Atualizar altura quando o header mudar (scrolling)
    const header = document.querySelector("header");
    if (header) {
      const observer = new ResizeObserver(updateHeaderHeight);
      observer.observe(header);

      return () => {
        observer.disconnect();
        window.removeEventListener("resize", checkMobile);
      };
    }

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!titleRef.current || isMobile) return;

    const rect = titleRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXValue = (e.clientX - rect.left) / width - 0.5;
    const mouseYValue = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(mouseXValue);
    mouseY.set(mouseYValue);
  };

  const handleMouseEnter = () => !isMobile && setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Variantes de animação otimizadas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 40,
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const letterVariants = {
    hidden: {
      y: 50,
      opacity: 0,
      rotateX: -20,
    },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.008,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const subtitleVariants = {
    hidden: {
      opacity: 0,
      y: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.7,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 1.1 + i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.98,
      y: 0,
    },
  };

  const scrollIndicatorVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 1.8,
        ease: "easeOut",
      },
    },
    hover: {
      y: -3,
      scale: 1.02,
      transition: {
        duration: 0.2,
      },
    },
  };

  const titleWords = ["IDEIAS", "EXTRAORDINÁRIAS", "CÓDIGO", "EXCEPCIONAL"];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="bg-slate-900 relative overflow-hidden flex items-center justify-center"
      style={{
        height: `calc(100vh - ${headerHeight}px)`,
        minHeight: `calc(100vh - ${headerHeight}px)`,
        marginTop: `${headerHeight}px`,
      }}
    >
      {/* Background Elegante */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradiente principal */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(30, 41, 59, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(30, 27, 75, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 70%, rgba(15, 23, 42, 0.95) 0%, transparent 100%)
            `,
          }}
        />

        {/* Elementos de fundo animados */}
        <motion.div
          className="absolute top-20 left-10% w-60 h-60 md:w-80 md:h-80 bg-blue-500/10 rounded-full filter blur-3xl"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-15% w-50 h-50 md:w-70 md:h-70 bg-purple-500/8 rounded-full filter blur-3xl"
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className={`${styles.decoration1}`}
          animate={{
            y: [0, -12, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{
            scale: 1.2,
            rotate: 180,
            transition: { duration: 0.4 },
          }}
        >
          <Code2 className="text-2xl sm:text-3xl lg:text-4xl text-blue-400/80" />
        </motion.div>

        <motion.div
          className={`${styles.decoration2}`}
          animate={{
            y: [0, -10, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          whileHover={{
            scale: 1.2,
            rotate: -180,
            transition: { duration: 0.4 },
          }}
        >
          <Cpu className="text-2xl sm:text-3xl lg:text-4xl text-purple-400/80" />
        </motion.div>

        <motion.div
          className={`${styles.decoration3}`}
          animate={{
            y: [0, -8, 0],
            rotate: [0, 2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          whileHover={{
            scale: 1.15,
            rotate: 90,
            transition: { duration: 0.4 },
          }}
        >
          <Zap className="text-xl sm:text-2xl lg:text-3xl text-emerald-400/80" />
        </motion.div>

        <motion.div
          className={`${styles.decoration4}`}
          animate={{
            y: [0, -6, 0],
            rotate: [0, -2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          whileHover={{
            scale: 1.15,
            rotate: -90,
            transition: { duration: 0.4 },
          }}
        >
          <Sparkles className="text-xl sm:text-2xl lg:text-3xl text-cyan-400/80" />
        </motion.div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container relative z-10 flex flex-col items-center justify-between w-full h-full px-4 sm:px-6 lg:px-8">
        {/* Conteúdo Central */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto flex-1 py-8"
        >
          {/* Título Principal */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-8 lg:mb-12 w-full"
            ref={titleRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <motion.h1
              style={{
                rotateX: isHovering && !isMobile ? rotateX : 0,
                rotateY: isHovering && !isMobile ? rotateY : 0,
                transformStyle: "preserve-3d",
              }}
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight md:leading-none mb-6 lg:mb-8 font-heading cursor-default transform-gpu tracking-tight"
            >
              {titleWords.map((word, wordIndex) => (
                <motion.span
                  key={wordIndex}
                  className="block mb-3 lg:mb-4"
                  variants={itemVariants}
                >
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      custom={wordIndex * 10 + letterIndex}
                      variants={letterVariants}
                      className="inline-block mx-0.5 lg:mx-1"
                      whileHover={
                        !isMobile
                          ? {
                              scale: 1.1,
                              color: "#60a5fa",
                              y: -2,
                              transition: {
                                duration: 0.2,
                              },
                            }
                          : {}
                      }
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>

          {/* Subtítulo */}
          <motion.div
            variants={subtitleVariants}
            className="w-full max-w-2xl lg:max-w-3xl mx-auto mb-8 lg:mb-12 px-4"
          >
            <motion.p className="text-lg sm:text-xl md:text-2xl text-slate-200 leading-relaxed md:leading-relaxed font-light font-sans text-center">
              <span className="bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-clip-text text-transparent">
                Transformo visões ambiciosas em soluções digitais com tecnologia
                de ponta e código impecável
              </span>
            </motion.p>
          </motion.div>

          {/* Botões CTA */}
          <motion.div
            variants={containerVariants}
            className="w-full max-w-md lg:max-w-xl mx-auto mb-6 lg:mb-8"
          >
            <motion.div className="flex flex-col sm:flex-row gap-4 lg:gap-5 items-center justify-center w-full px-4">
              <motion.div
                custom={0}
                variants={buttonVariants}
                className="w-full sm:w-auto"
              >
                <Button
                  asChild
                  className={`${styles.heroPrimaryButton} ${styles.buttonGlowEffect} relative text-white font-semibold text-sm sm:text-base px-7 sm:px-9 py-3.5 rounded-xl transition-all duration-300 border-0 w-full sm:w-auto group overflow-hidden`}
                >
                  <a
                    href="#contact"
                    className="relative z-10 flex items-center justify-center"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-3 transition-transform duration-300 group-hover:scale-110" />
                    <span className="whitespace-nowrap font-bold tracking-wide">
                      INICIAR PROJETO
                    </span>
                  </a>
                </Button>
              </motion.div>

              <motion.div
                custom={1}
                variants={buttonVariants}
                className="w-full sm:w-auto"
              >
                <Button
                  asChild
                  className={`${styles.heroSecondaryButton} ${styles.buttonGlowEffect} relative text-white font-semibold text-sm sm:text-base px-7 sm:px-9 py-3.5 rounded-xl transition-all duration-300 w-full sm:w-auto group overflow-hidden`}
                >
                  <a
                    href="/docs/curriculo-erick-reis.pdf"
                    download
                    className="relative z-10 flex items-center justify-center"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-3 transition-transform duration-300 group-hover:scale-110" />
                    <span className="whitespace-nowrap font-bold tracking-wide">
                      BAIXAR CV
                    </span>
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={scrollIndicatorVariants}
          className="flex justify-center items-center w-full pb-4 lg:pb-6"
        >
          <motion.button
            onClick={() => scrollToSection("about")}
            className={`${styles.scrollIndicator} flex flex-col items-center gap-3 cursor-pointer p-4 group`}
            variants={scrollIndicatorVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <motion.span
              className="text-xs text-white/80 font-mono font-semibold tracking-wider uppercase"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Descobrir Mais
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
              className={`${styles.scrollArrow} w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300`}
            >
              <ArrowDown className="w-5 h-5 text-blue-400/90 group-hover:text-blue-300 transition-colors duration-300" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
