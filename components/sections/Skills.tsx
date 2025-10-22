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
} from "lucide-react";

// Dados das habilidades
const skillsData = [
  {
    category: "FRONTEND & MOBILE",
    icon: Code2,
    skills: [
      { name: "Next.js 14", level: 95, color: "from-gray-800 to-black" },
      { name: "TypeScript", level: 90, color: "from-blue-600 to-blue-700" },
      {
        name: "React/React Native",
        level: 88,
        color: "from-cyan-500 to-blue-500",
      },
      { name: "Tailwind CSS", level: 98, color: "from-cyan-400 to-blue-500" },
      {
        name: "Framer Motion",
        level: 85,
        color: "from-purple-500 to-pink-500",
      },
    ],
  },
  {
    category: "BACKEND & DATABASE",
    icon: Database,
    skills: [
      { name: "Node.js", level: 85, color: "from-green-600 to-green-700" },
      {
        name: "Python/FastAPI",
        level: 80,
        color: "from-yellow-500 to-yellow-600",
      },
      { name: "PostgreSQL", level: 82, color: "from-blue-700 to-blue-800" },
      { name: "MongoDB", level: 78, color: "from-green-500 to-green-600" },
      { name: "Prisma/ORM", level: 85, color: "from-blue-800 to-blue-900" },
    ],
  },
  {
    category: "CLOUD & DEVOPS",
    icon: Cloud,
    skills: [
      { name: "AWS", level: 75, color: "from-orange-500 to-orange-600" },
      { name: "Docker", level: 70, color: "from-blue-400 to-blue-500" },
      { name: "Vercel/Netlify", level: 90, color: "from-black to-gray-800" },
      { name: "Git/GitHub", level: 95, color: "from-gray-700 to-gray-800" },
    ],
  },
];

// Componente da Barra de Habilidade
interface SkillBarProps {
  name: string;
  level: number;
  color: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level, color }) => {
  return (
    <div className="space-y-3 group">
      <div className="flex justify-between items-center">
        <span className="text-base font-mono font-semibold text-slate-300 group-hover:text-blue-300 transition-colors duration-300 tracking-wide">
          {name}
        </span>
        <Badge
          variant="secondary"
          className="text-blue-400 font-mono font-bold bg-blue-500/10 border border-blue-400/30 group-hover:scale-110 transition-all duration-300 neon-pulse"
        >
          {level}%
        </Badge>
      </div>

      {/* Barra Animada - Estilo Tech */}
      <div className="h-3 w-full rounded-full bg-slate-800/50 overflow-hidden border border-slate-700/50 shadow-inner backdrop-blur-sm">
        <MotionDiv
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          whileHover={{ width: `${Math.min(level + 5, 100)}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`h-full bg-gradient-to-r ${color} rounded-full relative overflow-hidden group-hover:brightness-110 transition-all duration-300`}
        >
          {/* Efeito de brilho na barra */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          {/* Partículas na barra */}
          <div className="absolute top-0 right-2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-pulse" />
        </MotionDiv>
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
      {/* Background gradiente tech */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />

      {/* Partículas sutis */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
        <div className="absolute bottom-40 left-20 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
      </div>

      {/* Elementos decorativos tech */}
      <div className="absolute top-10 left-10 opacity-5">
        <Binary className="h-32 w-32 text-blue-400" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-5">
        <CircuitBoard className="h-32 w-32 text-cyan-400" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Título da Seção - Estilo Tech */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center text-sm font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-6 py-3 rounded-full border border-blue-400/30 mb-6 neon-pulse">
            <Zap className="h-4 w-4 mr-3" />
            STACK TECNOLÓGICA
          </div>
          <h2 className="text-4xl font-heading font-black text-white sm:text-5xl lg:text-6xl">
            MINHAS{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              HABILIDADES
            </span>
          </h2>
          <p className="text-xl text-slate-300 mt-6 max-w-2xl mx-auto font-mono tracking-wide">
            Domínio completo do ecossistema moderno de desenvolvimento FullStack
          </p>
        </MotionDiv>

        {/* Grid de Skills */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {skillsData.map((group, index) => (
            <MotionDiv
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Card className="h-full bg-slate-900/50 backdrop-blur-xl border-2 border-blue-400/20 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 group relative overflow-hidden">
                {/* Efeito de brilho no card */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                <CardHeader className="pb-6 border-b border-slate-700/50">
                  <CardTitle className="text-2xl font-heading font-black text-blue-400 flex items-center neon-pulse">
                    <group.icon className="h-6 w-6 mr-3" />
                    {group.category}
                  </CardTitle>
                  <p className="text-slate-400 text-sm mt-2 font-mono tracking-wide">
                    {group.skills.length} TECNOLOGIAS DOMINADAS
                  </p>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {group.skills.map((skill, skillIndex) => (
                    <MotionDiv
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
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

        {/* Stats Footer - Estilo Tech */}
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              number: "15+",
              title: "Tecnologias Dominadas",
              subtitle: "Stack Completa",
            },
            {
              number: "85%",
              title: "Proficiência Média",
              subtitle: "Excelência Técnica",
            },
            {
              number: "5+",
              title: "Anos de Experiência",
              subtitle: "Aprendizado Contínuo",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-blue-400/30 transition-all duration-500 hover:scale-105 group relative overflow-hidden"
            >
              <div className="text-5xl font-heading font-black text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300 neon-pulse">
                {stat.number}
              </div>
              <div className="text-white font-heading font-bold text-lg mb-2">
                {stat.title}
              </div>
              <div className="text-slate-400 font-mono text-sm tracking-wide">
                {stat.subtitle}
              </div>
              {/* Efeito de brilho */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </div>
          ))}
        </MotionDiv>

        {/* CTA Final - Estilo Tech */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-slate-900/30 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-2xl max-w-2xl mx-auto">
            <p className="text-lg text-slate-300 font-mono tracking-wide mb-4">
              Interessado em como posso aplicar essas habilidades no seu
              projeto?{" "}
              <span className="text-blue-400 font-heading font-bold neon-pulse">
                VAMOS CONVERSAR!
              </span>
            </p>
            <div className="flex justify-center space-x-4">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200" />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-400" />
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};
