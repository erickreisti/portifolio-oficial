// lib/project-data.ts

export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
};

// Dados dos projetos reais
export const projects: Project[] = [
  {
    id: 1,
    title: "CodeCraft Academy",
    description:
      "Plataforma de cursos fullstack moderna com dashboard integrado e sistema de pagamentos completo.",
    image: "/images/website1.webp",
    githubUrl: "https://github.com/erickreisti/codecraft-academy",
    liveUrl: "https://codecraft-academy-three.vercel.app/",
    tags: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "NextAuth",
      "React",
      "Shadcn/ui",
    ],
  },
  {
    id: 2,
    title: "Wine for Life",
    description:
      "Site institucional para vinícola com design elegante que transmite tradição e sofisticação.",
    image: "/images/website2.webp",
    githubUrl: "https://github.com/erickreisti/wine-for-life",
    liveUrl: "https://erickreisti.github.io/wine-for-life/",
    tags: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "SASS",
      "Responsive Design",
      "GitHub Pages",
      "UI/UX Design",
    ],
  },
  {
    id: 3,
    title: "Bio Fitness",
    description:
      "Landing page otimizada para conversão no segmento wellness com design clean e estratégico.",
    image: "/images/website3.webp",
    githubUrl: "https://github.com/erickreisti/biofitness",
    liveUrl: "https://erickreisti.github.io/biofitness/",
    tags: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Design",
      "Landing Page",
      "SEO",
      "GitHub Pages",
    ],
  },
  {
    id: 4,
    title: "Petcare Petshop",
    description:
      "Site completo para petshop com serviços de grooming, veterinário e cuidados especiais.",
    image: "/images/website4.webp",
    githubUrl: "https://github.com/erickreisti/petcare-petshop",
    liveUrl: "https://erickreisti.github.io/petcare-petshop/",
    tags: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap",
      "jQuery",
      "Responsive",
      "GitHub Pages",
    ],
  },
  {
    id: 5,
    title: "Copa do Mundo 2022",
    description:
      "Site conceitual temático da Seleção Brasileira com design patriótico e navegação imersiva.",
    image: "/images/website5.webp",
    githubUrl: "https://github.com/erickreisti/world-cup-2022",
    tags: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "GSAP",
      "Animations",
      "Concept Design",
      "Sports Theme",
    ],
  },
  {
    id: 6,
    title: "Boi de Ouro",
    description:
      "Landing page premium para churrascaria com cardápio digital e sistema de pedidos online.",
    image: "/images/website6.webp",
    githubUrl: "https://github.com/erickreisti/projectboi",
    liveUrl: "https://erickreisti.github.io/projectboi/",
    tags: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "PHP",
      "MySQL",
      "Responsive",
      "E-commerce",
      "Restaurant",
    ],
  },
];
