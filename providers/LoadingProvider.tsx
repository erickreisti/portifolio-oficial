// providers/LoadingProvider.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { IntergalacticLoading } from "@/components/layout/IntergalacticLoading";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  setIsLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Configuração do body com fallbacks
  const setupBodyStyles = useCallback(() => {
    if (typeof window !== "undefined") {
      document.body.style.backgroundColor = "#0f172a";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
    }
  }, []);

  const cleanupBodyStyles = useCallback(() => {
    if (typeof window !== "undefined") {
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";

      // Transição suave para o background final
      setTimeout(() => {
        document.body.style.backgroundColor = "";
        document.body.style.transition = "background-color 0.5s ease";
      }, 500);
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    setupBodyStyles();

    // Simula o processo de loading com tempo variável baseado na performance
    const loadTime = Math.max(
      3000,
      Math.min(
        5000,
        typeof window !== "undefined" && window.performance
          ? window.performance.timing.loadEventEnd -
              window.performance.timing.navigationStart
          : 3500
      )
    );

    const timer = setTimeout(() => {
      setIsLoading(false);
      cleanupBodyStyles();
    }, loadTime);

    // Fallback: máximo de 6 segundos
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
      cleanupBodyStyles();
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
      cleanupBodyStyles();
    };
  }, [setupBodyStyles, cleanupBodyStyles]);

  // Previne renderização no servidor
  if (!isMounted) {
    return (
      <LoadingContext.Provider value={{ isLoading: true, setIsLoading }}>
        <div style={{ visibility: "hidden" }}>{children}</div>
      </LoadingContext.Provider>
    );
  }

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <IntergalacticLoading />}
      {!isLoading && <div className="animate-fadeIn">{children}</div>}
    </LoadingContext.Provider>
  );
};
