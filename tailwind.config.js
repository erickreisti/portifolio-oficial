/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./lib/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-open-sans)", "system-ui", "sans-serif"],
        poppins: ["var(--font-poppins)", "system-ui", "sans-serif"],
        mono: ["'Fira Code'", "'JetBrains Mono'", "monospace"],
      },
      colors: {
        // Cores do design system
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Cores tech personalizadas - ATUALIZADAS para ciano/azul
        tech: {
          cyan: {
            50: "#ecfeff",
            100: "#cffafe",
            200: "#a5f3fc",
            300: "#67e8f9",
            400: "#22d3ee",
            500: "#06b6d4", // Cor primária principal
            600: "#0891b2",
            700: "#0e7490",
            800: "#155e75",
            900: "#164e63",
            950: "#083344",
          },
          blue: {
            50: "#eff6ff",
            100: "#dbeafe",
            200: "#bfdbfe",
            300: "#93c5fd",
            400: "#60a5fa",
            500: "#3b82f6", // Cor secundária principal
            600: "#2563eb",
            700: "#1d4ed8",
            800: "#1e40af",
            900: "#1e3a8a",
            950: "#172554",
          },
          // Cores de suporte harmonizadas
          indigo: {
            400: "#818cf8",
            500: "#6366f1",
          },
          // Removidas cores não utilizadas no novo tema
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        // Animações base
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },

        // Animações premium
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-3d": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "33%": { transform: "translate3d(10px, -15px, 10px) rotate(5deg)" },
          "66%": { transform: "translate3d(-5px, 10px, -5px) rotate(-3deg)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "neon-pulse": {
          "0%, 100%": {
            "text-shadow": "0 0 5px #06b6d4, 0 0 10px #06b6d4",
          },
          "50%": {
            "text-shadow":
              "0 0 20px #06b6d4, 0 0 40px #06b6d4, 0 0 60px #06b6d4",
          },
        },
        "text-shine": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        "cyan-glow": {
          "0%, 100%": {
            "box-shadow": "0 0 5px #06b6d4, 0 0 10px #06b6d4",
          },
          "50%": {
            "box-shadow": "0 0 20px #06b6d4, 0 0 40px #06b6d4",
          },
        },
        "border-glow": {
          "0%, 100%": {
            "border-color": "rgba(6, 182, 212, 0.3)",
            "box-shadow": "0 0 10px rgba(6, 182, 212, 0.2)",
          },
          "50%": {
            "border-color": "rgba(6, 182, 212, 0.6)",
            "box-shadow": "0 0 20px rgba(6, 182, 212, 0.4)",
          },
        },
      },
      animation: {
        // Animações base
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",

        // Animações premium
        "fade-in": "fade-in 0.6s ease-out",
        "fade-up": "fade-up 0.8s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
        "slide-down": "slide-down 0.6s ease-out",
        "scale-in": "scale-in 0.5s ease-out",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-3d": "float-3d 8s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        gradient: "gradient 3s ease infinite",
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        "text-shine": "text-shine 2s ease-in-out infinite alternate",
        "cyan-glow": "cyan-glow 2s ease-in-out infinite",
        "border-glow": "border-glow 3s ease-in-out infinite",

        // Animações com delays
        "fade-in-delay": "fade-in 0.6s ease-out 0.3s both",
        "fade-up-delay": "fade-up 0.8s ease-out 0.5s both",
      },
      backgroundSize: {
        200: "200% 200%",
        300: "300% 300%",
      },
      backdropBlur: {
        xs: "2px",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
      // Gradientes personalizados para o novo tema
      backgroundImage: {
        "cyan-gradient": "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
        "cyan-gradient-hover":
          "linear-gradient(135deg, #0891b2 0%, #2563eb 100%)",
        "cyan-to-blue": "linear-gradient(to right, #06b6d4, #3b82f6)",
        "blue-to-cyan": "linear-gradient(to right, #3b82f6, #06b6d4)",
        "cyan-glow": "linear-gradient(45deg, #06b6d4, #22d3ee, #06b6d4)",
        "premium-bg":
          "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0c4a6e 100%)",
      },
      // Novas utilidades para o tema ciano/azul
      boxShadow: {
        "cyan-sm": "0 1px 2px 0 rgba(6, 182, 212, 0.05)",
        cyan: "0 4px 6px -1px rgba(6, 182, 212, 0.1), 0 2px 4px -1px rgba(6, 182, 212, 0.06)",
        "cyan-md":
          "0 10px 15px -3px rgba(6, 182, 212, 0.1), 0 4px 6px -2px rgba(6, 182, 212, 0.05)",
        "cyan-lg":
          "0 20px 25px -5px rgba(6, 182, 212, 0.1), 0 10px 10px -5px rgba(6, 182, 212, 0.04)",
        "cyan-xl": "0 25px 50px -12px rgba(6, 182, 212, 0.25)",
        "cyan-2xl": "0 50px 100px -20px rgba(6, 182, 212, 0.25)",
        "cyan-glow": "0 0 20px rgba(6, 182, 212, 0.5)",
        "cyan-inner": "inset 0 2px 4px 0 rgba(6, 182, 212, 0.06)",
      },
      textShadow: {
        cyan: "0 0 5px rgba(6, 182, 212, 0.5)",
        "cyan-lg": "0 0 10px rgba(6, 182, 212, 0.8)",
        "cyan-xl": "0 0 15px rgba(6, 182, 212, 1)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Plugin para text-shadow (se necessário)
    function ({ addUtilities, theme }) {
      const newUtilities = {
        ".text-shadow-cyan": {
          textShadow: theme("textShadow.cyan"),
        },
        ".text-shadow-cyan-lg": {
          textShadow: theme("textShadow.cyan-lg"),
        },
        ".text-shadow-cyan-xl": {
          textShadow: theme("textShadow.cyan-xl"),
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};

module.exports = config;
