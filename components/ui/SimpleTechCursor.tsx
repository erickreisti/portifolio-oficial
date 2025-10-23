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
    let lastX = 0;
    let lastY = 0;

    const updateCursor = () => {
      // Usar transform para melhor performance (GPU accelerated)
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      rafIdRef.current = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Verificar se é um elemento clicável (usando throttle)
      if (Math.abs(e.clientX - lastX) > 2 || Math.abs(e.clientY - lastY) > 2) {
        const target = e.target as HTMLElement;
        const shouldBePointer =
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") !== null ||
          target.closest("a") !== null;

        setIsPointer(shouldBePointer);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = "0";
    };

    // Iniciar animation loop
    rafIdRef.current = requestAnimationFrame(updateCursor);

    // Usar passive events para melhor performance
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, {
      passive: true,
    });
    document.addEventListener("mouseleave", handleMouseLeave, {
      passive: true,
    });

    // Mostrar cursor inicialmente
    cursor.style.opacity = "1";

    // Cleanup
    return () => {
      cancelAnimationFrame(rafIdRef.current);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] will-change-transform"
      style={{
        left: "0px",
        top: "0px",
      }}
    >
      <div
        className={`w-4 h-4 rounded-full border-2 transition-transform duration-75 ${
          isPointer
            ? "border-blue-400 bg-blue-400/30 scale-125"
            : "border-white bg-white/20 scale-100"
        }`}
      />
    </div>
  );
};
