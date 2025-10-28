// providers/LoadingProvider.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { TechLoading } from "@/components/layout/TechLoading";

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

  useEffect(() => {
    // Simular tempo de carregamento
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <TechLoading />}

      <div
        className={`min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 transition-all duration-700 ${
          isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        {children}
      </div>
    </LoadingContext.Provider>
  );
};
