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
    },
    {
      icon: Zap,
      text: "Performance & Otimização Web",
      description: "Lighthouse 90%+, Core Web Vitals otimizados",
    },
    {
      icon: Users,
      text: "Visão Holística de Sistemas",
      description: "Do backend à experiência do usuário final",
    },
    {
      icon: Rocket,
      text: "Soluções Escaláveis",
      description: "Arquitetura preparada para crescimento",
    },
  ],
  highlights: [
    {
      icon: Zap,
      text: "Performance",
      value: "95%+ Lighthouse",
    },
    {
      icon: Code2,
      text: "Arquitetura Limpa",
      value: "Código Sólido",
    },
    {
      icon: Shield,
      text: "Segurança",
      value: "Desde a Concepção",
    },
    {
      icon: Cpu,
      text: "Tecnologia",
      value: "Stack Moderna",
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

  // Motion values para efeito 3D parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["2deg", "-2deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-2deg", "2deg"]);

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animação de entrada GSAP
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

      // Neon elements entrance
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

      // Continuous floating animations
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

  // Funções helper para refs
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
      className="relative bg-slate-900 overflow-hidden min-h-screen flex items-center py-24 lg:py-32"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background com gradientes animados */}
      <div className="absolute inset-0 overflow-hidden">
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

      {/* Elementos Neon Flutuantes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div ref={setNeonElementRef(0)} className={styles.neonElement}>
          <Code2 className="w-6 h-6 text-cyan-400" />
        </motion.div>
        <motion.div ref={setNeonElementRef(1)} className={styles.neonElement}>
          <Cpu className="w-6 h-6 text-purple-400" />
        </motion.div>
        <motion.div ref={setNeonElementRef(2)} className={styles.neonElement}>
          <Database className="w-6 h-6 text-emerald-400" />
        </motion.div>
        <motion.div ref={setNeonElementRef(3)} className={styles.neonElement}>
          <Server className="w-6 h-6 text-amber-400" />
        </motion.div>
        <motion.div ref={setNeonElementRef(4)} className={styles.neonElement}>
          <Globe className="w-6 h-6 text-blue-400" />
        </motion.div>
        <motion.div ref={setNeonElementRef(5)} className={styles.neonElement}>
          <Layers className="w-6 h-6 text-green-400" />
        </motion.div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transform-style-preserve-3d perspective-1000"
        style={{
          rotateX: isHovering && !isMobile ? rotateX : 0,
          rotateY: isHovering && !isMobile ? rotateY : 0,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16 lg:mb-24"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-400/10 px-6 py-3 rounded-full border border-blue-400/30 backdrop-blur-2xl mb-6 relative overflow-hidden"
          >
            <Sparkles className="w-4 h-4 mr-3 animate-pulse" />
            JORNADA TECH & VISÃO
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -translate-x-full transition-transform duration-600 hover:translate-x-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 leading-tight">
              MAIS DO QUE CÓDIGO,{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                UMA VISÃO
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Conheça a mente por trás das soluções inovadoras e a paixão que
              impulsiona cada linha de código
            </p>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 lg:mb-24">
          {bioData.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              ref={setStatRef(index)}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="text-center p-8 bg-slate-900/40 backdrop-blur-2xl rounded-2xl border border-slate-600/30 transition-all duration-400 cursor-pointer relative overflow-hidden hover:border-blue-400/50 hover:bg-slate-900/60"
              whileHover={{ y: -8 }}
            >
              <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                {stat.number}
                <span className="text-cyan-400">{stat.suffix}</span>
              </div>
              <div className="text-slate-400 font-mono text-sm font-bold tracking-wider uppercase transition-colors duration-300 hover:text-slate-200">
                {stat.label}
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-500/5 opacity-0 transition-opacity duration-400 hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Coluna da Esquerda */}
          <div className="w-full lg:w-7/12 flex flex-col gap-8">
            {/* Foto */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex justify-center relative"
            >
              <motion.div
                ref={photoRef}
                className="relative h-64 w-64 sm:h-72 sm:w-72 lg:h-80 lg:w-80 rounded-2xl overflow-hidden shadow-2xl shadow-blue-400/30 transform-style-preserve-3d"
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <Image
                  src="/images/avatar.webp"
                  alt="Erick Reis - Full Stack Developer & Tech Leader"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-500/5 opacity-0 transition-opacity duration-500 hover:opacity-100" />
                <motion.div
                  className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className="absolute -bottom-3 -right-3 bg-gradient-to-br from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-mono font-bold text-sm tracking-wider shadow-2xl shadow-blue-400/40 border border-white/20 backdrop-blur-2xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Code className="w-3 h-3 inline mr-2" />
                FULLSTACK
              </motion.div>
            </motion.div>

            {/* Parágrafos */}
            <div className="flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30, x: -20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-slate-900/60 backdrop-blur-2xl p-8 rounded-2xl border border-slate-600/30 shadow-2xl shadow-blue-400/10 transition-all duration-400 relative overflow-hidden hover:border-blue-400/50 hover:shadow-blue-400/20 hover:-translate-y-1"
              >
                <motion.div
                  className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <p className="text-slate-200 text-base lg:text-lg leading-relaxed font-light relative z-10">
                  {bioData.paragraph1}
                </p>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30, x: -20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-slate-900/60 backdrop-blur-2xl p-8 rounded-2xl border border-slate-600/30 shadow-2xl shadow-blue-400/10 transition-all duration-400 relative overflow-hidden hover:border-blue-400/50 hover:shadow-blue-400/20 hover:-translate-y-1"
              >
                <motion.div
                  className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                <p className="text-slate-200 text-base lg:text-lg leading-relaxed font-light relative z-10">
                  {bioData.paragraph2}
                </p>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                />
              </motion.div>
            </div>
          </div>

          {/* Coluna da Direita */}
          <div className="w-full lg:w-5/12 flex flex-col gap-8 mt-8 lg:mt-0">
            {/* Card de Paixões */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-900/60 backdrop-blur-2xl border-blue-400/20 shadow-2xl shadow-blue-400/10 transition-all duration-400 hover:shadow-blue-400/20 hover:-translate-y-1 relative overflow-hidden">
                <CardHeader className="pb-6 border-b border-slate-600/30 relative z-10">
                  <CardTitle className="text-2xl font-black text-blue-400 flex items-center mb-2">
                    <Brain className="w-6 h-6 mr-3" />
                    ESPECIALIZAÇÕES
                  </CardTitle>
                  <p className="text-slate-400 text-sm">
                    Áreas onde minha expertise faz a diferença
                  </p>
                </CardHeader>

                <CardContent className="pt-6 flex flex-col gap-4 relative z-10">
                  {bioData.passions.map((item, index) => (
                    <motion.div
                      key={index}
                      ref={setPassionItemRef(index)}
                      className="flex items-start gap-4 p-4 rounded-xl border border-transparent transition-all duration-300 cursor-pointer relative overflow-hidden hover:bg-blue-400/10 hover:border-blue-400/20 hover:translate-x-2"
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 flex items-center justify-center border border-blue-400/20 transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <item.icon className="w-5 h-5 text-blue-400 transition-colors duration-300" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-base transition-colors duration-300 hover:text-blue-400 mb-1">
                          {item.text}
                        </p>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent rounded-xl"
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
              <Card className="bg-slate-900/60 backdrop-blur-2xl border-purple-400/20 shadow-2xl shadow-purple-400/10 transition-all duration-400 hover:shadow-purple-400/20 hover:-translate-y-1 relative overflow-hidden">
                <CardHeader className="pb-6 border-b border-slate-600/30 relative z-10">
                  <CardTitle className="text-2xl font-black text-purple-400 flex items-center mb-2">
                    <Shield className="w-6 h-6 mr-3" />
                    COMPROMISSO
                  </CardTitle>
                  <p className="text-slate-400 text-sm">
                    Meu padrão de excelência em cada projeto
                  </p>
                </CardHeader>
                <CardContent className="pt-6 grid gap-4 relative z-10">
                  {bioData.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      ref={setHighlightItemRef(index)}
                      className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 transition-all duration-300 cursor-pointer relative overflow-hidden hover:bg-slate-800/50 hover:scale-102 hover:-translate-y-0.5"
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <motion.div
                          className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <highlight.icon className="w-4 h-4 text-white" />
                        </motion.div>
                        <span className="text-white font-semibold text-base">
                          {highlight.text}
                        </span>
                      </div>
                      <motion.span
                        className="font-mono font-bold text-blue-400 text-base flex-shrink-0 ml-2"
                        whileHover={{ scale: 1.1 }}
                      >
                        {highlight.value}
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent rounded-xl"
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
          className="mt-16 lg:mt-24"
        >
          <motion.div
            className="bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-2xl p-8 rounded-2xl border border-slate-600/30 shadow-2xl shadow-blue-400/10 relative overflow-hidden hover:-translate-y-1"
            whileHover={{ y: -5 }}
          >
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                viewport={{ once: true }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 flex items-center justify-center border border-blue-400/30 shadow-xl shadow-blue-400/30"
                whileHover={{ rotate: 360 }}
              >
                <Rocket className="w-8 h-8 text-blue-400" />
              </motion.div>
              <div className="text-center lg:text-left flex-1">
                <h3 className="text-2xl lg:text-3xl font-black text-white mb-2">
                  Pronto para o próximo nível?
                </h3>
                <p className="text-slate-300 text-lg lg:text-xl">
                  Vamos transformar sua visão em realidade com tecnologia de
                  ponta
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className="w-full lg:w-auto"
              >
                <Button asChild className="w-full lg:w-auto">
                  <a
                    href="#contact"
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-size-200 animate-gradient text-white font-bold text-lg lg:text-xl px-8 lg:px-10 py-4 lg:py-5 rounded-2xl border-none shadow-2xl shadow-blue-400/30 transition-all duration-500 hover:shadow-blue-400/50 hover:scale-105 relative overflow-hidden"
                  >
                    <Sparkles className="w-5 h-5 mr-3 transition-transform duration-300" />
                    <motion.span
                      animate={{ backgroundPosition: ["0%", "100%"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent bg-size-200"
                    >
                      INICIAR PROJETO
                    </motion.span>
                  </a>
                </Button>
              </motion.div>
            </div>
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-radial-gradient(circle, rgba(96, 165, 250, 0.1), transparent 70%) rounded-full"
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
