"use client";

import dynamic from "next/dynamic";

// Importa o motion.div dinamicamente com SSR desativado
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false } // ESSENCIAL: Garante que só carregue no cliente
);

export default MotionDiv;
