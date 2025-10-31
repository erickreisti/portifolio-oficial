// hooks/usePDFDownload.ts
"use client";

import { useState, useCallback } from "react";
import {
  generatePortfolioPDF,
  previewPortfolioPDF,
  type PDFOptions,
} from "@/lib/pdf-generator";

interface UsePDFDownloadReturn {
  downloadPDF: (options?: PDFOptions) => Promise<void>;
  previewPDF: () => Promise<void>;
  isDownloading: boolean;
  isPreviewing: boolean;
  progress: number;
  error: string | null;
  resetError: () => void;
}

export const usePDFDownload = (): UsePDFDownloadReturn => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const downloadPDF = useCallback(async (options: PDFOptions = {}) => {
    setIsDownloading(true);
    setProgress(0);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 100));

      await generatePortfolioPDF({
        ...options,
        onProgress: (currentProgress) => {
          setProgress(currentProgress);
          options.onProgress?.(currentProgress);
        },
      });

      setProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao gerar PDF";
      setError(errorMessage);
      console.error("PDF Download Error:", err);
      throw err;
    } finally {
      setIsDownloading(false);
      setProgress(0);
    }
  }, []);

  const previewPDF = useCallback(async () => {
    setIsPreviewing(true);
    setError(null);

    try {
      await previewPortfolioPDF();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao visualizar PDF";
      setError(errorMessage);
      console.error("PDF Preview Error:", err);
      throw err;
    } finally {
      setIsPreviewing(false);
    }
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    downloadPDF,
    previewPDF,
    isDownloading,
    isPreviewing,
    progress,
    error,
    resetError,
  };
};
