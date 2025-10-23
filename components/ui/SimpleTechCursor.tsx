"use client";

import { useEffect, useRef, useState } from "react";

export const SimpleTechCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const updateCursor = () => {
      // Movimento instantâneo sem easing para máxima fluidez
      cursorX = mouseX;
      cursorY = mouseY;

      cursor.style.left = cursorX + "px";
      cursor.style.top = cursorY + "px";
      rafIdRef.current = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Detectar elementos clicáveis (com throttle simples)
      const target = e.target as HTMLElement;
      const shouldBePointer =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null;

      setIsPointer(shouldBePointer);
    };

    // Iniciar animation loop
    rafIdRef.current = requestAnimationFrame(updateCursor);

    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2"
    >
      {/* Círculo externo - SEM TRANSITION */}
      <div
        className={`w-6 h-6 rounded-full border-2 ${
          isPointer
            ? "border-blue-400 bg-blue-400/20"
            : "border-white/80 bg-white/10"
        }`}
      />

      {/* Círculo médio - SEM TRANSITION */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
          isPointer ? "bg-blue-400 w-3 h-3" : "bg-white w-2 h-2"
        }`}
      />

      {/* Efeito de brilho - SEM TRANSITION */}
      <div
        className={`absolute inset-0 rounded-full ${
          isPointer
            ? "shadow-[0_0_15px_3px_rgba(59,130,246,0.4)]"
            : "shadow-[0_0_10px_2px_rgba(255,255,255,0.2)]"
        }`}
      />
    </div>
  );
};
