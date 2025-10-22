// app/layout.tsx (Versão Final da FASE 5, completa)
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/app/providers";

// Configuração da Fonte Inter (Otimização da FASE 4)
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// CORREÇÃO: Removida importação não utilizada de fontInter

// Metadados Essenciais para SEO (FASE 4)
export const metadata: Metadata = {
  title: "Erick Reis | Desenvolvedor FullStack & Arquiteto de Sistemas",
  description:
    "Portfólio profissional de Erick Reis, especializado em aplicações escaláveis com Next.js, TypeScript e arquitetura de código limpa.",
  keywords: [
    "Next.js",
    "FullStack",
    "TypeScript",
    "Tailwind CSS",
    "Portfolio",
    "Desenvolvedor",
  ],
  authors: [{ name: "Erick Reis" }],
  openGraph: {
    title: "Erick Reis | FullStack Developer",
    description: "Transformando ideias em código robusto e performance.",
    url: "https://seu-portfolio.com",
    siteName: "Erick Reis Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
