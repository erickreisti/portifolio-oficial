"use client";

import { useEffect, useRef, useState } from "react";

export const SimpleTechCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      }

      // Verificar apenas elementos interativos
      const target = e.target as HTMLElement;
      const shouldBePointer =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        target.closest('[role="button"]') !== null ||
        target.closest('[class*="cursor-pointer"]') !== null ||
        target.closest('[class*="interactive"]') !== null;

      setIsPointer(shouldBePointer);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isClient]);

  // Não renderizar no servidor
  if (!isClient) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="custom-cursor-visible fixed pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: 0, top: 0 }}
    >
      {/* Círculo principal do cursor */}
      <div
        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
          isPointer
            ? "border-cyan-400 bg-cyan-400/20 shadow-[0_0_20px_#00ffff] scale-125"
            : "border-white bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.5)] scale-100"
        } backdrop-blur-sm`}
      />

      {/* Núcleo pulsante */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ${
          isPointer
            ? "bg-cyan-400 w-3 h-3 shadow-[0_0_15px_#00ffff]"
            : "bg-white w-2 h-2 shadow-[0_0_5px_white]"
        }`}
      />

      {/* Partículas orbitais apenas no hover */}
      {isPointer && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-orbit-cursor-1 shadow-[0_0_8px_#00ffff]" />
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full animate-orbit-cursor-2 shadow-[0_0_8px_#0066ff]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-orbit-cursor-3 shadow-[0_0_8px_#9933ff]" />
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-green-400 rounded-full animate-orbit-cursor-4 shadow-[0_0_8px_#00ff99]" />
        </>
      )}
    </div>
  );
};
