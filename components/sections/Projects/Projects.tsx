"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  Github,
  Rocket,
  Eye,
  Code,
  ExternalLink,
  X,
  Play,
  Square,
  ZoomIn,
  ChevronDown,
  ChevronUp,
  Star,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/project-data";
import type { Project } from "@/lib/project-data";
import { PremiumBackground } from "@/components/layout/PremiumBackground";
import { LazyComponent } from "@/components/optimization/LazyComponent";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import LazyBackground from "@/components/optimization/LazyBackground";
import Image from "next/image";
import { useLockScroll, forceReleaseAll } from "@/hooks/useLockScroll";
import ModalPortal from "@/components/ui/ModalPortal";
import { NeonElements } from "@/components/layout/NeonElements";
import { COLORS } from "@/lib/colors";
import { AnimatedActionButton } from "@/components/ui/AnimatedActionButton";

interface ExtendedProject extends Project {
  demoVideo?: string;
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
        className={`${
          COLORS.classes.background.card
        } flex items-center justify-center ${className} ${
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

/* ---------------- Modal Components ---------------- */
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
        className="modal-overlay fixed inset-0 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`${COLORS.classes.card} shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-cyan-500/20">
            <div>
              <h3 className={COLORS.classes.text.primary}>
                Todas as Tecnologias
              </h3>
              <p className={COLORS.classes.text.accent}>
                {technologies.length} tecnologias utilizadas
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
            </button>
          </div>

          <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-cyan-500/10 text-cyan-400 border border-cyan-400/30 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-mono text-center hover:bg-cyan-500/20 transition-colors duration-200"
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
        className="modal-overlay fixed inset-0 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="modal-content relative max-w-6xl w-full max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-8 sm:-top-12 right-0 p-2 text-white hover:text-cyan-400 transition-colors z-10 bg-black/50 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="relative w-full h-[70vh] sm:h-[80vh] bg-black rounded-lg overflow-hidden">
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

/* ---------------- StatCard ---------------- */
const StatCard = ({ stat, index }: { stat: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: 50,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: index * 0.1,
        }
      );
    });

    return () => ctx.revert();
  }, [isInView, index]);

  return (
    <LazyComponent animation="scale" delay={index * 100}>
      <motion.div
        ref={cardRef}
        className={`text-center p-4 sm:p-6 ${COLORS.classes.card} ${COLORS.classes.cardHover} relative overflow-hidden group`}
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex justify-center mb-2 sm:mb-3">
          <motion.div
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30 group-hover:border-cyan-400/50 transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-cyan-400" />
          </motion.div>
        </div>
        <div
          className={`text-xl sm:text-2xl lg:text-3xl font-black ${COLORS.classes.text.gradient} mb-1 sm:mb-2`}
        >
          {stat.number}
        </div>
        <div
          className={`${COLORS.classes.text.secondary} font-medium text-xs sm:text-sm tracking-wide transition-colors duration-300 group-hover:text-gray-200`}
        >
          {stat.title}
        </div>
        <div
          className={`${COLORS.classes.text.tertiary} text-xs transition-colors duration-300 group-hover:text-gray-400`}
        >
          {stat.subtitle}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-400/5 opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      </motion.div>
    </LazyComponent>
  );
};

/* ---------------- ProjectShowcase ---------------- */
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
  useLockScroll(isModalLocked);

  useEffect(() => {
    if (selectedProject || zoomImage || showAllTechnologies) {
      setIsModalLocked(true);
    }
  }, [selectedProject, zoomImage, showAllTechnologies]);

  const handlePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const toggleProjectExpansion = useCallback(
    (projectId: number, e: React.MouseEvent) => {
      e.stopPropagation();
      const idStr = projectId.toString();
      const newExpanded = new Set(expandedProjects);
      if (newExpanded.has(idStr)) newExpanded.delete(idStr);
      else newExpanded.add(idStr);
      setExpandedProjects(newExpanded);
    },
    [expandedProjects]
  );

  const showTechnologiesModal = useCallback(
    (technologies: string[], e: React.MouseEvent) => {
      e.stopPropagation();
      setShowAllTechnologies(technologies);
    },
    []
  );

  const handleImageZoom = useCallback(
    (imageSrc: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setZoomImage(imageSrc);
    },
    []
  );

  const handleLiveDemo = useCallback((liveUrl: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (liveUrl) window.open(liveUrl, "_blank", "noopener,noreferrer");
  }, []);

  const handleGithubClick = useCallback(
    (githubUrl: string, e: React.MouseEvent) => {
      e.stopPropagation();
      window.open(githubUrl, "_blank", "noopener,noreferrer");
    },
    []
  );

  return (
    <>
      <LazyComponent animation="fadeUp" delay={200}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 projects-grid">
          {(projects as ExtendedProject[]).map((project, index) => {
            const isExpanded = expandedProjects.has(project.id.toString());
            const visibleTags = isExpanded
              ? project.tags
              : project.tags.slice(0, 3); // Mostra menos tags no mobile
            const hasMoreTags = project.tags.length > 3;

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
                  <div
                    className={`${COLORS.classes.card} ${COLORS.classes.cardHover} hover:scale-[1.02] h-full flex flex-col min-h-[400px] sm:min-h-[450px]`}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <OptimizedImage
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority={index < 3}
                      />

                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 sm:gap-3">
                        <button
                          onClick={(e) => handleImageZoom(project.image, e)}
                          className="p-2 sm:p-3 bg-white/20 rounded-full border border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                          <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                        </button>

                        {project.liveUrl && (
                          <button
                            onClick={(e) => handleLiveDemo(project.liveUrl!, e)}
                            className="p-2 sm:p-3 bg-cyan-500/20 rounded-full border border-cyan-400/30 backdrop-blur-sm hover:bg-cyan-500/30 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          >
                            <Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-cyan-400" />
                          </button>
                        )}

                        <button
                          onClick={(e) =>
                            handleGithubClick(project.githubUrl, e)
                          }
                          className="p-2 sm:p-3 bg-gray-800/80 rounded-full border border-gray-600/30 backdrop-blur-sm hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                          <Github className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                        </button>
                      </div>

                      {project.demoVideo && (
                        <div className="absolute top-2 right-2 bg-cyan-500/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full border border-cyan-400/30">
                          <span className="text-cyan-400 text-xs font-mono">
                            DEMO
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-3 sm:p-4 lg:p-5 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-1 sm:mb-2">
                        <h3
                          className={`${COLORS.classes.text.primary} font-bold text-base sm:text-lg flex-1 pr-2 line-clamp-2`}
                        >
                          {project.title}
                        </h3>
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 15 }}
                          className={COLORS.classes.text.accent}
                        >
                          <Rocket className="w-3 h-3 sm:w-4 sm:h-4" />
                        </motion.div>
                      </div>

                      <p
                        className={`${COLORS.classes.text.secondary} text-xs sm:text-sm line-clamp-3 flex-1 mb-2 sm:mb-3 lg:mb-4 leading-relaxed`}
                      >
                        {project.description}
                      </p>

                      <div className="space-y-1 sm:space-y-2">
                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
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
                          <div className="flex gap-1 sm:gap-2 pt-1">
                            <button
                              onClick={(e) =>
                                toggleProjectExpansion(project.id, e)
                              }
                              className="flex items-center gap-1 text-cyan-400 text-xs font-mono hover:text-cyan-300 transition-colors px-1.5 py-0.5 sm:px-2 sm:py-1 rounded border border-cyan-400/30 hover:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="w-3 h-3" />
                                  <span className="hidden sm:inline">
                                    Ver menos
                                  </span>
                                  <span className="sm:hidden">Menos</span>
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-3 h-3" />+
                                  {project.tags.length - 3}
                                </>
                              )}
                            </button>

                            <button
                              onClick={(e) =>
                                showTechnologiesModal(project.tags, e)
                              }
                              className="text-gray-400 text-xs font-mono hover:text-gray-300 transition-colors px-1.5 py-0.5 sm:px-2 sm:py-1 rounded border border-gray-600 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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

      <AnimatePresence
        onExitComplete={() => {
          forceReleaseAll();
          setIsModalLocked(false);
        }}
      >
        {selectedProject && (
          <ModalPortal key="project-modal">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal-overlay fixed inset-0 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => {
                setSelectedProject(null);
                setIsPlaying(false);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`${COLORS.classes.card} shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-cyan-500/20">
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`${COLORS.classes.text.primary} text-lg sm:text-xl truncate`}
                    >
                      {selectedProject.title}
                    </h3>
                    <p
                      className={`${COLORS.classes.text.accent} text-sm truncate`}
                    >
                      {selectedProject.description}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      setIsPlaying(false);
                    }}
                    className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 ml-2 flex-shrink-0"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="p-4 sm:p-6 overflow-y-auto max-h-[70vh]">
                  {selectedProject.demoVideo ? (
                    <div className="relative rounded-lg overflow-hidden mb-4 sm:mb-6">
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
                        <div className="p-4 sm:p-6 bg-black/50 rounded-full backdrop-blur-sm border border-white/20">
                          {isPlaying ? (
                            <Square className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                          ) : (
                            <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                          )}
                        </div>
                      </button>
                    </div>
                  ) : (
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-4 sm:mb-6">
                      <OptimizedImage
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  )}

                  <div className="mb-4 sm:mb-6">
                    <h4
                      className={`${COLORS.classes.text.primary} font-semibold mb-2 sm:mb-3`}
                    >
                      Tecnologias Utilizadas
                    </h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
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

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${COLORS.classes.button.primary} flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-center flex items-center justify-center gap-2 text-sm sm:text-base`}
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                        VISITAR SITE
                      </a>
                    )}
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${COLORS.classes.button.secondary} flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-center flex items-center justify-center gap-2 text-sm sm:text-base`}
                    >
                      <Github className="w-4 h-4 sm:w-5 sm:h-5" />
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

/* ---------------- Componente Principal Projects ---------------- */
const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  usePerformanceMonitor("ProjectsSection");

  const projectsData = useMemo(
    () => ({
      stats: [
        {
          number: projects.length.toString(),
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
    }),
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

  // Função para navegar até a seção de contato
  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const headerHeight = 80;
      const elementPosition = contactSection.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`relative min-h-screen ${COLORS.classes.background.section} section-with-header`}
    >
      {/* MESMO BACKGROUND DO ABOUT - PremiumBackground com NeonElements */}
      <LazyBackground priority="medium">
        <PremiumBackground intensity="medium">
          <NeonElements />
        </PremiumBackground>
      </LazyBackground>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20 projects-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-cyan-400/30 backdrop-blur-2xl mb-4 sm:mb-6 relative overflow-hidden group"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 animate-pulse" />
            PORTFÓLIO & PROJETOS
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight px-2">
              PROJETOS QUE{" "}
              <span className={COLORS.classes.text.gradient}>IMPACTAM</span>
            </h1>
            <p
              className={`${COLORS.classes.text.secondary} text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4`}
            >
              Soluções reais, código limpo e resultados excepcionais. Conheça
              alguns dos projetos onde transformei ideias em experiências
              digitais memoráveis.
            </p>
          </motion.div>
        </motion.div>

        {/* Project Showcase */}
        <ProjectShowcase />

        {/* Stats */}
        <div className="projects-stats grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mt-8 sm:mt-12">
          {projectsData.stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>

        {/* CTA Section */}
        <LazyComponent animation="fadeUp" delay={800}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 projects-cta"
          >
            <motion.div
              className={`${COLORS.classes.card} ${COLORS.classes.cardHover} p-4 sm:p-6 relative overflow-hidden group`}
              whileHover={{ y: -5 }}
            >
              <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6 lg:gap-8 relative z-10">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  viewport={{ once: true }}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30 shadow-lg sm:shadow-xl shadow-cyan-400/30 group-hover:border-cyan-400/50"
                  whileHover={{ rotate: 360 }}
                >
                  <Rocket className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-cyan-400" />
                </motion.div>

                <div className="text-center lg:text-left flex-1">
                  <h3
                    className={`${COLORS.classes.text.primary} text-lg sm:text-xl lg:text-2xl font-black mb-1 sm:mb-2`}
                  >
                    Pronto para iniciar seu projeto?
                  </h3>
                  <p
                    className={`${COLORS.classes.text.secondary} text-sm sm:text-base lg:text-lg`}
                  >
                    Vamos criar algo incrível juntos usando as melhores
                    tecnologias do mercado
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="w-full lg:w-auto"
                >
                  <AnimatedActionButton
                    title="INICIAR PROJETO"
                    subtitle="VAMOS CONVERSAR"
                    icon={Rocket}
                    size="lg"
                    onClick={handleContactClick}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-cyan-400/50 hover:border-cyan-300/70 w-full lg:w-auto"
                    showArrow={true}
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </LazyComponent>
      </div>
    </section>
  );
};

export default Projects;
