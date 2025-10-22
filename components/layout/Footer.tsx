import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

// CORREÇÃO: Links atualizados com suas informações reais
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
    href: "mailto:erick@email.com",
    label: "Email",
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-card/50 bg-background pt-12 pb-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          {/* Logo/Nome */}
          <Link
            href="/"
            className="text-xl font-bold text-primary-default transition-colors hover:text-primary-default/80 mb-6 md:mb-0"
          >
            {"<ErickReis />"} {/* CORREÇÃO: Consistente com Header */}
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
                className="text-foreground transition-colors hover:text-primary-default"
              >
                <link.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>

        {/* Direitos Autorais */}
        <div className="mt-8 text-center text-sm text-foreground/60">
          {/* CORREÇÃO: Nome atualizado */}
          <p>
            © {currentYear} Erick Reis. Desenvolvido com{" "}
            <span className="text-primary-default">Next.js</span> e{" "}
            <span className="text-primary-default">Tailwind CSS</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};
