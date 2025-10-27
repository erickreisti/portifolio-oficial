// components/layout/IntergalacticLoading.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { Rocket, Stars, Satellite, Zap } from "lucide-react";
import styles from "./IntergalacticLoading.module.css";

export const IntergalacticLoading = () => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const messages = [
    "INICIANDO PROPULSORES INTERGALÁCTICOS...",
    "CARREGANDO SISTEMAS DE ENERGIA...",
    "CALIBRANDO HIPERDRIVE...",
    "PRONTO PARA DECOLAGEM! 🚀",
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsComplete(true), 800);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 120);

    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, []);

  if (isComplete) return null;

  return (
    <div className={styles.loadingContainer}>
      {/* Estrelas de Fundo */}
      <div className={styles.starsBackground}>
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className={styles.star}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Nebulosas */}
      <div className={styles.nebula1} />
      <div className={styles.nebula2} />
      <div className={styles.nebula3} />

      {/* Conteúdo Principal */}
      <div className={styles.content}>
        {/* Foguete Principal */}
        <div className={styles.rocketContainer}>
          <div className={styles.rocketGlow} />
          <Rocket className={styles.rocketIcon} />
          <div className={styles.rocketExhaust}>
            <div className={styles.exhaustFlame} />
            <div className={styles.exhaustParticles} />
          </div>
        </div>

        {/* Mensagens e Progresso */}
        <div className={styles.infoPanel}>
          <div className={styles.messageContainer}>
            <Zap className={styles.messageIcon} />
            <p className={styles.messageText}>{messages[currentMessage]}</p>
          </div>

          {/* Barra de Progresso Avançada */}
          <div className={styles.progressSection}>
            <div className={styles.progressBarContainer}>
              <div
                className={styles.progressBar}
                style={{ width: `${progress}%` }}
              >
                <div className={styles.progressGlow} />
                <div className={styles.progressParticles}>
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={styles.progressParticle}
                      style={{ animationDelay: `${i * 0.5}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.progressInfo}>
              <span className={styles.percentage}>{Math.round(progress)}%</span>

              {/* Indicadores de Sistema */}
              <div className={styles.systemIndicators}>
                <div className={styles.indicator}>
                  <div
                    className={`${styles.indicatorDot} ${styles.systemOnline}`}
                  />
                  <span>SYS</span>
                </div>
                <div className={styles.indicator}>
                  <div
                    className={`${styles.indicatorDot} ${styles.powerOnline}`}
                  />
                  <span>PWR</span>
                </div>
                <div className={styles.indicator}>
                  <div
                    className={`${styles.indicatorDot} ${styles.networkOnline}`}
                  />
                  <span>NET</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Satélites Orbitais */}
        <div className={styles.satellite1}>
          <div className={styles.satelliteOrbit}>
            <Satellite className={styles.satelliteIcon} />
          </div>
        </div>

        <div className={styles.satellite2}>
          <div className={styles.satelliteOrbit}>
            <Stars className={styles.satelliteIcon} />
          </div>
        </div>

        {/* Partículas Flutuantes */}
        <div className={styles.floatingParticles}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={styles.floatingParticle}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
