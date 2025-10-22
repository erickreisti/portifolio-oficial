"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";

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
    <footer className="w-full border-t border-border/50 bg-background pt-16 pb-12 relative overflow-hidden">
      {/* Background sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-background dark:from-gray-900/30 dark:to-background" />

      {/* Padrão geométrico sutil */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:10px_10px]" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Conteúdo Principal */}
        <div className="flex flex-col items-center justify-between md:flex-row mb-12">
          {/* Logo/Nome com HASHBLUE - COM FONTS */}
          <Link
            href="/"
            className="group flex items-center space-x-3 mb-8 md:mb-0"
          >
            <div className="h-14 w-14 rounded-full flex items-center justify-center group-hover:shadow-blue-500/30 transition-all duration-300 overflow-hidden">
              <Image
                src="/images/hashblue.svg"
                alt="HashBlue Logo"
                width={56}
                height={56}
                className="h-12 w-12 object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-heading font-bold text-foreground group-hover:text-primary-default transition-colors duration-300">
                Érick Reis
              </span>
              <span className="text-sm text-foreground/60 font-sans font-medium">
                Full Stack Developer
              </span>
            </div>
          </Link>

          {/* Links Sociais */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="group flex items-center justify-center h-12 w-12 rounded-xl bg-background/80 backdrop-blur-sm border-2 border-primary-default/20 text-foreground transition-all duration-300 hover:bg-primary-default/10 hover:border-primary-default/40 hover:scale-110 hover:shadow-lg hover:shadow-primary-default/20"
              >
                <link.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
              </a>
            ))}
          </div>
        </div>

        {/* Divisor */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Direitos Autorais e Informações */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Texto de direitos autorais */}
          <div className="text-center md:text-left">
            <p className="text-foreground/70 text-sm font-sans font-medium">
              © {currentYear} Érick Reis. Todos os direitos reservados.
            </p>
          </div>

          {/* Tech stack usada */}
          <div className="flex items-center space-x-2 text-foreground/60 text-sm font-sans font-medium">
            <span>Desenvolvido por</span>
            <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
            <span className="text-primary-default font-heading font-semibold">
              Érick Reis
            </span>
          </div>

          {/* Link para topo */}
          <button
            onClick={scrollToTop}
            className="text-foreground/70 hover:text-primary-default transition-colors duration-300 text-sm font-sans font-medium group flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-primary-default/5 border border-transparent hover:border-primary-default/20"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform duration-200" />
          </button>
        </div>

        {/* Mensagem final */}
        <div className="mt-8 text-center">
          <p className="text-foreground/50 text-xs font-sans font-medium">
            Pronto para o próximo desafio! 🚀
          </p>
        </div>
      </div>
    </footer>
  );
};
