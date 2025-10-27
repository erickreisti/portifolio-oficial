// components/sections/Projects/Projects.tsx
"use client";

import { useState } from "react";
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
import styles from "./Projects.module.css";

// Componente Modal para tags
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
    <div className={styles.modalOverlay}>
      <MotionDiv
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
              <MotionDiv
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Badge className={styles.modalTag}>{tag}</Badge>
              </MotionDiv>
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
      </MotionDiv>
    </div>
  );
};

// Dados dos projetos
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

// Componente de Card de Projeto
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
        className={styles.projectCardWrapper}
      >
        <Card className={styles.projectCard}>
          {/* Header com Imagem */}
          <div className={styles.projectImageContainer}>
            <div className={styles.projectImageWrapper}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className={styles.projectImage}
              />
              <div className={styles.projectImageOverlay} />
            </div>
            <div className={styles.projectIconContainer}>
              <MotionDiv
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={styles.projectIconWrapper}
              >
                <Cpu className={styles.projectIcon} />
              </MotionDiv>
              <span className={styles.projectTitleOverlay}>
                {project.title}
              </span>
            </div>
          </div>

          <CardHeader className={styles.projectCardHeader}>
            <CardTitle className={styles.projectCardTitle}>
              <span className={styles.projectTitleText}>{project.title}</span>
              <MotionDiv
                whileHover={{ scale: 1.1, rotate: 15 }}
                className={styles.projectTitleIcon}
              >
                <Rocket className={styles.rocketIcon} />
              </MotionDiv>
            </CardTitle>
            <CardDescription className={styles.projectCardDescription}>
              {project.description}
            </CardDescription>
          </CardHeader>

          <CardContent className={styles.projectCardContent}>
            <div className={styles.tagsContainer}>
              {project.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                <MotionDiv
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: tagIndex * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Badge className={styles.tag}>{tag}</Badge>
                </MotionDiv>
              ))}

              {project.tags.length > 3 && (
                <MotionDiv
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.15 }}
                  viewport={{ once: true }}
                >
                  <Badge
                    className={styles.moreTagsBadge}
                    onClick={() => setIsModalOpen(true)}
                  >
                    +{project.tags.length - 3}
                    <div className={styles.moreTagsGlow} />
                  </Badge>
                </MotionDiv>
              )}
            </div>
          </CardContent>

          <CardFooter className={styles.projectCardFooter}>
            <div className={styles.projectActions}>
              <Button asChild className={styles.githubButton}>
                <NextLink href={project.githubUrl} target="_blank">
                  <Github className={styles.buttonIcon} />
                  CÓDIGO
                </NextLink>
              </Button>
              {project.liveUrl && (
                <Button asChild className={styles.demoButton}>
                  <NextLink href={project.liveUrl} target="_blank">
                    <ExternalLink className={styles.buttonIcon} />
                    DEMO
                  </NextLink>
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </MotionDiv>

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
    <section id="projects" className={styles.projectsSection}>
      {/* Background */}
      <div className={styles.background}>
        <div className={styles.gradientBackground} />
        <div className={styles.lightEffect1} />
        <div className={styles.lightEffect2} />
      </div>

      {/* Elementos decorativos */}
      <div className={styles.decorativeElements}>
        <div className={styles.decoration1}>
          <svg
            className={styles.decorationIcon}
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
        <div className={styles.decoration2}>
          <svg
            className={styles.decorationIcon}
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
      </div>

      <div className={styles.container}>
        {/* Header */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className={styles.header}
        >
          <MotionDiv
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
            viewport={{ once: true }}
            className={styles.badge}
          >
            <Sparkles className={styles.badgeIcon} />
            PORTFÓLIO PREMIUM
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className={styles.title}>
              PROJETOS <span className={styles.titleGradient}>DE IMPACTO</span>
            </h1>
            <p className={styles.subtitle}>
              Soluções inovadoras desenvolvidas com tecnologias de ponta,
              arquitetura escalável e foco em performance excepcional
            </p>
          </MotionDiv>
        </MotionDiv>

        {/* Grid de Projetos */}
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Stats */}
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className={styles.statsSection}
        >
          <div className={styles.statsGrid}>
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
                className={styles.statCard}
              >
                <div className={`${styles.statIcon} ${stat.color}`}>
                  <stat.icon className={styles.statIconInner} />
                </div>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statTitle}>{stat.title}</div>
                <div className={styles.statSubtitle}>{stat.subtitle}</div>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>

        {/* CTA */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className={styles.ctaSection}
        >
          <div className={styles.ctaCard}>
            <div className={styles.ctaContent}>
              <MotionDiv
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                viewport={{ once: true }}
                className={styles.ctaIcon}
              >
                <Rocket className={styles.ctaIconInner} />
              </MotionDiv>
              <div className={styles.ctaText}>
                <h3 className={styles.ctaTitle}>Próximo projeto incrível?</h3>
                <p className={styles.ctaDescription}>
                  Vamos transformar sua visão em realidade com tecnologia de
                  ponta
                </p>
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
                  className={styles.ctaButton}
                >
                  <Sparkles className={styles.buttonIcon} />
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
