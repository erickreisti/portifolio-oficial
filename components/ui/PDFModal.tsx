// components/ui/PDFModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink } from "lucide-react";
import { ModalPortal } from "./ModalPortal";
import { Button } from "@/components/ui/button";

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string | null;
  onDownload: () => void;
  isLoading?: boolean;
  isGenerating?: boolean;
  progress?: number;
}

export const PDFModal = ({
  isOpen,
  onClose,
  pdfUrl,
  onDownload,
  isLoading = false,
  isGenerating = false,
  progress = 0,
}: PDFModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOpenInNewTab = () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <ModalPortal isOpen={isOpen}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBackdropClick}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative bg-gray-900 rounded-2xl border border-cyan-500/20 shadow-2xl w-full max-w-6xl h-[95vh] flex flex-col z-[101]"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-cyan-500/20">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Visualizar Currículo
                  </h2>
                  <p className="text-cyan-400 text-sm mt-1">
                    {isGenerating
                      ? "Gerando PDF..."
                      : "Prévia do seu PDF profissional"}
                  </p>
                </div>

                {!isGenerating && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                )}
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 p-6 overflow-hidden">
                {isGenerating ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"
                      />
                      <p className="text-cyan-400 font-medium">
                        Gerando PDF... {progress}%
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        Preparando sua visualização
                      </p>
                      <div className="w-64 h-2 bg-gray-700 rounded-full mt-4 mx-auto overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  </div>
                ) : isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"
                      />
                      <p className="text-cyan-400 font-medium">
                        Carregando PDF...
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        Finalizando preparação
                      </p>
                    </div>
                  </div>
                ) : pdfUrl ? (
                  <div className="h-full flex flex-col">
                    <div className="flex-1 bg-white rounded-lg overflow-hidden border border-cyan-500/20 shadow-lg">
                      <iframe
                        src={pdfUrl}
                        className="w-full h-full"
                        title="Visualização do Currículo PDF"
                        loading="eager"
                      />
                    </div>

                    <div className="flex gap-3 mt-4">
                      <Button
                        onClick={onDownload}
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Baixar PDF
                      </Button>

                      <Button
                        onClick={handleOpenInNewTab}
                        variant="outline"
                        className="flex-1 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Abrir em Nova Aba
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <X className="w-8 h-8 text-red-400" />
                      </div>
                      <p className="text-red-400 font-medium">
                        Erro ao carregar PDF
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        Não foi possível gerar a visualização
                      </p>
                      <Button
                        onClick={onClose}
                        variant="outline"
                        className="mt-4 border-red-400 text-red-400 hover:bg-red-400/10"
                      >
                        Fechar
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {!isGenerating && (
                <div className="p-4 border-t border-cyan-500/20 bg-gray-800/50 rounded-b-2xl">
                  <p className="text-gray-400 text-sm text-center">
                    💡 Dica: Use "Abrir em Nova Aba" para uma visualização
                    melhor em dispositivos móveis
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalPortal>
  );
};
