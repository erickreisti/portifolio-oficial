"use client";

import React from "react";
import { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  Code2,
  Database,
  Server,
  Terminal,
  Zap,
  Binary,
  Rocket,
  Cloud,
  CheckCircle2,
  Cpu,
  Package,
  Play,
  Brain,
  CircuitBoard,
  Atom,
} from "lucide-react";
import { LazyComponent } from "@/components/optimization/LazyComponent";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { useLockScroll } from "@/hooks/useLockScroll";
import { COLORS } from "@/lib/colors";

interface TechLoadingProps {
  onLoadingComplete?: () => void;
}

export const TechLoading = ({ onLoadingComplete }: TechLoadingProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentSystem, setCurrentSystem] = useState(0);
  const [deployStage, setDeployStage] = useState(0);
  const [showDeploy, setShowDeploy] = useState(false);
  const [deployProgress, setDeployProgress] = useState([0, 0, 0, 0]);
  const progressRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  usePerformanceMonitor("TechLoading");
  useLockScroll(!isComplete);

  // GSAP Animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animação de entrada do container principal
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: 100,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
        }
      );

      // Animação contínua do background
      gsap.to(".loading-bg-gradient", {
        backgroundPosition: "200% 200%",
        duration: 8,
        repeat: -1,
        ease: "linear",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animação de partículas com GSAP
  useEffect(() => {
    if (!particlesRef.current) return;

    const ctx = gsap.context(() => {
      const particles = particlesRef.current?.querySelectorAll(".particle");

      particles?.forEach((particle, i) => {
        gsap.to(particle, {
          x: () => gsap.utils.random(-100, 100),
          y: () => gsap.utils.random(-50, 50),
          rotation: () => gsap.utils.random(-180, 180),
          duration: () => gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          delay: i * 0.2,
          ease: "sine.inOut",
        });
      });
    }, particlesRef);

    return () => ctx.revert();
  }, []);

  const systems = useMemo(
    () => [
      {
        name: "FRONTEND",
        icon: Code2,
        color: "text-cyan-400",
        stages: [
          "Compilando React/Next.js",
          "Otimizando Tailwind CSS",
          "Carregando componentes",
        ],
      },
      {
        name: "BACKEND",
        icon: Server,
        color: "text-cyan-400",
        stages: [
          "Iniciando servidor Node.js",
          "Configurando APIs REST",
          "Conectando microserviços",
        ],
      },
      {
        name: "DATABASE",
        icon: Database,
        color: "text-cyan-400",
        stages: ["Conectando MongoDB", "Migrando dados", "Otimizando queries"],
      },
      {
        name: "CLOUD",
        icon: Cloud,
        color: "text-cyan-400",
        stages: ["Provisionando VPS", "Configurando CDN", "Deploy em produção"],
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
      // Animação de saída com GSAP
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 0.9,
          y: -50,
          duration: 0.8,
          ease: "power2.in",
          onComplete: () => {
            setIsComplete(true);
            onLoadingComplete?.();
          },
        });
      } else {
        setTimeout(() => {
          setIsComplete(true);
          onLoadingComplete?.();
        }, 800);
      }
    }
  }, [progress, showDeploy, onLoadingComplete]);

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
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Background Premium com Gradiente Animado */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="loading-bg-gradient absolute inset-0"
          style={{
            background: `linear-gradient(
              135deg,
              #0f172a 0%,
              #1e3a8a 25%,
              #0c4a6e 50%,
              #1e3a8a 75%,
              #0f172a 100%
            )`,
            backgroundSize: "400% 400%",
          }}
        />

        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-gray-950/80" />

        {/* Grid Tech Sutil */}
        <div className="absolute inset-0 opacity-[0.1]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Partículas Tech Animadas */}
        <ParticleEffects progress={progress} ref={particlesRef} />
      </div>

      {/* Container Principal */}
      <div className="h-screen w-screen flex items-center justify-center p-4 overflow-hidden">
        <div
          ref={containerRef}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-4xl overflow-hidden"
        >
          {/* Header Principal */}
          <motion.div
            className="text-center mb-6 sm:mb-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex justify-center mb-4 sm:mb-6">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-cyan-500 rounded-3xl blur-xl opacity-30"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div
                  className={`relative ${COLORS.classes.card} p-4 sm:p-8 rounded-3xl border border-cyan-500/20 shadow-2xl shadow-cyan-400/20 backdrop-blur-xl`}
                >
                  <div className="relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={showDeploy ? "deploy" : "system"}
                        initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 1.2, rotateY: 180 }}
                        transition={{ duration: 0.5, ease: "backOut" }}
                      >
                        {showDeploy ? (
                          <CurrentDeployStage.icon
                            className={`w-12 h-12 sm:w-20 sm:h-20 ${CurrentDeployStage.color}`}
                          />
                        ) : (
                          <CurrentSystemIcon className="w-12 h-12 sm:w-20 sm:h-20 text-cyan-400" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.h1
              className="text-2xl sm:text-4xl md:text-5xl font-black text-white font-mono tracking-tight leading-tight mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              SISTEMA{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                ÉRICK REIS
              </span>
            </motion.h1>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-sm text-gray-300 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center space-x-2 bg-cyan-400/10 px-3 py-2 sm:px-4 sm:py-2 rounded-full border border-cyan-400/20">
                <motion.div
                  className="w-2 h-2 bg-cyan-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="font-semibold text-cyan-400 text-sm">
                  FULL STACK ENGINEER
                </span>
              </div>

              <Binary className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 hidden sm:block" />

              <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-2 sm:px-4 sm:py-2 rounded-full border border-gray-600/30">
                <motion.div
                  className="w-2 h-2 bg-blue-400 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
                <span className="text-cyan-300 text-sm">v2.4.0</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Layout Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Coluna Esquerda - Sistema/Deploy */}
            <div className="space-y-4 sm:space-y-6">
              {/* Sistema Ativo / Pipeline de Deploy */}
              <LazyComponent animation="fadeUp" delay={300}>
                <motion.div
                  className={`${COLORS.classes.card} rounded-2xl p-4 sm:p-6 border border-cyan-500/20 shadow-xl shadow-cyan-400/10 backdrop-blur-xl`}
                  whileHover={{ y: -2, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
                    <span className="text-gray-300 font-mono text-sm font-semibold tracking-wide">
                      {showDeploy ? "PIPELINE DE DEPLOY" : "SISTEMA ATIVO"}
                    </span>
                    <span className="font-mono text-sm font-bold px-3 py-1 rounded-full border border-cyan-400/30 text-cyan-400 bg-cyan-400/10">
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
                        className="space-y-4"
                      >
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <motion.div
                            className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-500/20 border border-yellow-400/30 flex-shrink-0"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CurrentDeployStage.icon
                              className={`w-6 h-6 sm:w-8 sm:h-8 ${CurrentDeployStage.color}`}
                            />
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <div className="text-white font-mono font-bold text-lg sm:text-xl tracking-tight">
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
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          {deployStages.map((stage, index) => {
                            const Icon = stage.icon;
                            const isActive = index === deployStage;
                            const isCompleted = deployProgress[index] >= 100;

                            return (
                              <motion.div
                                key={stage.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className={`flex items-center space-x-2 sm:space-x-3 p-3 rounded-xl border transition-all duration-300 ${
                                  isCompleted
                                    ? "bg-green-500/10 border-green-400/30 text-green-400"
                                    : isActive
                                    ? "bg-cyan-500/10 border-cyan-400/30 text-cyan-400"
                                    : "bg-gray-800/50 border-gray-600/30 text-gray-400"
                                }`}
                                whileHover={{ scale: 1.05 }}
                              >
                                <div className="relative flex-shrink-0">
                                  <Icon
                                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                      isCompleted
                                        ? "text-green-400"
                                        : isActive
                                        ? stage.color
                                        : "text-gray-400"
                                    }`}
                                  />
                                  {isCompleted && (
                                    <CheckCircle2 className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                                  )}
                                </div>
                                <span className="font-mono text-sm font-semibold">
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
                        className="flex items-center space-x-3 sm:space-x-4"
                      >
                        <motion.div
                          className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 flex-shrink-0"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CurrentSystemIcon className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-mono font-bold text-lg sm:text-xl tracking-tight">
                            {systems[currentSystem]?.name || "SYSTEM"}
                          </div>
                          <div className="text-cyan-300 font-mono text-sm mt-1">
                            {systems[currentSystem]?.stages[
                              Math.floor(progress / 25) % 3
                            ] || "Initializing..."}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </LazyComponent>

              {/* Barra de Progresso Principal */}
              <LazyComponent animation="fadeUp" delay={400}>
                <motion.div
                  className={`${COLORS.classes.card} rounded-2xl p-4 sm:p-6 border border-cyan-500/20 shadow-xl shadow-cyan-400/10 backdrop-blur-xl`}
                  whileHover={{ y: -2, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center text-sm font-mono mb-3 sm:mb-4">
                    <span className="text-gray-300 font-semibold">
                      {showDeploy
                        ? "PIPELINE PROGRESS"
                        : "PROGRESSO DO SISTEMA"}
                    </span>
                    <span className="text-cyan-400 font-bold text-lg sm:text-xl">
                      {Math.round(progress)}%
                    </span>
                  </div>

                  <div className="bg-gray-800/50 rounded-full h-2 sm:h-3 overflow-hidden border border-cyan-500/20 backdrop-blur-sm mb-3 sm:mb-4">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full relative overflow-hidden"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Progresso Individual dos Estágios de Deploy */}
                  {showDeploy && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-2"
                    >
                      {deployStages.map((stage, index) => (
                        <div
                          key={stage.name}
                          className="flex items-center space-x-2 sm:space-x-3"
                        >
                          <div className="w-12 sm:w-16 font-mono text-sm text-gray-400">
                            {stage.name}
                          </div>
                          <div className="flex-1 bg-gray-800/30 rounded-full h-2 overflow-hidden min-w-0">
                            <motion.div
                              className={`h-full rounded-full transition-all duration-500 ${
                                deployProgress[index] >= 100
                                  ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                  : "bg-gradient-to-r from-cyan-500 to-blue-500"
                              }`}
                              initial={{ width: "0%" }}
                              animate={{ width: `${deployProgress[index]}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                          </div>
                          <div className="w-6 sm:w-8 text-right font-mono text-sm text-gray-400 flex-shrink-0">
                            {Math.round(deployProgress[index])}%
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              </LazyComponent>
            </div>

            {/* Coluna Direita - Terminal */}
            <LazyComponent animation="fadeUp" delay={500}>
              <motion.div
                className={`${COLORS.classes.card} rounded-2xl p-4 sm:p-6 border border-cyan-500/20 font-mono text-sm shadow-xl h-full flex flex-col backdrop-blur-xl`}
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center space-x-2 text-cyan-400 mb-3 sm:mb-4">
                  <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-bold tracking-wide text-sm">
                    {showDeploy ? "DEPLOY_TERMINAL" : "SYSTEM_TERMINAL"}
                  </span>
                </div>

                <div className="space-y-2 text-gray-200 flex-1 overflow-hidden font-mono">
                  <div className="flex items-center">
                    <span className="text-cyan-400 font-bold mr-2">$</span>
                    <motion.span
                      className="text-cyan-400"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      _
                    </motion.span>
                  </div>

                  <motion.div
                    className="text-cyan-300 font-medium leading-relaxed"
                    key={Math.floor(progress / 12.5)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {">"}{" "}
                    {
                      techMessages[
                        Math.min(
                          Math.floor(progress / 12.5),
                          techMessages.length - 1
                        )
                      ]
                    }
                  </motion.div>

                  {progress > 70 && showDeploy && (
                    <motion.div
                      className="text-green-400 mt-2 flex items-start"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Rocket className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0 mt-1" />
                      <span className="text-sm">
                        {">"} Pipeline de deploy iniciado - preparando
                        produção...
                      </span>
                    </motion.div>
                  )}

                  {progress >= 100 && (
                    <motion.div
                      className="text-green-400 font-bold mt-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {">"} ✅ Todos os sistemas operacionais! Aplicação pronta!
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </LazyComponent>
          </div>

          {/* Footer */}
          <LazyComponent animation="fadeUp" delay={600}>
            <motion.div
              className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 text-sm text-gray-400 font-mono pt-3 sm:pt-4 border-t border-cyan-500/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  className={`w-2 h-2 rounded-full ${
                    showDeploy ? "bg-green-400" : "bg-cyan-400"
                  }`}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span
                  className={showDeploy ? "text-green-400" : "text-cyan-300"}
                >
                  {showDeploy ? "PRODUCTION_ENV" : "DEV_ENV: ACTIVE"}
                </span>
              </div>

              <div className="text-cyan-300 hidden md:block text-sm">
                PERFORMANCE: OPTIMAL
              </div>

              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-300 text-sm">
                  {showDeploy ? "READY_FOR_LAUNCH" : "INITIALIZING"}
                </span>
              </div>
            </motion.div>
          </LazyComponent>
        </div>
      </div>
    </div>
  );
};

// Componente de Partículas com GSAP - CORRIGIDO
const ParticleEffects = React.forwardRef<HTMLDivElement, { progress: number }>(
  ({ progress }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Partículas de fundo */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="particle absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Código flutuante */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`code-${i}`}
            className="absolute text-cyan-400/40 font-mono text-sm font-bold hidden sm:block"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [0, -40, 0],
              x: [0, (Math.random() - 0.5) * 50, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          >
            {["<Code/>", "{}", "=>", "()", "[]", "${ }", "import", "export"][i]}
          </motion.div>
        ))}

        {/* Elementos Tech flutuantes */}
        {[Brain, CircuitBoard, Atom, Rocket].map((Icon, i) => (
          <motion.div
            key={`tech-${i}`}
            className="absolute text-cyan-400/20 hidden lg:block"
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear",
            }}
          >
            <Icon className="w-8 h-8 sm:w-12 sm:h-12" />
          </motion.div>
        ))}
      </div>
    );
  }
);

// Adicione display name para melhor debugging
ParticleEffects.displayName = "ParticleEffects";

export default TechLoading;
