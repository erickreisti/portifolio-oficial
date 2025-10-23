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
    <footer className="w-full border-t border-slate-800/50 bg-slate-950 pt-20 pb-16 relative overflow-hidden">
      {/* Background Premium */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Partículas de Fundo */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
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

      {/* Elementos Decorativos */}
      <div className="absolute top-10 left-10 opacity-5 animate-float-slow">
        <CircuitBoard className="h-24 w-24 text-blue-400" />
      </div>
      <div
        className="absolute bottom-10 right-10 opacity-5 animate-float-slow"
        style={{ animationDelay: "3s" }}
      >
        <Cpu className="h-24 w-24 text-cyan-400" />
      </div>
      <div
        className="absolute top-20 right-20 opacity-5 animate-float-slow"
        style={{ animationDelay: "6s" }}
      >
        <Globe className="h-20 w-20 text-purple-400" />
      </div>

      {/* BURACO NEGRO GIRATÓRIO */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64">
        {/* Anel externo giratório */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 animate-spin-slow">
          <div
            className="absolute inset-4 rounded-full border border-blue-400/30 animate-spin-slow"
            style={{ animationDirection: "reverse", animationDuration: "8s" }}
          />
        </div>

        {/* Vortex central */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-slate-900 via-slate-950 to-black shadow-2xl animate-pulse-slow">
          {/* Efeito de profundidade */}
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 animate-pulse"
            style={{ animationDuration: "4s" }}
          />

          {/* Textos orbitais */}
          <div
            className="absolute inset-0 animate-spin-slow"
            style={{ animationDuration: "15s" }}
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="text-xs font-mono font-bold text-blue-400 whitespace-nowrap">
                NÃO ENTRE NO BURACO NEGRO!
              </span>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <span className="text-xs font-mono font-bold text-purple-400 whitespace-nowrap">
                VIAJE COMIGO!
              </span>
            </div>
          </div>

          {/* Partículas sendo sugadas */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-black-hole-suction" />
          <div
            className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-blue-400 rounded-full animate-black-hole-suction"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-400 rounded-full animate-black-hole-suction"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-black-hole-suction"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        {/* Anéis concêntricos */}
        <div
          className="absolute inset-4 rounded-full border border-cyan-400/20 animate-pulse-slow"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute inset-10 rounded-full border border-purple-400/20 animate-pulse-slow"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Conteúdo Principal */}
        <div className="flex flex-col items-center justify-between md:flex-row mb-16">
          {/* Logo/Nome - Estilo Premium */}
          <Link
            href="#hero"
            className="group flex items-center space-x-4 mb-8 md:mb-0"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            <div className="relative">
              <div className="h-20 w-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 overflow-hidden shadow-2xl">
                <Image
                  src="/images/hashblue.svg"
                  alt="Erick Reis - Full Stack Developer"
                  width={80}
                  height={80}
                  className="h-18 w-18 object-contain group-hover:scale-110 transition-transform duration-500 filter brightness-125"
                />
              </div>

              {/* Efeitos de brilho */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-cyan-500/10 rounded-2xl" />
              </div>

              {/* Partículas orbitais */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse delay-200" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse delay-500" />
              <div className="absolute -top-2 -left-2 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse delay-700" />
            </div>

            <div className="flex flex-col">
              <span className="text-2xl font-heading font-black text-white group-hover:text-blue-300 transition-colors duration-300 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Erick Reis
              </span>
              <span className="text-sm text-slate-400 font-mono tracking-widest group-hover:text-slate-300 transition-colors duration-300">
                FULLSTACK ARCHITECT
              </span>
              <div className="flex items-center space-x-2 mt-1">
                <Zap className="h-3 w-3 text-amber-400 animate-pulse" />
                <span className="text-xs text-slate-500 font-mono">
                  DISPONÍVEL PARA NOVOS DESAFIOS
                </span>
              </div>
            </div>
          </Link>

          {/* Links Sociais - Corrigidos e Melhorados */}
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="group relative flex items-center justify-center h-14 w-14 rounded-2xl bg-slate-900/60 backdrop-blur-xl border-2 border-blue-400/20 text-slate-300 transition-all duration-500 hover:bg-blue-500/10 hover:border-blue-400/40 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/20 hover:text-white"
              >
                <link.icon
                  className={`h-6 w-6 transition-transform duration-300 group-hover:scale-110`}
                  style={{
                    background: `linear-gradient(to right, ${
                      link.color.split(" ")[1]
                    }, ${link.color.split(" ")[3]})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                />

                {/* Efeito de brilho */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                {/* Tooltip sutil */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-900/90 backdrop-blur-sm text-white text-xs font-mono font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {link.label}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-slate-900/90 rotate-45" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Divisor Animado - CORRIGIDO */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 via-50%  to-transparent mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>

        {/* Informações e Ações */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          {/* Direitos Autorais */}
          <div className="text-center md:text-left">
            <p className="text-slate-400 text-sm font-mono font-bold tracking-wide flex items-center space-x-2">
              <span>© {currentYear} ERICK REIS</span>
              <span className="text-blue-400">•</span>
              <span>TODOS OS DIREITOS RESERVADOS</span>
            </p>
            <p className="text-slate-500 text-xs font-mono mt-2">
              CÓDIGO FEITO COM 💙 E TECNOLOGIA DE PONTA
            </p>
          </div>

          {/* Créditos Tech */}
          <div className="flex items-center space-x-3 text-slate-400 text-sm font-mono font-bold tracking-wide group cursor-pointer">
            <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 hover:border-blue-400/30 transition-all duration-300 hover:scale-105">
              <Rocket className="h-4 w-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              <span>DESENVOLVIDO POR</span>
              <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
              <span className="text-blue-400 font-heading font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                ERICK REIS
              </span>
            </div>
          </div>

          {/* Botão Voltar ao Topo - Agora com Foguete */}
          <button
            onClick={scrollToTop}
            className="group relative text-slate-400 hover:text-white transition-all duration-300 text-sm font-mono font-bold tracking-wide flex items-center space-x-3 px-5 py-3 rounded-xl bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 hover:border-blue-400/30 hover:bg-blue-500/10 hover:scale-105 rocket-button"
          >
            <div className="flex items-center space-x-2">
              <Rocket className="h-4 w-4 group-hover:animate-rocket-launch transition-transform duration-200" />
              <span>VOLTAR AO TOPO</span>
            </div>

            {/* Efeito de brilho */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
          </button>
        </div>

        {/* Mensagem Final - Premium */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-4 bg-slate-900/40 backdrop-blur-xl px-6 py-4 rounded-2xl border border-slate-700/50 hover:border-blue-400/30 transition-all duration-500 group cursor-pointer">
            <Sparkles className="h-5 w-5 text-blue-400 animate-pulse group-hover:scale-110 transition-transform duration-300" />
            <p className="text-slate-400 text-sm font-mono font-bold tracking-widest group-hover:text-slate-300 transition-colors duration-300">
              PRONTO PARA O PRÓXIMO DESAFIO COSMICO! 🚀
            </p>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-200" />
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse delay-400" />
            </div>
          </div>
        </div>

        {/* Assinatura Tech */}
        <div className="mt-8 text-center">
          <p className="text-slate-600 text-xs font-mono">
            {"</>"} COM 💙 POR ERICK REIS • NEXT.JS 14 • TYPESCRIPT •
            TAILWINDCSS
          </p>
        </div>
      </div>
    </footer>
  );
};
