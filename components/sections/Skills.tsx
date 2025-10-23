"use client";

import MotionDiv from "@/components/ui/MotionDiv";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Code2,
  Database,
  Cloud,
  Zap,
  Cpu,
  CircuitBoard,
  Binary,
  Rocket,
  Sparkles,
  Brain,
  Server,
  Smartphone,
  GitBranch,
} from "lucide-react";

// Dados das habilidades atualizados
const skillsData = [
  {
    category: "FRONTEND & MOBILE",
    icon: Smartphone,
    description: "Experiências digitais imersivas e responsivas",
    skills: [
      {
        name: "Next.js 14+",
        level: 96,
        color: "from-gray-700 to-gray-900",
        description: "SSR, App Router, Server Actions",
      },
      {
        name: "TypeScript",
        level: 94,
        color: "from-blue-600 to-blue-800",
        description: "Type Safety & Advanced Patterns",
      },
      {
        name: "React/React Native",
        level: 92,
        color: "from-cyan-500 to-blue-600",
        description: "Cross-platform Development",
      },
      {
        name: "Tailwind CSS",
        level: 98,
        color: "from-cyan-400 to-blue-500",
        description: "Utility-first & Design Systems",
      },
    ],
  },
  {
    category: "BACKEND & DATABASE",
    icon: Server,
    description: "APIs robustas e arquiteturas escaláveis",
    skills: [
      {
        name: "Node.js & Express",
        level: 92,
        color: "from-green-600 to-green-700",
        description: "REST & GraphQL APIs",
      },
      {
        name: "Python & FastAPI",
        level: 85,
        color: "from-yellow-500 to-yellow-600",
        description: "High-performance APIs",
      },
      {
        name: "PostgreSQL",
        level: 88,
        color: "from-blue-700 to-blue-800",
        description: "Complex Queries & Optimization",
      },
      {
        name: "MongoDB",
        level: 82,
        color: "from-green-500 to-green-600",
        description: "NoSQL & Aggregation Pipelines",
      },
    ],
  },
  {
    category: "CLOUD & DEVOPS",
    icon: Cloud,
    description: "Infraestrutura moderna e CI/CD",
    skills: [
      {
        name: "AWS & Vercel",
        level: 84,
        color: "from-orange-500 to-orange-600",
        description: "Serverless & Edge Computing",
      },
      {
        name: "Docker & Kubernetes",
        level: 78,
        color: "from-blue-400 to-blue-500",
        description: "Containerization & Orchestration",
      },
      {
        name: "CI/CD Pipelines",
        level: 87,
        color: "from-purple-500 to-purple-600",
        description: "GitHub Actions & Automation",
      },
      {
        name: "Git & GitHub",
        level: 96,
        color: "from-gray-600 to-gray-800",
        description: "Advanced Git Workflows",
      },
    ],
  },
];

// Componente da Barra de Habilidade Premium Responsivo
interface SkillBarProps {
  name: string;
  level: number;
  color: string;
  description: string;
}

const SkillBar: React.FC<SkillBarProps> = ({
  name,
  level,
  color,
  description,
}) => {
  return (
    <div className="space-y-3 lg:space-y-4 group cursor-pointer">
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <span className="text-sm lg:text-lg font-sans font-semibold text-white group-hover:text-blue-300 transition-colors duration-300 block mb-1 truncate lg:whitespace-normal">
            {name}
          </span>
          <span className="text-xs lg:text-sm text-slate-400 font-sans block leading-relaxed">
            {description}
          </span>
        </div>
        <Badge
          variant="secondary"
          className="text-blue-400 font-mono font-bold bg-blue-500/10 border border-blue-400/30 group-hover:scale-110 transition-all duration-300 px-2 lg:px-3 py-1 text-xs lg:text-sm flex-shrink-0 ml-2"
        >
          {level}%
        </Badge>
      </div>

      {/* Barra Animada Premium Responsiva */}
      <div className="h-2 lg:h-3 w-full rounded-full bg-slate-800/30 overflow-hidden border border-slate-700/50 shadow-inner backdrop-blur-lg relative">
        <MotionDiv
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          whileHover={{ width: `${Math.min(level + 3, 100)}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.05 }}
          viewport={{ once: true, amount: 0.2 }}
          className={`h-full bg-gradient-to-r ${color} rounded-full relative overflow-hidden group-hover:brightness-110 transition-all duration-500 shadow-lg`}
        >
          {/* Efeito de brilho animado */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </MotionDiv>
      </div>
    </div>
  );
};

export const Skills = () => {
  return (
    <section
      id="skills"
      className="py-16 lg:py-32 bg-slate-950 relative overflow-hidden border-t border-slate-800/50"
    >
      {/* Background Premium */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Partículas de Fundo - Reduzidas para mobile */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/15 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 15 + 10}s`,
            }}
          />
        ))}
      </div>

      {/* Elementos Decorativos - Escondidos em mobile */}
      <div className="hidden lg:block absolute top-10 left-10 opacity-5 animate-float-slow">
        <Binary className="h-32 w-32 text-blue-400" />
      </div>
      <div
        className="hidden lg:block absolute bottom-10 right-10 opacity-5 animate-float-slow"
        style={{ animationDelay: "3s" }}
      >
        <CircuitBoard className="h-32 w-32 text-cyan-400" />
      </div>
      <div
        className="hidden lg:block absolute top-20 right-20 opacity-5 animate-float-slow"
        style={{ animationDelay: "6s" }}
      >
        <Cpu className="h-24 w-24 text-purple-400" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header da Seção - Premium Responsivo */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12 lg:mb-20"
        >
          <MotionDiv
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center text-xs lg:text-sm font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-4 lg:px-6 py-2 lg:py-3 rounded-full border border-blue-400/30 mb-4 lg:mb-6 relative overflow-hidden group"
          >
            <Zap className="h-3 w-3 lg:h-4 lg:w-4 mr-2 lg:mr-3 animate-pulse" />
            DOMÍNIO TECNOLÓGICO
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-heading font-black text-white mt-2 lg:mt-4 px-4 lg:px-0">
              EXPERTISE EM{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                FULL STACK
              </span>
            </h1>
            <p className="text-base lg:text-xl text-slate-300 mt-4 lg:mt-6 max-w-3xl mx-auto font-sans leading-relaxed px-4 lg:px-0">
              Domínio completo do ecossistema moderno de desenvolvimento, desde
              interfaces imersivas até infraestrutura escalável
            </p>
          </MotionDiv>
        </MotionDiv>

        {/* Grid de Skills Premium Responsivo */}
        <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-3">
          {skillsData.map((group, index) => (
            <MotionDiv
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2, type: "spring" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card className="h-full bg-slate-900/60 backdrop-blur-xl border border-blue-400/20 lg:border-2 shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:scale-105 group relative overflow-hidden">
                {/* Header do Card Responsivo */}
                <CardHeader className="pb-4 lg:pb-6 border-b border-slate-700/50">
                  <div className="flex items-center space-x-2 lg:space-x-3 mb-2 lg:mb-3">
                    <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-400/30 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <group.icon className="h-4 w-4 lg:h-5 lg:w-5 text-blue-400" />
                    </div>
                    <CardTitle className="text-lg lg:text-xl xl:text-2xl font-heading font-black text-blue-400">
                      {group.category}
                    </CardTitle>
                  </div>
                  <p className="text-slate-300 text-xs lg:text-sm font-sans leading-relaxed">
                    {group.description}
                  </p>
                </CardHeader>

                {/* Conteúdo do Card Responsivo */}
                <CardContent className="space-y-4 lg:space-y-6 pt-4 lg:pt-6">
                  {group.skills.map((skill, skillIndex) => (
                    <MotionDiv
                      key={skill.name}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: skillIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <SkillBar {...skill} />
                    </MotionDiv>
                  ))}
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
        </div>

        {/* Stats Banner Premium Responsivo */}
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 lg:mt-20"
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
              <MotionDiv
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                viewport={{ once: true }}
                className="text-center p-4 lg:p-6 bg-slate-900/40 backdrop-blur-xl rounded-xl lg:rounded-2xl border border-slate-700/50 hover:border-blue-400/30 transition-all duration-500 hover:scale-105 group cursor-pointer"
              >
                <div
                  className={`h-12 w-12 lg:h-16 lg:w-16 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <stat.icon className="h-5 w-5 lg:h-7 lg:w-7 text-white" />
                </div>
                <div
                  className={`text-xl lg:text-2xl xl:text-3xl font-heading font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 lg:mb-2 group-hover:scale-105 transition-transform duration-300`}
                >
                  {stat.number}
                </div>
                <div className="text-white font-heading font-bold text-sm lg:text-lg mb-1">
                  {stat.title}
                </div>
                <div className="text-slate-400 font-sans text-xs lg:text-sm leading-tight">
                  {stat.subtitle}
                </div>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>

        {/* CTA Final - Premium Responsivo */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 lg:mt-20 px-4 lg:px-0"
        >
          <div className="bg-gradient-to-r from-slate-900/60 to-slate-800/40 backdrop-blur-xl p-6 lg:p-8 rounded-xl lg:rounded-2xl border border-slate-700/50 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 relative z-10">
              <div className="flex items-center space-x-4 lg:space-x-6 text-center lg:text-left">
                <MotionDiv
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  viewport={{ once: true }}
                  className="h-12 w-12 lg:h-16 lg:w-16 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-400/30 flex-shrink-0"
                >
                  <GitBranch className="h-6 w-6 lg:h-8 lg:w-8 text-blue-400 animate-pulse" />
                </MotionDiv>
                <div>
                  <h3 className="text-xl lg:text-2xl font-heading font-black text-white mb-1 lg:mb-2">
                    Pronto para elevar seu projeto?
                  </h3>
                  <p className="text-slate-300 font-sans text-sm lg:text-lg">
                    Vamos aplicar essa expertise técnica no seu próximo desafio
                  </p>
                </div>
              </div>

              <MotionDiv
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
                  className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-heading font-bold text-sm lg:text-lg px-6 lg:px-10 py-4 lg:py-6 rounded-xl lg:rounded-2xl shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105 border-0 overflow-hidden w-full lg:w-auto"
                >
                  <Sparkles className="mr-2 lg:mr-3 h-4 w-4 lg:h-5 lg:w-5 group-hover:scale-110 transition-transform duration-300 inline" />
                  INICIAR COLABORAÇÃO
                </button>
              </MotionDiv>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};
