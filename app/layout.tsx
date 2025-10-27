// app/layout.tsx
import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { LoadingProvider } from "@/providers/LoadingProvider";

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
    "Portfólio profissional de Erick Reis - Desenvolvedor FullStack especializado em Next.js, React, TypeScript e arquitetura de sistemas escaláveis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="dark">
      <head>
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-slate-950 text-white font-sans antialiased",
          poppins.variable,
          openSans.variable
        )}
        suppressHydrationWarning
      >
        <LoadingProvider>{children}</LoadingProvider>
      </body>
    </html>
  );
}
