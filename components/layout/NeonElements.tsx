"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import {
  Rocket,
  Code,
  Globe,
  Database,
  Server,
  Smartphone,
} from "lucide-react";
import { LazyComponent } from "@/components/optimization/LazyComponent";

/* ---------------- Componente NeonElement Genérico ---------------- */
export const NeonElement: React.FC<{
  Icon: any;
  position: string;
  color: string;
  delay?: number;
}> = ({ Icon, position, color, delay = 0 }) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(elementRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView || !elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementRef.current!,
        { opacity: 0, scale: 0, y: 100, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          delay: delay * 0.15,
        }
      );
      gsap.to(elementRef.current!, {
        y: -12,
        rotation: 5,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: delay * 0.2,
      });
    }, elementRef);

    return () => ctx.revert();
  }, [isInView, delay]);

  return (
    <LazyComponent animation="fadeIn" delay={delay * 80}>
      <div
        ref={elementRef}
        className={`absolute ${position} pointer-events-none`}
      >
        <Icon className={`${color} text-2xl opacity-70`} />
      </div>
    </LazyComponent>
  );
};

/* ---------------- Componente NeonElements Genérico ---------------- */
export const NeonElements: React.FC = () => {
  const neonElements = [
    {
      Icon: Rocket,
      position: "top-20 left-20",
      color: "text-cyan-400",
      delay: 0,
    },
    {
      Icon: Code,
      position: "top-32 right-24",
      color: "text-cyan-400",
      delay: 1,
    },
    {
      Icon: Globe,
      position: "bottom-40 left-24",
      color: "text-cyan-400",
      delay: 2,
    },
    {
      Icon: Database,
      position: "bottom-32 right-20",
      color: "text-cyan-400",
      delay: 3,
    },
    {
      Icon: Server,
      position: "top-40 right-16",
      color: "text-cyan-400",
      delay: 4,
    },
    {
      Icon: Smartphone,
      position: "bottom-48 left-16",
      color: "text-cyan-400",
      delay: 5,
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {neonElements.map((element, idx) => (
        <NeonElement key={`${element.position}-${idx}`} {...element} />
      ))}
    </div>
  );
};

export default NeonElements;
