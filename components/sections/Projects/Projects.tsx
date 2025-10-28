// components/sections/Projects/Projects.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import NextLink from "next/link";
import {
  Github,
  Star,
  Cpu,
  Rocket,
  Sparkles,
  Eye,
  Code,
  ExternalLink,
  X,
  Tag,
  Zap,
  Globe,
  Database,
  Server,
  Smartphone,
  Cloud,
} from "lucide-react";
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
import { projects } from "@/lib/project-data";
import type { Project } from "@/lib/project-data";
import { PremiumBackground } from "@/components/layout/PremiumBackground";

// Componente Modal para tags
const TagsModal = ({
  project,
  isOpen,
  onClose,
}: {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-gray-900/95 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-cyan-400/20">
          <div className="flex items-center gap-3">
            <Tag className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">
              Tecnologias Utilizadas
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-800/50"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 border-b border-cyan-400/20">
          <h4 className="text-lg font-bold text-white mb-2">{project.title}</h4>
          <p className="text-gray-300 text-sm">{project.description}</p>
        </div>

        <div className="p-6">
          <p className="text-sm font-mono font-bold text-gray-400 mb-4">
            STACK COMPLETA ({project.tags.length} tecnologias):
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string, index: number) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-400/30 font-mono text-xs font-bold">
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t border-cyan-400/20">
          <Button
            asChild
            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
          >
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              VER CÓDIGO
            </a>
          </Button>
          {project.liveUrl && (
            <Button
              asChild
              className="flex-1 bg-gray-800/50 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/10"
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                VER DEMO
              </a>
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Componente de Card de Projeto
const ProjectCard: React.FC<{
  project: Project;
  index: number;
}> = ({ project, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
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
        <Card className="bg-gray-900/60 backdrop-blur-xl border border-cyan-500/20 shadow-2xl shadow-cyan-400/10 hover:shadow-cyan-400/20 hover:border-cyan-400/50 transition-all duration-500 group h-full flex flex-col overflow-hidden hover:scale-105">
          {/* Header com Imagem */}
          <div className="h-32 lg:h-48 w-full bg-gradient-to-br from-cyan-500/15 to-blue-500/10 relative overflow-hidden border-b border-cyan-400/20">
            <div className="absolute inset-0">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/10" />
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mb-2"
              >
                <Cpu className="w-8 h-8 lg:w-12 lg:h-12 text-cyan-400" />
              </motion.div>
              <span className="text-white font-bold text-sm lg:text-base bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {project.title}
              </span>
            </div>
          </div>

          <CardHeader className="pb-4 flex-grow">
            <CardTitle className="text-lg lg:text-xl font-black text-white flex items-center justify-between">
              <span className="flex-1 truncate mr-2">{project.title}</span>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 15 }}
                className="text-cyan-400"
              >
                <Rocket className="w-4 h-4 lg:w-5 lg:h-5" />
              </motion.div>
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm lg:text-base line-clamp-3">
              {project.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-4">
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: tagIndex * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-400/30 font-mono text-xs font-bold hover:bg-cyan-500/20 hover:scale-105 transition-all duration-300">
                    {tag}
                  </Badge>
                </motion.div>
              ))}

              {project.tags.length > 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.15 }}
                  viewport={{ once: true }}
                >
                  <Badge
                    className="bg-cyan-500/10 text-cyan-400 border-cyan-400/30 font-mono text-xs font-bold hover:bg-cyan-500/20 hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden"
                    onClick={() => setIsModalOpen(true)}
                  >
                    +{project.tags.length - 3}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </Badge>
                </motion.div>
              )}
            </div>
          </CardContent>

          <CardFooter className="pt-4 border-t border-cyan-400/20 mt-auto">
            <div className="flex gap-2 w-full">
              <Button
                asChild
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-xs lg:text-sm py-2 rounded-lg shadow-xl shadow-cyan-400/30 hover:shadow-cyan-400/50 transition-all duration-500 hover:scale-105"
              >
                <NextLink href={project.githubUrl} target="_blank">
                  <Github className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  CÓDIGO
                </NextLink>
              </Button>
              {project.liveUrl && (
                <Button
                  asChild
                  className="flex-1 bg-gray-800/50 backdrop-blur-sm border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/60 font-bold text-xs lg:text-sm py-2 rounded-lg transition-all duration-500 hover:scale-105"
                >
                  <NextLink href={project.liveUrl} target="_blank">
                    <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                    DEMO
                  </NextLink>
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      <AnimatePresence>
        <TagsModal
          project={project}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </AnimatePresence>
    </>
  );
};

// Componente Neon Element para Projects
const ProjectsNeonElement = ({
  Icon,
  position,
  color,
  delay = 0,
}: {
  Icon: any;
  position: string;
  color: string;
  delay?: number;
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(elementRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView || !elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementRef.current,
        {
          opacity: 0,
          scale: 0,
          y: 100,
          rotation: -180,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 1.5,
          ease: "back.out(1.7)",
          delay: delay * 0.2,
        }
      );

      gsap.to(elementRef.current, {
        y: -15,
        rotation: 5,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: delay * 0.3,
      });
    });

    return () => ctx.revert();
  }, [isInView, delay]);

  return (
    <div
      ref={elementRef}
      className={`absolute ${position} pointer-events-none`}
    >
      <Icon className={`${color} text-2xl opacity-70`} />
    </div>
  );
};

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Neon Elements Configuration
  const neonElements = [
    {
      Icon: Rocket,
      position: "top-20 left-20",
      color: "text-cyan-400",
      delay: 0,
    },
    {
      Icon: Code,
      position: "top-32 right-24",
      color: "text-cyan-400",
      delay: 1,
    },
    {
      Icon: Globe,
      position: "bottom-40 left-24",
      color: "text-cyan-400",
      delay: 2,
    },
    {
      Icon: Database,
      position: "bottom-32 right-20",
      color: "text-cyan-400",
      delay: 3,
    },
    {
      Icon: Server,
      position: "top-40 right-16",
      color: "text-cyan-400",
      delay: 4,
    },
    {
      Icon: Smartphone,
      position: "bottom-48 left-16",
      color: "text-cyan-400",
      delay: 5,
    },
  ];

  // GSAP Animations
  useEffect(() => {
    if (!isInView || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".projects-header",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
      )
        .fromTo(
          ".projects-grid",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          ".projects-stats",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .fromTo(
          ".projects-cta",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden"
    >
      <PremiumBackground intensity="medium">
        {/* Elementos Neon Flutuantes */}
        <div className="absolute inset-0 pointer-events-none">
          {neonElements.map((element, index) => (
            <ProjectsNeonElement key={index} {...element} />
          ))}
        </div>
      </PremiumBackground>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {/* Header Harmonizado */}
        <motion.div
          className="text-center mb-16 lg:mb-20 projects-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-6 py-3 rounded-full border border-cyan-400/30 backdrop-blur-2xl mb-6 relative overflow-hidden group"
          >
            <Sparkles className="w-4 h-4 mr-3 animate-pulse" />
            PORTFÓLIO PREMIUM
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              PROJETOS{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                DE IMPACTO
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Soluções inovadoras desenvolvidas com tecnologias de ponta,
              arquitetura escalável e foco em performance excepcional
            </p>
          </motion.div>
        </motion.div>

        {/* Grid de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20 projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="mb-16 lg:mb-20 projects-stats"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              {
                number: projects.length,
                title: "Projetos",
                subtitle: "Entregues com Excelência",
                icon: Rocket,
                color: "from-cyan-400 to-blue-400",
              },
              {
                number: `${Math.round(
                  (projects.filter((p) => p.liveUrl).length / projects.length) *
                    100
                )}%`,
                title: "Online",
                subtitle: "Projetos em Produção",
                icon: Eye,
                color: "from-cyan-400 to-blue-400",
              },
              {
                number: "24/7",
                title: "Disponível",
                subtitle: "Para Novos Desafios",
                icon: Star,
                color: "from-cyan-400 to-blue-400",
              },
              {
                number: "5+",
                title: "Anos Exp",
                subtitle: "Experiência Comprovada",
                icon: Code,
                color: "from-cyan-400 to-blue-400",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-900/40 backdrop-blur-lg rounded-2xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-500 cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-4 border border-cyan-400/30 group-hover:border-cyan-400/50 transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-bold text-white mb-1">
                  {stat.title}
                </div>
                <div className="text-sm text-gray-400">{stat.subtitle}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center projects-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-2xl p-8 rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-400/10 relative overflow-hidden group">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                viewport={{ once: true }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30 shadow-xl shadow-cyan-400/30 group-hover:border-cyan-400/50"
                whileHover={{ rotate: 360 }}
              >
                <Rocket className="w-6 h-6 text-cyan-400" />
              </motion.div>
              <div className="text-center lg:text-left flex-1">
                <h3 className="text-xl lg:text-2xl font-black text-white mb-2">
                  Próximo projeto incrível?
                </h3>
                <p className="text-gray-300 text-base lg:text-lg">
                  Vamos transformar sua visão em realidade com tecnologia de
                  ponta
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className="w-full lg:w-auto"
              >
                <Button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="w-full lg:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 rounded-2xl border-none shadow-2xl shadow-cyan-400/30 transition-all duration-500 hover:shadow-cyan-400/50 hover:scale-105 relative overflow-hidden focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                >
                  <Sparkles className="w-4 h-4 mr-2 transition-transform duration-300" />
                  INICIAR PROJETO
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
