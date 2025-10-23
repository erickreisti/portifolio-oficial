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
} from "lucide-react";
import { useState } from "react";

import MotionDiv from "@/components/ui/MotionDiv";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Contact = () => {
  // Estados para controlar loading, sucesso e erro
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Envia os dados para a API
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

      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar mensagem");
      }

      // Mostra mensagem de sucesso
      setIsSuccess(true);

      // Reseta o formulário após 5 segundos
      setTimeout(() => {
        const form = document.querySelector("form") as HTMLFormElement;
        form?.reset();
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      // Mostra mensagem de erro
      setError(err instanceof Error ? err.message : "Erro ao enviar mensagem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
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
      <div className="absolute top-10 right-10 opacity-5">
        <Binary className="h-32 w-32 text-blue-400" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-5">
        <CircuitBoard className="h-32 w-32 text-cyan-400" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header da Seção - Estilo Tech */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center text-sm font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-6 py-3 rounded-full border border-blue-400/30 mb-6 neon-pulse">
            <MessageCircle className="h-4 w-4 mr-3" />
            VAMOS CONVERSAR
          </div>
          <h2 className="text-4xl font-heading font-black text-white sm:text-5xl lg:text-6xl">
            VAMOS{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              TRABALHAR JUNTOS
            </span>
          </h2>
          <p className="text-xl text-slate-300 mt-6 max-w-2xl mx-auto font-mono tracking-wide">
            Pronto para transformar suas ideias em realidade? Vamos conversar
            sobre seu projeto.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Coluna de informações de contato */}
          <MotionDiv
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Card className="h-full bg-slate-900/50 backdrop-blur-xl border-2 border-blue-400/20 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 group relative overflow-hidden">
              {/* Efeito de brilho no card */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              <CardHeader className="pb-6 border-b border-slate-700/50">
                <CardTitle className="text-2xl font-heading font-black text-blue-400 flex items-center neon-pulse">
                  <Cpu className="h-6 w-6 mr-3" />
                  INFORMAÇÕES
                </CardTitle>
                <p className="text-slate-400 text-sm mt-2 font-mono tracking-wide">
                  Entre em contato por qualquer um dos canais
                </p>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <p className="text-lg text-slate-300 leading-relaxed font-sans">
                  Estou sempre aberto a novas oportunidades, desafios e
                  parcerias. Vamos criar algo incrível juntos!
                </p>

                <div className="space-y-6 pt-4">
                  <div className="flex items-start space-x-4 group p-4 rounded-xl hover:bg-blue-500/10 transition-all duration-300 border border-transparent hover:border-blue-400/20">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300 border border-blue-400/20 flex-shrink-0">
                      <Mail className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                        EMAIL
                      </p>
                      <p className="text-slate-400 text-sm mt-1 font-mono tracking-wide">
                        erickreisti@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 group p-4 rounded-xl hover:bg-cyan-500/10 transition-all duration-300 border border-transparent hover:border-cyan-400/20">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300 border border-cyan-400/20 flex-shrink-0">
                      <MapPin className="h-5 w-5 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                        LOCALIZAÇÃO
                      </p>
                      <p className="text-slate-400 text-sm mt-1 font-mono tracking-wide">
                        Rio de Janeiro, Brasil
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </MotionDiv>

          {/* Coluna do formulário de contato */}
          <MotionDiv
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="h-full bg-slate-900/50 backdrop-blur-xl border-2 border-purple-400/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105 group relative overflow-hidden">
              {/* Efeito de brilho no card */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              <CardHeader className="pb-6 border-b border-slate-700/50">
                <CardTitle className="text-2xl font-heading font-black text-purple-400 flex items-center neon-pulse">
                  <Send className="h-6 w-6 mr-3" />
                  ENVIE SUA MENSAGEM
                </CardTitle>
                <p className="text-slate-400 text-sm mt-2 font-mono tracking-wide">
                  Respondo todas as mensagens em até 24 horas
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <form action={handleSubmit} className="space-y-6">
                  {/* Campos de nome e email */}
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
                        placeholder="João Silva"
                        required
                        disabled={isLoading}
                        className="h-12 text-base font-sans transition-all duration-300 focus:scale-[1.02] focus:border-blue-400 border-2 border-slate-700/50 bg-slate-800/50 backdrop-blur-sm text-white placeholder:text-slate-400 disabled:opacity-50 rounded-xl"
                      />
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
                        placeholder="contato@exemplo.com"
                        required
                        disabled={isLoading}
                        className="h-12 text-base font-sans transition-all duration-300 focus:scale-[1.02] focus:border-blue-400 border-2 border-slate-700/50 bg-slate-800/50 backdrop-blur-sm text-white placeholder:text-slate-400 disabled:opacity-50 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Campo de assunto */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="subject"
                      className="text-base font-heading font-bold text-white"
                    >
                      ASSUNTO *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Proposta de Projeto / Oportunidade"
                      required
                      disabled={isLoading}
                      className="h-12 text-base font-sans transition-all duration-300 focus:scale-[1.02] focus:border-purple-400 border-2 border-slate-700/50 bg-slate-800/50 backdrop-blur-sm text-white placeholder:text-slate-400 disabled:opacity-50 rounded-xl"
                    />
                  </div>

                  {/* Campo de mensagem */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="message"
                      className="text-base font-heading font-bold text-white"
                    >
                      MENSAGEM *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Descreva seu projeto, ideia ou oportunidade em detalhes..."
                      required
                      disabled={isLoading}
                      className="text-base font-sans transition-all duration-300 focus:scale-[1.02] focus:border-cyan-400 border-2 border-slate-700/50 bg-slate-800/50 backdrop-blur-sm text-white placeholder:text-slate-400 resize-none disabled:opacity-50 rounded-xl min-h-[120px]"
                    />
                  </div>

                  {/* Mensagem de erro */}
                  {error && (
                    <MotionDiv
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/10 border-2 border-red-400/30 rounded-xl flex items-center space-x-3 backdrop-blur-sm"
                    >
                      <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                      <p className="text-red-400 text-sm font-mono font-bold tracking-wide">
                        {error}
                      </p>
                    </MotionDiv>
                  )}

                  {/* Mensagem de sucesso */}
                  {isSuccess && (
                    <MotionDiv
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-500/10 border-2 border-green-400/30 rounded-xl flex items-center space-x-3 backdrop-blur-sm"
                    >
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <p className="text-green-400 text-sm font-mono font-bold tracking-wide">
                        MENSAGEM ENVIADA COM SUCESSO! ENTRAREI EM CONTATO EM
                        BREVE.
                      </p>
                    </MotionDiv>
                  )}

                  {/* Botão de envio */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 text-base font-mono font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:scale-105 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border-0 pulse-glow tracking-widest"
                  >
                    <span
                      className={`flex items-center transition-all duration-300 ${
                        isLoading ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <Send className="mr-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                      {isLoading ? "ENVIANDO..." : "ENVIAR MENSAGEM"}
                    </span>

                    {/* Spinner de loading */}
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="h-5 w-5 animate-spin" />
                      </div>
                    )}

                    {/* Efeito de hover animado */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </MotionDiv>
        </div>

        {/* CTA Final - Estilo Tech */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-slate-900/30 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-2xl max-w-2xl mx-auto">
            <p className="text-lg text-slate-300 font-mono tracking-wide mb-4">
              Não encontrou o que procurava?{" "}
              <span className="text-blue-400 font-heading font-bold neon-pulse">
                ESTOU SEMPRE DISPONÍVEL PARA UMA CONVERSA!
              </span>
            </p>
            <div className="flex justify-center space-x-4">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200" />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-400" />
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};
