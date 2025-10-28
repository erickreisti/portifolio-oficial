// components/sections/Skills/Skills.tsx
"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PremiumBackground } from "@/components/layout/PremiumBackground";

const skillsData = [
  {
    category: "FRONTEND & MOBILE",
    icon: Smartphone,
    description: "Experiências digitais imersivas e responsivas",
    color: "from-blue-400 to-cyan-400",
    skills: [
      {
        name: "Next.js 14+",
        level: 96,
        color: "bg-gradient-to-r from-blue-400 to-cyan-400",
        description: "SSR, App Router, Server Actions",
      },
      {
        name: "TypeScript",
        level: 94,
        color: "bg-gradient-to-r from-cyan-400 to-purple-400",
        description: "Type Safety & Advanced Patterns",
      },
      {
        name: "React",
        level: 92,
        color: "bg-gradient-to-r from-blue-400 to-green-400",
        description: "Hooks, Context & Performance",
      },
      {
        name: "Tailwind CSS",
        level: 98,
        color: "bg-gradient-to-r from-green-400 to-cyan-400",
        description: "Utility-first & Design Systems",
      },
    ],
  },
  {
    category: "BACKEND & DATABASE",
    icon: Server,
    description: "APIs robustas e arquiteturas escaláveis",
    color: "from-purple-400 to-pink-400",
    skills: [
      {
        name: "Node.js & Express",
        level: 92,
        color: "bg-gradient-to-r from-green-400 to-emerald-400",
        description: "REST & GraphQL APIs",
      },
      {
        name: "Prisma & ORM",
        level: 85,
        color: "bg-gradient-to-r from-amber-400 to-orange-400",
        description: "Data Modeling & Migrations",
      },
      {
        name: "PostgreSQL",
        level: 88,
        color: "bg-gradient-to-r from-blue-400 to-indigo-400",
        description: "Complex Queries & Optimization",
      },
      {
        name: "Supabase & MongoDB",
        level: 82,
        color: "bg-gradient-to-r from-green-400 to-emerald-400",
        description: "Realtime & NoSQL Databases",
      },
    ],
  },
  {
    category: "CLOUD & DEVOPS",
    icon: Cloud,
    description: "Infraestrutura moderna e CI/CD",
    color: "from-orange-400 to-red-400",
    skills: [
      {
        name: "AWS & Vercel",
        level: 84,
        color: "bg-gradient-to-r from-orange-400 to-red-400",
        description: "Serverless & Edge Computing",
      },
      {
        name: "Docker & Kubernetes",
        level: 78,
        color: "bg-gradient-to-r from-blue-400 to-cyan-400",
        description: "Containerization & Orchestration",
      },
      {
        name: "CI/CD Pipelines",
        level: 87,
        color: "bg-gradient-to-r from-purple-400 to-pink-400",
        description: "GitHub Actions & Automation",
      },
      {
        name: "Git & GitHub",
        level: 96,
        color: "bg-gradient-to-r from-gray-400 to-slate-400",
        description: "Advanced Git Workflows",
      },
    ],
  },
];

// Componente Neon Element Corrigido para Skills
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

    // Animação de entrada
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

    // Animação flutuante contínua
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

// Componente Skill Bar Premium
const SkillBar = ({
  name,
  level,
  color,
  description,
  index,
}: {
  name: string;
  level: number;
  color: string;
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
          <span className="block text-sm lg:text-base font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 mb-1">
            {name}
          </span>
          <span className="block text-xs lg:text-sm text-gray-400 leading-relaxed">
            {description}
          </span>
        </div>
        <Badge className="bg-blue-400/10 text-blue-400 border-blue-400/30 font-mono font-bold px-2 py-1 text-xs lg:text-sm group-hover:scale-110 transition-transform duration-300">
          {level}%
        </Badge>
      </div>

      <div className="h-2 lg:h-3 w-full bg-gray-800/50 rounded-full overflow-hidden border border-gray-700/50 shadow-inner backdrop-blur-sm">
        <motion.div
          ref={barRef}
          initial={{ width: 0 }}
          className={`h-full rounded-full ${color} relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Componente Skill Card Premium
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
      <Card className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 shadow-2xl hover:shadow-3xl hover:border-blue-400/30 transition-all duration-500 group h-full">
        <CardHeader className="pb-6 border-b border-gray-700/50">
          <div className="flex items-center gap-4 mb-3">
            <motion.div
              className={`w-12 h-12 rounded-full bg-gradient-to-br ${group.color} flex items-center justify-center border border-gray-600/50 group-hover:scale-110 transition-transform duration-300`}
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <group.icon className="w-6 h-6 text-white" />
            </motion.div>
            <CardTitle className="text-xl lg:text-2xl font-black text-blue-400">
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

// Componente Stat Card para Skills
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
      className="text-center p-6 bg-gray-900/40 backdrop-blur-lg rounded-2xl border border-gray-700/50 hover:border-blue-400/30 transition-all duration-500 cursor-pointer hover:scale-105"
      whileHover={{ y: -5, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        <stat.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
      </div>
      <div className="text-2xl lg:text-3xl xl:text-4xl font-black text-white mb-2 group-hover:scale-105 transition-transform duration-300">
        {stat.number}
      </div>
      <div className="text-lg lg:text-xl font-bold text-white mb-1">
        {stat.title}
      </div>
      <div className="text-sm lg:text-base text-gray-400">{stat.subtitle}</div>
    </motion.div>
  );
};

export const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Neon Elements Configuration - POSIÇÕES CORRIGIDAS
  const neonElements = [
    {
      Icon: Code2,
      position: "top-20 left-10",
      color: "text-blue-400",
      delay: 0,
    },
    {
      Icon: Cpu,
      position: "top-10 right-15",
      color: "text-purple-400",
      delay: 1,
    },
    {
      Icon: Zap,
      position: "bottom-40 left-15",
      color: "text-green-400",
      delay: 2,
    },
    {
      Icon: Sparkles,
      position: "bottom-20 right-10",
      color: "text-amber-400",
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
      color: "text-emerald-400",
      delay: 5,
    },
    {
      Icon: Globe,
      position: "top-60 left-20",
      color: "text-indigo-400",
      delay: 6,
    },
    {
      Icon: Terminal,
      position: "bottom-20 left-25",
      color: "text-pink-400",
      delay: 7,
    },
  ];

  // Stats Data
  const statsData = [
    {
      number: "20+",
      title: "Tecnologias",
      subtitle: "Stack Completa",
      icon: Brain,
      color: "from-blue-400 to-cyan-400",
    },
    {
      number: "92%",
      title: "Proficiência",
      subtitle: "Média de Domínio",
      icon: Zap,
      color: "from-purple-400 to-pink-400",
    },
    {
      number: "5+",
      title: "Anos Exp",
      subtitle: "Experiência Comprovada",
      icon: Rocket,
      color: "from-amber-400 to-orange-400",
    },
    {
      number: "100%",
      title: "Qualidade",
      subtitle: "Padrão de Excelência",
      icon: Sparkles,
      color: "from-green-400 to-emerald-400",
    },
  ];

  // GSAP Animations para seção principal
  useEffect(() => {
    if (!isInView || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animação de entrada da seção
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );

      // Timeline principal
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
      className="relative min-h-screen bg-gray-950 overflow-hidden flex items-center py-24 lg:py-32 border-t border-gray-800/50"
    >
      <PremiumBackground intensity="medium" />

      {/* Elementos Neon Premium - CORRIGIDOS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {neonElements.map((element, index) => (
          <SkillsNeonElement key={index} {...element} />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16 lg:mb-24 skills-header"
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
            className="inline-flex items-center text-blue-400 bg-blue-400/10 border border-blue-400/30 px-4 py-2 rounded-full text-sm lg:text-base font-mono font-bold mb-6 lg:mb-8"
          >
            <Zap className="w-4 h-4 lg:w-5 lg:h-5 mr-2 animate-pulse" />
            DOMÍNIO TECNOLÓGICO
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black text-white mb-4 lg:mb-6">
              EXPERTISE EM{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                FULL STACK
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Domínio completo do ecossistema moderno de desenvolvimento, desde
              interfaces imersivas até infraestrutura escalável
            </p>
          </motion.div>
        </motion.div>

        {/* Grid de Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-24 skills-grid">
          {skillsData.map((group, index) => (
            <SkillCard key={group.category} group={group} index={index} />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="mb-16 lg:mb-24 skills-stats"
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

        {/* CTA */}
        <motion.div
          className="text-center skills-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-gray-900/60 to-gray-800/40 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-gray-700/50 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                viewport={{ once: true }}
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 flex items-center justify-center border border-blue-400/30 flex-shrink-0"
              >
                <GitBranch className="w-8 h-8 lg:w-10 lg:h-10 text-blue-400 animate-pulse" />
              </motion.div>

              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-black text-white mb-3">
                  Pronto para elevar seu projeto?
                </h3>
                <p className="text-lg lg:text-xl text-gray-300">
                  Vamos aplicar essa expertise técnica no seu próximo desafio
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <motion.button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-400/90 hover:to-purple-400/90 text-white font-bold text-lg px-8 lg:px-12 py-4 lg:py-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 flex items-center justify-center"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 mr-3" />
                  INICIAR COLABORAÇÃO
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
