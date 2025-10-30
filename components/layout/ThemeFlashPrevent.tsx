"use client";

import { useEffect } from "react";

export function ThemeFlashPrevent() {
  useEffect(() => {
    // Prevenir flash de tema claro
    const theme = "dark";

    // Aplicação imediata do tema escuro antes da hidratação do React
    document.documentElement.classList.add(theme);
    document.documentElement.style.colorScheme = theme;

    // Aplicar estilos críticos imediatamente
    const criticalStyles = `
      html {
        background: #0f172a !important;
        color-scheme: dark;
      }
      body {
        background: #0f172a !important;
        color: white;
        margin: 0 !important;
        transition: none !important;
      }
      * {
        transition: none !important;
      }
    `;

    const style = document.createElement("style");
    style.textContent = criticalStyles;
    document.head.appendChild(style);

    // Remover transições iniciais
    document.body.classList.add("no-transition");

    // Restaurar transições após um tempo
    const timer = setTimeout(() => {
      document.body.classList.remove("no-transition");
      style.remove();

      // Aplicar transição suave
      document.body.style.transition = "background-color 0.3s ease";
    }, 300);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove("no-transition");
    };
  }, []);

  return null;
}

// Estilos para prevenir flash
const antiFlashStyles = `
  .no-transition * {
    transition: none !important;
    animation: none !important;
  }
  
  html {
    color-scheme: dark;
  }
  
  /* Garantir que o tema escuro seja aplicado antes do JavaScript */
  @media (prefers-color-scheme: dark) {
    html:not([data-theme]) {
      background: #0f172a;
    }
  }
`;

// Adicionar estilos anti-flash
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = antiFlashStyles;
  document.head.appendChild(style);
}

export default ThemeFlashPrevent;
