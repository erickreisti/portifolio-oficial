// components/sections/Projects/Projects.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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
import styles from "./Projects.module.css";
import { projects } from "@/lib/project-data";
import type { Project } from "@/lib/project-data";

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
    <div className={styles.modalOverlay}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className={styles.modalContent}
      >
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleContainer}>
            <Tag className={styles.modalTitleIcon} />
            <h3 className={styles.modalTitle}>Tecnologias Utilizadas</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className={styles.modalCloseButton}
          >
            <X className={styles.modalCloseIcon} />
          </Button>
        </div>

        <div className={styles.modalProjectInfo}>
          <h4 className={styles.modalProjectTitle}>{project.title}</h4>
          <p className={styles.modalProjectDescription}>
            {project.description}
          </p>
        </div>

        <div className={styles.modalTagsSection}>
          <p className={styles.modalTagsTitle}>
            STACK COMPLETA ({project.tags.length} tecnologias):
          </p>
          <div className={styles.modalTagsContainer}>
            {project.tags.map((tag: string, index: number) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Badge className={styles.modalTag}>{tag}</Badge>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={styles.modalActions}>
          <Button asChild className={styles.modalButtonPrimary}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className={styles.modalButtonIcon} />
              VER CÓDIGO
            </a>
          </Button>
          {project.liveUrl && (
            <Button asChild className={styles.modalButtonSecondary}>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className={styles.modalButtonIcon} />
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
        <Card className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 shadow-2xl hover:shadow-3xl hover:border-blue-400/30 transition-all duration-500 group h-full flex flex-col overflow-hidden hover:scale-105">
          {/* Header com Imagem */}
          <div className="h-32 lg:h-48 w-full bg-gradient-to-br from-blue-500/15 to-purple-500/10 relative overflow-hidden border-b border-gray-700/50">
            <div className="absolute inset-0">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/10" />
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mb-2"
              >
                <Cpu className="w-8 h-8 lg:w-12 lg:h-12 text-blue-400 filter drop-shadow-[0_0_8px_#60a5fa]" />
              </motion.div>
              <span className="text-white font-bold text-sm lg:text-base bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {project.title}
              </span>
            </div>
          </div>

          <CardHeader className="pb-4 flex-grow">
            <CardTitle className="text-lg lg:text-xl font-black text-white flex items-center justify-between">
              <span className="flex-1 truncate mr-2">{project.title}</span>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 15 }}
                className="text-blue-400"
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
                  <Badge className="bg-blue-500/10 text-blue-400 border-blue-400/30 font-mono text-xs font-bold hover:bg-blue-500/20 hover:scale-105 transition-all duration-300">
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
                    className="bg-purple-500/10 text-purple-400 border-purple-400/30 font-mono text-xs font-bold hover:bg-purple-500/20 hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden"
                    onClick={() => setIsModalOpen(true)}
                  >
                    +{project.tags.length - 3}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </Badge>
                </motion.div>
              )}
            </div>
          </CardContent>

          <CardFooter className="pt-4 border-t border-gray-700/50 mt-auto">
            <div className="flex gap-2 w-full">
              <Button
                asChild
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-xs lg:text-sm py-2 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <NextLink href={project.githubUrl} target="_blank">
                  <Github className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  CÓDIGO
                </NextLink>
              </Button>
              {project.liveUrl && (
                <Button
                  asChild
                  className="flex-1 bg-gray-800/50 backdrop-blur-sm border border-blue-400/30 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400/60 font-bold text-xs lg:text-sm py-2 rounded-lg transition-all duration-500 hover:scale-105"
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

      <TagsModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const neonElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      // Animação dos elementos neon
      const neonElements = neonElementsRef.current.filter(Boolean);
      gsap.fromTo(
        neonElements,
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
          stagger: 0.15,
        }
      );

      // Animações flutuantes contínuas
      neonElements.forEach((element, index) => {
        gsap.to(element, {
          y: -20 - index * 5,
          rotation: index % 2 === 0 ? 10 : -10,
          duration: 3 + index,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.3,
        });
      });

      // Pulsação neon
      gsap.to(".neon-projects", {
        filter: "drop-shadow(0 0 15px currentColor) brightness(1.3)",
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  const setNeonElementRef = (index: number) => (el: HTMLDivElement | null) => {
    neonElementsRef.current[index] = el;
  };

  // Configuração dos elementos neon
  const neonElementsConfig = [
    {
      Icon: Rocket,
      position: "top-20 left-20",
      color: "text-cyan-400",
      size: "text-3xl",
    },
    {
      Icon: Code,
      position: "top-32 right-24",
      color: "text-purple-400",
      size: "text-3xl",
    },
    {
      Icon: Globe,
      position: "bottom-40 left-24",
      color: "text-green-400",
      size: "text-2xl",
    },
    {
      Icon: Database,
      position: "bottom-32 right-20",
      color: "text-amber-400",
      size: "text-2xl",
    },
    {
      Icon: Server,
      position: "top-40 right-16",
      color: "text-blue-400",
      size: "text-xl",
    },
    {
      Icon: Smartphone,
      position: "bottom-48 left-16",
      color: "text-emerald-400",
      size: "text-xl",
    },
    {
      Icon: Cloud,
      position: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
      color: "text-indigo-400",
      size: "text-2xl",
    },
    {
      Icon: Zap,
      position: "top-1/3 left-1/4",
      color: "text-rose-400",
      size: "text-xl",
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen bg-gray-950 overflow-hidden border-t border-gray-800/50"
    >
      {/* Background com gradientes animados */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 60%),
              radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.12) 0%, transparent 60%),
              radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 60%),
              radial-gradient(circle at 70% 90%, rgba(245, 158, 11, 0.08) 0%, transparent 60%),
              linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)
            `,
          }}
        />

        {/* Elementos de fundo animados */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/5 w-64 h-64 bg-purple-500/08 rounded-full filter blur-3xl"
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Elementos Neon Flutuantes */}
      <div className="absolute inset-0 pointer-events-none">
        {neonElementsConfig.map(({ Icon, position, color, size }, index) => (
          <motion.div
            key={index}
            ref={setNeonElementRef(index)}
            className={`absolute ${styles.neonGlow} neon-projects ${position}`}
          >
            <Icon className={`${color} ${size}`} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16 lg:mb-24"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center text-blue-400 bg-blue-500/10 border border-blue-400/30 px-4 py-2 rounded-full text-sm lg:text-base font-mono font-bold mb-6 lg:mb-8"
          >
            <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 mr-2 animate-pulse" />
            PORTFÓLIO PREMIUM
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black text-white mb-4 lg:mb-6">
              PROJETOS{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                DE IMPACTO
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Soluções inovadoras desenvolvidas com tecnologias de ponta,
              arquitetura escalável e foco em performance excepcional
            </p>
          </motion.div>
        </motion.div>

        {/* Grid de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Stats - Agora dinâmico baseado nos projetos */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16 lg:mb-24"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              {
                number: projects.length,
                title: "Projetos",
                subtitle: "Entregues com Excelência",
                icon: Rocket,
                color: "from-blue-400 to-cyan-400",
              },
              {
                number: `${Math.round(
                  (projects.filter((p) => p.liveUrl).length / projects.length) *
                    100
                )}%`,
                title: "Online",
                subtitle: "Projetos em Produção",
                icon: Eye,
                color: "from-purple-400 to-pink-400",
              },
              {
                number: "24/7",
                title: "Disponível",
                subtitle: "Para Novos Desafios",
                icon: Star,
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
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-900/40 backdrop-blur-lg rounded-2xl border border-gray-700/50 hover:border-blue-400/30 transition-all duration-500 cursor-pointer hover:scale-105"
              >
                <div
                  className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                </div>
                <div className="text-2xl lg:text-3xl xl:text-4xl font-black text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-lg lg:text-xl font-bold text-white mb-1">
                  {stat.title}
                </div>
                <div className="text-sm lg:text-base text-gray-400">
                  {stat.subtitle}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gray-900/60 to-gray-800/40 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-gray-700/50 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                viewport={{ once: true }}
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 flex items-center justify-center border border-blue-400/30 flex-shrink-0"
              >
                <Rocket className="w-8 h-8 lg:w-10 lg:h-10 text-blue-400 animate-pulse" />
              </motion.div>

              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-black text-white mb-3">
                  Próximo projeto incrível?
                </h3>
                <p className="text-lg lg:text-xl text-gray-300">
                  Vamos transformar sua visão em realidade com tecnologia de
                  ponta
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg px-8 lg:px-12 py-4 lg:py-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 flex items-center justify-center"
                >
                  <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 mr-3" />
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
