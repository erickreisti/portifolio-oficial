// components/IntergalacticLoading.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { Rocket, Stars, Satellite, Orbit } from "lucide-react";

export const IntergalacticLoading = () => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const messages = [
    "INICIANDO PROPULSORES INTERGALÁCTICOS...",
    "CALIBRANDO HIPERDRIVE...",
    "SINCRONIZANDO COM A MATRIZ CÓSMICA...",
    "CARREGANDO ENERGIA DO VAZIO QUÂNTICO...",
    "ESTABELECENDO CONEXÃO COM O MULTIVERSO...",
    "PRONTO PARA DECOLAGEM! 🚀",
  ];

  // Geração otimizada de estrelas
  const generateStars = useCallback((count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.8 + 0.2,
      size: Math.random() * 3 + 1,
    }));
  }, []);

  const stars = generateStars(150);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setIsComplete(true);
          return 100;
        }
        // Progressão não-linear mais suave
        const increment = prev < 50 ? 1.5 : prev < 80 ? 1 : 0.5;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    const messageTimer = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 1800);

    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
    };
  }, []);

  return (
    <div className={`intergalactic-loading ${isComplete ? "complete" : ""}`}>
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 z-50 flex items-center justify-center overflow-hidden">
        {/* Fundo Estelar Animado */}
        <div className="absolute inset-0">
          {/* Estrelas com performance melhorada */}
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute bg-white rounded-full animate-twinkle"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
                opacity: star.opacity,
              }}
            />
          ))}

          {/* Nebulosas Dinâmicas */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-float-medium" />
          <div
            className="absolute top-3/4 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-float-slow"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* Conteúdo Principal */}
        <div className="relative z-10 flex flex-col items-center space-y-6 lg:space-y-8 px-4 w-full max-w-2xl">
          {/* Sistema Solar Central */}
          <div className="relative">
            {/* Órbita Externa */}
            <div className="absolute -inset-6 sm:-inset-8 border-2 border-blue-400/30 rounded-full animate-spin-slow">
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2">
                <Satellite className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 animate-pulse" />
              </div>
            </div>

            {/* Órbita Média */}
            <div
              className="absolute -inset-4 sm:-inset-6 border border-purple-400/20 rounded-full animate-spin-medium"
              style={{ animationDirection: "reverse" }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Stars className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 animate-pulse" />
              </div>
            </div>

            {/* Órbita Interna */}
            <div className="absolute -inset-2 sm:-inset-4 border border-cyan-400/15 rounded-full animate-spin-fast">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                {/* Substituindo Planet por um círculo personalizado */}
                <div className="h-2 w-2 sm:h-3 sm:w-3 bg-green-400 rounded-full" />
              </div>
            </div>

            {/* Foguete Principal com Glow */}
            <div className="relative transform transition-transform duration-1000 hover:scale-110">
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl animate-ping-slow" />
              <Rocket className="relative h-12 w-12 sm:h-16 sm:w-16 text-blue-400 animate-bounce-subtle transform transition-all duration-500 hover:rotate-12" />
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-12 bg-gradient-to-t from-orange-500/80 to-transparent rounded-full blur-sm animate-pulse" />
            </div>
          </div>

          {/* Mensagem e Progresso */}
          <div className="text-center w-full">
            <p className="text-blue-300 font-mono font-bold text-sm sm:text-lg md:text-xl tracking-widest mb-3 sm:mb-4 animate-pulse min-h-[2rem] flex items-center justify-center">
              {messages[currentMessage]}
            </p>

            {/* Barra de Progresso Avançada */}
            <div className="w-full max-w-md mx-auto h-2 sm:h-3 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-slate-700/30 shadow-lg">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full relative overflow-hidden transition-all duration-200 ease-out"
                style={{ width: `${progress}%` }}
              >
                {/* Efeito de brilho dinâmico */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />

                {/* Partículas de energia */}
                <div className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" />
                <div
                  className="absolute top-0 left-2/3 w-1 h-1 bg-cyan-300 rounded-full animate-ping"
                  style={{ animationDelay: "0.3s" }}
                />
                <div
                  className="absolute top-0 left-1/2 w-1 h-1 bg-purple-300 rounded-full animate-ping"
                  style={{ animationDelay: "0.6s" }}
                />
              </div>
            </div>

            {/* Porcentagem com efeito */}
            <p className="text-slate-300 font-mono font-bold text-xs sm:text-sm mt-2 sm:mt-3 bg-slate-900/50 px-3 py-1 rounded-full inline-block backdrop-blur-sm border border-slate-700/30">
              {progress}%
            </p>
          </div>

          {/* Status Systems */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
            {[
              { color: "bg-green-400", text: "SISTEMAS OK", delay: "0s" },
              { color: "bg-amber-400", text: "ENERGIA ↑", delay: "0.5s" },
              { color: "bg-cyan-400", text: "CONEXÃO ✓", delay: "1s" },
              { color: "bg-purple-400", text: "DRIVE ✓", delay: "1.5s" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-slate-300"
              >
                <div
                  className={`w-2 h-2 ${item.color} rounded-full animate-pulse`}
                  style={{ animationDelay: item.delay }}
                />
                <span className="text-xs font-mono whitespace-nowrap">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Planetas Flutuantes Responsivos */}
        <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-6 h-6 sm:w-8 sm:h-8 bg-purple-500/20 rounded-full animate-float-slow shadow-lg" />
        <div
          className="absolute bottom-20 right-10 sm:bottom-32 sm:right-32 w-8 h-8 sm:w-12 sm:h-12 bg-blue-500/20 rounded-full animate-float-medium shadow-lg"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-32 right-10 sm:top-40 sm:right-40 w-4 h-4 sm:w-6 sm:h-6 bg-cyan-500/20 rounded-full animate-float-fast shadow-lg"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-10 left-1/4 w-5 h-5 sm:w-7 sm:h-7 bg-amber-500/15 rounded-full animate-float-slow shadow-lg"
          style={{ animationDelay: "3s" }}
        />

        {/* Asteroides/Partículas */}
        <div className="absolute top-1/3 right-1/4 w-3 h-3 sm:w-4 sm:h-4 bg-amber-500/30 rounded-full animate-float-tech" />
        <div
          className="absolute bottom-1/4 left-1/3 w-2 h-2 sm:w-3 sm:h-3 bg-slate-400/40 rounded-full animate-float-tech"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-2/3 left-1/5 w-2 h-2 sm:w-3 sm:h-3 bg-green-400/30 rounded-full animate-float-tech"
          style={{ animationDelay: "2.5s" }}
        />
      </div>

      {/* Efeitos de Transição */}
      <style jsx>{`
        .intergalactic-loading.complete {
          animation: fadeOut 0.8s ease-in-out forwards;
        }

        @keyframes fadeOut {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }
      `}</style>
    </div>
  );
};
