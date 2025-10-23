"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  Heart,
  ArrowUp,
  Cpu,
  CircuitBoard,
  Rocket,
  Sparkles,
  Globe,
  Zap,
  AlertTriangle,
} from "lucide-react";

// Links atualizados com suas informações reais
const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/erickreis",
    label: "GitHub",
    color: "from-gray-400 to-white",
    hoverColor: "from-white to-gray-300",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/erick-reis",
    label: "LinkedIn",
    color: "from-blue-400 to-blue-600",
    hoverColor: "from-blue-300 to-blue-500",
  },
  {
    icon: Mail,
    href: "mailto:erickreisti@gmail.com",
    label: "Email",
    color: "from-red-400 to-red-600",
    hoverColor: "from-red-300 to-red-500",
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-slate-800/50 bg-slate-950 pt-12 lg:pt-20 pb-8 lg:pb-16 relative overflow-hidden">
      {/* Background Premium */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Partículas de Fundo - Reduzidas para mobile */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 15 + 10}s`,
            }}
          />
        ))}
      </div>

      {/* Elementos Decorativos - Apenas em desktop */}
      <div className="hidden lg:block absolute top-10 left-10 opacity-5 animate-float-slow">
        <CircuitBoard className="h-24 w-24 text-blue-400" />
      </div>
      <div
        className="hidden lg:block absolute bottom-10 right-10 opacity-5 animate-float-slow"
        style={{ animationDelay: "3s" }}
      >
        <Cpu className="h-24 w-24 text-cyan-400" />
      </div>
      <div
        className="hidden lg:block absolute top-20 right-20 opacity-5 animate-float-slow"
        style={{ animationDelay: "6s" }}
      >
        <Globe className="h-20 w-20 text-purple-400" />
      </div>

      {/* BURACO NEGRO - REDUZIDO PARA MOBILE */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 lg:w-96 lg:h-96">
        {/* Anel externo giratório */}
        <div className="absolute inset-0 rounded-full border-2 lg:border-4 border-transparent bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 animate-spin-slow">
          <div
            className="absolute inset-3 lg:inset-6 rounded-full border lg:border-2 border-blue-400/40 animate-spin-slow"
            style={{ animationDirection: "reverse", animationDuration: "6s" }}
          />
        </div>

        {/* Vortex central */}
        <div className="absolute inset-6 lg:inset-12 rounded-full bg-gradient-to-br from-slate-900 via-slate-950 to-black shadow-2xl animate-pulse-slow">
          {/* Efeito de profundidade */}
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse"
            style={{ animationDuration: "3s" }}
          />

          {/* Textos orbitais - OTIMIZADOS PARA MOBILE */}
          <div
            className="absolute inset-0 animate-spin-slow"
            style={{ animationDuration: "12s" }}
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center space-x-1 lg:space-x-2 bg-red-900/80 backdrop-blur-sm px-2 lg:px-4 py-1 lg:py-2 rounded-full border border-red-500/60 shadow-lg shadow-red-500/30">
                <AlertTriangle className="h-3 w-3 lg:h-4 lg:w-4 text-red-400 animate-pulse" />
                <span className="text-xs lg:text-sm font-mono font-black text-red-300 whitespace-nowrap animate-pulse">
                  ⚠️ PERIGO! ⚠️
                </span>
                <AlertTriangle className="h-3 w-3 lg:h-4 lg:w-4 text-red-400 animate-pulse" />
              </div>
            </div>
            <div className="absolute top-10 -right-1/4 transform -translate-x-1/2 translate-y-1/2">
              <span className="text-xs lg:text-sm font-mono font-bold text-purple-400 whitespace-nowrap bg-purple-900/50 px-2 lg:px-3 py-1 rounded-full">
                🚀 INFINITO! 🚀
              </span>
            </div>
          </div>

          {/* Partículas sendo sugadas - REDUZIDAS */}
          <div className="absolute -top-2 lg:-top-4 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 lg:w-2 lg:h-2 bg-cyan-400 rounded-full animate-black-hole-suction shadow-lg shadow-cyan-400/50" />
          <div
            className="absolute -right-2 lg:-right-4 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 lg:w-2 lg:h-2 bg-blue-400 rounded-full animate-black-hole-suction shadow-lg shadow-blue-400/50"
            style={{ animationDelay: "0.3s" }}
          />
          <div
            className="absolute -bottom-2 lg:-bottom-4 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 lg:w-2 lg:h-2 bg-purple-400 rounded-full animate-black-hole-suction shadow-lg shadow-purple-400/50"
            style={{ animationDelay: "0.6s" }}
          />
        </div>

        {/* Anéis concêntricos - REDUZIDOS */}
        <div
          className="absolute inset-3 lg:inset-6 rounded-full border border-cyan-400/30 animate-pulse-slow"
          style={{ animationDuration: "2s" }}
        />
        <div
          className="absolute inset-8 lg:inset-16 rounded-full border border-purple-400/30 animate-pulse-slow"
          style={{ animationDuration: "4s", animationDelay: "0.5s" }}
        />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Conteúdo Principal - MELHOR ORGANIZAÇÃO MOBILE */}
        <div className="flex flex-col items-center justify-between lg:flex-row mb-12 lg:mb-16">
          {/* Logo/Nome - OTIMIZADO MOBILE */}
          <Link
            href="#hero"
            className="group flex items-center space-x-3 lg:space-x-4 mb-6 lg:mb-0"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            <div className="relative">
              <div className="h-16 w-16 lg:h-20 lg:w-20 rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 overflow-hidden shadow-2xl">
                <Image
                  src="/images/hashblue.svg"
                  alt="Erick Reis - Full Stack Developer"
                  width={64}
                  height={64}
                  className="h-14 w-14 lg:h-18 lg:w-18 object-contain group-hover:scale-110 transition-transform duration-500 filter brightness-125"
                />
              </div>

              {/* Efeitos de brilho */}
              <div className="absolute inset-0 rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-cyan-500/10 rounded-xl lg:rounded-2xl" />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-heading font-black text-white group-hover:text-blue-300 transition-colors duration-300 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Erick Reis
              </span>
              <span className="text-xs lg:text-sm text-slate-400 font-mono tracking-widest group-hover:text-slate-300 transition-colors duration-300">
                FULLSTACK DEV
              </span>
              <div className="flex items-center space-x-1 lg:space-x-2 mt-1">
                <Zap className="h-2.5 w-2.5 lg:h-3 lg:w-3 text-amber-400 animate-pulse" />
                <span className="text-xs text-slate-500 font-mono">
                  DISPONÍVEL
                </span>
              </div>
            </div>
          </Link>

          {/* Links Sociais - MELHOR ESPAÇAMENTO MOBILE */}
          <div className="flex space-x-3 lg:space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="group relative flex items-center justify-center h-12 w-12 lg:h-14 lg:w-14 rounded-xl lg:rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-blue-400/20 text-slate-300 transition-all duration-500 hover:bg-blue-500/10 hover:border-blue-400/40 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/20 hover:text-white"
              >
                <link.icon
                  className={`h-5 w-5 lg:h-6 lg:w-6 transition-transform duration-300 group-hover:scale-110`}
                  style={{
                    background: `linear-gradient(to right, ${
                      link.color.split(" ")[1]
                    }, ${link.color.split(" ")[3]})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                />

                {/* Tooltip apenas em desktop */}
                <div className="hidden lg:block absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-900/90 backdrop-blur-sm text-white text-xs font-mono font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {link.label}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-slate-900/90 rotate-45" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Divisor Animado */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 via-50% to-transparent mb-6 lg:mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>

        {/* Informações e Ações - LAYOUT MOBILE MELHORADO */}
        <div className="flex flex-col items-center space-y-6 lg:space-y-0 lg:flex-row lg:justify-between">
          {/* Direitos Autorais - CENTRALIZADO MOBILE */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <p className="text-slate-400 text-sm font-mono font-bold tracking-wide flex flex-col lg:flex-row items-center space-y-1 lg:space-y-0 lg:space-x-2">
              <span>© {currentYear} ERICK REIS</span>
              <span className="hidden lg:inline text-blue-400">•</span>
              <span>TODOS OS DIREITOS</span>
            </p>
            <p className="text-slate-500 text-xs font-mono mt-2 hidden lg:block">
              CÓDIGO FEITO COM 💙 E TECNOLOGIA DE PONTA
            </p>
          </div>

          {/* Créditos Tech - REDUZIDO MOBILE */}
          <div className="flex items-center space-x-2 lg:space-x-3 text-slate-400 text-sm font-mono font-bold tracking-wide group cursor-pointer order-1 lg:order-2">
            <div className="flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-lg lg:rounded-xl bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 hover:border-blue-400/30 transition-all duration-300 hover:scale-105">
              <Rocket className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="hidden sm:inline">DESENVOLVIDO</span>
              <Heart className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-red-500 fill-current animate-pulse" />
              <span className="text-blue-400 font-heading font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent text-xs lg:text-sm">
                ERICK
              </span>
            </div>
          </div>

          {/* Botão Voltar ao Topo - COMPACTO MOBILE */}
          <button
            onClick={scrollToTop}
            className="group relative text-slate-400 hover:text-white transition-all duration-300 text-xs lg:text-sm font-mono font-bold tracking-wide flex items-center space-x-2 lg:space-x-3 px-4 lg:px-5 py-2.5 lg:py-3 rounded-lg lg:rounded-xl bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 hover:border-blue-400/30 hover:bg-blue-500/10 hover:scale-105 rocket-button order-3"
          >
            <div className="flex items-center space-x-1 lg:space-x-2">
              <Rocket className="h-3.5 w-3.5 lg:h-4 lg:w-4 group-hover:animate-rocket-launch transition-transform duration-200" />
              <span className="hidden sm:inline">VOLTAR AO TOPO</span>
              <span className="sm:hidden">TOPO</span>
            </div>
          </button>
        </div>

        {/* Mensagem Final - COMPACTA MOBILE */}
        <div className="mt-8 lg:mt-12 text-center">
          <div className="inline-flex items-center space-x-2 lg:space-x-4 bg-slate-900/40 backdrop-blur-xl px-4 lg:px-6 py-3 lg:py-4 rounded-xl lg:rounded-2xl border border-slate-700/50 hover:border-blue-400/30 transition-all duration-500 group cursor-pointer">
            <Sparkles className="h-4 w-4 lg:h-5 lg:w-5 text-blue-400 animate-pulse group-hover:scale-110 transition-transform duration-300" />
            <p className="text-slate-400 text-xs lg:text-sm font-mono font-bold tracking-widest group-hover:text-slate-300 transition-colors duration-300">
              PRONTO PARA DESAFIOS! 🚀
            </p>
          </div>
        </div>

        {/* Assinatura Tech - COMPACTA MOBILE */}
        <div className="mt-6 lg:mt-8 text-center">
          <p className="text-slate-600 text-xs font-mono px-2">
            {"</>"} COM 💙 POR ERICK REIS • NEXT.JS • TS • TAILWIND
          </p>
        </div>
      </div>
    </footer>
  );
};
