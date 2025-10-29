"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  Github,
  Star,
  Rocket,
  Sparkles,
  Eye,
  Code,
  ExternalLink,
  X,
  Zap,
  Globe,
  Database,
  Server,
  Smartphone,
  Play,
  Square,
  ZoomIn,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/project-data";
import type { Project } from "@/lib/project-data";
import { PremiumBackground } from "@/components/layout/PremiumBackground";
import { LazyComponent } from "@/components/optimization/LazyComponent";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import LazyBackground from "@/components/optimization/LazyBackground";
import Image from "next/image";

// Interface estendida
interface ExtendedProject extends Project {
  demoVideo?: string;
  techStack?: Array<{
    name: string;
    category: string;
    description: string;
    icon: any;
  }>;
}

// Componente Image otimizado CORRIGIDO
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Fallback para imagens quebradas
  if (hasError) {
    return (
      <div
        className={`bg-gray-800 flex items-center justify-center ${className} ${
          fill ? "w-full h-full" : ""
        }`}
      >
        <div className="text-gray-500 text-center p-4">
          <div className="w-8 h-8 mx-auto mb-2 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">?</span>
          </div>
          <span className="text-sm">Imagem não disponível</span>
        </div>
      </div>
    );
  }

  const imageProps = fill
    ? { fill: true, sizes }
    : { width: width || 400, height: height || 300 };

  return (
    <div
      className={`relative overflow-hidden ${
        fill ? "w-full h-full" : ""
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        {...imageProps}
        className={`
          transition-all duration-500 ease-out object-cover
          ${isLoading ? "scale-110 blur-lg" : "scale-100 blur-0"}
          ${fill ? "w-full h-full" : ""}
        `}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

// Componente para mostrar todas as tecnologias - CORRIGIDO
const TechnologiesModal = ({
  technologies,
  onClose,
}: {
  technologies: string[];
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <LazyComponent priority="high">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-cyan-500/20">
            <div>
              <h3 className="text-2xl font-bold text-white">
                Todas as Tecnologias
              </h3>
              <p className="text-cyan-300 text-sm">
                {technologies.length} tecnologias utilizadas
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-cyan-500/10 text-cyan-400 border border-cyan-400/30 rounded-lg px-3 py-2 text-sm font-mono text-center hover:bg-cyan-500/20 transition-colors duration-200"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </LazyComponent>
  );
};

// Componente Project Showcase - CORRIGIDO E MELHORADO
const ProjectShowcase = () => {
  const [selectedProject, setSelectedProject] =
    useState<ExtendedProject | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAllTechnologies, setShowAllTechnologies] = useState<
    string[] | null
  >(null);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    new Set()
  );
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  usePerformanceMonitor("ProjectShowcase");

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

  const toggleProjectExpansion = (projectId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const idStr = projectId.toString();
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(idStr)) {
      newExpanded.delete(idStr);
    } else {
      newExpanded.add(idStr);
    }
    setExpandedProjects(newExpanded);
  };

  const showTechnologiesModal = (
    technologies: string[],
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setShowAllTechnologies(technologies);
  };

  const handleImageZoom = (imageSrc: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomImage(imageSrc);
  };

  const handleLiveDemo = (project: ExtendedProject, e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.liveUrl) {
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleGithubClick = (githubUrl: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(githubUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <LazyComponent animation="fadeUp" delay={200}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 projects-grid">
          {(projects as ExtendedProject[]).map((project, index) => {
            const isExpanded = expandedProjects.has(project.id.toString());
            const visibleTags = isExpanded
              ? project.tags
              : project.tags.slice(0, 4);
            const hasMoreTags = project.tags.length > 4;

            return (
              <LazyComponent
                key={project.id}
                animation="scale"
                delay={index * 100}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-cyan-500/20 overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:scale-[1.02] h-full flex flex-col min-h-[500px]">
                    {" "}
                    {/* Altura mínima padronizada */}
                    {/* Container da imagem com ações */}
                    <div className="relative aspect-video overflow-hidden">
                      <OptimizedImage
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority={index < 3}
                      />

                      {/* Overlay com ações */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <button
                          onClick={(e) => handleImageZoom(project.image, e)}
                          className="p-3 bg-white/20 rounded-full border border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110"
                        >
                          <ZoomIn className="w-6 h-6 text-white" />
                        </button>

                        {project.liveUrl && (
                          <button
                            onClick={(e) => handleLiveDemo(project, e)}
                            className="p-3 bg-cyan-500/20 rounded-full border border-cyan-400/30 backdrop-blur-sm hover:bg-cyan-500/30 transition-all duration-300 hover:scale-110"
                          >
                            <Play className="w-6 h-6 text-cyan-400" />
                          </button>
                        )}

                        <button
                          onClick={(e) =>
                            handleGithubClick(project.githubUrl, e)
                          }
                          className="p-3 bg-gray-800/80 rounded-full border border-gray-600/30 backdrop-blur-sm hover:bg-gray-700/80 transition-all duration-300 hover:scale-110"
                        >
                          <Github className="w-6 h-6 text-white" />
                        </button>
                      </div>

                      {project.demoVideo && (
                        <div className="absolute top-3 right-3 bg-cyan-500/20 px-2 py-1 rounded-full border border-cyan-400/30">
                          <span className="text-cyan-400 text-xs font-mono">
                            DEMO
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Conteúdo do card */}
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white font-bold text-lg flex-1 pr-2 line-clamp-2">
                          {project.title}
                        </h3>
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 15 }}
                          className="text-cyan-400 mt-0.5 flex-shrink-0"
                        >
                          <Rocket className="w-4 h-4" />
                        </motion.div>
                      </div>

                      <p className="text-gray-300 text-sm line-clamp-3 flex-1 mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tecnologias */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1.5">
                          {visibleTags.map((tag: string) => (
                            <Badge
                              key={tag}
                              className="bg-cyan-500/10 text-cyan-400 border-cyan-400/30 font-mono text-xs font-bold hover:bg-cyan-500/20 transition-colors"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {hasMoreTags && (
                          <div className="flex gap-2 pt-1">
                            <button
                              onClick={(e) =>
                                toggleProjectExpansion(project.id, e)
                              }
                              className="flex items-center gap-1 text-cyan-400 text-xs font-mono hover:text-cyan-300 transition-colors px-2 py-1 rounded border border-cyan-400/30 hover:border-cyan-400/50"
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="w-3 h-3" />
                                  Ver menos
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-3 h-3" />+
                                  {project.tags.length - 4}
                                </>
                              )}
                            </button>

                            <button
                              onClick={(e) =>
                                showTechnologiesModal(project.tags, e)
                              }
                              className="text-gray-400 text-xs font-mono hover:text-gray-300 transition-colors px-2 py-1 rounded border border-gray-600 hover:border-gray-500"
                            >
                              Ver todas
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </LazyComponent>
            );
          })}
        </div>
      </LazyComponent>

      {/* Modal do Projeto */}
      <AnimatePresence>
        {selectedProject && (
          <LazyComponent priority="high">
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

                <div className="p-6">
                  {selectedProject.demoVideo ? (
                    <div className="relative rounded-lg overflow-hidden mb-6">
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
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                      <OptimizedImage
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        fill
                        className="object-cover"
                        priority={true}
                      />
                    </div>
                  )}

                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">
                      Tecnologias Utilizadas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag: string) => (
                        <Badge
                          key={tag}
                          className="bg-cyan-500/10 text-cyan-400 border-cyan-400/30 font-mono text-xs font-bold"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-lg font-bold text-center hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-5 h-5" />
                        VISITAR SITE
                      </a>
                    )}
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
          </LazyComponent>
        )}
      </AnimatePresence>

      {/* Modal de Zoom da Imagem */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setZoomImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setZoomImage(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-cyan-400 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative w-full h-full">
                <OptimizedImage
                  src={zoomImage}
                  alt="Imagem ampliada"
                  fill
                  className="object-contain rounded-lg"
                  priority={true}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAllTechnologies && (
          <TechnologiesModal
            technologies={showAllTechnologies}
            onClose={() => setShowAllTechnologies(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// ... (mantenha os componentes TechnicalDeepDive, ProjectsNeonElement e Projects exatamente como estão, pois não tinham conflitos)

// Componente Technical Deep Dive - FASE 2 - OTIMIZADO (mantido igual)
const TechnicalDeepDive = ({ project }: { project: ExtendedProject }) => {
  const [activeTab, setActiveTab] = useState("architecture");

  const tabs = useMemo(
    () => [
      { id: "architecture", name: "Arquitetura", icon: Server },
      { id: "techstack", name: "Tech Stack", icon: Code },
      { id: "performance", name: "Performance", icon: Zap },
      { id: "database", name: "Database", icon: Database },
    ],
    []
  );

  const performanceMetrics = useMemo(
    () => ({
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
    }),
    []
  );

  return (
    <LazyComponent animation="fadeUp" delay={400}>
      <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-cyan-500/20 overflow-hidden mt-12">
        <div className="border-b border-cyan-500/20 p-8">
          <h3 className="text-2xl font-bold text-white mb-3">
            Análise Técnica: {project.title}
          </h3>
          <p className="text-cyan-300 text-lg">
            Detalhes de implementação e métricas de performance
          </p>
        </div>

        <div className="border-b border-cyan-500/20">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <LazyComponent
                  key={tab.id}
                  animation="fadeIn"
                  delay={tab.id === "architecture" ? 0 : 100}
                >
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-6 py-4 border-b-2 transition-all duration-300 whitespace-nowrap ${
                      isActive
                        ? "border-cyan-400 text-cyan-400 bg-cyan-400/10"
                        : "border-transparent text-gray-400 hover:text-cyan-300"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold text-base">{tab.name}</span>
                  </button>
                </LazyComponent>
              );
            })}
          </div>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "architecture" && (
                <LazyComponent animation="fadeUp" delay={200}>
                  <div className="space-y-8">
                    <h4 className="text-xl font-bold text-white mb-6">
                      Arquitetura do Sistema
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h5 className="text-cyan-400 font-semibold text-lg">
                          Frontend
                        </h5>
                        <ul className="space-y-4 text-gray-300">
                          <li className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-cyan-400 rounded-full" />
                            Next.js 14 com App Router
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-cyan-400 rounded-full" />
                            TypeScript para type safety
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-cyan-400 rounded-full" />
                            Tailwind CSS para styling
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-cyan-400 rounded-full" />
                            Framer Motion para animações
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-6">
                        <h5 className="text-cyan-400 font-semibold text-lg">
                          Backend
                        </h5>
                        <ul className="space-y-4 text-gray-300">
                          <li className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-purple-400 rounded-full" />
                            Node.js com Express
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-purple-400 rounded-full" />
                            PostgreSQL com Prisma ORM
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-purple-400 rounded-full" />
                            Autenticação JWT
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-purple-400 rounded-full" />
                            API RESTful
                          </li>
                        </ul>
                      </div>
                    </div>

                    <LazyComponent animation="fadeUp" delay={300}>
                      <div className="bg-gray-800/50 rounded-xl p-6 border border-cyan-500/20">
                        <h5 className="text-cyan-400 font-semibold mb-4 text-lg">
                          Padrões Arquiteturais
                        </h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                          <div className="text-center p-4 bg-cyan-500/10 rounded-lg border border-cyan-400/20">
                            <div className="text-cyan-400 font-bold text-base">
                              MVC
                            </div>
                            <div className="text-gray-400 text-xs mt-1">
                              Pattern
                            </div>
                          </div>
                          <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-400/20">
                            <div className="text-purple-400 font-bold text-base">
                              REST
                            </div>
                            <div className="text-gray-400 text-xs mt-1">
                              API Design
                            </div>
                          </div>
                          <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-400/20">
                            <div className="text-green-400 font-bold text-base">
                              SSR
                            </div>
                            <div className="text-gray-400 text-xs mt-1">
                              Rendering
                            </div>
                          </div>
                          <div className="text-center p-4 bg-orange-500/10 rounded-lg border border-orange-400/20">
                            <div className="text-orange-400 font-bold text-base">
                              CDN
                            </div>
                            <div className="text-gray-400 text-xs mt-1">
                              Delivery
                            </div>
                          </div>
                        </div>
                      </div>
                    </LazyComponent>
                  </div>
                </LazyComponent>
              )}

              {activeTab === "performance" && (
                <LazyComponent animation="fadeUp" delay={200}>
                  <div className="space-y-8">
                    <h4 className="text-xl font-bold text-white mb-6">
                      Métricas de Performance
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {Object.entries(performanceMetrics.lighthouse).map(
                        ([key, value]) => (
                          <LazyComponent
                            key={key}
                            animation="scale"
                            delay={100}
                          >
                            <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-cyan-500/20">
                              <div className="text-2xl font-bold text-cyan-400 mb-2">
                                {value}
                              </div>
                              <div className="text-gray-300 text-sm capitalize mb-3">
                                {key}
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-3">
                                <div
                                  className="bg-cyan-500 h-3 rounded-full transition-all duration-1000"
                                  style={{ width: `${value}%` }}
                                />
                              </div>
                            </div>
                          </LazyComponent>
                        )
                      )}
                    </div>

                    <LazyComponent animation="fadeUp" delay={300}>
                      <div className="bg-gray-800/50 rounded-xl p-6 border border-cyan-500/20">
                        <h5 className="text-cyan-400 font-semibold mb-4">
                          Core Web Vitals
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {Object.entries(performanceMetrics.coreWebVitals).map(
                            ([key, value]) => (
                              <div key={key} className="text-center">
                                <div className="text-lg font-bold text-white mb-2">
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
                    </LazyComponent>

                    <LazyComponent animation="fadeUp" delay={400}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-800/50 rounded-xl p-6 border border-green-500/20">
                          <div className="text-green-400 font-bold text-lg">
                            {performanceMetrics.loadTime}
                          </div>
                          <div className="text-gray-400 text-sm">
                            Tempo de Carregamento
                          </div>
                        </div>
                        <div className="bg-gray-800/50 rounded-xl p-6 border border-blue-500/20">
                          <div className="text-blue-400 font-bold text-lg">
                            {performanceMetrics.bundleSize}
                          </div>
                          <div className="text-gray-400 text-sm">
                            Tamanho do Bundle
                          </div>
                        </div>
                      </div>
                    </LazyComponent>
                  </div>
                </LazyComponent>
              )}

              {activeTab === "techstack" && (
                <LazyComponent animation="fadeUp" delay={200}>
                  <div className="space-y-8">
                    <h4 className="text-xl font-bold text-white mb-6">
                      Stack Tecnológico Completo
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {project.techStack?.map(
                        (tech: any, techIndex: number) => (
                          <LazyComponent
                            key={tech.name}
                            animation="scale"
                            delay={techIndex * 100}
                          >
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: techIndex * 0.1 }}
                              className="bg-gray-800/50 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300"
                            >
                              <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                                  <tech.icon className="w-7 h-7 text-cyan-400" />
                                </div>
                                <div>
                                  <div className="text-white font-bold text-base">
                                    {tech.name}
                                  </div>
                                  <div className="text-cyan-400 text-sm">
                                    {tech.category}
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                {tech.description}
                              </p>
                            </motion.div>
                          </LazyComponent>
                        )
                      ) || (
                        <div className="col-span-full text-center py-12 text-gray-400">
                          <Code className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg">
                            Detalhes técnicos em desenvolvimento
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </LazyComponent>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </LazyComponent>
  );
};

// Componente Neon Element para Projects - OTIMIZADO (mantido igual)
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
        { opacity: 0, scale: 0, y: 100, rotation: -180 },
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
    <LazyComponent animation="fadeIn" delay={delay * 100}>
      <div
        ref={elementRef}
        className={`absolute ${position} pointer-events-none`}
      >
        <Icon className={`${color} text-2xl opacity-70`} />
      </div>
    </LazyComponent>
  );
};

// Componente Principal Projects - OTIMIZADO (mantido igual)
export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProjectForDetails, setSelectedProjectForDetails] =
    useState<ExtendedProject | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  usePerformanceMonitor("ProjectsSection");

  const neonElements = useMemo(
    () => [
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
    ],
    []
  );

  const statsData = useMemo(
    () => [
      {
        number: projects.length,
        title: "Projetos",
        subtitle: "Entregues com Excelência",
        icon: Rocket,
      },
      {
        number: `${Math.round(
          (projects.filter((p) => p.liveUrl).length / projects.length) * 100
        )}%`,
        title: "Online",
        subtitle: "Projetos em Produção",
        icon: Eye,
      },
      {
        number: "24/7",
        title: "Disponível",
        subtitle: "Para Novos Desafios",
        icon: Star,
      },
      {
        number: "5+",
        title: "Anos Exp",
        subtitle: "Experiência Comprovada",
        icon: Code,
      },
    ],
    []
  );

  useEffect(() => {
    if (!isInView || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".projects-header",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          ".projects-grid",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.3"
        )
        .fromTo(
          ".projects-stats",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 },
          "-=0.2"
        )
        .fromTo(
          ".projects-cta",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.6 },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden py-16 sm:py-20"
    >
      <LazyBackground priority="medium">
        <PremiumBackground intensity="medium">
          <div className="absolute inset-0 pointer-events-none">
            {neonElements.map((element, index) => (
              <ProjectsNeonElement
                key={`${element.position}-${index}`}
                {...element}
              />
            ))}
          </div>
        </PremiumBackground>
      </LazyBackground>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LazyComponent animation="fadeUp" delay={200}>
          <motion.div
            className="text-center mb-16 lg:mb-20 projects-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
              viewport={{ once: true }}
              className="inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-5 py-2.5 rounded-full border border-cyan-400/30 backdrop-blur-2xl mb-6"
            >
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
              PORTFÓLIO PREMIUM
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                PROJETOS{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  DE IMPACTO
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Soluções inovadoras desenvolvidas com tecnologias de ponta,
                arquitetura escalável e foco em performance excepcional
              </p>
            </motion.div>
          </motion.div>
        </LazyComponent>

        <LazyComponent animation="fadeUp" delay={300}>
          <div className="mb-16 lg:mb-20">
            <ProjectShowcase />
          </div>
        </LazyComponent>

        <AnimatePresence>
          {selectedProjectForDetails && (
            <LazyComponent animation="fadeUp" delay={400}>
              <div className="mb-16 lg:mb-20">
                <TechnicalDeepDive project={selectedProjectForDetails} />
              </div>
            </LazyComponent>
          )}
        </AnimatePresence>

        <LazyComponent animation="fadeUp" delay={500}>
          <motion.div
            className="mb-16 lg:mb-20 projects-stats"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {statsData.map((stat, index) => (
                <LazyComponent
                  key={stat.title}
                  animation="scale"
                  delay={index * 100}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="text-center p-5 sm:p-6 bg-gray-900/40 backdrop-blur-lg rounded-2xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-4 border border-cyan-400/30">
                      <stat.icon className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white mb-1">
                      {stat.title}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.subtitle}</div>
                  </motion.div>
                </LazyComponent>
              ))}
            </div>
          </motion.div>
        </LazyComponent>

        <LazyComponent animation="fadeUp" delay={600}>
          <motion.div
            className="text-center projects-cta"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-2xl p-6 sm:p-8 md:p-10 rounded-2xl border border-cyan-500/20 shadow-xl shadow-cyan-400/10">
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
                  viewport={{ once: true }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30 shadow-lg"
                  whileHover={{ rotate: 360 }}
                >
                  <Rocket className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400" />
                </motion.div>
                <div className="text-center lg:text-left flex-1">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2">
                    Próximo projeto incrível?
                  </h3>
                  <p className="text-gray-300 text-base md:text-lg">
                    Vamos transformar sua visão em realidade com tecnologia de
                    ponta
                  </p>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
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
                    className="w-full lg:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base md:text-lg px-6 py-3 md:px-8 md:py-4 rounded-xl shadow-lg hover:shadow-cyan-400/40 transition-all duration-300 hover:scale-[1.03]"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    INICIAR PROJETO
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </LazyComponent>
      </div>
    </section>
  );
};

export default Projects;
