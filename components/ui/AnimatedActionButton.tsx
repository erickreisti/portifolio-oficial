// components/ui/AnimatedActionButton.tsx
"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { BUTTON_PRESETS, type ButtonPreset } from "@/lib/button-presets";

interface AnimatedActionButtonProps {
  // Conteúdo
  title: string;
  subtitle?: string;

  // Ícone
  icon: LucideIcon;

  // Sistema de cores - Agora com presets
  variant?: "primary" | "secondary" | "accent" | "custom";
  preset?: keyof typeof BUTTON_PRESETS; // "cyan" | "purple" | "green" | "orange" | "yellow"
  colors?: ButtonPreset; // Para uso customizado

  // Ação
  onClick: () => void;

  // Estilo
  size?: "sm" | "md" | "lg";
  className?: string;

  // Estados
  disabled?: boolean;
  loading?: boolean;
}

export const AnimatedActionButton = ({
  title,
  subtitle,
  icon: Icon,
  variant = "primary",
  preset,
  colors,
  onClick,
  size = "md",
  className = "",
  disabled = false,
  loading = false,
}: AnimatedActionButtonProps) => {
  // Configurações de tamanho
  const sizeConfig = {
    sm: {
      padding: "px-4 py-2",
      textSize: "text-sm",
      iconSize: "w-4 h-4",
      gap: "gap-2",
    },
    md: {
      padding: "px-5 py-3",
      textSize: "text-sm",
      iconSize: "w-4 h-4",
      gap: "gap-2",
    },
    lg: {
      padding: "px-6 py-3",
      textSize: "text-base",
      iconSize: "w-5 h-5",
      gap: "gap-3",
    },
  };

  // Sistema de cores unificado
  const getColorConfig = (): ButtonPreset => {
    // Se fornecer cores customizadas, use-as
    if (colors) return colors;

    // Se fornecer um preset, use-o (tem prioridade sobre variant)
    if (preset && BUTTON_PRESETS[preset]) {
      return BUTTON_PRESETS[preset];
    }

    // Fallback para variantes padrão
    const variantPresets: Record<string, ButtonPreset> = {
      primary: BUTTON_PRESETS.cyan,
      secondary: BUTTON_PRESETS.purple,
      accent: BUTTON_PRESETS.green,
      custom: BUTTON_PRESETS.cyan, // Fallback para custom
    };

    return variantPresets[variant] || BUTTON_PRESETS.cyan;
  };

  const colorConfig = getColorConfig();
  const config = sizeConfig[size];

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        group relative ${colorConfig.background} backdrop-blur-xl 
        ${colorConfig.border} ${config.padding} rounded-2xl 
        transition-all duration-500 overflow-hidden
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:shadow-2xl"
        }
        ${className}
      `}
      whileHover={
        !disabled && !loading
          ? {
              scale: 1.05,
              y: -2,
              boxShadow: `0 20px 40px ${colorConfig.glow}`,
            }
          : {}
      }
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
      style={{
        boxShadow:
          !disabled && !loading ? `0 10px 30px ${colorConfig.glow}` : "none",
      }}
    >
      {/* Efeito de fundo gradiente no hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to right, ${colorConfig.glow}10, ${colorConfig.glow}05)`,
        }}
      />

      {/* Animação de brilho contínuo */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <motion.div
          className="absolute -inset-10 opacity-30"
          style={{
            background: `linear-gradient(to right, transparent, ${colorConfig.particle}, transparent)`,
          }}
          animate={{ x: ["0%", "200%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Conteúdo do botão */}
      <div className={`relative z-10 flex items-center ${config.gap}`}>
        {/* Ícone animado */}
        <motion.div
          className="relative"
          animate={loading ? { rotate: 360 } : { y: [0, -4, 0] }}
          transition={
            loading
              ? { duration: 1, repeat: Infinity, ease: "linear" }
              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <Icon className={`${config.iconSize} ${colorConfig.icon}`} />
          {!loading && (
            <motion.div
              className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 ${colorConfig.particle} rounded-full blur-sm`}
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.div>

        {/* Textos */}
        <div className="flex flex-col items-start">
          <span
            className={`${config.textSize} font-mono font-bold ${colorConfig.text} tracking-wider transition-colors duration-300`}
          >
            {loading ? "PROCESSANDO..." : title}
          </span>
          {subtitle && (
            <span
              className="text-xs transition-colors duration-300 font-mono opacity-80"
              style={{ color: colorConfig.glow }}
            >
              {subtitle}
            </span>
          )}
        </div>

        {/* Seta animada */}
        {!loading && (
          <motion.div
            className="ml-1"
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className={`${config.iconSize} ${colorConfig.icon}`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Efeito de brilho na borda no hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{
          background: `linear-gradient(to right, ${colorConfig.glow}00, ${colorConfig.glow}40, ${colorConfig.glow}00)`,
        }}
      />

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
          <motion.div
            className="w-6 h-6 border-2 rounded-full"
            style={{
              borderColor: colorConfig.glow,
              borderTopColor: "transparent",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
    </motion.button>
  );
};
