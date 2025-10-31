// lib/colors.ts - VERSÃO CORRIGIDA E SIMPLIFICADA
// Sistema de Cores Centralizado - Tema Tech Escuro

export const COLORS = {
  // Paleta principal do tema
  primary: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
  },

  // Gradientes pré-definidos
  gradients: {
    primary: "from-cyan-500 to-blue-500",
    secondary: "from-purple-500 to-pink-500",
    success: "from-green-500 to-emerald-500",
    warning: "from-orange-500 to-red-500",
    dark: "from-gray-900 via-blue-900 to-purple-900",
    card: "from-gray-900/60 to-gray-800/40",
  },

  // Bordas com opacidade
  borders: {
    light: "border-cyan-500/20",
    medium: "border-cyan-400/30",
    strong: "border-cyan-400/50",
    accent: "border-purple-500/20",
  },

  // Classes completas reutilizáveis
  classes: {
    // Cards
    card: "bg-gray-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl",
    cardHover:
      "hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-400/20 transition-all duration-300",

    // Botões
    button: {
      primary:
        "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-2xl shadow-cyan-400/30 hover:shadow-cyan-400/50 hover:scale-105",
      secondary:
        "bg-gray-800/50 border border-cyan-500/20 text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-500/10",
      ghost:
        "bg-transparent border border-cyan-500/20 text-cyan-400 hover:border-cyan-400/50",
    },

    // Texto
    text: {
      primary: "text-white",
      secondary: "text-gray-300",
      tertiary: "text-gray-400",
      accent: "text-cyan-400",
      gradient:
        "bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent",
    },

    // Backgrounds
    background: {
      primary: "bg-gray-900",
      secondary: "bg-gray-800",
      overlay: "bg-black/80",
      card: "bg-gray-900/60",
      section: "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900",
      header: "bg-gray-900/80 backdrop-blur-xl",
    },
  },
} as const;

// Fallback seguro para quando COLORS não estiver disponível
export const getSafeColors = () => {
  return {
    classes: {
      text: {
        gradient:
          "bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent",
        accent: "text-cyan-400",
        primary: "text-white",
        secondary: "text-gray-300",
        tertiary: "text-gray-400",
      },
      background: {
        primary: "bg-gray-900",
        secondary: "bg-gray-800",
        overlay: "bg-black/80",
        card: "bg-gray-900/60",
        section: "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900",
        header: "bg-gray-900/80 backdrop-blur-xl",
      },
    },
    borders: {
      light: "border-cyan-500/20",
      medium: "border-cyan-400/30",
      strong: "border-cyan-400/50",
      accent: "border-purple-500/20",
    },
  };
};

// Utilitários de cores para componentes específicos
export const COLOR_UTILS = {
  // Gradientes para textos
  textGradients: {
    primary:
      "bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent",
    secondary:
      "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent",
    success:
      "bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent",
    warning:
      "bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent",
  },

  // Gradientes para backgrounds
  backgroundGradients: {
    primary:
      "bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10",
    secondary:
      "bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10",
    dark: "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900",
    premium:
      "bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-purple-900/20",
    card: "bg-gradient-to-br from-gray-900/60 to-gray-800/40",
  },

  // Sombras com cores
  shadows: {
    cyan: "shadow-2xl shadow-cyan-400/20",
    blue: "shadow-2xl shadow-blue-400/20",
    purple: "shadow-2xl shadow-purple-400/20",
    glow: "shadow-2xl shadow-cyan-400/30",
  },

  // Bordas gradientes
  borderGradients: {
    cyan: "border border-cyan-400/30",
    blue: "border border-blue-400/30",
    purple: "border border-purple-400/30",
    hover: {
      cyan: "hover:border-cyan-400/50",
      blue: "hover:border-blue-400/50",
      purple: "hover:border-purple-400/50",
    },
  },
};

// Tipos TypeScript
export type ColorVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "cyan"
  | "blue"
  | "indigo";
export type GradientVariant = keyof typeof COLORS.gradients;
export type TextVariant = keyof typeof COLORS.classes.text;
export type BackgroundVariant = keyof typeof COLORS.classes.background;
export type BorderVariant = keyof typeof COLORS.borders;

// Função para gerar classes de cor baseadas na variante - APENAS VARIANTES VÁLIDAS
export const getColorClasses = (variant: ColorVariant) => {
  const variants = {
    primary: {
      text: COLORS.classes.text.gradient,
      bg: COLOR_UTILS.backgroundGradients.primary,
      border: COLOR_UTILS.borderGradients.cyan,
      shadow: COLOR_UTILS.shadows.cyan,
    },
    secondary: {
      text: COLOR_UTILS.textGradients.secondary,
      bg: COLOR_UTILS.backgroundGradients.secondary,
      border: COLOR_UTILS.borderGradients.purple,
      shadow: COLOR_UTILS.shadows.purple,
    },
    success: {
      text: COLOR_UTILS.textGradients.success,
      bg: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
      border: "border border-green-400/30",
      shadow: "shadow-2xl shadow-green-400/20",
    },
    warning: {
      text: COLOR_UTILS.textGradients.warning,
      bg: "bg-gradient-to-br from-orange-500/10 to-red-500/10",
      border: "border border-orange-400/30",
      shadow: "shadow-2xl shadow-orange-400/20",
    },
    cyan: {
      text: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: COLOR_UTILS.borderGradients.cyan,
      shadow: COLOR_UTILS.shadows.cyan,
    },
    blue: {
      text: "text-blue-400",
      bg: "bg-blue-500/10",
      border: COLOR_UTILS.borderGradients.blue,
      shadow: COLOR_UTILS.shadows.blue,
    },
    indigo: {
      text: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border border-indigo-400/30",
      shadow: "shadow-2xl shadow-indigo-400/20",
    },
  };

  return variants[variant] || variants.primary;
};

// Função separada para gradientes
export const getGradientClasses = (gradient: GradientVariant) => {
  const gradients = {
    primary: "bg-gradient-to-r from-cyan-500 to-blue-500",
    secondary: "bg-gradient-to-r from-purple-500 to-pink-500",
    success: "bg-gradient-to-r from-green-500 to-emerald-500",
    warning: "bg-gradient-to-r from-orange-500 to-red-500",
    dark: "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900",
    card: "bg-gradient-to-br from-gray-900/60 to-gray-800/40",
  };

  return gradients[gradient] || gradients.primary;
};

// Função segura que aceita qualquer string e retorna classes válidas
export const getSafeColorClasses = (variant: string) => {
  const validVariants: Record<string, ReturnType<typeof getColorClasses>> = {
    primary: getColorClasses("primary"),
    secondary: getColorClasses("secondary"),
    success: getColorClasses("success"),
    warning: getColorClasses("warning"),
    cyan: getColorClasses("cyan"),
    blue: getColorClasses("blue"),
    indigo: getColorClasses("indigo"),
    // Fallbacks para variantes que não existem
    dark: {
      text: "text-gray-300",
      bg: COLOR_UTILS.backgroundGradients.dark,
      border: "border border-gray-600/30",
      shadow: "shadow-2xl shadow-gray-400/20",
    },
    card: {
      text: "text-gray-300",
      bg: COLOR_UTILS.backgroundGradients.card,
      border: "border border-gray-600/30",
      shadow: "shadow-2xl shadow-gray-400/20",
    },
  };

  return validVariants[variant] || validVariants.primary;
};

// Hook para usar cores de forma reativa
export const useColors = () => {
  return {
    ...COLORS,
    utils: COLOR_UTILS,
    getSafeColors,
    getColorClasses,
    getGradientClasses,
    getSafeColorClasses,
  };
};

// Exportação padrão para uso geral
export default COLORS;
