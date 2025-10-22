"use client";

import MotionDiv from "@/components/ui/MotionDiv";
import { Badge } from "@/components/ui/badge";
import { Code2, Database, Cloud, Zap } from "lucide-react";

// 1. Dados das suas habilidades
const skillsData = [
  {
    category: "Frontend",
    icon: Code2,
    skills: [
      { name: "Next.js", level: 95, color: "from-blue-500 to-blue-600" },
      { name: "TypeScript", level: 90, color: "from-blue-600 to-blue-700" },
      { name: "Tailwind CSS", level: 98, color: "from-cyan-500 to-blue-500" },
      {
        name: "Framer Motion",
        level: 85,
        color: "from-purple-500 to-pink-500",
      },
    ],
  },
  {
    category: "Backend & Database",
    icon: Database,
    skills: [
      {
        name: "Node.js/Express",
        level: 80,
        color: "from-green-500 to-green-600",
      },
      {
        name: "Python/Django",
        level: 70,
        color: "from-yellow-500 to-yellow-600",
      },
      {
        name: "PostgreSQL/Prisma",
        level: 85,
        color: "from-blue-700 to-blue-800",
      },
      {
        name: "Serverless (AWS Lambda)",
        level: 75,
        color: "from-orange-500 to-orange-600",
      },
    ],
  },
  {
    category: "DevOps & Tools",
    icon: Cloud,
    skills: [
      { name: "Git/GitHub", level: 95, color: "from-gray-700 to-gray-800" },
      { name: "Docker", level: 65, color: "from-blue-400 to-blue-500" },
      { name: "Vercel/Netlify", level: 90, color: "from-black to-gray-800" },
    ],
  },
];

// 2. Componente da Barra de Habilidade Individual
interface SkillBarProps {
  name: string;
  level: number;
  color: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level, color }) => {
  return (
    <div className="space-y-3 group">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-foreground group-hover:text-primary-default transition-colors duration-300">
          {name}
        </span>
        <Badge
          variant="secondary"
          className="text-primary-default font-bold bg-primary-default/10 border border-primary-default/20 group-hover:scale-110 transition-transform duration-300"
        >
          {level}%
        </Badge>
      </div>

      {/* Barra Animada com MotionDiv */}
      <div className="h-3 w-full rounded-full bg-background/50 overflow-hidden border border-border shadow-inner">
        <MotionDiv
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          whileHover={{ width: `${Math.min(level + 5, 100)}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`h-full bg-gradient-to-r ${color} rounded-full relative overflow-hidden`}
        >
          {/* Efeito de brilho na barra */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </MotionDiv>
      </div>
    </div>
  );
};

export const Skills = () => {
  return (
    <section
      id="skills"
      className="py-20 lg:py-32 bg-gradient-to-br from-background via-blue-50/20 to-background dark:from-background dark:via-blue-950/10 dark:to-background border-t border-border"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Título da Seção */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center text-sm font-semibold uppercase tracking-widest text-primary-default bg-primary-default/10 px-4 py-2 rounded-full border border-primary-default/20 mb-4">
            <Zap className="h-4 w-4 mr-2" />
            Tecnologias & Ferramentas
          </div>
          <h2 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
            Minhas{" "}
            <span className="text-primary-default bg-gradient-to-r from-primary-default to-blue-600 bg-clip-text text-transparent">
              Habilidades
            </span>
          </h2>
          <p className="text-xl text-foreground/70 mt-6 max-w-2xl mx-auto">
            Domínio completo do ecossistema moderno de desenvolvimento
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {skillsData.map((group, index) => (
            <MotionDiv
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
              className="bg-background/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-primary-default/10 shadow-2xl hover:shadow-primary-default/20 transition-all duration-500 hover:scale-105 group"
            >
              {/* Header do Card */}
              <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-border/50">
                <div className="h-12 w-12 rounded-full bg-primary-default/10 flex items-center justify-center group-hover:bg-primary-default/20 transition-colors duration-300">
                  <group.icon className="h-6 w-6 text-primary-default" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {group.category}
                  </h3>
                  <p className="text-foreground/60 text-sm">
                    {group.skills.length} tecnologias
                  </p>
                </div>
              </div>

              {/* Lista de Skills */}
              <div className="space-y-8">
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
              </div>
            </MotionDiv>
          ))}
        </div>

        {/* Stats Footer */}
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-wrap justify-center gap-8 bg-background/50 p-6 rounded-2xl border border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-default">15+</div>
              <div className="text-foreground/70 text-sm">Tecnologias</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-default">85%</div>
              <div className="text-foreground/70 text-sm">
                Proficiência Média
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-default">5+</div>
              <div className="text-foreground/70 text-sm">Anos de Estudo</div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};
