"use client";

import NextLink from "next/link";
import { Link as LinkIcon, Github, Star } from "lucide-react";

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
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:border-primary-default/50 hover:shadow-primary-default/20 shadow-xl bg-background/80 backdrop-blur-sm group">
        {/* Placeholder de Imagem com hover effect */}
        <div className="h-48 w-full bg-gradient-to-br from-primary-default/10 to-primary-default/5 flex items-center justify-center relative overflow-hidden">
          <span className="text-foreground/70 font-semibold z-10">
            Imagem do Projeto ({project.title})
          </span>
          {/* Overlay no hover */}
          <div className="absolute inset-0 bg-primary-default/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <CardHeader className="flex-grow">
          <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary-default transition-colors duration-300">
            {project.title}
          </CardTitle>
          <CardDescription className="text-base text-foreground/70 leading-relaxed">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-medium bg-primary-default/10 text-primary-default border border-primary-default/20 hover:bg-primary-default/20 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="mt-auto pt-4 border-t border-border/50">
          <div className="flex space-x-3">
            <Button
              asChild
              variant="default"
              size="sm"
              className="bg-primary-default hover:bg-primary-default/90 text-white"
            >
              <NextLink href={project.githubUrl} target="_blank">
                <Github className="mr-2 h-4 w-4" />
                Código
              </NextLink>
            </Button>
            {project.liveUrl && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-primary-default/30 text-foreground hover:bg-primary-default/10 hover:border-primary-default/50"
              >
                <NextLink href={project.liveUrl} target="_blank">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Demo
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
      className="py-20 lg:py-32 bg-gradient-to-br from-background via-blue-50/20 to-background dark:from-background dark:via-blue-950/10 dark:to-background border-t border-border relative overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-10 left-10 opacity-5">
        <Star className="h-32 w-32 text-primary-default" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header da Seção */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center text-sm font-semibold uppercase tracking-widest text-primary-default bg-primary-default/10 px-4 py-2 rounded-full border border-primary-default/20 mb-4">
            <Star className="h-4 w-4 mr-2" />
            Portfolio
          </div>
          <h2 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
            Projetos{" "}
            <span className="text-primary-default bg-gradient-to-r from-primary-default to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
              em Destaque
            </span>
          </h2>
          <p className="text-xl text-foreground/70 mt-6 max-w-2xl mx-auto">
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

        {/* CTA Final */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Quer ver mais projetos ou discutir uma ideia?{" "}
            <span className="text-primary-default font-semibold">
              Vamos conversar!
            </span>
          </p>
        </MotionDiv>
      </div>
    </section>
  );
};
