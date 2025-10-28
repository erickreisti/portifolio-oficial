// components/layout/TechLoading.tsx
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
    "OTIMIZANDO BUNDLE WEBPACK...",
    "INICIALIZANDO SERVER NODE.JS...",
    "CONECTANDO AO DATABASE...",
    "EXECUTANDO MIGRATIONS...",
    "CONFIGURANDO CI/CD PIPELINE...",
    "DEPLOY EM PRODUÇÃO...",
    "SISTEMAS FULL STACK ONLINE! 🚀",
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsComplete(true), 1000);
          return 100;
        }
        return prev + Math.random() * 6 + 2;
      });
    }, 150);

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
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 z-50 overflow-hidden">
      {/* Grid de fundo tecnológico */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Partículas de código */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 text-xs font-mono opacity-40 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          >
            {
              [
                "<div/>",
                "function()",
                "const",
                "import",
                "export",
                "await",
                "async",
                "=>",
              ][i % 8]
            }
          </div>
        ))}
      </div>

      {/* Conexões de rede */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-blue-400 rounded-full animate-ping-slow opacity-20" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-green-400 rounded-full animate-ping-slow opacity-20 animation-delay-1000" />
        <Network className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-blue-400 opacity-30 animate-pulse" />
      </div>

      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="max-w-2xl w-full space-y-12">
          {/* Header com ícone do sistema atual */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 animate-pulse" />
                <div className="relative bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-2xl">
                  <CurrentSystemIcon
                    className={`w-16 h-16 ${systems[currentSystem].color} animate-bounce-subtle`}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white font-mono">
                SYSTEM BOOT
              </h1>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 font-mono">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>FULL STACK DEV</span>
                </div>
                <Binary className="w-4 h-4" />
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span>v2.0.1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sistema atual */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 font-mono text-sm">
                ACTIVE SYSTEM
              </span>
              <span className="text-green-400 font-mono text-sm">ONLINE</span>
            </div>
            <div className="flex items-center space-x-4">
              <CurrentSystemIcon
                className={`w-8 h-8 ${systems[currentSystem].color}`}
              />
              <div>
                <div className="text-white font-mono font-bold text-lg">
                  {systems[currentSystem].name}
                </div>
                <div className="text-gray-400 font-mono text-sm">
                  INITIALIZING COMPONENTS...
                </div>
              </div>
            </div>
          </div>

          {/* Barra de progresso avançada */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-mono">
              <span className="text-gray-400">BOOT PROGRESS</span>
              <span className="text-blue-400 font-bold">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="bg-gray-700 rounded-full h-4 overflow-hidden border border-gray-600">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full transition-all duration-300 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" />
              </div>
            </div>

            {/* Indicadores de sistema */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {systems.map((system, index) => {
                const Icon = system.icon;
                return (
                  <div
                    key={system.name}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-300 ${
                      index === currentSystem
                        ? "bg-blue-500/20 border-blue-400 shadow-lg shadow-blue-500/20"
                        : "bg-gray-800/50 border-gray-700"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${system.color}`} />
                    <span className="text-white font-mono text-sm">
                      {system.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Terminal output */}
          <div className="bg-black rounded-xl p-6 border border-gray-700 font-mono text-sm">
            <div className="flex items-center space-x-2 text-green-400 mb-4">
              <Terminal className="w-4 h-4" />
              <span>SYSTEM_TERMINAL</span>
            </div>
            <div className="space-y-1 text-gray-300">
              <div className="flex">
                <span className="text-blue-400 mr-2">$</span>
                <span className="text-cyan-400 animate-pulse">_</span>
              </div>
              <div className="text-green-400">
                {">"}{" "}
                {
                  techMessages[
                    Math.min(Math.floor(progress / 15), techMessages.length - 1)
                  ]
                }
              </div>
              <div className="text-gray-500">
                {">"} Status:{" "}
                {progress < 50
                  ? "INITIALIZING"
                  : progress < 90
                  ? "OPTIMIZING"
                  : "READY"}
              </div>
            </div>
          </div>

          {/* Stats footer */}
          <div className="flex justify-between text-xs text-gray-500 font-mono">
            <div className="flex items-center space-x-2">
              <Cpu className="w-3 h-3" />
              <span>DEV_ENV: ACTIVE</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-3 h-3" />
              <span>POWER: OPTIMAL</span>
            </div>
            <div>READY_FOR_ACTION</div>
          </div>
        </div>
      </div>
    </div>
  );
};
