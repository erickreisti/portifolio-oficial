"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Download, Rocket, ArrowDown } from "lucide-react";
import { PremiumBackground } from "@/components/layout/PremiumBackground";
import { LazyComponent } from "@/components/optimization/LazyComponent";
import { LazyBackground } from "@/components/optimization/LazyBackground";
import { HeroNeonElements } from "@/components/layout/HeroNeonElements";
import { getSafeColors } from "@/lib/colors";
import { AnimatedActionButton } from "@/components/ui/AnimatedActionButton";
import { usePDFDownload } from "@/hooks/usePDFDowload";

/**
 * COMPONENTE DE TEXTO HERO COM MICRO-SHAKE + TYPEWRITER
 * - Texto principal com efeito de entrada letra por letra
 * - Efeito micro-shake nas letras ao hover (versão 1)
 * - Subtítulo com typewriter automático que alterna frases
 */
const HeroText = () => {
  const colors = getSafeColors();

  // Estado para controlar o typewriter do subtítulo
  const [subtitleText, setSubtitleText] = useState("");
  const [currentSubtitle, setCurrentSubtitle] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Frases que serão exibidas no typewriter do subtítulo
  const subtitles = useMemo(
    () => [
      "Transformo visões ambiciosas em soluções digitais",
      "Desenvolvo experiências web de alto impacto",
      "Crio sistemas escaláveis com tecnologia de ponta",
      "Entregando excelência em cada linha de código",
    ],
    []
  );

  // Efeito do typewriter - controla digitação e deleção automática
  useEffect(() => {
    const currentSubtitleText = subtitles[currentSubtitle];
    let timeout: NodeJS.Timeout;

    // Lógica do typewriter: digita → espera → deleta → próxima frase
    if (!isDeleting && subtitleText.length === currentSubtitleText.length) {
      // Espera 2 segundos antes de começar a deletar
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && subtitleText.length === 0) {
      // Quando termina de deletar, vai para próxima frase
      setIsDeleting(false);
      setCurrentSubtitle((prev) => (prev + 1) % subtitles.length);
    } else {
      // Digita ou deleta caracteres
      const speed = isDeleting ? 30 : 50; // Mais rápido ao deletar
      const nextText = isDeleting
        ? currentSubtitleText.slice(0, subtitleText.length - 1)
        : currentSubtitleText.slice(0, subtitleText.length + 1);

      timeout = setTimeout(() => setSubtitleText(nextText), speed);
    }

    return () => clearTimeout(timeout);
  }, [subtitleText, isDeleting, currentSubtitle, subtitles]);

  return (
    <LazyComponent animation="fadeUp" delay={200}>
      <div className="text-center w-full mb-8">
        {/* TEXTO PRINCIPAL COM EFEITO LETRA POR LETRA + MICRO-SHAKE */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
          {[
            "IDEIAS EXTRAORDINÁRIAS",
            "CÓDIGO EXCEPCIONAL",
            "RESULTADOS REAIS",
          ].map((line, lineIndex) => (
            <motion.div
              key={lineIndex}
              className="overflow-hidden mb-2 sm:mb-4"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.3 + lineIndex * 0.2, // Delay escalonado entre linhas
                ease: "easeOut",
              }}
            >
              {line.split("").map((char, charIndex) => (
                <motion.span
                  key={`${lineIndex}-${charIndex}`}
                  className="inline-block mx-0.5 sm:mx-1 transition-all duration-300 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent"
                  initial={{ y: 100, opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + lineIndex * 0.3 + charIndex * 0.03, // Delay progressivo por caractere
                    ease: "backOut",
                  }}
                  whileHover={{
                    scale: 1.2,
                    y: -5,
                    // VERSÃO 1: MICRO-SHAKE NO HOVER - movimento lateral sutil
                    x: [0, -2, 2, -1, 1, 0],
                    rotate: [0, -1, 1, -0.5, 0.5, 0],
                    transition: {
                      duration: 0.4,
                      ease: "easeInOut",
                    },
                  }}
                  whileTap={{
                    scale: 0.95,
                    // Shake mais intenso no click
                    x: [0, -3, 3, -2, 2, 0],
                    transition: { duration: 0.3 },
                  }}
                >
                  {char === " " ? "\u00A0" : char}{" "}
                  {/* Espaços não quebráveis */}
                </motion.span>
              ))}
            </motion.div>
          ))}
        </h1>

        {/* SUBTÍTULO COM TYPEWRITER AUTOMÁTICO */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }} // Aparece depois do texto principal
        >
          <p
            className={`text-xl sm:text-2xl lg:text-3xl font-light min-h-[60px] flex items-center justify-center ${colors.classes.text.gradient}`}
          >
            {subtitleText}
            {/* Cursor piscante */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="ml-1"
            >
              |
            </motion.span>
          </p>
        </motion.div>
      </div>
    </LazyComponent>
  );
};

/**
 * COMPONENTE DE PARTÍCULAS VISUAIS
 * - Cria partículas flutuantes com símbolos de código (</>, {})
 * - Animações GSAP para movimento suave
 * - Sistema de cleanup para performance
 */
const TechParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Contexto GSAP para gerenciar todas as animações
    const ctx = gsap.context(() => {
      const particles: HTMLElement[] = [];

      // Tipos de partículas disponíveis
      const particleTypes = [
        { content: "⚡", color: "text-yellow-400", size: "text-xl" },
        { content: "🚀", color: "text-cyan-400", size: "text-xl" },
        { content: "</>", color: "text-cyan-300", size: "text-lg" },
        { content: "{}", color: "text-blue-300", size: "text-lg" },
      ];

      /**
       * Função para criar uma partícula individual
       * - Posição aleatória na tela
       * - Animação de entrada → flutuação → saída
       */
      const createParticle = () => {
        const type =
          particleTypes[Math.floor(Math.random() * particleTypes.length)];
        const particle = document.createElement("div");

        particle.className = `absolute pointer-events-none ${type.color} ${type.size} font-bold opacity-0`;
        particle.textContent = type.content;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        containerRef.current?.appendChild(particle);
        particles.push(particle);

        // Timeline de animação da partícula
        const timeline = gsap.timeline();

        // Animação de entrada dramática
        timeline.fromTo(
          particle,
          {
            opacity: 0,
            scale: 0,
            rotation: -180,
          },
          {
            opacity: 0.8,
            scale: 1,
            rotation: 0,
            duration: 1.5,
            ease: "back.out(1.7)", // Efeito elástico na entrada
          }
        );

        // Movimento de flutuação para cima
        timeline.to(
          particle,
          {
            y: -100,
            rotation: 360, // Rotação completa durante o movimento
            duration: 8 + Math.random() * 4, // Duração variável
            ease: "power1.out",
          },
          "+=0.5" // Delay após a entrada
        );

        // Animação de saída (fade out)
        timeline.to(particle, {
          opacity: 0,
          scale: 0.5,
          duration: 1,
          ease: "power1.in",
          onComplete: () => {
            // Remove a partícula do DOM quando a animação termina
            particle.remove();
            const index = particles.indexOf(particle);
            if (index > -1) particles.splice(index, 1);
          },
        });

        // Efeito de pulsação contínua
        gsap.to(particle, {
          scale: 1.2,
          duration: 2,
          repeat: -1, // Loop infinito
          yoyo: true, // Vai e volta
          ease: "sine.inOut",
        });
      };

      // Cria partículas iniciais com delay escalonado
      for (let i = 0; i < 10; i++) {
        gsap.delayedCall(i * 0.4, createParticle);
      }

      // Cria partículas continuamente a cada segundo
      const interval = setInterval(createParticle, 1000);

      return () => {
        clearInterval(interval);
        particles.forEach((particle) => particle.remove());
      };
    }, containerRef);

    return () => ctx.revert(); // Cleanup do GSAP
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 2 }}
    />
  );
};

/**
 * COMPONENTE DE CONEXÕES ENTRE PARTÍCULAS (CANVAS)
 * - Cria uma rede de conexões animadas entre pontos
 * - Usa Canvas API para performance
 * - Partículas se movem e se conectam quando próximas
 */
const ParticleConnections = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    /**
     * Ajusta o canvas para o tamanho da tela
     * Importante para responsividade
     */
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Array de partículas com propriedades de movimento
    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8, // Velocidade X
      vy: (Math.random() - 0.5) * 0.8, // Velocidade Y
      radius: Math.random() * 2 + 1, // Tamanho aleatório
    }));

    /**
     * Função de animação principal do canvas
     * - Limpa o frame anterior
     * - Atualiza posições das partículas
     * - Desenha partículas e conexões
     */
    const animate = () => {
      // Limpa o canvas completamente
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Atualiza e desenha cada partícula
      particles.forEach((particle) => {
        // Move a partícula
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Colisão com as bordas (inverte direção)
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Desenha a partícula como círculo
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6, 182, 212, 0.4)"; // Cor ciano semi-transparente
        ctx.fill();
      });

      // Configurações para desenhar as conexões
      ctx.strokeStyle = "rgba(6, 182, 212, 0.15)";
      ctx.lineWidth = 1;

      // Verifica todas as combinações de partículas para conexões
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Conecta partículas que estão próximas (distância < 150px)
          if (distance < 150) {
            // Opacidade baseada na distância (mais perto = mais opaco)
            const opacity = 1 - distance / 150;
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.2})`;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Próximo frame
      animationId = requestAnimationFrame(animate);
    };

    // Inicia a animação
    animate();

    // Cleanup: remove event listener e cancela animação
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

/**
 * COMPONENTE DE ESTATÍSTICAS ANIMADAS COM EFEITO DE ONDA (VERSÃO 2)
 * - Números que contam progressivamente
 * - Efeito de onda conectando os elementos
 * - Animações de flutuação individual
 * - Partículas decorativas
 */
const LiveStats = () => {
  const [projects, setProjects] = useState(0);
  const [experience, setExperience] = useState(0);
  const [clients, setClients] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);
  const [waveProgress, setWaveProgress] = useState(0); // Controla a animação da onda

  // Dados das estatísticas
  const stats = useMemo(
    () => [
      { value: projects, label: "Projetos", suffix: "+" },
      { value: experience, label: "Anos Exp", suffix: "+" },
      { value: clients, label: "Clientes", suffix: "+" },
      { value: satisfaction, label: "Satisfação", suffix: "%" },
    ],
    [projects, experience, clients, satisfaction]
  );

  useEffect(() => {
    /**
     * Função para animar contadores progressivos
     * @param setter - Função set do useState
     * @param end - Valor final do contador
     * @param duration - Duração da animação em ms
     */
    const animateValue = (
      setter: React.Dispatch<React.SetStateAction<number>>,
      end: number,
      duration: number
    ) => {
      let start = 0;
      const increment = end / (duration / 16); // Calcula incremento por frame

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setter(end); // Valor final
          clearInterval(timer);
        } else {
          setter(Math.floor(start)); // Valor atual
        }
      }, 16); // ~60fps
    };

    // Anima cada estatística com durações diferentes
    animateValue(setProjects, 50, 2000);
    animateValue(setExperience, 5, 1800);
    animateValue(setClients, 30, 2200);
    animateValue(setSatisfaction, 100, 2500);

    // Inicia o efeito de onda após um delay
    const waveTimer = setTimeout(() => {
      setWaveProgress(1);
    }, 500);

    return () => {
      clearTimeout(waveTimer);
    };
  }, []);

  return (
    <LazyComponent animation="fadeUp" delay={400}>
      <motion.div
        className="flex justify-center gap-6 sm:gap-8 mb-12 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, ease: "easeOut" }}
      >
        {/* VERSÃO 2: LINHA DE ONDA CONECTANDO AS ESTATÍSTICAS */}
        <motion.div
          className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0 transform -translate-y-1/2"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: waveProgress, // Expande horizontalmente
            opacity: waveProgress * 0.7, // Aparece gradualmente
          }}
          transition={{
            duration: 1.5,
            delay: 0.8,
            ease: "easeInOut",
          }}
        />

        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center relative z-10"
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{
              scale: 1,
              opacity: 1,
              // VERSÃO 2: EFEITO DE ONDA INDIVIDUAL - flutuação suave
              y: [0, -8, 4, -2, 0],
            }}
            transition={{
              delay: 1.4 + index * 0.15, // Delay escalonado
              type: "spring",
              stiffness: 100,
              // Timing da animação de onda individual
              y: {
                delay: 2 + index * 0.3, // Delay progressivo
                duration: 2, // Duração do ciclo
                repeat: Infinity, // Loop infinito
                repeatType: "reverse", // Vai e volta
                ease: "easeInOut",
              },
            }}
            whileHover={{
              scale: 1.15,
              y: -8, // Eleva no hover
              transition: {
                type: "spring",
                stiffness: 400,
              },
            }}
          >
            {/* EFEITO DE PULSO AO REDOR - halo sutil */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-cyan-400/10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [1, 1.2, 1], // Pulso de tamanho
                opacity: [0.3, 0.1, 0.3], // Pulso de opacidade
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.5, // Delay escalonado
                ease: "easeInOut",
              }}
            />

            {/* Número da estatística */}
            <div className="text-2xl sm:text-3xl font-black text-cyan-400 relative z-10">
              {stat.value}
              {stat.suffix}
            </div>
            {/* Label da estatística */}
            <div className="text-sm text-cyan-300 font-medium relative z-10">
              {stat.label}
            </div>

            {/* PARTÍCULAS FLUTUANTES DECORATIVAS */}
            <motion.div
              className="absolute -top-2 -right-2 w-2 h-2 bg-cyan-400 rounded-full opacity-70"
              animate={{
                y: [0, -10, 0], // Sobe e desce
                opacity: [0, 1, 0], // Aparece e some
                scale: [0.5, 1, 0.5], // Cresce e diminui
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.7, // Delay progressivo
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </LazyComponent>
  );
};

/**
 * COMPONENTE DOS BOTÕES DE AÇÃO
 * - Botão "Iniciar Projeto" com AnimatedActionButton em azul gradiente
 * - Botão "Baixar CV" com AnimatedActionButton
 */
const ActionButtons = ({ onContactClick }: { onContactClick: () => void }) => {
  const { downloadPDF, isDownloading, progress, error, resetError } =
    usePDFDownload();

  const handleDownloadCV = async () => {
    try {
      await downloadPDF({
        fileName: "Erick-Reis-Curriculo.pdf",
      });
    } catch (error) {
      console.error("Erro no download:", error);
    }
  };

  return (
    <LazyComponent animation="fadeUp" delay={500}>
      <motion.div
        className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
      >
        {/* BOTÃO "INICIAR PROJETO" - COM ANIMATEDACTIONBUTTON AZUL GRADIENTE */}
        <AnimatedActionButton
          title="INICIAR PROJETO"
          subtitle="VAMOS TRABALHAR JUNTOS"
          icon={Rocket}
          size="lg"
          onClick={onContactClick}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-cyan-400/50 hover:border-cyan-300/70"
          showArrow={false}
        />

        {/* BOTÃO "BAIXAR CV" - COM ANIMATEDACTIONBUTTON */}
        <AnimatedActionButton
          title={isDownloading ? "BAIXANDO..." : "BAIXAR CV"}
          subtitle={isDownloading ? `${progress}%` : "PDF FORMATO ABNT"}
          icon={Download}
          size="lg"
          onClick={handleDownloadCV}
          loading={isDownloading}
          progress={progress}
          disabled={isDownloading}
          showArrow={false}
        />

        {/* Feedback de erro */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="absolute top-full mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg backdrop-blur-sm z-50"
            >
              <p className="text-red-400 text-sm">{error}</p>
              <button
                onClick={() => resetError()}
                className="text-red-300 text-xs hover:text-white mt-1"
              >
                Fechar
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </LazyComponent>
  );
};

/**
 * COMPONENTE DO INDICADOR DE SCROLL
 * - Seta animada para indicar que há mais conteúdo
 * - Pulsação suave para chamar atenção
 * - Leva usuário para próxima seção
 */
const ScrollIndicator = ({
  onExploreClick,
}: {
  onExploreClick: () => void;
}) => {
  const colors = getSafeColors();

  return (
    <LazyComponent animation="fadeUp" delay={600}>
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2, ease: "easeOut" }}
      >
        <motion.button
          onClick={onExploreClick}
          className="flex flex-col items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group focus:outline-none rounded-lg p-2"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-sm font-medium">Explorar Mais</span>
          <motion.div
            animate={{ y: [0, 8, 0] }} // Seta sobe e desce
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`w-10 h-10 rounded-full border ${colors.borders.medium} flex items-center justify-center group-hover:border-cyan-400/50 transition-colors relative`}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </motion.div>
    </LazyComponent>
  );
};

/**
 * COMPONENTE PRINCIPAL DA HERO
 * - Container principal que organiza todas as camadas
 * - Gerencia animações de entrada com GSAP
 * - Controla navegação entre seções
 */
interface HeroProps {
  onExploreClick: () => void;
}

export const Hero = ({ onExploreClick }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const colors = getSafeColors();

  // Animação de entrada dos elementos de conteúdo
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animação escalonada dos elementos de conteúdo
      gsap.fromTo(
        ".hero-content-element",
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2, // Delay entre cada elemento
          ease: "back.out(1.7)", // Efeito elástico
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /**
   * Navega suavemente para a seção de contato
   * Calcula posição considerando altura do header
   */
  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const headerHeight = 80;
      const elementPosition = contactSection.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gray-950 section-with-header"
    >
      {/* CAMADAS VISUAIS EM ORDEM DE PROFUNDIDADE */}

      {/* 1. BACKGROUND PREMIUM - Camada base com gradientes animados */}
      <div className="absolute inset-0">
        <LazyBackground priority="high">
          <PremiumBackground intensity="high" />
        </LazyBackground>
      </div>

      {/* 2. ELEMENTOS NEON - Ícones grandes com efeitos brilhantes */}
      <div className="absolute inset-0">
        <HeroNeonElements />
      </div>

      {/* 3. PARTÍCULAS VISUAIS - Símbolos de código flutuantes */}
      <div className="absolute inset-0">
        <TechParticles />
      </div>

      {/* 4. CONEXÕES ENTRE PARTÍCULAS - Rede de linhas conectadas */}
      <div className="absolute inset-0">
        <ParticleConnections />
      </div>

      {/* 5. GRADIENTE DINÂMICO - Overlay sutil para profundidade */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />

      {/* CONTEÚDO PRINCIPAL - Texto, stats, botões e indicador */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-center min-h-screen z-10">
        <div className="hero-content-element">
          <HeroText />
        </div>

        <div className="hero-content-element">
          <LiveStats />
        </div>

        <div className="hero-content-element">
          <ActionButtons onContactClick={handleContactClick} />
        </div>

        <div className="hero-content-element">
          <ScrollIndicator onExploreClick={onExploreClick} />
        </div>
      </div>

      {/* BORDA DE BRILHO - Efeito sutil nas bordas da seção */}
      <div
        className={`absolute inset-0 border-2 ${colors.borders.light} rounded-none pointer-events-none`}
      />
    </section>
  );
};

export default Hero;
