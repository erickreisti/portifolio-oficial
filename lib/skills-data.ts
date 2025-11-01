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
  Palette,
  TestTube,
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

/**
 * 📊 DADOS ESTÁTICOS DAS SKILLS
 * Contém todas as informações sobre habilidades técnicas organizadas por categoria
 */
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
        name: "React & State Management",
        level: 92,
        popularity: 88,
        description: "Hooks, Context & Zustand",
      },
      {
        name: "React Hook Form + Zod",
        level: 88,
        popularity: 82,
        description: "Form Validation & Type Safety",
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
        name: "API Design & Security",
        level: 90,
        popularity: 88,
        description: "APIs & Autenticação JWT/OAuth",
      },
      {
        name: "Supabase & PostgreSQL",
        level: 92,
        popularity: 85,
        description: "Banco Dados Real-time Escalável",
      },
      {
        name: "Prisma & ORM",
        level: 85,
        popularity: 82,
        description: "Data Modeling & Migrations",
      },
    ],
  },
  {
    id: "styling",
    name: "Styling & UI",
    category: "STYLING & UI",
    icon: Palette,
    description: "Design systems e interfaces modernas",
    color: "from-indigo-500 to-purple-500",
    skills: [
      {
        name: "Tailwind CSS",
        level: 98,
        popularity: 85,
        description: "Utility-first & Design Systems",
      },
      {
        name: "Shadcn/UI & Chakra UI",
        level: 87,
        popularity: 85,
        description: "Componentes React Altamente Customizáveis",
      },
      {
        name: "CSS Modules",
        level: 82,
        popularity: 80,
        description: "Escopo CSS Componente Local",
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
    id: "cloud",
    name: "Cloud & DevOps",
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
        name: "Performance Optimization",
        level: 91,
        popularity: 88,
        description: "Lighthouse & Core Web Vitals",
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
        name: "Git & GitHub",
        level: 96,
        popularity: 92,
        description: "Advanced Git Workflows",
      },
      {
        name: "VS Code & Dev Tools",
        level: 95,
        popularity: 90,
        description: "Development Environment",
      },
      {
        name: "Figma & UI/UX",
        level: 80,
        popularity: 78,
        description: "Design Systems & Prototyping",
      },
      {
        name: "Sanity & Strapi",
        level: 85,
        popularity: 82,
        description: "CMS Headless Conteúdo Desacoplado",
      },
    ],
  },
];

/**
 * 🔍 FUNÇÃO: getSkillById
 * Busca uma categoria de skill pelo ID
 * @param id - ID da categoria a ser buscada
 * @returns Categoria de skill ou undefined se não encontrada
 */
export function getSkillById(id: string): SkillCategory | undefined {
  return STATIC_SKILLS_DATA.find((category) => category.id === id);
}

/**
 * 🏆 FUNÇÃO: getTopSkills
 * Retorna as skills com maior nível de proficiência
 * @param limit - Número máximo de skills a retornar (padrão: 6)
 * @returns Array de skills ordenadas por nível (decrescente)
 */
export function getTopSkills(limit: number = 6): SkillItem[] {
  const allSkills = STATIC_SKILLS_DATA.flatMap((category) => category.skills);
  return allSkills.sort((a, b) => b.level - a.level).slice(0, limit);
}

/**
 * 📈 FUNÇÃO: getSkillsByLevel
 * Filtra skills por nível mínimo de proficiência
 * @param minLevel - Nível mínimo de proficiência (padrão: 80)
 * @returns Array de skills que atendem ao critério de nível
 */
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

/**
 * 📊 FUNÇÃO: calculateSkillStats
 * Calcula estatísticas gerais sobre todas as skills
 * @returns Objeto com estatísticas consolidadas
 */
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

/**
 * 🔎 FUNÇÃO: searchSkills
 * Busca skills por termo de pesquisa no nome ou descrição
 * @param query - Termo de pesquisa
 * @returns Array de skills que correspondem à pesquisa
 */
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

/**
 * 🗂️ FUNÇÃO: getSkillsByCategory
 * Retorna todas as skills de uma categoria específica
 * @param categoryId - ID da categoria
 * @returns Array de skills da categoria ou array vazio se não encontrada
 */
export function getSkillsByCategory(categoryId: string): SkillItem[] {
  const category = STATIC_SKILLS_DATA.find((cat) => cat.id === categoryId);
  return category?.skills || [];
}

/**
 * 🏷️ FUNÇÃO: getAllSkillTags
 * Extrai tags únicas de todas as skills baseado no nome e descrição
 * @returns Array de tags únicas ordenadas alfabeticamente
 */
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
