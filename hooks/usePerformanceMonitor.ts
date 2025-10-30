"use client";

import { useEffect, useRef } from "react";

interface PerformanceMetrics {
  componentName: string;
  loadTime: number;
  firstRender: boolean;
  timestamp: number;
}

export const usePerformanceMonitor = (componentName: string) => {
  const mountTime = useRef(performance.now());
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      const loadTime = performance.now() - mountTime.current;

      const metrics: PerformanceMetrics = {
        componentName,
        loadTime,
        firstRender: firstRender.current,
        timestamp: Date.now(),
      };

      // Log condicional melhorado
      if (process.env.NODE_ENV === "development") {
        console.log(`🚀 ${componentName} loaded in: ${loadTime.toFixed(2)}ms`);

        // Monitoramento de memória
        if ("memory" in performance) {
          const memory = (performance as any).memory;
          console.log(
            `💾 Memory: ${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`
          );
        }
      }

      // Analytics em produção
      if (process.env.NODE_ENV === "production") {
        // Enviar métricas para seu serviço de analytics
        console.log("📊 Performance Metrics:", metrics);
      }

      firstRender.current = false;
    }

    return () => {
      // Cleanup metrics
      if (process.env.NODE_ENV === "development") {
        const unmountTime = performance.now();
        const lifeTime = unmountTime - mountTime.current;
        if (lifeTime > 10000) {
          console.log(`⏱️ ${componentName} lifetime: ${lifeTime.toFixed(2)}ms`);
        }
      }
    };
  }, [componentName]);
};

// Hook adicional para intersection observer - NOVO
export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      rootMargin: "50px",
      threshold: 0.1,
      ...options,
    });

    return () => observer.disconnect();
  }, [callback, options]);
};
