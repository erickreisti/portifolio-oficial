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
  Cpu,
  CircuitBoard,
  Binary,
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
    { icon: Cpu, text: "Arquitetura de Sistemas (DDD/Clean Code)" },
    { icon: Zap, text: "Otimização de Performance Web (Lighthouse)" },
    { icon: Heart, text: "Comunidades e Mentoria Técnica" },
    { icon: CircuitBoard, text: "Novas Tecnologias (Ex: Rust e Serverless)" },
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
      className="py-20 lg:py-32 bg-slate-950 relative overflow-hidden border-t border-slate-800/50"
    >
      {/* Background gradiente tech */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />

      {/* Partículas sutis */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
        <div className="absolute bottom-40 left-20 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
      </div>

      {/* Elementos decorativos tech */}
      <div className="absolute top-10 left-10 opacity-5">
        <Binary className="h-32 w-32 text-blue-400" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-5">
        <CircuitBoard className="h-32 w-32 text-cyan-400" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Título da Seção - Estilo Tech */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center text-sm font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-6 py-3 rounded-full border border-blue-400/30 mb-6 neon-pulse">
            <Target className="h-4 w-4 mr-3" />
            MINHA JORNADA TECH
          </div>
          <h2 className="text-4xl font-heading font-black text-white sm:text-5xl lg:text-6xl mt-4">
            SOBRE{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              MIM
            </span>
          </h2>
          <p className="text-xl text-slate-300 mt-6 max-w-2xl mx-auto font-mono tracking-wide">
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
              <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:border-blue-500/30 group">
                <p className="text-xl text-slate-300 leading-relaxed font-sans font-medium">
                  {bioData.paragraph1}
                </p>
                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-400/5 to-cyan-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </div>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:border-purple-500/30 group">
                <p className="text-xl text-slate-300 leading-relaxed font-sans">
                  {bioData.paragraph2}
                </p>
                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-400/5 to-pink-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </div>
            </MotionDiv>

            {/* Destaques em Grid - Estilo Tech */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
            >
              {bioData.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-xl border border-slate-700/50 text-center group hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-500 hover:scale-105 hover:border-blue-400/30 relative overflow-hidden"
                >
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-500 border border-blue-400/20">
                    <highlight.icon className="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  </div>
                  <div className="font-heading font-bold text-white text-lg mb-2">
                    {highlight.text}
                  </div>
                  <div className="text-blue-400 font-mono font-semibold text-sm">
                    {highlight.value}
                  </div>
                  {/* Efeito de brilho */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </div>
              ))}
            </MotionDiv>

            {/* CTA - Estilo Tech */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="mt-8 pt-8 border-t border-slate-800/50"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-900/30 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-400/30">
                    <Target className="h-5 w-5 text-blue-400" />
                  </div>
                  <span className="text-xl font-heading font-bold text-white">
                    Pronto para o próximo desafio.
                  </span>
                </div>
                <Button
                  asChild
                  className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-mono font-bold text-sm px-8 py-3 rounded-xl shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:scale-105 border-0 pulse-glow overflow-hidden tracking-widest"
                >
                  <a href="#contact">
                    VAMOS TRABALHAR JUNTOS
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl" />
                  </a>
                </Button>
              </div>
            </MotionDiv>
          </div>

          {/* Coluna de Cards (Paixões/Foco) - Estilo Tech */}
          <div className="lg:w-5/12 mt-12 lg:mt-0">
            <MotionDiv
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-slate-900/50 backdrop-blur-xl border-2 border-blue-400/20 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 group relative overflow-hidden">
                {/* Efeito de brilho no card */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                <CardHeader className="pb-6 border-b border-slate-700/50">
                  <CardTitle className="text-2xl font-heading font-black text-blue-400 flex items-center neon-pulse">
                    <Cpu className="h-6 w-6 mr-3" />
                    FOCO & PAIXÕES
                  </CardTitle>
                  <p className="text-slate-400 text-sm mt-2 font-mono tracking-wide">
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
                      className="flex items-start space-x-4 group hover:bg-blue-500/10 p-4 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-400/20"
                    >
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300 border border-blue-400/20">
                        <item.icon className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                      </div>
                      <p className="text-base text-slate-300 font-sans font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
                        {item.text}
                      </p>
                    </MotionDiv>
                  ))}
                </CardContent>
              </Card>
            </MotionDiv>
          </div>
        </div>

        {/* Stats Adicionais - Estilo Tech */}
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              number: "5+",
              title: "Anos de Experiência",
              subtitle: "FullStack Development",
            },
            {
              number: "50+",
              title: "Projetos Entregues",
              subtitle: "Clientes Satisfeitos",
            },
            {
              number: "100%",
              title: "Satisfação do Cliente",
              subtitle: "Feedback Positivo",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-blue-400/30 transition-all duration-500 hover:scale-105 group relative overflow-hidden"
            >
              <div className="text-5xl font-heading font-black text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300 neon-pulse">
                {stat.number}
              </div>
              <div className="text-white font-heading font-bold text-lg mb-2">
                {stat.title}
              </div>
              <div className="text-slate-400 font-mono text-sm tracking-wide">
                {stat.subtitle}
              </div>
              {/* Efeito de brilho */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </div>
          ))}
        </MotionDiv>
      </div>
    </section>
  );
};
