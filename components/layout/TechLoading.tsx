"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Database,
  Server,
  Terminal,
  Zap,
  Binary,
  Sparkles,
  Rocket,
  Cloud,
  CheckCircle2,
  Cpu,
  Package,
  Play,
} from "lucide-react";
import { LazyComponent } from "@/components/optimization/LazyComponent";
import { LazyBackground } from "@/components/optimization/LazyBackground";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";

export const TechLoading = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentSystem, setCurrentSystem] = useState(0);
  const [deployStage, setDeployStage] = useState(0);
  const [showDeploy, setShowDeploy] = useState(false);
  const [deployProgress, setDeployProgress] = useState([0, 0, 0, 0]);
  const progressRef = useRef(0);

  usePerformanceMonitor("TechLoading");

  const systems = useMemo(
    () => [
      {
        name: "FRONTEND",
        icon: Code2,
        color: "text-cyan-400",
        stages: [
          "Compilando React",
          "Otimizando CSS",
          "Carregando componentes",
        ],
      },
      {
        name: "BACKEND",
        icon: Server,
        color: "text-cyan-400",
        stages: [
          "Iniciando servidor",
          "Configurando APIs",
          "Conectando serviços",
        ],
      },
      {
        name: "DATABASE",
        icon: Database,
        color: "text-cyan-400",
        stages: ["Conectando DB", "Migrando dados", "Otimizando queries"],
      },
      {
        name: "CLOUD",
        icon: Cloud,
        color: "text-cyan-400",
        stages: ["Provisionando", "Configurando CDN", "Deploy em produção"],
      },
    ],
    []
  );

  const deployStages = useMemo(
    () => [
      { name: "BUILD", icon: Package, color: "text-yellow-400" },
      { name: "TEST", icon: Cpu, color: "text-orange-400" },
      { name: "DEPLOY", icon: Rocket, color: "text-purple-400" },
      { name: "LAUNCH", icon: Play, color: "text-green-400" },
    ],
    []
  );

  const techMessages = useMemo(
    () => [
      "INICIALIZANDO SISTEMA FULL STACK...",
      "COMPILANDO COMPONENTES REACT...",
      "CONFIGURANDO SERVIDORES NODE.JS...",
      "OTIMIZANDO PERFORMANCE...",
      "EXECUTANDO BUILD DE PRODUÇÃO...",
      "EXECUTANDO TESTES AUTOMATIZADOS...",
      "PREPARANDO DEPLOY EM PRODUÇÃO...",
      "SISTEMAS PRONTOS PARA AÇÃO! 🚀",
    ],
    []
  );

  useEffect(() => {
    progressRef.current = progress;

    if (progress >= 70 && !showDeploy) {
      setShowDeploy(true);
    }

    if (showDeploy) {
      const deployProgress = [
        Math.min(100, Math.max(0, ((progress - 70) / 5) * 100)),
        Math.min(100, Math.max(0, ((progress - 75) / 5) * 100)),
        Math.min(100, Math.max(0, ((progress - 80) / 15) * 100)),
        Math.min(100, Math.max(0, ((progress - 95) / 5) * 100)),
      ];

      setDeployProgress(deployProgress);

      if (progress >= 95) setDeployStage(3);
      else if (progress >= 80) setDeployStage(2);
      else if (progress >= 75) setDeployStage(1);
      else if (progress >= 70) setDeployStage(0);
    }

    if (progress >= 100) {
      setTimeout(() => setIsComplete(true), 800);
    }
  }, [progress, showDeploy]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment = Math.min(2 + Math.random() * 1.5, 100 - prev);
        return prev + increment;
      });
    }, 80);

    const systemInterval = setInterval(() => {
      if (progress < 70 && systems.length > 0) {
        setCurrentSystem((prev) => (prev + 1) % systems.length);
      }
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(systemInterval);
    };
  }, [systems.length, progress]);

  if (isComplete) return null;

  const CurrentSystemIcon = systems[currentSystem]?.icon || Code2;
  const CurrentDeployStage = deployStages[deployStage] || deployStages[0];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 z-50 overflow-hidden">
      <LazyBackground priority="high" className="absolute inset-0">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_99%,rgba(6,182,212,0.1)_100%)] bg-[length:100px_100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_99%,rgba(6,182,212,0.1)_100%)] bg-[length:100px_100px]" />
        </div>
      </LazyBackground>

      <ParticleEffects progress={progress} />

      {/* Container principal sem nenhuma rolagem */}
      <div className="h-screen w-screen flex items-center justify-center p-4 overflow-hidden">
        <LazyComponent animation="scale" delay={200}>
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-4xl overflow-hidden">
            {/* Header Principal */}
            <div className="text-center mb-4 sm:mb-8">
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500 rounded-2xl blur-xl opacity-30 animate-pulse" />
                  <div className="relative bg-gray-900/60 backdrop-blur-xl p-3 sm:p-6 rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-400/20">
                    <div className="relative">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={showDeploy ? "deploy" : "system"}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.2 }}
                          transition={{ duration: 0.3 }}
                        >
                          {showDeploy ? (
                            <CurrentDeployStage.icon
                              className={`w-10 h-10 sm:w-16 sm:h-16 ${CurrentDeployStage.color} animate-pulse`}
                            />
                          ) : (
                            <CurrentSystemIcon className="w-10 h-10 sm:w-16 sm:h-16 text-cyan-400 animate-bounce" />
                          )}
                        </motion.div>
                      </AnimatePresence>
                      <Sparkles className="absolute -top-1 -right-1 sm:w-5 sm:h-5 text-cyan-400 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              <motion.h1
                className="text-xl sm:text-3xl md:text-4xl font-black text-white font-mono tracking-tight leading-tight mb-2 sm:mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                SISTEMA{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent block sm:inline">
                  ÉRICK REIS
                </span>
              </motion.h1>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs text-gray-300 font-mono">
                <div className="flex items-center space-x-1 bg-cyan-400/10 px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-cyan-400/20">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="font-semibold text-cyan-400 text-xs">
                    FULL STACK
                  </span>
                </div>
                <Binary className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 hidden sm:block" />
                <div className="flex items-center space-x-1 bg-gray-800/50 px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-gray-600/30">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-cyan-300 text-xs">v2.4.0</span>
                </div>
              </div>
            </div>

            {/* Layout Principal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5 mb-3 sm:mb-4 overflow-hidden">
              {/* Coluna Esquerda - Sistema/Deploy */}
              <div className="space-y-3 sm:space-y-4 overflow-hidden">
                {/* Sistema Ativo / Pipeline de Deploy */}
                <LazyComponent animation="fadeUp" delay={300}>
                  <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-cyan-500/20 shadow-xl shadow-cyan-400/10 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mb-2 sm:mb-3">
                      <span className="text-gray-300 font-mono text-xs font-semibold tracking-wide truncate">
                        {showDeploy ? "PIPELINE DE DEPLOY" : "SISTEMA ATIVO"}
                      </span>
                      <span
                        className={`font-mono text-xs font-bold px-2 py-1 rounded-full border truncate`}
                      >
                        {showDeploy ? "PRODUCTION_ENV" : "DEV_ENV: ACTIVE"}
                      </span>
                    </div>

                    <AnimatePresence mode="wait">
                      {showDeploy ? (
                        <motion.div
                          key="deploy"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <div
                              className={`p-2 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-500/20 border border-yellow-400/30 flex-shrink-0`}
                            >
                              <CurrentDeployStage.icon
                                className={`w-5 h-5 sm:w-6 sm:h-6 ${CurrentDeployStage.color} animate-pulse`}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-white font-mono font-bold text-base sm:text-lg tracking-tight truncate">
                                {CurrentDeployStage.name}
                              </div>
                              <div className="text-cyan-300 font-mono text-xs mt-0.5 truncate">
                                {deployProgress[deployStage] >= 100
                                  ? "COMPLETO"
                                  : "EXECUTANDO..."}
                              </div>
                            </div>
                          </div>

                          {/* Grid de Deploy Responsivo */}
                          <div className="grid grid-cols-2 gap-1 sm:gap-2">
                            {deployStages.map((stage, index) => {
                              const Icon = stage.icon;
                              const isActive = index === deployStage;
                              const isCompleted = deployProgress[index] >= 100;
                              const isUpcoming = index > deployStage;

                              return (
                                <motion.div
                                  key={stage.name}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.1 }}
                                  className={`flex items-center space-x-1 sm:space-x-2 p-2 rounded-xl border transition-all duration-300 min-w-0`}
                                >
                                  <div className="relative flex-shrink-0">
                                    <Icon
                                      className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                        isCompleted
                                          ? "text-green-400"
                                          : isActive
                                          ? stage.color
                                          : "text-gray-400"
                                      } ${isActive ? "animate-pulse" : ""}`}
                                    />
                                    {isCompleted && (
                                      <CheckCircle2 className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 text-green-400" />
                                    )}
                                  </div>
                                  <span
                                    className={`font-mono text-xs font-semibold truncate`}
                                  >
                                    {stage.name}
                                  </span>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="system"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex items-center space-x-2 sm:space-x-3"
                        >
                          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 flex-shrink-0">
                            <CurrentSystemIcon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 animate-pulse" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-white font-mono font-bold text-base sm:text-lg tracking-tight truncate">
                              {systems[currentSystem]?.name || "SYSTEM"}
                            </div>
                            <div className="text-cyan-300 font-mono text-xs mt-0.5 truncate">
                              {systems[currentSystem]?.stages[
                                Math.floor(progress / 25) % 3
                              ] || "Initializing..."}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </LazyComponent>

                {/* Barra de Progresso Principal */}
                <LazyComponent animation="fadeUp" delay={400}>
                  <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-cyan-500/20 shadow-xl shadow-cyan-400/10 overflow-hidden">
                    <div className="flex justify-between items-center text-xs font-mono mb-2 sm:mb-3">
                      <span className="text-gray-300 font-semibold truncate">
                        {showDeploy
                          ? "PIPELINE PROGRESS"
                          : "PROGRESSO DO SISTEMA"}
                      </span>
                      <span className="text-cyan-400 font-bold text-sm sm:text-base">
                        {Math.round(progress)}%
                      </span>
                    </div>

                    <div className="bg-gray-800/50 rounded-full h-1.5 sm:h-2 overflow-hidden border border-cyan-500/20 backdrop-blur-sm mb-2 sm:mb-3">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300 ease-out relative"
                        style={{
                          width: `${Math.max(0, Math.min(100, progress))}%`,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-40 animate-shimmer" />
                      </div>
                    </div>

                    {/* Progresso Individual dos Estágios de Deploy */}
                    {showDeploy && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-1.5"
                      >
                        {deployStages.map((stage, index) => (
                          <div
                            key={stage.name}
                            className="flex items-center space-x-1 sm:space-x-2"
                          >
                            <div className="w-10 sm:w-12 font-mono text-xs text-gray-400 truncate">
                              {stage.name}
                            </div>
                            <div className="flex-1 bg-gray-800/30 rounded-full h-1 sm:h-1.5 overflow-hidden min-w-0">
                              <div
                                className={`h-full rounded-full transition-all duration-500`}
                                style={{ width: `${deployProgress[index]}%` }}
                              />
                            </div>
                            <div className="w-5 sm:w-6 text-right font-mono text-xs text-gray-400 flex-shrink-0">
                              {Math.round(deployProgress[index])}%
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </LazyComponent>
              </div>

              {/* Coluna Direita - Terminal */}
              <LazyComponent animation="fadeUp" delay={500}>
                <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-cyan-500/20 font-mono text-xs shadow-xl h-full flex flex-col min-h-0 overflow-hidden">
                  <div className="flex items-center space-x-2 text-cyan-400 mb-2 sm:mb-3">
                    <Terminal className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-bold tracking-wide text-xs truncate">
                      {showDeploy ? "DEPLOY_TERMINAL" : "SYSTEM_TERMINAL"}
                    </span>
                  </div>
                  <div className="space-y-1 text-gray-200 flex-1 overflow-hidden">
                    <div className="flex items-center">
                      <span className="text-cyan-400 font-bold mr-1">$</span>
                      <span className="text-cyan-400 animate-pulse">_</span>
                    </div>
                    <div className="text-cyan-300 font-medium break-words leading-relaxed text-xs">
                      {">"}{" "}
                      {
                        techMessages[
                          Math.min(
                            Math.floor(progress / 12.5),
                            techMessages.length - 1
                          )
                        ]
                      }
                    </div>
                    {progress > 70 && showDeploy && (
                      <div className="text-green-400 text-xs mt-1 animate-pulse flex items-start">
                        <Rocket className="w-2.5 h-2.5 mr-1.5 flex-shrink-0 mt-0.5" />
                        <span className="break-words flex-1 text-xs">
                          {">"} Pipeline de deploy iniciado - preparando
                          produção...
                        </span>
                      </div>
                    )}
                    {progress >= 100 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-green-400 text-xs font-bold animate-pulse break-words"
                      >
                        {">"} ✅ Todos os sistemas operacionais! Aplicação
                        pronta!
                      </motion.div>
                    )}
                  </div>
                </div>
              </LazyComponent>
            </div>

            {/* Footer */}
            <LazyComponent animation="fadeUp" delay={600}>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-2 text-xs text-gray-400 font-mono pt-2 sm:pt-3 border-t border-cyan-500/20">
                <div className="flex items-center space-x-1">
                  <div
                    className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                      showDeploy ? "bg-green-400" : "bg-cyan-400"
                    }`}
                  />
                  <span
                    className={showDeploy ? "text-green-400" : "text-cyan-300"}
                  >
                    {showDeploy ? "PRODUCTION_ENV" : "DEV_ENV: ACTIVE"}
                  </span>
                </div>
                <div className="text-cyan-300 hidden md:block text-xs">
                  PERFORMANCE: OPTIMAL
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  <span className="text-cyan-300 text-xs">
                    {showDeploy ? "READY_FOR_LAUNCH" : "INITIALIZING"}
                  </span>
                </div>
              </div>
            </LazyComponent>
          </div>
        </LazyComponent>
      </div>
    </div>
  );
};

// Componente de Partículas em Tempo Real
const ParticleEffects = ({ progress }: { progress: number }) => {
  return (
    <LazyComponent animation="fadeIn" delay={150}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(Math.min(20, Math.floor(progress / 5)))].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float hidden sm:block"
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
    </LazyComponent>
  );
};

// Estilos CSS embutidos
const styles = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
      opacity: 0.7;
    }
    50% {
      transform: translateY(-20px) rotate(5deg);
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
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-shimmer {
    animation: shimmer 2s ease-in-out infinite;
  }
    
  body:has(.fixed.inset-0.bg-gradient) {
    overflow: hidden !important;
  }
`;

// Injetar estilos
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default TechLoading;
