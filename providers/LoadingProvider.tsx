// providers/LoadingProvider.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { IntergalacticLoading } from "@/components/layout/IntergalacticLoading";

const LoadingContext = createContext({
  isLoading: true,
  setIsLoading: (loading: boolean) => {},
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula o tempo de carregamento
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 3.5 segundos para mostrar toda a animação

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <IntergalacticLoading />}
      {!isLoading && children}
    </LoadingContext.Provider>
  );
};
