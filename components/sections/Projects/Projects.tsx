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
  Play,
  Square,
  ZoomIn,
  Loader,
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

// Interface estendida para incluir as propriedades faltantes
interface ExtendedProject extends Project {
  demoVideo?: string;
  techStack?: Array<{
    name: string;
    category: string;
    description: string;
    icon: any;
  }>;
}

// Componente Project Showcase - FASE 1
const ProjectShowcase = () => {
  const [selectedProject, setSelectedProject] =
    useState<ExtendedProject | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Grid de Projetos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 projects-grid">
        {(projects as ExtendedProject[]).map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-cyan-500/20 overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 h-full flex flex-col">
              {/* Thumbnail com overlay */}
              <div className="relative aspect-video overflow-hidden flex-1">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay de preview */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-4">
                    <div className="p-3 bg-cyan-500/20 rounded-full border border-cyan-400/30 backdrop-blur-sm">
                      <Play className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="p-3 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
                      <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Badge de preview disponível */}
                {project.demoVideo && (
                  <div className="absolute top-3 right-3 bg-cyan-500/20 px-2 py-1 rounded-full border border-cyan-400/30">
                    <span className="text-cyan-400 text-xs font-mono">
                      DEMO
                    </span>
                  </div>
                )}
              </div>

              {/* Info do projeto */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-bold text-lg flex-1">
                    {project.title}
                  </h3>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    className="text-cyan-400"
                  >
                    <Rocket className="w-4 h-4" />
                  </motion.div>
                </div>
                <p className="text-gray-300 text-sm line-clamp-2 flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags
                    .slice(0, 3)
                    .map((tag: string, tagIndex: number) => (
                      <Badge
                        key={tag}
                        className="bg-cyan-500/10 text-cyan-400 border-cyan-400/30 font-mono text-xs font-bold"
                      >
                        {tag}
                      </Badge>
                    ))}
                  {project.tags.length > 3 && (
                    <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-400/30 font-mono text-xs font-bold">
                      +{project.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal de Demo */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => {
              setSelectedProject(null);
              setIsPlaying(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-cyan-500/20">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="text-cyan-300 text-sm">
                    {selectedProject.description}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setIsPlaying(false);
                  }}
                  className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                {selectedProject.demoVideo ? (
                  <div className="relative rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      src={selectedProject.demoVideo}
                      className="w-full rounded-lg"
                      controls={false}
                    />
                    <button
                      onClick={handlePlayPause}
                      className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                    >
                      <div className="p-6 bg-black/50 rounded-full backdrop-blur-sm border border-white/20">
                        {isPlaying ? (
                          <Square className="w-8 h-8 text-white" />
                        ) : (
                          <Play className="w-8 h-8 text-white" />
                        )}
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Links do projeto */}
                <div className="flex gap-4 mt-6">
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-lg font-bold text-center hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    VISITAR SITE
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-800/50 border border-cyan-500/20 text-cyan-400 py-3 px-6 rounded-lg font-bold text-center hover:bg-cyan-500/10 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    VER CÓDIGO
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Componente Technical Deep Dive - FASE 2
const TechnicalDeepDive = ({ project }: { project: ExtendedProject }) => {
  const [activeTab, setActiveTab] = useState("architecture");

  const tabs = [
    { id: "architecture", name: "Arquitetura", icon: Server },
    { id: "techstack", name: "Tech Stack", icon: Code },
    { id: "performance", name: "Performance", icon: Zap },
    { id: "database", name: "Database", icon: Database },
  ];

  const performanceMetrics = {
    lighthouse: {
      performance: 95,
      accessibility: 100,
      bestPractices: 100,
      seo: 100,
    },
    loadTime: "1.2s",
    bundleSize: "245KB",
    coreWebVitals: {
      lcp: "1.1s",
      fid: "45ms",
      cls: "0.05",
    },
  };

  return (
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-cyan-500/20 overflow-hidden mt-8">
      {/* Header */}
      <div className="border-b border-cyan-500/20 p-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          Análise Técnica: {project.title}
        </h3>
        <p className="text-cyan-300">
          Detalhes de implementação e métricas de performance
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-cyan-500/20">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? "border-cyan-400 text-cyan-400 bg-cyan-400/10"
                    : "border-transparent text-gray-400 hover:text-cyan-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-semibold">{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "architecture" && (
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white mb-4">
                  Arquitetura do Sistema
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h5 className="text-cyan-400 font-semibold">Frontend</h5>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                        Next.js 14 com App Router
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                        TypeScript para type safety
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                        Tailwind CSS para styling
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                        Framer Motion para animações
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h5 className="text-cyan-400 font-semibold">Backend</h5>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full" />
                        Node.js com Express
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full" />
                        PostgreSQL com Prisma ORM
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full" />
                        Autenticação JWT
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full" />
                        API RESTful
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-4 border border-cyan-500/20">
                  <h5 className="text-cyan-400 font-semibold mb-2">
                    Padrões Arquiteturais
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-3 bg-cyan-500/10 rounded-lg border border-cyan-400/20">
                      <div className="text-cyan-400 font-bold">MVC</div>
                      <div className="text-gray-400 text-xs">Pattern</div>
                    </div>
                    <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-400/20">
                      <div className="text-purple-400 font-bold">REST</div>
                      <div className="text-gray-400 text-xs">API Design</div>
                    </div>
                    <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-400/20">
                      <div className="text-green-400 font-bold">SSR</div>
                      <div className="text-gray-400 text-xs">Rendering</div>
                    </div>
                    <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-400/20">
                      <div className="text-orange-400 font-bold">CDN</div>
                      <div className="text-gray-400 text-xs">Delivery</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "performance" && (
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white mb-4">
                  Métricas de Performance
                </h4>

                {/* Lighthouse Scores */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(performanceMetrics.lighthouse).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="text-center p-4 bg-gray-800/50 rounded-xl border border-cyan-500/20"
                      >
                        <div className="text-2xl font-bold text-cyan-400 mb-1">
                          {value}
                        </div>
                        <div className="text-gray-300 text-sm capitalize">
                          {key}
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                          <div
                            className="bg-cyan-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* Core Web Vitals */}
                <div className="bg-gray-800/50 rounded-xl p-4 border border-cyan-500/20">
                  <h5 className="text-cyan-400 font-semibold mb-4">
                    Core Web Vitals
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(performanceMetrics.coreWebVitals).map(
                      ([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-white mb-1">
                            {value}
                          </div>
                          <div className="text-gray-400 text-sm uppercase">
                            {key}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Outras Métricas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-green-500/20">
                    <div className="text-green-400 font-bold text-lg">
                      {performanceMetrics.loadTime}
                    </div>
                    <div className="text-gray-400 text-sm">
                      Tempo de Carregamento
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-blue-500/20">
                    <div className="text-blue-400 font-bold text-lg">
                      {performanceMetrics.bundleSize}
                    </div>
                    <div className="text-gray-400 text-sm">
                      Tamanho do Bundle
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "techstack" && (
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white mb-4">
                  Stack Tecnológico Completo
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.techStack?.map((tech: any, index: number) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-800/50 rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                          <tech.icon className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div>
                          <div className="text-white font-bold">
                            {tech.name}
                          </div>
                          <div className="text-cyan-400 text-sm">
                            {tech.category}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">
                        {tech.description}
                      </p>
                    </motion.div>
                  )) || (
                    <div className="col-span-full text-center py-8 text-gray-400">
                      <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Detalhes técnicos em desenvolvimento</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
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
  const [selectedProjectForDetails, setSelectedProjectForDetails] =
    useState<ExtendedProject | null>(null);
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

        {/* Project Showcase - FASE 1 */}
        <ProjectShowcase />

        {/* Technical Deep Dives - FASE 2 */}
        <AnimatePresence>
          {selectedProjectForDetails && (
            <TechnicalDeepDive project={selectedProjectForDetails} />
          )}
        </AnimatePresence>

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
