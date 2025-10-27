"use client";

import { Download, Mail, Cpu, ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import MotionDiv from "@/components/ui/MotionDiv";
import styles from "./Hero.module.css";

export const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="hero" className={styles.heroSection}>
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
            DESENVOLVIDO POR ÉRICK REIS
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className={styles.title}>
              IDEIAS{" "}
              <span className={styles.titleGradient}>EXTRAORDINÁRIAS</span>
              <br />
              CÓDIGO <span className={styles.titleGradient}>EXCEPCIONAL</span>
            </h1>
            <p className={styles.subtitle}>
              Transformo visões ambiciosas em soluções digitais com tecnologia
              de ponta e código impecável
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
          {[
            { number: "50+", label: "Projetos Entregues", suffix: "" },
            { number: "5", label: "Anos de Experiência", suffix: "+" },
            { number: "100", label: "Satisfação do Cliente", suffix: "%" },
            { number: "24/7", label: "Suporte Técnico", suffix: "" },
          ].map((stat, index) => (
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

        {/* CTAs */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className={styles.ctaSection}
        >
          <div className={styles.ctaButtons}>
            <MotionDiv
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Button asChild className={styles.ctaPrimary}>
                <a href="#contact">
                  <Mail className={styles.buttonIcon} />
                  INICIAR PROJETO
                </a>
              </Button>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button asChild className={styles.ctaSecondary}>
                <a href="/docs/curriculo-erick-reis.pdf" download>
                  <Download className={styles.buttonIcon} />
                  BAIXAR CV
                </a>
              </Button>
            </MotionDiv>
          </div>
        </MotionDiv>

        {/* Scroll Indicator */}
        <MotionDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className={styles.scrollIndicator}
        >
          <button
            onClick={() => scrollToSection("about")}
            className={styles.scrollButton}
            aria-label="Scroll para a próxima seção"
          >
            <div className={styles.scrollContent}>
              <span className={styles.scrollText}>EXPLORAR</span>
              <div className={styles.scrollAnimation}>
                <div className={styles.scrollCircle}>
                  <ArrowDown className={styles.scrollArrow} />
                </div>
                <div className={styles.scrollLine} />
              </div>
            </div>
          </button>
        </MotionDiv>
      </div>
    </section>
  );
};
