"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Download, Rocket, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PremiumBackground } from "@/components/layout/PremiumBackground";
import { LazyComponent } from "@/components/optimization/LazyComponent";
import { LazyBackground } from "@/components/optimization/LazyBackground";
import { HeroNeonElements } from "@/components/layout/HeroNeonElements";
import { getSafeColors } from "@/lib/colors";

// TEXTO HERO COM TYPEWRITER APENAS NO SUBTÍTULO
const HeroText = () => {
  const colors = getSafeColors();

  // Typewriter para o subtítulo
  const [subtitleText, setSubtitleText] = useState("");
  const [currentSubtitle, setCurrentSubtitle] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const subtitles = useMemo(
    () => [
      "Transformo visões ambiciosas em soluções digitais",
      "Desenvolvo experiências web de alto impacto",
      "Crio sistemas escaláveis com tecnologia de ponta",
      "Entregando excelência em cada linha de código",
    ],
    []
  );

  useEffect(() => {
    const currentSubtitleText = subtitles[currentSubtitle];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && subtitleText.length === currentSubtitleText.length) {
      // Esperar antes de deletar
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && subtitleText.length === 0) {
      // Mudar para próximo subtítulo
      setIsDeleting(false);
      setCurrentSubtitle((prev) => (prev + 1) % subtitles.length);
    } else {
      // Digitar ou deletar
      const speed = isDeleting ? 30 : 50;
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
        {/* TEXTO PRINCIPAL FIXO (MANTIDO EXATAMENTE COMO ESTAVA) */}
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
                delay: 0.3 + lineIndex * 0.2,
                ease: "easeOut",
              }}
            >
              {line.split("").map((char, charIndex) => (
                <motion.span
                  key={`${lineIndex}-${charIndex}`}
                  className="inline-block mx-0.5 sm:mx-1 transition-all duration-300 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent hover:scale-110 hover:text-cyan-300"
                  initial={{ y: 100, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + lineIndex * 0.3 + charIndex * 0.03,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.2,
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>
          ))}
        </h1>

        {/* SUBTÍTULO COM TYPEWRITER */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p
            className={`text-xl sm:text-2xl lg:text-3xl font-light min-h-[60px] flex items-center justify-center ${colors.classes.text.gradient}`}
          >
            {subtitleText}
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

// PARTÍCULAS VISUAIS OTIMIZADAS
const TechParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const particles: HTMLElement[] = [];
      const particleTypes = [
        { content: "</>", color: "text-cyan-300", size: "text-lg" },
        { content: "{}", color: "text-blue-300", size: "text-lg" },
      ];

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

        // Animação GSAP
        const timeline = gsap.timeline();

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
            ease: "back.out(1.7)",
          }
        );

        timeline.to(
          particle,
          {
            y: -100,
            rotation: 360,
            duration: 8 + Math.random() * 4,
            ease: "power1.out",
          },
          "+=0.5"
        );

        timeline.to(particle, {
          opacity: 0,
          scale: 0.5,
          duration: 1,
          ease: "power1.in",
          onComplete: () => {
            particle.remove();
            const index = particles.indexOf(particle);
            if (index > -1) particles.splice(index, 1);
          },
        });

        // Pulsação
        gsap.to(particle, {
          scale: 1.2,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      };

      // Criar partículas iniciais
      for (let i = 0; i < 10; i++) {
        gsap.delayedCall(i * 0.4, createParticle);
      }

      // Criar partículas continuamente
      const interval = setInterval(createParticle, 1000);

      return () => {
        clearInterval(interval);
        particles.forEach((particle) => particle.remove());
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 2 }}
    />
  );
};

// CONEXÕES ENTRE PARTÍCULAS - OTIMIZADO
const ParticleConnections = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Atualizar e desenhar partículas
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Rebater nas bordas
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Desenhar partícula
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6, 182, 212, 0.4)";
        ctx.fill();
      });

      // Desenhar conexões
      ctx.strokeStyle = "rgba(6, 182, 212, 0.15)";
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = 1 - distance / 150;
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.2})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

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

//  ESTATÍSTICAS ANIMADAS
const LiveStats = () => {
  const [projects, setProjects] = useState(0);
  const [experience, setExperience] = useState(0);
  const [clients, setClients] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);

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
    const animateValue = (
      setter: React.Dispatch<React.SetStateAction<number>>,
      end: number,
      duration: number
    ) => {
      let start = 0;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setter(end);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    animateValue(setProjects, 50, 2000);
    animateValue(setExperience, 5, 1800);
    animateValue(setClients, 30, 2200);
    animateValue(setSatisfaction, 100, 2500);
  }, []);

  return (
    <LazyComponent animation="fadeUp" delay={400}>
      <motion.div
        className="flex justify-center gap-6 sm:gap-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, ease: "easeOut" }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 1.4 + index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{ scale: 1.1, y: -5 }}
          >
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">
              {stat.value}
              {stat.suffix}
            </div>
            <div className="text-sm text-cyan-300 font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </LazyComponent>
  );
};

//  BOTÕES DE AÇÃO
const ActionButtons = ({ onContactClick }: { onContactClick: () => void }) => {
  return (
    <LazyComponent animation="fadeUp" delay={500}>
      <motion.div
        className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
      >
        {/* BOTÃO INICIAR PROJETO - COM ROCKET */}
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button
            onClick={onContactClick}
            variant="premium"
            size="xl"
            className="gap-3 relative overflow-hidden group px-8"
          >
            {/* Efeito de brilho interno CONTÍNUO */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 2,
              }}
            />
            {/* Efeito de brilho extra no HOVER (QUASE INSTANTÂNEO) */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12"
              initial={{ x: "-100%" }}
              whileHover={{ x: "200%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            {/* Ícone com animação */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Rocket className="w-5 h-5" />
              {/* Efeito de propulsão */}
              <motion.div
                className="absolute -bottom-1 -right-1 w-2 h-1 bg-yellow-400 rounded-full blur-sm"
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            INICIAR PROJETO
            {/* Reflexo na borda */}
            <div className="absolute inset-0 rounded-xl border border-white/30 group-hover:border-white/50 transition-all duration-300" />
          </Button>
        </motion.div>

        {/* BOTÃO BAIXAR CV */}
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button
            variant="neon"
            size="xl"
            className="gap-3 relative overflow-hidden group px-8 border-2"
          >
            {/* Efeito de brilho pulsante na borda */}
            <motion.div
              className="absolute inset-0 rounded-xl border border-cyan-400/50"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Efeito de brilho interno CONTÍNUO */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent transform -skew-x-12"
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 2,
              }}
            />
            {/* Efeito de brilho extra no HOVER (QUASE INSTANTÂNEO) */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent transform -skew-x-12"
              initial={{ x: "-100%" }}
              whileHover={{ x: "200%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            {/* Ícone com animação */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.2, y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Download className="w-5 h-5" />
            </motion.div>
            BAIXAR CV
            {/* Reflexo na borda */}
            <div className="absolute inset-0 rounded-xl border border-cyan-400/20 group-hover:border-cyan-400/40 transition-all duration-300" />
          </Button>
        </motion.div>
      </motion.div>
    </LazyComponent>
  );
};
// 🔥 INDICADOR DE SCROLL
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
          className="flex flex-col items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg p-2"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-sm font-medium">Explorar Mais</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
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

// 🔥 INTERFACE PRINCIPAL DO HERO
interface HeroProps {
  onExploreClick: () => void;
}

export const Hero = ({ onExploreClick }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const colors = getSafeColors();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animação de entrada do hero
      gsap.fromTo(
        ".hero-content-element",
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "back.out(1.7)",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

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
      {/* CAMADAS DE BACKGROUND E PARTÍCULAS */}

      {/* 1. Background Premium */}
      <div className="absolute inset-0">
        <LazyBackground priority="high">
          <PremiumBackground intensity="high" />
        </LazyBackground>
      </div>

      {/* 2. Elementos Neon (JÁ INCLUI partículas de código e conexões) */}
      <div className="absolute inset-0">
        <HeroNeonElements />
      </div>

      {/* 3. Partículas Visuais (Ícones/Símbolos) - APENAS ESTA É EXTRA */}
      <div className="absolute inset-0">
        <TechParticles />
      </div>

      {/* 4. Conexões entre Partículas - APENAS ESTA É EXTRA */}
      <div className="absolute inset-0">
        <ParticleConnections />
      </div>

      {/* 5. Gradiente Dinâmico */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />

      {/* CONTEÚDO PRINCIPAL */}
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

      {/* BORDA DE BRILHO */}
      <div
        className={`absolute inset-0 border-2 ${colors.borders.light} rounded-none pointer-events-none`}
      />
    </section>
  );
};

export default Hero;
