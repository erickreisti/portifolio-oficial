import type { Metadata, Viewport } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { LoadingProvider } from "@/providers/LoadingProvider";
import { ThemeFlashPrevent } from "@/components/layout/ThemeFlashPrevent";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Erick Reis | Desenvolvedor FullStack & Arquiteto de Sistemas",
    template: "%s | Erick Reis",
  },
  description:
    "Desenvolvedor FullStack especializado em Next.js, React, TypeScript e arquitetura de sistemas escaláveis. Transformo ideias em soluções digitais robustas e performáticas.",
  keywords: [
    "Desenvolvedor FullStack",
    "Next.js",
    "React",
    "TypeScript",
    "Arquiteto de Sistemas",
    "Rio de Janeiro",
    "Desenvolvimento Web",
    "JavaScript",
    "Node.js",
    "Frontend",
    "Backend",
  ],
  authors: [{ name: "Erick Reis" }],
  creator: "Erick Reis",
  publisher: "Erick Reis",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://erickreis.dev",
    title: "Erick Reis | Desenvolvedor FullStack & Arquiteto de Sistemas",
    description:
      "Desenvolvedor FullStack especializado em Next.js, React, TypeScript e arquitetura de sistemas escaláveis",
    siteName: "Erick Reis Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Erick Reis - Desenvolvedor FullStack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Erick Reis | Desenvolvedor FullStack",
    description:
      "Desenvolvedor FullStack especializado em Next.js, React e TypeScript",
    creator: "@ereislima",
    images: ["/og-image.jpg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0f172a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* ✅ FONTES OTIMIZADAS - APENAS GOOGLE FONTS */}
        <meta name="theme-color" content="#0f172a" />
        <meta name="msapplication-TileColor" content="#0f172a" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden selection:bg-blue-500/30",
          poppins.variable,
          openSans.variable
        )}
        suppressHydrationWarning
      >
        <ThemeFlashPrevent />
        <LoadingProvider>{children}</LoadingProvider>

        {/* Schema Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Erick Reis",
              jobTitle: "Desenvolvedor FullStack & Arquiteto de Sistemas",
              url: "https://erickreis.dev",
              sameAs: [
                "https://github.com/erickreisti",
                "https://linkedin.com/in/erickreis",
                "https://x.com/ereislima",
              ],
              knowsAbout: [
                "Next.js",
                "React",
                "TypeScript",
                "Node.js",
                "PostgreSQL",
                "Tailwind CSS",
                "System Architecture",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
