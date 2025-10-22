"use client";

import Link from "next/link";
import { Download, Mail } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import AvatarPic from "@/public/images/avatar.webp";

export const Hero = () => {
  return (
    <section id="hero" className="pt-32 pb-20 lg:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between lg:flex-row lg:space-x-12">
          {/* 1. Conteúdo de Texto e CTAs */}
          <div className="lg:w-7/12 order-2 lg:order-1 mt-12 lg:mt-0 text-center lg:text-left">
            {/* Tag / Nome */}
            <span className="text-sm font-semibold uppercase tracking-widest text-primary-default">
              👋 Olá, eu sou Erick Reis
            </span>

            {/* Título de Impacto */}
            <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Desenvolvedor FullStack,
              <span className="block text-primary-default/90">
                Transformando Ideias em Código.
              </span>
            </h1>

            {/* Descrição */}
            <p className="mt-6 max-w-lg mx-auto lg:mx-0 text-lg text-foreground/70">
              Especializado em construir aplicações web escaláveis e de alta
              performance com <strong>Next.js</strong>,{" "}
              <strong>TypeScript</strong> e <strong>Tailwind CSS</strong>. Meu
              foco é design de sistemas e experiência do usuário.
            </p>

            {/* CTAs (Chamadas para Ação) */}
            <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center lg:justify-start">
              {/* Botão Principal: Contato */}
              <Button
                asChild
                size="lg"
                className="h-12 text-base font-semibold"
              >
                <Link href="#contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Vamos Conversar
                </Link>
              </Button>

              {/* CORREÇÃO: Link do CV atualizado ou removido se não existir */}
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 text-base font-semibold"
              >
                {/* Altere para o caminho real do seu CV ou remova o botão */}
                <a href="/docs/curriculo-erick-reis.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  Baixar CV
                </a>
              </Button>
            </div>
          </div>

          {/* 2. Avatar (Imagem de Perfil) */}
          <div className="lg:w-5/12 order-1 lg:order-2 flex justify-center">
            <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-full overflow-hidden border-4 border-primary-default/50 shadow-2xl transition-all duration-500 hover:shadow-primary-default/30 bg-card">
              <Image
                src={AvatarPic}
                alt="Avatar de Erick Reis"
                fill
                priority
                sizes="(max-width: 768px) 256px, 320px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
