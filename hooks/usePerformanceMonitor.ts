// hooks/usePerformanceMonitor.ts
import { useEffect, useRef } from "react";

export const usePerformanceMonitor = (componentName: string) => {
  const mountTime = useRef(performance.now());
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      const loadTime = performance.now() - mountTime.current;

      // Log performance metrics apenas em desenvolvimento
      if (process.env.NODE_ENV === "development") {
        console.log(`🚀 ${componentName} loaded in: ${loadTime.toFixed(2)}ms`);
      }

      // Monitor Core Web Vitals (apenas métricas básicas)
      if (typeof window !== "undefined" && "PerformanceObserver" in window) {
        try {
          // First Contentful Paint
          const fcpObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
              if (
                entry.name === "first-contentful-paint" &&
                process.env.NODE_ENV === "development"
              ) {
                console.log(`🎨 FCP: ${entry.startTime}ms`);
              }
            });
          });
          fcpObserver.observe({ entryTypes: ["paint"] });

          // Largest Contentful Paint
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            if (lastEntry && process.env.NODE_ENV === "development") {
              console.log(`📊 LCP: ${lastEntry.startTime}ms`);
            }
          });
          lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
        } catch (e) {
          // Silently fail em produção
          if (process.env.NODE_ENV === "development") {
            console.warn("PerformanceObserver not supported:", e);
          }
        }
      }

      firstRender.current = false;
    }

    return () => {
      // Cleanup performance monitoring
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
