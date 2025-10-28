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

        // Cores tech personalizadas
        tech: {
          blue: "#3b82f6",
          green: "#10b981",
          purple: "#8b5cf6",
          cyan: "#06b6d4",
          orange: "#f59e0b",
          pink: "#ec4899",
          indigo: "#6366f1",
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
            "text-shadow": "0 0 5px currentColor, 0 0 10px currentColor",
          },
          "50%": {
            "text-shadow":
              "0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor",
          },
        },
        "text-shine": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
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
    },
  },
  plugins: [require("tailwindcss-animate")],
};

module.exports = config;
