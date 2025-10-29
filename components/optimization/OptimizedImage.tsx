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
  fill?: boolean; // Adicione esta linha
  sizes?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  fill = false, // Valor padrão
  sizes,
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={`
          transition-all duration-500 ease-out
          ${isLoading ? "scale-110 blur-lg" : "scale-100 blur-0"}
        `}
        priority={priority}
        fill={fill}
        sizes={sizes}
        onLoad={() => setIsLoading(false)}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 animate-pulse" />
      )}
    </div>
  );
};
