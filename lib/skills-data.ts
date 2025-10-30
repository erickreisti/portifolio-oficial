import {
  Code2,
  Database,
  Cloud,
  Zap,
  Server,
  Smartphone,
  GitBranch,
  Cpu,
  Target,
  Award,
  Clock,
  Heart,
} from "lucide-react";

// Interfaces para tipagem
export interface SkillItem {
  name: string;
  level: number;
  popularity: number;
  description: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  category: string;
  icon: any; // Componente Lucide
  description: string;
  color: string;
  skills: SkillItem[];
}

export interface StatItem {
  number: string;
  title: string;
  subtitle: string;
  icon: any;
}

// Dados estáticos das skills
export const STATIC_SKILLS_DATA: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    category: "FRONTEND & MOBILE",
    icon: Smartphone,
    description: "Experiências digitais imersivas e responsivas",
    color: "from-cyan-500 to-blue-500",
    skills: [
      {
        name: "Next.js 14+",
        level: 96,
        popularity: 95,
        description: "SSR, App Router, Server Actions",
      },
      {
        name: "TypeScript",
        level: 94,
        popularity: 90,
        description: "Type Safety & Advanced Patterns",
      },
      {
        name: "React",
        level: 92,
        popularity: 88,
        description: "Hooks, Context & Performance",
      },
      {
        name: "Tailwind CSS",
        level: 98,
        popularity: 85,
        description: "Utility-first & Design Systems",
      },
      {
        name: "React Native",
        level: 85,
        popularity: 80,
        description: "Mobile Apps & Cross-platform",
      },
      {
        name: "Framer Motion",
        level: 88,
        popularity: 82,
        description: "Animations & Interactions",
      },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    category: "BACKEND & DATABASE",
    icon: Server,
    description: "APIs robustas e arquiteturas escaláveis",
    color: "from-purple-500 to-pink-500",
    skills: [
      {
        name: "Node.js & Express",
        level: 92,
        popularity: 90,
        description: "REST & GraphQL APIs",
      },
      {
        name: "Prisma & ORM",
        level: 85,
        popularity: 82,
        description: "Data Modeling & Migrations",
      },
      {
        name: "PostgreSQL",
        level: 88,
        popularity: 85,
        description: "Complex Queries & Optimization",
      },
      {
        name: "Supabase & MongoDB",
        level: 82,
        popularity: 80,
        description: "Realtime & NoSQL Databases",
      },
      {
        name: "API Design",
        level: 90,
        popularity: 88,
        description: "RESTful & GraphQL Standards",
      },
      {
        name: "Authentication",
        level: 87,
        popularity: 85,
        description: "JWT, OAuth & NextAuth",
      },
    ],
  },
  {
    id: "cloud",
    name: "Cloud",
    category: "CLOUD & DEVOPS",
    icon: Cloud,
    description: "Infraestrutura moderna e CI/CD",
    color: "from-orange-500 to-red-500",
    skills: [
      {
        name: "AWS & Vercel",
        level: 84,
        popularity: 82,
        description: "Serverless & Edge Computing",
      },
      {
        name: "Docker & Kubernetes",
        level: 78,
        popularity: 75,
        description: "Containerization & Orchestration",
      },
      {
        name: "CI/CD Pipelines",
        level: 87,
        popularity: 80,
        description: "GitHub Actions & Automation",
      },
      {
        name: "Git & GitHub",
        level: 96,
        popularity: 92,
        description: "Advanced Git Workflows",
      },
      {
        name: "Performance Optimization",
        level: 91,
        popularity: 88,
        description: "Lighthouse & Core Web Vitals",
      },
      {
        name: "Security Best Practices",
        level: 86,
        popularity: 84,
        description: "OWASP & Security Headers",
      },
    ],
  },
  {
    id: "tools",
    name: "Ferramentas",
    category: "TOOLS & TECHNOLOGIES",
    icon: Cpu,
    description: "Stack completa de desenvolvimento",
    color: "from-green-500 to-emerald-500",
    skills: [
      {
        name: "VS Code & Dev Tools",
        level: 95,
        popularity: 90,
        description: "Development Environment",
      },
      {
        name: "Figma & UI/UX Design",
        level: 80,
        popularity: 78,
        description: "Design Systems & Prototyping",
      },
      {
        name: "Testing (Jest/Cypress)",
        level: 82,
        popularity: 80,
        description: "Unit & E2E Testing",
      },
      {
        name: "Agile & Scrum",
        level: 85,
        popularity: 82,
        description: "Project Management",
      },
      {
        name: "Clean Architecture",
        level: 88,
        popularity: 85,
        description: "SOLID & Design Patterns",
      },
      {
        name: "Performance Monitoring",
        level: 83,
        popularity: 80,
        description: "Analytics & Monitoring",
      },
    ],
  },
];

// Dados estáticos das estatísticas
export const STATIC_STATS_DATA: StatItem[] = [
  {
    number: "15+",
    title: "Tecnologias",
    subtitle: "Stack Completa",
    icon: Target,
  },
  {
    number: "92%",
    title: "Proficiência",
    subtitle: "Média de Domínio",
    icon: Award,
  },
  {
    number: "5+",
    title: "Anos Exp",
    subtitle: "Experiência Comprovada",
    icon: Clock,
  },
  {
    number: "100%",
    title: "Qualidade",
    subtitle: "Padrão de Excelência",
    icon: Heart,
  },
];

// Funções utilitárias para skills
export function getSkillById(id: string): SkillCategory | undefined {
  return STATIC_SKILLS_DATA.find((category) => category.id === id);
}

export function getTopSkills(limit: number = 6): SkillItem[] {
  const allSkills = STATIC_SKILLS_DATA.flatMap((category) => category.skills);
  return allSkills.sort((a, b) => b.level - a.level).slice(0, limit);
}

export function getSkillsByLevel(minLevel: number = 80): SkillItem[] {
  const allSkills = STATIC_SKILLS_DATA.flatMap((category) => category.skills);
  return allSkills.filter((skill) => skill.level >= minLevel);
}

// Interface para estatísticas calculadas
export interface SkillStats {
  totalSkills: number;
  averageLevel: number;
  averagePopularity: number;
  expertSkills: number;
  advancedSkills: number;
}

// Função para calcular estatísticas
export function calculateSkillStats(): SkillStats {
  const allSkills = STATIC_SKILLS_DATA.flatMap((category) => category.skills);
  const totalSkills = allSkills.length;
  const averageLevel =
    allSkills.reduce((sum, skill) => sum + skill.level, 0) / totalSkills;
  const averagePopularity =
    allSkills.reduce((sum, skill) => sum + skill.popularity, 0) / totalSkills;

  return {
    totalSkills,
    averageLevel: Math.round(averageLevel),
    averagePopularity: Math.round(averagePopularity),
    expertSkills: allSkills.filter((skill) => skill.level >= 90).length,
    advancedSkills: allSkills.filter(
      (skill) => skill.level >= 80 && skill.level < 90
    ).length,
  };
}

// Função para buscar skills por query
export function searchSkills(query: string): SkillItem[] {
  if (!query.trim()) return [];

  const searchTerm = query.toLowerCase();
  const results: SkillItem[] = [];

  STATIC_SKILLS_DATA.forEach((category) => {
    category.skills.forEach((skill) => {
      if (
        skill.name.toLowerCase().includes(searchTerm) ||
        skill.description.toLowerCase().includes(searchTerm)
      ) {
        results.push(skill);
      }
    });
  });

  return results;
}

// Função para obter todas as skills de uma categoria
export function getSkillsByCategory(categoryId: string): SkillItem[] {
  const category = STATIC_SKILLS_DATA.find((cat) => cat.id === categoryId);
  return category?.skills || [];
}

// Função para obter todas as tags únicas
export function getAllSkillTags(): string[] {
  const allTags = new Set<string>();

  STATIC_SKILLS_DATA.forEach((category) => {
    category.skills.forEach((skill) => {
      // Extrair palavras-chave do nome e descrição
      const words = [
        ...skill.name.split(/[&\s]+/),
        ...skill.description.split(/\s+/),
      ];

      words.forEach((word) => {
        if (word.length > 2) {
          allTags.add(word.toLowerCase());
        }
      });
    });
  });

  return Array.from(allTags).sort();
}
