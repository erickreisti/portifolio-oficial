"use client";

import {
  Send,
  Mail,
  MapPin,
  Loader2,
  CheckCircle,
  AlertCircle,
  MessageCircle,
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
      className="py-20 lg:py-32 bg-gradient-to-br from-background via-blue-50/20 to-background dark:from-background dark:via-blue-950/10 dark:to-background border-t border-border relative overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-10 right-10 opacity-5">
        <MessageCircle className="h-32 w-32 text-primary-default" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header da Seção */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center text-sm font-semibold uppercase tracking-widest text-primary-default bg-primary-default/10 px-4 py-2 rounded-full border border-primary-default/20 mb-4">
            <MessageCircle className="h-4 w-4 mr-2" />
            Vamos Conversar
          </div>
          <h2 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
            Vamos{" "}
            <span className="text-primary-default bg-gradient-to-r from-primary-default to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
              Trabalhar Juntos
            </span>
          </h2>
          <p className="text-xl text-foreground/70 mt-6 max-w-2xl mx-auto">
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
            <Card className="h-full bg-background/80 backdrop-blur-sm border-2 border-primary-default/20 shadow-2xl hover:shadow-primary-default/20 transition-all duration-500 hover:scale-105">
              <CardHeader className="pb-4 border-b border-border/50">
                <CardTitle className="text-2xl font-bold text-primary-default flex items-center">
                  <Mail className="h-6 w-6 mr-3" />
                  Informações
                </CardTitle>
                <p className="text-foreground/60 text-sm mt-2">
                  Entre em contato por qualquer um dos canais
                </p>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <p className="text-lg text-foreground/80 leading-relaxed">
                  Estou sempre aberto a novas oportunidades, desafios e
                  parcerias. Vamos criar algo incrível juntos!
                </p>

                <div className="space-y-6 pt-4">
                  <div className="flex items-start space-x-4 group p-3 rounded-lg hover:bg-primary-default/5 transition-all duration-300">
                    <div className="h-10 w-10 rounded-full bg-primary-default/10 flex items-center justify-center group-hover:bg-primary-default/20 transition-colors duration-300 flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary-default" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-primary-default transition-colors duration-300">
                        Email
                      </p>
                      <p className="text-foreground/70 text-sm mt-1">
                        erickreisti@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 group p-3 rounded-lg hover:bg-primary-default/5 transition-all duration-300">
                    <div className="h-10 w-10 rounded-full bg-primary-default/10 flex items-center justify-center group-hover:bg-primary-default/20 transition-colors duration-300 flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary-default" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-primary-default transition-colors duration-300">
                        Localização
                      </p>
                      <p className="text-foreground/70 text-sm mt-1">
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
            <Card className="h-full bg-background/80 backdrop-blur-sm border-2 border-primary-default/20 shadow-2xl hover:shadow-primary-default/20 transition-all duration-500 hover:scale-105">
              <CardHeader className="pb-4 border-b border-border/50">
                <CardTitle className="text-2xl font-bold text-primary-default flex items-center">
                  <Send className="h-6 w-6 mr-3" />
                  Envie sua Mensagem
                </CardTitle>
                <p className="text-foreground/60 text-sm mt-2">
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
                        className="text-base font-semibold text-foreground"
                      >
                        Seu Nome *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="João Silva"
                        required
                        disabled={isLoading}
                        className="h-12 text-base transition-all duration-300 focus:scale-[1.02] focus:border-primary-default border-2 disabled:opacity-50 bg-background/50"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label
                        htmlFor="email"
                        className="text-base font-semibold text-foreground"
                      >
                        Seu Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="contato@exemplo.com"
                        required
                        disabled={isLoading}
                        className="h-12 text-base transition-all duration-300 focus:scale-[1.02] focus:border-primary-default border-2 disabled:opacity-50 bg-background/50"
                      />
                    </div>
                  </div>

                  {/* Campo de assunto */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="subject"
                      className="text-base font-semibold text-foreground"
                    >
                      Assunto *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Proposta de Projeto / Oportunidade"
                      required
                      disabled={isLoading}
                      className="h-12 text-base transition-all duration-300 focus:scale-[1.02] focus:border-primary-default border-2 disabled:opacity-50 bg-background/50"
                    />
                  </div>

                  {/* Campo de mensagem */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="message"
                      className="text-base font-semibold text-foreground"
                    >
                      Mensagem *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Descreva seu projeto, ideia ou oportunidade em detalhes..."
                      required
                      disabled={isLoading}
                      className="text-base transition-all duration-300 focus:scale-[1.02] focus:border-primary-default border-2 resize-none disabled:opacity-50 bg-background/50 min-h-[120px]"
                    />
                  </div>

                  {/* Mensagem de erro */}
                  {error && (
                    <MotionDiv
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-destructive/10 border-2 border-destructive/20 rounded-xl flex items-center space-x-3"
                    >
                      <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                      <p className="text-destructive text-sm font-medium">
                        {error}
                      </p>
                    </MotionDiv>
                  )}

                  {/* Mensagem de sucesso */}
                  {isSuccess && (
                    <MotionDiv
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-500/10 border-2 border-green-500/20 rounded-xl flex items-center space-x-3"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <p className="text-green-500 text-sm font-medium">
                        Mensagem enviada com sucesso! Entrarei em contato em
                        breve.
                      </p>
                    </MotionDiv>
                  )}

                  {/* Botão de envio */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 text-base font-semibold bg-primary-default hover:bg-primary-default/90 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border-2 border-primary-default/20"
                  >
                    <span
                      className={`flex items-center transition-all duration-300 ${
                        isLoading ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <Send className="mr-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                      {isLoading ? "Enviando..." : "Enviar Mensagem"}
                    </span>

                    {/* Spinner de loading */}
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="h-5 w-5 animate-spin" />
                      </div>
                    )}

                    {/* Efeito de hover animado */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </MotionDiv>
        </div>

        {/* CTA Final */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Não encontrou o que procurava?{" "}
            <span className="text-primary-default font-semibold">
              Estou sempre disponível para uma conversa!
            </span>
          </p>
        </MotionDiv>
      </div>
    </section>
  );
};
