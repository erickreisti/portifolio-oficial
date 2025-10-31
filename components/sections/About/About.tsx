"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
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
  Target,
  Award,
  Clock,
  Heart,
  Calendar,
  User,
  Laptop,
  HeadphonesIcon,
  Server,
  Smartphone,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PremiumBackground } from "@/components/layout/PremiumBackground";
import { LazyComponent } from "@/components/optimization/LazyComponent";
import { OptimizedImage } from "@/components/optimization/OptimizedImage";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import LazyBackground from "@/components/optimization/LazyBackground";
import { NeonElements } from "@/components/layout/NeonElements";
import { COLORS } from "@/lib/colors";
import { AnimatedActionButton } from "@/components/ui/AnimatedActionButton";

// Dados atualizados com suas experiências reais
const STATIC_TIMELINE_DATA = [
  {
    year: "Atual",
    title: "Desenvolvedor FullStack",
    company: "Projetos Freelance",
    description:
      "Desenvolvimento de aplicativos web e websites de diferentes segmentos com tecnologias modernas",
    icon: Code2,
    color: "from-cyan-500 to-blue-500",
    projects: [
      "Aplicativos Web",
      "Websites Corporativos",
      "Sistemas Personalizados",
    ],
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
  },
  {
    year: "2017-2018",
    title: "Suporte em Tecnologia da Informação",
    company: "EMERJ - Escola da Magistratura do Estado do Rio de Janeiro",
    description:
      "Suporte técnico completo aos usuários, gerenciamento de documentos e infraestrutura de TI",
    icon: Server,
    color: "from-purple-500 to-pink-500",
    projects: [
      "Controle de Documentos",
      "Relatórios Gerenciais",
      "Suporte ao Usuário",
    ],
    skills: ["Suporte Técnico", "Redes", "Windows", "Office", "Impressoras"],
  },
  {
    year: "2014-2016",
    title: "Suporte em Tecnologia da Informação",
    company: "PRODERJ - Centro de Tecnologia do Estado do Rio de Janeiro",
    description:
      "Configuração e suporte de infraestrutura de TI com foco em sistemas Linux e redes",
    icon: Laptop,
    color: "from-green-500 to-emerald-500",
    projects: ["Configuração de Redes", "Suporte Linux", "Atendimento Remoto"],
    skills: ["Linux", "Redes", "Shell Script", "Impressoras", "Suporte Remoto"],
  },
  {
    year: "2011",
    title: "Suporte Técnico",
    company: "Orange (Contrato pela HL Consultoria)",
    description:
      "Atendimento técnico remoto e presencial para configuração e manutenção de sistemas",
    icon: HeadphonesIcon,
    color: "from-orange-500 to-red-500",
    projects: [
      "Suporte Remoto",
      "Configuração Outlook",
      "Manutenção de Micros",
    ],
    skills: ["Outlook Exchange", "VoIP", "Backup", "Manutenção", "Windows"],
  },
];

const STATIC_BIO_DATA = {
  paragraph1: (
    <>
      <span className="block mb-4 text-lg leading-relaxed text-gray-200">
        Olá! Sou <strong className="text-cyan-400">Erick Reis</strong>, um{" "}
        <strong className="text-cyan-400">Desenvolvedor FullStack</strong> com
        sólida base em tecnologia da informação.
      </span>

      <span className="block mb-4 text-lg leading-relaxed text-gray-200">
        Minha jornada começou no{" "}
        <strong className="text-cyan-400">suporte técnico</strong>, onde
        desenvolvi uma compreensão profunda de{" "}
        <strong className="text-cyan-400">
          infraestrutura e resolução de problemas
        </strong>
        .
      </span>

      <span className="block text-lg leading-relaxed text-gray-200">
        Com formação em{" "}
        <strong className="text-cyan-400">Sistemas de Informação</strong> e
        pós-graduação em{" "}
        <strong className="text-cyan-400">Redes de Computadores</strong>, possuo
        uma{" "}
        <strong className="text-cyan-400">
          visão completa do ecossistema tecnológico
        </strong>{" "}
        - desde a infraestrutura até o desenvolvimento de aplicações modernas.
      </span>
    </>
  ),

  paragraph2: (
    <>
      <span className="block mb-4 text-lg leading-relaxed text-gray-200">
        Minha transição do{" "}
        <strong className="text-cyan-400">
          suporte técnico para o desenvolvimento fullstack
        </strong>{" "}
        me proporcionou uma{" "}
        <strong className="text-cyan-400">perspectiva única</strong>: entendo
        não apenas como o código funciona, mas também como ele se integra com a
        infraestrutura e atende às necessidades reais dos usuários.
      </span>

      <span className="block text-lg leading-relaxed text-gray-200">
        Esta experiência me permite criar soluções que são não apenas{" "}
        <strong className="text-cyan-400">tecnicamente sólidas</strong>, mas
        também{" "}
        <strong className="text-cyan-400">
          práticas, escaláveis e alinhadas com os objetivos de negócio
        </strong>
        .
      </span>
    </>
  ),

  passions: [
    {
      icon: Brain,
      text: "Desenvolvimento FullStack Moderno",
      description: "React, Next.js, TypeScript e Node.js",
    },
    {
      icon: Zap,
      text: "Performance & Experiência do Usuário",
      description: "Aplicações rápidas e interfaces intuitivas",
    },
    {
      icon: Users,
      text: "Visão Completa de Sistemas",
      description: "Do backend à experiência do usuário final",
    },
    {
      icon: Rocket,
      text: "Soluções Práticas e Eficientes",
      description: "Foco em resolver problemas reais",
    },
  ],

  highlights: [
    {
      icon: Zap,
      text: "Versatilidade",
      value: "FullStack",
    },
    {
      icon: Code2,
      text: "Base Sólida",
      value: "Infra + Dev",
    },
    {
      icon: Shield,
      text: "Confiabilidade",
      value: "Soluções Estáveis",
    },
    {
      icon: Cpu,
      text: "Tecnologia",
      value: "Stack Moderna",
    },
  ],

  stats: [
    { number: "10+", label: "Projetos Entregues", suffix: "", icon: Target },
    { number: "5", label: "Anos em TI", suffix: "+", icon: Award },
    { number: "100", label: "Comprometimento", suffix: "%", icon: Heart },
    { number: "24/7", label: "Dedicação", suffix: "", icon: Clock },
  ],
};

// Componente Timeline Interativa
const InteractiveTimeline = () => {
  const [activeItem, setActiveItem] = useState(0);
  const timelineData = useMemo(() => STATIC_TIMELINE_DATA, []);

  return (
    <LazyComponent animation="fadeUp" delay={200}>
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

                <div
                  className={`w-5/12 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}
                >
                  <motion.div
                    className={`${COLORS.classes.card} ${
                      isActive
                        ? "border-cyan-400/50 shadow-2xl shadow-cyan-400/20"
                        : "border-gray-700/30"
                    } transition-all duration-300 cursor-pointer group p-6`}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
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

                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {item.description}
                    </p>
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
                          <div>
                            <div className="text-xs text-gray-400 font-semibold mb-2">
                              ATIVIDADES PRINCIPAIS:
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

                          <div>
                            <div className="text-xs text-gray-400 font-semibold mb-2">
                              HABILIDADES:
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
    </LazyComponent>
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
        { opacity: 0, scale: 0.8, y: 50 },
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
    <LazyComponent animation="scale" delay={index * 100}>
      <motion.div
        ref={cardRef}
        className={`text-center p-6 bg-gray-900/40 backdrop-blur-2xl rounded-2xl ${COLORS.borders.light} transition-all duration-400 cursor-pointer relative overflow-hidden hover:border-cyan-400/50 hover:bg-cyan-500/10 group`}
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
    </LazyComponent>
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
        { opacity: 0, x: -30 },
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
    <LazyComponent animation="fadeUp" delay={index * 50}>
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
    </LazyComponent>
  );
};

// Componente Principal About
export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  usePerformanceMonitor("AboutSection");

  const bioData = useMemo(() => STATIC_BIO_DATA, []);
  const timelineData = useMemo(() => STATIC_TIMELINE_DATA, []);

  // GSAP Animations
  useEffect(() => {
    if (!isInView || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  // Função para navegar até a seção de contato
  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const headerHeight = 80;
      const elementPosition = contactSection.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`relative min-h-screen ${COLORS.classes.background.section} section-with-header`}
    >
      <LazyBackground priority="medium">
        <PremiumBackground intensity="medium">
          <NeonElements />
        </PremiumBackground>
      </LazyBackground>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {/* Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
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
            className={`inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider ${COLORS.classes.text.accent} bg-cyan-400/10 px-6 py-3 rounded-full ${COLORS.borders.medium} backdrop-blur-2xl mb-6 relative overflow-hidden group`}
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
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-black ${COLORS.classes.text.primary} mb-6 leading-tight`}
            >
              MAIS DO QUE CÓDIGO,{" "}
              <span className={COLORS.classes.text.gradient}>
                UMA VISÃO ESTRATÉGICA
              </span>
            </h1>
            <p
              className={`text-lg lg:text-xl ${COLORS.classes.text.secondary} max-w-3xl mx-auto leading-relaxed`}
            >
              Conheça a mente por trás das soluções inovadoras e a paixão que
              impulsiona cada linha de código
            </p>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16 lg:mb-20">
          {bioData.stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Coluna da Esquerda */}
          <div className="w-full lg:w-7/12 flex flex-col gap-8">
            {/* Foto */}
            <LazyComponent animation="scale" delay={200}>
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
                  <OptimizedImage
                    src="/images/avatar.webp"
                    alt="Erick Reis - Full Stack Developer"
                    width={320}
                    height={320}
                    priority={true}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-400/5 opacity-0 transition-opacity duration-500 hover:opacity-100" />
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
                  FULLSTACK DEVELOPER
                </motion.div>
              </motion.div>
            </LazyComponent>

            {/* Parágrafos */}
            <div className="flex flex-col gap-8">
              <LazyComponent animation="fadeUp" delay={300}>
                <motion.div
                  initial={{ opacity: 0, y: 30, x: -20 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={`${COLORS.classes.card} ${COLORS.classes.cardHover} relative overflow-hidden group p-8`}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="absolute top-6 left-6 w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="relative z-10 space-y-6">
                    {bioData.paragraph1}
                  </div>
                </motion.div>
              </LazyComponent>

              <LazyComponent animation="fadeUp" delay={400}>
                <motion.div
                  initial={{ opacity: 0, y: 30, x: -20 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className={`${COLORS.classes.card} ${COLORS.classes.cardHover} relative overflow-hidden group p-8`}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="absolute top-6 right-6 w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                  <div className="relative z-10 space-y-6">
                    {bioData.paragraph2}
                  </div>
                </motion.div>
              </LazyComponent>
            </div>
          </div>

          {/* Coluna da Direita */}
          <div className="w-full lg:w-5/12 flex flex-col gap-6">
            {/* Card de Paixões */}
            <LazyComponent animation="fadeUp" delay={300}>
              <motion.div
                initial={{ opacity: 0, x: 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`${COLORS.classes.card} ${COLORS.classes.cardHover}`}
                >
                  <CardHeader className="pb-4 border-b border-cyan-400/20 relative z-10">
                    <CardTitle
                      className={`text-xl font-black ${COLORS.classes.text.accent} flex items-center mb-2`}
                    >
                      <Brain className="w-5 h-5 mr-3" />
                      ESPECIALIZAÇÕES
                    </CardTitle>
                    <p className={`${COLORS.classes.text.secondary} text-sm`}>
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
            </LazyComponent>

            {/* Card de Destaques */}
            <LazyComponent animation="fadeUp" delay={500}>
              <motion.div
                initial={{ opacity: 0, x: 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`${COLORS.classes.card} ${COLORS.classes.cardHover}`}
                >
                  <CardHeader className="pb-4 border-b border-cyan-400/20 relative z-10">
                    <CardTitle
                      className={`text-xl font-black ${COLORS.classes.text.accent} flex items-center mb-2`}
                    >
                      <Shield className="w-5 h-5 mr-3" />
                      COMPROMISSO
                    </CardTitle>
                    <p className={`${COLORS.classes.text.secondary} text-sm`}>
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
                          <span
                            className={`text-white font-medium text-sm group-hover:text-cyan-400`}
                          >
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
            </LazyComponent>
          </div>
        </div>

        {/* Timeline Interativa */}
        <LazyComponent animation="fadeUp" delay={600}>
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
                className={`inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider ${COLORS.classes.text.accent} bg-cyan-400/10 px-6 py-3 rounded-full ${COLORS.borders.medium} backdrop-blur-2xl mb-6 relative overflow-hidden group`}
              >
                <Calendar className="w-4 h-4 mr-3 animate-pulse" />
                MINHA JORNADA
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
              </motion.div>

              <h2
                className={`text-3xl sm:text-4xl lg:text-5xl font-black ${COLORS.classes.text.primary} mb-6`}
              >
                Linha do Tempo{" "}
                <span className={COLORS.classes.text.gradient}>
                  Profissional
                </span>
              </h2>
              <p
                className={`text-lg ${COLORS.classes.text.secondary} max-w-2xl mx-auto`}
              >
                Do suporte técnico ao desenvolvimento fullstack - uma jornada de
                aprendizado contínuo
              </p>
            </div>

            <InteractiveTimeline />
          </motion.div>
        </LazyComponent>

        {/* CTA Final - COM BOTÃO ATUALIZADO */}
        <LazyComponent animation="fadeUp" delay={800}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 lg:mt-20"
          >
            <motion.div
              className={`bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-2xl p-6 rounded-2xl ${COLORS.borders.light} shadow-2xl shadow-cyan-400/10 relative overflow-hidden group`}
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
                  <h3
                    className={`text-xl lg:text-2xl font-black ${COLORS.classes.text.primary} mb-2`}
                  >
                    Pronto para o próximo nível?
                  </h3>
                  <p
                    className={`${COLORS.classes.text.secondary} text-base lg:text-lg`}
                  >
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
                  <AnimatedActionButton
                    title="INICIAR PROJETO"
                    subtitle="VAMOS CONVERSAR"
                    icon={Rocket}
                    size="lg"
                    onClick={handleContactClick}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-cyan-400/50 hover:border-cyan-300/70"
                    showArrow={true}
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </LazyComponent>
      </div>

      {/* ÍCONE PARA O HEADER - ADICIONADO NO FINAL */}
      <div className="hidden">
        <User id="about-icon" />
      </div>
    </section>
  );
};

export default About;
