// components/sections/Skills/Skills.tsx
"use client";

import { useEffect, useRef } from "react";
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
import styles from "./Skills.module.css";

// Dados das habilidades
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
        color: "bg-gradient-to-r from-blue-500 to-cyan-500",
        description: "SSR, App Router, Server Actions",
      },
      {
        name: "TypeScript",
        level: 94,
        color: "bg-gradient-to-r from-blue-600 to-blue-800",
        description: "Type Safety & Advanced Patterns",
      },
      {
        name: "React",
        level: 92,
        color: "bg-gradient-to-r from-cyan-500 to-blue-600",
        description: "Hooks, Context & Performance",
      },
      {
        name: "Tailwind CSS",
        level: 98,
        color: "bg-gradient-to-r from-cyan-400 to-blue-500",
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
        color: "bg-gradient-to-r from-green-500 to-emerald-500",
        description: "REST & GraphQL APIs",
      },
      {
        name: "Prisma & ORM",
        level: 85,
        color: "bg-gradient-to-r from-yellow-500 to-amber-500",
        description: "Data Modeling & Migrations",
      },
      {
        name: "PostgreSQL",
        level: 88,
        color: "bg-gradient-to-r from-blue-600 to-blue-700",
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
        color: "bg-gradient-to-r from-orange-500 to-red-500",
        description: "Serverless & Edge Computing",
      },
      {
        name: "Docker & Kubernetes",
        level: 78,
        color: "bg-gradient-to-r from-blue-400 to-blue-500",
        description: "Containerization & Orchestration",
      },
      {
        name: "CI/CD Pipelines",
        level: 87,
        color: "bg-gradient-to-r from-purple-500 to-purple-600",
        description: "GitHub Actions & Automation",
      },
      {
        name: "Git & GitHub",
        level: 96,
        color: "bg-gradient-to-r from-gray-600 to-gray-800",
        description: "Advanced Git Workflows",
      },
    ],
  },
];

// Componente da Barra de Habilidade
interface SkillBarProps {
  name: string;
  level: number;
  color: string;
  description: string;
  index: number;
}

const SkillBar: React.FC<SkillBarProps> = ({
  name,
  level,
  color,
  description,
  index,
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
    <div className="group cursor-pointer space-y-3">
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          <span className="block text-sm lg:text-base font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 mb-1">
            {name}
          </span>
          <span className="block text-xs lg:text-sm text-gray-400 leading-relaxed">
            {description}
          </span>
        </div>
        <Badge className="bg-blue-500/10 text-blue-400 border-blue-400/30 font-mono font-bold px-2 py-1 text-xs lg:text-sm group-hover:scale-110 transition-transform duration-300">
          {level}%
        </Badge>
      </div>

      <div className="h-2 lg:h-3 w-full bg-gray-800/50 rounded-full overflow-hidden border border-gray-700/50 shadow-inner backdrop-blur-sm">
        <motion.div
          ref={barRef}
          initial={{ width: 0 }}
          className={`h-full rounded-full ${color} ${styles.shimmerEffect} relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </motion.div>
      </div>
    </div>
  );
};

export const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const neonElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      // Animação dos elementos neon
      const neonElements = neonElementsRef.current.filter(Boolean);
      gsap.fromTo(
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
        }
      );

      // Animações flutuantes contínuas
      neonElements.forEach((element, index) => {
        gsap.to(element, {
          y: -20 - index * 5,
          rotation: index % 2 === 0 ? 10 : -10,
          duration: 3 + index,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.3,
        });
      });

      // Pulsação neon
      gsap.to(".neon-tech", {
        filter: "drop-shadow(0 0 15px currentColor) brightness(1.3)",
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  const setNeonElementRef = (index: number) => (el: HTMLDivElement | null) => {
    neonElementsRef.current[index] = el;
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen bg-gray-950 overflow-hidden border-t border-gray-800/50"
    >
      {/* Background com gradientes animados */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 60%),
              radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.12) 0%, transparent 60%),
              radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 60%),
              radial-gradient(circle at 70% 90%, rgba(245, 158, 11, 0.08) 0%, transparent 60%),
              linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)
            `,
          }}
        />

        {/* Elementos de fundo animados */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/5 w-64 h-64 bg-purple-500/08 rounded-full filter blur-3xl"
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
      </div>

      {/* Elementos Neon Flutuantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[Code2, Cpu, Zap, Sparkles, Server, Database, Globe, Terminal].map(
          (Icon, index) => (
            <motion.div
              key={index}
              ref={setNeonElementRef(index)}
              className={`absolute ${styles.neonGlow} neon-tech ${
                index === 0
                  ? "top-20 left-20"
                  : index === 1
                  ? "top-32 right-24"
                  : index === 2
                  ? "bottom-40 left-24"
                  : index === 3
                  ? "bottom-32 right-20"
                  : index === 4
                  ? "top-40 right-16"
                  : index === 5
                  ? "bottom-48 left-16"
                  : index === 6
                  ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  : "top-1/3 left-1/4"
              }`}
            >
              <Icon
                className={`
              ${
                index === 0
                  ? "text-cyan-400 text-3xl"
                  : index === 1
                  ? "text-purple-400 text-3xl"
                  : index === 2
                  ? "text-green-400 text-2xl"
                  : index === 3
                  ? "text-amber-400 text-2xl"
                  : index === 4
                  ? "text-blue-400 text-xl"
                  : index === 5
                  ? "text-emerald-400 text-xl"
                  : index === 6
                  ? "text-indigo-400 text-2xl"
                  : "text-rose-400 text-xl"
              }
            `}
              />
            </motion.div>
          )
        )}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16 lg:mb-24"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center text-blue-400 bg-blue-500/10 border border-blue-400/30 px-4 py-2 rounded-full text-sm lg:text-base font-mono font-bold mb-6 lg:mb-8"
          >
            <Zap className="w-4 h-4 lg:w-5 lg:h-5 mr-2 animate-pulse" />
            DOMÍNIO TECNOLÓGICO
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black text-white mb-4 lg:mb-6">
              EXPERTISE EM{" "}
              <span
                className={`bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent ${styles.animateGradient}`}
              >
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-24">
          {skillsData.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2, type: "spring" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 shadow-2xl hover:shadow-3xl hover:border-blue-400/30 transition-all duration-500 group h-full hover:scale-105">
                <CardHeader className="pb-6 border-b border-gray-700/50">
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${group.color} flex items-center justify-center border border-gray-600/50 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <group.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl lg:text-2xl font-black text-blue-400">
                      {group.category}
                    </CardTitle>
                  </div>
                  <p className="text-sm lg:text-base text-gray-400">
                    {group.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-6 space-y-6 lg:space-y-8">
                  {group.skills.map((skill, skillIndex) => (
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
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 lg:mb-24"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
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
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-900/40 backdrop-blur-lg rounded-2xl border border-gray-700/50 hover:border-blue-400/30 transition-all duration-500 cursor-pointer hover:scale-105"
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
                <div className="text-sm lg:text-base text-gray-400">
                  {stat.subtitle}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
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
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg px-8 lg:px-12 py-4 lg:py-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 flex items-center justify-center"
                >
                  <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 mr-3" />
                  INICIAR COLABORAÇÃO
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
