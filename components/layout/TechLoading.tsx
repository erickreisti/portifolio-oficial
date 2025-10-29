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
  GitBranch,
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

    // Mostrar deploy quando chegar em 70%
    if (progress >= 70 && !showDeploy) {
      setShowDeploy(true);
    }

    // Atualizar estágios do deploy baseado no progresso
    if (showDeploy) {
      const deployProgress = [
        Math.min(100, ((progress - 70) / 5) * 100), // BUILD: 70-75%
        Math.min(100, ((progress - 75) / 5) * 100), // TEST: 75-80%
        Math.min(100, ((progress - 80) / 15) * 100), // DEPLOY: 80-95%
        Math.min(100, ((progress - 95) / 5) * 100), // LAUNCH: 95-100%
      ];

      setDeployProgress(deployProgress);

      // Atualizar estágio atual
      if (progress >= 95) setDeployStage(3);
      else if (progress >= 80) setDeployStage(2);
      else if (progress >= 75) setDeployStage(1);
      else if (progress >= 70) setDeployStage(0);
    }

    // Completar quando chegar em 100%
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
      if (progress < 70) {
        setCurrentSystem((prev) => (prev + 1) % systems.length);
      }
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(systemInterval);
    };
  }, [systems.length, progress]);

  if (isComplete) return null;

  const CurrentSystemIcon = systems[currentSystem].icon;
  const CurrentDeployStage = deployStages[deployStage];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 z-50 overflow-hidden">
      {/* Background Premium com LazyBackground */}
      <LazyBackground priority="high" className="absolute inset-0">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_99%,rgba(6,182,212,0.1)_100%)] bg-[length:100px_100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_99%,rgba(6,182,212,0.1)_100%)] bg-[length:100px_100px]" />
        </div>
      </LazyBackground>

      {/* Partículas de Código */}
      <LazyComponent animation="fadeIn" delay={100}>
        <div className="absolute inset-0 pointer-events-none">
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
      </LazyComponent>

      {/* Partículas em Tempo Real */}
      <ParticleEffects progress={progress} />

      <div className="flex items-center justify-center min-h-screen p-6">
        <LazyComponent animation="scale" delay={200}>
          <div className="max-w-2xl w-full space-y-8">
            {/* Header Principal */}
            <div className="text-center space-y-8">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500 rounded-2xl blur-xl opacity-30 animate-pulse" />
                  <div className="relative bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-400/20">
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
                              className={`w-20 h-20 ${CurrentDeployStage.color} animate-pulse`}
                            />
                          ) : (
                            <CurrentSystemIcon className="w-20 h-20 text-cyan-400 animate-bounce" />
                          )}
                        </motion.div>
                      </AnimatePresence>
                      <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-cyan-400 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

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

            {/* Sistema Atual / Deploy Stages */}
            <LazyComponent animation="fadeUp" delay={300}>
              <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 shadow-xl shadow-cyan-400/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-300 font-mono text-sm font-semibold tracking-wide">
                    {showDeploy ? "PIPELINE DE DEPLOY" : "SISTEMA ATIVO"}
                  </span>
                  <span
                    className={`font-mono text-sm font-bold px-3 py-1 rounded-full border ${
                      showDeploy
                        ? "text-green-400 bg-green-400/10 border-green-400/30"
                        : "text-cyan-400 bg-cyan-400/10 border-cyan-400/30"
                    }`}
                  >
                    {showDeploy ? "EM PRODUÇÃO" : "INICIALIZANDO"}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {showDeploy ? (
                    <motion.div
                      key="deploy"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-br from-${
                            CurrentDeployStage.color.split("-")[1]
                          }-500/10 to-${
                            CurrentDeployStage.color.split("-")[1]
                          }-500/20 border ${CurrentDeployStage.color.replace(
                            "text",
                            "border"
                          )}/30`}
                        >
                          <CurrentDeployStage.icon
                            className={`w-8 h-8 ${CurrentDeployStage.color} animate-pulse`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-mono font-bold text-xl tracking-tight">
                            {CurrentDeployStage.name}
                          </div>
                          <div className="text-cyan-300 font-mono text-sm mt-1">
                            {deployProgress[deployStage] >= 100
                              ? "COMPLETO"
                              : "EXECUTANDO..."}
                          </div>
                        </div>
                      </div>

                      {/* Grid de Deploy */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                              className={`flex items-center space-x-3 p-4 rounded-xl border transition-all duration-300 ${
                                isCompleted
                                  ? "bg-green-500/20 border-green-400/50 shadow-lg shadow-green-500/20"
                                  : isActive
                                  ? "bg-cyan-500/20 border-cyan-400/50 shadow-lg shadow-cyan-500/30 transform scale-105"
                                  : isUpcoming
                                  ? "bg-gray-800/30 border-gray-600/30 opacity-60"
                                  : "bg-gray-800/40 border-cyan-500/20"
                              }`}
                            >
                              <div className="relative">
                                <Icon
                                  className={`w-5 h-5 ${
                                    isCompleted
                                      ? "text-green-400"
                                      : isActive
                                      ? stage.color
                                      : "text-gray-400"
                                  } ${isActive ? "animate-pulse" : ""}`}
                                />
                                {isCompleted && (
                                  <CheckCircle2 className="absolute -top-1 -right-1 w-3 h-3 text-green-400" />
                                )}
                              </div>
                              <span
                                className={`font-mono text-sm font-semibold ${
                                  isCompleted
                                    ? "text-green-400"
                                    : isActive
                                    ? "text-white"
                                    : "text-gray-400"
                                }`}
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
                      className="flex items-center space-x-4"
                    >
                      <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/30">
                        <CurrentSystemIcon className="w-8 h-8 text-cyan-400 animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-mono font-bold text-xl tracking-tight">
                          {systems[currentSystem].name}
                        </div>
                        <div className="text-cyan-300 font-mono text-sm mt-1">
                          {
                            systems[currentSystem].stages[
                              Math.floor(progress / 25) % 3
                            ]
                          }
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </LazyComponent>

            {/* Barra de Progresso Principal */}
            <LazyComponent animation="fadeUp" delay={400}>
              <div className="space-y-6">
                <div className="flex justify-between items-center text-sm font-mono">
                  <span className="text-gray-300 font-semibold">
                    {showDeploy ? "PIPELINE PROGRESS" : "PROGRESSO DO SISTEMA"}
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

                {/* Progresso Individual dos Estágios de Deploy */}
                {showDeploy && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-3"
                  >
                    {deployStages.map((stage, index) => (
                      <div
                        key={stage.name}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-20 font-mono text-xs text-gray-400">
                          {stage.name}
                        </div>
                        <div className="flex-1 bg-gray-800/30 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              deployProgress[index] >= 100
                                ? "bg-green-500"
                                : index === deployStage
                                ? "bg-cyan-500"
                                : "bg-gray-600"
                            }`}
                            style={{ width: `${deployProgress[index]}%` }}
                          />
                        </div>
                        <div className="w-8 text-right font-mono text-xs text-gray-400">
                          {Math.round(deployProgress[index])}%
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </LazyComponent>

            {/* Terminal Output */}
            <LazyComponent animation="fadeUp" delay={500}>
              <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 font-mono text-sm shadow-xl">
                <div className="flex items-center space-x-3 text-cyan-400 mb-4">
                  <Terminal className="w-5 h-5" />
                  <span className="font-bold tracking-wide">
                    {showDeploy ? "DEPLOY_TERMINAL" : "SYSTEM_TERMINAL"}
                  </span>
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
                        Math.min(
                          Math.floor(progress / 12.5),
                          techMessages.length - 1
                        )
                      ]
                    }
                  </div>
                  {progress > 70 && showDeploy && (
                    <div className="text-green-400 text-xs mt-2 animate-pulse flex items-center">
                      <Rocket className="w-3 h-3 mr-2" />
                      {">"} Pipeline de deploy iniciado - preparando produção...
                    </div>
                  )}
                  {progress >= 100 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-green-400 text-xs font-bold animate-pulse"
                    >
                      {">"} ✅ Todos os sistemas operacionais! Aplicação pronta!
                    </motion.div>
                  )}
                </div>
              </div>
            </LazyComponent>

            {/* Footer */}
            <LazyComponent animation="fadeUp" delay={600}>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-mono pt-4 border-t border-cyan-500/20">
                <div className="flex items-center space-x-2">
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
                <div className="text-cyan-300">PERFORMANCE: OPTIMAL</div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  <span className="text-cyan-300">
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
      <div className="absolute inset-0 pointer-events-none">
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
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-shimmer {
    animation: shimmer 2s ease-in-out infinite;
  }
`;

// Injetar estilos
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default TechLoading;
