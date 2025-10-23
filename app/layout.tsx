import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/app/providers";
import { LoadingProvider } from "@/providers/LoadingProvider";
import { ThemeFlashPrevent } from "@/components/layout/ThemeFlashPrevent";
import { CursorWrapper } from "@/components/ui/CursorWrapper";

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
  // ... resto do metadata
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="dark">
      <head>
        <link
          rel="preload"
          href="/favicon.ico"
          as="image"
          type="image/x-icon"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-slate-950 text-white font-sans antialiased overflow-x-hidden",
          poppins.variable,
          openSans.variable
        )}
        suppressHydrationWarning
      >
        <div className="overflow-x-hidden w-full">
          <ThemeFlashPrevent />
          <LoadingProvider>
            <CursorWrapper />
            <ThemeProvider>{children}</ThemeProvider>
          </LoadingProvider>
        </div>
      </body>
    </html>
  );
}
