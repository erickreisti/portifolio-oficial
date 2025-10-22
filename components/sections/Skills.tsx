"use client";

import MotionDiv from "@/components/ui/MotionDiv";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Database, Cloud, Zap } from "lucide-react";

// Dados das habilidades - Atualizado com suas tecnologias reais
const skillsData = [
  {
    category: "Frontend & Mobile",
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
    category: "Backend & Database",
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
    category: "Cloud & DevOps",
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
        <span className="text-base font-sans font-semibold text-foreground group-hover:text-primary-default transition-colors duration-300">
          {name}
        </span>
        <Badge
          variant="secondary"
          className="text-primary-default font-heading font-bold bg-primary-default/10 border border-primary-default/20 group-hover:scale-110 transition-transform duration-300"
        >
          {level}%
        </Badge>
      </div>

      {/* Barra Animada */}
      <div className="h-2.5 w-full rounded-full bg-background/50 overflow-hidden border border-border/50 shadow-inner">
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
      className="py-20 lg:py-32 bg-background border-t border-border/50 relative overflow-hidden"
    >
      {/* Background sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-background dark:from-gray-900/20 dark:to-background" />

      {/* Elementos decorativos */}
      <div className="absolute top-10 left-10 opacity-5">
        <Code2 className="h-32 w-32 text-primary-default" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-5">
        <Database className="h-32 w-32 text-primary-default" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Título da Seção - COM FONT POIPPINS */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center text-sm font-heading font-semibold uppercase tracking-widest text-primary-default bg-primary-default/10 px-4 py-2 rounded-full border border-primary-default/20 mb-4">
            <Zap className="h-4 w-4 mr-2" />
            Stack Tecnológica
          </div>
          <h2 className="text-4xl font-heading font-bold text-foreground sm:text-5xl lg:text-6xl">
            Minhas{" "}
            <span className="text-primary-default bg-gradient-to-r from-primary-default to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
              Habilidades
            </span>
          </h2>
          <p className="text-xl text-foreground/70 mt-6 max-w-2xl mx-auto font-sans">
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
              <Card className="h-full bg-background/80 backdrop-blur-sm border-2 border-primary-default/20 shadow-2xl hover:shadow-primary-default/20 transition-all duration-500 hover:scale-105 group">
                <CardHeader className="pb-4 border-b border-border/50">
                  <CardTitle className="text-2xl font-heading font-bold text-primary-default flex items-center">
                    <group.icon className="h-6 w-6 mr-3" />
                    {group.category}
                  </CardTitle>
                  <p className="text-foreground/60 text-sm mt-2 font-sans">
                    {group.skills.length} tecnologias dominadas
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

        {/* Stats Footer */}
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center p-8 bg-background/50 rounded-2xl border border-border hover:border-primary-default/30 transition-all duration-300 hover:scale-105 group">
            <div className="text-4xl font-heading font-bold text-primary-default mb-3 group-hover:scale-110 transition-transform duration-300">
              15+
            </div>
            <div className="text-foreground/70 font-sans font-medium text-lg">
              Tecnologias Dominadas
            </div>
            <div className="text-foreground/50 font-sans text-sm mt-2">
              Stack Completa
            </div>
          </div>
          <div className="text-center p-8 bg-background/50 rounded-2xl border border-border hover:border-primary-default/30 transition-all duration-300 hover:scale-105 group">
            <div className="text-4xl font-heading font-bold text-primary-default mb-3 group-hover:scale-110 transition-transform duration-300">
              85%
            </div>
            <div className="text-foreground/70 font-sans font-medium text-lg">
              Proficiência Média
            </div>
            <div className="text-foreground/50 font-sans text-sm mt-2">
              Excelência Técnica
            </div>
          </div>
          <div className="text-center p-8 bg-background/50 rounded-2xl border border-border hover:border-primary-default/30 transition-all duration-300 hover:scale-105 group">
            <div className="text-4xl font-heading font-bold text-primary-default mb-3 group-hover:scale-110 transition-transform duration-300">
              5+
            </div>
            <div className="text-foreground/70 font-sans font-medium text-lg">
              Anos de Experiência
            </div>
            <div className="text-foreground/50 font-sans text-sm mt-2">
              Aprendizado Contínuo
            </div>
          </div>
        </MotionDiv>

        {/* CTA Final */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-sans">
            Interessado em como posso aplicar essas habilidades no seu projeto?{" "}
            <span className="text-primary-default font-heading font-semibold">
              Vamos conversar!
            </span>
          </p>
        </MotionDiv>
      </div>
    </section>
  );
};
