"use client";

import {
  Send,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Cpu,
  CircuitBoard,
  Binary,
  Sparkles,
  Phone,
  Globe,
  Rocket,
  Satellite,
} from "lucide-react";
import { useState } from "react";

import MotionDiv from "@/components/ui/MotionDiv";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = (formData: FormData) => {
    const errors: Record<string, string> = {};
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!name || name.trim().length < 2) {
      errors.name = "Nome deve ter pelo menos 2 caracteres";
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Por favor, insira um email válido";
    }

    if (!subject || subject.trim().length < 5) {
      errors.subject = "Assunto deve ter pelo menos 5 caracteres";
    }

    if (!message || message.trim().length < 10) {
      errors.message = "Mensagem deve ter pelo menos 10 caracteres";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (formData: FormData) => {
    if (!validateForm(formData)) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Erro ao enviar mensagem. Tente novamente."
        );
      }

      setIsSuccess(true);
      setTimeout(() => {
        const form = document.querySelector("form") as HTMLFormElement;
        form?.reset();
        setIsSuccess(false);
        setFormErrors({});
      }, 5000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao enviar mensagem. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 lg:py-32 bg-slate-950 relative overflow-hidden border-t border-slate-800/50"
    >
      {/* Background Premium */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Partículas de Fundo - Reduzidas para mobile */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/15 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${Math.random() * 10 + 8}s`,
            }}
          />
        ))}
      </div>

      {/* Elementos Decorativos - Escondidos em mobile */}
      <div className="hidden lg:block absolute top-10 right-10 opacity-5 animate-float-slow">
        <Binary className="h-32 w-32 text-blue-400" />
      </div>
      <div
        className="hidden lg:block absolute bottom-10 left-10 opacity-5 animate-float-slow"
        style={{ animationDelay: "3s" }}
      >
        <CircuitBoard className="h-32 w-32 text-cyan-400" />
      </div>
      <div
        className="hidden lg:block absolute top-20 left-20 opacity-5 animate-float-slow"
        style={{ animationDelay: "6s" }}
      >
        <Globe className="h-24 w-24 text-purple-400" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header da Seção - Premium Responsivo */}
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
            className="inline-flex items-center text-xs lg:text-sm font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-4 lg:px-6 py-2 lg:py-3 rounded-full border border-blue-400/30 mb-4 lg:mb-6 relative overflow-hidden group"
          >
            <MessageCircle className="h-3 w-3 lg:h-4 lg:w-4 mr-2 lg:mr-3 animate-pulse" />
            CONEXÃO TECH
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-heading font-black text-white mt-2 lg:mt-4 px-4 lg:px-0">
              VAMOS CRIAR{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                JUNTOS
              </span>
            </h1>
            <p className="text-base lg:text-xl text-slate-300 mt-4 lg:mt-6 max-w-3xl mx-auto font-sans leading-relaxed px-4 lg:px-0">
              Pronto para transformar sua visão em realidade? Vamos conversar
              sobre seu projeto e criar algo extraordinário
            </p>
          </MotionDiv>
        </MotionDiv>

        <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-3">
          {/* Informações de Contato - Premium Responsivo */}
          <MotionDiv
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="h-full bg-slate-900/60 backdrop-blur-xl border border-blue-400/20 lg:border-2 shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:scale-105 group relative overflow-hidden">
              <CardHeader className="pb-4 lg:pb-6 border-b border-slate-700/50">
                <CardTitle className="text-xl lg:text-2xl font-heading font-black text-blue-400 flex items-center">
                  <Cpu className="h-5 w-5 lg:h-6 lg:w-6 mr-2 lg:mr-3" />
                  CONECTE-SE
                </CardTitle>
                <p className="text-slate-300 text-xs lg:text-sm mt-1 lg:mt-2 font-sans leading-relaxed">
                  Estou sempre disponível para novas oportunidades, desafios
                  inspiradores e parcerias inovadoras
                </p>
              </CardHeader>

              <CardContent className="space-y-4 lg:space-y-6 pt-4 lg:pt-6">
                <div className="space-y-4 lg:space-y-6">
                  <div className="flex items-start space-x-3 lg:space-x-4 group p-3 lg:p-4 rounded-lg lg:rounded-xl hover:bg-blue-500/10 transition-all duration-300 border border-transparent hover:border-blue-400/30 cursor-pointer">
                    <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300 border border-blue-400/30 flex-shrink-0">
                      <Mail className="h-4 w-4 lg:h-5 lg:w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-heading font-bold text-white group-hover:text-blue-300 transition-colors duration-300 text-sm lg:text-base">
                        EMAIL PRINCIPAL
                      </p>
                      <p className="text-slate-300 text-xs lg:text-sm mt-1 font-mono tracking-wide group-hover:text-slate-200 transition-colors duration-300 truncate">
                        erickreisti@gmail.com
                      </p>
                      <p className="text-slate-400 text-xs mt-1 font-sans">
                        Resposta em até 24 horas
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 lg:space-x-4 group p-3 lg:p-4 rounded-lg lg:rounded-xl hover:bg-cyan-500/10 transition-all duration-300 border border-transparent hover:border-cyan-400/30 cursor-pointer">
                    <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300 border border-cyan-400/30 flex-shrink-0">
                      <MapPin className="h-4 w-4 lg:h-5 lg:w-5 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-heading font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 text-sm lg:text-base">
                        LOCALIZAÇÃO
                      </p>
                      <p className="text-slate-300 text-xs lg:text-sm mt-1 font-mono tracking-wide group-hover:text-slate-200 transition-colors duration-300">
                        Rio de Janeiro, Brasil
                      </p>
                      <p className="text-slate-400 text-xs mt-1 font-sans">
                        Disponível para projetos globais
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 lg:space-x-4 group p-3 lg:p-4 rounded-lg lg:rounded-xl hover:bg-purple-500/10 transition-all duration-300 border border-transparent hover:border-purple-400/30 cursor-pointer">
                    <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300 border border-purple-400/30 flex-shrink-0">
                      <Phone className="h-4 w-4 lg:h-5 lg:w-5 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-heading font-bold text-white group-hover:text-purple-300 transition-colors duration-300 text-sm lg:text-base">
                        DISPONIBILIDADE
                      </p>
                      <p className="text-slate-300 text-xs lg:text-sm mt-1 font-mono tracking-wide group-hover:text-slate-200 transition-colors duration-300">
                        Flexível & Comprometido
                      </p>
                      <p className="text-slate-400 text-xs mt-1 font-sans">
                        Projetos de qualquer escala
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 lg:pt-4 border-t border-slate-700/50">
                  <p className="text-slate-300 text-xs lg:text-sm font-sans leading-relaxed">
                    <Sparkles className="h-3 w-3 lg:h-4 lg:w-4 text-blue-400 inline mr-1 lg:mr-2" />
                    Vamos transformar suas ideias em soluções digitais
                    extraordinárias com tecnologia de ponta e criatividade.
                  </p>
                </div>
              </CardContent>
            </Card>
          </MotionDiv>

          {/* Formulário de Contato - Premium Responsivo */}
          <MotionDiv
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="h-full bg-slate-900/60 backdrop-blur-xl border border-purple-400/20 lg:border-2 shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:scale-105 group relative overflow-hidden">
              <CardHeader className="pb-4 lg:pb-6 border-b border-slate-700/50">
                <CardTitle className="text-xl lg:text-2xl font-heading font-black text-purple-400 flex items-center">
                  <Send className="h-5 w-5 lg:h-6 lg:w-6 mr-2 lg:mr-3" />
                  MENSAGEM RÁPIDA
                </CardTitle>
                <p className="text-slate-300 text-xs lg:text-sm mt-1 lg:mt-2 font-sans leading-relaxed">
                  Descreva seu projeto ou ideia - respondo pessoalmente em até
                  24 horas
                </p>
              </CardHeader>

              <CardContent className="pt-4 lg:pt-6">
                <form action={handleSubmit} className="space-y-4 lg:space-y-6">
                  <div className="grid grid-cols-1 gap-4 lg:gap-6 md:grid-cols-2">
                    <div className="space-y-2 lg:space-y-3">
                      <Label
                        htmlFor="name"
                        className="text-sm lg:text-base font-heading font-bold text-white"
                      >
                        SEU NOME *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Como prefere ser chamado?"
                        required
                        disabled={isLoading}
                        className="h-10 lg:h-12 text-sm lg:text-base font-sans transition-all duration-300 focus:scale-[1.02] focus:border-blue-400 border border-slate-700/50 lg:border-2 bg-slate-800/50 backdrop-blur-sm text-white placeholder:text-slate-400 disabled:opacity-50 rounded-lg lg:rounded-xl"
                      />
                      {formErrors.name && (
                        <p className="text-red-400 text-xs lg:text-sm font-sans mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2 lg:space-y-3">
                      <Label
                        htmlFor="email"
                        className="text-sm lg:text-base font-heading font-bold text-white"
                      >
                        SEU EMAIL *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu.melhor@email.com"
                        required
                        disabled={isLoading}
                        className="h-10 lg:h-12 text-sm lg:text-base font-sans transition-all duration-300 focus:scale-[1.02] focus:border-blue-400 border border-slate-700/50 lg:border-2 bg-slate-800/50 backdrop-blur-sm text-white placeholder:text-slate-400 disabled:opacity-50 rounded-lg lg:rounded-xl"
                      />
                      {formErrors.email && (
                        <p className="text-red-400 text-xs lg:text-sm font-sans mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 lg:space-y-3">
                    <Label
                      htmlFor="subject"
                      className="text-sm lg:text-base font-heading font-bold text-white"
                    >
                      ASSUNTO DO PROJETO *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Ex: Site Institucional, App Mobile, Sistema Web..."
                      required
                      disabled={isLoading}
                      className="h-10 lg:h-12 text-sm lg:text-base font-sans transition-all duration-300 focus:scale-[1.02] focus:border-purple-400 border border-slate-700/50 lg:border-2 bg-slate-800/50 backdrop-blur-sm text-white placeholder:text-slate-400 disabled:opacity-50 rounded-lg lg:rounded-xl"
                    />
                    {formErrors.subject && (
                      <p className="text-red-400 text-xs lg:text-sm font-sans mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {formErrors.subject}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 lg:space-y-3">
                    <Label
                      htmlFor="message"
                      className="text-sm lg:text-base font-heading font-bold text-white"
                    >
                      DETALHES DO PROJETO *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Descreva sua visão, objetivos, tecnologias preferidas, prazo estimado e qualquer detalhe relevante..."
                      required
                      disabled={isLoading}
                      className="text-sm lg:text-base font-sans transition-all duration-300 focus:scale-[1.02] focus:border-cyan-400 border border-slate-700/50 lg:border-2 bg-slate-800/50 backdrop-blur-sm text-white placeholder:text-slate-400 resize-none disabled:opacity-50 rounded-lg lg:rounded-xl min-h-[100px] lg:min-h-[140px]"
                    />
                    {formErrors.message && (
                      <p className="text-red-400 text-xs lg:text-sm font-sans mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Estados de Feedback */}
                  {error && (
                    <MotionDiv
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 lg:p-4 bg-red-500/10 border border-red-400/30 lg:border-2 rounded-lg lg:rounded-xl flex items-center space-x-2 lg:space-x-3 backdrop-blur-sm"
                    >
                      <AlertCircle className="h-4 w-4 lg:h-5 lg:w-5 text-red-400 flex-shrink-0" />
                      <p className="text-red-400 text-xs lg:text-sm font-sans font-semibold tracking-wide">
                        {error}
                      </p>
                    </MotionDiv>
                  )}

                  {isSuccess && (
                    <MotionDiv
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 lg:p-4 bg-green-500/10 border border-green-400/30 lg:border-2 rounded-lg lg:rounded-xl flex items-center space-x-2 lg:space-x-3 backdrop-blur-sm"
                    >
                      <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-400 flex-shrink-0" />
                      <div>
                        <p className="text-green-400 text-xs lg:text-sm font-sans font-semibold tracking-wide">
                          MENSAGEM ENVIADA COM SUCESSO!
                        </p>
                        <p className="text-green-400/80 text-xs font-sans mt-1">
                          Entrarei em contato em até 24 horas. Obrigado!
                        </p>
                      </div>
                    </MotionDiv>
                  )}

                  {/* Botão com Loading Intergalático */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 lg:h-14 text-sm lg:text-base font-heading font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg lg:rounded-xl shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border-0 tracking-widest intergalactic-loading"
                  >
                    {/* Conteúdo normal */}
                    <span
                      className={`flex items-center justify-center transition-all duration-300 ${
                        isLoading ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <Send className="mr-2 lg:mr-3 h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform duration-200" />
                      ENVIAR PROPOSTA
                    </span>

                    {/* Loading Intergalático */}
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rocket-container relative">
                          {/* Foguete central */}
                          <Rocket className="h-5 w-5 lg:h-6 lg:w-6 text-cyan-400 animate-rocket-launch" />

                          {/* Satélites orbitais */}
                          <div className="satellite bg-blue-400 animate-satellite-orbit" />
                          <div
                            className="satellite bg-purple-400 animate-satellite-orbit"
                            style={{ animationDelay: "1s" }}
                          />
                          <div
                            className="satellite bg-cyan-400 animate-satellite-orbit"
                            style={{ animationDelay: "2s" }}
                          />
                        </div>

                        {/* Texto animado */}
                        <span className="text-cyan-300 font-mono text-xs lg:text-sm animate-pulse ml-3">
                          TRANSMITINDO...
                        </span>
                      </div>
                    )}

                    {/* Efeitos de brilho durante o loading */}
                    {isLoading && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-cosmic-shimmer rounded-lg lg:rounded-xl" />
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-lg lg:rounded-xl blur opacity-30 animate-nebula-glow" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </MotionDiv>
        </div>

        {/* CTA Final - Premium Responsivo */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 lg:mt-16 px-4 lg:px-0"
        >
          <div className="bg-gradient-to-r from-slate-900/60 to-slate-800/40 backdrop-blur-xl p-6 lg:p-8 rounded-xl lg:rounded-2xl border border-slate-700/50 shadow-2xl relative overflow-hidden text-center">
            <div className="relative z-10">
              <h3 className="text-xl lg:text-2xl font-heading font-black text-white mb-2 lg:mb-3">
                Vamos criar algo extraordinário juntos? 🚀
              </h3>
              <p className="text-slate-300 font-sans text-sm lg:text-lg mb-4 lg:mb-6 max-w-2xl mx-auto">
                Cada grande projeto começa com uma simples conversa. Estou
                ansioso para ouvir suas ideias e transformá-las em realidade.
              </p>

              <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                <div className="flex items-center space-x-2 text-slate-400 justify-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-xs lg:text-sm font-mono">
                    Resposta Rápida
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 justify-center">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-200" />
                  <span className="text-xs lg:text-sm font-mono">
                    Orçamento Sem Compromisso
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 justify-center">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse delay-400" />
                  <span className="text-xs lg:text-sm font-mono">
                    Consultoria Gratuita
                  </span>
                </div>
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};
