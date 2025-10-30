import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seu Portfólio",
  description: "Descrição do seu portfólio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
