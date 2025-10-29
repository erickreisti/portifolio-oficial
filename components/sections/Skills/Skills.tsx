// components/sections/Skills/Skills.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  Code2,
  Database,
  Cloud,
  Zap,
  Brain,
  Server,
  Smartphone,
  GitBranch,
  Rocket,
  Sparkles,
  Cpu,
  Globe,
  Terminal,
  Target,
  Award,
  Clock,
  Heart,
  Search,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PremiumBackground } from "@/components/layout/PremiumBackground";

// Skill Matrix 3D Data - FASE 2
const skillCategories = [
  {
    id: "frontend",
    name: "Frontend",
    icon: Zap,
    color: "from-cyan-500 to-blue-500",
    skills: [
      { name: "Next.js", level: 96, popularity: 95 },
      { name: "TypeScript", level: 94, popularity: 90 },
      { name: "React", level: 92, popularity: 88 },
      { name: "Tailwind CSS", level: 98, popularity: 85 },
      { name: "Vue.js", level: 85, popularity: 75 },
      { name: "Svelte", level: 80, popularity: 70 },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: Cpu,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Node.js", level: 92, popularity: 90 },
      { name: "Express", level: 88, popularity: 85 },
      { name: "Python", level: 85, popularity: 80 },
      { name: "FastAPI", level: 82, popularity: 75 },
      { name: "GraphQL", level: 78, popularity: 70 },
      { name: "REST APIs", level: 95, popularity: 92 },
    ],
  },
  {
    id: "database",
    name: "Database",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "PostgreSQL", level: 88, popularity: 85 },
      { name: "MongoDB", level: 82, popularity: 80 },
      { name: "Redis", level: 85, popularity: 78 },
      { name: "Prisma", level: 85, popularity: 82 },
      { name: "SQL", level: 90, popularity: 88 },
      { name: "Supabase", level: 80, popularity: 75 },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    icon: Cloud,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "AWS", level: 84, popularity: 82 },
      { name: "Docker", level: 78, popularity: 75 },
      { name: "Vercel", level: 95, popularity: 90 },
      { name: "CI/CD", level: 87, popularity: 80 },
      { name: "Kubernetes", level: 75, popularity: 70 },
      { name: "Terraform", level: 72, popularity: 68 },
    ],
  },
];

// Componente Skill Matrix 3D - FASE 2
const SkillMatrix3D = () => {
  const [selectedCategory, setSelectedCategory] = useState("frontend");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredSkill, setHoveredSkill] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentCategory = skillCategories.find(
    (cat) => cat.id === selectedCategory
  );
  const filteredSkills =
    currentCategory?.skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // Efeito de parallax no mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 50 - 25;
      const y = (clientY / window.innerHeight) * 50 - 25;

      containerRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="space-y-8">
      {/* Filtros e Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Categorias */}
        <div className="flex flex-wrap gap-2">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
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
                <Icon className="w-4 h-4" />
                <span className="font-semibold">{category.name}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Search */}
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
      </div>

      {/* Matrix 3D */}
      <div className="relative">
        <motion.div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 transition-transform duration-100 ease-out"
          style={{ transformStyle: "preserve-3d" as const }}
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              style={{ transformStyle: "preserve-3d" as const }}
            >
              {/* Card de Skill */}
              <div
                className={`bg-gray-900/60 backdrop-blur-xl rounded-2xl p-4 border ${
                  hoveredSkill?.name === skill.name
                    ? "border-cyan-400/50 shadow-2xl shadow-cyan-400/20 scale-110"
                    : "border-cyan-500/20"
                } transition-all duration-300 h-32 flex flex-col justify-between relative overflow-hidden`}
              >
                {/* Nível de Proficiência */}
                <div className="absolute top-3 right-3">
                  <div className="text-cyan-400 font-mono font-bold text-sm">
                    {skill.level}%
                  </div>
                </div>

                {/* Nome da Skill */}
                <div className="text-white font-bold text-lg mb-2">
                  {skill.name}
                </div>

                {/* Barra de Progresso 3D */}
                <div className="relative">
                  <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: index * 0.2 }}
                      className={`h-full bg-gradient-to-r ${currentCategory?.color} rounded-full relative`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-30 animate-pulse" />
                    </motion.div>
                  </div>

                  {/* Popularidade */}
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Proficiência</span>
                    <span>Popularidade: {skill.popularity}%</span>
                  </div>
                </div>

                {/* Efeito de Glow no Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${currentCategory?.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                />
              </div>

              {/* Tooltip Detalhado */}
              <AnimatePresence>
                {hoveredSkill?.name === skill.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    className="absolute z-10 top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-cyan-500/20 p-4 shadow-2xl"
                  >
                    <div className="text-white font-bold text-sm mb-2">
                      {skill.name}
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Proficiência:</span>
                        <span className="text-cyan-400 font-mono">
                          {skill.level}%
                        </span>
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
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Legenda */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
              <span>Frontend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              <span>Backend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
              <span>Database</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
              <span>Cloud & DevOps</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skills Data Original
const skillsData = [
  {
    category: "FRONTEND & MOBILE",
    icon: Smartphone,
    description: "Experiências digitais imersivas e responsivas",
    color: "from-cyan-400 to-blue-400",
    skills: [
      {
        name: "Next.js 14+",
        level: 96,
        color: "bg-gradient-to-r from-cyan-400 to-blue-400",
        description: "SSR, App Router, Server Actions",
      },
      {
        name: "TypeScript",
        level: 94,
        color: "bg-gradient-to-r from-cyan-400 to-blue-400",
        description: "Type Safety & Advanced Patterns",
      },
      {
        name: "React",
        level: 92,
        color: "bg-gradient-to-r from-cyan-400 to-blue-400",
        description: "Hooks, Context & Performance",
      },
      {
        name: "Tailwind CSS",
        level: 98,
        color: "bg-gradient-to-r from-cyan-400 to-blue-400",
        description: "Utility-first & Design Systems",
      },
    ],
  },
  {
    category: "BACKEND & DATABASE",
    icon: Server,
    description: "APIs robustas e arquiteturas escaláveis",
    color: "from-cyan-400 to-blue-400",
    skills: [
      {
        name: "Node.js & Express",
        level: 92,
        color: "bg-gradient-to-r from-cyan-400 to-blue-400",
        description: "REST & GraphQL APIs",
      },
      {
        name: "Prisma & ORM",
        level: 85,
        color: "bg-gradient-to-r from-cyan-400 to-blue-400",
        description: "Data Modeling & Migrations",
      },
      {
        name: "PostgreSQL",
        level: 88,
        color: "bg-gradient-to-r from-cyan-400 to-blue-400",
        description: "Complex Queries & Optimization",
      },
      {
        name: "Supabase & MongoDB",
        level: 82,
        color: "bg-gradient-to-r from-cyan-400 to-blue-400",
        description: "Realtime & NoSQL Databases",
      },
    ],
  },
  {
    category: "CLOUD & DEVOPS",
    icon: Cloud,
    description: "Infraestrutura moderna e CI/CD",
    color: "from-cyan-400 to-blue-400",
    skills: [
      {
        name: "AWS & Vercel",
        level: 84,
        color: "bg-gradient-to-r from-cyan-400 to-blue-400",
        description: "Serverless & Edge Computing",
      },
      {
        name: "Docker & Kubernetes",
        level: 78,
        color: "bg-gradient-to-r from-cyan-400 to-blue-400",
        description: "Containerization & Orchestration",
      },
      {
        name: "CI/CD Pipelines",
        level: 87,
        color: "bg-gradient-to-r from-cyan-400 to-blue-400",
        description: "GitHub Actions & Automation",
      },
      {
        name: "Git & GitHub",
        level: 96,
        color: "bg-gradient-to-r from-cyan-400 to-blue-400",
        description: "Advanced Git Workflows",
      },
    ],
  },
];

// Componente Neon Element Harmonizado
const SkillsNeonElement = ({
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
      y: -15,
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

// Componente Skill Bar Harmonizado
const SkillBar = ({
  name,
  level,
  description,
  index,
}: {
  name: string;
  level: number;
  description: string;
  index: number;
}) => {
  const barRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(barRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView && barRef.current) {
      gsap.to(barRef.current, {
        width: `${level}%`,
        duration: 1.5,
        ease: "power3.out",
        delay: index * 0.1,
      });
    }
  }, [isInView, level, index]);

  return (
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
          <span className="block text-xs lg:text-sm text-gray-400 leading-relaxed">
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
  );
};

// Componente Skill Card Harmonizado
const SkillCard = ({ group, index }: { group: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: index * 0.2,
        }
      );
    });

    return () => ctx.revert();
  }, [isInView, index]);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="bg-gray-900/60 backdrop-blur-xl border border-cyan-500/20 shadow-2xl hover:shadow-cyan-400/20 hover:border-cyan-400/50 transition-all duration-500 group h-full">
        <CardHeader className="pb-4 border-b border-cyan-400/20">
          <div className="flex items-center gap-4 mb-3">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30 group-hover:border-cyan-400/50 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <group.icon className="w-6 h-6 text-cyan-400" />
            </motion.div>
            <CardTitle className="text-xl lg:text-2xl font-black text-cyan-400">
              {group.category}
            </CardTitle>
          </div>
          <p className="text-sm lg:text-base text-gray-400">
            {group.description}
          </p>
        </CardHeader>

        <CardContent className="pt-6 space-y-6 lg:space-y-8">
          {group.skills.map((skill: any, skillIndex: number) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: skillIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <SkillBar {...skill} index={skillIndex} />
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Componente Stat Card Harmonizado
const SkillsStatCard = ({ stat, index }: { stat: any; index: number }) => {
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
          y: 30,
        },
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
  );
};

export const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Neon Elements Configuration - CORES HARMONIZADAS
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
      Icon: Zap,
      position: "bottom-40 left-15",
      color: "text-cyan-400",
      delay: 2,
    },
    {
      Icon: Sparkles,
      position: "bottom-20 right-10",
      color: "text-cyan-400",
      delay: 3,
    },
    {
      Icon: Server,
      position: "top-40 right-5",
      color: "text-cyan-400",
      delay: 4,
    },
    {
      Icon: Database,
      position: "bottom-40 left-5",
      color: "text-cyan-400",
      delay: 5,
    },
  ];

  // Stats Data Harmonizada
  const statsData = [
    {
      number: "20+",
      title: "Tecnologias",
      subtitle: "Stack Completa",
      icon: Target,
      color: "from-cyan-400 to-blue-400",
    },
    {
      number: "92%",
      title: "Proficiência",
      subtitle: "Média de Domínio",
      icon: Award,
      color: "from-cyan-400 to-blue-400",
    },
    {
      number: "5+",
      title: "Anos Exp",
      subtitle: "Experiência Comprovada",
      icon: Clock,
      color: "from-cyan-400 to-blue-400",
    },
    {
      number: "100%",
      title: "Qualidade",
      subtitle: "Padrão de Excelência",
      icon: Heart,
      color: "from-cyan-400 to-blue-400",
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
        ".skills-header",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
      )
        .fromTo(
          ".skills-grid",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          ".skills-stats",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .fromTo(
          ".skills-cta",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden flex items-center py-20 lg:py-28"
    >
      <PremiumBackground intensity="medium" />

      {/* Elementos Neon Harmonizados */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {neonElements.map((element, index) => (
          <SkillsNeonElement key={index} {...element} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header Harmonizado */}
        <motion.div
          className="text-center mb-16 lg:mb-20 skills-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-6 py-3 rounded-full border border-cyan-400/30 backdrop-blur-2xl mb-6 relative overflow-hidden group"
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              EXPERTISE EM{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                FULL STACK
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Domínio completo do ecossistema moderno de desenvolvimento, desde
              interfaces imersivas até infraestrutura escalável
            </p>
          </motion.div>
        </motion.div>

        {/* Skill Matrix 3D - FASE 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16 lg:mb-20"
        >
          <SkillMatrix3D />
        </motion.div>

        {/* Grid de Skills Harmonizado */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20 skills-grid">
          {skillsData.map((group, index) => (
            <SkillCard key={group.category} group={group} index={index} />
          ))}
        </div>

        {/* Stats Harmonizado */}
        <motion.div
          className="mb-16 lg:mb-20 skills-stats"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {statsData.map((stat, index) => (
              <SkillsStatCard key={stat.title} stat={stat} index={index} />
            ))}
          </div>
        </motion.div>

        {/* CTA Harmonizado */}
        <motion.div
          className="text-center skills-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-2xl p-8 rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-400/10 relative overflow-hidden group">
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
                <h3 className="text-xl lg:text-2xl font-black text-white mb-2">
                  Pronto para elevar seu projeto?
                </h3>
                <p className="text-gray-300 text-base lg:text-lg">
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
                <Button asChild className="w-full lg:w-auto">
                  <a
                    href="#contact"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 rounded-2xl border-none shadow-2xl shadow-cyan-400/30 transition-all duration-500 hover:shadow-cyan-400/50 hover:scale-105 relative overflow-hidden focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                  >
                    <Sparkles className="w-4 h-4 mr-2 transition-transform duration-300" />
                    INICIAR COLABORAÇÃO
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
