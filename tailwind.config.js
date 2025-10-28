/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
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
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
        mono: ["'Fira Code'", "'JetBrains Mono'", "monospace"],
      },
      colors: {
        // CINZAS DO RAINBOWIT
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },

        // CORES HSL DO SHADCN/UI
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
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        // CORES TECNOLÓGICAS ADICIONAIS
        tech: {
          blue: "#3b82f6",
          green: "#10b981",
          purple: "#8b5cf6",
          cyan: "#06b6d4",
          orange: "#f59e0b",
          pink: "#ec4899",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: `calc(var(--radius) - 4px)`,
      },

      // KEYFRAMES COMPLETAS - TODAS AS ANIMAÇÕES
      keyframes: {
        // Animações do Shadcn/UI
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },

        // Animações Intergalácticas (mantidas para compatibilidade)
        twinkle: {
          "0%, 100%": { opacity: 0.2 },
          "50%": { opacity: 1 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "33%": { transform: "translateY(-20px) rotate(5deg)" },
          "66%": { transform: "translateY(10px) rotate(-5deg)" },
        },
        "float-tech": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(10px, -15px) scale(1.1)" },
          "50%": { transform: "translate(-5px, 10px) scale(0.9)" },
          "75%": { transform: "translate(-15px, -5px) scale(1.05)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },

        // NOVAS ANIMAÇÕES TECNOLÓGICAS
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.7 },
        },
        "ping-slow": {
          "75%, 100%": {
            transform: "scale(1.5)",
            opacity: "0",
          },
        },
        "bounce-gentle": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-8px)",
          },
        },
        "spin-reverse": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 5px rgba(59, 130, 246, 0.5)",
          },
          "50%": {
            boxShadow:
              "0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6)",
          },
        },
        "matrix-rain": {
          "0%": {
            transform: "translateY(-100%)",
            opacity: 0,
          },
          "5%": {
            opacity: 1,
          },
          "90%": {
            opacity: 1,
          },
          "100%": {
            transform: "translateY(100vh)",
            opacity: 0,
          },
        },
        "circuit-flow": {
          "0%": {
            strokeDashoffset: 1000,
            opacity: 0,
          },
          "50%": {
            opacity: 1,
          },
          "100%": {
            strokeDashoffset: 0,
            opacity: 0,
          },
        },
        "hacker-text": {
          "0%": {
            content: "'INITIALIZING_SYSTEMS'",
          },
          "25%": {
            content: "'COMPILING_CODE'",
          },
          "50%": {
            content: "'OPTIMIZING_PERFORMANCE'",
          },
          "75%": {
            content: "'LAUNCHING_APPLICATION'",
          },
          "100%": {
            content: "'SYSTEM_READY'",
          },
        },

        // Animações de spin em velocidades diferentes
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "spin-medium": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "spin-fast": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },

      // ANIMAÇÕES COMPLETAS
      animation: {
        // Shadcn/UI
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",

        // Intergaláctico (mantidas)
        twinkle: "twinkle 3s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 6s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "float-tech": "float-tech 5s ease-in-out infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",

        // Tecnológicas
        shimmer: "shimmer 2s linear infinite",
        fadeIn: "fadeIn 0.5s ease-out forwards",
        fadeOut: "fadeOut 0.5s ease-out forwards",
        slideUp: "slideUp 0.6s ease-out forwards",
        slideDown: "slideDown 0.6s ease-out forwards",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "ping-slow": "ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "bounce-gentle": "bounce-gentle 1.5s ease-in-out infinite",
        "spin-reverse": "spin-reverse 3s linear infinite",
        typing: "typing 3s steps(40, end)",
        blink: "blink 1s step-end infinite",
        glow: "glow 2s ease-in-out infinite",
        "matrix-rain": "matrix-rain 3s linear infinite",
        "circuit-flow": "circuit-flow 4s ease-in-out infinite",
        "hacker-text": "hacker-text 8s steps(5, end) infinite",

        // Spins
        "spin-slow": "spin-slow 8s linear infinite",
        "spin-medium": "spin-medium 6s linear infinite",
        "spin-fast": "spin-fast 4s linear infinite",
        ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",

        // Float para elementos de código
        float: "float 6s ease-in-out infinite",
      },

      // NOVOS UTILITIES
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
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)",
        "circuit-pattern":
          "radial-gradient(circle at 1px 1px, rgba(59,130,246,0.15) 1px, transparent 0)",
        "binary-pattern":
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,130,246,0.05) 2px, rgba(59,130,246,0.05) 4px)",
      },
      backgroundSize: {
        "grid-16": "16px 16px",
        "grid-32": "32px 32px",
        "grid-64": "64px 64px",
        "circuit-20": "20px 20px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Plugin customizado para animações de texto de hacker
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-hacker": {
          "font-family": "'Fira Code', 'JetBrains Mono', monospace",
          "text-shadow": "0 0 5px #10b981, 0 0 10px #10b981",
        },
        ".terminal-text": {
          "font-family": "'Fira Code', 'JetBrains Mono', monospace",
          background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
          "background-clip": "text",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
        ".code-typing": {
          overflow: "hidden",
          "border-right": "2px solid #3b82f6",
          "white-space": "nowrap",
          animation: "typing 3.5s steps(40, end), blink 1s step-end infinite",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};

module.exports = config;
