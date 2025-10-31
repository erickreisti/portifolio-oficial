// lib/pdf-generator.ts
export const generatePortfolioPDF = async (): Promise<void> => {
  try {
    // Método 1: Se você já tem um PDF pronto
    const pdfUrl = "/docs/portfolio-erick-reis.pdf";

    // Método 2: Gerar PDF dinamicamente (mais avançado)
    // await generateDynamicPDF();

    // Criar link de download
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Portfolio-Erick-Reis-FullStack.pdf";
    link.target = "_blank";

    // Disparar o download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Opcional: Tracking de download
    console.log("📄 Portfolio PDF downloaded successfully");
  } catch (error) {
    console.error("❌ Error downloading portfolio PDF:", error);
    // Fallback: Abrir em nova aba
    window.open("/docs/portfolio-erick-reis.pdf", "_blank");
  }
};

// Versão avançada - Gerar PDF dinamicamente (opcional)
const generateDynamicPDF = async (): Promise<string> => {
  // Esta é uma implementação básica - você pode usar bibliotecas como:
  // jsPDF, html2canvas, ou um serviço backend
  return "/docs/portfolio-erick-reis.pdf";
};
