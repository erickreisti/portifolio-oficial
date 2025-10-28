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

  // Animação de entrada
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

      // Título
      const titleLetters = titleLettersRef.current.filter(Boolean);
      tl.fromTo(
        titleLetters,
        {
          opacity: 0,
          y: 80,
          scale: 1.2,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
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
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
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
            scale: 0.8,
            y: 40,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
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
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.1"
        );
      }

      // Animações contínuas dos elementos neon
      const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
      neonElements.forEach((element, index) => {
        floatTl.to(
          element,
          {
            y: -20 - index * 5,
            rotation: index % 2 === 0 ? 10 : -10,
            duration: 3 + index,
            ease: "sine.inOut",
          },
          index * 0.3
        );
      });

      // Pulsação neon
      const pulseTl = gsap.timeline({ repeat: -1, yoyo: true });
      pulseTl.to(`.${styles.neonElement}`, {
        filter: "drop-shadow(0 0 15px currentColor) brightness(1.3)",
        duration: 2,
        ease: "sine.inOut",
        stagger: 0.5,
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
        scale: 1.05,
        y: -2,
        duration: 0.2,
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
        duration: 0.2,
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
      className={styles.heroSection}
      style={{
        height: `calc(100vh - ${headerHeight}px)`,
        minHeight: `calc(100vh - ${headerHeight}px)`,
        marginTop: `${headerHeight}px`,
      }}
    >
      {/* Background Divertido com Gradientes Animados */}
      <div className={styles.backgroundContainer}>
        <motion.div
          className={styles.heroBg}
          style={{
            background: `
              radial-gradient(circle at 15% 25%, rgba(59, 130, 246, 0.25) 0%, transparent 60%),
              radial-gradient(circle at 85% 15%, rgba(139, 92, 246, 0.2) 0%, transparent 60%),
              radial-gradient(circle at 45% 75%, rgba(16, 185, 129, 0.15) 0%, transparent 60%),
              radial-gradient(circle at 75% 85%, rgba(245, 158, 11, 0.1) 0%, transparent 60%),
              radial-gradient(circle at 25% 45%, rgba(239, 68, 68, 0.1) 0%, transparent 60%),
              linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)
            `,
          }}
        />

        {/* Elementos de fundo animados */}
        <motion.div
          className={styles.animatedOrb1}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={styles.animatedOrb2}
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
        <motion.div
          className={styles.animatedOrb3}
          animate={{
            opacity: [0.1, 0.18, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Elementos Neon Flutuantes */}
      <div className={styles.neonContainer}>
        <motion.div ref={setNeonElementRef(0)} className={styles.neonElement}>
          <Code2 className={styles.neonIcon} />
        </motion.div>

        <motion.div ref={setNeonElementRef(1)} className={styles.neonElement}>
          <Cpu className={styles.neonIcon} />
        </motion.div>

        <motion.div ref={setNeonElementRef(2)} className={styles.neonElement}>
          <Zap className={styles.neonIcon} />
        </motion.div>

        <motion.div ref={setNeonElementRef(3)} className={styles.neonElement}>
          <Sparkles className={styles.neonIcon} />
        </motion.div>

        <motion.div ref={setNeonElementRef(4)} className={styles.neonElement}>
          <Server className={styles.neonIcon} />
        </motion.div>

        <motion.div ref={setNeonElementRef(5)} className={styles.neonElement}>
          <Database className={styles.neonIcon} />
        </motion.div>

        <motion.div ref={setNeonElementRef(6)} className={styles.neonElement}>
          <Globe className={styles.neonIcon} />
        </motion.div>
      </div>

      {/* Conteúdo Principal */}
      <div className={styles.contentContainer}>
        {/* Conteúdo Central - Espaçamentos Ajustados */}
        <div className={styles.mainContent}>
          {/* Título Principal */}
          <div
            className={styles.titleContainer}
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
              className={styles.mainTitle}
            >
              {titleWords.map((word, wordIndex) => (
                <span key={wordIndex} className={styles.titleLine}>
                  {word.split("").map((letter, letterIndex) => (
                    <span
                      key={`${wordIndex}-${letterIndex}`}
                      ref={setTitleLetterRef(wordIndex, letterIndex)}
                      className={styles.titleLetter}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  ))}
                </span>
              ))}
            </motion.h1>
          </div>

          {/* Subtítulo */}
          <div className={styles.subtitleContainer}>
            <motion.p ref={subtitleRef} className={styles.subtitle}>
              <span className={styles.gradientText}>
                Transformo visões ambiciosas em soluções digitais com tecnologia
                de ponta e código impecável
              </span>
            </motion.p>
          </div>

          {/* Botões CTA */}
          <div className={styles.buttonsContainer}>
            <div className={styles.buttonsWrapper}>
              <div
                ref={setButtonRef(0)}
                className={styles.buttonWrapper}
                onMouseEnter={() => handleButtonHover(0)}
                onMouseLeave={() => handleButtonLeave(0)}
              >
                <Button
                  asChild
                  className={`${styles.heroPrimaryButton} ${styles.buttonGlowEffect}`}
                >
                  <a
                    href="#contact"
                    className={styles.buttonLink}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <Mail className={styles.buttonIcon} />
                    <span className={styles.buttonText}>INICIAR PROJETO</span>
                  </a>
                </Button>
              </div>

              <div
                ref={setButtonRef(1)}
                className={styles.buttonWrapper}
                onMouseEnter={() => handleButtonHover(1)}
                onMouseLeave={() => handleButtonLeave(1)}
              >
                <Button
                  asChild
                  className={`${styles.heroSecondaryButton} ${styles.buttonGlowEffect}`}
                >
                  <a
                    href="/docs/curriculo-erick-reis.pdf"
                    download
                    className={styles.buttonLink}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <Download className={styles.buttonIcon} />
                    <span className={styles.buttonText}>BAIXAR CV</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={styles.scrollContainer}>
          <motion.button
            ref={scrollIndicatorRef}
            onClick={() => scrollToSection("about")}
            className={styles.scrollIndicator}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <motion.span
              className={styles.scrollText}
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
              className={styles.scrollArrow}
            >
              <ArrowDown className={styles.scrollIcon} />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
