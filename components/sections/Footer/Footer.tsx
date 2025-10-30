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
  Zap,
  MessageCircle,
  Mail,
  MapPin,
} from "lucide-react";
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useRef, useMemo, useCallback } from "react";
import { PremiumBackground } from "@/components/layout/PremiumBackground";
import { LazyComponent } from "@/components/optimization/LazyComponent";
import { OptimizedImage } from "@/components/optimization/OptimizedImage";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import LazyBackground from "@/components/optimization/LazyBackground";

// Interfaces para tipagem
interface SocialLink {
  icon: React.ComponentType<any>;
  href: string;
  label: string;
  color: string;
}

interface FloatingElement {
  Icon: React.ComponentType<any>;
  position: string;
  color: string;
  size: string;
}

// Configurações estáticas
const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: Github,
    href: "https://github.com/erickreisti",
    label: "GitHub",
    color: "hover:text-cyan-400",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/ereislimati/",
    label: "Instagram",
    color: "hover:text-cyan-400",
  },
  {
    icon: () => (
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
      </svg>
    ),
    href: "https://x.com/ereislima",
    label: "X",
    color: "hover:text-cyan-400",
  },
];

const FLOATING_ELEMENTS: FloatingElement[] = [
  {
    Icon: Rocket,
    position: "top-20 left-20",
    color: "text-cyan-400",
    size: "text-3xl",
  },
  {
    Icon: Sparkles,
    position: "top-32 right-24",
    color: "text-cyan-400",
    size: "text-3xl",
  },
  {
    Icon: Code2,
    position: "bottom-40 left-24",
    color: "text-cyan-400",
    size: "text-2xl",
  },
  {
    Icon: Cpu,
    position: "bottom-32 right-20",
    color: "text-cyan-400",
    size: "text-2xl",
  },
  {
    Icon: MessageCircle,
    position: "top-1/3 left-1/4",
    color: "text-cyan-400",
    size: "text-xl",
  },
  {
    Icon: Mail,
    position: "bottom-1/3 right-1/4",
    color: "text-cyan-400",
    size: "text-xl",
  },
];

const QUICK_LINKS = [
  { label: "Início", href: "#hero", icon: Rocket },
  { label: "Projetos", href: "#projects", icon: Code2 },
  { label: "Sobre", href: "#about", icon: Cpu },
  { label: "Contato", href: "#contact", icon: MessageCircle },
];

// Hook personalizado para animações GSAP
const useGSAPAnimation = (
  ref: React.RefObject<HTMLElement>,
  isInView: boolean
) => {
  useEffect(() => {
    if (!isInView || !ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [isInView, ref]);
};

// Componente Floating Element Otimizado
const FloatingElement = ({
  Icon,
  position,
  color,
  size,
  index,
}: {
  Icon: React.ComponentType<any>;
  position: string;
  color: string;
  size: string;
  index: number;
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(elementRef, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView || shouldReduceMotion || !elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementRef.current,
        { opacity: 0, scale: 0, y: 100, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 1.5,
          ease: "back.out(1.7)",
          delay: index * 0.2,
        }
      );

      gsap.to(elementRef.current, {
        y: -15,
        rotation: 5,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.3,
      });
    });

    return () => ctx.revert();
  }, [isInView, index, shouldReduceMotion]);

  return (
    <LazyComponent animation="fadeIn" delay={index * 100}>
      <div
        ref={elementRef}
        className={`absolute ${position} pointer-events-none`}
      >
        <Icon className={`${color} ${size} opacity-70`} />
      </div>
    </LazyComponent>
  );
};

// Componente Social Link Otimizado
const SocialLink = ({ link, index }: { link: SocialLink; index: number }) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(linkRef, { once: true, amount: 0.5 });

  useGSAPAnimation(linkRef as React.RefObject<HTMLElement>, isInView);

  return (
    <LazyComponent key={link.label} animation="scale" delay={index * 100}>
      <motion.a
        ref={linkRef}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
        whileHover={{ y: -5, scale: 1.1 }}
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
        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500/20 flex items-center justify-center transition-all duration-500 group-hover:from-cyan-900/30 group-hover:to-blue-900/30 group-hover:border-cyan-400/50 group-hover:shadow-2xl group-hover:shadow-cyan-500/20">
          <link.icon className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
        </div>

        {/* Tooltip elegante */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-cyan-500/20 rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <span className="text-white text-sm font-semibold whitespace-nowrap">
            {link.label}
          </span>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 border-b border-r border-cyan-500/20 rotate-45" />
        </div>
      </motion.a>
    </LazyComponent>
  );
};

// Componente Quick Link Otimizado
const QuickLink = ({
  link,
  index,
}: {
  link: (typeof QUICK_LINKS)[0];
  index: number;
}) => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <LazyComponent animation="fadeUp" delay={index * 100}>
      <motion.button
        onClick={() => scrollToSection(link.href)}
        className="group flex items-center gap-3 p-3 rounded-xl bg-gray-900/40 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 w-full text-left"
        whileHover={{ x: 5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <link.icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
        <span className="text-gray-300 text-sm font-semibold group-hover:text-cyan-300 transition-colors duration-300">
          {link.label}
        </span>
      </motion.button>
    </LazyComponent>
  );
};

// Componente Logo Area Otimizado
const LogoArea = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(logoRef, { once: true, amount: 0.3 });

  useGSAPAnimation(logoRef, isInView);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <LazyComponent animation="fadeUp" delay={200}>
      <motion.div
        ref={logoRef}
        className="flex flex-col items-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <button onClick={scrollToTop} className="group relative">
          <div className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 shadow-2xl shadow-cyan-400/10 hover:shadow-cyan-400/20">
            <div className="relative">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="rounded-xl overflow-hidden"
              >
                <OptimizedImage
                  src="/images/hashblue.svg"
                  alt="Erick Reis"
                  width={60}
                  height={60}
                  priority={true}
                  className="brightness-125 group-hover:brightness-150 transition-all duration-500"
                />
              </motion.div>
              <div className="absolute -inset-2 bg-cyan-500/10 rounded-xl blur-xl group-hover:bg-cyan-500/20 transition-all duration-500" />
            </div>

            <div className="text-left">
              <h3 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-blue-300 transition-all duration-500">
                ÉRICK REIS
              </h3>
              <p className="text-xs font-mono text-gray-400 group-hover:text-cyan-300 tracking-widest bg-gray-800/50 px-2 py-1 rounded">
                FULLSTACK ENGINEER
              </p>
            </div>
          </div>
        </button>
      </motion.div>
    </LazyComponent>
  );
};

// Componente Social Links Otimizado
const SocialLinksGrid = () => (
  <LazyComponent animation="fadeUp" delay={300}>
    <motion.div
      className="flex justify-center gap-6 mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {SOCIAL_LINKS.map((link, index) => (
        <SocialLink key={link.label} link={link} index={index} />
      ))}
    </motion.div>
  </LazyComponent>
);

// Componente Quick Links Grid
const QuickLinksGrid = () => (
  <LazyComponent animation="fadeUp" delay={400}>
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-white mb-2">NAVEGAÇÃO RÁPIDA</h3>
        <p className="text-gray-400 text-sm">Acesse as seções principais</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
        {QUICK_LINKS.map((link, index) => (
          <QuickLink key={link.href} link={link} index={index} />
        ))}
      </div>
    </motion.div>
  </LazyComponent>
);

// Componente Tech Badge Otimizado
const TechBadge = () => {
  const currentYear = new Date().getFullYear();

  return (
    <LazyComponent animation="scale" delay={500}>
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-500 group cursor-pointer">
          <Code2 className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-gray-300 text-sm font-mono font-bold tracking-wider">
            ENGINEERED WITH
          </span>
          <Heart className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span className="text-cyan-400 font-bold text-sm">BY ÉRICK</span>
        </div>
      </motion.div>
    </LazyComponent>
  );
};

// Componente Footer Info Otimizado
const FooterInfo = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <LazyComponent animation="fadeUp" delay={400}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Copyright */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 font-mono text-sm">
            © {currentYear} ÉRICK REIS
          </p>
          <p className="text-gray-500 text-xs mt-1">CÓDIGO & DESIGN</p>
        </motion.div>

        {/* Tech Badge Central */}
        <TechBadge />

        {/* Back to Top */}
        <motion.div
          className="text-center lg:text-right"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 mx-auto lg:ml-auto lg:mr-0"
          >
            <Rocket className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
            <span className="text-sm font-mono font-bold tracking-wider">
              BACK TO ORBIT
            </span>
          </button>
        </motion.div>
      </div>
    </LazyComponent>
  );
};

// Componente Final Signature Otimizado
const FinalSignature = () => {
  const currentYear = new Date().getFullYear();

  return (
    <LazyComponent animation="fadeUp" delay={600}>
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gray-900/40 border border-cyan-500/20">
          <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-gray-400 text-xs font-mono font-bold tracking-widest">
            READY FOR NEXT MISSION • {currentYear}
          </span>
        </div>
      </motion.div>
    </LazyComponent>
  );
};

// Componente Divisor Premium Otimizado
const PremiumDivider = () => (
  <LazyComponent animation="fadeIn" delay={350}>
    <div className="relative mb-12">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
      </div>
    </div>
  </LazyComponent>
);

// Componente Contact Info Mini
const ContactInfoMini = () => (
  <LazyComponent animation="fadeUp" delay={500}>
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-white mb-2">CONTATO RÁPIDO</h3>
        <p className="text-gray-400 text-sm">Vamos trabalhar juntos</p>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm">
        <div className="flex items-center gap-2 text-gray-300">
          <Mail className="w-4 h-4 text-cyan-400" />
          <span>erickreisti@gmail.com</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <span>Rio de Janeiro, Brasil</span>
        </div>
      </div>
    </motion.div>
  </LazyComponent>
);

// Componente Principal Footer
export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  usePerformanceMonitor("Footer");

  // Elementos flutuantes memoizados
  const neonElements = useMemo(
    () =>
      FLOATING_ELEMENTS.map((element, index) => (
        <FloatingElement key={index} {...element} index={index} />
      )),
    []
  );

  // GSAP Animations para entrada da seção
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
      className="relative min-h-[500px] bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 border-t border-cyan-500/20 overflow-hidden"
    >
      <LazyBackground priority="low">
        <PremiumBackground intensity="soft">
          {/* Elementos flutuantes com performance */}
          <div className="absolute inset-0 pointer-events-none">
            {neonElements}
          </div>
        </PremiumBackground>
      </LazyBackground>

      {/* Conteúdo Principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <LogoArea />
        <ContactInfoMini />
        <SocialLinksGrid />
        <QuickLinksGrid />
        <PremiumDivider />
        <FooterInfo />
        <FinalSignature />
      </div>
    </footer>
  );
};

export default Footer;
