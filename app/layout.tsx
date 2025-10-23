import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/app/providers";
import { LoadingProvider } from "@/providers/LoadingProvider";

// Configuração das fonts do RainbowIT
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-open-sans",
});

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
    <html lang="pt-BR" suppressHydrationWarning className="dark">
      <body
        className={cn(
          "min-h-screen bg-slate-950 text-white font-sans antialiased",
          poppins.variable,
          openSans.variable
        )}
      >
        <LoadingProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
