"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Heart, Code2, ArrowUp } from "lucide-react";

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
    <footer className="w-full border-t border-border bg-gradient-to-br from-background via-blue-50/20 to-background dark:from-background dark:via-blue-950/10 dark:to-background pt-16 pb-12 relative overflow-hidden">
      {/* Elementos decorativos sutis */}
      <div className="absolute bottom-5 left-10 opacity-5">
        <Code2 className="h-20 w-20 text-primary-default" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Conteúdo Principal */}
        <div className="flex flex-col items-center justify-between md:flex-row mb-12">
          {/* Logo/Nome com estilo consistente */}
          <Link
            href="/"
            className="group flex items-center space-x-3 mb-8 md:mb-0"
          >
            <div className="h-12 w-12 rounded-full bg-primary-default/10 flex items-center justify-center group-hover:bg-primary-default/20 transition-all duration-300 border-2 border-primary-default/20">
              <Code2 className="h-6 w-6 text-primary-default" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-foreground group-hover:text-primary-default transition-colors duration-300">
                Erick Reis
              </span>
              <span className="text-sm text-foreground/60 font-medium">
                Full Stack Developer
              </span>
            </div>
          </Link>

          {/* Links Sociais com estilo aprimorado */}
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
            <p className="text-foreground/70 text-sm font-medium">
              © {currentYear} Erick Reis. Todos os direitos reservados.
            </p>
          </div>

          {/* Tech stack usada */}
          <div className="flex items-center space-x-2 text-foreground/60 text-sm font-medium">
            <span>Desenvolvido com</span>
            <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
            <span>usando</span>
            <span className="text-primary-default font-semibold">Next.js</span>
            <span>e</span>
            <span className="text-primary-default font-semibold">
              Tailwind CSS
            </span>
          </div>

          {/* Link para topo */}
          <button
            onClick={scrollToTop}
            className="text-foreground/70 hover:text-primary-default transition-colors duration-300 text-sm font-medium group flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-primary-default/5 border border-transparent hover:border-primary-default/20"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform duration-200" />
          </button>
        </div>

        {/* Mensagem final */}
        <div className="mt-8 text-center">
          <p className="text-foreground/50 text-xs font-medium">
            Pronto para o próximo desafio! 🚀
          </p>
        </div>
      </div>
    </footer>
  );
};
