"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LazyBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
  priority?: "high" | "medium" | "low";
}

export const LazyBackground = ({
  children,
  className = "",
  fallback,
  priority = "medium",
}: LazyBackgroundProps) => {
  const [isLoaded, setIsLoaded] = useState(priority === "high");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setIsLoaded(true);
      },
      priority === "high" ? 0 : priority === "medium" ? 100 : 300
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("lazy-background-container");
    if (element) {
      observer.observe(element);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [priority]);

  if (!isVisible && priority !== "high") {
    return (
      fallback || (
        <div className={`bg-gray-900 animate-pulse rounded-lg ${className}`} />
      )
    );
  }

  return (
    <motion.div
      id="lazy-background-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default LazyBackground;
