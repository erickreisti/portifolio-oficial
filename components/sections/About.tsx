"use client";

import {
  Zap,
  Code2,
  Users,
  CircuitBoard,
  Binary,
  Rocket,
  Sparkles,
  Globe,
  Code,
  Shield,
  Brain,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MotionDiv from "@/components/ui/MotionDiv";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Dados da biografia atualizados com o novo texto
const bioData = {
  paragraph1:
    "Olá! Sou Érick Reis, um Desenvolvedor FullStack & Arquiteto de Sistemas apaixonado por transformar ideias em soluções digitais robustas e escaláveis. Minha jornada na tecnologia começou com formação em Tecnologia da Informação e Sistemas de Informação, seguida por especialização em Redes de Computadores. Essa base técnica diversificada me proporcionou uma visão holística de sistemas, que hoje aplico no desenvolvimento de aplicações modernas.",
  paragraph2:
    "Acredito que código bem escrito resolve problemas reais. Minha abordagem combina arquitetura limpa, performance como prioridade, segurança desde a concepção e escalabilidade pensada para o crescimento. Minha experiência multidisciplinar em TI me permite entregar soluções completas — desde a modelagem do banco de dados até a experiência do usuário final. Não apenas codifico features, mas orquestro sistemas que funcionam em harmonia.",
  passions: [
    {
      icon: Brain,
      text: "Arquitetura de Sistemas & Clean Code",
      description: "DDD, Clean Architecture e princípios SOLID",
    },
    {
      icon: Zap,
      text: "Performance & Otimização Web",
      description: "Lighthouse 90%+, Core Web Vitals otimizados",
    },
    {
      icon: Users,
      text: "Visão Holística de Sistemas",
      description: "Do backend à experiência do usuário final",
    },
    {
      icon: Rocket,
      text: "Soluções Escaláveis",
      description: "Arquitetura preparada para crescimento",
    },
  ],
  highlights: [
    {
      icon: Zap,
      text: "Performance",
      value: "95%+ Lighthouse",
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon: Code2,
      text: "Arquitetura Limpa",
      value: "Código Sólido",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: Shield,
      text: "Segurança",
      value: "Desde a Concepção",
      color: "from-green-400 to-emerald-400",
    },
  ],
  stats: [
    { number: "50+", label: "Projetos Entregues", suffix: "" },
    { number: "5", label: "Anos de Experiência", suffix: "+" },
    { number: "100", label: "Satisfação do Cliente", suffix: "%" },
    { number: "24/7", label: "Suporte Técnico", suffix: "" },
  ],
};

export const About = () => {
  return (
    <section
      id="about"
      className="py-16 lg:py-32 bg-slate-950 relative overflow-hidden border-t border-slate-800/50"
    >
      {/* Background animado premium */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Elementos decorativos tech com neon */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 opacity-60">
          <svg
            className="h-20 w-20 animate-neon-cyan interactive-glow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </div>
        <div className="absolute bottom-10 right-10 opacity-60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circuit-board h-16 w-16 animate-neon-purple interactive-glow"
            aria-hidden="true"
          >
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M11 9h4a2 2 0 0 0 2-2V3"></path>
            <circle cx="9" cy="9" r="2"></circle>
            <path d="M7 21v-4a2 2 0 0 1 2-2h4"></path>
            <circle cx="15" cy="15" r="2"></circle>
          </svg>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header da Seção - Otimizado para mobile */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12 lg:mb-20"
        >
          <MotionDiv
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center text-xs lg:text-sm font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-4 lg:px-6 py-2 lg:py-3 rounded-full border border-blue-400/30 mb-4 lg:mb-6 relative overflow-hidden group interactive"
          >
            <Sparkles className="h-3 w-3 lg:h-4 lg:w-4 mr-2 lg:mr-3 animate-pulse" />
            JORNADA TECH & VISÃO
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-heading font-black text-white mt-2 lg:mt-4 px-4 lg:px-0">
              MAIS DO QUE CÓDIGO,{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                UMA VISÃO
              </span>
            </h1>
            <p className="text-base lg:text-xl text-slate-300 mt-4 lg:mt-6 max-w-2xl mx-auto font-sans leading-relaxed px-4 lg:px-0">
              Conheça a mente por trás das soluções inovadoras e a paixão que
              impulsiona cada linha de código
            </p>
          </MotionDiv>
        </MotionDiv>

        {/* Stats Banner - Grid 2x2 em mobile */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-20 px-4 lg:px-0"
        >
          {bioData.stats.map((stat, index) => (
            <MotionDiv
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              viewport={{ once: true }}
              className="text-center p-4 lg:p-6 bg-slate-900/40 backdrop-blur-xl rounded-xl lg:rounded-2xl border border-slate-700/50 hover:border-blue-400/30 transition-all duration-500 hover:scale-105 group interactive"
            >
              <div className="text-xl lg:text-2xl xl:text-3xl font-heading font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1 lg:mb-2">
                {stat.number}
                <span className="text-cyan-400">{stat.suffix}</span>
              </div>
              <div className="text-slate-400 font-mono text-xs lg:text-sm tracking-wide group-hover:text-slate-300 transition-colors duration-300 leading-tight">
                {stat.label}
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>

        <div className="flex flex-col lg:flex-row lg:space-x-8 xl:space-x-12">
          {/* Coluna da Esquerda: Foto + Parágrafos */}
          <div className="lg:w-7/12 space-y-6 lg:space-y-8">
            {/* Foto com Animação Premium - Centralizada em mobile */}
            <MotionDiv
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex justify-center lg:justify-start px-4 lg:px-0"
            >
              <div className="relative group interactive">
                {/* Container da Foto com Efeito 3D - Tamanho responsivo */}
                <div className="relative h-48 w-48 sm:h-56 sm:w-56 lg:h-64 lg:w-64 xl:h-72 xl:w-72 rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/avatar.webp"
                    alt="Erick Reis - Full Stack Developer & Tech Leader"
                    width={288}
                    height={288}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    priority
                    style={{ width: "auto", height: "auto" }}
                  />

                  {/* Overlay gradiente animado */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </div>

                {/* Badge flutuante - Posição responsiva */}
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-2 -right-2 lg:-bottom-4 lg:-right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-mono font-bold tracking-widest shadow-2xl border border-white/20"
                >
                  <Code className="h-2 w-2 lg:h-3 lg:w-3 inline mr-1 lg:mr-2" />
                  FULLSTACK
                </MotionDiv>
              </div>
            </MotionDiv>

            {/* Parágrafos com Entrada em Cascata */}
            <div className="space-y-6 lg:space-y-8 px-4 lg:px-0">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-slate-900/60 backdrop-blur-xl p-6 lg:p-8 rounded-xl lg:rounded-2xl border border-slate-700/50 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:border-blue-500/30 group relative overflow-hidden interactive"
              >
                <div className="absolute top-3 left-3 lg:top-4 lg:left-4 w-1.5 h-1.5 lg:w-2 lg:h-2 bg-blue-400 rounded-full animate-pulse" />
                <p className="text-sm lg:text-base xl:text-lg text-slate-200 leading-relaxed font-sans font-light">
                  {bioData.paragraph1}
                </p>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-slate-900/60 backdrop-blur-xl p-6 lg:p-8 rounded-xl lg:rounded-2xl border border-slate-700/50 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:border-purple-500/30 group relative overflow-hidden interactive"
              >
                <div className="absolute top-3 right-3 lg:top-4 lg:right-4 w-1.5 h-1.5 lg:w-2 lg:h-2 bg-purple-400 rounded-full animate-pulse" />
                <p className="text-sm lg:text-base xl:text-lg text-slate-200 leading-relaxed font-sans font-light">
                  {bioData.paragraph2}
                </p>
              </MotionDiv>
            </div>
          </div>

          {/* Coluna da Direita: Especializações */}
          <div className="lg:w-5/12 mt-8 lg:mt-0 space-y-6 lg:space-y-8 px-4 lg:px-0">
            {/* Card de Paixões */}
            <MotionDiv
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-900/60 backdrop-blur-xl border border-blue-400/20 lg:border-2 shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:scale-105 group relative overflow-hidden interactive">
                <CardHeader className="pb-4 lg:pb-6 border-b border-slate-700/50">
                  <CardTitle className="text-xl lg:text-2xl font-heading font-black text-blue-400 flex items-center">
                    <Brain className="h-5 w-5 lg:h-6 lg:w-6 mr-2 lg:mr-3 animate-pulse" />
                    ESPECIALIZAÇÕES
                  </CardTitle>
                  <p className="text-slate-400 text-xs lg:text-sm mt-1 lg:mt-2 font-sans">
                    Áreas onde minha expertise faz a diferença
                  </p>
                </CardHeader>

                <CardContent className="space-y-4 lg:space-y-6 pt-4 lg:pt-6">
                  {bioData.passions.map((item, index) => (
                    <MotionDiv
                      key={index}
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.08 * index }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3 lg:space-x-4 group hover:bg-blue-500/10 p-3 lg:p-4 rounded-lg lg:rounded-xl transition-all duration-300 border border-transparent hover:border-blue-400/20 cursor-pointer interactive"
                    >
                      <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300 border border-blue-400/20 flex-shrink-0">
                        <item.icon className="h-4 w-4 lg:h-5 lg:w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm lg:text-base font-sans font-semibold text-white group-hover:text-blue-300 transition-colors duration-300 truncate lg:whitespace-normal">
                          {item.text}
                        </p>
                        <p className="text-xs lg:text-sm text-slate-400 mt-1 font-sans leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </MotionDiv>
                  ))}
                </CardContent>
              </Card>
            </MotionDiv>

            {/* Card de Destaques */}
            <MotionDiv
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-900/60 backdrop-blur-xl border border-purple-400/20 lg:border-2 shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:scale-105 group relative overflow-hidden interactive">
                <CardHeader className="pb-4 lg:pb-6 border-b border-slate-700/50">
                  <CardTitle className="text-xl lg:text-2xl font-heading font-black text-purple-400 flex items-center">
                    <Shield className="h-5 w-5 lg:h-6 lg:w-6 mr-2 lg:mr-3" />
                    COMPROMISSO
                  </CardTitle>
                  <p className="text-slate-400 text-xs lg:text-sm mt-1 lg:mt-2 font-sans">
                    Meu padrão de excelência em cada projeto
                  </p>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-3 lg:gap-4 pt-4 lg:pt-6">
                  {bioData.highlights.map((highlight, index) => (
                    <MotionDiv
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.08 * index }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between p-3 lg:p-4 rounded-lg lg:rounded-xl bg-slate-800/30 hover:bg-slate-700/40 transition-all duration-300 group/highlight interactive"
                    >
                      <div className="flex items-center space-x-2 lg:space-x-3 min-w-0 flex-1">
                        <div
                          className={`h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-gradient-to-r ${highlight.color} flex items-center justify-center flex-shrink-0`}
                        >
                          <highlight.icon className="h-3 w-3 lg:h-4 lg:w-4 text-white" />
                        </div>
                        <span className="font-sans font-semibold text-white text-sm lg:text-base truncate">
                          {highlight.text}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-blue-400 text-sm lg:text-base group-hover/highlight:scale-110 transition-transform duration-300 flex-shrink-0 ml-2">
                        {highlight.value}
                      </span>
                    </MotionDiv>
                  ))}
                </CardContent>
              </Card>
            </MotionDiv>
          </div>
        </div>

        {/* CTA Final - Premium Responsivo */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 lg:mt-20 px-4 lg:px-0"
        >
          <div className="bg-gradient-to-r from-slate-900/60 to-slate-800/40 backdrop-blur-xl p-6 lg:p-8 rounded-xl lg:rounded-2xl border border-slate-700/50 shadow-2xl relative overflow-hidden interactive">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 relative z-10">
              <div className="flex items-center space-x-4 lg:space-x-6 text-center lg:text-left">
                <MotionDiv
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  viewport={{ once: true }}
                  className="h-12 w-12 lg:h-16 lg:w-16 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-400/30 flex-shrink-0"
                >
                  <Rocket className="h-6 w-6 lg:h-8 lg:w-8 text-blue-400 animate-pulse" />
                </MotionDiv>
                <div>
                  <h3 className="text-xl lg:text-2xl font-heading font-black text-white mb-1 lg:mb-2">
                    Pronto para o próximo nível?
                  </h3>
                  <p className="text-slate-300 font-sans text-sm lg:text-lg">
                    Vamos transformar sua visão em realidade com tecnologia de
                    ponta
                  </p>
                </div>
              </div>

              <MotionDiv
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Button
                  asChild
                  className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-heading font-bold text-sm lg:text-lg px-6 lg:px-10 py-4 lg:py-6 rounded-xl lg:rounded-2xl shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105 border-0 overflow-hidden w-full lg:w-auto interactive"
                >
                  <a href="#contact">
                    <Sparkles className="mr-2 lg:mr-3 h-4 w-4 lg:h-5 lg:w-5 group-hover:scale-110 transition-transform duration-300" />
                    INICIAR PROJETO
                  </a>
                </Button>
              </MotionDiv>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};
