"use client";

import { useEffect } from "react";

export function ThemeFlashPrevent() {
  useEffect(() => {
    // Aplicação imediata do tema escuro
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";

    // Estilos críticos
    const criticalStyles = `
      html, body {
        background: #0f172a !important;
        color: white;
        margin: 0 !important;
        transition: none !important;
      }
      .no-transition * {
        transition: none !important;
        animation: none !important;
      }
    `;

    const style = document.createElement("style");
    style.textContent = criticalStyles;
    document.head.appendChild(style);

    document.body.classList.add("no-transition");

    const timer = setTimeout(() => {
      document.body.classList.remove("no-transition");
      style.remove();
    }, 300);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove("no-transition");
    };
  }, []);

  return null;
}

export default ThemeFlashPrevent;
