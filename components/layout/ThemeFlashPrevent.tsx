// components/ThemeFlashPrevent.tsx
"use client";

import { useEffect } from "react";

export function ThemeFlashPrevent() {
  useEffect(() => {
    // Apenas garante o tema escuro sem interferir no loading
    const root = document.documentElement;
    root.classList.add("dark");
    root.classList.remove("light");
  }, []);

  return null;
}
