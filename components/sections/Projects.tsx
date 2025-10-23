"use client";

import NextLink from "next/link";
import {
  Link as LinkIcon,
  Github,
  Star,
  Cpu,
  CircuitBoard,
  Binary,
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
import { Project, projects } from "@/lib/project-data";

// Componente para um único card de Projeto
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: project.id * 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-500 hover:scale-105 bg-slate-900/50 backdrop-blur-xl border-2 border-blue-400/20 shadow-2xl hover:shadow-blue-500/20 group relative">
        {/* Efeito de brilho no card */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

        {/* Placeholder de Imagem com hover effect - Estilo Tech */}
        <div className="h-48 w-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center relative overflow-hidden border-b border-slate-700/50">
          <div className="text-center">
            <Cpu className="h-12 w-12 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-500" />
            <span className="text-slate-300 font-mono font-semibold tracking-wide z-10">
              {project.title}
            </span>
          </div>
          {/* Overlay gradiente no hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Partículas na imagem */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse delay-300" />
        </div>

        <CardHeader className="flex-grow">
          <CardTitle className="text-xl font-heading font-black text-white group-hover:text-blue-300 transition-colors duration-300">
            {project.title}
          </CardTitle>
          <CardDescription className="text-base text-slate-300 leading-relaxed font-sans">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-400/30 hover:bg-blue-500/20 hover:scale-110 transition-all duration-300 tracking-wide"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="mt-auto pt-4 border-t border-slate-700/50">
          <div className="flex space-x-3 w-full">
            <Button
              asChild
              variant="default"
              size="sm"
              className="group/btn relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-mono font-bold text-xs px-4 py-2 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-500 hover:scale-105 border-0 overflow-hidden tracking-widest flex-1"
            >
              <NextLink href={project.githubUrl} target="_blank">
                <Github className="mr-2 h-3 w-3 group-hover/btn:scale-110 transition-transform duration-300" />
                CÓDIGO
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 rounded-xl" />
              </NextLink>
            </Button>
            {project.liveUrl && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="group/btn relative bg-slate-800/50 backdrop-blur-sm border-blue-400/30 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400/50 hover:text-blue-300 font-mono font-bold text-xs px-4 py-2 rounded-xl transition-all duration-500 hover:scale-105 tracking-widest flex-1"
              >
                <NextLink href={project.liveUrl} target="_blank">
                  <LinkIcon className="mr-2 h-3 w-3 group-hover/btn:scale-110 transition-transform duration-300" />
                  DEMO
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 rounded-xl" />
                </NextLink>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </MotionDiv>
  );
};

export const Projects = () => {
  return (
    <section
      id="projects"
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
        {/* Header da Seção - Estilo Tech */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center text-sm font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-6 py-3 rounded-full border border-blue-400/30 mb-6 neon-pulse">
            <Star className="h-4 w-4 mr-3" />
            PORTFÓLIO TECH
          </div>
          <h2 className="text-4xl font-heading font-black text-white sm:text-5xl lg:text-6xl">
            PROJETOS{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              EM DESTAQUE
            </span>
          </h2>
          <p className="text-xl text-slate-300 mt-6 max-w-2xl mx-auto font-mono tracking-wide">
            Soluções reais desenvolvidas com tecnologias modernas e melhores
            práticas
          </p>
        </MotionDiv>

        {/* Grid de Projetos */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* CTA Final - Estilo Tech */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-slate-900/30 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-2xl max-w-2xl mx-auto">
            <p className="text-lg text-slate-300 font-mono tracking-wide mb-4">
              Quer ver mais projetos ou discutir uma ideia?{" "}
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
              number: projects.length,
              title: "Projetos Concluídos",
              subtitle: "Portfólio Ativo",
            },
            {
              number: "100%",
              title: "Qualidade Garantida",
              subtitle: "Code Review",
            },
            {
              number: "24/7",
              title: "Suporte Técnico",
              subtitle: "Disponível",
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
      </div>
    </section>
  );
};
