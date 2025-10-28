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
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./Hero.module.css";

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // CORREÇÃO: useMotionValue para valores que serão animados
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Detectar mobile com base no header (80px de altura)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
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

  useEffect(() => {
    if (!elementsRef.current) return;

    const ctx = gsap.context(() => {
      // Animações de entrada mais suaves
      gsap.fromTo(
        ".hero-bg-element",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.15,
        }
      );

      // Floating elements otimizados
      gsap.to(".float-slow", {
        y: -15,
        rotation: "+=2",
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".float-medium", {
        y: -12,
        rotation: "-=1",
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.5,
      });

      gsap.to(".float-fast", {
        y: -8,
        rotation: "+=3",
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1,
      });

      // Pulsação neon mais sutil
      gsap.to(".neon-pulse", {
        opacity: 0.8,
        scale: 1.02,
        filter: "drop-shadow(0 0 15px currentColor)",
        duration: 2,
        ease: "power1.inOut",
        stagger: 0.3,
        repeat: -1,
        yoyo: true,
      });
    }, elementsRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Altura do header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const letterVariants = {
    hidden: { y: 60, opacity: 0, rotateX: -45 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.04,
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.8,
        ease: "easeOut",
      },
    },
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 1.5,
        ease: "easeOut",
      },
    },
  };

  const titleWords = ["IDEIAS", "EXTRAORDINÁRIAS", "CÓDIGO", "EXCEPCIONAL"];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen bg-slate-900 relative overflow-hidden flex items-center justify-center"
      style={{
        minHeight: "100vh", // Garantindo altura total
      }}
    >
      {/* Background Otimizado */}
      <div className="absolute inset-0">
        {/* Gradiente base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/15 to-slate-900" />

        {/* Grid sutil */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_29px,rgba(99,102,241,0.05)_30px,transparent_31px),linear-gradient(180deg,transparent_29px,rgba(99,102,241,0.05)_30px,transparent_31px)] bg-[size:40px_40px]" />
        </div>

        {/* Elementos de fundo - Reduzidos para mobile */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-72 md:h-72 bg-blue-500/8 rounded-full filter blur-3xl md:blur-4xl hero-bg-element float-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 md:w-64 md:h-64 bg-purple-500/10 rounded-full filter blur-2xl md:blur-3xl hero-bg-element float-medium" />
        <div className="absolute top-1/3 right-1/3 w-32 h-32 md:w-48 md:h-48 bg-cyan-500/6 rounded-full filter blur-2xl md:blur-2xl hero-bg-element float-fast" />
      </div>

      {/* Elementos decorativos - Otimizados */}
      <div ref={elementsRef} className="absolute inset-0 pointer-events-none">
        {/* SVG 1 - Azul Neon */}
        <div className={`${styles.decoration1} float-slow`}>
          <motion.div
            className="neon-pulse"
            whileHover={{ scale: isMobile ? 1 : 1.1, rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <Code2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-blue-400 filter drop-shadow-lg" />
          </motion.div>
        </div>

        {/* SVG 2 - Roxo Neon */}
        <div className={`${styles.decoration2} float-medium`}>
          <motion.div
            className="neon-pulse"
            whileHover={{ scale: isMobile ? 1 : 1.1, rotate: -180 }}
            transition={{ duration: 0.3 }}
          >
            <Cpu className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-purple-400 filter drop-shadow-lg" />
          </motion.div>
        </div>

        {/* SVG 3 - Verde Neon */}
        <div className={`${styles.decoration3} float-fast`}>
          <motion.div
            className="neon-pulse"
            whileHover={{ scale: isMobile ? 1 : 1.1, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <Zap className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-emerald-400 filter drop-shadow-lg" />
          </motion.div>
        </div>

        {/* SVG 4 - Ciano Neon */}
        <div className={`${styles.decoration4} float-slow`}>
          <motion.div
            className="neon-pulse"
            whileHover={{ scale: isMobile ? 1 : 1.1, rotate: -90 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-cyan-400 filter drop-shadow-lg" />
          </motion.div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container relative z-10 flex flex-col items-center justify-between w-full h-full min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Conteúdo do Hero - Centralizado verticalmente */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col items-center justify-center flex-1 w-full py-8 lg:py-12"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-6 lg:mb-10 w-full max-w-6xl mx-auto"
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
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl font-black text-white leading-tight md:leading-none mb-4 lg:mb-6 font-heading cursor-default transform-gpu perspective-1000 tracking-tight"
            >
              {titleWords.map((word, wordIndex) => (
                <motion.span
                  key={wordIndex}
                  className="block mb-2 lg:mb-3"
                  variants={itemVariants}
                >
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      custom={wordIndex * 10 + letterIndex}
                      variants={letterVariants}
                      className="inline-block backface-hidden mx-0.5 lg:mx-0.5"
                      whileHover={
                        !isMobile
                          ? {
                              scale: 1.2,
                              color: "#60a5fa",
                              y: -2,
                              transition: { duration: 0.2 },
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

            {/* Efeito de brilho atrás do título */}
            <motion.div
              className="absolute inset-0 -z-10 opacity-10 blur-xl"
              animate={{
                background: [
                  "radial-gradient(circle at 30% 50%, #60a5fa30 0%, transparent 50%)",
                  "radial-gradient(circle at 70% 30%, #a855f730 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 70%, #06b6d430 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </motion.div>

          {/* Subtítulo com animação melhorada */}
          <motion.div
            variants={subtitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full max-w-2xl lg:max-w-3xl mx-auto mb-8 lg:mb-12 px-4"
          >
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 leading-relaxed md:leading-relaxed font-light font-sans transform-gpu"
              whileHover={!isMobile ? { scale: 1.01 } : {}}
            >
              <motion.span
                className="inline-block bg-gradient-to-r from-slate-300 to-slate-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{ duration: 6, repeat: Infinity }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Transformo visões ambiciosas em soluções digitais com tecnologia
                de ponta e código impecável
              </motion.span>
            </motion.p>
          </motion.div>

          {/* CTAs - Totalmente Responsivos com Efeito de Reflexo */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-2xl lg:max-w-3xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 lg:gap-6 items-center justify-center w-full px-4"
            >
              {/* Botão Primário com Efeito de Reflexo */}
              <motion.div
                whileHover={!isMobile ? { scale: 1.03, y: -2 } : {}}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-full sm:w-auto transform-gpu"
              >
                <Button
                  asChild
                  className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white font-semibold text-sm sm:text-base lg:text-lg px-5 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 rounded-lg lg:rounded-xl shadow-lg sm:shadow-xl shadow-blue-500/25 hover:shadow-xl sm:hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 overflow-hidden border-0 w-full sm:w-auto group transform-gpu"
                >
                  <a href="#contact">
                    {/* Efeito de brilho gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 rounded-lg lg:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                    {/* Efeito de reflexo igual ao header */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 transition-transform duration-300 group-hover:scale-110 relative z-10" />
                    <span className="relative z-10 whitespace-nowrap">
                      INICIAR PROJETO
                    </span>
                  </a>
                </Button>
              </motion.div>

              {/* Botão Secundário com Efeito de Reflexo */}
              <motion.div
                whileHover={!isMobile ? { scale: 1.03, y: -2 } : {}}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-full sm:w-auto transform-gpu"
              >
                <Button
                  asChild
                  className="relative bg-white/5 backdrop-blur-lg border border-white/20 text-white font-semibold text-sm sm:text-base lg:text-lg px-5 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 rounded-lg lg:rounded-xl shadow-lg sm:shadow-xl shadow-black/15 hover:bg-white/10 hover:border-white/30 hover:shadow-xl sm:hover:shadow-2xl hover:shadow-white/10 transition-all duration-300 overflow-hidden w-full sm:w-auto group transform-gpu"
                >
                  <a href="/docs/curriculo-erick-reis.pdf" download>
                    {/* Efeito de brilho sutil */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg lg:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Efeito de reflexo igual ao header */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                    <Download className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 transition-transform duration-300 group-hover:scale-110 relative z-10" />
                    <span className="relative z-10 whitespace-nowrap">
                      BAIXAR CV
                    </span>
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator - Posicionado corretamente na parte inferior */}
        <motion.div
          variants={scrollIndicatorVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center items-end pb-6 lg:pb-8 w-full flex-none"
        >
          <motion.button
            onClick={() => scrollToSection("about")}
            whileHover={!isMobile ? { y: -2, scale: 1.02 } : {}}
            whileTap={{ y: 0, scale: 0.98 }}
            className="flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 bg-white/5 backdrop-blur-md border border-white/15 rounded-xl p-3 hover:bg-white/10 hover:border-white/25 hover:shadow-lg hover:shadow-blue-500/10 transform-gpu group"
            aria-label="Scroll para a seção About"
          >
            <motion.span
              className="text-xs text-white/70 font-mono font-medium tracking-wide uppercase"
              animate={{
                textShadow: [
                  "0 0 0px #60a5fa",
                  "0 0 6px #60a5fa",
                  "0 0 0px #60a5fa",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Explorar
            </motion.span>

            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 border border-blue-400/50 rounded-full flex items-center justify-center backdrop-blur-sm bg-blue-400/5 hover:border-blue-400/70 hover:bg-blue-400/10 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/20"
            >
              <motion.div
                animate={{ y: [0, 2, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400/80 group-hover:text-blue-400 transition-colors duration-300" />
              </motion.div>
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
