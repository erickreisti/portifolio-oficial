// lib/pdf-generator.ts
import { PDFContent } from "@/components/pdf/PDFContent";
import { renderToString } from "react-dom/server";
import React from "react";

export interface PDFOptions {
  fileName?: string;
  onProgress?: (progress: number) => void;
  preview?: boolean;
}

const waitForFrame = (): Promise<void> =>
  new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const generatePortfolioPDF = async (
  options: PDFOptions = {}
): Promise<{ blob: Blob; url: string } | void> => {
  const {
    fileName = "Erick-Reis-Curriculo-Profissional.pdf", // Nome profissional
    onProgress,
    preview = false,
  } = options;

  try {
    onProgress?.(10);
    await waitForFrame();

    const pdfBlob = await generateDynamicPDF(onProgress);
    const pdfUrl = URL.createObjectURL(pdfBlob);

    if (preview) {
      onProgress?.(100);
      console.log("📄 Currículo profissional gerado para preview");
      return { blob: pdfBlob, url: pdfUrl };
    }

    onProgress?.(90);
    await waitForFrame();

    // Download com nome profissional
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = fileName;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup
    setTimeout(() => {
      URL.revokeObjectURL(pdfUrl);
    }, 1000);

    onProgress?.(100);
    console.log("📄 Currículo profissional baixado com sucesso");
  } catch (error) {
    console.error("❌ Erro ao gerar currículo:", error);
    throw error;
  }
};

const generateDynamicPDF = async (
  onProgress?: (progress: number) => void
): Promise<Blob> => {
  onProgress?.(5);

  let iframe: HTMLIFrameElement | null = null;

  try {
    onProgress?.(15);

    // Renderizar componente
    const pdfContent = renderToString(React.createElement(PDFContent));
    const fullHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Érick Reis - Currículo Profissional</title>
        </head>
        <body>
          ${pdfContent}
        </body>
      </html>
    `;

    await waitForFrame();

    // Iframe isolado
    iframe = document.createElement("iframe");
    iframe.style.cssText = `
      position: fixed !important;
      left: -100vw !important;
      top: -100vh !important;
      width: 210mm !important;
      height: 297mm !important;
      border: none !important;
      opacity: 0 !important;
      pointer-events: none !important;
      z-index: -9999 !important;
      visibility: hidden !important;
    `;

    document.body.appendChild(iframe);

    await new Promise<void>((resolve) => {
      iframe!.onload = () => resolve();
      iframe!.src = "about:blank";
    });

    iframe.contentDocument!.open();
    iframe.contentDocument!.write(fullHTML);
    iframe.contentDocument!.close();

    onProgress?.(25);
    await waitForFrame();
    await delay(600);

    onProgress?.(35);

    const [html2canvasModule, jsPDFModule] = await Promise.all([
      import("html2canvas"),
      import("jspdf"),
    ]);

    const html2canvas = html2canvasModule.default;
    const jsPDF = jsPDFModule.default;

    onProgress?.(45);
    await waitForFrame();

    console.log("📸 Capturando currículo...");

    const iframeBody = iframe.contentDocument!.body;
    const canvas = await html2canvas(iframeBody, {
      scale: 1.5,
      useCORS: true,
      logging: false,
      width: iframeBody.scrollWidth,
      height: iframeBody.scrollHeight,
      backgroundColor: "#ffffff",
      removeContainer: false,
      allowTaint: false,
      foreignObjectRendering: true,
      imageTimeout: 10000,
    });

    console.log("✅ Captura concluída");
    onProgress?.(65);

    if (iframe && iframe.parentNode) {
      document.body.removeChild(iframe);
    }

    await waitForFrame();

    onProgress?.(75);
    console.log("📄 Criando PDF profissional...");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgData = canvas.toDataURL("image/jpeg", 0.85);
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let position = 0;
    let heightLeft = imgHeight;

    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    onProgress?.(85);

    let pageCount = 1;
    while (heightLeft > 0 && pageCount < 3) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      pageCount++;
    }

    console.log(`📑 PDF criado com ${pageCount} páginas`);

    const pdfBlob = pdf.output("blob");
    console.log("✅ Currículo profissional gerado:", pdfBlob.size, "bytes");

    return pdfBlob;
  } catch (error) {
    console.error("❌ Erro na geração:", error);
    if (iframe && iframe.parentNode) {
      document.body.removeChild(iframe);
    }
    throw error;
  }
};

export const generatePDFForPreview = async (
  onProgress?: (progress: number) => void
): Promise<{ blob: Blob; url: string }> => {
  const pdfBlob = await generateDynamicPDF(onProgress);
  const pdfUrl = URL.createObjectURL(pdfBlob);
  return { blob: pdfBlob, url: pdfUrl };
};

export const PDFDownloads = {
  curriculo: () =>
    generatePortfolioPDF({
      fileName: "Erick-Reis-Curriculo-Profissional.pdf",
    }),

  portfolio: () =>
    generatePortfolioPDF({
      fileName: "Erick-Reis-Portfolio.pdf",
    }),
};
