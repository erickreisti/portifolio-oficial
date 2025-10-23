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
    "React",
    "Node.js",
    "JavaScript",
  ],
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },
  authors: [{ name: "Erick Reis" }],
  creator: "Erick Reis",
  publisher: "Erick Reis",
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
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://erickreis.dev",
    title: "Erick Reis | Desenvolvedor FullStack & Arquiteto de Sistemas",
    description:
      "Portfólio profissional de Erick Reis, especializado em aplicações escaláveis com Next.js, TypeScript e arquitetura de código limpa.",
    siteName: "Erick Reis Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Erick Reis - FullStack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Erick Reis | Desenvolvedor FullStack & Arquiteto de Sistemas",
    description:
      "Portfólio profissional de Erick Reis, especializado em aplicações escaláveis com Next.js, TypeScript e arquitetura de código limpa.",
    creator: "@erickreis",
    images: ["/og-image.jpg"],
  },
  verification: {
    // Adicione aqui suas verificações do Google Search Console e outros
    // google: 'seu-codigo-verificacao-google',
    // yandex: 'seu-codigo-verificacao-yandex',
    // yahoo: 'seu-codigo-verificacao-yahoo',
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="dark">
      <head>
        {/* Preload para melhor performance */}
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
            <ThemeProvider>{children}</ThemeProvider>
          </LoadingProvider>
        </div>
      </body>
    </html>
  );
}
