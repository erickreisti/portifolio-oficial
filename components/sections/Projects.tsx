"use client";

import { useState } from "react";
import NextLink from "next/link";
import {
  Github,
  Star,
  Cpu,
  CircuitBoard,
  Binary,
  Rocket,
  Sparkles,
  Eye,
  Code,
  ExternalLink,
  X,
  Tag,
} from "lucide-react";

import MotionDiv from "@/components/ui/MotionDiv";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// Componente Modal para mostrar todas as tags
const TagsModal = ({
  project,
  isOpen,
  onClose,
}: {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <MotionDiv
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-slate-900/95 backdrop-blur-xl border border-blue-400/30 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
      >
        {/* Header do Modal */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Tag className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-heading font-bold text-white">
              Tecnologias Utilizadas
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Nome do Projeto */}
        <div className="mb-4">
          <h4 className="text-xl font-heading font-black text-blue-400 mb-2">
            {project.title}
          </h4>
          <p className="text-slate-300 text-sm">{project.description}</p>
        </div>

        {/* Lista de Tags */}
        <div className="space-y-3">
          <p className="text-slate-400 text-sm font-mono font-bold tracking-wide">
            STACK COMPLETA ({project.tags.length} tecnologias):
          </p>
          <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pr-2">
            {project.tags.map((tag: string, index: number) => (
              <MotionDiv
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Badge
                  variant="secondary"
                  className="text-xs font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-400/40 hover:bg-blue-500/30 hover:scale-105 transition-all duration-300 cursor-default"
                >
                  {tag}
                </Badge>
              </MotionDiv>
            ))}
          </div>
        </div>

        {/* Links do Projeto */}
        <div className="flex space-x-3 mt-6 pt-4 border-t border-slate-700/50">
          <Button
            asChild
            size="sm"
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs"
          >
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-3 w-3 mr-2" />
              VER CÓDIGO
            </a>
          </Button>
          {project.liveUrl && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="flex-1 border-blue-400/40 text-blue-300 hover:bg-blue-500/15 font-mono font-bold text-xs"
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-3 w-3 mr-2" />
                VER DEMO
              </a>
            </Button>
          )}
        </div>
      </MotionDiv>
    </div>
  );
};

// Dados dos seus projetos adaptados
const projects = [
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
      "Zod",
      "Resend",
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
      "Cross-browser",
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
      "Performance",
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
      "Mobile First",
    ],
  },
  {
    id: 5,
    title: "Copa do Mundo 2022",
    description:
      "Site conceitual temático da Seleção Brasileira com design patriótico e navegação imersiva.",
    image: "/images/website5.webp",
    githubUrl: "https://github.com/erickreisti/world-cup-2022",
    liveUrl: null,
    tags: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "GSAP",
      "Animations",
      "Concept Design",
      "Sports Theme",
      "Interactive",
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

// Componente para um único card de Projeto Premium Responsivo
const ProjectCard: React.FC<{
  project: (typeof projects)[0];
  index: number;
}> = ({ project, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <MotionDiv
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          type: "spring",
          stiffness: 100,
        }}
        viewport={{ once: true, amount: 0.2 }}
        className="h-full"
      >
        <Card className="flex h-full flex-col overflow-hidden transition-all duration-500 hover:scale-105 bg-slate-900/60 backdrop-blur-xl border border-blue-400/20 lg:border-2 shadow-2xl hover:shadow-blue-500/30 group relative hover-lift">
          {/* Header do Projeto com Imagem */}
          <div className="h-32 lg:h-48 w-full bg-gradient-to-br from-blue-500/15 to-purple-500/10 flex items-center justify-center relative overflow-hidden border-b border-slate-700/50">
            <div className="relative w-full h-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/10" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center relative z-10">
                <MotionDiv
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mb-2 lg:mb-3"
                >
                  <Cpu className="h-8 w-8 lg:h-14 lg:w-14 text-blue-400 mx-auto drop-shadow-lg" />
                </MotionDiv>
                <span className="text-slate-200 font-heading font-bold text-sm lg:text-lg tracking-wide bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent px-2">
                  {project.title}
                </span>
              </div>
            </div>
          </div>

          <CardHeader className="flex-grow pb-3 lg:pb-4">
            <CardTitle className="text-lg lg:text-xl font-heading font-black text-white group-hover:text-blue-300 transition-colors duration-300 flex items-center justify-between">
              <span className="truncate mr-2">{project.title}</span>
              <MotionDiv
                whileHover={{ scale: 1.1, rotate: 15 }}
                className="text-blue-400 flex-shrink-0"
              >
                <Rocket className="h-4 w-4 lg:h-5 lg:w-5" />
              </MotionDiv>
            </CardTitle>
            <CardDescription className="text-sm lg:text-base text-slate-300 leading-relaxed font-sans mt-2 lg:mt-3 line-clamp-3">
              {project.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-3 lg:pb-4">
            <div className="flex flex-wrap gap-1 lg:gap-2">
              {project.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                <MotionDiv
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: tagIndex * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Badge
                    variant="secondary"
                    className="text-xs font-mono font-bold bg-blue-500/15 text-blue-300 border border-blue-400/40 hover:bg-blue-500/25 hover:scale-110 transition-all duration-300 tracking-wide cursor-pointer group/badge"
                  >
                    {tag}
                  </Badge>
                </MotionDiv>
              ))}

              {/* Badge interativo para mostrar todas as tags */}
              {project.tags.length > 3 && (
                <MotionDiv
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.15 }}
                  viewport={{ once: true }}
                >
                  <Badge
                    variant="secondary"
                    onClick={() => setIsModalOpen(true)}
                    className="text-xs font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-400/40 hover:bg-purple-500/25 hover:scale-110 transition-all duration-300 cursor-pointer group/badge relative"
                  >
                    +{project.tags.length - 3}
                    {/* Efeito de brilho no hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300 rounded-full" />
                  </Badge>
                </MotionDiv>
              )}
            </div>
          </CardContent>

          <CardFooter className="mt-auto pt-3 lg:pt-4 border-t border-slate-700/50">
            <div className="flex space-x-2 lg:space-x-3 w-full">
              <Button
                asChild
                variant="default"
                size="sm"
                className="group/btn relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-mono font-bold text-xs px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg lg:rounded-xl shadow-lg hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105 border-0 overflow-hidden flex-1"
              >
                <NextLink href={project.githubUrl} target="_blank">
                  <Github className="mr-1 lg:mr-2 h-3 w-3 lg:h-3.5 lg:w-3.5 group-hover/btn:scale-110 transition-transform duration-300" />
                  CÓDIGO
                </NextLink>
              </Button>
              {project.liveUrl && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="group/btn relative bg-slate-800/60 backdrop-blur-sm border-blue-400/40 text-blue-300 hover:bg-blue-500/15 hover:border-blue-400/60 hover:text-blue-200 font-mono font-bold text-xs px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg lg:rounded-xl transition-all duration-500 hover:scale-105 tracking-widest flex-1"
                >
                  <NextLink href={project.liveUrl} target="_blank">
                    <ExternalLink className="mr-1 lg:mr-2 h-3 w-3 lg:h-3.5 lg:w-3.5 group-hover/btn:scale-110 transition-transform duration-300" />
                    DEMO
                  </NextLink>
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </MotionDiv>

      {/* Modal para mostrar todas as tags */}
      <TagsModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export const Projects = () => {
  return (
    <section
      id="projects"
      className="py-16 lg:py-32 bg-slate-950 relative overflow-hidden border-t border-slate-800/50"
    >
      {/* Background Premium */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Partículas de Fundo - Reduzidas para mobile */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 12 + 8}s`,
            }}
          />
        ))}
      </div>

      {/* Elementos Decorativos - Escondidos em mobile */}
      <div className="hidden lg:block absolute top-10 left-10 opacity-60 animate-float-slow">
        <svg
          className="h-32 w-32 animate-neon-blue interactive-glow"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      </div>
      <div
        className="hidden lg:block absolute bottom-10 right-10 opacity-60 animate-float-slow"
        style={{ animationDelay: "3s" }}
      >
        <svg
          className="h-32 w-32 animate-neon-cyan interactive-glow"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
          <path d="M11 9h4a2 2 0 0 0 2-2V3"></path>
          <circle cx="9" cy="9" r="2"></circle>
          <path d="M7 21v-4a2 2 0 0 1 2-2h4"></path>
          <circle cx="15" cy="15" r="2"></circle>
        </svg>
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
            <Sparkles className="h-3 w-3 lg:h-4 lg:w-4 mr-2 lg:mr-3 animate-pulse" />
            PORTFÓLIO PREMIUM
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-heading font-black text-white mt-2 lg:mt-4 px-4 lg:px-0">
              PROJETOS{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                DE IMPACTO
              </span>
            </h1>
            <p className="text-base lg:text-xl text-slate-300 mt-4 lg:mt-6 max-w-3xl mx-auto font-sans leading-relaxed px-4 lg:px-0">
              Soluções inovadoras desenvolvidas com tecnologias de ponta,
              arquitetura escalável e foco em performance excepcional
            </p>
          </MotionDiv>
        </MotionDiv>

        {/* Grid de Projetos Responsivo */}
        <div className="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Stats Banner Premium Responsivo */}
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 lg:mt-20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              {
                number: projects.length,
                title: "Projetos",
                subtitle: "Sucesso Garantido",
                icon: Rocket,
                color: "from-blue-400 to-cyan-400",
              },
              {
                number: "100%",
                title: "Qualidade",
                subtitle: "Padrões Excelência",
                icon: Star,
                color: "from-purple-400 to-pink-400",
              },
              {
                number: "24/7",
                title: "Suporte",
                subtitle: "Disponibilidade",
                icon: Eye,
                color: "from-amber-400 to-orange-400",
              },
              {
                number: "5+",
                title: "Anos Exp",
                subtitle: "Experiência",
                icon: Code,
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
          transition={{ duration: 0.6, delay: 0.6 }}
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
                  <Rocket className="h-6 w-6 lg:h-8 lg:w-8 text-blue-400 animate-pulse" />
                </MotionDiv>
                <div>
                  <h3 className="text-xl lg:text-2xl font-heading font-black text-white mb-1 lg:mb-2">
                    Próximo projeto incrível?
                  </h3>
                  <p className="text-slate-300 font-sans text-sm lg:text-lg">
                    Vamos transformar sua visão em realidade com tecnologia de
                    ponta
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
                  INICIAR PROJETO
                </button>
              </MotionDiv>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};
