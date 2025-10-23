import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/app/providers";
import { LoadingProvider } from "@/providers/LoadingProvider";
import { ThemeFlashPrevent } from "@/components/layout/ThemeFlashPrevent";

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
      <head>
        {/* Script inline para prevenir flash ANTES de qualquer CSS carregar */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Executa IMEDIATAMENTE antes do DOM carregar
              (function() {
                try {
                  // Força tema escuro antes de qualquer coisa
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                  
                  // Aplica background escuro imediatamente
                  document.documentElement.style.backgroundColor = '#0f172a';
                  if (document.body) {
                    document.body.style.backgroundColor = '#0f172a';
                  }
                  
                  // Previne transições iniciais
                  var style = document.createElement('style');
                  style.textContent = 'html, body { background: #0f172a !important; transition: none !important; }';
                  document.head.appendChild(style);
                  
                  // Limpa após carregamento
                  document.addEventListener('DOMContentLoaded', function() {
                    setTimeout(function() {
                      if (document.head.contains(style)) {
                        document.head.removeChild(style);
                      }
                    }, 50);
                  });
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-slate-950 text-white font-sans antialiased",
          poppins.variable,
          openSans.variable
        )}
        suppressHydrationWarning
      >
        <ThemeFlashPrevent />
        <LoadingProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
