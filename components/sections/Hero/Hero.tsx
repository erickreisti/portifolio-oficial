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

      {/* Elementos decorativos neon coloridos */}
      <div className={styles.decorativeElements}>
        {/* SVG 1 - Azul Neon */}
        <div className={styles.decoration1}>
          <div className={styles.codeSymbol}>&lt;/&gt;</div>
        </div>

        {/* SVG 2 - Roxo Neon */}
        <div className={styles.decoration2}>
          <div className={styles.bracketSymbol}>{`{}`}</div>
        </div>

        {/* SVG 3 - Verde Neon */}
        <div className={styles.decoration3}>
          <div className={styles.serverSymbol}>[]</div>
        </div>

        {/* SVG 4 - Ciano Neon */}
        <div className={styles.decoration4}>
          <div className={styles.binarySymbol}>01</div>
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
