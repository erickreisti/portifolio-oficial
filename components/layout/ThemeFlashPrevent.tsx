// components/ThemeFlashPrevent.tsx
"use client";

import { useEffect } from "react";

export function ThemeFlashPrevent() {
  useEffect(() => {
    // Código executado imediatamente no cliente
    const root = document.documentElement;

    // Garante tema escuro
    root.classList.add("dark");
    root.classList.remove("light");

    // Força background escuro
    root.style.backgroundColor = "#0f172a";
    document.body.style.backgroundColor = "#0f172a";

    // Remove qualquer transição durante o carregamento
    const style = document.createElement("style");
    style.textContent = `
      * {
        transition: none !important;
        animation: none !important;
      }
    `;
    document.head.appendChild(style);

    // Remove o style após um curto período
    setTimeout(() => {
      document.head.removeChild(style);
    }, 100);
  }, []);

  return null;
}
