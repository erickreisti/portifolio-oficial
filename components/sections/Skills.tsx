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
      {
        name: "Framer Motion",
        level: 88,
        color: "from-purple-500 to-pink-600",
        description: "Advanced Animations & Interactions",
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
      {
        name: "Prisma & Drizzle",
        level: 90,
        color: "from-blue-800 to-blue-900",
        description: "Type-safe Database ORMs",
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

// Componente da Barra de Habilidade Premium
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
    <div className="space-y-4 group cursor-pointer">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <span className="text-lg font-sans font-semibold text-white group-hover:text-blue-300 transition-colors duration-300 block mb-1">
            {name}
          </span>
          <span className="text-sm text-slate-400 font-sans block leading-relaxed">
            {description}
          </span>
        </div>
        <Badge
          variant="secondary"
          className="text-blue-400 font-mono font-bold bg-blue-500/10 border border-blue-400/30 group-hover:scale-110 transition-all duration-300 px-3 py-1"
        >
          {level}%
        </Badge>
      </div>

      {/* Barra Animada Premium */}
      <div className="h-3 w-full rounded-full bg-slate-800/30 overflow-hidden border border-slate-700/50 shadow-inner backdrop-blur-lg relative">
        <MotionDiv
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          whileHover={{ width: `${Math.min(level + 3, 100)}%` }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
          className={`h-full bg-gradient-to-r ${color} rounded-full relative overflow-hidden group-hover:brightness-110 transition-all duration-500 shadow-lg`}
        >
          {/* Efeito de brilho animado */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          {/* Partículas de brilho */}
          <div className="absolute top-0 right-2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-pulse" />
          <div className="absolute top-0 right-6 w-0.5 h-0.5 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-pulse delay-300" />

          {/* Efeito de onda */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </MotionDiv>

        {/* Marcas de porcentagem */}
        <div className="absolute inset-0 flex justify-between items-center px-2">
          {[0, 25, 50, 75, 100].map((mark) => (
            <div
              key={mark}
              className="w-px h-1 bg-slate-600/30 rounded-full"
              style={{
                marginLeft: `${mark === 0 ? 0 : mark === 100 ? -2 : 0}px`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const Skills = () => {
  return (
    <section
      id="skills"
      className="py-20 lg:py-32 bg-slate-950 relative overflow-hidden border-t border-slate-800/50"
    >
      {/* Background Premium */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Partículas de Fundo */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 15 + 10}s`,
            }}
          />
        ))}
      </div>

      {/* Elementos Decorativos */}
      <div className="absolute top-10 left-10 opacity-5 animate-float-slow">
        <Binary className="h-32 w-32 text-blue-400" />
      </div>
      <div
        className="absolute bottom-10 right-10 opacity-5 animate-float-slow"
        style={{ animationDelay: "3s" }}
      >
        <CircuitBoard className="h-32 w-32 text-cyan-400" />
      </div>
      <div
        className="absolute top-20 right-20 opacity-5 animate-float-slow"
        style={{ animationDelay: "6s" }}
      >
        <Cpu className="h-24 w-24 text-purple-400" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header da Seção - Premium */}
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-20"
        >
          <MotionDiv
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center text-sm font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-6 py-3 rounded-full border border-blue-400/30 mb-6 relative overflow-hidden group"
          >
            <Zap className="h-4 w-4 mr-3 animate-pulse" />
            DOMÍNIO TECNOLÓGICO
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl font-heading font-black text-white sm:text-5xl lg:text-6xl mt-4">
              EXPERTISE EM{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                FULL STACK
              </span>
            </h1>
            <p className="text-xl text-slate-300 mt-6 max-w-3xl mx-auto font-sans leading-relaxed">
              Domínio completo do ecossistema moderno de desenvolvimento, desde
              interfaces imersivas até infraestrutura escalável
            </p>
          </MotionDiv>
        </MotionDiv>

        {/* Grid de Skills Premium */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {skillsData.map((group, index) => (
            <MotionDiv
              key={group.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3, type: "spring" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Card className="h-full bg-slate-900/60 backdrop-blur-xl border-2 border-blue-400/20 shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:scale-105 group relative overflow-hidden">
                {/* Efeito de brilho no card */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                {/* Header do Card */}
                <CardHeader className="pb-6 border-b border-slate-700/50">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-400/30 group-hover:scale-110 transition-transform duration-300">
                      <group.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-2xl font-heading font-black text-blue-400">
                      {group.category}
                    </CardTitle>
                  </div>
                  <p className="text-slate-300 text-sm font-sans leading-relaxed">
                    {group.description}
                  </p>
                </CardHeader>

                {/* Conteúdo do Card */}
                <CardContent className="space-y-6 pt-6">
                  {group.skills.map((skill, skillIndex) => (
                    <MotionDiv
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: skillIndex * 0.15 }}
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

        {/* Stats Banner Premium */}
        <MotionDiv
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="text-center p-6 bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-blue-400/30 transition-all duration-500 hover:scale-105 group cursor-pointer"
              >
                <div
                  className={`h-16 w-16 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <stat.icon className="h-7 w-7 text-white" />
                </div>
                <div
                  className={`text-3xl font-heading font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300`}
                >
                  {stat.number}
                </div>
                <div className="text-white font-heading font-bold text-lg mb-1">
                  {stat.title}
                </div>
                <div className="text-slate-400 font-sans text-sm">
                  {stat.subtitle}
                </div>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>

        {/* CTA Final - Premium */}
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-slate-900/60 to-slate-800/40 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-2xl relative overflow-hidden">
            {/* Background animado do CTA */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              <div className="flex items-center space-x-6">
                <MotionDiv
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  viewport={{ once: true }}
                  className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-400/30"
                >
                  <GitBranch className="h-8 w-8 text-blue-400 animate-pulse" />
                </MotionDiv>
                <div>
                  <h3 className="text-2xl font-heading font-black text-white mb-2">
                    Pronto para elevar seu projeto?
                  </h3>
                  <p className="text-slate-300 font-sans text-lg">
                    Vamos aplicar essa expertise técnica no seu próximo desafio
                  </p>
                </div>
              </div>

              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-heading font-bold text-lg px-10 py-6 rounded-2xl shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105 border-0 overflow-hidden"
                >
                  <Sparkles className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300 inline" />
                  INICIAR COLABORAÇÃO
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl" />
                </button>
              </MotionDiv>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};
