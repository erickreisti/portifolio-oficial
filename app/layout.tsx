import type { Metadata, Viewport } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { LoadingProvider } from "@/providers/LoadingProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Erick Reis | Desenvolvedor FullStack & Arquiteto de Sistemas",
  description:
    "Portfólio profissional de Erick Reis - Desenvolvedor FullStack especializado em Next.js, React, TypeScript e arquitetura de sistemas escaláveis",
  keywords: [
    "Desenvolvedor FullStack",
    "Next.js",
    "React",
    "TypeScript",
    "Arquiteto de Sistemas",
  ],
  authors: [{ name: "Erick Reis" }],
  robots: "index, follow",
  openGraph: {
    title: "Erick Reis | Desenvolvedor FullStack & Arquiteto de Sistemas",
    description:
      "Desenvolvedor FullStack especializado em Next.js, React, TypeScript e arquitetura de sistemas escaláveis",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Erick Reis | Desenvolvedor FullStack",
    description:
      "Desenvolvedor FullStack especializado em Next.js, React e TypeScript",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-transparent text-white font-sans antialiased overflow-x-hidden", // ADD: overflow-x-hidden
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
