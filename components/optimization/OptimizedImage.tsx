"use client";

import { useState } from "react";
import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Fallback melhorado
  if (hasError) {
    return (
      <div
        className={`bg-gray-800 flex items-center justify-center ${className} ${
          fill ? "w-full h-full" : ""
        }`}
        role="img"
        aria-label={alt}
      >
        <div className="text-gray-500 text-center p-4">
          <div className="w-8 h-8 mx-auto mb-2 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">📷</span>
          </div>
          <span className="text-sm">Imagem não disponível</span>
        </div>
      </div>
    );
  }

  const imageProps = fill
    ? { fill: true, sizes }
    : { width: width || 400, height: height || 300 };

  return (
    <div
      className={`relative overflow-hidden ${
        fill ? "w-full h-full" : ""
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        {...imageProps}
        className={`
          transition-all duration-500 ease-out object-cover
          ${isLoading ? "scale-110 blur-lg" : "scale-100 blur-0"}
          ${fill ? "w-full h-full" : ""}
        `}
        priority={priority}
        quality={80}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />

      {/* Loading state melhorado */}
      {isLoading && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 animate-pulse flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};
