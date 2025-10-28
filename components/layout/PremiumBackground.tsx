// components/layout/PremiumBackground.tsx
"use client";

import { motion } from "framer-motion";
import { usePremiumBackground } from "@/hooks/usePremiumBackground";

interface PremiumBackgroundProps {
  children?: React.ReactNode;
  intensity?: "soft" | "medium" | "high";
}

export const PremiumBackground = ({
  children,
  intensity = "medium",
}: PremiumBackgroundProps) => {
  const backgroundRef = usePremiumBackground();

  const opacityLevels = {
    soft: { primary: 0.08, secondary: 0.05, tertiary: 0.03 },
    medium: { primary: 0.15, secondary: 0.08, tertiary: 0.05 },
    high: { primary: 0.2, secondary: 0.12, tertiary: 0.08 },
  };

  const { primary, secondary, tertiary } = opacityLevels[intensity];

  return (
    <div
      ref={backgroundRef}
      className="absolute inset-0 overflow-hidden bg-gray-950"
    >
      {/* Gradiente base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900" />

      {/* Elementos orb animados */}
      <motion.div
        className="absolute top-1/4 left-1/6 w-80 h-80 bg-tech-cyan rounded-full filter blur-3xl"
        animate={{
          opacity: [primary * 0.7, primary, primary * 0.7],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/5 w-72 h-72 bg-tech-purple rounded-full filter blur-3xl"
        animate={{
          opacity: [secondary * 0.7, secondary, secondary * 0.7],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-2/3 left-1/3 w-64 h-64 bg-tech-blue rounded-full filter blur-3xl"
        animate={{
          opacity: [tertiary * 0.7, tertiary, tertiary * 0.7],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Grid sutil */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Overlay final */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950/40 via-transparent to-gray-950/60" />

      {children}
    </div>
  );
};
