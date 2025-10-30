import type { Metadata } from "next";
import "./globals.css";
import { ThemeFlashPrevent } from "@/components/layout/ThemeFlashPrevent";

export const metadata: Metadata = {
  title: "Érick Reis - Full Stack Developer",
  description:
    "Desenvolvedor Full Stack especializado em React, Next.js, TypeScript e Node.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeFlashPrevent />
        {children}
      </body>
    </html>
  );
}
