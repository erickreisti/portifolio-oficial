"use client";

import {
  Send,
  Mail,
  MapPin,
  Loader2,
  CheckCircle,
  AlertCircle,
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
      className="py-20 lg:py-32 bg-background border-t border-card"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Título da seção */}
        <h2 className="text-4xl font-extrabold text-foreground sm:text-5xl text-center mb-16">
          Vamos <span className="text-primary-default">Trabalhar Juntos</span>
        </h2>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Coluna de informações de contato */}
          <MotionDiv
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Card className="h-full border-primary-default/20 bg-card shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-primary-default">
                  📧 Detalhes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-foreground/80">
                <p className="text-lg">
                  Estou sempre aberto a novas oportunidades e desafios. Vamos
                  conversar!
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center space-x-3 group">
                    <Mail className="h-6 w-6 text-primary-default flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                    <p className="font-semibold group-hover:text-primary-default transition-colors duration-200">
                      erickreisti@gmail.com
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <MapPin className="h-6 w-6 text-primary-default flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                    <p className="font-semibold group-hover:text-primary-default transition-colors duration-200">
                      Rio de Janeiro, Brasil
                    </p>
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
            <Card className="h-full border-primary-default/20 bg-card shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-primary-default">
                  💬 Envie sua Mensagem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form action={handleSubmit} className="space-y-6">
                  {/* Campos de nome e email */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Seu Nome *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="João Silva"
                        required
                        disabled={isLoading}
                        className="transition-all duration-200 focus:scale-[1.02] focus:border-primary-default disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Seu Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="contato@exemplo.com"
                        required
                        disabled={isLoading}
                        className="transition-all duration-200 focus:scale-[1.02] focus:border-primary-default disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Campo de assunto */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Proposta de Projeto / Vaga"
                      required
                      disabled={isLoading}
                      className="transition-all duration-200 focus:scale-[1.02] focus:border-primary-default disabled:opacity-50"
                    />
                  </div>

                  {/* Campo de mensagem */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Descreva o projeto ou a oportunidade..."
                      required
                      disabled={isLoading}
                      className="transition-all duration-200 focus:scale-[1.02] focus:border-primary-default resize-none disabled:opacity-50"
                    />
                  </div>

                  {/* Mensagem de erro */}
                  {error && (
                    <MotionDiv
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center space-x-3"
                    >
                      <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                      <p className="text-destructive text-sm">{error}</p>
                    </MotionDiv>
                  )}

                  {/* Mensagem de sucesso */}
                  {isSuccess && (
                    <MotionDiv
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <p className="text-green-500 text-sm">
                        ✅ Mensagem enviada com sucesso! Entrarei em contato em
                        breve.
                      </p>
                    </MotionDiv>
                  )}

                  {/* Botão de envio */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full text-base font-semibold h-12 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span
                      className={`flex items-center transition-all duration-300 ${
                        isLoading ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                      {isLoading ? "Enviando..." : "Enviar Mensagem"}
                    </span>

                    {/* Spinner de loading */}
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="h-5 w-5 animate-spin" />
                      </div>
                    )}

                    {/* Efeito de hover animado */}
                    <div className="absolute inset-0 bg-primary-default/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};
