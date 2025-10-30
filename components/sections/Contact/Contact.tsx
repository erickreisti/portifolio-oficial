"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
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
  Calendar,
  Clock,
  CheckCircle2,
  Zap,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PremiumBackground } from "@/components/layout/PremiumBackground";
import { LazyComponent } from "@/components/optimization/LazyComponent";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import LazyBackground from "@/components/optimization/LazyBackground";
import { NeonElements } from "@/components/layout/NeonElements";
import { COLORS } from "@/lib/colors";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  meetingDate?: string;
  meetingTime?: string;
  formType: "quick" | "enhanced";
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  meetingDate?: string;
  meetingTime?: string;
}

interface SubmissionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  lastSubmissionTime: number | null;
}

const STATIC_CONTACT_INFO = [
  {
    icon: Mail,
    title: "EMAIL PRINCIPAL",
    content: "erickreisti@gmail.com",
    description: "Resposta em até 24 horas",
    gradient: "from-cyan-500/20 to-blue-500/20",
    border: COLORS.borders.medium,
  },
  {
    icon: MapPin,
    title: "LOCALIZAÇÃO",
    content: "Rio de Janeiro, Brasil",
    description: "Disponível para projetos globais",
    gradient: "from-cyan-500/20 to-blue-500/20",
    border: COLORS.borders.medium,
  },
  {
    icon: Phone,
    title: "DISPONIBILIDADE",
    content: "Flexível & Comprometido",
    description: "Projetos de qualquer escala",
    gradient: "from-cyan-500/20 to-blue-500/20",
    border: COLORS.borders.medium,
  },
];

const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    meetingDate: "",
    meetingTime: "",
    formType: "quick",
  });

  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
    lastSubmissionTime: null,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const hasRecentSubmission = useCallback(() => {
    const { lastSubmissionTime } = submissionState;
    if (!lastSubmissionTime) return false;
    const timeSinceLastSubmission = Date.now() - lastSubmissionTime;
    return timeSinceLastSubmission < 30000;
  }, [submissionState.lastSubmissionTime]);

  const validateField = useCallback(
    (name: keyof ContactFormData, value: string): string => {
      switch (name) {
        case "name":
          if (!value.trim()) return "Nome é obrigatório";
          if (value.trim().length < 2)
            return "Nome deve ter pelo menos 2 caracteres";
          if (value.trim().length > 50)
            return "Nome muito longo (máx. 50 caracteres)";
          break;
        case "email":
          if (!value.trim()) return "Email é obrigatório";
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            return "Email inválido";
          if (value.length > 100) return "Email muito longo";
          break;
        case "subject":
          if (!value.trim()) return "Assunto é obrigatório";
          if (value.trim().length < 5)
            return "Assunto deve ter pelo menos 5 caracteres";
          if (value.trim().length > 100)
            return "Assunto muito longo (máx. 100 caracteres)";
          break;
        case "message":
          if (!value.trim()) return "Mensagem é obrigatória";
          if (value.trim().length < 10)
            return "Mensagem deve ter pelo menos 10 caracteres";
          if (value.trim().length > 2000)
            return "Mensagem muito longa (máx. 2000 caracteres)";
          break;
        case "meetingDate":
          if (formData.formType === "enhanced" && !value.trim()) {
            return "Data da reunião é obrigatória para agendamento";
          }
          break;
        case "meetingTime":
          if (formData.formType === "enhanced" && !value.trim()) {
            return "Horário da reunião é obrigatório para agendamento";
          }
          break;
      }
      return "";
    },
    [formData.formType]
  );

  const validateForm = useCallback((): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    const requiredFields: (keyof FormErrors)[] = [
      "name",
      "email",
      "subject",
      "message",
    ];
    if (formData.formType === "enhanced") {
      requiredFields.push("meetingDate", "meetingTime");
    }

    requiredFields.forEach((field) => {
      const error = validateField(field, formData[field] || "");
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    });

    setFormErrors(errors);
    return isValid;
  }, [formData, validateField]);

  const updateField = useCallback(
    (field: keyof ContactFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      const error = validateField(field, value);
      setFormErrors((prev) => ({ ...prev, [field]: error }));
    },
    [validateField]
  );

  const setFormType = useCallback((type: "quick" | "enhanced") => {
    setFormData((prev) => ({
      ...prev,
      formType: type,
      ...(type === "quick" ? { meetingDate: "", meetingTime: "" } : {}),
    }));
    setFormErrors({});
  }, []);

  const submitForm = useCallback(async () => {
    if (hasRecentSubmission()) {
      setSubmissionState((prev) => ({
        ...prev,
        error: "Aguarde 30 segundos antes de enviar outro formulário",
      }));
      return false;
    }

    if (!validateForm()) {
      setSubmissionState((prev) => ({
        ...prev,
        error: "Por favor, corrija os erros no formulário",
      }));
      return false;
    }

    setSubmissionState((prev) => ({
      ...prev,
      isSubmitting: true,
      error: null,
    }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmissionState((prev) => ({
        ...prev,
        isSubmitting: false,
        isSuccess: true,
        lastSubmissionTime: Date.now(),
      }));

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          meetingDate: "",
          meetingTime: "",
          formType: "quick",
        });
        setFormErrors({});
        setSubmissionState((prev) => ({ ...prev, isSuccess: false }));
      }, 5000);

      return true;
    } catch (error) {
      setSubmissionState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: "Erro ao enviar mensagem. Tente novamente.",
      }));
      return false;
    }
  }, [formData, validateForm, hasRecentSubmission]);

  return {
    formData,
    formErrors,
    submissionState,
    updateField,
    setFormType,
    submitForm,
    validateForm,
  };
};

const AvailabilityCalendar = ({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  errors,
}: {
  selectedDate: string;
  selectedTime: string;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
  errors: FormErrors;
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const availableSlots = useMemo(
    () => ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
    []
  );
  const availableDays = useMemo(() => [1, 2, 3, 4, 5], []);
  const today = useMemo(() => new Date(), []);

  const getDaysInMonth = useCallback((date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  }, []);

  const days = useMemo(
    () => getDaysInMonth(currentMonth),
    [currentMonth, getDaysInMonth]
  );

  const isDateAvailable = useCallback(
    (date: Date) => {
      return (
        availableDays.includes(date.getDay()) &&
        date >= today &&
        date <= new Date(today.getFullYear(), today.getMonth() + 1, 0)
      );
    },
    [availableDays, today]
  );

  const handleDateSelect = useCallback(
    (date: Date) => {
      if (isDateAvailable(date)) {
        onDateSelect(date.toISOString().split("T")[0]);
      }
    },
    [isDateAvailable, onDateSelect]
  );

  return (
    <LazyComponent animation="fadeUp" delay={300}>
      <div className={`${COLORS.classes.card} p-6`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-cyan-500/20 rounded-xl border border-cyan-400/30">
            <Calendar className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className={`${COLORS.classes.text.primary} text-xl font-bold`}>
              Agendar Reunião
            </h3>
            <p className={COLORS.classes.text.accent}>
              Encontre um horário perfeito
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() - 1
                    )
                  )
                }
                className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                type="button"
              >
                <Zap className="w-4 h-4 text-cyan-400 transform rotate-180" />
              </button>

              <h4 className={COLORS.classes.text.primary}>
                {currentMonth.toLocaleDateString("pt-BR", {
                  month: "long",
                  year: "numeric",
                })}
              </h4>

              <button
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() + 1
                    )
                  )
                }
                className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                type="button"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                <div
                  key={day}
                  className="text-center text-gray-400 text-sm font-semibold py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((date) => {
                const isAvailable = isDateAvailable(date);
                const isSelected =
                  selectedDate === date.toISOString().split("T")[0];
                const isToday = date.toDateString() === today.toDateString();

                return (
                  <motion.button
                    key={date.toISOString()}
                    onClick={() => handleDateSelect(date)}
                    disabled={!isAvailable}
                    className={`
                      relative p-2 rounded-lg text-sm font-semibold transition-all duration-300
                      ${
                        isSelected
                          ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                          : isToday
                          ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400/30"
                          : isAvailable
                          ? "bg-gray-800/50 text-white hover:bg-cyan-500/20 hover:border-cyan-400/30 border border-transparent"
                          : "bg-gray-800/20 text-gray-500 cursor-not-allowed"
                      }
                    `}
                    whileHover={isAvailable ? { scale: 1.05 } : {}}
                    whileTap={isAvailable ? { scale: 0.95 } : {}}
                    type="button"
                  >
                    {date.getDate()}
                    {isAvailable && !isSelected && (
                      <motion.div
                        className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {errors.meetingDate && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-red-400 text-xs flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {errors.meetingDate}
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            {selectedDate ? (
              <>
                <div className="text-center">
                  <h4
                    className={`${COLORS.classes.text.primary} font-semibold mb-2`}
                  >
                    {new Date(selectedDate).toLocaleDateString("pt-BR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </h4>
                  <p className={COLORS.classes.text.accent}>
                    Selecione um horário disponível
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {availableSlots.map((time) => (
                    <motion.button
                      key={time}
                      onClick={() => onTimeSelect(time)}
                      className={`
                        p-3 rounded-xl border transition-all duration-300 text-center
                        ${
                          selectedTime === time
                            ? "bg-cyan-500 text-white border-cyan-400 shadow-lg shadow-cyan-500/25"
                            : "bg-gray-800/50 text-white border-cyan-500/20 hover:border-cyan-400/50"
                        }
                      `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                    >
                      <Clock className="w-4 h-4 inline mr-2" />
                      {time}
                    </motion.button>
                  ))}
                </div>

                {errors.meetingTime && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-red-400 text-xs flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.meetingTime}
                  </motion.div>
                )}

                {selectedTime && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                      <div className="flex items-center gap-3 text-green-400">
                        <CheckCircle2 className="w-5 h-5" />
                        <div>
                          <div className="font-semibold">
                            Horário disponível!
                          </div>
                          <div className="text-sm text-green-300">
                            {new Date(selectedDate).toLocaleDateString("pt-BR")}{" "}
                            às {selectedTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-48 text-gray-400">
                <div className="text-center">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Selecione uma data disponível</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-cyan-500/20">
          <div className={`${COLORS.classes.text.tertiary} text-sm`}>
            Fuso horário: {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </div>
          <div className={`${COLORS.classes.text.accent} text-sm font-mono`}>
            💡 Reuniões de 45-60 minutos
          </div>
        </div>
      </div>
    </LazyComponent>
  );
};

const EnhancedContactForm = ({
  formData,
  formErrors,
  submissionState,
  updateField,
  submitForm,
}: {
  formData: ContactFormData;
  formErrors: FormErrors;
  submissionState: SubmissionState;
  updateField: (field: keyof ContactFormData, value: string) => void;
  submitForm: () => Promise<boolean>;
}) => {
  const progress = useMemo(() => {
    const fields = [
      "name",
      "email",
      "subject",
      "message",
    ] as (keyof ContactFormData)[];
    if (formData.formType === "enhanced") {
      fields.push("meetingDate", "meetingTime");
    }
    const filledFields = fields.filter((field) =>
      formData[field]?.toString().trim()
    ).length;
    return (filledFields / fields.length) * 100;
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  return (
    <LazyComponent animation="fadeUp" delay={400}>
      <div className={`${COLORS.classes.card} p-6`}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>PREENCIMENTO DO FORMULÁRIO</span>
            <span className="text-cyan-400 font-mono">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="w-full bg-gray-800/50 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className={`${COLORS.classes.text.primary} text-sm font-bold`}
              >
                SEU NOME *
              </Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                disabled={submissionState.isSubmitting}
                className={`w-full bg-gray-800/50 border ${
                  formErrors.name ? "border-red-400/50" : COLORS.borders.medium
                } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors duration-300`}
                placeholder="Como prefere ser chamado?"
              />
              <AnimatePresence>
                {formErrors.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-400 text-xs flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {formErrors.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className={`${COLORS.classes.text.primary} text-sm font-bold`}
              >
                SEU EMAIL *
              </Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                disabled={submissionState.isSubmitting}
                className={`w-full bg-gray-800/50 border ${
                  formErrors.email ? "border-red-400/50" : COLORS.borders.medium
                } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors duration-300`}
                placeholder="seu.melhor@email.com"
              />
              <AnimatePresence>
                {formErrors.email && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-400 text-xs flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {formErrors.email}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="subject"
              className={`${COLORS.classes.text.primary} text-sm font-bold`}
            >
              ASSUNTO DO PROJETO *
            </Label>
            <Input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={(e) => updateField("subject", e.target.value)}
              disabled={submissionState.isSubmitting}
              className={`w-full bg-gray-800/50 border ${
                formErrors.subject ? "border-red-400/50" : COLORS.borders.medium
              } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors duration-300`}
              placeholder="Ex: Site Institucional, App Mobile, Sistema Web..."
            />
            <AnimatePresence>
              {formErrors.subject && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-400 text-xs flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {formErrors.subject}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="message"
              className={`${COLORS.classes.text.primary} text-sm font-bold`}
            >
              DETALHES DO PROJETO *
            </Label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={(e) => updateField("message", e.target.value)}
              disabled={submissionState.isSubmitting}
              rows={5}
              className={`w-full bg-gray-800/50 border ${
                formErrors.message ? "border-red-400/50" : COLORS.borders.medium
              } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors duration-300 resize-none min-h-[120px]`}
              placeholder="Descreva sua visão, objetivos, tecnologias preferidas, prazo estimado..."
            />
            <div className="flex justify-between items-center">
              <AnimatePresence>
                {formErrors.message && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-400 text-xs flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {formErrors.message}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="text-gray-400 text-xs">
                {formData.message.length}/2000
              </div>
            </div>
          </div>

          {formData.formType === "enhanced" && (
            <AvailabilityCalendar
              selectedDate={formData.meetingDate || ""}
              selectedTime={formData.meetingTime || ""}
              onDateSelect={(date) => updateField("meetingDate", date)}
              onTimeSelect={(time) => updateField("meetingTime", time)}
              errors={formErrors}
            />
          )}

          <AnimatePresence>
            {submissionState.isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <div className="text-green-400 font-semibold">
                    Mensagem enviada com sucesso!
                  </div>
                  <div className="text-green-400/80 text-sm">
                    {formData.formType === "enhanced"
                      ? "Reunião agendada! Entrarei em contato para confirmação."
                      : "Entrarei em contato em até 24 horas."}
                  </div>
                </div>
              </motion.div>
            )}

            {submissionState.error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400" />
                <div>
                  <div className="text-red-400 font-semibold">
                    Erro no envio
                  </div>
                  <div className="text-red-400/80 text-sm">
                    {submissionState.error}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={submissionState.isSubmitting || submissionState.isSuccess}
            className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
              !submissionState.isSubmitting && !submissionState.isSuccess
                ? `${COLORS.classes.button.primary} hover:scale-105`
                : "bg-gray-800/50 text-gray-400 cursor-not-allowed"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {submissionState.isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                ENVIANDO...
              </div>
            ) : submissionState.isSuccess ? (
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                ENVIADO COM SUCESSO!
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                {formData.formType === "enhanced"
                  ? "AGENDAR E ENVIAR"
                  : "ENVIAR MENSAGEM"}
              </div>
            )}
          </motion.button>
        </form>
      </div>
    </LazyComponent>
  );
};

export const Contact = () => {
  const {
    formData,
    formErrors,
    submissionState,
    updateField,
    setFormType,
    submitForm,
  } = useContactForm();

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  usePerformanceMonitor("ContactSection");

  const contactInfo = useMemo(() => STATIC_CONTACT_INFO, []);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView, shouldReduceMotion]);

  const contactInfoElements = useMemo(
    () =>
      contactInfo.map((info, index) => (
        <LazyComponent key={info.title} animation="fadeUp" delay={index * 100}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`flex items-start gap-4 p-4 rounded-xl border ${info.border} hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer`}
          >
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-br ${info.gradient} flex items-center justify-center border ${info.border} group-hover:border-cyan-400/50 transition-all duration-300`}
            >
              <info.icon className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="flex-1">
              <p
                className={`${COLORS.classes.text.primary} text-sm font-bold mb-1`}
              >
                {info.title}
              </p>
              <p
                className={`${COLORS.classes.text.secondary} text-sm font-mono`}
              >
                {info.content}
              </p>
              <p className={`${COLORS.classes.text.tertiary} text-xs mt-1`}>
                {info.description}
              </p>
            </div>
          </motion.div>
        </LazyComponent>
      )),
    [contactInfo]
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative min-h-screen ${COLORS.classes.background.section} section-with-header`}
    >
      <LazyBackground priority="medium">
        <PremiumBackground intensity="medium">
          <NeonElements />
        </PremiumBackground>
      </LazyBackground>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <LazyComponent animation="fadeUp" delay={200}>
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
                <span className={COLORS.classes.text.gradient}>JUNTOS</span>
              </h1>
              <p
                className={`${COLORS.classes.text.secondary} text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed`}
              >
                Pronto para transformar sua visão em realidade? Vamos conversar
                sobre seu projeto e criar algo extraordinário
              </p>
            </motion.div>
          </motion.div>
        </LazyComponent>

        <LazyComponent animation="fadeUp" delay={300}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <div
              className={`${COLORS.classes.card} p-3 shadow-2xl shadow-cyan-400/10`}
            >
              <div className="flex gap-3">
                <motion.button
                  onClick={() => setFormType("quick")}
                  className={`group relative px-8 py-4 rounded-2xl font-bold transition-all duration-500 overflow-hidden min-w-[180px] ${
                    formData.formType === "quick"
                      ? `${COLORS.classes.button.primary} shadow-2xl shadow-cyan-500/30`
                      : `${COLORS.classes.button.secondary}`
                  }`}
                  whileHover={{
                    scale: formData.formType === "quick" ? 1 : 1.05,
                    y: formData.formType === "quick" ? 0 : -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {formData.formType === "quick" && (
                    <>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <div className="absolute inset-0">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full blur-sm"
                            style={{ left: `${20 + i * 30}%`, top: "20%" }}
                            animate={{ y: [0, 10, 0], opacity: [0, 1, 0] }}
                            transition={{
                              duration: 2 + i,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  {formData.formType !== "quick" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  )}
                  <div className="relative z-10 flex items-center gap-3 justify-center">
                    <motion.div
                      animate={{
                        scale: formData.formType === "quick" ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: formData.formType === "quick" ? 2 : 0.3,
                        repeat: formData.formType === "quick" ? Infinity : 0,
                      }}
                      className="relative"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                        {formData.formType === "quick" && (
                          <motion.circle
                            cx="18"
                            cy="6"
                            r="3"
                            fill="#22d3ee"
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </svg>
                    </motion.div>
                    <div className="flex flex-col items-start">
                      <span
                        className={`text-sm font-bold tracking-wide ${
                          formData.formType === "quick"
                            ? "text-white"
                            : "text-gray-300 group-hover:text-cyan-300"
                        } transition-colors duration-300`}
                      >
                        MENSAGEM RÁPIDA
                      </span>
                      <span
                        className={`text-xs ${
                          formData.formType === "quick"
                            ? "text-cyan-100"
                            : "text-gray-400 group-hover:text-cyan-400/80"
                        } transition-colors duration-300`}
                      >
                        Envio direto
                      </span>
                    </div>
                  </div>
                  {formData.formType === "quick" && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-cyan-400/50"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(6, 182, 212, 0.3)",
                          "0 0 30px rgba(6, 182, 212, 0.6)",
                          "0 0 20px rgba(6, 182, 212, 0.3)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>

                <motion.button
                  onClick={() => setFormType("enhanced")}
                  className={`group relative px-8 py-4 rounded-2xl font-bold transition-all duration-500 overflow-hidden min-w-[180px] ${
                    formData.formType === "enhanced"
                      ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-2xl shadow-purple-500/30"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/60 border border-purple-500/20"
                  }`}
                  whileHover={{
                    scale: formData.formType === "enhanced" ? 1 : 1.05,
                    y: formData.formType === "enhanced" ? 0 : -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {formData.formType === "enhanced" && (
                    <>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <div className="absolute inset-0">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full blur-sm"
                            style={{ right: `${20 + i * 30}%`, top: "20%" }}
                            animate={{ y: [0, 10, 0], opacity: [0, 1, 0] }}
                            transition={{
                              duration: 2 + i,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  {formData.formType !== "enhanced" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  )}
                  <div className="relative z-10 flex items-center gap-3 justify-center">
                    <motion.div
                      animate={{
                        scale:
                          formData.formType === "enhanced" ? [1, 1.1, 1] : 1,
                        rotate:
                          formData.formType === "enhanced" ? [0, -5, 5, 0] : 0,
                      }}
                      transition={{
                        duration: formData.formType === "enhanced" ? 2 : 0.3,
                        repeat: formData.formType === "enhanced" ? Infinity : 0,
                      }}
                      className="relative"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                        {formData.formType === "enhanced" && (
                          <motion.rect
                            x="8"
                            y="12"
                            width="2"
                            height="2"
                            fill="#a855f7"
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1, 0] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 0.5,
                            }}
                          />
                        )}
                      </svg>
                    </motion.div>
                    <div className="flex flex-col items-start">
                      <span
                        className={`text-sm font-bold tracking-wide ${
                          formData.formType === "enhanced"
                            ? "text-white"
                            : "text-gray-300 group-hover:text-purple-300"
                        } transition-colors duration-300`}
                      >
                        COM AGENDAMENTO
                      </span>
                      <span
                        className={`text-xs ${
                          formData.formType === "enhanced"
                            ? "text-purple-100"
                            : "text-gray-400 group-hover:text-purple-400/80"
                        } transition-colors duration-300`}
                      >
                        Reunião marcada
                      </span>
                    </div>
                  </div>
                  {formData.formType === "enhanced" && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-purple-400/50"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(168, 85, 247, 0.3)",
                          "0 0 30px rgba(168, 85, 247, 0.6)",
                          "0 0 20px rgba(168, 85, 247, 0.3)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </LazyComponent>

        <LazyComponent animation="fadeUp" delay={400}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-16 lg:mb-20"
          >
            <EnhancedContactForm
              formData={formData}
              formErrors={formErrors}
              submissionState={submissionState}
              updateField={updateField}
              submitForm={submitForm}
            />
          </motion.div>
        </LazyComponent>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-20 contact-content">
          <LazyComponent animation="fadeUp" delay={500}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card
                className={`${COLORS.classes.card} ${COLORS.classes.cardHover} group h-full`}
              >
                <CardHeader className="pb-4 border-b border-cyan-400/20">
                  <CardTitle
                    className={`${COLORS.classes.text.accent} text-xl lg:text-2xl font-black flex items-center`}
                  >
                    <Cpu className="w-6 h-6 mr-3" />
                    CONECTE-SE
                  </CardTitle>
                  <p
                    className={`${COLORS.classes.text.tertiary} text-sm lg:text-base`}
                  >
                    Estou sempre disponível para novas oportunidades, desafios
                    inspiradores e parcerias inovadoras
                  </p>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {contactInfoElements}
                  <div className="pt-6 border-t border-cyan-400/20">
                    <p
                      className={`${COLORS.classes.text.tertiary} text-sm flex items-start gap-2`}
                    >
                      <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      Vamos transformar suas ideias em soluções digitais
                      extraordinárias com tecnologia de ponta e criatividade.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </LazyComponent>

          <LazyComponent animation="fadeUp" delay={600}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card
                className={`${COLORS.classes.card} ${COLORS.classes.cardHover} group h-full`}
              >
                <CardHeader className="pb-4 border-b border-cyan-400/20">
                  <CardTitle
                    className={`${COLORS.classes.text.accent} text-xl lg:text-2xl font-black flex items-center`}
                  >
                    <Send className="w-6 h-6 mr-3" />
                    STATUS DO SISTEMA
                  </CardTitle>
                  <p
                    className={`${COLORS.classes.text.tertiary} text-sm lg:text-base`}
                  >
                    Sistema unificado de contato com prevenção de envios
                    duplicados
                  </p>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className={COLORS.classes.text.secondary}>
                        Tipo Ativo:
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          formData.formType === "quick"
                            ? "bg-blue-500/20 text-blue-400 border border-blue-400/30"
                            : "bg-cyan-500/20 text-cyan-400 border border-cyan-400/30"
                        }`}
                      >
                        {formData.formType === "quick"
                          ? "Mensagem Rápida"
                          : "Com Agendamento"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={COLORS.classes.text.secondary}>
                        Status:
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          submissionState.isSubmitting
                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-400/30"
                            : submissionState.isSuccess
                            ? "bg-green-500/20 text-green-400 border border-green-400/30"
                            : submissionState.error
                            ? "bg-red-500/20 text-red-400 border border-red-400/30"
                            : "bg-gray-500/20 text-gray-400 border border-gray-400/30"
                        }`}
                      >
                        {submissionState.isSubmitting
                          ? "Enviando..."
                          : submissionState.isSuccess
                          ? "Enviado!"
                          : submissionState.error
                          ? "Erro"
                          : "Pronto"}
                      </span>
                    </div>
                    {submissionState.lastSubmissionTime && (
                      <div className="flex justify-between items-center">
                        <span className={COLORS.classes.text.secondary}>
                          Último envio:
                        </span>
                        <span className="text-cyan-400 text-xs font-mono">
                          {Math.floor(
                            (Date.now() - submissionState.lastSubmissionTime) /
                              1000
                          )}
                          s atrás
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="pt-4 border-t border-cyan-400/20">
                    <p className={`${COLORS.classes.text.tertiary} text-sm`}>
                      💡 <strong>Sistema Anti-Duplicação:</strong> Bloqueia
                      envios consecutivos por 30 segundos para evitar spam.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </LazyComponent>
        </div>

        <LazyComponent animation="fadeUp" delay={700}>
          <motion.div
            className="text-center contact-cta"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div
              className={`${COLORS.classes.card} ${COLORS.classes.cardHover} p-8 relative overflow-hidden group`}
            >
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
                  <h3
                    className={`${COLORS.classes.text.primary} text-xl lg:text-2xl font-black mb-2`}
                  >
                    Pronto para o próximo nível?
                  </h3>
                  <p
                    className={`${COLORS.classes.text.secondary} text-base lg:text-lg`}
                  >
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
                  <Button
                    onClick={() => setFormType("enhanced")}
                    className={`${COLORS.classes.button.primary} w-full lg:w-auto text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 rounded-2xl relative overflow-hidden`}
                  >
                    <Sparkles className="w-4 h-4 mr-2 transition-transform duration-300" />
                    AGENDAR CONVERSA
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </LazyComponent>
      </div>
    </section>
  );
};

export default Contact;
