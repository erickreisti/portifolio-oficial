// lib/button-presets.ts
import { LucideIcon } from "lucide-react";

export interface ButtonPreset {
  background: string;
  border: string;
  glow: string;
  icon: string;
  particle: string;
  text: string;
}

export const BUTTON_PRESETS: Record<string, ButtonPreset> = {
  // Cores principais
  cyan: {
    background: "bg-gradient-to-r from-cyan-500/20 to-blue-500/20",
    border: "border border-cyan-400/30 hover:border-cyan-400/50",
    glow: "rgba(6, 182, 212, 0.3)",
    icon: "text-cyan-400",
    particle: "bg-cyan-400",
    text: "text-cyan-400",
  },
  purple: {
    background: "bg-gradient-to-r from-purple-500/20 to-pink-500/20",
    border: "border border-purple-400/30 hover:border-purple-400/50",
    glow: "rgba(168, 85, 247, 0.3)",
    icon: "text-purple-400",
    particle: "bg-purple-400",
    text: "text-purple-400",
  },
  green: {
    background: "bg-gradient-to-r from-green-500/20 to-emerald-500/20",
    border: "border border-green-400/30 hover:border-green-400/50",
    glow: "rgba(16, 185, 129, 0.3)",
    icon: "text-green-400",
    particle: "bg-green-400",
    text: "text-green-400",
  },
  orange: {
    background: "bg-gradient-to-r from-orange-500/20 to-red-500/20",
    border: "border border-orange-400/30 hover:border-orange-400/50",
    glow: "rgba(249, 115, 22, 0.3)",
    icon: "text-orange-400",
    particle: "bg-orange-400",
    text: "text-orange-400",
  },
  yellow: {
    background: "bg-gradient-to-r from-yellow-500/20 to-amber-500/20",
    border: "border border-yellow-400/30 hover:border-yellow-400/50",
    glow: "rgba(245, 158, 11, 0.3)",
    icon: "text-yellow-400",
    particle: "bg-yellow-400",
    text: "text-yellow-400",
  },
};

// Tipos para o componente
export interface AnimatedButtonProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "custom";
  preset?: keyof typeof BUTTON_PRESETS;
  colors?: ButtonPreset;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}
