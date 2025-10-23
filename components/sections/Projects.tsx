"use client";

import NextLink from "next/link";
import {
  Link as LinkIcon,
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

// Componente para um único card de Projeto Premium
const ProjectCard: React.FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
      }}
      viewport={{ once: true, amount: 0.3 }}
      className="h-full"
    >
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-500 hover:scale-105 bg-slate-900/60 backdrop-blur-xl border-2 border-blue-400/20 shadow-2xl hover:shadow-blue-500/30 group relative glass-premium hover-lift">
        {/* Efeito de brilho no card */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

        {/* Header do Projeto com Ícone Animado */}
        <div className="h-48 w-full bg-gradient-to-br from-blue-500/15 to-purple-500/10 flex items-center justify-center relative overflow-hidden border-b border-slate-700/50">
          <div className="text-center relative z-10">
            <MotionDiv
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mb-3"
            >
              <Cpu className="h-14 w-14 text-blue-400 mx-auto drop-shadow-lg" />
            </MotionDiv>
            <span className="text-slate-200 font-heading font-bold text-lg tracking-wide bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              {project.title}
            </span>
          </div>

          {/* Overlay gradiente animado */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Partículas animadas */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse delay-300" />
          <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse delay-600" />
        </div>

        <CardHeader className="flex-grow pb-4">
          <CardTitle className="text-xl font-heading font-black text-white group-hover:text-blue-300 transition-colors duration-300 flex items-center justify-between">
            {project.title}
            <MotionDiv
              whileHover={{ scale: 1.1, rotate: 15 }}
              className="text-blue-400"
            >
              <Rocket className="h-5 w-5" />
            </MotionDiv>
          </CardTitle>
          <CardDescription className="text-base text-slate-300 leading-relaxed font-sans mt-3">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <MotionDiv
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: tagIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <Badge
                  variant="secondary"
                  className="text-xs font-mono font-bold bg-blue-500/15 text-blue-300 border border-blue-400/40 hover:bg-blue-500/25 hover:scale-110 transition-all duration-300 tracking-wide cursor-pointer group/badge"
                >
                  {tag}
                  <div className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover/badge:opacity-100 ml-1 transition-opacity duration-300" />
                </Badge>
              </MotionDiv>
            ))}
          </div>
        </CardContent>

        <CardFooter className="mt-auto pt-4 border-t border-slate-700/50">
          <div className="flex space-x-3 w-full">
            <Button
              asChild
              variant="default"
              size="sm"
              className="group/btn relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-mono font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105 border-0 overflow-hidden tracking-widest flex-1"
            >
              <NextLink href={project.githubUrl} target="_blank">
                <Github className="mr-2 h-3.5 w-3.5 group-hover/btn:scale-110 transition-transform duration-300" />
                CÓDIGO
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 rounded-xl" />
              </NextLink>
            </Button>
            {project.liveUrl && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="group/btn relative bg-slate-800/60 backdrop-blur-sm border-blue-400/40 text-blue-300 hover:bg-blue-500/15 hover:border-blue-400/60 hover:text-blue-200 font-mono font-bold text-xs px-4 py-2.5 rounded-xl transition-all duration-500 hover:scale-105 tracking-widest flex-1"
              >
                <NextLink href={project.liveUrl} target="_blank">
                  <ExternalLink className="mr-2 h-3.5 w-3.5 group-hover/btn:scale-110 transition-transform duration-300" />
                  LIVE DEMO
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/15 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 rounded-xl" />
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
      {/* Background Premium */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Partículas de Fundo */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/25 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 12 + 8}s`,
            }}
          />
        ))}
      </div>

      {/* Elementos Decorativos */}
      <div className="absolute top-10 left-10 opacity-5 animate-float-slow">
        <Binary className="h-32 w-32 text-blue-400" />
      </div>
      <div
        className="absolute bottom-10 right-10 opacity-5 animate-float-slow"
        style={{ animationDelay: "3s" }}
      >
        <CircuitBoard className="h-32 w-32 text-cyan-400" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header da Seção - Premium */}
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-20"
        >
          <MotionDiv
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center text-sm font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-6 py-3 rounded-full border border-blue-400/30 mb-6 relative overflow-hidden group"
          >
            <Sparkles className="h-4 w-4 mr-3 animate-pulse" />
            PORTFÓLIO PREMIUM
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl font-heading font-black text-white sm:text-5xl lg:text-6xl mt-4">
              PROJETOS{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                DE IMPACTO
              </span>
            </h1>
            <p className="text-xl text-slate-300 mt-6 max-w-3xl mx-auto font-sans leading-relaxed">
              Soluções inovadoras desenvolvidas com tecnologias de ponta,
              arquitetura escalável e foco em performance excepcional
            </p>
          </MotionDiv>
        </MotionDiv>

        {/* Grid de Projetos */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Stats Banner Premium */}
        <MotionDiv
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                number: projects.length,
                title: "Projetos Entregues",
                subtitle: "Sucesso Garantido",
                icon: Rocket,
                color: "from-blue-400 to-cyan-400",
              },
              {
                number: "100%",
                title: "Qualidade Code",
                subtitle: "Padrões de Excelência",
                icon: Star,
                color: "from-purple-400 to-pink-400",
              },
              {
                number: "24/7",
                title: "Suporte Técnico",
                subtitle: "Disponibilidade Total",
                icon: Eye,
                color: "from-amber-400 to-orange-400",
              },
              {
                number: "5+",
                title: "Anos Exp",
                subtitle: "Experiência Comprovada",
                icon: Code,
                color: "from-green-400 to-emerald-400",
              },
            ].map((stat, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="text-center p-6 bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-blue-400/30 transition-all duration-500 hover:scale-105 group cursor-pointer"
              >
                <div
                  className={`h-16 w-16 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <stat.icon className="h-7 w-7 text-white" />
                </div>
                <div
                  className={`text-3xl font-heading font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300`}
                >
                  {stat.number}
                </div>
                <div className="text-white font-heading font-bold text-lg mb-1">
                  {stat.title}
                </div>
                <div className="text-slate-400 font-sans text-sm">
                  {stat.subtitle}
                </div>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>

        {/* CTA Final - Premium */}
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-slate-900/60 to-slate-800/40 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-2xl relative overflow-hidden">
            {/* Background animado do CTA */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              <div className="flex items-center space-x-6">
                <MotionDiv
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  viewport={{ once: true }}
                  className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-400/30"
                >
                  <Rocket className="h-8 w-8 text-blue-400 animate-pulse" />
                </MotionDiv>
                <div>
                  <h3 className="text-2xl font-heading font-black text-white mb-2">
                    Próximo projeto incrível?
                  </h3>
                  <p className="text-slate-300 font-sans text-lg">
                    Vamos transformar sua visão em realidade com tecnologia de
                    ponta
                  </p>
                </div>
              </div>

              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-heading font-bold text-lg px-10 py-6 rounded-2xl shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105 border-0 overflow-hidden"
                >
                  <Sparkles className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300 inline" />
                  INICIAR PROJETO
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl" />
                </button>
              </MotionDiv>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};
