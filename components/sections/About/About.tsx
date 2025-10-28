"use client";

import {
  Zap,
  Code2,
  Users,
  Brain,
  Rocket,
  Sparkles,
  Code,
  Shield,
  Cpu,
  Globe,
  Server,
  Database,
  Layers,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./About.module.css";

// Dados da biografia
const bioData = {
  paragraph1:
    "Olá! Sou Érick Reis, um Desenvolvedor FullStack & Arquiteto de Sistemas apaixonado por transformar ideias em soluções digitais robustas e escaláveis. Minha jornada na tecnologia começou com formação em Tecnologia da Informação e Sistemas de Informação, seguida por especialização em Redes de Computadores. Essa base técnica diversificada me proporcionou uma visão holística de sistemas, que hoje aplico no desenvolvimento de aplicações modernas.",
  paragraph2:
    "Acredito que código bem escrito resolve problemas reais. Minha abordagem combina arquitetura limpa, performance como prioridade, segurança desde a concepção e escalabilidade pensada para o crescimento. Minha experiência multidisciplinar em TI me permite entregar soluções completas — desde a modelagem do banco de dados até a experiência do usuário final. Não apenas codifico features, mas orquestro sistemas que funcionam em harmonia.",
  passions: [
    {
      icon: Brain,
      text: "Arquitetura de Sistemas & Clean Code",
      description: "DDD, Clean Architecture e princípios SOLID",
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon: Zap,
      text: "Performance & Otimização Web",
      description: "Lighthouse 90%+, Core Web Vitals otimizados",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: Users,
      text: "Visão Holística de Sistemas",
      description: "Do backend à experiência do usuário final",
      color: "from-green-400 to-emerald-400",
    },
    {
      icon: Rocket,
      text: "Soluções Escaláveis",
      description: "Arquitetura preparada para crescimento",
      color: "from-orange-400 to-red-400",
    },
  ],
  highlights: [
    {
      icon: Zap,
      text: "Performance",
      value: "95%+ Lighthouse",
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon: Code2,
      text: "Arquitetura Limpa",
      value: "Código Sólido",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: Shield,
      text: "Segurança",
      value: "Desde a Concepção",
      color: "from-green-400 to-emerald-400",
    },
    {
      icon: Cpu,
      text: "Tecnologia",
      value: "Stack Moderna",
      color: "from-orange-400 to-red-400",
    },
  ],
  stats: [
    { number: "50+", label: "Projetos Entregues", suffix: "" },
    { number: "5", label: "Anos de Experiência", suffix: "+" },
    { number: "100", label: "Satisfação do Cliente", suffix: "%" },
    { number: "24/7", label: "Suporte Técnico", suffix: "" },
  ],
};

export const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Refs para animação GSAP
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const photoRef = useRef<HTMLDivElement>(null);
  const passionItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const highlightItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const neonElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Motion values para efeito 3D parallax - IGUAL AO HERO
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["2deg", "-2deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-2deg", "2deg"]);

  // Detectar mobile - IGUAL AO HERO
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animação de entrada GSAP - ESTILO HERO
  useEffect(() => {
    if (!aboutRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Background animation
      tl.fromTo(
        `.${styles.heroBg}`,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.5 }
      );

      // Neon elements entrance - ESTILO HERO
      const neonElements = neonElementsRef.current.filter(Boolean);
      tl.fromTo(
        neonElements,
        {
          opacity: 0,
          scale: 0,
          rotation: -180,
          y: 100,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );

      // Stats animation
      const statElements = statsRef.current.filter(Boolean);
      tl.fromTo(
        statElements,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
        },
        "-=0.3"
      );

      // Photo animation
      if (photoRef.current) {
        tl.fromTo(
          photoRef.current,
          {
            opacity: 0,
            x: -100,
            rotation: -10,
          },
          {
            opacity: 1,
            x: 0,
            rotation: 0,
            duration: 1,
            ease: "back.out(1.5)",
          },
          "-=0.2"
        );
      }

      // Continuous floating animations - ESTILO HERO
      const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
      neonElements.forEach((element, index) => {
        floatTl.to(
          element,
          {
            y: -15 - index * 3,
            rotation: index % 2 === 0 ? 5 : -5,
            duration: 4 + index,
            ease: "sine.inOut",
          },
          index * 0.2
        );
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!aboutRef.current || isMobile) return;

    const rect = aboutRef.current.getBoundingClientRect();
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

  // Funções helper para refs - ESTILO HERO
  const setStatRef = (index: number) => (el: HTMLDivElement | null) => {
    statsRef.current[index] = el;
  };

  const setPassionItemRef = (index: number) => (el: HTMLDivElement | null) => {
    passionItemsRef.current[index] = el;
  };

  const setHighlightItemRef =
    (index: number) => (el: HTMLDivElement | null) => {
      highlightItemsRef.current[index] = el;
    };

  const setNeonElementRef = (index: number) => (el: HTMLDivElement | null) => {
    neonElementsRef.current[index] = el;
  };

  return (
    <section
      id="about"
      ref={aboutRef}
      className={styles.aboutSection}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background com gradientes animados - ESTILO HERO */}
      <div className={styles.backgroundContainer}>
        <div className={styles.heroBg} />
        <motion.div
          className={styles.animatedOrb1}
          animate={{
            opacity: [0.08, 0.15, 0.08],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={styles.animatedOrb2}
          animate={{
            opacity: [0.12, 0.2, 0.12],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
        <motion.div
          className={styles.animatedOrb3}
          animate={{
            opacity: [0.1, 0.18, 0.1],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      {/* Elementos Neon Flutuantes - ESTILO HERO */}
      <div className={styles.neonContainer}>
        <motion.div ref={setNeonElementRef(0)} className={styles.neonElement}>
          <Code2 className={styles.neonIcon} />
        </motion.div>
        <motion.div ref={setNeonElementRef(1)} className={styles.neonElement}>
          <Cpu className={styles.neonIcon} />
        </motion.div>
        <motion.div ref={setNeonElementRef(2)} className={styles.neonElement}>
          <Database className={styles.neonIcon} />
        </motion.div>
        <motion.div ref={setNeonElementRef(3)} className={styles.neonElement}>
          <Server className={styles.neonIcon} />
        </motion.div>
        <motion.div ref={setNeonElementRef(4)} className={styles.neonElement}>
          <Globe className={styles.neonIcon} />
        </motion.div>
        <motion.div ref={setNeonElementRef(5)} className={styles.neonElement}>
          <Layers className={styles.neonIcon} />
        </motion.div>
      </div>

      <motion.div
        className={styles.container}
        style={{
          rotateX: isHovering && !isMobile ? rotateX : 0,
          rotateY: isHovering && !isMobile ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className={styles.header}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
            viewport={{ once: true }}
            className={styles.badge}
          >
            <Sparkles className={styles.badgeIcon} />
            JORNADA TECH & VISÃO
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className={styles.title}>
              MAIS DO QUE CÓDIGO,{" "}
              <span className={styles.titleGradient}>UMA VISÃO</span>
            </h1>
            <p className={styles.subtitle}>
              Conheça a mente por trás das soluções inovadoras e a paixão que
              impulsiona cada linha de código
            </p>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          {bioData.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              ref={setStatRef(index)}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className={styles.statCard}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
            >
              <div className={styles.statNumber}>
                {stat.number}
                <span className={styles.statSuffix}>{stat.suffix}</span>
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statGlow} />
            </motion.div>
          ))}
        </div>

        <div className={styles.contentGrid}>
          {/* Coluna da Esquerda */}
          <div className={styles.leftColumn}>
            {/* Foto */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className={styles.photoContainer}
            >
              <motion.div
                ref={photoRef}
                className={styles.photoWrapper}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.5 },
                }}
              >
                <Image
                  src="/images/avatar.webp"
                  alt="Erick Reis - Full Stack Developer & Tech Leader"
                  width={320}
                  height={320}
                  className={styles.photo}
                  priority
                />
                <div className={styles.photoOverlay} />
                <motion.div
                  className={styles.photoShine}
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className={styles.photoBadge}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Code className={styles.badgeIconSmall} />
                FULLSTACK
              </motion.div>
            </motion.div>

            {/* Parágrafos */}
            <div className={styles.paragraphs}>
              <motion.div
                initial={{ opacity: 0, y: 30, x: -20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className={styles.paragraphCard}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                <motion.div
                  className={styles.paragraphIndicator}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <p>{bioData.paragraph1}</p>
                <motion.div
                  className={styles.cardGlow}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30, x: -20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className={styles.paragraphCard}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                <motion.div
                  className={`${styles.paragraphIndicator} ${styles.indicatorRight}`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                <p>{bioData.paragraph2}</p>
                <motion.div
                  className={styles.cardGlow}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                />
              </motion.div>
            </div>
          </div>

          {/* Coluna da Direita */}
          <div className={styles.rightColumn}>
            {/* Card de Paixões */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className={styles.passionsCard}>
                <CardHeader className={styles.cardHeader}>
                  <CardTitle className={styles.cardTitle}>
                    <Brain className={styles.cardIcon} />
                    ESPECIALIZAÇÕES
                  </CardTitle>
                  <p className={styles.cardDescription}>
                    Áreas onde minha expertise faz a diferença
                  </p>
                </CardHeader>

                <CardContent className={styles.cardContent}>
                  {bioData.passions.map((item, index) => (
                    <motion.div
                      key={index}
                      ref={setPassionItemRef(index)}
                      className={styles.passionItem}
                      whileHover={{
                        x: 8,
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className={`${styles.passionIcon} ${item.color}`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <item.icon className={styles.passionIconInner} />
                      </motion.div>
                      <div className={styles.passionContent}>
                        <p className={styles.passionTitle}>{item.text}</p>
                        <p className={styles.passionDescription}>
                          {item.description}
                        </p>
                      </div>
                      <motion.div
                        className={styles.passionHoverGlow}
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                      />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Card de Destaques */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className={styles.highlightsCard}>
                <CardHeader className={styles.cardHeader}>
                  <CardTitle className={styles.cardTitle}>
                    <Shield className={styles.cardIcon} />
                    COMPROMISSO
                  </CardTitle>
                  <p className={styles.cardDescription}>
                    Meu padrão de excelência em cada projeto
                  </p>
                </CardHeader>
                <CardContent className={styles.highlightsContent}>
                  {bioData.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      ref={setHighlightItemRef(index)}
                      className={styles.highlightItem}
                      whileHover={{
                        scale: 1.02,
                        y: -2,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={styles.highlightLeft}>
                        <motion.div
                          className={`${styles.highlightIcon} ${highlight.color}`}
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <highlight.icon
                            className={styles.highlightIconInner}
                          />
                        </motion.div>
                        <span className={styles.highlightText}>
                          {highlight.text}
                        </span>
                      </div>
                      <motion.span
                        className={styles.highlightValue}
                        whileHover={{ scale: 1.1 }}
                      >
                        {highlight.value}
                      </motion.span>
                      <motion.div
                        className={styles.highlightPulse}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.5,
                        }}
                      />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className={styles.ctaSection}
        >
          <motion.div
            className={styles.ctaCard}
            whileHover={{
              y: -5,
              transition: { duration: 0.3 },
            }}
          >
            <div className={styles.ctaContent}>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                viewport={{ once: true }}
                className={styles.ctaIcon}
                whileHover={{ rotate: 360 }}
              >
                <Rocket className={styles.ctaIconInner} />
              </motion.div>
              <div className={styles.ctaText}>
                <h3 className={styles.ctaTitle}>
                  Pronto para o próximo nível?
                </h3>
                <p className={styles.ctaDescription}>
                  Vamos transformar sua visão em realidade com tecnologia de
                  ponta
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Button asChild className={styles.ctaButton}>
                  <a href="#contact">
                    <Sparkles className={styles.buttonIcon} />
                    <motion.span
                      animate={{
                        backgroundPosition: ["0%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className={styles.buttonTextGlow}
                    >
                      INICIAR PROJETO
                    </motion.span>
                  </a>
                </Button>
              </motion.div>
            </div>
            <motion.div
              className={styles.ctaOrb}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
