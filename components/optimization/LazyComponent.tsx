"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface LazyComponentProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  animation?: "fadeUp" | "fadeIn" | "scale" | "slideUp";
  delay?: number;
  priority?: "high" | "medium" | "low";
}

export const LazyComponent = ({
  children,
  className = "",
  threshold = 0.1,
  rootMargin = "50px",
  animation = "fadeUp",
  delay = 0,
  priority = "medium",
}: LazyComponentProps) => {
  const [isVisible, setIsVisible] = useState(priority === "high");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority !== "high") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold, rootMargin }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }
  }, [threshold, rootMargin, priority]);

  const animations = {
    fadeUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
    },
    slideUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
    },
  };

  const selectedAnimation = animations[animation];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={selectedAnimation.initial}
      animate={
        isVisible ? selectedAnimation.animate : selectedAnimation.initial
      }
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  );
};
