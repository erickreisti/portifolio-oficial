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
    // Atualiza atributo para controle de transição
    document.documentElement.setAttribute("data-loading", "true");

    const timer = setTimeout(() => {
      setIsLoading(false);
      // Habilita transições suaves após o loading
      setTimeout(() => {
        document.documentElement.setAttribute("data-loading", "false");
      }, 100);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <IntergalacticLoading />}
      {!isLoading && children}
    </LoadingContext.Provider>
  );
};
