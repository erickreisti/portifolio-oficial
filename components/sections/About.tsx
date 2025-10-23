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

// Dados da biografia atualizados
const bioData = {
  paragraph1:
    "Minha paixão por tecnologia começou cedo, mas foi há 5 anos que mergulhei de cabeça no desenvolvimento. Iniciei no Back-end com Node.js e Python, construindo APIs robustas e sistemas escaláveis. A necessidade de criar experiências completas me levou ao Front-end, onde me especializei no ecossistema React e, mais recentemente, Next.js 14+.",
  paragraph2:
    "Como arquiteto de software, meu foco está em criar soluções que não apenas funcionam, mas excelam. Sou obcecado por performance, código limpo e design systems que escalam. Minha missão é transformar desafios complexos em experiências digitais intuitivas e de alto impacto.",
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
      text: "Liderança Técnica & Mentoria",
      description: "Gestão de squads e desenvolvimento de talentos",
    },
    {
      icon: Rocket,
      text: "Inovação Tecnológica",
      description: "Serverless, AI/ML, Web3 e tecnologias emergentes",
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
      text: "Qualidade",
      value: "Clean Code",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: Shield,
      text: "Confiança",
      value: "Entrega Garantida",
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
      className="py-20 lg:py-32 bg-slate-950 relative overflow-hidden border-t border-slate-800/50"
    >
      {/* Background animado premium */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Partículas animadas */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      {/* Elementos decorativos tech */}
      <div className="absolute top-10 left-10 opacity-5 animate-float-slow">
        <Binary className="h-32 w-32 text-blue-400" />
      </div>
      <div
        className="absolute bottom-10 right-10 opacity-5 animate-float-slow"
        style={{ animationDelay: "2s" }}
      >
        <CircuitBoard className="h-32 w-32 text-cyan-400" />
      </div>
      <div
        className="absolute top-20 right-20 opacity-5 animate-float-slow"
        style={{ animationDelay: "4s" }}
      >
        <Globe className="h-24 w-24 text-purple-400" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header da Seção - Animação Especial */}
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-20"
        >
          <MotionDiv
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center text-sm font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-6 py-3 rounded-full border border-blue-400/30 mb-6 relative overflow-hidden group"
          >
            <Sparkles className="h-4 w-4 mr-3 animate-pulse" />
            JORNADA TECH & VISÃO
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl font-heading font-black text-white sm:text-5xl lg:text-6xl mt-4">
              MAIS DO QUE CÓDIGO,{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                UMA VISÃO
              </span>
            </h1>
            <p className="text-xl text-slate-300 mt-6 max-w-2xl mx-auto font-sans leading-relaxed">
              Conheça a mente por trás das soluções inovadoras e a paixão que
              impulsiona cada linha de código
            </p>
          </MotionDiv>
        </MotionDiv>

        {/* Stats Banner */}
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {bioData.stats.map((stat, index) => (
            <MotionDiv
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="text-center p-6 bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-blue-400/30 transition-all duration-500 hover:scale-105 group"
            >
              <div className="text-3xl font-heading font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {stat.number}
                <span className="text-cyan-400">{stat.suffix}</span>
              </div>
              <div className="text-slate-400 font-mono text-sm tracking-wide group-hover:text-slate-300 transition-colors duration-300">
                {stat.label}
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>

        <div className="flex flex-col lg:flex-row lg:space-x-12">
          {/* Coluna da Esquerda: Foto + Parágrafos */}
          <div className="lg:w-7/12 space-y-8">
            {/* Foto com Animação Premium */}
            <MotionDiv
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative group">
                {/* Container da Foto com Efeito 3D */}
                <div className="relative h-72 w-72 rounded-3xl overflow-hidden shadow-2xl transform perspective-1000">
                  <Image
                    src="/images/avatar.webp"
                    alt="Erick Reis - Full Stack Developer & Tech Leader"
                    width={288}
                    height={288}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    priority
                  />

                  {/* Overlay gradiente animado */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Brilho nos cantos */}
                  <div className="absolute top-0 left-0 w-20 h-20 bg-blue-400/20 rounded-full blur-xl -translate-x-10 -translate-y-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl translate-x-10 translate-y-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200" />
                </div>

                {/* Partículas orbitais */}
                <div className="absolute -inset-4">
                  <div className="absolute top-2 right-2 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-orbit" />
                  <div className="absolute bottom-2 left-2 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-orbit delay-300" />
                  <div className="absolute top-2 left-2 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-orbit delay-600" />
                </div>

                {/* Badge flutuante */}
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-mono font-bold tracking-widest shadow-2xl border border-white/20"
                >
                  <Code className="h-3 w-3 inline mr-2" />
                  FULLSTACK
                </MotionDiv>
              </div>
            </MotionDiv>

            {/* Parágrafos com Entrada em Cascata */}
            <div className="space-y-8">
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:border-blue-500/30 group relative overflow-hidden"
              >
                <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <p className="text-lg text-slate-200 leading-relaxed font-sans font-light">
                  {bioData.paragraph1}
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-400/3 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:border-purple-500/30 group relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <p className="text-lg text-slate-200 leading-relaxed font-sans font-light">
                  {bioData.paragraph2}
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-400/3 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </MotionDiv>
            </div>
          </div>

          {/* Coluna da Direita: Especializações */}
          <div className="lg:w-5/12 mt-12 lg:mt-0 space-y-8">
            {/* Card de Paixões */}
            <MotionDiv
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-900/60 backdrop-blur-xl border-2 border-blue-400/20 shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:scale-105 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                <CardHeader className="pb-6 border-b border-slate-700/50">
                  <CardTitle className="text-2xl font-heading font-black text-blue-400 flex items-center">
                    <Brain className="h-6 w-6 mr-3 animate-pulse" />
                    ESPECIALIZAÇÕES
                  </CardTitle>
                  <p className="text-slate-400 text-sm mt-2 font-sans">
                    Áreas onde minha expertise faz a diferença
                  </p>
                </CardHeader>

                <CardContent className="space-y-6 pt-6">
                  {bioData.passions.map((item, index) => (
                    <MotionDiv
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4 group hover:bg-blue-500/10 p-4 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-400/20 cursor-pointer"
                    >
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300 border border-blue-400/20 flex-shrink-0">
                        <item.icon className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-sans font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                          {item.text}
                        </p>
                        <p className="text-sm text-slate-400 mt-1 font-sans">
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
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-900/60 backdrop-blur-xl border-2 border-purple-400/20 shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:scale-105 group relative overflow-hidden">
                <CardHeader className="pb-6 border-b border-slate-700/50">
                  <CardTitle className="text-2xl font-heading font-black text-purple-400 flex items-center">
                    <Shield className="h-6 w-6 mr-3" />
                    COMPROMISSO
                  </CardTitle>
                  <p className="text-slate-400 text-sm mt-2 font-sans">
                    Meu padrão de excelência em cada projeto
                  </p>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 pt-6">
                  {bioData.highlights.map((highlight, index) => (
                    <MotionDiv
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 hover:bg-slate-700/40 transition-all duration-300 group/highlight"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`h-10 w-10 rounded-full bg-gradient-to-r ${highlight.color} flex items-center justify-center`}
                        >
                          <highlight.icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-sans font-semibold text-white">
                          {highlight.text}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-blue-400 group-hover/highlight:scale-110 transition-transform duration-300">
                        {highlight.value}
                      </span>
                    </MotionDiv>
                  ))}
                </CardContent>
              </Card>
            </MotionDiv>
          </div>
        </div>

        {/* CTA Final - Premium */}
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-slate-900/60 to-slate-800/40 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-2xl relative overflow-hidden">
            {/* Background animado do CTA */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              <div className="flex items-center space-x-6">
                <MotionDiv
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  viewport={{ once: true }}
                  className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-400/30"
                >
                  <Rocket className="h-8 w-8 text-blue-400 animate-pulse" />
                </MotionDiv>
                <div>
                  <h3 className="text-2xl font-heading font-black text-white mb-2">
                    Pronto para o próximo nível?
                  </h3>
                  <p className="text-slate-300 font-sans text-lg">
                    Vamos transformar sua visão em realidade com tecnologia de
                    ponta
                  </p>
                </div>
              </div>

              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Button
                  asChild
                  className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-heading font-bold text-lg px-10 py-6 rounded-2xl shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105 border-0 overflow-hidden"
                >
                  <a href="#contact">
                    <Sparkles className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    INICIAR PROJETO
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl" />
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
