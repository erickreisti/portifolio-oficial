import { useState, useEffect, useRef } from "react";

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
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!src) {
      setHasError(true);
      return;
    }

    if (priority) {
      setIsLoading(false);
      setImageSrc(src);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    const img = new Image();
    img.src = src;

    const onLoad = () => {
      setIsLoading(false);
      setImageSrc(src);
    };

    const onError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);

    if ("IntersectionObserver" in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observerRef.current?.disconnect();
            }
          });
        },
        { rootMargin: "50px" }
      );

      const observerElement = document.createElement("div");
      document.body.appendChild(observerElement);
      observerRef.current.observe(observerElement);

      return () => {
        observerRef.current?.disconnect();
        if (document.body.contains(observerElement)) {
          document.body.removeChild(observerElement);
        }
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onError);
      };
    } else {
      setImageSrc(src);
    }

    return () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
  }, [src, priority]);

  return {
    src: imageSrc,
    isLoading,
    hasError,
    sizes,
  };
};

export default useImageOptimization;
