// components/layout/ThemeFlashPrevent.tsx - CORRIGIDO
"use client";

import { useEffect } from "react";

export function ThemeFlashPrevent() {
  useEffect(() => {
    // Aplicação imediata do tema escuro
    document.documentElement.classList.add("dark");
    document.documentElement.style.backgroundColor = "#0f172a";
    document.body.style.backgroundColor = "#0f172a";

    // Remover após um tempo
    const timer = setTimeout(() => {
      document.body.style.transition = "background-color 0.3s ease";
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
