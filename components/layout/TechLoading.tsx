// components/layout/TechLoading.tsx - VERSÃO REFINADA
"use client";

import { useEffect, useState } from "react";
import {
  Code,
  Cpu,
  Database,
  Server,
  Terminal,
  Zap,
  Binary,
  Network,
  Sparkles,
} from "lucide-react";

export const TechLoading = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentSystem, setCurrentSystem] = useState(0);

  const systems = [
    { name: "FRONTEND", icon: Code, color: "text-blue-400" },
    { name: "BACKEND", icon: Server, color: "text-green-400" },
    { name: "DATABASE", icon: Database, color: "text-purple-400" },
    { name: "DEPLOY", icon: Terminal, color: "text-orange-400" },
  ];

  const techMessages = [
    "COMPILANDO COMPONENTES REACT...",
    "OTIMIZANDO BUNDLE...",
    "INICIALIZANDO SERVER...",
    "CONECTANDO AO DATABASE...",
    "SISTEMAS FULL STACK ONLINE! 🚀",
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsComplete(true), 600);
          return 100;
        }
        return prev + Math.random() * 6 + 2; // Progressão mais suave
      });
    }, 120);

    const systemInterval = setInterval(() => {
      setCurrentSystem((prev) => (prev + 1) % systems.length);
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(systemInterval);
    };
  }, []);

  if (isComplete) return null;

  const CurrentSystemIcon = systems[currentSystem].icon;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 z-50 overflow-hidden">
      {/* Background com grid mais sutil */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Partículas flutuantes melhoradas */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 text-xs font-mono opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            {
              [
                "<div/>",
                "function()",
                "const",
                "=>",
                "{}",
                "[]",
                "export",
                "return",
              ][i]
            }
          </div>
        ))}
      </div>

      {/* Efeitos de rede mais suaves */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 border border-blue-400/30 rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-32 h-32 border border-purple-400/20 rounded-full animate-ping" />
        <Network className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-blue-400/40 animate-pulse" />
      </div>

      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="max-w-2xl w-full space-y-8">
          {/* Header com espaçamento refinado */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                {/* Efeito de glow animado */}
                <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-30 animate-pulse" />
                <div className="relative bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl border border-gray-600/50 shadow-2xl">
                  <div className="relative">
                    <CurrentSystemIcon
                      className={`w-20 h-20 ${systems[currentSystem].color} animate-bounce`}
                    />
                    <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-black text-white font-mono tracking-tight">
                SYSTEM BOOT
              </h1>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-300 font-mono">
                <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="font-semibold">FULL STACK</span>
                </div>
                <Binary className="w-5 h-5 text-blue-400" />
                <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span>v2.0.1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sistema atual com melhor espaçamento */}
          <div className="bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-600/30 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300 font-mono text-sm font-semibold tracking-wide">
                ACTIVE SYSTEM
              </span>
              <span className="text-green-400 font-mono text-sm font-bold bg-green-400/10 px-3 py-1 rounded-full">
                ONLINE
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 ${systems[
                  currentSystem
                ].color.replace("text", "bg")}/10 border border-gray-600/50`}
              >
                <CurrentSystemIcon
                  className={`w-8 h-8 ${systems[currentSystem].color}`}
                />
              </div>
              <div className="flex-1">
                <div className="text-white font-mono font-bold text-xl tracking-tight">
                  {systems[currentSystem].name}
                </div>
                <div className="text-gray-400 font-mono text-sm mt-1">
                  INITIALIZING COMPONENTS...
                </div>
              </div>
            </div>
          </div>

          {/* Barra de progresso com visual melhorado */}
          <div className="space-y-5">
            <div className="flex justify-between items-center text-sm font-mono">
              <span className="text-gray-300 font-semibold">BOOT PROGRESS</span>
              <span className="text-blue-400 font-bold text-lg">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="bg-gray-700/50 rounded-full h-3 overflow-hidden border border-gray-600/30 backdrop-blur-sm">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-40 animate-shimmer" />
              </div>
            </div>

            {/* Indicadores de sistema com espaçamento melhor */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              {systems.map((system, index) => {
                const Icon = system.icon;
                const isActive = index === currentSystem;
                return (
                  <div
                    key={system.name}
                    className={`flex items-center space-x-3 p-4 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? "bg-blue-500/20 border-blue-400/50 shadow-lg shadow-blue-500/30 transform scale-105"
                        : "bg-gray-800/40 border-gray-600/30 hover:border-gray-500/50"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${system.color} ${
                        isActive ? "animate-pulse" : ""
                      }`}
                    />
                    <span
                      className={`font-mono text-sm font-semibold ${
                        isActive ? "text-white" : "text-gray-300"
                      }`}
                    >
                      {system.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Terminal output com visual mais autêntico */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-600/50 font-mono text-sm shadow-xl">
            <div className="flex items-center space-x-3 text-green-400 mb-4">
              <Terminal className="w-5 h-5" />
              <span className="font-bold tracking-wide">SYSTEM_TERMINAL</span>
            </div>
            <div className="space-y-2 text-gray-200">
              <div className="flex items-center">
                <span className="text-blue-400 font-bold mr-2">$</span>
                <span className="text-cyan-400 animate-pulse">_</span>
              </div>
              <div className="text-green-400 font-medium">
                {">"}{" "}
                {
                  techMessages[
                    Math.min(Math.floor(progress / 20), techMessages.length - 1)
                  ]
                }
              </div>
              {progress > 80 && (
                <div className="text-yellow-400 text-xs mt-2 animate-pulse">
                  {">"} Preparing launch sequence...
                </div>
              )}
            </div>
          </div>

          {/* Footer com visual mais clean */}
          <div className="flex justify-between items-center text-xs text-gray-400 font-mono pt-4 border-t border-gray-700/30">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span>DEV_ENV: ACTIVE</span>
            </div>
            <div>POWER: OPTIMAL</div>
            <div className="flex items-center space-x-2">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span>READY_FOR_LAUNCH</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
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
      `}</style>
    </div>
  );
};
