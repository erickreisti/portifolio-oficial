// lib/pdf-generator.ts

export interface PDFOptions {
  fileName?: string;
  openInNewTab?: boolean;
  trackingEvent?: string;
  onProgress?: (progress: number) => void;
}

export const generatePortfolioPDF = async (
  options: PDFOptions = {}
): Promise<void> => {
  const {
    fileName = "Portfolio-Erick-Reis-FullStack.pdf",
    openInNewTab = false,
    trackingEvent = "portfolio_download",
    onProgress,
  } = options;

  try {
    // Simular progresso (opcional)
    onProgress?.(10);

    // URL do PDF - coloque seu arquivo na pasta public/docs/
    const pdfUrl = "/docs/portfolio-erick-reis.pdf";

    // Verificar se o arquivo existe
    onProgress?.(30);

    // Pequeno delay para melhor UX (opcional)
    await new Promise((resolve) => setTimeout(resolve, 500));
    onProgress?.(60);

    if (openInNewTab) {
      // Abrir em nova aba
      window.open(pdfUrl, "_blank");
    } else {
      // Download direto
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = fileName;
      link.target = "_blank";

      // Disparar o download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    onProgress?.(100);

    // Tracking (opcional)
    console.log(`🎯 Tracking: ${trackingEvent}`);
    console.log("📄 Portfolio PDF downloaded successfully");
  } catch (error) {
    console.error("❌ Error downloading portfolio PDF:", error);

    // Fallback: Tentar abrir em nova aba
    window.open("/docs/portfolio-erick-reis.pdf", "_blank");
  }
};

// Versão com timeout para garantir resposta
export const generatePortfolioPDFWithTimeout = async (
  timeoutMs = 10000
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("Download timeout"));
    }, timeoutMs);

    try {
      await generatePortfolioPDF();
      clearTimeout(timeoutId);
      resolve();
    } catch (error) {
      clearTimeout(timeoutId);
      reject(error);
    }
  });
};

// Versão alternativa para diferentes tipos de PDF
export const PDFDownloads = {
  portfolio: () =>
    generatePortfolioPDF({
      fileName: "Erick-Reis-Portfolio.pdf",
      trackingEvent: "portfolio_download",
    }),

  resume: () =>
    generatePortfolioPDF({
      fileName: "Erick-Reis-Curriculo.pdf",
      trackingEvent: "resume_download",
    }),

  fullCV: () =>
    generatePortfolioPDF({
      fileName: "Erick-Reis-CV-Completo.pdf",
      trackingEvent: "full_cv_download",
    }),
};
