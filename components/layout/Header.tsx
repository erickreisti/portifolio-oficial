"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle"; // Importação renomeada para ThemeToggle

// 1. Dados de Navegação
const navItems = [
  { name: "Sobre", href: "#about" },
  { name: "Habilidades", href: "#skills" },
  { name: "Projetos", href: "#projects" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-card/50 bg-background/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo/Nome */}
        <Link
          href="/"
          className="text-2xl font-bold text-primary-default transition-colors hover:text-primary-default/80"
        >
          {"<ErickReis />"} {/* Renomeado para usar seu nome como padrão */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground transition-colors hover:text-primary-default/80"
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center space-x-3 pl-4">
            <ThemeToggle /> {/* Uso do Toggle de Tema */}
            <Button asChild className="text-sm font-semibold">
              <Link href="#contact">Fale Comigo</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-16 w-full border-b border-card bg-card/95 backdrop-blur-md md:hidden">
          <nav className="flex flex-col space-y-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-background hover:text-primary-default"
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 pt-2">
              <Button asChild className="w-full font-semibold">
                <Link href="#contact" onClick={() => setIsOpen(false)}>
                  Fale Comigo
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
