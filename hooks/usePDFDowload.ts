// hooks/usePDFDownload.ts
"use client";

import { useState, useCallback } from "react";
import {
  generatePortfolioPDF,
  generatePDFForPreview,
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
  pdfUrl: string | null;
  isModalOpen: boolean;
  closeModal: () => void;
}

export const usePDFDownload = (): UsePDFDownloadReturn => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const downloadPDF = useCallback(async (options: PDFOptions = {}) => {
    setIsDownloading(true);
    setProgress(0);
    setError(null);

    try {
      console.log("📥 Iniciando download do PDF...");
      await generatePortfolioPDF({
        ...options,
        preview: false,
        onProgress: (currentProgress) => {
          console.log(`📊 Progresso: ${currentProgress}%`);
          setProgress(currentProgress);
        },
      });

      setProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 300));
      console.log("✅ Download concluído");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao gerar PDF";
      setError(errorMessage);
      console.error("❌ PDF Download Error:", err);
      throw err;
    } finally {
      setIsDownloading(false);
      setProgress(0);
    }
  }, []);

  const previewPDF = useCallback(async (): Promise<void> => {
    setIsPreviewing(true);
    setProgress(0);
    setError(null);
    setPdfUrl(null);
    // NÃO definir isModalOpen como true aqui - só depois que o PDF estiver pronto

    try {
      console.log("👀 Iniciando preview do PDF...");
      const result = await generatePDFForPreview((currentProgress) => {
        console.log(`📊 Progresso do preview: ${currentProgress}%`);
        setProgress(currentProgress);
      });

      console.log("✅ Preview gerado, abrindo modal...");
      setPdfUrl(result.url);
      // SÓ AGORA abrir o modal quando tudo estiver pronto
      setIsModalOpen(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao gerar preview do PDF";
      setError(errorMessage);
      console.error("❌ PDF Preview Generation Error:", err);
      throw err;
    } finally {
      setIsPreviewing(false);
      setProgress(0);
    }
  }, []);

  const closeModal = useCallback(() => {
    console.log("🔒 Fechando modal...");
    setIsModalOpen(false);
    // Revoke the object URL to avoid memory leaks
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
  }, [pdfUrl]);

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
    pdfUrl,
    isModalOpen,
    closeModal,
  };
};
