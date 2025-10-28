// components/sections/Contact/Contact.tsx
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
import { PremiumBackground } from "@/components/layout/PremiumBackground";

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
    color: "text-cyan-400",
    size: "text-3xl",
  },
  {
    Icon: Mail,
    position: "bottom-40 left-24",
    color: "text-cyan-400",
    size: "text-2xl",
  },
  {
    Icon: MapPin,
    position: "bottom-32 right-20",
    color: "text-cyan-400",
    size: "text-2xl",
  },
  {
    Icon: Phone,
    position: "top-40 right-16",
    color: "text-cyan-400",
    size: "text-xl",
  },
  {
    Icon: Rocket,
    position: "bottom-48 left-16",
    color: "text-cyan-400",
    size: "text-xl",
  },
] as const;

const CONTACT_INFO = [
  {
    icon: Mail,
    title: "EMAIL PRINCIPAL",
    content: "erickreisti@gmail.com",
    description: "Resposta em até 24 horas",
    gradient: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-400/30",
  },
  {
    icon: MapPin,
    title: "LOCALIZAÇÃO",
    content: "Rio de Janeiro, Brasil",
    description: "Disponível para projetos globais",
    gradient: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-400/30",
  },
  {
    icon: Phone,
    title: "DISPONIBILIDADE",
    content: "Flexível & Comprometido",
    description: "Projetos de qualquer escala",
    gradient: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-400/30",
  },
];

// Componente Neon Element para Contact
const ContactNeonElement = ({
  Icon,
  position,
  color,
  delay = 0,
}: {
  Icon: any;
  position: string;
  color: string;
  delay?: number;
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(elementRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView || !elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementRef.current,
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
          delay: delay * 0.2,
        }
      );

      gsap.to(elementRef.current, {
        y: -15,
        rotation: 5,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: delay * 0.3,
      });
    });

    return () => ctx.revert();
  }, [isInView, delay]);

  return (
    <div
      ref={elementRef}
      className={`absolute ${position} pointer-events-none`}
    >
      <Icon className={`${color} text-2xl opacity-70`} />
    </div>
  );
};

export const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  // GSAP Animations
  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );

      const tl = gsap.timeline();

      tl.fromTo(
        ".contact-header",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
      )
        .fromTo(
          ".contact-content",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          ".contact-cta",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView, shouldReduceMotion]);

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

  const neonElements = useMemo(
    () =>
      NEON_ELEMENTS_CONFIG.map(({ Icon, position, color }, index) => (
        <ContactNeonElement
          key={index}
          Icon={Icon}
          position={position}
          color={color}
          delay={index}
        />
      )),
    []
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
          className="flex items-start gap-4 p-4 rounded-xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer"
        >
          <div
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${info.gradient} flex items-center justify-center border ${info.border} group-hover:border-cyan-400/50 transition-all duration-300`}
          >
            <info.icon className="w-6 h-6 text-cyan-400" />
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
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden"
    >
      <PremiumBackground intensity="medium">
        <div className="absolute inset-0 pointer-events-none">
          {neonElements}
        </div>
      </PremiumBackground>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {/* Header Harmonizado */}
        <motion.div
          className="text-center mb-16 lg:mb-20 contact-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-6 py-3 rounded-full border border-cyan-400/30 backdrop-blur-2xl mb-6 relative overflow-hidden group"
          >
            <MessageCircle className="w-4 h-4 mr-3 animate-pulse" />
            CONEXÃO TECH
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              VAMOS CRIAR{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                JUNTOS
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Pronto para transformar sua visão em realidade? Vamos conversar
              sobre seu projeto e criar algo extraordinário
            </p>
          </motion.div>
        </motion.div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-20 contact-content">
          {/* Informações de Contato */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-cyan-500/20 shadow-2xl shadow-cyan-400/10 hover:shadow-cyan-400/20 hover:border-cyan-400/50 transition-all duration-500 group h-full">
              <CardHeader className="pb-4 border-b border-cyan-400/20">
                <CardTitle className="text-xl lg:text-2xl font-black text-cyan-400 flex items-center">
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

                <div className="pt-6 border-t border-cyan-400/20">
                  <p className="text-sm text-gray-400 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
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
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-cyan-500/20 shadow-2xl shadow-cyan-400/10 hover:shadow-cyan-400/20 hover:border-cyan-400/50 transition-all duration-500 group h-full">
              <CardHeader className="pb-4 border-b border-cyan-400/20">
                <CardTitle className="text-xl lg:text-2xl font-black text-cyan-400 flex items-center">
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
                        className="bg-gray-800/50 border-cyan-500/20 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-cyan-400 transition-all duration-300"
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
                        className="bg-gray-800/50 border-cyan-500/20 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-cyan-400 transition-all duration-300"
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
                      className="bg-gray-800/50 border-cyan-500/20 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-cyan-400 transition-all duration-300"
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
                      className="bg-gray-800/50 border-cyan-500/20 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-cyan-400 resize-none transition-all duration-300 min-h-[120px]"
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

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 rounded-xl shadow-2xl shadow-cyan-400/30 hover:shadow-cyan-400/50 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

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

        {/* CTA Final */}
        <motion.div
          className="text-center contact-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-2xl p-8 rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-400/10 relative overflow-hidden group">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                viewport={{ once: true }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30 shadow-xl shadow-cyan-400/30 group-hover:border-cyan-400/50"
                whileHover={{ rotate: 360 }}
              >
                <Rocket className="w-6 h-6 text-cyan-400" />
              </motion.div>
              <div className="text-center lg:text-left flex-1">
                <h3 className="text-xl lg:text-2xl font-black text-white mb-2">
                  Pronto para o próximo nível?
                </h3>
                <p className="text-gray-300 text-base lg:text-lg">
                  Sua visão + minha expertise = Resultados extraordinários
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className="w-full lg:w-auto"
              >
                <Button className="w-full lg:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 rounded-2xl border-none shadow-2xl shadow-cyan-400/30 transition-all duration-500 hover:shadow-cyan-400/50 hover:scale-105 relative overflow-hidden focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900">
                  <Sparkles className="w-4 h-4 mr-2 transition-transform duration-300" />
                  INICIAR CONVERSA
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
