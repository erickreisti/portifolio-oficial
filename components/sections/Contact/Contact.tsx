// components/sections/Contact/Contact.tsx (BLASTER PREMIUM ABSOLUTO COMPLETO)
"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
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
  Rocket,
  Code2,
  Cloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Configuração centralizada para escalabilidade
const NEON_ELEMENTS_CONFIG = [
  {
    Icon: MessageCircle,
    position: "top-20 left-20",
    color: "text-cyan-400",
    size: "text-3xl",
  },
  {
    Icon: Send,
    position: "top-32 right-24",
    color: "text-purple-400",
    size: "text-3xl",
  },
  {
    Icon: Mail,
    position: "bottom-40 left-24",
    color: "text-green-400",
    size: "text-2xl",
  },
  {
    Icon: MapPin,
    position: "bottom-32 right-20",
    color: "text-amber-400",
    size: "text-2xl",
  },
  {
    Icon: Phone,
    position: "top-40 right-16",
    color: "text-blue-400",
    size: "text-xl",
  },
  {
    Icon: Rocket,
    position: "bottom-48 left-16",
    color: "text-emerald-400",
    size: "text-xl",
  },
  {
    Icon: Code2,
    position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    color: "text-indigo-400",
    size: "text-2xl",
  },
  {
    Icon: Cloud,
    position: "top-1/3 left-1/4",
    color: "text-rose-400",
    size: "text-xl",
  },
] as const;

const CONTACT_INFO = [
  {
    icon: Mail,
    title: "EMAIL PRINCIPAL",
    content: "erickreisti@gmail.com",
    description: "Resposta em até 24 horas",
    color: "blue",
    gradient: "from-blue-400/20 to-cyan-400/20",
    border: "border-blue-400/30",
  },
  {
    icon: MapPin,
    title: "LOCALIZAÇÃO",
    content: "Rio de Janeiro, Brasil",
    description: "Disponível para projetos globais",
    color: "cyan",
    gradient: "from-cyan-400/20 to-blue-400/20",
    border: "border-cyan-400/30",
  },
  {
    icon: Phone,
    title: "DISPONIBILIDADE",
    content: "Flexível & Comprometido",
    description: "Projetos de qualquer escala",
    color: "purple",
    gradient: "from-purple-400/20 to-pink-400/20",
    border: "border-purple-400/30",
  },
];

export const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const sectionRef = useRef<HTMLDivElement>(null);
  const neonElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  // Animação otimizada com cleanup
  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      const neonElements = neonElementsRef.current.filter(Boolean);

      // Entrada inicial
      gsap.fromTo(
        neonElements,
        { opacity: 0, scale: 0, y: 100, rotation: -180 },
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

      // Animações flutuantes com controle
      neonElements.forEach((element, index) => {
        if (!element) return;

        gsap.to(element, {
          y: -15 - index * 3,
          rotation: index % 2 === 0 ? 8 : -8,
          duration: 4 + index,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.5,
        });
      });

      // Pulsação suave
      gsap.to(".neon-contact", {
        filter: "drop-shadow(0 0 12px currentColor) brightness(1.2)",
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.8,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView, shouldReduceMotion]);

  const setNeonElementRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      neonElementsRef.current[index] = el;
    },
    []
  );

  // Validação otimizada
  const validateForm = useCallback((formData: FormData) => {
    const errors: Record<string, string> = {};
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!name?.trim() || name.trim().length < 2) {
      errors.name = "Nome deve ter pelo menos 2 caracteres";
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Por favor, insira um email válido";
    }

    if (!subject?.trim() || subject.trim().length < 5) {
      errors.subject = "Assunto deve ter pelo menos 5 caracteres";
    }

    if (!message?.trim() || message.trim().length < 10) {
      errors.message = "Mensagem deve ter pelo menos 10 caracteres";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, []);

  // Submit handler otimizado
  const handleSubmit = useCallback(
    async (formData: FormData) => {
      if (!validateForm(formData)) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
          const form = document.querySelector("form");
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
    },
    [validateForm]
  );

  // Memoized elements para performance
  const neonElements = useMemo(
    () =>
      NEON_ELEMENTS_CONFIG.map(({ Icon, position, color, size }, index) => (
        <motion.div
          key={index}
          ref={setNeonElementRef(index)}
          className={`absolute ${position} filter drop-shadow-lg neon-contact`}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Icon
            className={`${color} ${size} opacity-70 hover:opacity-100 transition-opacity duration-300`}
          />
        </motion.div>
      )),
    [setNeonElementRef, shouldReduceMotion]
  );

  const contactInfoElements = useMemo(
    () =>
      CONTACT_INFO.map((info, index) => (
        <motion.div
          key={info.title}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="flex items-start gap-4 p-4 rounded-xl border border-gray-700/50 hover:border-blue-400/30 transition-all duration-300 group cursor-pointer"
        >
          <div
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${info.gradient} flex items-center justify-center border ${info.border} group-hover:scale-110 transition-transform duration-300`}
          >
            <info.icon className={`w-6 h-6 text-${info.color}-400`} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white mb-1">{info.title}</p>
            <p className="text-sm text-gray-300 font-mono">{info.content}</p>
            <p className="text-xs text-gray-500 mt-1">{info.description}</p>
          </div>
        </motion.div>
      )),
    []
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-gray-950 overflow-hidden border-t border-gray-800/50"
    >
      {/* Background Otimizado */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-blue-500/8 blur-2xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-purple-500/6 blur-2xl rounded-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-cyan-500/5 blur-2xl rounded-full" />
      </div>

      {/* Elementos Neon - Renderização Otimizada */}
      <div className="absolute inset-0 pointer-events-none">{neonElements}</div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header Premium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16 lg:mb-24"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center text-blue-400 bg-blue-500/10 border border-blue-400/30 px-4 py-2 rounded-full text-sm lg:text-base font-mono font-bold mb-6 lg:mb-8"
          >
            <MessageCircle className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
            CONEXÃO TECH
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black text-white mb-4 lg:mb-6"
          >
            VAMOS CRIAR{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
              JUNTOS
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Pronto para transformar sua visão em realidade? Vamos conversar
            sobre seu projeto e criar algo extraordinário
          </motion.p>
        </motion.div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16 lg:mb-24">
          {/* Informações de Contato */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 shadow-2xl hover:shadow-blue-500/10 hover:border-blue-400/30 transition-all duration-500 group h-full">
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

              <CardContent className="pt-6 space-y-6">
                {contactInfoElements}

                <div className="pt-6 border-t border-gray-700/50">
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
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 shadow-2xl hover:shadow-purple-500/10 hover:border-purple-400/30 transition-all duration-500 group h-full">
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
                  {/* Campos do Formulário - BLASTER PREMIUM */}
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
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-blue-400 focus:ring-blue-400 transition-all duration-300 hover:border-gray-600"
                      />
                      {formErrors.name && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="text-red-400 text-xs flex items-center gap-1 mt-1"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {formErrors.name}
                        </motion.p>
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
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-blue-400 focus:ring-blue-400 transition-all duration-300 hover:border-gray-600"
                      />
                      {formErrors.email && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="text-red-400 text-xs flex items-center gap-1 mt-1"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {formErrors.email}
                        </motion.p>
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
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-blue-400 focus:ring-blue-400 transition-all duration-300 hover:border-gray-600"
                    />
                    {formErrors.subject && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-red-400 text-xs flex items-center gap-1 mt-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.subject}
                      </motion.p>
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
                      rows={5}
                      placeholder="Descreva sua visão, objetivos, tecnologias preferidas, prazo estimado e qualquer detalhe relevante..."
                      required
                      disabled={isLoading}
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-blue-400 focus:ring-blue-400 resize-none transition-all duration-300 hover:border-gray-600 min-h-[120px]"
                    />
                    {formErrors.message && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-red-400 text-xs flex items-center gap-1 mt-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Estados de Feedback - Premium */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 backdrop-blur-sm"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-red-400 text-sm font-semibold">
                          Ops! Algo deu errado
                        </p>
                        <p className="text-red-400/80 text-xs mt-1">{error}</p>
                      </div>
                    </motion.div>
                  )}

                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-start gap-3 backdrop-blur-sm"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-green-400 text-sm font-semibold">
                          🎉 Mensagem enviada com sucesso!
                        </p>
                        <p className="text-green-400/80 text-xs mt-1">
                          Entrarei em contato em até 24 horas. Obrigado pela
                          confiança!
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Botão de Submit Premium */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600 text-white font-bold py-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group relative overflow-hidden"
                    >
                      {/* Efeito de brilho no hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                      {!isLoading ? (
                        <span className="flex items-center justify-center gap-2 relative z-10">
                          <Send className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                          ENVIAR PROPOSTA
                        </span>
                      ) : (
                        <div className="flex items-center justify-center gap-2 relative z-10">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span className="text-white/90">PROCESSANDO...</span>
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* CTA Final Premium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gray-900/60 to-gray-800/40 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-gray-700/50 shadow-2xl relative overflow-hidden">
            {/* Efeito de gradiente animado no fundo */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 animate-pulse" />

            <div className="relative z-10">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl lg:text-3xl font-black text-white mb-4"
              >
                Pronto para o próximo nível? 🚀
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg lg:text-xl text-gray-300 mb-6 max-w-3xl mx-auto"
              >
                Sua visão + minha expertise = Resultados extraordinários. Vamos
                conversar?
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4 lg:gap-6"
              >
                {[
                  { text: "Resposta Rápida", color: "#60a5fa" },
                  { text: "Orçamento Sem Compromisso", color: "#a855f7" },
                  { text: "Consultoria Gratuita", color: "#22d3ee" },
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/30 backdrop-blur-sm border border-gray-700/50"
                  >
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-300 font-mono">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
