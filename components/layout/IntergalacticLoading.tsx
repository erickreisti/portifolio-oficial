// components/IntergalacticLoading.tsx
"use client";

import { useEffect, useState } from "react";
import { Rocket, Stars, Satellite, Orbit } from "lucide-react";

export const IntergalacticLoading = () => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    "INICIANDO PROPULSORES INTERGALÁCTICOS...",
    "CALIBRANDO HIPERDRIVE...",
    "SINCRONIZANDO COM A MATRIZ CÓSMICA...",
    "CARREGANDO ENERGIA DO VAZIO QUÂNTICO...",
    "ESTABELECENDO CONEXÃO COM O MULTIVERSO...",
    "PRONTO PARA DECOLAGEM! 🚀",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    const messageTimer = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-950 z-50 flex items-center justify-center overflow-hidden">
      {/* Fundo Estelar */}
      <div className="absolute inset-0">
        {/* Estrelas */}
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}

        {/* Nebulosa */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Foguete Central com Órbita */}
        <div className="relative">
          {/* Órbita Externa */}
          <div className="absolute -inset-8 border-2 border-blue-400/30 rounded-full animate-spin-slow">
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2">
              <Satellite className="h-4 w-4 text-cyan-400 animate-pulse" />
            </div>
          </div>

          {/* Órbita Interna */}
          <div
            className="absolute -inset-4 border border-purple-400/20 rounded-full animate-spin-slow"
            style={{ animationDirection: "reverse" }}
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Stars className="h-3 w-3 text-yellow-400" />
            </div>
          </div>

          {/* Foguete Principal */}
          <div className="relative">
            <Rocket className="h-16 w-16 text-blue-400 animate-bounce-subtle" />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-orange-500/50 rounded-full blur-sm animate-pulse" />
          </div>
        </div>

        {/* Mensagem Dinâmica */}
        <div className="text-center">
          <p className="text-blue-300 font-mono font-bold text-lg tracking-widest mb-2 animate-pulse">
            {messages[currentMessage]}
          </p>

          {/* Barra de Progresso Intergaláctica */}
          <div className="w-80 h-3 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-slate-700/30">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full relative overflow-hidden transition-all duration-300"
              style={{ width: `${progress}%` }}
            >
              {/* Efeito de brilho na barra */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />

              {/* Partículas na barra */}
              <div className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse" />
              <div
                className="absolute top-0 left-2/3 w-1 h-1 bg-cyan-300 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
          </div>

          {/* Porcentagem */}
          <p className="text-slate-400 font-mono font-bold text-sm mt-3">
            {progress}%
          </p>
        </div>

        {/* Elementos Flutuantes */}
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2 text-slate-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs font-mono">SISTEMAS OK</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-400">
            <div
              className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <span className="text-xs font-mono">ENERGIA ↑</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-400">
            <div
              className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
              style={{ animationDelay: "2s" }}
            />
            <span className="text-xs font-mono">CONEXÃO ✓</span>
          </div>
        </div>
      </div>

      {/* Planetas Flutuantes */}
      <div className="absolute top-20 left-20 w-8 h-8 bg-purple-500/20 rounded-full animate-float-slow" />
      <div
        className="absolute bottom-32 right-32 w-12 h-12 bg-blue-500/20 rounded-full animate-float-slow"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute top-40 right-40 w-6 h-6 bg-cyan-500/20 rounded-full animate-float-slow"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Asteroides */}
      <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-amber-500/30 rounded-full animate-float-tech" />
      <div
        className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-slate-400/40 rounded-full animate-float-tech"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
};
