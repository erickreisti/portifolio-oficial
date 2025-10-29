"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  Github,
  Rocket,
  Eye,
  Code,
  ExternalLink,
  X,
  Globe,
  Database,
  Server,
  Smartphone,
  Play,
  Square,
  ZoomIn,
  ChevronDown,
  ChevronUp,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/project-data";
import type { Project } from "@/lib/project-data";
import { PremiumBackground } from "@/components/layout/PremiumBackground";
import { LazyComponent } from "@/components/optimization/LazyComponent";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import LazyBackground from "@/components/optimization/LazyBackground";
import Image from "next/image";

// Import the hook and the forceReleaseAll fallback you created
import { useLockScroll, forceReleaseAll } from "@/hooks/useLockScroll";
import ModalPortal from "@/components/ui/ModalPortal";

interface ExtendedProject extends Project {
  demoVideo?: string;
  techStack?: Array<{
    name: string;
    category: string;
    description: string;
    icon: any;
  }>;
}

/* ---------------- OptimizedImage ---------------- */
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

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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

/* ---------------- Modals (no direct lock calls) ---------------- */
const TechnologiesModal: React.FC<{
  technologies: string[];
  onClose: () => void;
}> = ({ technologies, onClose }) => {
  return (
    <ModalPortal>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
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
              className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-cyan-500/10 text-cyan-400 border border-cyan-400/30 rounded-lg px-3 py-2 text-sm font-mono text-center hover:bg-cyan-500/20 transition-colors duration-200"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </ModalPortal>
  );
};

const ImageZoomModal: React.FC<{
  imageSrc: string;
  onClose: () => void;
}> = ({ imageSrc, onClose }) => {
  return (
    <ModalPortal>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-6xl w-full max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 p-2 text-white hover:text-cyan-400 transition-colors z-10 bg-black/50 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full h-[80vh] bg-black rounded-lg overflow-hidden">
            <OptimizedImage
              src={imageSrc}
              alt="Imagem ampliada"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    </ModalPortal>
  );
};

/* ---------------- ProjectShowcase (central lock control) ---------------- */
const ProjectShowcase: React.FC = () => {
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
  const [isModalLocked, setIsModalLocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  usePerformanceMonitor("ProjectShowcase");

  // Apply lock while any modal is open (centralized)
  useLockScroll(isModalLocked);

  // When any modal opens, ensure we enable lock immediately.
  useEffect(() => {
    if (selectedProject || zoomImage || showAllTechnologies) {
      setIsModalLocked(true);
    }
    // do not automatically set false here; release happens after exit animations complete.
  }, [selectedProject, zoomImage, showAllTechnologies]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleProjectExpansion = (projectId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const idStr = projectId.toString();
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(idStr)) newExpanded.delete(idStr);
    else newExpanded.add(idStr);
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

  const handleLiveDemo = (liveUrl: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (liveUrl) window.open(liveUrl, "_blank", "noopener,noreferrer");
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
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-cyan-500/20 overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:scale-[1.02] h-full flex flex-col min-h-[500px]">
                    <div className="relative aspect-video overflow-hidden">
                      <OptimizedImage
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority={index < 3}
                      />

                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <button
                          onClick={(e) => handleImageZoom(project.image, e)}
                          className="p-3 bg-white/20 rounded-full border border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                          <ZoomIn className="w-6 h-6 text-white" />
                        </button>

                        {project.liveUrl && (
                          <button
                            onClick={(e) => handleLiveDemo(project.liveUrl!, e)}
                            className="p-3 bg-cyan-500/20 rounded-full border border-cyan-400/30 backdrop-blur-sm hover:bg-cyan-500/30 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          >
                            <Play className="w-6 h-6 text-cyan-400" />
                          </button>
                        )}

                        <button
                          onClick={(e) =>
                            handleGithubClick(project.githubUrl, e)
                          }
                          className="p-3 bg-gray-800/80 rounded-full border border-gray-600/30 backdrop-blur-sm hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                              className="flex items-center gap-1 text-cyan-400 text-xs font-mono hover:text-cyan-300 transition-colors px-2 py-1 rounded border border-cyan-400/30 hover:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                              className="text-gray-400 text-xs font-mono hover:text-gray-300 transition-colors px-2 py-1 rounded border border-gray-600 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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

      {/* Single AnimatePresence — release lock after exit completes */}
      <AnimatePresence
        onExitComplete={() => {
          // safety: forcefully restore styles and clear locks
          forceReleaseAll();
          // also clear local lock flag if used elsewhere
          setIsModalLocked(false);
        }}
      >
        {selectedProject && (
          <ModalPortal key="project-modal">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => {
                setSelectedProject(null);
                setIsPlaying(false);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
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
                    className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[70vh]">
                  {selectedProject.demoVideo ? (
                    <div className="relative rounded-lg overflow-hidden mb-6">
                      <video
                        ref={videoRef}
                        src={selectedProject.demoVideo}
                        className="w-full rounded-lg"
                        controls={false}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayPause();
                        }}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                        priority
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
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-lg font-bold text-center hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        <ExternalLink className="w-5 h-5" />
                        VISITAR SITE
                      </a>
                    )}
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-800/50 border border-cyan-500/20 text-cyan-400 py-3 px-6 rounded-lg font-bold text-center hover:bg-cyan-500/10 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <Github className="w-5 h-5" />
                      VER CÓDIGO
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </ModalPortal>
        )}

        {zoomImage && (
          <ImageZoomModal
            key="image-zoom"
            imageSrc={zoomImage}
            onClose={() => setZoomImage(null)}
          />
        )}

        {showAllTechnologies && (
          <TechnologiesModal
            key="tech-modal"
            technologies={showAllTechnologies}
            onClose={() => setShowAllTechnologies(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

/* ---------------- rest of the file (neon elements, stats, main Projects) ---------------- */
/* For brevity keep the rest of the Projects component intact; ensure it's unchanged from your working copy. */

const TechnicalDeepDive: React.FC<{ project: ExtendedProject }> = ({
  project,
}) => {
  return (
    <LazyComponent animation="fadeUp" delay={400}>
      <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-cyan-500/20 overflow-hidden mt-12 p-6">
        <h4 className="text-white font-semibold mb-2">
          Deep Dive Técnico — {project.title}
        </h4>
        <p className="text-gray-300 text-sm">
          Arquitetura, infra e decisões técnicas relevantes.
        </p>
      </div>
    </LazyComponent>
  );
};

const ProjectsNeonElement: React.FC<{
  Icon: any;
  position: string;
  color: string;
  delay?: number;
}> = ({ Icon, position, color, delay = 0 }) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(elementRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView || !elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementRef.current!,
        { opacity: 0, scale: 0, y: 100, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          delay: delay * 0.15,
        }
      );
      gsap.to(elementRef.current!, {
        y: -12,
        rotation: 5,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: delay * 0.2,
      });
    }, elementRef);

    return () => ctx.revert();
  }, [isInView, delay]);

  return (
    <LazyComponent animation="fadeIn" delay={delay * 80}>
      <div
        ref={elementRef}
        className={`absolute ${position} pointer-events-none`}
      >
        <Icon className={`${color} text-2xl opacity-70`} />
      </div>
    </LazyComponent>
  );
};

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
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
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-16 sm:py-20"
      style={{ overflow: "visible" }}
    >
      <LazyBackground priority="medium">
        <PremiumBackground intensity="medium">
          <div className="absolute inset-0 pointer-events-none">
            {neonElements.map((element, idx) => (
              <ProjectsNeonElement
                key={`${element.position}-${idx}`}
                {...element}
              />
            ))}
          </div>
        </PremiumBackground>
      </LazyBackground>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="projects-header text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Projetos
          </h2>
          <p className="mt-2 text-cyan-300">
            Alguns trabalhos selecionados e estudos de caso.
          </p>
        </div>

        <ProjectShowcase />

        <div className="projects-stats grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
          {statsData.map((s, i) => (
            <div
              key={i}
              className="bg-gray-900/50 border border-cyan-500/10 rounded-lg p-4 flex items-center gap-4"
            >
              <div className="p-3 bg-cyan-500/10 rounded-md">
                <s.icon className="text-cyan-400 w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{s.number}</div>
                <div className="text-sm text-gray-300">{s.title}</div>
                <div className="text-xs text-gray-400">{s.subtitle}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-cta mt-12 text-center">
          <a
            href="#contact"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-md font-bold shadow-lg hover:shadow-cyan-500/30 transition-all"
          >
            Vamos conversar
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
