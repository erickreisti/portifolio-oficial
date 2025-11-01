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
  type SkillCategory,
  type SkillItem,
} from "@/lib/skills-data";

// 🔧 CONSTANTES DE CONFIGURAÇÃO DE ANIMAÇÃO
const ANIMATION_CONFIG = {
  matrix: { duration: 0.6, stagger: 0.1 },
  card: { duration: 0.8, ease: "back.out(1.7)" },
  bar: { duration: 1.5, ease: "power3.out" },
} as const;

/**
 * 🎯 HOOK PERSONALIZADO PARA EFEITO 3D COM MOVIMENTO DO MOUSE
 * Cria um efeito de perspectiva 3D baseado na posição do mouse
 * @param ref - Referência do elemento HTML a ser animado
 */
const use3DMouseEffect = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 30 - 15; // Reduzido para mobile
      const y = (clientY / window.innerHeight) * 30 - 15; // Reduzido para mobile

      element.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
    };

    let throttled = false;
    const throttledMouseMove = (e: MouseEvent) => {
      if (!throttled) {
        handleMouseMove(e);
        throttled = true;
        setTimeout(() => {
          throttled = false;
        }, 20); // Aumentado para mobile
      }
    };

    window.addEventListener("mousemove", throttledMouseMove);
    return () => window.removeEventListener("mousemove", throttledMouseMove);
  }, [ref]);
};

/**
 * 🎨 COMPONENTE SKILL MATRIX 3D REFATORADO - OTIMIZADO PARA MOBILE
 * Exibe uma matriz interativa de habilidades com efeitos 3D e tooltips
 */
const SkillMatrix3D = () => {
  const [selectedCategory, setSelectedCategory] = useState("frontend");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);
  const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  // Aplica efeito 3D ao container
  use3DMouseEffect(containerRef);

  /**
   * Filtra as skills baseado na categoria selecionada e termo de busca
   * Usa useMemo para evitar recálculos desnecessários
   */
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

  /**
   * Persiste a animação das skills quando são filtradas
   * Garante que as animações não sejam perdidas durante buscas/filtros
   */
  useEffect(() => {
    if (filteredSkills.length > 0) {
      const newAnimated = new Set(animatedSkills);
      filteredSkills.forEach((skill) => {
        newAnimated.add(skill.name);
      });
      setAnimatedSkills(newAnimated);
    }
  }, [filteredSkills]);

  /**
   * COMPONENTE SkillLevelBadge
   * Exibe badge com porcentagem de proficiência da skill
   */
  const SkillLevelBadge = useCallback(
    ({ level }: { level: number }) => (
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
        <div className="text-cyan-400 font-mono font-bold text-xs sm:text-sm">
          {level}%
        </div>
      </div>
    ),
    []
  );

  /**
   * COMPONENTE SkillProgressBar
   * Barra de progresso animada para mostrar nível de proficiência
   */
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

      // Anima a barra de progresso quando entra na viewport
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
          <div className="w-full bg-gray-800/50 rounded-full h-1.5 sm:h-2 overflow-hidden">
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

  /**
   * COMPONENTE SkillTooltip
   * Tooltip informativo que aparece ao hover sobre uma skill
   * Mostra dados pessoais e estatísticas
   */
  const SkillTooltip = useCallback(({ skill }: { skill: SkillItem }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.8 }}
        className="fixed z-[9999] w-64 sm:w-72 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-cyan-500/20 p-3 sm:p-4 shadow-2xl"
        style={{
          filter: "drop-shadow(0 25px 60px rgba(0, 0, 0, 0.9))",
        }}
      >
        <div className="text-white font-bold text-sm mb-2 sm:mb-3">
          {skill.name}
        </div>

        {/* 📊 Estatísticas Pessoais */}
        <div className="space-y-1 sm:space-y-2 text-xs mb-2 sm:mb-3">
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
            <span className="text-yellow-400 text-xs">
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

        <div className="pt-2 sm:pt-3 border-t border-gray-700 mt-1 sm:mt-2">
          <span className="text-gray-400 text-xs">{skill.description}</span>
        </div>

        {/* Seta do tooltip */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-4 h-4">
          <div className="w-4 h-4 bg-gray-900/95 border-b border-r border-cyan-500/20 transform rotate-45"></div>
        </div>
      </motion.div>
    );
  }, []);

  // Posicionamento do tooltip baseado no mouse
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent, skill: SkillItem) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top - 20; // 20px acima do card
      setTooltipPosition({ x, y });
      setHoveredSkill(skill);
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredSkill(null);
  }, []);

  return (
    <LazyComponent animation="fadeUp" delay={200}>
      <div className="space-y-4 sm:space-y-6 lg:space-y-8 relative">
        {/* 🎛️ FILTROS E BUSCA - RESPONSIVO COM ANIMAÇÕES */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-1 sm:gap-2 justify-center sm:justify-start w-full sm:w-auto">
            {STATIC_SKILLS_DATA.map((category, index) => (
              <LazyComponent
                key={category.id}
                animation="fadeIn"
                delay={100 + index * 50}
              >
                <motion.button
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border transition-all duration-300 text-xs sm:text-sm ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white border-transparent shadow-lg`
                      : "bg-gray-800/50 border-cyan-500/20 text-gray-300 hover:border-cyan-400/50"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <category.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="font-semibold whitespace-nowrap">
                    {category.name}
                  </span>
                </motion.button>
              </LazyComponent>
            ))}
          </div>

          <LazyComponent animation="fadeIn" delay={300}>
            <div className="relative w-full sm:w-48 lg:w-64 mt-2 sm:mt-0">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar tecnologia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800/50 border border-cyan-500/20 rounded-lg sm:rounded-xl pl-7 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-300 w-full text-xs sm:text-sm"
              />
            </div>
          </LazyComponent>
        </div>

        {/* 🎪 MATRIX 3D - RESPONSIVO */}
        <LazyComponent animation="scale" delay={400}>
          <div className="relative">
            <motion.div
              ref={containerRef}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 transition-transform duration-100 ease-out"
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
                  onMouseMove={(e) => handleMouseMove(e, skill)}
                  onMouseLeave={handleMouseLeave}
                  style={{ transformStyle: "preserve-3d" as const }}
                >
                  {/* 🃏 CARD DE SKILL - RESPONSIVO */}
                  <div
                    className={`
                    bg-gray-900/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-2 sm:p-3 lg:p-4 border h-20 sm:h-24 lg:h-32 flex flex-col justify-between 
                    relative overflow-hidden transition-all duration-300
                    ${
                      hoveredSkill?.name === skill.name
                        ? "border-cyan-400/50 shadow-lg sm:shadow-2xl shadow-cyan-400/20 scale-105 lg:scale-110"
                        : "border-cyan-500/20"
                    }
                  `}
                  >
                    <SkillLevelBadge level={skill.level} />

                    <div className="text-white font-bold text-xs sm:text-sm lg:text-base mb-1 sm:mb-2 line-clamp-1">
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
                      className={`absolute inset-0 bg-gradient-to-r ${currentCategory?.color} opacity-0 group-hover:opacity-10 rounded-xl sm:rounded-2xl transition-opacity duration-300`}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* TOOLTIP FIXO QUE APARECE ACIMA DE TUDO */}
            <AnimatePresence>
              {hoveredSkill && (
                <div
                  className="fixed z-[9999] pointer-events-none"
                  style={{
                    left: tooltipPosition.x,
                    top: tooltipPosition.y,
                    transform: "translateX(-50%) translateY(-100%)",
                  }}
                >
                  <SkillTooltip skill={hoveredSkill} />
                </div>
              )}
            </AnimatePresence>

            {/* 📊 LEGENDA */}
            <LazyComponent animation="fadeUp" delay={600}>
              <div className="flex justify-center mt-4 sm:mt-6 lg:mt-8">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 lg:gap-6 text-xs text-gray-400">
                  {STATIC_SKILLS_DATA.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center gap-1 sm:gap-2"
                    >
                      <div
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 bg-gradient-to-r ${category.color} rounded-full`}
                      />
                      <span className="whitespace-nowrap text-xs sm:text-sm">
                        {category.name}
                      </span>
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

/**
 * 📊 COMPONENTE SKILL BAR OTIMIZADO COM PERSISTÊNCIA
 * Barra de progresso individual para cada skill com animação
 */
const SkillBar = ({
  name,
  level,
  description,
  index,
}: SkillItem & { index: number }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(barRef, { once: true, amount: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);

  // Anima a barra quando entra na viewport
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
        className="group cursor-pointer space-y-2 sm:space-y-3 p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl hover:bg-gray-800/30 transition-all duration-300"
        whileHover={{ x: 3 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex justify-between items-start gap-2 sm:gap-3">
          <div className="flex-1 min-w-0">
            <span className="block text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300 mb-0.5 sm:mb-1">
              {name}
            </span>
            <span className="block text-xs text-gray-400 leading-relaxed line-clamp-2">
              {description}
            </span>
          </div>
          <Badge className="bg-cyan-400/10 text-cyan-400 border-cyan-400/30 font-mono font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
            {level}%
          </Badge>
        </div>

        <div className="h-1.5 sm:h-2 lg:h-3 w-full bg-gray-800/50 rounded-full overflow-hidden border border-cyan-500/20 shadow-inner backdrop-blur-sm">
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

/**
 * 🃏 COMPONENTE SKILL CARD REFATORADO COM RESPONSIVIDADE
 * Card que agrupa skills por categoria com animações
 */
const SkillCard = ({
  group,
  index,
}: {
  group: SkillCategory;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  // Animação de entrada do card
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
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="h-full"
      >
        <Card
          className={`${COLORS.classes.card} ${COLORS.classes.cardHover} group h-full`}
        >
          <CardHeader className="pb-2 sm:pb-3 lg:pb-4 border-b border-cyan-400/20">
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-2 sm:mb-3">
              <motion.div
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30 group-hover:border-cyan-400/50 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <group.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-cyan-400" />
              </motion.div>
              <CardTitle
                className={`text-base sm:text-lg lg:text-2xl font-black ${COLORS.classes.text.accent} leading-tight`}
              >
                {group.category}
              </CardTitle>
            </div>
            <p
              className={`text-xs sm:text-sm lg:text-base ${COLORS.classes.text.secondary} leading-relaxed`}
            >
              {group.description}
            </p>
          </CardHeader>

          <CardContent className="pt-2 sm:pt-3 lg:pt-4 space-y-2 sm:space-y-3 lg:space-y-4">
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

/**
 * 🚀 COMPONENTE PRINCIPAL SKILLS
 * Seção principal que agrupa todos os componentes de skills
 */
export const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Monitora performance da seção
  usePerformanceMonitor("SkillsSection");

  // Animação de entrada da seção completa
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28">
        {/* 🎪 HEADER DA SEÇÃO */}
        <motion.div
          className="text-center mb-8 sm:mb-12 lg:mb-20"
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
            className={`inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider ${COLORS.classes.text.accent} bg-cyan-400/10 px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-3 rounded-full ${COLORS.borders.medium} backdrop-blur-2xl mb-3 sm:mb-4 lg:mb-6 relative overflow-hidden group`}
          >
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 lg:mr-3 animate-pulse" />
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
              className={`text-2xl sm:text-3xl lg:text-6xl font-black ${COLORS.classes.text.primary} mb-3 sm:mb-4 lg:mb-6 leading-tight px-2`}
            >
              EXPERTISE EM{" "}
              <span className={COLORS.classes.text.gradient}>FULL STACK</span>
            </h1>
            <p
              className={`text-sm sm:text-base lg:text-xl ${COLORS.classes.text.secondary} max-w-3xl mx-auto leading-relaxed px-4`}
            >
              Domínio completo do ecossistema moderno de desenvolvimento, desde
              interfaces imersivas até infraestrutura escalável
            </p>
          </motion.div>
        </motion.div>

        {/* 🎨 SKILL MATRIX 3D */}
        <div className="mb-8 sm:mb-12 lg:mb-20">
          <SkillMatrix3D />
        </div>

        {/* 🃏 GRID DE SKILLS - RESPONSIVO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-8 mb-8 sm:mb-12 lg:mb-20">
          {STATIC_SKILLS_DATA.map((group, index) => (
            <SkillCard key={group.id} group={group} index={index} />
          ))}
        </div>

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
              className={`bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-2xl p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl ${COLORS.borders.light} shadow-lg sm:shadow-2xl shadow-cyan-400/10 relative overflow-hidden group`}
            >
              <div className="flex flex-col lg:flex-row items-center gap-3 sm:gap-4 lg:gap-8 relative z-10">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  viewport={{ once: true }}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30 shadow-lg sm:shadow-xl shadow-cyan-400/30 group-hover:border-cyan-400/50"
                  whileHover={{ rotate: 360 }}
                >
                  <GitBranch className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-cyan-400" />
                </motion.div>
                <div className="text-center lg:text-left flex-1">
                  <h3
                    className={`text-lg sm:text-xl lg:text-2xl font-black ${COLORS.classes.text.primary} mb-1 sm:mb-2`}
                  >
                    Pronto para elevar seu projeto?
                  </h3>
                  <p
                    className={`${COLORS.classes.text.secondary} text-sm sm:text-base lg:text-lg`}
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
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-cyan-400/50 hover:border-cyan-300/70 w-full lg:w-auto"
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
