// app/providers.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// REMOVIDA: A importação problemática 'next-themes/dist/types'
// Agora, inferimos o tipo das props do componente principal:
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

/**
 * Componente Provedor de Tema que envolve a aplicação.
 * Usa a biblioteca next-themes.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
