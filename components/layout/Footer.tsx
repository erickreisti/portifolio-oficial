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
} from "lucide-react";

// Links atualizados com suas informações reais
const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/erickreis",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/erick-reis",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:erickreisti@gmail.com",
    label: "Email",
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-slate-800/50 bg-slate-950 pt-16 pb-12 relative overflow-hidden">
      {/* Background gradiente tech */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />

      {/* Partículas sutis */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
        <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-600" />
      </div>

      {/* Elementos decorativos tech */}
      <div className="absolute top-5 left-5 opacity-5">
        <CircuitBoard className="h-16 w-16 text-blue-400" />
      </div>
      <div className="absolute bottom-5 right-5 opacity-5">
        <Cpu className="h-16 w-16 text-cyan-400" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Conteúdo Principal */}
        <div className="flex flex-col items-center justify-between md:flex-row mb-12">
          {/* Logo/Nome - Estilo Tech */}
          <Link
            href="#hero"
            className="group flex items-center space-x-4 mb-8 md:mb-0"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            <div className="h-16 w-16 rounded-2xl flex items-center justify-center  group-hover:to-purple-600/30 transition-all duration-500 overflow-hidden shadow-2xl neon-pulse">
              <Image
                src="/images/hashblue.svg"
                alt="Erick Reis Logo"
                width={64}
                height={64}
                className="h-14 w-14 object-contain group-hover:scale-110 transition-transform duration-500 filter brightness-125"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-heading font-bold text-white group-hover:text-blue-300 transition-colors duration-300 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Erick Reis
              </span>
              <span className="text-sm text-slate-400 font-mono tracking-widest">
                FULLSTACK DEV
              </span>
            </div>
          </Link>

          {/* Links Sociais - Estilo Tech */}
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="group relative flex items-center justify-center h-12 w-12 rounded-xl bg-slate-900/50 backdrop-blur-xl border-2 border-blue-400/20 text-slate-300 transition-all duration-500 hover:bg-blue-500/10 hover:border-blue-400/40 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20 hover:text-white"
              >
                <link.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                {/* Efeito de brilho */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </a>
            ))}
          </div>
        </div>

        {/* Divisor */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent mb-8" />

        {/* Direitos Autorais e Informações */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Texto de direitos autorais */}
          <div className="text-center md:text-left">
            <p className="text-slate-400 text-sm font-mono font-bold tracking-wide">
              © {currentYear} ERICK REIS. TODOS OS DIREITOS RESERVADOS.
            </p>
          </div>

          {/* Tech stack usada */}
          <div className="flex items-center space-x-2 text-slate-400 text-sm font-mono font-bold tracking-wide">
            <span>DESENVOLVIDO POR</span>
            <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
            <span className="text-blue-400 font-heading font-semibold">
              ERICK REIS
            </span>
          </div>

          {/* Link para topo */}
          <button
            onClick={scrollToTop}
            className="text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm font-mono font-bold tracking-wide group flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-blue-500/10 border border-transparent hover:border-blue-400/20"
          >
            <span>VOLTAR AO TOPO</span>
            <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform duration-200" />
          </button>
        </div>

        {/* Mensagem final */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-xs font-mono font-bold tracking-widest">
            PRONTO PARA O PRÓXIMO DESAFIO! 🚀
          </p>
        </div>
      </div>
    </footer>
  );
};
