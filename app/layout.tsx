import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/app/providers";
import { LoadingProvider } from "@/providers/LoadingProvider";
import { ThemeFlashPrevent } from "@/components/layout/ThemeFlashPrevent";
import { CursorWrapper } from "@/components/ui/CursorWrapper";

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
    "Erick Reis",
    "Desenvolvedor FullStack",
    "Next.js",
    "TypeScript",
    "React",
    "Portfólio",
    "Desenvolvimento Web",
    "Arquiteto de Software",
  ],
  authors: [{ name: "Erick Reis" }],
  creator: "Erick Reis",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://erickreis.dev",
    title: "Erick Reis | Desenvolvedor FullStack & Arquiteto de Sistemas",
    description:
      "Portfólio profissional de Erick Reis, especializado em aplicações escaláveis com Next.js, TypeScript e arquitetura de código limpa.",
    siteName: "Erick Reis Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Erick Reis | Desenvolvedor FullStack & Arquiteto de Sistemas",
    description:
      "Portfólio profissional de Erick Reis, especializado em aplicações escaláveis com Next.js, TypeScript e arquitetura de código limpa.",
    creator: "@ereislima",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="msapplication-TileColor" content="#0f172a" />
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
