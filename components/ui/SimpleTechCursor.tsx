"use client";

import { useEffect, useRef, useState } from "react";

export const SimpleTechCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const particleCountRef = useRef(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    const particlesContainer = particlesRef.current;
    if (!cursor || !particlesContainer) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      }

      // Criar partículas mais frequentemente para efeito de buraco negro
      if (Math.random() > 0.3 && particleCountRef.current < 20) {
        createParticle(e.clientX, e.clientY);
      }

      const target = e.target as HTMLElement;
      const shouldBePointer =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null;

      setIsPointer(shouldBePointer);
    };

    const createParticle = (x: number, y: number) => {
      const particle = document.createElement("div");
      const size = 1.5 + Math.random() * 4; // Partículas um pouco menores
      const colors = ["#3b82f6", "#6366f1", "#8b5cf6", "#10b981", "#c084fc"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.className = "absolute rounded-full pointer-events-none";
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${x}px;
        top: ${y}px;
        opacity: 0.9;
        transform: translate(-50%, -50%);
        animation: black-hole-particle 1.5s ease-out forwards;
        filter: blur(${Math.random() * 0.5}px);
        z-index: 9997;
      `;

      particlesContainer.appendChild(particle);
      particleCountRef.current++;

      // Remover partícula após animação
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
          particleCountRef.current--;
        }
      }, 1500);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Container de partículas */}
      <div
        ref={particlesRef}
        className="fixed pointer-events-none z-[9998] inset-0"
      />

      {/* Cursor principal - Buraco Negro Branco Simplificado */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2"
      >
        {/* Círculo principal único - TAMANHO REDUZIDO */}
        <div
          className={`w-10 h-10 rounded-full border-2 ${
            isPointer
              ? "border-white/90 bg-white/30 shadow-white-glow-strong"
              : "border-white bg-white/10 shadow-white-glow"
          } backdrop-blur-sm transition-all duration-300 animate-pulse-slow`}
        />

        {/* Núcleo pulsante - AUMENTADO */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
            isPointer
              ? "bg-white/90 w-4 h-4" // Aumentado de w-3/h-3 para w-4/h-4
              : "bg-white/70 w-3 h-3" // Aumentado de w-2/h-2 para w-3/h-3
          } transition-all duration-300 shadow-inner`}
        />

        {/* Partículas orbitais COLORIDAS (azul/roxo/verde) - Ajustadas ao novo tamanho */}
        {isPointer && (
          <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full animate-orbit-1 shadow-lg shadow-blue-400/60" />
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-orbit-2 shadow-lg shadow-purple-400/60" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-green-400 rounded-full animate-orbit-3 shadow-lg shadow-green-400/60" />
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-orbit-4 shadow-lg shadow-cyan-400/60" />
            {/* Partículas extras para mais destaque */}
            <div className="absolute top-1/4 -right-2 -translate-y-1/2 w-1 h-1 bg-blue-300 rounded-full animate-orbit-5 shadow-lg shadow-blue-300/50" />
            <div className="absolute bottom-1/4 -left-2 -translate-y-1/2 w-1 h-1 bg-purple-300 rounded-full animate-orbit-6 shadow-lg shadow-purple-300/50" />
          </>
        )}
      </div>
    </>
  );
};
