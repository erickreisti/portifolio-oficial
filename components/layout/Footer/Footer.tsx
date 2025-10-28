// components/layout/Footer.tsx (CORRIGIDO)
"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Instagram, Heart, Rocket, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
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
    color: "hover:text-white",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/ereislimati/",
    label: "Instagram",
    color: "hover:text-pink-400",
  },
  {
    icon: XIcon,
    href: "https://x.com/ereislima",
    label: "X",
    color: "hover:text-white",
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative min-h-[400px] bg-gray-950 border-t border-gray-800/50 overflow-hidden">
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

      {/* Elementos Neon Flutuantes - APENAS 2 AGORA */}
      <div className="absolute inset-0 pointer-events-none">
        {[Rocket, Sparkles].map((Icon, index) => (
          <motion.div
            key={index}
            className={`absolute ${styles.neonGlow} ${
              index === 0 ? "top-20 left-20" : "top-32 right-24"
            }`}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 6 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 2,
            }}
          >
            <Icon
              className={`
              ${
                index === 0
                  ? "text-cyan-400 text-3xl"
                  : "text-purple-400 text-3xl"
              }
            `}
            />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Conteúdo Principal */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0 mb-12 lg:mb-16">
          {/* Logo/Nome */}
          <Link
            href="#hero"
            className="group flex items-center gap-3 transition-all duration-300 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="h-16 w-16 lg:h-20 lg:w-20 rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-blue-400/30 flex items-center justify-center overflow-hidden group-hover:border-blue-400/60 transition-all duration-500"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Image
                  src="/images/hashblue.svg"
                  alt="Erick Reis - Full Stack Developer"
                  width={64}
                  height={64}
                  className="h-14 w-14 lg:h-16 lg:w-16 object-contain filter brightness-125 group-hover:brightness-150 transition-all duration-500"
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-black bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent group-hover:from-blue-200 group-hover:to-cyan-200 transition-all duration-300">
                  Érick Reis
                </span>
                <span className="text-xs font-mono text-gray-400 group-hover:text-gray-300 transition-colors duration-300 tracking-wider">
                  FULLSTACK DEV
                </span>
              </div>
            </div>
          </Link>

          {/* Links Sociais */}
          <div className="flex gap-3 lg:gap-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="relative h-12 w-12 lg:h-14 lg:w-14 rounded-xl bg-gray-900/60 backdrop-blur-xl border border-blue-400/30 text-gray-400 flex items-center justify-center transition-all duration-500 hover:bg-blue-400/10 hover:border-blue-400/60 hover:scale-110 hover:shadow-2xl hover:shadow-blue-400/20 group"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <link.icon
                  className={`w-5 h-5 lg:w-6 lg:h-6 transition-colors duration-300 ${link.color}`}
                />
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-xl text-white text-xs font-mono font-bold px-2 py-1 rounded border border-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                  {link.label}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900/90 rotate-45 border-b border-r border-gray-700/50" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divisor */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent mb-8 lg:mb-12" />

        {/* Informações */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Direitos Autorais */}
          <motion.div
            className="order-2 lg:order-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 text-sm font-mono font-bold tracking-wider flex flex-col lg:flex-row items-center gap-1 lg:gap-2">
              <span>© {currentYear} ÉRICK REIS</span>
              <span className="text-blue-400 hidden lg:inline">•</span>
              <span>TODOS OS DIREITOS</span>
            </p>
          </motion.div>

          {/* Créditos Tech */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 hover:border-blue-400/30 transition-all duration-300 cursor-pointer">
              <Rocket className="w-4 h-4 text-blue-400" />
              <span className="text-gray-400 text-xs font-mono font-bold tracking-wider">
                DESENVOLVIDO
              </span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-blue-400 font-semibold text-xs bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                ÉRICK
              </span>
            </div>
          </motion.div>

          {/* Botão Voltar ao Topo */}
          <motion.button
            onClick={scrollToTop}
            className="order-3 text-gray-400 text-xs font-mono font-bold tracking-wider flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 transition-all duration-300 hover:border-blue-400/30 hover:bg-blue-400/10 hover:text-gray-300 group"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Rocket className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" />
            <span className="hidden sm:inline">VOLTAR AO TOPO</span>
          </motion.button>
        </div>

        {/* Mensagem Final */}
        <motion.div
          className="mt-8 lg:mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-gray-900/40 backdrop-blur-xl px-6 py-3 rounded-2xl border border-gray-700/50 transition-all duration-300 hover:border-blue-400/30 hover:scale-105 group cursor-pointer">
            <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400 group-hover:text-cyan-400 transition-colors duration-300" />
            <p className="text-gray-400 text-xs lg:text-sm font-mono font-bold tracking-wider group-hover:text-gray-300 transition-colors duration-300">
              PRONTO PARA DESAFIOS! 🚀
            </p>
          </div>
        </motion.div>

        {/* Assinatura Tech */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 text-xs font-mono px-2">
            {"</>"} COM 💙 POR ERICK REIS • NEXT.JS • TS • TAILWIND
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
