// components/layout/Footer/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Instagram, Heart, Rocket, Sparkles } from "lucide-react";
import styles from "./Footer.module.css";

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
  </svg>
);

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/erickreisti",
    label: "GitHub",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/ereislimati/",
    label: "Instagram",
  },
  {
    icon: XIcon,
    href: "https://x.com/ereislima",
    label: "X",
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
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
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.decorationIcon}
            aria-hidden="true"
          >
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M11 9h4a2 2 0 0 0 2-2V3"></path>
            <circle cx="9" cy="9" r="2"></circle>
            <path d="M7 21v-4a2 2 0 0 1 2-2h4"></path>
            <circle cx="15" cy="15" r="2"></circle>
          </svg>
        </div>
        <div className={styles.decoration2}>
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
      </div>

      <div className={styles.container}>
        {/* Conteúdo Principal */}
        <div className={styles.mainContent}>
          {/* Logo/Nome */}
          <Link
            href="#hero"
            className={styles.logoLink}
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            <div className={styles.logoContainer}>
              <div className={styles.logoImageWrapper}>
                <Image
                  src="/images/hashblue.svg"
                  alt="Erick Reis - Full Stack Developer"
                  width={64}
                  height={64}
                  className={styles.logoImage}
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
              <div className={styles.logoText}>
                <span className={styles.logoName}>Érick Reis</span>
                <span className={styles.logoTitle}>FULLSTACK DEV</span>
              </div>
            </div>
          </Link>

          {/* Links Sociais */}
          <div className={styles.socialLinks}>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className={styles.socialLink}
              >
                <link.icon className={styles.socialIcon} />
                <div className={styles.socialTooltip}>{link.label}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Divisor */}
        <div className={styles.divider} />

        {/* Informações */}
        <div className={styles.infoContent}>
          {/* Direitos Autorais */}
          <div className={styles.copyright}>
            <p className={styles.copyrightText}>
              <span>© {currentYear} ÉRICK REIS</span>
              <span className={styles.copyrightSeparator}>•</span>
              <span>TODOS OS DIREITOS</span>
            </p>
          </div>

          {/* Créditos Tech */}
          <div className={styles.techCredits}>
            <div className={styles.creditsBadge}>
              <Rocket className={styles.creditsIcon} />
              <span className={styles.creditsText}>DESENVOLVIDO</span>
              <Heart className={styles.heartIcon} />
              <span className={styles.nameHighlight}>ÉRICK</span>
            </div>
          </div>

          {/* Botão Voltar ao Topo */}
          <button onClick={scrollToTop} className={styles.scrollToTopButton}>
            <div className={styles.scrollToTopContent}>
              <Rocket className={styles.scrollToTopIcon} />
              <span className={styles.scrollToTopText}>VOLTAR AO TOPO</span>
            </div>
          </button>
        </div>

        {/* Mensagem Final */}
        <div className={styles.finalMessage}>
          <div className={styles.messageBadge}>
            <Sparkles className={styles.messageIcon} />
            <p className={styles.messageText}>PRONTO PARA DESAFIOS! 🚀</p>
          </div>
        </div>

        {/* Assinatura Tech */}
        <div className={styles.techSignature}>
          <p className={styles.signatureText}>
            {"</>"} COM 💙 POR ERICK REIS • NEXT.JS • TS • TAILWIND
          </p>
        </div>
      </div>
    </footer>
  );
};
