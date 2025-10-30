"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  Code2,
  Database,
  Cloud,
  Zap,
  Server,
  Smartphone,
  GitBranch,
  Sparkles,
  Cpu,
  Target,
  Award,
  Clock,
  Heart,
  Search,
  Code,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PremiumBackground } from "@/components/layout/PremiumBackground";
import { LazyComponent } from "@/components/optimization/LazyComponent";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import LazyBackground from "@/components/optimization/LazyBackground";
import { NeonElements } from "@/components/layout/NeonElements";
import { COLORS } from "@/lib/colors";
import {
  STATIC_SKILLS_DATA,
  STATIC_STATS_DATA,
  type SkillCategory,
  type SkillItem,
} from "@/lib/skills-data";

// 🔧 CONSTANTES E TIPOS OTIMIZADOS
const ANIMATION_CONFIG = {
  matrix: { duration: 0.6, stagger: 0.1 },
  card: { duration: 0.8, ease: "back.out(1.7)" },
  bar: { duration: 1.5, ease: "power3.out" },
} as const;

// 🎯 HOOK PERSONALIZADO PARA 3D EFFECT
const use3DMouseEffect = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 50 - 25;
      const y = (clientY / window.innerHeight) * 50 - 25;

      element.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
    };

    let throttled = false;
    const throttledMouseMove = (e: MouseEvent) => {
      if (!throttled) {
        handleMouseMove(e);
        throttled = true;
        setTimeout(() => {
          throttled = false;
        }, 16);
      }
    };

    window.addEventListener("mousemove", throttledMouseMove);
    return () => window.removeEventListener("mousemove", throttledMouseMove);
  }, [ref]);
};

// 🎨 COMPONENTE SKILL MATRIX 3D REFATORADO
const SkillMatrix3D = () => {
  const [selectedCategory, setSelectedCategory] = useState("frontend");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  use3DMouseEffect(containerRef);

  const { currentCategory, filteredSkills } = useMemo(() => {
    const currentCategory = STATIC_SKILLS_DATA.find(
      (cat) => cat.id === selectedCategory
    );
    const filteredSkills =
      currentCategory?.skills.filter((skill) =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];

    return { currentCategory, filteredSkills };
  }, [selectedCategory, searchTerm]);

  const SkillLevelBadge = useCallback(
    ({ level }: { level: number }) => (
      <div className="absolute top-3 right-3">
        <div className="text-cyan-400 font-mono font-bold text-sm">
          {level}%
        </div>
      </div>
    ),
    []
  );

  const SkillProgressBar = useCallback(
    ({
      level,
      color,
      index,
    }: {
      level: number;
      color: string;
      index: number;
    }) => (
      <div className="relative">
        <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{
              duration: ANIMATION_CONFIG.bar.duration,
              delay: index * 0.2,
            }}
            className={`h-full bg-gradient-to-r ${color} rounded-full relative`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-30 animate-pulse" />
          </motion.div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Proficiência</span>
          <span>Popularidade: {level}%</span>
        </div>
      </div>
    ),
    []
  );

  const SkillTooltip = useCallback(
    ({ skill }: { skill: SkillItem }) => (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.8 }}
        className="absolute z-10 top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-cyan-500/20 p-4 shadow-2xl"
      >
        <div className="text-white font-bold text-sm mb-2">{skill.name}</div>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-400">Proficiência:</span>
            <span className="text-cyan-400 font-mono">{skill.level}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Demanda:</span>
            <span className="text-green-400 font-mono">
              {skill.popularity}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Experiência:</span>
            <span className="text-yellow-400">
              {skill.level >= 90
                ? "Expert"
                : skill.level >= 80
                ? "Avançado"
                : skill.level >= 70
                ? "Intermediário"
                : "Básico"}
            </span>
          </div>
          <div className="pt-2 border-t border-gray-700">
            <span className="text-gray-400 text-xs">{skill.description}</span>
          </div>
        </div>
      </motion.div>
    ),
    []
  );

  return (
    <LazyComponent animation="fadeUp" delay={200}>
      <div className="space-y-8">
        {/* 🎛️ FILTROS E BUSCA */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {STATIC_SKILLS_DATA.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white border-transparent shadow-lg`
                    : "bg-gray-800/50 border-cyan-500/20 text-gray-300 hover:border-cyan-400/50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <category.icon className="w-4 h-4" />
                <span className="font-semibold">{category.name}</span>
              </motion.button>
            ))}
          </div>

          <LazyComponent animation="fadeIn" delay={100}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar tecnologia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800/50 border border-cyan-500/20 rounded-xl pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-300 w-64"
              />
            </div>
          </LazyComponent>
        </div>

        {/* 🎪 MATRIX 3D */}
        <LazyComponent animation="scale" delay={300}>
          <div className="relative">
            <motion.div
              ref={containerRef}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-transform duration-100 ease-out"
              style={{ transformStyle: "preserve-3d" as const }}
            >
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{
                    duration: ANIMATION_CONFIG.matrix.duration,
                    delay: index * ANIMATION_CONFIG.matrix.stagger,
                  }}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{ transformStyle: "preserve-3d" as const }}
                >
                  {/* 🃏 CARD DE SKILL */}
                  <div
                    className={`
                    bg-gray-900/60 backdrop-blur-xl rounded-2xl p-4 border h-32 flex flex-col justify-between 
                    relative overflow-hidden transition-all duration-300
                    ${
                      hoveredSkill?.name === skill.name
                        ? "border-cyan-400/50 shadow-2xl shadow-cyan-400/20 scale-110"
                        : "border-cyan-500/20"
                    }
                  `}
                  >
                    <SkillLevelBadge level={skill.level} />

                    <div className="text-white font-bold text-lg mb-2 line-clamp-1">
                      {skill.name}
                    </div>

                    <SkillProgressBar
                      level={skill.level}
                      color={
                        currentCategory?.color || "from-cyan-500 to-blue-500"
                      }
                      index={index}
                    />

                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${currentCategory?.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                    />
                  </div>

                  <AnimatePresence>
                    {hoveredSkill?.name === skill.name && (
                      <SkillTooltip skill={skill} />
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>

            {/* 📊 LEGENDA */}
            <LazyComponent animation="fadeUp" delay={500}>
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  {STATIC_SKILLS_DATA.map((category) => (
                    <div key={category.id} className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 bg-gradient-to-r ${category.color} rounded-full`}
                      />
                      <span>{category.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </LazyComponent>
          </div>
        </LazyComponent>
      </div>
    </LazyComponent>
  );
};

// 📊 COMPONENTE SKILL BAR OTIMIZADO
const SkillBar = ({
  name,
  level,
  description,
  index,
}: SkillItem & { index: number }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(barRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView && barRef.current) {
      gsap.to(barRef.current, {
        width: `${level}%`,
        duration: ANIMATION_CONFIG.bar.duration,
        ease: ANIMATION_CONFIG.bar.ease,
        delay: index * 0.1,
      });
    }
  }, [isInView, level, index]);

  return (
    <LazyComponent animation="fadeUp" delay={index * 50}>
      <motion.div
        className="group cursor-pointer space-y-3"
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <span className="block text-sm lg:text-base font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300 mb-1">
              {name}
            </span>
            <span className="block text-xs lg:text-sm text-gray-400 leading-relaxed line-clamp-2">
              {description}
            </span>
          </div>
          <Badge className="bg-cyan-400/10 text-cyan-400 border-cyan-400/30 font-mono font-bold px-2 py-1 text-xs lg:text-sm group-hover:scale-110 transition-transform duration-300">
            {level}%
          </Badge>
        </div>

        <div className="h-2 lg:h-3 w-full bg-gray-800/50 rounded-full overflow-hidden border border-cyan-500/20 shadow-inner backdrop-blur-sm">
          <motion.div
            ref={barRef}
            initial={{ width: 0 }}
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </motion.div>
        </div>
      </motion.div>
    </LazyComponent>
  );
};

// 🃏 COMPONENTE SKILL CARD REFATORADO
const SkillCard = ({
  group,
  index,
}: {
  group: SkillCategory;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: ANIMATION_CONFIG.card.duration,
          ease: ANIMATION_CONFIG.card.ease,
          delay: index * 0.2,
        }
      );
    });

    return () => ctx.revert();
  }, [isInView, index]);

  return (
    <LazyComponent animation="fadeUp" delay={index * 100}>
      <motion.div
        ref={cardRef}
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card
          className={`${COLORS.classes.card} ${COLORS.classes.cardHover} group h-full`}
        >
          <CardHeader className="pb-4 border-b border-cyan-400/20">
            <div className="flex items-center gap-4 mb-3">
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30 group-hover:border-cyan-400/50 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <group.icon className="w-6 h-6 text-cyan-400" />
              </motion.div>
              <CardTitle
                className={`text-xl lg:text-2xl font-black ${COLORS.classes.text.accent}`}
              >
                {group.category}
              </CardTitle>
            </div>
            <p
              className={`text-sm lg:text-base ${COLORS.classes.text.secondary}`}
            >
              {group.description}
            </p>
          </CardHeader>

          <CardContent className="pt-6 space-y-6 lg:space-y-8">
            {group.skills.map((skill, skillIndex) => (
              <LazyComponent
                key={skill.name}
                animation="fadeIn"
                delay={skillIndex * 50}
              >
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: skillIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <SkillBar {...skill} index={skillIndex} />
                </motion.div>
              </LazyComponent>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </LazyComponent>
  );
};

// 🎯 COMPONENTE STAT CARD UNIFICADO
const SkillsStatCard = ({
  stat,
  index,
}: {
  stat: (typeof STATIC_STATS_DATA)[number];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
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
        className="text-center p-6 bg-gray-900/40 backdrop-blur-lg rounded-2xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-500 cursor-pointer group"
        whileHover={{ y: -5, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-4 border border-cyan-400/30 group-hover:border-cyan-400/50 transition-all duration-300">
          <stat.icon className="w-8 h-8 text-cyan-400" />
        </div>
        <div className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          {stat.number}
        </div>
        <div className="text-lg font-bold text-white mb-1">{stat.title}</div>
        <div className="text-sm text-gray-400">{stat.subtitle}</div>
      </motion.div>
    </LazyComponent>
  );
};

// 🚀 COMPONENTE PRINCIPAL SKILLS
export const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  usePerformanceMonitor("SkillsSection");

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

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`relative min-h-screen ${COLORS.classes.background.section} section-with-header`}
    >
      <LazyBackground priority="medium">
        <PremiumBackground intensity="medium">
          <NeonElements />
        </PremiumBackground>
      </LazyBackground>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {/* 🎪 HEADER */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
            viewport={{ once: true }}
            className={`inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider ${COLORS.classes.text.accent} bg-cyan-400/10 px-6 py-3 rounded-full ${COLORS.borders.medium} backdrop-blur-2xl mb-6 relative overflow-hidden group`}
          >
            <Zap className="w-4 h-4 mr-3 animate-pulse" />
            DOMÍNIO TECNOLÓGICO
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
              EXPERTISE EM{" "}
              <span className={COLORS.classes.text.gradient}>FULL STACK</span>
            </h1>
            <p
              className={`text-lg lg:text-xl ${COLORS.classes.text.secondary} max-w-3xl mx-auto leading-relaxed`}
            >
              Domínio completo do ecossistema moderno de desenvolvimento, desde
              interfaces imersivas até infraestrutura escalável
            </p>
          </motion.div>
        </motion.div>

        {/* 🎨 SKILL MATRIX 3D */}
        <SkillMatrix3D />

        {/* 🃏 GRID DE SKILLS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20">
          {STATIC_SKILLS_DATA.map((group, index) => (
            <SkillCard key={group.id} group={group} index={index} />
          ))}
        </div>

        {/* 📊 STATS */}
        <LazyComponent animation="fadeUp" delay={400}>
          <motion.div
            className="mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {STATIC_STATS_DATA.map((stat, index) => (
                <SkillsStatCard key={stat.title} stat={stat} index={index} />
              ))}
            </div>
          </motion.div>
        </LazyComponent>

        {/* 🚀 CTA FINAL */}
        <LazyComponent animation="fadeUp" delay={600}>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div
              className={`bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-2xl p-8 rounded-2xl ${COLORS.borders.light} shadow-2xl shadow-cyan-400/10 relative overflow-hidden group`}
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
                  <GitBranch className="w-6 h-6 text-cyan-400" />
                </motion.div>
                <div className="text-center lg:text-left flex-1">
                  <h3
                    className={`text-xl lg:text-2xl font-black ${COLORS.classes.text.primary} mb-2`}
                  >
                    Pronto para elevar seu projeto?
                  </h3>
                  <p
                    className={`${COLORS.classes.text.secondary} text-base lg:text-lg`}
                  >
                    Vamos aplicar essa expertise técnica no seu próximo desafio
                  </p>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="w-full lg:w-auto"
                >
                  <Button asChild className={COLORS.classes.button.primary}>
                    <a href="#contact">
                      <Sparkles className="w-4 h-4 mr-2 transition-transform duration-300" />
                      INICIAR COLABORAÇÃO
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </LazyComponent>
      </div>

      {/* 🔗 ÍCONE PARA O HEADER */}
      <div className="hidden">
        <Code id="skills-icon" />
      </div>
    </section>
  );
};

export default Skills;
