"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

// Renomeado para ThemeToggle para ser consistente com o nome do arquivo/importação
export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  // Usa o DropdownMenu se for preferível, mas o botão simples é mais direto
  return (
    <Button
      variant="ghost"
      size="icon"
      // Alterna entre light e dark
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="text-foreground transition-colors hover:bg-card/70"
    >
      {/* Ícone Sol (Light Mode) - Esconde no Dark Mode */}
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      {/* Ícone Lua (Dark Mode) - Aparece no Dark Mode */}
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
