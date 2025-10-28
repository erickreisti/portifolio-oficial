// components/layout/TechLoading.tsx - VERSÃO HARMONIZADA
"use client";

import { useEffect, useState } from "react";
import {
  Code2,
  Cpu,
  Database,
  Server,
  Terminal,
  Zap,
  Binary,
  Network,
  Sparkles,
  Rocket,
  Globe,
  Cloud,
} from "lucide-react";

export const TechLoading = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentSystem, setCurrentSystem] = useState(0);

  const systems = [
    { name: "FRONTEND", icon: Code2, color: "text-cyan-400" },
    { name: "BACKEND", icon: Server, color: "text-cyan-400" },
    { name: "DATABASE", icon: Database, color: "text-cyan-400" },
    { name: "CLOUD", icon: Cloud, color: "text-cyan-400" },
  ];

  const techMessages = [
    "INICIALIZANDO SISTEMA FULL STACK...",
    "CARREGANDO COMPONENTES REACT...",
    "CONFIGURANDO SERVIDORES...",
    "OTIMIZANDO PERFORMANCE...",
    "SISTEMAS PRONTOS PARA AÇÃO! 🚀",
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsComplete(true), 800);
          return 100;
        }
        return prev + Math.random() * 4 + 2; // Progressão mais suave
      });
    }, 100);

    const systemInterval = setInterval(() => {
      setCurrentSystem((prev) => (prev + 1) % systems.length);
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(systemInterval);
    };
  }, []);

  if (isComplete) return null;

  const CurrentSystemIcon = systems[currentSystem].icon;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 z-50 overflow-hidden">
      {/* Background Premium igual à HeroSection */}
      <div className="absolute inset-0">
        {/* Grid Tecnológico */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_99%,rgba(6,182,212,0.1)_100%)] bg-[length:100px_100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_99%,rgba(6,182,212,0.1)_100%)] bg-[length:100px_100px]" />
        </div>

        {/* Partículas de Código */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-cyan-400 text-xs font-mono opacity-60 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 8 + 4}s`,
              }}
            >
              {
                [
                  "{ }",
                  "< />",
                  "=>",
                  "async",
                  "await",
                  "const",
                  "export",
                  "return",
                  "function",
                  "import",
                  "type",
                  "interface",
                ][i]
              }
            </div>
          ))}
        </div>

        {/* Elementos Flutuantes Neon */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-cyan-400/30 rounded-full animate-pulse" />
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 border border-cyan-400/20 rounded-full animate-ping" />
          <Globe className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-cyan-400/20 animate-spin-slow" />
        </div>
      </div>

      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="max-w-2xl w-full space-y-8">
          {/* Header Principal */}
          <div className="text-center space-y-8">
            {/* Logo/Ícone Central */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Efeito de Glow */}
                <div className="absolute inset-0 bg-cyan-500 rounded-2xl blur-xl opacity-30 animate-pulse" />
                <div className="relative bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-400/20">
                  <div className="relative">
                    <CurrentSystemIcon className="w-20 h-20 text-cyan-400 animate-bounce" />
                    <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-cyan-400 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Títulos */}
            <div className="space-y-4">
              <motion.h1
                className="text-5xl font-black text-white font-mono tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                SISTEMA{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  ÉRICK REIS
                </span>
              </motion.h1>

              <div className="flex items-center justify-center space-x-6 text-sm text-gray-300 font-mono">
                <div className="flex items-center space-x-2 bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/20">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="font-semibold text-cyan-400">
                    FULL STACK
                  </span>
                </div>
                <Binary className="w-5 h-5 text-cyan-400" />
                <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-600/30">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-cyan-300">v2.4.0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sistema Atual */}
          <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 shadow-xl shadow-cyan-400/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300 font-mono text-sm font-semibold tracking-wide">
                SISTEMA ATIVO
              </span>
              <span className="text-cyan-400 font-mono text-sm font-bold bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/30">
                INICIALIZANDO
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/30">
                <CurrentSystemIcon className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="text-white font-mono font-bold text-xl tracking-tight">
                  {systems[currentSystem].name}
                </div>
                <div className="text-cyan-300 font-mono text-sm mt-1">
                  CARREGANDO RECURSOS...
                </div>
              </div>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="space-y-6">
            <div className="flex justify-between items-center text-sm font-mono">
              <span className="text-gray-300 font-semibold">
                PROGRESSO DO SISTEMA
              </span>
              <span className="text-cyan-400 font-bold text-lg">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="bg-gray-800/50 rounded-full h-3 overflow-hidden border border-cyan-500/20 backdrop-blur-sm">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-40 animate-shimmer" />
              </div>
            </div>

            {/* Indicadores de Sistema */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {systems.map((system, index) => {
                const Icon = system.icon;
                const isActive = index === currentSystem;
                return (
                  <div
                    key={system.name}
                    className={`flex items-center space-x-3 p-4 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? "bg-cyan-500/20 border-cyan-400/50 shadow-lg shadow-cyan-500/30 transform scale-105"
                        : "bg-gray-800/40 border-cyan-500/20 hover:border-cyan-400/30"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 text-cyan-400 ${
                        isActive ? "animate-pulse" : ""
                      }`}
                    />
                    <span
                      className={`font-mono text-sm font-semibold ${
                        isActive ? "text-white" : "text-cyan-300"
                      }`}
                    >
                      {system.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Terminal Output */}
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 font-mono text-sm shadow-xl">
            <div className="flex items-center space-x-3 text-cyan-400 mb-4">
              <Terminal className="w-5 h-5" />
              <span className="font-bold tracking-wide">TERMINAL_SYSTEM</span>
            </div>
            <div className="space-y-2 text-gray-200">
              <div className="flex items-center">
                <span className="text-cyan-400 font-bold mr-2">$</span>
                <span className="text-cyan-400 animate-pulse">_</span>
              </div>
              <div className="text-cyan-300 font-medium">
                {">"}{" "}
                {
                  techMessages[
                    Math.min(Math.floor(progress / 20), techMessages.length - 1)
                  ]
                }
              </div>
              {progress > 80 && (
                <div className="text-cyan-400 text-xs mt-2 animate-pulse flex items-center">
                  <Rocket className="w-3 h-3 mr-2" />
                  {">"} Preparando ambiente de desenvolvimento...
                </div>
              )}
              {progress > 90 && (
                <div className="text-green-400 text-xs font-bold animate-pulse">
                  {">"} ✅ Todos os sistemas operacionais!
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-mono pt-4 border-t border-cyan-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-cyan-300">DEV_ENV: ACTIVE</span>
            </div>
            <div className="text-cyan-300">PERFORMANCE: OPTIMAL</div>
            <div className="flex items-center space-x-2">
              <Zap className="w-3 h-3 text-cyan-400" />
              <span className="text-cyan-300">READY_FOR_LAUNCH</span>
            </div>
          </div>
        </div>
      </div>

      {/* Efeitos de Partículas em Tempo Real */}
      <ParticleEffects progress={progress} />
    </div>
  );
};

// Componente de Partículas em Tempo Real
const ParticleEffects = ({ progress }: { progress: number }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Partículas que aumentam com o progresso */}
      {[...Array(Math.floor(progress / 10))].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.6 + 0.2,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 5}s`,
          }}
        />
      ))}
    </div>
  );
};

// Componente de Motion para animações (simplificado)
const motion = {
  h1: ({ children, className, initial, animate, transition }: any) => (
    <h1 className={className}>{children}</h1>
  ),
};

// Estilos CSS embutidos
const styles = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
      opacity: 0.7;
    }
    50% {
      transform: translateY(-25px) rotate(5deg);
      opacity: 1;
    }
  }
  
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  
  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-shimmer {
    animation: shimmer 2s ease-in-out infinite;
  }
  
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }
`;

// Injetar estilos
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default TechLoading;
