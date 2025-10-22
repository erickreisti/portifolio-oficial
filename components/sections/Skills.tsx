"use client";

import MotionDiv from "@/components/ui/MotionDiv";
import { Badge } from "@/components/ui/badge";

// 1. Dados das suas habilidades
const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "Next.js", level: 95, icon: "⚡" },
      { name: "TypeScript", level: 90, icon: "ʦ" },
      { name: "Tailwind CSS", level: 98, icon: "🎨" },
      { name: "Framer Motion", level: 85, icon: "✨" },
    ],
  },
  {
    category: "Backend & Database",
    skills: [
      { name: "Node.js/Express", level: 80, icon: "⚙️" },
      { name: "Python/Django", level: 70, icon: "🐍" },
      { name: "PostgreSQL/Prisma", level: 85, icon: "💾" },
      { name: "Serverless (AWS Lambda)", level: 75, icon: "☁️" },
    ],
  },
  {
    category: "DevOps & Tools",
    skills: [
      { name: "Git/GitHub", level: 95, icon: "🌳" },
      { name: "Docker", level: 65, icon: "🐳" },
      { name: "Vercel/Netlify", level: 90, icon: "🚀" },
    ],
  },
];

// 2. Componente da Barra de Habilidade Individual
interface SkillBarProps {
  name: string;
  level: number;
  icon: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level, icon }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-foreground">
        <span className="text-lg font-medium flex items-center">
          {icon} <span className="ml-2">{name}</span>
        </span>
        <Badge
          variant="secondary"
          className="text-primary-default font-semibold"
        >
          {level}%
        </Badge>
      </div>

      {/* Barra Animada com MotionDiv */}
      <div className="h-2 w-full rounded-full bg-card/70 overflow-hidden">
        <MotionDiv
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-full bg-primary-default rounded-full"
        />
      </div>
    </div>
  );
};

export const Skills = () => {
  return (
    <section
      id="skills"
      className="py-20 lg:py-32 bg-background border-t border-card"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Título da Seção */}
        <h2 className="text-4xl font-extrabold text-foreground sm:text-5xl text-center mb-16">
          Minhas <span className="text-primary-default">Habilidades</span>
        </h2>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {skillsData.map((group, index) => (
            <MotionDiv
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
              className="bg-card p-6 rounded-xl border border-primary-default/20 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-primary-default mb-6 border-b border-primary-default/20 pb-2">
                {group.category}
              </h3>
              <div className="space-y-6">
                {group.skills.map((skill) => (
                  <SkillBar key={skill.name} {...skill} />
                ))}
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};
