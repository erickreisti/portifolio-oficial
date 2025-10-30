// Sistema de Cores Centralizado - Tema Tech Escuro
// Fornece cores e classes padronizadas para todo o projeto

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
    primary: "from-cyan-400 to-blue-400",
    secondary: "from-purple-500 to-pink-500",
    success: "from-green-400 to-emerald-500",
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
      },
    },
    borders: {
      light: "border-cyan-500/20",
      medium: "border-cyan-400/30",
    },
  };
};
