"use client";

import Link from "next/link";
import {
  Github,
  Instagram,
  Heart,
  Rocket,
  Sparkles,
  Code2,
  Cpu,
  MessageCircle,
  Mail,
  MapPin,
  Home,
  User,
  Code,
  Briefcase,
  ExternalLink,
  ArrowUp,
} from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useRef, useMemo } from "react";
import { PremiumBackground } from "@/components/layout/PremiumBackground";
import { LazyComponent } from "@/components/optimization/LazyComponent";
import { OptimizedImage } from "@/components/optimization/OptimizedImage";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import LazyBackground from "@/components/optimization/LazyBackground";
import { NeonElements } from "@/components/layout/NeonElements";
import { COLORS } from "@/lib/colors";
import { AnimatedActionButton } from "@/components/ui/AnimatedActionButton";

interface SocialLink {
  icon: React.ComponentType<any>;
  href: string;
  label: string;
}

const SOCIAL_LINKS: SocialLink[] = [
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
    icon: () => (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
      </svg>
    ),
    href: "https://x.com/ereislima",
    label: "X",
  },
];

// MESMOS ÍCONES DO HEADER
const QUICK_LINKS = [
  { label: "Início", href: "#hero", icon: Home },
  { label: "Sobre", href: "#about", icon: User },
  { label: "Habilidades", href: "#skills", icon: Code },
  { label: "Projetos", href: "#projects", icon: Briefcase },
  { label: "Contato", href: "#contact", icon: MessageCircle },
];

const SocialLink = ({ link, index }: { link: SocialLink; index: number }) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(linkRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView || !linkRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        linkRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }, linkRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <LazyComponent animation="scale" delay={index * 100}>
      <motion.a
        ref={linkRef}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
        whileHover={{ y: -3, scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: index * 0.1,
        }}
        viewport={{ once: true }}
      >
        <div
          className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl ${COLORS.classes.background.card} border ${COLORS.borders.medium} flex items-center justify-center transition-all duration-500 group-hover:from-cyan-900/30 group-hover:to-blue-900/30 group-hover:border-cyan-400/50 group-hover:shadow-lg sm:group-hover:shadow-2xl group-hover:shadow-cyan-500/20`}
        >
          <link.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
        </div>

        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-cyan-500/20 rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <span className="text-white text-xs font-semibold whitespace-nowrap">
            {link.label}
          </span>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 border-b border-r border-cyan-500/20 rotate-45" />
        </div>
      </motion.a>
    </LazyComponent>
  );
};

const QuickLink = ({
  link,
  index,
}: {
  link: (typeof QUICK_LINKS)[0];
  index: number;
}) => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <LazyComponent animation="fadeUp" delay={index * 100}>
      <motion.button
        onClick={() => scrollToSection(link.href)}
        className={`group flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl ${COLORS.classes.background.card} border ${COLORS.borders.medium} hover:border-cyan-400/50 transition-all duration-300 w-full text-left hover:bg-gradient-to-r hover:from-cyan-500/5 hover:to-blue-500/5`}
        whileHover={{ x: 3, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 group-hover:border-cyan-400/50 transition-all duration-300 flex-shrink-0">
          <link.icon className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="flex-1 min-w-0">
          <span
            className={`${COLORS.classes.text.primary} text-sm font-semibold group-hover:text-cyan-300 transition-colors duration-300 block truncate`}
          >
            {link.label}
          </span>
          <span className="text-gray-500 text-xs group-hover:text-cyan-400/80 transition-colors duration-300">
            Navegar para seção
          </span>
        </div>
        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300 flex-shrink-0" />
      </motion.button>
    </LazyComponent>
  );
};

const LogoArea = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(logoRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView || !logoRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }, logoRef);

    return () => ctx.revert();
  }, [isInView]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <LazyComponent animation="fadeUp" delay={200}>
      <motion.div
        ref={logoRef}
        className="flex flex-col items-center mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <button onClick={scrollToTop} className="group relative">
          <div
            className={`flex items-center gap-2 sm:gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl ${COLORS.classes.background.card} border ${COLORS.borders.medium} hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 shadow-lg sm:shadow-2xl shadow-cyan-400/10 hover:shadow-cyan-400/20`}
          >
            <div className="relative">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="rounded-lg sm:rounded-xl overflow-hidden"
              >
                <OptimizedImage
                  src="/images/hashblue.svg"
                  alt="Erick Reis"
                  width={40}
                  height={40}
                  priority={true}
                  className="brightness-125 group-hover:brightness-150 transition-all duration-500 w-10 h-10 sm:w-12 sm:h-12"
                />
              </motion.div>
              <div className="absolute -inset-1 sm:-inset-2 bg-cyan-500/10 rounded-lg sm:rounded-xl blur-xl group-hover:bg-cyan-500/20 transition-all duration-500" />
            </div>

            <div className="text-left">
              <h3
                className={`text-xl sm:text-2xl font-black ${COLORS.classes.text.gradient} group-hover:from-cyan-300 group-hover:to-blue-300 transition-all duration-500`}
              >
                ÉRICK REIS
              </h3>
              <p className="text-xs font-mono text-gray-400 group-hover:text-cyan-300 tracking-widest bg-gray-800/50 px-2 py-1 rounded mt-1">
                FULLSTACK ENGINEER
              </p>
            </div>
          </div>
        </button>
      </motion.div>
    </LazyComponent>
  );
};

const SocialLinksGrid = () => (
  <LazyComponent animation="fadeUp" delay={300}>
    <motion.div
      className="text-center mb-8 sm:mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3
        className={`${COLORS.classes.text.primary} text-lg sm:text-xl font-bold mb-4 sm:mb-6`}
      >
        CONECTE-SE COMIGO
      </h3>
      <div className="flex justify-center gap-4 sm:gap-6">
        {SOCIAL_LINKS.map((link, index) => (
          <SocialLink key={link.label} link={link} index={index} />
        ))}
      </div>
    </motion.div>
  </LazyComponent>
);

const QuickLinksGrid = () => (
  <LazyComponent animation="fadeUp" delay={400}>
    <motion.div
      className="mb-8 sm:mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-6 sm:mb-8">
        <h3
          className={`${COLORS.classes.text.primary} text-lg sm:text-xl font-bold mb-1 sm:mb-2`}
        >
          NAVEGAÇÃO RÁPIDA
        </h3>
        <p className={`${COLORS.classes.text.tertiary} text-xs sm:text-sm`}>
          Acesse rapidamente as principais seções do portfólio
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 max-w-4xl mx-auto">
        {QUICK_LINKS.map((link, index) => (
          <QuickLink key={link.href} link={link} index={index} />
        ))}
      </div>
    </motion.div>
  </LazyComponent>
);

const TechBadge = () => (
  <LazyComponent animation="scale" delay={500}>
    <motion.div
      className="flex justify-center mb-6 sm:mb-8"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <div
        className={`flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl ${COLORS.classes.background.card} border ${COLORS.borders.medium} hover:border-cyan-400/50 transition-all duration-500 group cursor-pointer`}
      >
        <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
        <span
          className={`${COLORS.classes.text.secondary} text-xs sm:text-sm font-mono font-bold tracking-wider`}
        >
          ENGINEERED WITH
        </span>
        <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 animate-pulse" />
        <span
          className={`${COLORS.classes.text.accent} font-bold text-xs sm:text-sm`}
        >
          BY ÉRICK
        </span>
      </div>
    </motion.div>
  </LazyComponent>
);

const FooterInfo = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <LazyComponent animation="fadeUp" delay={600}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-center">
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p
            className={`${COLORS.classes.text.tertiary} font-mono text-xs sm:text-sm`}
          >
            © {currentYear} ÉRICK REIS
          </p>
          <p className="text-gray-500 text-xs mt-1">
            DESENVOLVIDO COM TECNOLOGIA DE PONTA
          </p>
        </motion.div>

        <TechBadge />

        <motion.div
          className="text-center lg:text-right"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <AnimatedActionButton
            title="VOLTAR AO TOPO"
            subtitle="BACK TO ORBIT"
            icon={ArrowUp}
            size="sm"
            onClick={scrollToTop}
            className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30 hover:border-cyan-400/50 text-xs sm:text-sm"
            showArrow={false}
          />
        </motion.div>
      </div>
    </LazyComponent>
  );
};

const ContactInfoMini = () => (
  <LazyComponent animation="fadeUp" delay={500}>
    <motion.div
      className="mb-8 sm:mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-6 sm:mb-8">
        <h3
          className={`${COLORS.classes.text.primary} text-lg sm:text-xl font-bold mb-1 sm:mb-2`}
        >
          CONTATO RÁPIDO
        </h3>
        <p className={`${COLORS.classes.text.tertiary} text-xs sm:text-sm`}>
          Pronto para iniciar seu próximo projeto
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 text-sm">
        <div
          className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl ${COLORS.classes.background.card} border ${COLORS.borders.medium} hover:border-cyan-400/50 transition-all duration-300`}
        >
          <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
          <div className="text-left">
            <p
              className={`${COLORS.classes.text.primary} font-semibold text-sm`}
            >
              Email
            </p>
            <p
              className={`${COLORS.classes.text.secondary} text-xs sm:text-sm`}
            >
              erickreisti@gmail.com
            </p>
          </div>
        </div>
        <div
          className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl ${COLORS.classes.background.card} border ${COLORS.borders.medium} hover:border-cyan-400/50 transition-all duration-300`}
        >
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
          <div className="text-left">
            <p
              className={`${COLORS.classes.text.primary} font-semibold text-sm`}
            >
              Localização
            </p>
            <p
              className={`${COLORS.classes.text.secondary} text-xs sm:text-sm`}
            >
              Rio de Janeiro, Brasil
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  </LazyComponent>
);

const PremiumDivider = () => (
  <LazyComponent animation="fadeIn" delay={350}>
    <div className="relative my-8 sm:my-12">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-400 animate-pulse" />
      </div>
    </div>
  </LazyComponent>
);

const CallToAction = () => (
  <LazyComponent animation="fadeUp" delay={700}>
    <motion.div
      className="text-center mb-8 sm:mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div
        className={`${COLORS.classes.card} p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-cyan-400/20`}
      >
        <h3
          className={`${COLORS.classes.text.primary} text-xl sm:text-2xl font-black mb-3 sm:mb-4`}
        >
          PRONTO PARA INICIAR SEU PROJETO?
        </h3>
        <p
          className={`${COLORS.classes.text.secondary} text-sm sm:text-lg mb-4 sm:mb-6 max-w-2xl mx-auto`}
        >
          Vamos transformar suas ideias em soluções digitais extraordinárias
        </p>
        <AnimatedActionButton
          title="INICIAR PROJETO"
          subtitle="VAMOS CONVERSAR"
          icon={Rocket}
          size="lg"
          onClick={() => {
            const contactSection = document.getElementById("contact");
            contactSection?.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400/50 hover:border-cyan-300/70 mx-auto w-full sm:w-auto"
          showArrow={true}
        />
      </div>
    </motion.div>
  </LazyComponent>
);

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  usePerformanceMonitor("Footer");

  useEffect(() => {
    if (!isInView || shouldReduceMotion || !footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );
    }, footerRef);

    return () => ctx.revert();
  }, [isInView, shouldReduceMotion]);

  return (
    <footer
      ref={footerRef}
      className={`relative min-h-screen ${COLORS.classes.background.section} border-t ${COLORS.borders.medium} overflow-hidden`}
    >
      <LazyBackground priority="low">
        <PremiumBackground intensity="soft">
          <NeonElements />
        </PremiumBackground>
      </LazyBackground>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <LogoArea />
        <CallToAction />
        <ContactInfoMini />
        <SocialLinksGrid />
        <QuickLinksGrid />
        <PremiumDivider />
        <FooterInfo />
      </div>
    </footer>
  );
};

export default Footer;
