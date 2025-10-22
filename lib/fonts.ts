// lib/fonts.ts
import { Inter } from "next/font/google";

// Configuração da fonte Inter para o App Router
export const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Define a variável CSS que será usada no tailwind.config.ts
});
