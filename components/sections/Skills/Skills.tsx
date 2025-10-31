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
  TrendingUp,
  Users,
  Star,
  Rocket,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedActionButton } from "@/components/ui/AnimatedActionButton";
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

// 📊 DADOS REAIS DE ESTATÍSTICAS DO MERCADO
const MARKET_STATS = {
  nextjs: { demand: 95, salary: 120, jobs: 8500 },
  typescript: { demand: 90, salary: 115, jobs: 12000 },
  react: { demand: 88, salary: 110, jobs: 15000 },
  nodejs: { demand: 85, salary: 105, jobs: 11000 },
  postgresql: { demand: 82, salary: 100, jobs: 8000 },
  aws: { demand: 88, salary: 125, jobs: 9500 },
  docker: { demand: 80, salary: 108, jobs: 7000 },
  tailwind: { demand: 85, salary: 98, jobs: 6500 },
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

// 🎨 COMPONENTE SKILL MATRIX 3D REFATORADO - COM ANIMAÇÕES NOS BOTÕES
const SkillMatrix3D = () => {
  const [selectedCategory, setSelectedCategory] = useState("frontend");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);
  const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(new Set());
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

  // 🔥 CORREÇÃO: Persistir animação das skills
  useEffect(() => {
    if (filteredSkills.length > 0) {
      const newAnimated = new Set(animatedSkills);
      filteredSkills.forEach((skill) => {
        newAnimated.add(skill.name);
      });
      setAnimatedSkills(newAnimated);
    }
  }, [filteredSkills]);

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
      skillName,
    }: {
      level: number;
      color: string;
      skillName: string;
    }) => {
      const barRef = useRef<HTMLDivElement>(null);
      const isInView = useInView(barRef, { once: true, amount: 0.3 });

      useEffect(() => {
        if (isInView && barRef.current) {
          gsap.to(barRef.current, {
            width: `${level}%`,
            duration: ANIMATION_CONFIG.bar.duration,
            ease: ANIMATION_CONFIG.bar.ease,
          });
        }
      }, [isInView, level]);

      return (
        <div className="relative">
          <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
            <motion.div
              ref={barRef}
              initial={{
                width: animatedSkills.has(skillName) ? `${level}%` : 0,
              }}
              animate={{ width: `${level}%` }}
              transition={{
                duration: ANIMATION_CONFIG.bar.duration,
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
      );
    },
    [animatedSkills]
  );

  const SkillTooltip = useCallback(({ skill }: { skill: SkillItem }) => {
    const marketData =
      MARKET_STATS[
        skill.name
          .toLowerCase()
          .replace(/[^a-z]/g, "") as keyof typeof MARKET_STATS
      ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.8 }}
        className="absolute z-20 top-full left-1/2 transform -translate-x-1/2 mt-3 w-72 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-cyan-500/20 p-4 shadow-2xl"
      >
        <div className="text-white font-bold text-sm mb-3">{skill.name}</div>

        {/* 📊 Estatísticas Pessoais */}
        <div className="space-y-2 text-xs mb-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Sua Proficiência:</span>
            <span className="text-cyan-400 font-mono">{skill.level}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Demanda Mercado:</span>
            <span className="text-green-400 font-mono">
              {skill.popularity}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Seu Nível:</span>
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
        </div>

        {/* 📈 Dados Reais do Mercado */}
        {marketData && (
          <div className="pt-3 border-t border-gray-700">
            <div className="text-xs text-cyan-400 font-semibold mb-2">
              📈 DADOS REAIS DO MERCADO
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Demanda:
                </span>
                <span className="text-green-400">{marketData.demand}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  Vagas/mês:
                </span>
                <span className="text-blue-400">
                  {marketData.jobs.toLocaleString()}+
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Salário médio:
                </span>
                <span className="text-yellow-400">R$ {marketData.salary}k</span>
              </div>
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-gray-700 mt-2">
          <span className="text-gray-400 text-xs">{skill.description}</span>
        </div>
      </motion.div>
    );
  }, []);

  return (
    <LazyComponent animation="fadeUp" delay={200}>
      <div className="space-y-6 lg:space-y-8">
        {/* 🎛️ FILTROS E BUSCA - RESPONSIVO COM ANIMAÇÕES */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start w-full lg:w-auto">
            {STATIC_SKILLS_DATA.map((category, index) => (
              <LazyComponent
                key={category.id}
                animation="fadeIn"
                delay={100 + index * 50}
              >
                <motion.button
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-2 rounded-xl border transition-all duration-300 text-sm lg:text-base ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white border-transparent shadow-lg`
                      : "bg-gray-800/50 border-cyan-500/20 text-gray-300 hover:border-cyan-400/50"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <category.icon className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="font-semibold whitespace-nowrap">
                    {category.name}
                  </span>
                </motion.button>
              </LazyComponent>
            ))}
          </div>

          <LazyComponent animation="fadeIn" delay={300}>
            <div className="relative w-full lg:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar tecnologia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800/50 border border-cyan-500/20 rounded-xl pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-300 w-full"
              />
            </div>
          </LazyComponent>
        </div>

        {/* 🎪 MATRIX 3D - RESPONSIVO */}
        <LazyComponent animation="scale" delay={400}>
          <div className="relative">
            <motion.div
              ref={containerRef}
              className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 transition-transform duration-100 ease-out"
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
                  {/* 🃏 CARD DE SKILL - RESPONSIVO */}
                  <div
                    className={`
                    bg-gray-900/60 backdrop-blur-xl rounded-2xl p-3 lg:p-4 border h-28 lg:h-32 flex flex-col justify-between 
                    relative overflow-hidden transition-all duration-300
                    ${
                      hoveredSkill?.name === skill.name
                        ? "border-cyan-400/50 shadow-2xl shadow-cyan-400/20 scale-105 lg:scale-110"
                        : "border-cyan-500/20"
                    }
                  `}
                  >
                    <SkillLevelBadge level={skill.level} />

                    <div className="text-white font-bold text-sm lg:text-lg mb-2 line-clamp-1">
                      {skill.name}
                    </div>

                    <SkillProgressBar
                      level={skill.level}
                      color={
                        currentCategory?.color || "from-cyan-500 to-blue-500"
                      }
                      skillName={skill.name}
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
            <LazyComponent animation="fadeUp" delay={600}>
              <div className="flex justify-center mt-6 lg:mt-8">
                <div className="flex flex-wrap justify-center gap-4 lg:gap-6 text-xs lg:text-sm text-gray-400">
                  {STATIC_SKILLS_DATA.map((category) => (
                    <div key={category.id} className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 lg:w-3 lg:h-3 bg-gradient-to-r ${category.color} rounded-full`}
                      />
                      <span className="whitespace-nowrap">{category.name}</span>
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

// 📊 COMPONENTE SKILL BAR OTIMIZADO COM PERSISTÊNCIA
const SkillBar = ({
  name,
  level,
  description,
  index,
}: SkillItem & { index: number }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(barRef, { once: true, amount: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && barRef.current && !hasAnimated) {
      gsap.to(barRef.current, {
        width: `${level}%`,
        duration: ANIMATION_CONFIG.bar.duration,
        ease: ANIMATION_CONFIG.bar.ease,
        delay: index * 0.1,
        onComplete: () => setHasAnimated(true),
      });
    }
  }, [isInView, level, index, hasAnimated]);

  return (
    <LazyComponent animation="fadeUp" delay={index * 50}>
      <motion.div
        className="group cursor-pointer space-y-3 p-3 lg:p-4 rounded-xl hover:bg-gray-800/30 transition-all duration-300"
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <span className="block text-sm lg:text-base font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300 mb-1">
              {name}
            </span>
            <span className="block text-xs lg:text-sm text-gray-400 leading-relaxed line-clamp-2">
              {description}
            </span>
          </div>
          <Badge className="bg-cyan-400/10 text-cyan-400 border-cyan-400/30 font-mono font-bold px-2 py-1 text-xs lg:text-sm group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
            {level}%
          </Badge>
        </div>

        <div className="h-2 lg:h-3 w-full bg-gray-800/50 rounded-full overflow-hidden border border-cyan-500/20 shadow-inner backdrop-blur-sm">
          <motion.div
            ref={barRef}
            initial={{ width: 0 }}
            animate={hasAnimated ? { width: `${level}%` } : {}}
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </motion.div>
        </div>
      </motion.div>
    </LazyComponent>
  );
};

// 🃏 COMPONENTE SKILL CARD REFATORADO COM RESPONSIVIDADE E CENTRALIZAÇÃO
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

  // Identificar cards que devem ser centralizados em telas largas
  const shouldCenterOnLargeScreens =
    group.id === "cloud" || group.id === "tools";

  return (
    <LazyComponent animation="fadeUp" delay={index * 100}>
      <motion.div
        ref={cardRef}
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`h-full ${
          shouldCenterOnLargeScreens
            ? "lg:col-start-2" // Centraliza na segunda coluna do grid (meio)
            : ""
        }`}
      >
        <Card
          className={`${COLORS.classes.card} ${COLORS.classes.cardHover} group h-full`}
        >
          <CardHeader className="pb-4 border-b border-cyan-400/20">
            <div className="flex items-center gap-3 lg:gap-4 mb-3">
              <motion.div
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30 group-hover:border-cyan-400/50 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <group.icon className="w-5 h-5 lg:w-6 lg:h-6 text-cyan-400" />
              </motion.div>
              <CardTitle
                className={`text-lg lg:text-2xl font-black ${COLORS.classes.text.accent} leading-tight`}
              >
                {group.category}
              </CardTitle>
            </div>
            <p
              className={`text-sm lg:text-base ${COLORS.classes.text.secondary} leading-relaxed`}
            >
              {group.description}
            </p>
          </CardHeader>

          <CardContent className="pt-4 lg:pt-6 space-y-4 lg:space-y-6">
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
        className="text-center p-4 lg:p-6 bg-gray-900/40 backdrop-blur-lg rounded-2xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-500 cursor-pointer group"
        whileHover={{ y: -5, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-3 lg:mb-4 border border-cyan-400/30 group-hover:border-cyan-400/50 transition-all duration-300">
          <stat.icon className="w-6 h-6 lg:w-8 lg:h-8 text-cyan-400" />
        </div>
        <div className="text-xl lg:text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          {stat.number}
        </div>
        <div className="text-base lg:text-lg font-bold text-white mb-1">
          {stat.title}
        </div>
        <div className="text-xs lg:text-sm text-gray-400 leading-relaxed">
          {stat.subtitle}
        </div>
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28">
        {/* 🎪 HEADER */}
        <motion.div
          className="text-center mb-12 lg:mb-20"
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
            className={`inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider ${COLORS.classes.text.accent} bg-cyan-400/10 px-4 lg:px-6 py-2 lg:py-3 rounded-full ${COLORS.borders.medium} backdrop-blur-2xl mb-4 lg:mb-6 relative overflow-hidden group`}
          >
            <Zap className="w-3 h-3 lg:w-4 lg:h-4 mr-2 lg:mr-3 animate-pulse" />
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
              className={`text-3xl sm:text-4xl lg:text-6xl font-black ${COLORS.classes.text.primary} mb-4 lg:mb-6 leading-tight`}
            >
              EXPERTISE EM{" "}
              <span className={COLORS.classes.text.gradient}>FULL STACK</span>
            </h1>
            <p
              className={`text-base lg:text-xl ${COLORS.classes.text.secondary} max-w-3xl mx-auto leading-relaxed px-4`}
            >
              Domínio completo do ecossistema moderno de desenvolvimento, desde
              interfaces imersivas até infraestrutura escalável
            </p>
          </motion.div>
        </motion.div>

        {/* 🎨 SKILL MATRIX 3D */}
        <div className="mb-12 lg:mb-20">
          <SkillMatrix3D />
        </div>

        {/* 🃏 GRID DE SKILLS - RESPONSIVO COM CENTRALIZAÇÃO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 mb-12 lg:mb-20">
          {STATIC_SKILLS_DATA.map((group, index) => (
            <SkillCard key={group.id} group={group} index={index} />
          ))}
        </div>

        {/* 📊 STATS - RESPONSIVO */}
        <LazyComponent animation="fadeUp" delay={400}>
          <motion.div
            className="mb-12 lg:mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
              {STATIC_STATS_DATA.map((stat, index) => (
                <SkillsStatCard key={stat.title} stat={stat} index={index} />
              ))}
            </div>
          </motion.div>
        </LazyComponent>

        {/* 🚀 CTA FINAL - RESPONSIVO COM ANIMATEDACTIONBUTTON */}
        <LazyComponent animation="fadeUp" delay={600}>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div
              className={`bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-2xl p-6 lg:p-8 rounded-2xl ${COLORS.borders.light} shadow-2xl shadow-cyan-400/10 relative overflow-hidden group`}
            >
              <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 relative z-10">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  viewport={{ once: true }}
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30 shadow-xl shadow-cyan-400/30 group-hover:border-cyan-400/50"
                  whileHover={{ rotate: 360 }}
                >
                  <GitBranch className="w-5 h-5 lg:w-6 lg:h-6 text-cyan-400" />
                </motion.div>
                <div className="text-center lg:text-left flex-1">
                  <h3
                    className={`text-lg lg:text-2xl font-black ${COLORS.classes.text.primary} mb-2`}
                  >
                    Pronto para elevar seu projeto?
                  </h3>
                  <p
                    className={`${COLORS.classes.text.secondary} text-sm lg:text-lg`}
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
                  <AnimatedActionButton
                    title="INICIAR COLABORAÇÃO"
                    subtitle="VAMOS CONVERSAR"
                    icon={Rocket}
                    size="lg"
                    onClick={() => {
                      const contactSection = document.getElementById("contact");
                      if (contactSection) {
                        const headerHeight = 80;
                        const elementPosition =
                          contactSection.offsetTop - headerHeight;
                        window.scrollTo({
                          top: elementPosition,
                          behavior: "smooth",
                        });
                      }
                    }}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-cyan-400/50 hover:border-cyan-300/70"
                    showArrow={true}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </LazyComponent>
      </div>
    </section>
  );
};

export default Skills;
