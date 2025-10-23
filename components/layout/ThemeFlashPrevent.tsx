// components/ThemeFlashPrevent.tsx
"use client";

import { useEffect } from "react";

export function ThemeFlashPrevent() {
  useEffect(() => {
    // Prevenção robusta de flash de tema
    if (typeof window !== "undefined") {
      const root = document.documentElement;

      // Remove qualquer classe de tema claro
      root.classList.remove("light");
      root.classList.add("dark");

      // Garante que o background seja escuro
      document.body.style.backgroundColor = "#0f172a";
      document.body.style.transition = "background-color 0.3s ease";

      // Backup: verificação contínua por 5 segundos
      const interval = setInterval(() => {
        if (!root.classList.contains("dark")) {
          root.classList.add("dark");
        }
      }, 100);

      setTimeout(() => clearInterval(interval), 5000);
    }
  }, []);

  return null;
}
