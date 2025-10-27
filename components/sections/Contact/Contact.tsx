// components/sections/Contact/Contact.tsx
"use client";

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
} from "lucide-react";
import { useState } from "react";
import MotionDiv from "@/components/ui/MotionDiv";
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
    <section id="contact" className={styles.contactSection}>
      {/* Background */}
      <div className={styles.background}>
        <div className={styles.gradientBackground} />
        <div className={styles.lightEffect1} />
        <div className={styles.lightEffect2} />
      </div>

      {/* Partículas */}
      <div className={styles.particles}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`${styles.particle} ${
              i % 3 === 0
                ? styles.particleCyan
                : i % 3 === 1
                ? styles.particleBlue
                : styles.particlePurple
            }`}
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${Math.random() * 10 + 8}s`,
            }}
          />
        ))}
      </div>

      {/* Elementos decorativos */}
      <div className={styles.decorativeElements}>
        <div className={styles.decoration1}>
          <svg
            className={styles.decorationIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </div>
        <div className={styles.decoration2}>
          <svg
            className={styles.decorationIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M11 9h4a2 2 0 0 0 2-2V3"></path>
            <circle cx="9" cy="9" r="2"></circle>
            <path d="M7 21v-4a2 2 0 0 1 2-2h4"></path>
            <circle cx="15" cy="15" r="2"></circle>
          </svg>
        </div>
        <div className={styles.decoration3}>
          <svg
            className={styles.decorationIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
      </div>

      <div className={styles.container}>
        {/* Header */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className={styles.header}
        >
          <MotionDiv
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
            viewport={{ once: true }}
            className={styles.badge}
          >
            <MessageCircle className={styles.badgeIcon} />
            CONEXÃO TECH
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className={styles.title}>
              VAMOS CRIAR <span className={styles.titleGradient}>JUNTOS</span>
            </h1>
            <p className={styles.subtitle}>
              Pronto para transformar sua visão em realidade? Vamos conversar
              sobre seu projeto e criar algo extraordinário
            </p>
          </MotionDiv>
        </MotionDiv>

        <div className={styles.contentGrid}>
          {/* Informações de Contato */}
          <MotionDiv
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            viewport={{ once: true, amount: 0.2 }}
            className={styles.infoColumn}
          >
            <Card className={styles.infoCard}>
              <CardHeader className={styles.cardHeader}>
                <CardTitle className={styles.cardTitle}>
                  <Cpu className={styles.cardIcon} />
                  CONECTE-SE
                </CardTitle>
                <p className={styles.cardDescription}>
                  Estou sempre disponível para novas oportunidades, desafios
                  inspiradores e parcerias inovadoras
                </p>
              </CardHeader>

              <CardContent className={styles.cardContent}>
                <div className={styles.contactItems}>
                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <Mail className={styles.contactIconInner} />
                    </div>
                    <div className={styles.contactInfo}>
                      <p className={styles.contactLabel}>EMAIL PRINCIPAL</p>
                      <p className={styles.contactValue}>
                        erickreisti@gmail.com
                      </p>
                      <p className={styles.contactNote}>
                        Resposta em até 24 horas
                      </p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <MapPin className={styles.contactIconInner} />
                    </div>
                    <div className={styles.contactInfo}>
                      <p className={styles.contactLabel}>LOCALIZAÇÃO</p>
                      <p className={styles.contactValue}>
                        Rio de Janeiro, Brasil
                      </p>
                      <p className={styles.contactNote}>
                        Disponível para projetos globais
                      </p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <Phone className={styles.contactIconInner} />
                    </div>
                    <div className={styles.contactInfo}>
                      <p className={styles.contactLabel}>DISPONIBILIDADE</p>
                      <p className={styles.contactValue}>
                        Flexível & Comprometido
                      </p>
                      <p className={styles.contactNote}>
                        Projetos de qualquer escala
                      </p>
                    </div>
                  </div>
                </div>

                <div className={styles.contactFooter}>
                  <p className={styles.footerText}>
                    <Sparkles className={styles.footerIcon} />
                    Vamos transformar suas ideias em soluções digitais
                    extraordinárias com tecnologia de ponta e criatividade.
                  </p>
                </div>
              </CardContent>
            </Card>
          </MotionDiv>

          {/* Formulário de Contato */}
          <MotionDiv
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
            viewport={{ once: true, amount: 0.2 }}
            className={styles.formColumn}
          >
            <Card className={styles.formCard}>
              <CardHeader className={styles.cardHeader}>
                <CardTitle className={styles.cardTitle}>
                  <Send className={styles.cardIcon} />
                  MENSAGEM RÁPIDA
                </CardTitle>
                <p className={styles.cardDescription}>
                  Descreva seu projeto ou ideia - respondo pessoalmente em até
                  24 horas
                </p>
              </CardHeader>

              <CardContent className={styles.formContent}>
                <form action={handleSubmit} className={styles.contactForm}>
                  <div className={styles.formGrid}>
                    <div className={styles.formField}>
                      <Label htmlFor="name" className={styles.formLabel}>
                        SEU NOME *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Como prefere ser chamado?"
                        required
                        disabled={isLoading}
                        className={styles.formInput}
                      />
                      {formErrors.name && (
                        <p className={styles.formError}>
                          <AlertCircle className={styles.errorIcon} />
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    <div className={styles.formField}>
                      <Label htmlFor="email" className={styles.formLabel}>
                        SEU EMAIL *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu.melhor@email.com"
                        required
                        disabled={isLoading}
                        className={styles.formInput}
                      />
                      {formErrors.email && (
                        <p className={styles.formError}>
                          <AlertCircle className={styles.errorIcon} />
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className={styles.formField}>
                    <Label htmlFor="subject" className={styles.formLabel}>
                      ASSUNTO DO PROJETO *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Ex: Site Institucional, App Mobile, Sistema Web..."
                      required
                      disabled={isLoading}
                      className={styles.formInput}
                    />
                    {formErrors.subject && (
                      <p className={styles.formError}>
                        <AlertCircle className={styles.errorIcon} />
                        {formErrors.subject}
                      </p>
                    )}
                  </div>

                  <div className={styles.formField}>
                    <Label htmlFor="message" className={styles.formLabel}>
                      DETALHES DO PROJETO *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Descreva sua visão, objetivos, tecnologias preferidas, prazo estimado e qualquer detalhe relevante..."
                      required
                      disabled={isLoading}
                      className={styles.formTextarea}
                    />
                    {formErrors.message && (
                      <p className={styles.formError}>
                        <AlertCircle className={styles.errorIcon} />
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Estados de Feedback */}
                  {error && (
                    <MotionDiv
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={styles.errorMessage}
                    >
                      <AlertCircle className={styles.errorMessageIcon} />
                      <p className={styles.errorMessageText}>{error}</p>
                    </MotionDiv>
                  )}

                  {isSuccess && (
                    <MotionDiv
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={styles.successMessage}
                    >
                      <CheckCircle className={styles.successMessageIcon} />
                      <div>
                        <p className={styles.successMessageText}>
                          MENSAGEM ENVIADA COM SUCESSO!
                        </p>
                        <p className={styles.successMessageNote}>
                          Entrarei em contato em até 24 horas. Obrigado!
                        </p>
                      </div>
                    </MotionDiv>
                  )}

                  {/* Botão de Envio */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={styles.submitButton}
                  >
                    {!isLoading ? (
                      <span className={styles.buttonContent}>
                        <Send className={styles.buttonIcon} />
                        ENVIAR PROPOSTA
                      </span>
                    ) : (
                      <div className={styles.loadingContent}>
                        <div className={styles.loadingSpinner} />
                        <span className={styles.loadingText}>ENVIANDO...</span>
                      </div>
                    )}
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
          className={styles.ctaSection}
        >
          <div className={styles.ctaCard}>
            <div className={styles.ctaContent}>
              <h3 className={styles.ctaTitle}>
                Vamos criar algo extraordinário juntos? 🚀
              </h3>
              <p className={styles.ctaDescription}>
                Cada grande projeto começa com uma simples conversa. Estou
                ansioso para ouvir suas ideias e transformá-las em realidade.
              </p>

              <div className={styles.ctaFeatures}>
                <div className={styles.ctaFeature}>
                  <div className={styles.featureDot} />
                  <span className={styles.featureText}>Resposta Rápida</span>
                </div>
                <div className={styles.ctaFeature}>
                  <div className={styles.featureDot} />
                  <span className={styles.featureText}>
                    Orçamento Sem Compromisso
                  </span>
                </div>
                <div className={styles.ctaFeature}>
                  <div className={styles.featureDot} />
                  <span className={styles.featureText}>
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
