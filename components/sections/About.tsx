"use client";

import {
  Briefcase,
  Heart,
  Lightbulb,
  TrendingUp,
  Target,
  Zap,
  Code2,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MotionDiv from "@/components/ui/MotionDiv";
import { Button } from "@/components/ui/button";

// Dados da sua biografia
const bioData = {
  paragraph1:
    "Minha jornada na programação começou há 5 anos, focando inicialmente em Back-end com Node.js e Python. Rapidamente, percebi a necessidade de dominar o Front-end para construir experiências completas, migrando para o ecossistema moderno de React e, mais recentemente, Next.js.",
  paragraph2:
    "Sou um profissional orientado a resultados, apaixonado por arquitetura limpa, performance de código e design system. Meu objetivo é sempre entregar soluções que sejam robustas, escaláveis e que superem as expectativas do cliente ou usuário final.",
  passions: [
    { icon: Lightbulb, text: "Arquitetura de Sistemas (DDD/Clean Code)" },
    { icon: TrendingUp, text: "Otimização de Performance Web (Lighthouse)" },
    { icon: Heart, text: "Comunidades e Mentoria Técnica" },
    { icon: Briefcase, text: "Novas Tecnologias (Ex: Rust e Serverless)" },
  ],
  highlights: [
    { icon: Zap, text: "Performance", value: "90%+ Lighthouse" },
    { icon: Code2, text: "Código Limpo", value: "Best Practices" },
    { icon: Users, text: "Colaboração", value: "Team Player" },
  ],
};

export const About = () => {
  return (
    <section
      id="about"
      className="py-20 lg:py-32 bg-gradient-to-br from-background via-blue-50/20 to-background dark:from-background dark:via-blue-950/10 dark:to-background border-t border-border relative overflow-hidden"
    >
      {/* Elementos decorativos sutis */}
      <div className="absolute top-10 left-10 opacity-5">
        <Code2 className="h-32 w-32 text-blue-500" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-5">
        <Users className="h-32 w-32 text-blue-500" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Título da Seção */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center text-sm font-semibold uppercase tracking-widest text-primary-default bg-primary-default/10 px-4 py-2 rounded-full border border-primary-default/20 mb-4">
            <Target className="h-4 w-4 mr-2" />
            Minha Jornada
          </div>
          <h2 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl mt-4">
            Sobre{" "}
            <span className="text-primary-default bg-gradient-to-r from-primary-default to-blue-600 bg-clip-text text-transparent">
              Mim
            </span>
          </h2>
          <p className="text-xl text-foreground/70 mt-6 max-w-2xl mx-auto">
            Conheça minha trajetória, paixões e o que me motiva a criar soluções
            incríveis
          </p>
        </MotionDiv>

        <div className="flex flex-col lg:flex-row lg:space-x-12">
          {/* Coluna de Texto e História */}
          <div className="lg:w-7/12 space-y-8">
            <MotionDiv
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-xl text-foreground/80 leading-relaxed font-medium bg-background/50 p-6 rounded-2xl border border-border/50 backdrop-blur-sm">
                {bioData.paragraph1}
              </p>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-xl text-foreground/80 leading-relaxed bg-background/50 p-6 rounded-2xl border border-border/50 backdrop-blur-sm">
                {bioData.paragraph2}
              </p>
            </MotionDiv>

            {/* Destaques em Grid */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
            >
              {bioData.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-primary-default/5 to-primary-default/10 p-4 rounded-xl border border-primary-default/20 text-center group hover:from-primary-default/10 hover:to-primary-default/15 transition-all duration-300 hover:scale-105"
                >
                  <div className="h-12 w-12 rounded-full bg-primary-default/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-default/20 transition-colors duration-300">
                    <highlight.icon className="h-6 w-6 text-primary-default" />
                  </div>
                  <div className="font-bold text-foreground text-lg">
                    {highlight.text}
                  </div>
                  <div className="text-primary-default font-semibold text-sm mt-1">
                    {highlight.value}
                  </div>
                </div>
              ))}
            </MotionDiv>

            {/* CTA */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="mt-8 pt-6 border-t border-border/50"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <Target className="h-6 w-6 text-primary-default" />
                  <span className="text-xl font-bold text-primary-default">
                    Pronto para o próximo desafio.
                  </span>
                </div>
                <Button
                  asChild
                  className="bg-primary-default hover:bg-primary-default/90 text-black dark:text-white px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                >
                  <a href="#contact">
                    Vamos Trabalhar Juntos
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 dark:via-white/30" />
                  </a>
                </Button>
              </div>
            </MotionDiv>
          </div>

          {/* Coluna de Cards (Paixões/Foco) */}
          <div className="lg:w-5/12 mt-12 lg:mt-0">
            <MotionDiv
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-background/80 backdrop-blur-sm border-2 border-primary-default/20 shadow-2xl hover:shadow-primary-default/20 transition-all duration-500 hover:scale-105">
                <CardHeader className="pb-4 border-b border-border/50">
                  <CardTitle className="text-2xl font-bold text-primary-default flex items-center">
                    <Lightbulb className="h-6 w-6 mr-3" />
                    Foco & Paixões
                  </CardTitle>
                  <p className="text-foreground/60 text-sm mt-2">
                    O que me motiva e direciona meu trabalho
                  </p>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {bioData.passions.map((item, index) => (
                    <MotionDiv
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4 group hover:bg-primary-default/5 p-3 rounded-lg transition-all duration-300"
                    >
                      <div className="h-10 w-10 rounded-full bg-primary-default/10 flex items-center justify-center group-hover:bg-primary-default/20 transition-colors duration-300">
                        <item.icon className="h-5 w-5 text-primary-default" />
                      </div>
                      <p className="text-base text-foreground/80 font-medium leading-relaxed group-hover:text-foreground transition-colors duration-300">
                        {item.text}
                      </p>
                    </MotionDiv>
                  ))}
                </CardContent>
              </Card>
            </MotionDiv>
          </div>
        </div>

        {/* Stats Adicionais */}
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center p-8 bg-background/50 rounded-2xl border border-border hover:border-primary-default/30 transition-all duration-300 hover:scale-105 group">
            <div className="text-4xl font-bold text-primary-default mb-3 group-hover:scale-110 transition-transform duration-300">
              5+
            </div>
            <div className="text-foreground/70 font-medium text-lg">
              Anos de Experiência
            </div>
            <div className="text-foreground/50 text-sm mt-2">
              FullStack Development
            </div>
          </div>
          <div className="text-center p-8 bg-background/50 rounded-2xl border border-border hover:border-primary-default/30 transition-all duration-300 hover:scale-105 group">
            <div className="text-4xl font-bold text-primary-default mb-3 group-hover:scale-110 transition-transform duration-300">
              50+
            </div>
            <div className="text-foreground/70 font-medium text-lg">
              Projetos Entregues
            </div>
            <div className="text-foreground/50 text-sm mt-2">
              Clientes Satisfeitos
            </div>
          </div>
          <div className="text-center p-8 bg-background/50 rounded-2xl border border-border hover:border-primary-default/30 transition-all duration-300 hover:scale-105 group">
            <div className="text-4xl font-bold text-primary-default mb-3 group-hover:scale-110 transition-transform duration-300">
              100%
            </div>
            <div className="text-foreground/70 font-medium text-lg">
              Satisfação do Cliente
            </div>
            <div className="text-foreground/50 text-sm mt-2">
              Feedback Positivo
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};
