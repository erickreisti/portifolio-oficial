"use client";

import {
  Send,
  Mail,
  MapPin,
  Loader2,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Cpu,
  CircuitBoard,
  Binary,
  Sparkles,
  Phone,
  Globe,
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
      className="py-20 lg:py-32 bg-slate-950 relative overflow-hidden border-t border-slate-800/50"
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

      {/* Partículas de Fundo */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${Math.random() * 10 + 8}s`,
            }}
          />
        ))}
      </div>

      {/* Elementos Decorativos */}
      <div className="absolute top-10 right-10 opacity-5 animate-float-slow">
        <Binary className="h-32 w-32 text-blue-400" />
      </div>
      <div
        className="absolute bottom-10 left-10 opacity-5 animate-float-slow"
        style={{ animationDelay: "3s" }}
      >
        <CircuitBoard className="h-32 w-32 text-cyan-400" />
      </div>
      <div
        className="absolute top-20 left-20 opacity-5 animate-float-slow"
        style={{ animationDelay: "6s" }}
      >
        <Globe className="h-24 w-24 text-purple-400" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header da Seção - Premium */}
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
            <MessageCircle className="h-4 w-4 mr-3 animate-pulse" />
            CONEXÃO TECH
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl font-heading font-black text-white sm:text-5xl lg:text-6xl mt-4">
              VAMOS CRIAR{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                JUNTOS
              </span>
            </h1>
            <p className="text-xl text-slate-300 mt-6 max-w-3xl mx-auto font-sans leading-relaxed">
              Pronto para transformar sua visão em realidade? Vamos conversar
              sobre seu projeto e criar algo extraordinário
            </p>
          </MotionDiv>
        </MotionDiv>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Informações de Contato - Premium */}
          <MotionDiv
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-1"
          >
            <Card className="h-full bg-slate-900/60 backdrop-blur-xl border-2 border-blue-400/20 shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:scale-105 group relative overflow-hidden glass-premium">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              <CardHeader className="pb-6 border-b border-slate-700/50">
                <CardTitle className="text-2xl font-heading font-black text-blue-400 flex items-center">
                  <Cpu className="h-6 w-6 mr-3" />
                  CONECTE-SE
                </CardTitle>
                <p className="text-slate-300 text-sm mt-2 font-sans leading-relaxed">
                  Estou sempre disponível para novas oportunidades, desafios
                  inspiradores e parcerias inovadoras
                </p>
              </CardHeader>

              <CardContent className="space-y-6 pt-6">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 group p-4 rounded-xl hover:bg-blue-500/10 transition-all duration-300 border border-transparent hover:border-blue-400/30 cursor-pointer">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300 border border-blue-400/30 flex-shrink-0">
                      <Mail className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                        EMAIL PRINCIPAL
                      </p>
                      <p className="text-slate-300 text-sm mt-1 font-mono tracking-wide group-hover:text-slate-200 transition-colors duration-300">
                        erickreisti@gmail.com
                      </p>
                      <p className="text-slate-400 text-xs mt-1 font-sans">
                        Resposta em até 24 horas
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group p-4 rounded-xl hover:bg-cyan-500/10 transition-all duration-300 border border-transparent hover:border-cyan-400/30 cursor-pointer">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300 border border-cyan-400/30 flex-shrink-0">
                      <MapPin className="h-5 w-5 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                        LOCALIZAÇÃO
                      </p>
                      <p className="text-slate-300 text-sm mt-1 font-mono tracking-wide group-hover:text-slate-200 transition-colors duration-300">
                        Rio de Janeiro, Brasil
                      </p>
                      <p className="text-slate-400 text-xs mt-1 font-sans">
                        Disponível para projetos globais
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group p-4 rounded-xl hover:bg-purple-500/10 transition-all duration-300 border border-transparent hover:border-purple-400/30 cursor-pointer">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300 border border-purple-400/30 flex-shrink-0">
                      <Phone className="h-5 w-5 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                        DISPONIBILIDADE
                      </p>
                      <p className="text-slate-300 text-sm mt-1 font-mono tracking-wide group-hover:text-slate-200 transition-colors duration-300">
                        Flexível & Comprometido
                      </p>
                      <p className="text-slate-400 text-xs mt-1 font-sans">
                        Projetos de qualquer escala
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/50">
                  <p className="text-slate-300 text-sm font-sans leading-relaxed">
                    <Sparkles className="h-4 w-4 text-blue-400 inline mr-2" />
                    Vamos transformar suas ideias em soluções digitais
                    extraordinárias com tecnologia de ponta e criatividade.
                  </p>
                </div>
              </CardContent>
            </Card>
          </MotionDiv>

          {/* Formulário de Contato - Premium */}
          <MotionDiv
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="h-full bg-slate-900/60 backdrop-blur-xl border-2 border-purple-400/20 shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:scale-105 group relative overflow-hidden glass-premium">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              <CardHeader className="pb-6 border-b border-slate-700/50">
                <CardTitle className="text-2xl font-heading font-black text-purple-400 flex items-center">
                  <Send className="h-6 w-6 mr-3" />
                  MENSAGEM RÁPIDA
                </CardTitle>
                <p className="text-slate-300 text-sm mt-2 font-sans leading-relaxed">
                  Descreva seu projeto ou ideia - respondo pessoalmente em até
                  24 horas
                </p>
              </CardHeader>

              <CardContent className="pt-6">
                <form action={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                      <Label
                        htmlFor="name"
                        className="text-base font-heading font-bold text-white"
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
                        className="h-12 text-base font-sans transition-all duration-300 focus:scale-[1.02] focus:border-blue-400 border-2 border-slate-700/50 bg-slate-800/50 backdrop-blur-sm text-white placeholder:text-slate-400 disabled:opacity-50 rounded-xl"
                      />
                      {formErrors.name && (
                        <p className="text-red-400 text-sm font-sans mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-3">
                      <Label
                        htmlFor="email"
                        className="text-base font-heading font-bold text-white"
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
                        className="h-12 text-base font-sans transition-all duration-300 focus:scale-[1.02] focus:border-blue-400 border-2 border-slate-700/50 bg-slate-800/50 backdrop-blur-sm text-white placeholder:text-slate-400 disabled:opacity-50 rounded-xl"
                      />
                      {formErrors.email && (
                        <p className="text-red-400 text-sm font-sans mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="subject"
                      className="text-base font-heading font-bold text-white"
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
                      className="h-12 text-base font-sans transition-all duration-300 focus:scale-[1.02] focus:border-purple-400 border-2 border-slate-700/50 bg-slate-800/50 backdrop-blur-sm text-white placeholder:text-slate-400 disabled:opacity-50 rounded-xl"
                    />
                    {formErrors.subject && (
                      <p className="text-red-400 text-sm font-sans mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {formErrors.subject}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="message"
                      className="text-base font-heading font-bold text-white"
                    >
                      DETALHES DO PROJETO *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Descreva sua visão, objetivos, tecnologias preferidas, prazo estimado e qualquer detalhe relevante..."
                      required
                      disabled={isLoading}
                      className="text-base font-sans transition-all duration-300 focus:scale-[1.02] focus:border-cyan-400 border-2 border-slate-700/50 bg-slate-800/50 backdrop-blur-sm text-white placeholder:text-slate-400 resize-none disabled:opacity-50 rounded-xl min-h-[140px]"
                    />
                    {formErrors.message && (
                      <p className="text-red-400 text-sm font-sans mt-1 flex items-center">
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
                      className="p-4 bg-red-500/10 border-2 border-red-400/30 rounded-xl flex items-center space-x-3 backdrop-blur-sm"
                    >
                      <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                      <p className="text-red-400 text-sm font-sans font-semibold tracking-wide">
                        {error}
                      </p>
                    </MotionDiv>
                  )}

                  {isSuccess && (
                    <MotionDiv
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-500/10 border-2 border-green-400/30 rounded-xl flex items-center space-x-3 backdrop-blur-sm"
                    >
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <div>
                        <p className="text-green-400 text-sm font-sans font-semibold tracking-wide">
                          MENSAGEM ENVIADA COM SUCESSO!
                        </p>
                        <p className="text-green-400/80 text-xs font-sans mt-1">
                          Entrarei em contato em até 24 horas. Obrigado!
                        </p>
                      </div>
                    </MotionDiv>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 text-base font-heading font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border-0 tracking-widest"
                  >
                    <span
                      className={`flex items-center justify-center transition-all duration-300 ${
                        isLoading ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <Send className="mr-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                      {isLoading ? "ENVIANDO MENSAGEM..." : "ENVIAR PROPOSTA"}
                    </span>

                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="h-5 w-5 animate-spin" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </MotionDiv>
        </div>

        {/* CTA Final - Premium */}
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-slate-900/60 to-slate-800/40 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-2xl relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <h3 className="text-2xl font-heading font-black text-white mb-3">
                Vamos criar algo extraordinário juntos? 🚀
              </h3>
              <p className="text-slate-300 font-sans text-lg mb-6 max-w-2xl mx-auto">
                Cada grande projeto começa com uma simples conversa. Estou
                ansioso para ouvir suas ideias e transformá-las em realidade.
              </p>

              <div className="flex justify-center space-x-6">
                <div className="flex items-center space-x-2 text-slate-400">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-sm font-mono">Resposta Rápida</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200" />
                  <span className="text-sm font-mono">
                    Orçamento Sem Compromisso
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-400" />
                  <span className="text-sm font-mono">
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
