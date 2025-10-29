// components/sections/About/About.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";
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
  Target,
  Award,
  Clock,
  Heart,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PremiumBackground } from "@/components/layout/PremiumBackground";

// Timeline Data - FASE 1
const timelineData = [
  {
    year: "2024",
    title: "Tech Lead & Arquitetura Cloud",
    company: "Projetos Freelance",
    description:
      "Liderança técnica em projetos de grande escala, arquitetura microservices e implementação de soluções AWS",
    icon: Rocket,
    color: "from-cyan-500 to-blue-500",
    projects: ["Sistema de E-commerce", "Plataforma SaaS", "App Mobile"],
    skills: ["AWS", "Microservices", "Node.js", "React Native"],
  },
  {
    year: "2022-2023",
    title: "Desenvolvedor FullStack Sênior",
    company: "Startups & Empresas",
    description:
      "Desenvolvimento de aplicações web e mobile com foco em performance e escalabilidade",
    icon: Code2,
    color: "from-purple-500 to-pink-500",
    projects: ["Dashboard Analytics", "API REST", "PWA"],
    skills: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
  },
  {
    year: "2020-2021",
    title: "Desenvolvedor FullStack Pleno",
    company: "Agências & Clientes",
    description:
      "Implementação de sistemas completos e mentoria de desenvolvedores juniores",
    icon: Users,
    color: "from-green-500 to-emerald-500",
    projects: ["Sites Institucionais", "E-commerce", "Sistemas Internos"],
    skills: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    year: "2019",
    title: "Início da Jornada Tech",
    company: "Primeiros Projetos",
    description:
      "Transição de carreira e primeiras experiências com desenvolvimento web moderno",
    icon: Award,
    color: "from-orange-500 to-red-500",
    projects: ["Landing Pages", "Blogs", "Sistemas Básicos"],
    skills: ["HTML/CSS", "JavaScript", "PHP", "MySQL"],
  },
];

// Bio Data Original
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
    { number: "50+", label: "Projetos Entregues", suffix: "", icon: Target },
    { number: "5", label: "Anos de Experiência", suffix: "+", icon: Award },
    { number: "100", label: "Satisfação do Cliente", suffix: "%", icon: Heart },
    { number: "24/7", label: "Suporte Técnico", suffix: "", icon: Clock },
  ],
};

// Componente Timeline Interativa - FASE 1
const InteractiveTimeline = () => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="relative py-20">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500/20 to-blue-500/20" />

      <div className="space-y-12">
        {timelineData.map((item, index) => {
          const isActive = activeItem === index;
          const Icon = item.icon;

          return (
            <motion.div
              key={item.year}
              className={`relative flex items-center ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setActiveItem(index)}
            >
              {/* Ponto na linha do tempo */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <motion.div
                  className={`w-6 h-6 rounded-full bg-gradient-to-r ${
                    item.color
                  } border-4 border-gray-900 ${
                    isActive ? "scale-125" : "scale-100"
                  } transition-all duration-300`}
                  whileHover={{ scale: 1.2 }}
                />
              </div>

              {/* Card de conteúdo */}
              <div className={`w-5/12 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}>
                <motion.div
                  className={`bg-gray-900/60 backdrop-blur-xl p-6 rounded-2xl border ${
                    isActive
                      ? "border-cyan-400/50 shadow-2xl shadow-cyan-400/20"
                      : "border-gray-700/30"
                  } transition-all duration-300 cursor-pointer group`}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-2 rounded-xl bg-gradient-to-r ${item.color}/20 border ${item.color}/30`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-cyan-400 font-mono text-sm font-bold">
                        {item.year}
                      </div>
                      <h3 className="text-white font-bold text-lg">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Descrição */}
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Empresa */}
                  <div className="text-cyan-300 font-mono text-xs mb-4">
                    {item.company}
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3"
                      >
                        {/* Projetos */}
                        <div>
                          <div className="text-xs text-gray-400 font-semibold mb-2">
                            PROJETOS DESTAQUE:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.projects.map((project, i) => (
                              <motion.span
                                key={project}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded-full border border-cyan-400/20"
                              >
                                {project}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        {/* Skills */}
                        <div>
                          <div className="text-xs text-gray-400 font-semibold mb-2">
                            TECNOLOGIAS:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.skills.map((skill, i) => (
                              <motion.span
                                key={skill}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded border border-gray-700/30"
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Componente Neon Element
const NeonElement = ({
  Icon,
  position,
  color,
  delay = 0,
}: {
  Icon: any;
  position: string;
  color: string;
  delay?: number;
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    const enterAnimation = gsap.fromTo(
      element,
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
        delay: delay * 0.2,
      }
    );

    const floatAnimation = gsap.to(element, {
      y: -20,
      rotation: 5,
      duration: 4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: delay * 0.3,
    });

    return () => {
      enterAnimation.kill();
      floatAnimation.kill();
    };
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={`absolute ${position} pointer-events-none`}
    >
      <Icon className={`${color} text-2xl opacity-70`} />
    </div>
  );
};

// Componente Stat Card
const StatCard = ({ stat, index }: { stat: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: 50,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: index * 0.1,
        }
      );
    });

    return () => ctx.revert();
  }, [isInView, index]);

  return (
    <motion.div
      ref={cardRef}
      className="text-center p-6 bg-gray-900/40 backdrop-blur-2xl rounded-2xl border border-cyan-500/20 transition-all duration-400 cursor-pointer relative overflow-hidden hover:border-cyan-400/50 hover:bg-cyan-500/10 group"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-center mb-3">
        <motion.div
          className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30 group-hover:border-cyan-400/50 transition-all duration-300"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <stat.icon className="w-5 h-5 text-cyan-400" />
        </motion.div>
      </div>
      <div className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
        {stat.number}
        <span className="text-cyan-400">{stat.suffix}</span>
      </div>
      <div className="text-gray-400 font-medium text-sm tracking-wide transition-colors duration-300 group-hover:text-gray-200">
        {stat.label}
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-400/5 opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
    </motion.div>
  );
};

// Componente Passion Item
const PassionItem = ({ item, index }: { item: any; index: number }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView || !itemRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemRef.current,
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: index * 0.1,
        }
      );
    });

    return () => ctx.revert();
  }, [isInView, index]);

  return (
    <motion.div
      ref={itemRef}
      className="flex items-start gap-4 p-4 rounded-xl border border-transparent transition-all duration-300 cursor-pointer relative overflow-hidden hover:bg-cyan-500/10 hover:border-cyan-400/20 group"
      whileHover={{ x: 8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/20 transition-all duration-300 group-hover:border-cyan-400/40"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <item.icon className="w-5 h-5 text-cyan-400 transition-colors duration-300" />
      </motion.div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-base transition-colors duration-300 group-hover:text-cyan-400 mb-1">
          {item.text}
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-xl"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
      />
    </motion.div>
  );
};

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Neon Elements Configuration
  const neonElements = [
    {
      Icon: Code2,
      position: "top-20 left-10",
      color: "text-cyan-400",
      delay: 0,
    },
    {
      Icon: Cpu,
      position: "top-10 right-15",
      color: "text-cyan-400",
      delay: 1,
    },
    {
      Icon: Database,
      position: "bottom-40 left-15",
      color: "text-cyan-400",
      delay: 2,
    },
    {
      Icon: Server,
      position: "bottom-20 right-10",
      color: "text-cyan-400",
      delay: 3,
    },
    {
      Icon: Globe,
      position: "top-40 right-5",
      color: "text-cyan-400",
      delay: 4,
    },
    {
      Icon: Layers,
      position: "bottom-40 left-5",
      color: "text-cyan-400",
      delay: 5,
    },
  ];

  // GSAP Animations
  useEffect(() => {
    if (!isInView || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );

      const tl = gsap.timeline();

      tl.fromTo(
        ".about-header",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
      )
        .fromTo(
          ".about-stats",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          ".about-content-left",
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
          "-=0.2"
        )
        .fromTo(
          ".about-content-right",
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden flex items-center py-20 lg:py-28"
    >
      <PremiumBackground intensity="medium" />

      {/* Elementos Neon Harmonizados */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {neonElements.map((element, index) => (
          <NeonElement key={index} {...element} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header Harmonizado */}
        <motion.div
          className="text-center mb-16 lg:mb-20 about-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-6 py-3 rounded-full border border-cyan-400/30 backdrop-blur-2xl mb-6 relative overflow-hidden group"
          >
            <Sparkles className="w-4 h-4 mr-3 animate-pulse" />
            JORNADA & EXPERTISE
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              MAIS DO QUE CÓDIGO,{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                UMA VISÃO ESTRATÉGICA
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Conheça a mente por trás das soluções inovadoras e a paixão que
              impulsiona cada linha de código
            </p>
          </motion.div>
        </motion.div>

        {/* Stats Harmonizados */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16 lg:mb-20 about-stats">
          {bioData.stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Coluna da Esquerda */}
          <div className="w-full lg:w-7/12 flex flex-col gap-8 about-content-left">
            {/* Foto Harmonizada */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex justify-center relative"
            >
              <motion.div
                className="relative h-64 w-64 sm:h-72 sm:w-72 lg:h-80 lg:w-80 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-400/20"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/images/avatar.webp"
                  alt="Erick Reis - Full Stack Developer & Tech Leader"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-400/5 opacity-0 transition-opacity duration-500 hover:opacity-100" />
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
                className="absolute -bottom-3 -right-3 bg-gradient-to-br from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full font-mono font-bold text-sm tracking-wider shadow-2xl shadow-cyan-400/40 border border-white/20 backdrop-blur-2xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Code className="w-3 h-3 inline mr-2" />
                FULLSTACK ENGINEER
              </motion.div>
            </motion.div>

            {/* Parágrafos Harmonizados */}
            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30, x: -20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-900/60 backdrop-blur-2xl p-6 rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-400/10 transition-all duration-400 relative overflow-hidden hover:border-cyan-400/50 hover:shadow-cyan-400/20 group"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="absolute top-4 left-4 w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <p className="text-gray-200 text-base lg:text-lg leading-relaxed font-light relative z-10">
                  {bioData.paragraph1}
                </p>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30, x: -20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-gray-900/60 backdrop-blur-2xl p-6 rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-400/10 transition-all duration-400 relative overflow-hidden hover:border-cyan-400/50 hover:shadow-cyan-400/20 group"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                <p className="text-gray-200 text-base lg:text-lg leading-relaxed font-light relative z-10">
                  {bioData.paragraph2}
                </p>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                />
              </motion.div>
            </div>
          </div>

          {/* Coluna da Direita */}
          <div className="w-full lg:w-5/12 flex flex-col gap-6 about-content-right">
            {/* Card de Paixões Harmonizado */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900/60 backdrop-blur-2xl border-cyan-400/20 shadow-2xl shadow-cyan-400/10 transition-all duration-400 hover:shadow-cyan-400/20">
                <CardHeader className="pb-4 border-b border-cyan-400/20 relative z-10">
                  <CardTitle className="text-xl font-black text-cyan-400 flex items-center mb-2">
                    <Brain className="w-5 h-5 mr-3" />
                    ESPECIALIZAÇÕES
                  </CardTitle>
                  <p className="text-gray-400 text-sm">
                    Áreas onde minha expertise faz a diferença
                  </p>
                </CardHeader>

                <CardContent className="pt-4 flex flex-col gap-3 relative z-10">
                  {bioData.passions.map((item, index) => (
                    <PassionItem key={index} item={item} index={index} />
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Card de Destaques Harmonizado */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900/60 backdrop-blur-2xl border-cyan-400/20 shadow-2xl shadow-cyan-400/10 transition-all duration-400 hover:shadow-cyan-400/20">
                <CardHeader className="pb-4 border-b border-cyan-400/20 relative z-10">
                  <CardTitle className="text-xl font-black text-cyan-400 flex items-center mb-2">
                    <Shield className="w-5 h-5 mr-3" />
                    COMPROMISSO
                  </CardTitle>
                  <p className="text-gray-400 text-sm">
                    Meu padrão de excelência em cada projeto
                  </p>
                </CardHeader>
                <CardContent className="pt-4 grid gap-3 relative z-10">
                  {bioData.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-800/30 transition-all duration-300 cursor-pointer relative overflow-hidden hover:bg-cyan-500/10 group"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <motion.div
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:border-cyan-400/30 border border-transparent"
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <highlight.icon className="w-3 h-3 text-cyan-400" />
                        </motion.div>
                        <span className="text-white font-medium text-sm group-hover:text-cyan-400">
                          {highlight.text}
                        </span>
                      </div>
                      <motion.span
                        className="font-mono font-bold text-cyan-400 text-sm flex-shrink-0 ml-2"
                        whileHover={{ scale: 1.1 }}
                      >
                        {highlight.value}
                      </motion.span>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Timeline Interativa - FASE 1 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
              viewport={{ once: true }}
              className="inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-6 py-3 rounded-full border border-cyan-400/30 backdrop-blur-2xl mb-6 relative overflow-hidden group"
            >
              <Calendar className="w-4 h-4 mr-3 animate-pulse" />
              MINHA JORNADA
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
              Linha do Tempo{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Profissional
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Da paixão inicial pela tecnologia até a expertise em
              desenvolvimento fullstack
            </p>
          </div>

          <InteractiveTimeline />
        </motion.div>

        {/* CTA Final Harmonizado */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 lg:mt-20"
        >
          <motion.div
            className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-2xl p-6 rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-400/10 relative overflow-hidden group"
            whileHover={{ y: -5 }}
          >
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                viewport={{ once: true }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30 shadow-xl shadow-cyan-400/30 group-hover:border-cyan-400/50"
                whileHover={{ rotate: 360 }}
              >
                <Rocket className="w-6 h-6 text-cyan-400" />
              </motion.div>
              <div className="text-center lg:text-left flex-1">
                <h3 className="text-xl lg:text-2xl font-black text-white mb-2">
                  Pronto para o próximo nível?
                </h3>
                <p className="text-gray-300 text-base lg:text-lg">
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
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 rounded-2xl border-none shadow-2xl shadow-cyan-400/30 transition-all duration-500 hover:shadow-cyan-400/50 hover:scale-105 relative overflow-hidden focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                  >
                    <Sparkles className="w-4 h-4 mr-2 transition-transform duration-300" />
                    INICIAR PROJETO
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
