// components/ui/AnimatedActionButton.tsx
"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface AnimatedActionButtonProps {
  // Conteúdo
  title: string;
  subtitle?: string;

  // Ícone (agora opcional)
  icon?: LucideIcon;

  // Ação
  onClick: () => void;

  // Estilo
  size?: "sm" | "md" | "lg";
  className?: string;

  // Estados
  disabled?: boolean;
  loading?: boolean;
  progress?: number;

  // Controles
  showArrow?: boolean;

  // Children para conteúdo adicional
  children?: ReactNode;
}

export const AnimatedActionButton = ({
  title,
  subtitle,
  icon: Icon,
  onClick,
  size = "md",
  className = "",
  disabled = false,
  loading = false,
  progress = 0,
  showArrow = true,
  children,
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

  const config = sizeConfig[size];

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        group relative bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl 
        border border-cyan-400/30 hover:border-cyan-400/50 ${
          config.padding
        } rounded-2xl 
        transition-all duration-500 overflow-hidden
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      // Removemos a animação do boxShadow do whileHover e usamos classes CSS
      whileHover={
        !disabled && !loading
          ? {
              scale: 1.05,
              y: -2,
            }
          : {}
      }
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
      // Aplicamos a sombra via CSS classes para evitar problemas de animação
      style={{
        boxShadow: "0 10px 30px rgba(6, 182, 212, 0.3)",
      }}
    >
      {/* Barra de progresso */}
      {loading && progress > 0 && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-b-2xl"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.3 }}
          style={{ originX: 0 }}
        />
      )}

      {/* Efeito de fundo gradiente no hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Animação de brilho contínuo */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <motion.div
          className="absolute -inset-10 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
          animate={{ x: ["0%", "200%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Conteúdo do botão */}
      <div className={`relative z-10 flex items-center ${config.gap}`}>
        {/* Ícone animado - Só mostra se Icon estiver definido */}
        {Icon && (
          <motion.div
            className="relative"
            animate={loading ? { rotate: 360 } : { y: [0, -4, 0] }}
            transition={
              loading
                ? { duration: 1, repeat: Infinity, ease: "linear" }
                : { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <Icon className={`${config.iconSize} text-cyan-400`} />
            {!loading && (
              <motion.div
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full blur-sm"
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </motion.div>
        )}

        {/* Textos */}
        <div className="flex flex-col items-start">
          <span
            className={`${config.textSize} font-mono font-bold text-cyan-400 tracking-wider group-hover:text-cyan-300 transition-colors duration-300`}
          >
            {loading ? "PROCESSANDO..." : title}
          </span>
          {subtitle && (
            <span className="text-xs text-gray-400 group-hover:text-cyan-400/80 transition-colors duration-300 font-mono">
              {loading ? `${progress}%` : subtitle}
            </span>
          )}
        </div>

        {/* Children (conteúdo adicional como seta) */}
        {children}

        {/* Seta animada - CONDICIONAL */}
        {!loading && showArrow && !children && (
          <motion.div
            className="ml-2"
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="w-4 h-4 text-cyan-400"
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

      {/* REFLEXO NA BORDA */}
      <div className="absolute inset-0 rounded-2xl border border-cyan-400/20 group-hover:border-cyan-400/40 transition-all duration-300" />

      {/* Efeito de brilho na borda no hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
          <motion.div
            className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
    </motion.button>
  );
};
