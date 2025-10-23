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
    // Garante que o body tenha background durante o loading
    document.body.style.backgroundColor = "#0f172a";
    document.body.style.overflow = "hidden"; // Previne scroll durante loading

    const timer = setTimeout(() => {
      setIsLoading(false);
      // Restaura scroll após loading
      document.body.style.overflow = "unset";
    }, 3500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && (
        <div className="intergalactic-loading">
          <IntergalacticLoading />
        </div>
      )}
      {!isLoading && children}
    </LoadingContext.Provider>
  );
};
