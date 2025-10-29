// hooks/useImageOptimization.ts
import { useState, useEffect } from "react";

interface UseImageOptimizationProps {
  src: string;
  priority?: boolean;
  sizes?: string;
}

export const useImageOptimization = ({
  src,
  priority = false,
  sizes = "100vw",
}: UseImageOptimizationProps) => {
  const [isLoading, setIsLoading] = useState(!priority);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(priority ? src : "");

  useEffect(() => {
    if (!src) {
      setHasError(true);
      return;
    }

    if (priority) {
      // Carregamento imediato para imagens prioritárias
      setIsLoading(false);
      setImageSrc(src);
      return;
    }

    // Lazy loading para imagens não prioritárias
    setIsLoading(true);

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setIsLoading(false);
      setImageSrc(src);
    };

    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };

    // Intersection Observer para lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "50px" } // Começar a carregar 50px antes de entrar na viewport
    );

    const dummyElement = document.createElement("div");
    observer.observe(dummyElement);

    return () => {
      observer.disconnect();
    };
  }, [src, priority]);

  return {
    src: imageSrc,
    isLoading,
    hasError,
    sizes,
  };
};
