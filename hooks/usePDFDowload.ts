// hooks/usePDFDownload.ts
"use client";

import { useState } from "react";
import { generatePortfolioPDF, type PDFOptions } from "@/lib/pdf-generator";

export const usePDFDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const downloadPDF = async (options: PDFOptions = {}) => {
    setIsDownloading(true);
    setProgress(0);
    setError(null);

    try {
      await generatePortfolioPDF({
        ...options,
        onProgress: setProgress,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      throw err;
    } finally {
      setIsDownloading(false);
      setProgress(0);
    }
  };

  return {
    downloadPDF,
    isDownloading,
    progress,
    error,
    resetError: () => setError(null),
  };
};
