// components/sections/About/About.tsx
"use client";

import {
  Zap,
  Code2,
  Users,
  Brain,
  Rocket,
  Sparkles,
  Code,
  Shield,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MotionDiv from "@/components/ui/MotionDiv";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import styles from "./About.module.css";

// Dados da biografia
const bioData = {
  paragraph1:
    "Olá! Sou Érick Reis, um Desenvolvedor FullStack & Arquiteto de Sistemas apaixonado por transformar ideias em soluções digitais robustas e escaláveis. Minha jornada na tecnologia começou com formação em Tecnologia da Informação e Sistemas de Informação, seguida por especialização em Redes de Computadores. Essa base técnica diversificada me proporcionou uma visão holística de sistemas, que hoje aplico no desenvolvimento de aplicações modernas.",
  paragraph2:
    "Acredito que código bem escrito resolve problemas reais. Minha abordagem combina arquitetura limpa, performance como prioridade, segurança desde a concepção e escalabilidade pensada para o crescimento. Minha experiência multidisciplinar em TI me permite entregar soluções completas — desde a modelagem do banco de dados até a experiência do usuário final. Não apenas codifico features, mas orquestro sistemas que funcionam em harmonia.",
  passions: [
    {
      icon: Brain,
      text: "Arquitetura de Sistemas & Clean Code",
      description: "DDD, Clean Architecture e princípios SOLID",
    },
    {
      icon: Zap,
      text: "Performance & Otimização Web",
      description: "Lighthouse 90%+, Core Web Vitals otimizados",
    },
    {
      icon: Users,
      text: "Visão Holística de Sistemas",
      description: "Do backend à experiência do usuário final",
    },
    {
      icon: Rocket,
      text: "Soluções Escaláveis",
      description: "Arquitetura preparada para crescimento",
    },
  ],
  highlights: [
    {
      icon: Zap,
      text: "Performance",
      value: "95%+ Lighthouse",
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon: Code2,
      text: "Arquitetura Limpa",
      value: "Código Sólido",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: Shield,
      text: "Segurança",
      value: "Desde a Concepção",
      color: "from-green-400 to-emerald-400",
    },
  ],
  stats: [
    { number: "50+", label: "Projetos Entregues", suffix: "" },
    { number: "5", label: "Anos de Experiência", suffix: "+" },
    { number: "100", label: "Satisfação do Cliente", suffix: "%" },
    { number: "24/7", label: "Suporte Técnico", suffix: "" },
  ],
};

export const About = () => {
  return (
    <section id="about" className={styles.aboutSection}>
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
              strokeWidth={1}
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
            JORNADA TECH & VISÃO
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className={styles.title}>
              MAIS DO QUE CÓDIGO,{" "}
              <span className={styles.titleGradient}>UMA VISÃO</span>
            </h1>
            <p className={styles.subtitle}>
              Conheça a mente por trás das soluções inovadoras e a paixão que
              impulsiona cada linha de código
            </p>
          </MotionDiv>
        </MotionDiv>

        {/* Stats */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className={styles.statsGrid}
        >
          {bioData.stats.map((stat, index) => (
            <MotionDiv
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              viewport={{ once: true }}
              className={styles.statCard}
            >
              <div className={styles.statNumber}>
                {stat.number}
                <span className={styles.statSuffix}>{stat.suffix}</span>
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </MotionDiv>
          ))}
        </MotionDiv>

        <div className={styles.contentGrid}>
          {/* Coluna da Esquerda */}
          <div className={styles.leftColumn}>
            {/* Foto */}
            <MotionDiv
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className={styles.photoContainer}
            >
              <div className={styles.photoWrapper}>
                <Image
                  src="/images/avatar.webp"
                  alt="Erick Reis - Full Stack Developer & Tech Leader"
                  width={288}
                  height={288}
                  className={styles.photo}
                  priority
                />
                <div className={styles.photoOverlay} />
              </div>

              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className={styles.photoBadge}
              >
                <Code className={styles.badgeIconSmall} />
                FULLSTACK
              </MotionDiv>
            </MotionDiv>

            {/* Parágrafos */}
            <div className={styles.paragraphs}>
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className={styles.paragraphCard}
              >
                <div className={styles.paragraphIndicator} />
                <p>{bioData.paragraph1}</p>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className={styles.paragraphCard}
              >
                <div
                  className={`${styles.paragraphIndicator} ${styles.indicatorRight}`}
                />
                <p>{bioData.paragraph2}</p>
              </MotionDiv>
            </div>
          </div>

          {/* Coluna da Direita */}
          <div className={styles.rightColumn}>
            {/* Card de Paixões */}
            <MotionDiv
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className={styles.passionsCard}>
                <CardHeader className={styles.cardHeader}>
                  <CardTitle className={styles.cardTitle}>
                    <Brain className={styles.cardIcon} />
                    ESPECIALIZAÇÕES
                  </CardTitle>
                  <p className={styles.cardDescription}>
                    Áreas onde minha expertise faz a diferença
                  </p>
                </CardHeader>

                <CardContent className={styles.cardContent}>
                  {bioData.passions.map((item, index) => (
                    <MotionDiv
                      key={index}
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.08 * index }}
                      viewport={{ once: true }}
                      className={styles.passionItem}
                    >
                      <div className={styles.passionIcon}>
                        <item.icon className={styles.passionIconInner} />
                      </div>
                      <div className={styles.passionContent}>
                        <p className={styles.passionTitle}>{item.text}</p>
                        <p className={styles.passionDescription}>
                          {item.description}
                        </p>
                      </div>
                    </MotionDiv>
                  ))}
                </CardContent>
              </Card>
            </MotionDiv>

            {/* Card de Destaques */}
            <MotionDiv
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className={styles.highlightsCard}>
                <CardHeader className={styles.cardHeader}>
                  <CardTitle className={styles.cardTitle}>
                    <Shield className={styles.cardIcon} />
                    COMPROMISSO
                  </CardTitle>
                  <p className={styles.cardDescription}>
                    Meu padrão de excelência em cada projeto
                  </p>
                </CardHeader>
                <CardContent className={styles.highlightsContent}>
                  {bioData.highlights.map((highlight, index) => (
                    <MotionDiv
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.08 * index }}
                      viewport={{ once: true }}
                      className={styles.highlightItem}
                    >
                      <div className={styles.highlightLeft}>
                        <div
                          className={`${styles.highlightIcon} ${highlight.color}`}
                        >
                          <highlight.icon
                            className={styles.highlightIconInner}
                          />
                        </div>
                        <span className={styles.highlightText}>
                          {highlight.text}
                        </span>
                      </div>
                      <span className={styles.highlightValue}>
                        {highlight.value}
                      </span>
                    </MotionDiv>
                  ))}
                </CardContent>
              </Card>
            </MotionDiv>
          </div>
        </div>

        {/* CTA Final */}
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
                <h3 className={styles.ctaTitle}>
                  Pronto para o próximo nível?
                </h3>
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
                <Button asChild className={styles.ctaButton}>
                  <a href="#contact">
                    <Sparkles className={styles.buttonIcon} />
                    INICIAR PROJETO
                  </a>
                </Button>
              </MotionDiv>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};
