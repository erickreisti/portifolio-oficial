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

      // Verificar elementos interativos
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
        className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
          isPointer
            ? "border-cyan-400 bg-cyan-400/30 shadow-[0_0_30px_#00ffff,0_0_60px_#00ffff40] scale-150"
            : "border-white/80 bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-100"
        } backdrop-blur-md cursor-pulse`}
      />

      {/* Núcleo central pulsante */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
          isPointer
            ? "bg-cyan-400 w-4 h-4 shadow-[0_0_20px_#00ffff,0_0_40px_#00ffff]"
            : "bg-white w-3 h-3 shadow-[0_0_10px_white,0_0_20px_white]"
        } cursor-core`}
      />

      {/* Partículas orbitais - sempre visíveis mas mais intensas no hover */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-orbit-fast shadow-[0_0_10px_#00ffff]" />
      <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full animate-orbit-faster shadow-[0_0_10px_#0066ff]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full animate-orbit-fastest shadow-[0_0_10px_#9933ff]" />
      <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full animate-orbit-reverse shadow-[0_0_10px_#00ff99]" />

      {/* Partículas extras no hover */}
      {isPointer && (
        <>
          <div className="absolute top-1/4 -right-2 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-orbit-fast shadow-[0_0_8px_#ffd700]" />
          <div className="absolute -left-2 bottom-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-orbit-faster shadow-[0_0_8px_#ff69b4]" />
        </>
      )}
    </div>
  );
};
