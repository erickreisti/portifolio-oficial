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
} from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { PremiumBackground } from "@/components/layout/PremiumBackground";
import { LazyComponent } from "@/components/optimization/LazyComponent";
import { OptimizedImage } from "@/components/optimization/OptimizedImage";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import LazyBackground from "@/components/optimization/LazyBackground";

const XIcon = () => (
  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
  </svg>
);

// Configuração centralizada dos elementos flutuantes - memoizada
const FLOATING_ELEMENTS = [
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
    Icon: Zap,
    position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    color: "text-cyan-400",
    size: "text-2xl",
  },
] as const;

const SOCIAL_LINKS = [
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
    icon: XIcon,
    href: "https://x.com/ereislima",
    label: "X",
    color: "hover:text-cyan-400",
  },
];

// Componente Floating Element Otimizado
const FloatingElement = ({
  Icon,
  position,
  color,
  size,
  index,
}: {
  Icon: any;
  position: string;
  color: string;
  size: string;
  index: number;
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <LazyComponent animation="fadeIn" delay={index * 100}>
      <motion.div
        className={`absolute ${position} filter drop-shadow-lg`}
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -15, 0],
                rotate: index % 2 === 0 ? [0, 5, 0] : [0, -5, 0],
                scale: [1, 1.05, 1],
              }
        }
        transition={{
          duration: 8 + index,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 1.2,
        }}
      >
        <Icon
          className={`${color} ${size} opacity-60 hover:opacity-100 transition-opacity duration-300`}
        />
      </motion.div>
    </LazyComponent>
  );
};

// Componente Social Link Otimizado
const SocialLink = ({ link, index }: { link: any; index: number }) => (
  <LazyComponent key={link.label} animation="scale" delay={index * 100}>
    <motion.a
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

// Componente Logo Area Otimizado
const LogoArea = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <LazyComponent animation="fadeUp" delay={200}>
      <motion.div
        className="flex flex-col items-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Link href="#hero" onClick={scrollToTop} className="group relative">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105">
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
        </Link>
      </motion.div>
    </LazyComponent>
  );
};

// Componente Social Links Otimizado
const SocialLinksGrid = () => (
  <LazyComponent animation="fadeUp" delay={300}>
    <div className="flex justify-center gap-4 mb-12">
      {SOCIAL_LINKS.map((link, index) => (
        <SocialLink key={link.label} link={link} index={index} />
      ))}
    </div>
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

// Componente Principal Footer - OTIMIZADO
export const Footer = () => {
  const shouldReduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  usePerformanceMonitor("Footer");

  return (
    <footer className="relative min-h-[400px] bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 border-t border-cyan-500/20 overflow-hidden">
      <LazyBackground priority="low">
        <PremiumBackground intensity="soft">
          {/* Elementos flutuantes com performance */}
          <div className="absolute inset-0 pointer-events-none">
            {FLOATING_ELEMENTS.map((element, index) => (
              <FloatingElement key={index} {...element} index={index} />
            ))}
          </div>
        </PremiumBackground>
      </LazyBackground>

      {/* Conteúdo Principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <LogoArea />
        <SocialLinksGrid />
        <PremiumDivider />
        <FooterInfo />
        <FinalSignature />
      </div>
    </footer>
  );
};

export default Footer;
