// components/sections/Skills/Skills.tsx
"use client";

import MotionDiv from "@/components/ui/MotionDiv";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Code2,
  Database,
  Cloud,
  Zap,
  Brain,
  Server,
  Smartphone,
  GitBranch,
  Rocket,
  Sparkles,
} from "lucide-react";
import styles from "./Skills.module.css";

// Dados das habilidades
const skillsData = [
  {
    category: "FRONTEND & MOBILE",
    icon: Smartphone,
    description: "Experiências digitais imersivas e responsivas",
    skills: [
      {
        name: "Next.js 14+",
        level: 96,
        color: "from-gray-700 to-gray-900",
        description: "SSR, App Router, Server Actions",
      },
      {
        name: "TypeScript",
        level: 94,
        color: "from-blue-600 to-blue-800",
        description: "Type Safety & Advanced Patterns",
      },
      {
        name: "React",
        level: 92,
        color: "from-cyan-500 to-blue-600",
        description: "Hooks, Context & Performance",
      },
      {
        name: "Tailwind CSS",
        level: 98,
        color: "from-cyan-400 to-blue-500",
        description: "Utility-first & Design Systems",
      },
    ],
  },
  {
    category: "BACKEND & DATABASE",
    icon: Server,
    description: "APIs robustas e arquiteturas escaláveis",
    skills: [
      {
        name: "Node.js & Express",
        level: 92,
        color: "from-green-600 to-green-700",
        description: "REST & GraphQL APIs",
      },
      {
        name: "Prisma & ORM",
        level: 85,
        color: "from-yellow-500 to-yellow-600",
        description: "Data Modeling & Migrations",
      },
      {
        name: "PostgreSQL",
        level: 88,
        color: "from-blue-700 to-blue-800",
        description: "Complex Queries & Optimization",
      },
      {
        name: "Supabase & MongoDB",
        level: 82,
        color: "from-green-500 to-green-600",
        description: "Realtime & NoSQL Databases",
      },
    ],
  },
  {
    category: "CLOUD & DEVOPS",
    icon: Cloud,
    description: "Infraestrutura moderna e CI/CD",
    skills: [
      {
        name: "AWS & Vercel",
        level: 84,
        color: "from-orange-500 to-orange-600",
        description: "Serverless & Edge Computing",
      },
      {
        name: "Docker & Kubernetes",
        level: 78,
        color: "from-blue-400 to-blue-500",
        description: "Containerization & Orchestration",
      },
      {
        name: "CI/CD Pipelines",
        level: 87,
        color: "from-purple-500 to-purple-600",
        description: "GitHub Actions & Automation",
      },
      {
        name: "Git & GitHub",
        level: 96,
        color: "from-gray-600 to-gray-800",
        description: "Advanced Git Workflows",
      },
    ],
  },
];

// Componente da Barra de Habilidade
interface SkillBarProps {
  name: string;
  level: number;
  color: string;
  description: string;
}

const SkillBar: React.FC<SkillBarProps> = ({
  name,
  level,
  color,
  description,
}) => {
  return (
    <div className={styles.skillItem}>
      <div className={styles.skillHeader}>
        <div className={styles.skillInfo}>
          <span className={styles.skillName}>{name}</span>
          <span className={styles.skillDescription}>{description}</span>
        </div>
        <Badge className={styles.skillBadge}>{level}%</Badge>
      </div>

      <div className={styles.skillBarContainer}>
        <MotionDiv
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          whileHover={{ width: `${Math.min(level + 3, 100)}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.05 }}
          viewport={{ once: true, amount: 0.2 }}
          className={`${styles.skillBar} ${color}`}
        >
          <div className={styles.skillBarGlow} />
        </MotionDiv>
      </div>
    </div>
  );
};

export const Skills = () => {
  return (
    <section id="skills" className={styles.skillsSection}>
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
            <Zap className={styles.badgeIcon} />
            DOMÍNIO TECNOLÓGICO
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className={styles.title}>
              EXPERTISE EM{" "}
              <span className={styles.titleGradient}>FULL STACK</span>
            </h1>
            <p className={styles.subtitle}>
              Domínio completo do ecossistema moderno de desenvolvimento, desde
              interfaces imersivas até infraestrutura escalável
            </p>
          </MotionDiv>
        </MotionDiv>

        {/* Grid de Skills */}
        <div className={styles.skillsGrid}>
          {skillsData.map((group, index) => (
            <MotionDiv
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2, type: "spring" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card className={styles.skillCard}>
                <CardHeader className={styles.cardHeader}>
                  <div className={styles.cardTitleContainer}>
                    <div className={styles.cardIconWrapper}>
                      <group.icon className={styles.cardIcon} />
                    </div>
                    <CardTitle className={styles.cardTitle}>
                      {group.category}
                    </CardTitle>
                  </div>
                  <p className={styles.cardDescription}>{group.description}</p>
                </CardHeader>

                <CardContent className={styles.cardContent}>
                  {group.skills.map((skill, skillIndex) => (
                    <MotionDiv
                      key={skill.name}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: skillIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <SkillBar {...skill} />
                    </MotionDiv>
                  ))}
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
        </div>

        {/* Stats */}
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className={styles.statsSection}
        >
          <div className={styles.statsGrid}>
            {[
              {
                number: "20+",
                title: "Tecnologias",
                subtitle: "Stack Completa",
                icon: Brain,
                color: "from-blue-400 to-cyan-400",
              },
              {
                number: "92%",
                title: "Proficiência",
                subtitle: "Média de Domínio",
                icon: Zap,
                color: "from-purple-400 to-pink-400",
              },
              {
                number: "5+",
                title: "Anos Exp",
                subtitle: "Experiência Comprovada",
                icon: Rocket,
                color: "from-amber-400 to-orange-400",
              },
              {
                number: "100%",
                title: "Qualidade",
                subtitle: "Padrão de Excelência",
                icon: Sparkles,
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
          transition={{ duration: 0.6, delay: 0.8 }}
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
                <GitBranch className={styles.ctaIconInner} />
              </MotionDiv>
              <div className={styles.ctaText}>
                <h3 className={styles.ctaTitle}>
                  Pronto para elevar seu projeto?
                </h3>
                <p className={styles.ctaDescription}>
                  Vamos aplicar essa expertise técnica no seu próximo desafio
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
                  INICIAR COLABORAÇÃO
                </button>
              </MotionDiv>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};
