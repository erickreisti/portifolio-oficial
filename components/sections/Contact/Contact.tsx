// components/sections/Contact/Contact.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import {
  Send,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Cpu,
  Sparkles,
  Phone,
  Globe,
  Rocket,
  Zap,
  Code2,
  Server,
  Database,
  Cloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import styles from "./Contact.module.css";

export const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const sectionRef = useRef<HTMLDivElement>(null);
  const neonElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      // Animação dos elementos neon
      const neonElements = neonElementsRef.current.filter(Boolean);
      gsap.fromTo(
        neonElements,
        {
          opacity: 0,
          scale: 0,
          y: 100,
          rotation: -180,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 1.5,
          ease: "back.out(1.7)",
          stagger: 0.15,
        }
      );

      // Animações flutuantes contínuas
      neonElements.forEach((element, index) => {
        gsap.to(element, {
          y: -20 - index * 5,
          rotation: index % 2 === 0 ? 10 : -10,
          duration: 3 + index,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.3,
        });
      });

      // Pulsação neon
      gsap.to(".neon-contact", {
        filter: "drop-shadow(0 0 15px currentColor) brightness(1.3)",
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  const setNeonElementRef = (index: number) => (el: HTMLDivElement | null) => {
    neonElementsRef.current[index] = el;
  };

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
      ref={sectionRef}
      className="relative min-h-screen bg-gray-950 overflow-hidden border-t border-gray-800/50"
    >
      {/* Background com gradientes animados */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 15% 25%, rgba(59, 130, 246, 0.25) 0%, transparent 60%),
              radial-gradient(circle at 85% 15%, rgba(139, 92, 246, 0.2) 0%, transparent 60%),
              radial-gradient(circle at 45% 75%, rgba(16, 185, 129, 0.15) 0%, transparent 60%),
              radial-gradient(circle at 75% 85%, rgba(245, 158, 11, 0.1) 0%, transparent 60%),
              radial-gradient(circle at 25% 45%, rgba(239, 68, 68, 0.1) 0%, transparent 60%),
              linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)
            `,
          }}
        />

        {/* Elementos de fundo animados */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/5 w-64 h-64 bg-purple-500/08 rounded-full filter blur-3xl"
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Elementos Neon Flutuantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[MessageCircle, Send, Mail, MapPin, Phone, Rocket, Code2, Cloud].map(
          (Icon, index) => (
            <motion.div
              key={index}
              ref={setNeonElementRef(index)}
              className={`absolute ${styles.neonGlow} neon-contact ${
                index === 0
                  ? "top-20 left-20"
                  : index === 1
                  ? "top-32 right-24"
                  : index === 2
                  ? "bottom-40 left-24"
                  : index === 3
                  ? "bottom-32 right-20"
                  : index === 4
                  ? "top-40 right-16"
                  : index === 5
                  ? "bottom-48 left-16"
                  : index === 6
                  ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  : "top-1/3 left-1/4"
              }`}
            >
              <Icon
                className={`
              ${
                index === 0
                  ? "text-cyan-400 text-3xl"
                  : index === 1
                  ? "text-purple-400 text-3xl"
                  : index === 2
                  ? "text-green-400 text-2xl"
                  : index === 3
                  ? "text-amber-400 text-2xl"
                  : index === 4
                  ? "text-blue-400 text-xl"
                  : index === 5
                  ? "text-emerald-400 text-xl"
                  : index === 6
                  ? "text-indigo-400 text-2xl"
                  : "text-rose-400 text-xl"
              }
            `}
              />
            </motion.div>
          )
        )}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16 lg:mb-24"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center text-blue-400 bg-blue-500/10 border border-blue-400/30 px-4 py-2 rounded-full text-sm lg:text-base font-mono font-bold mb-6 lg:mb-8"
          >
            <MessageCircle className="w-4 h-4 lg:w-5 lg:h-5 mr-2 animate-pulse" />
            CONEXÃO TECH
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black text-white mb-4 lg:mb-6">
              VAMOS CRIAR{" "}
              <span
                className={`bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent ${styles.animateGradient}`}
              >
                JUNTOS
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Pronto para transformar sua visão em realidade? Vamos conversar
              sobre seu projeto e criar algo extraordinário
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16 lg:mb-24">
          {/* Informações de Contato */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full"
          >
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 shadow-2xl hover:shadow-3xl hover:border-blue-400/30 transition-all duration-500 group h-full hover:scale-105">
              <CardHeader className="pb-6 border-b border-gray-700/50">
                <CardTitle className="text-xl lg:text-2xl font-black text-blue-400 flex items-center">
                  <Cpu className="w-6 h-6 mr-3" />
                  CONECTE-SE
                </CardTitle>
                <p className="text-sm lg:text-base text-gray-400">
                  Estou sempre disponível para novas oportunidades, desafios
                  inspiradores e parcerias inovadoras
                </p>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-700/50 hover:border-blue-400/30 transition-all duration-300 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 flex items-center justify-center border border-blue-400/30 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white mb-1">
                        EMAIL PRINCIPAL
                      </p>
                      <p className="text-sm text-gray-300 font-mono">
                        erickreisti@gmail.com
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Resposta em até 24 horas
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-700/50 hover:border-cyan-400/30 transition-all duration-300 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-400/20 flex items-center justify-center border border-cyan-400/30 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white mb-1">
                        LOCALIZAÇÃO
                      </p>
                      <p className="text-sm text-gray-300">
                        Rio de Janeiro, Brasil
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Disponível para projetos globais
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-700/50 hover:border-purple-400/30 transition-all duration-300 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 flex items-center justify-center border border-purple-400/30 group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white mb-1">
                        DISPONIBILIDADE
                      </p>
                      <p className="text-sm text-gray-300">
                        Flexível & Comprometido
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Projetos de qualquer escala
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700/50">
                  <p className="text-sm text-gray-400 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    Vamos transformar suas ideias em soluções digitais
                    extraordinárias com tecnologia de ponta e criatividade.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Formulário de Contato */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full"
          >
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 shadow-2xl hover:shadow-3xl hover:border-purple-400/30 transition-all duration-500 group h-full hover:scale-105">
              <CardHeader className="pb-6 border-b border-gray-700/50">
                <CardTitle className="text-xl lg:text-2xl font-black text-purple-400 flex items-center">
                  <Send className="w-6 h-6 mr-3" />
                  MENSAGEM RÁPIDA
                </CardTitle>
                <p className="text-sm lg:text-base text-gray-400">
                  Descreva seu projeto ou ideia - respondo pessoalmente em até
                  24 horas
                </p>
              </CardHeader>

              <CardContent className="pt-6">
                <form action={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-sm font-bold text-white"
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
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-blue-400 focus:ring-blue-400"
                      />
                      {formErrors.name && (
                        <p className="text-red-400 text-xs flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-bold text-white"
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
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-blue-400 focus:ring-blue-400"
                      />
                      {formErrors.email && (
                        <p className="text-red-400 text-xs flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="subject"
                      className="text-sm font-bold text-white"
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
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-blue-400 focus:ring-blue-400"
                    />
                    {formErrors.subject && (
                      <p className="text-red-400 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.subject}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-sm font-bold text-white"
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
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-blue-400 focus:ring-blue-400 resize-none"
                    />
                    {formErrors.message && (
                      <p className="text-red-400 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Estados de Feedback */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-red-400 text-sm">{error}</p>
                    </motion.div>
                  )}

                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-green-400 text-sm font-bold">
                          MENSAGEM ENVIADA COM SUCESSO!
                        </p>
                        <p className="text-green-400/80 text-xs mt-1">
                          Entrarei em contato em até 24 horas. Obrigado!
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {!isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        ENVIAR PROPOSTA
                      </span>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                        <span className="text-cyan-400 font-mono">
                          ENVIANDO...
                        </span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gray-900/60 to-gray-800/40 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-gray-700/50 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-black text-white mb-4">
                Vamos criar algo extraordinário juntos? 🚀
              </h3>
              <p className="text-lg lg:text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
                Cada grande projeto começa com uma simples conversa. Estou
                ansioso para ouvir suas ideias e transformá-las em realidade.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-400 font-mono">
                    Resposta Rápida
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-400 font-mono">
                    Orçamento Sem Compromisso
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-400 font-mono">
                    Consultoria Gratuita
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
