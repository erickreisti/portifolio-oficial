// lib/project-data.ts
// CORREÇÃO: Removidas importações não utilizadas
export type Project = {
  id: number;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
};

// Dados Mockup (Substitua pelos seus projetos)
export const projects: Project[] = [
  {
    id: 1,
    title: "Finanças Pessoais (FinancePro)",
    description:
      "Aplicação FullStack para gerenciamento de finanças com relatórios e autenticação robusta.",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    githubUrl: "https://github.com/erickreis/finance-pro-app",
    liveUrl: "https://financepro.vercel.app",
  },
  {
    id: 2,
    title: "Landing Page Responsiva (DevLink)",
    description:
      "Modelo de landing page de alta conversão, focado em SEO e performance (Lighthouse > 95).",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/erickreis/devlink-landing",
  },
  {
    id: 3,
    title: "API RESTful (TaskFlow)",
    description:
      "Backend para gestão de tarefas usando Node.js, Express e MongoDB com documentação Swagger.",
    tags: ["Node.js", "Express", "MongoDB", "TypeScript", "Swagger"],
    githubUrl: "https://github.com/erickreis/taskflow-api",
  },
];
