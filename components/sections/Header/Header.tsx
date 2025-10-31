"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Menu,
  X,
  User,
  Code,
  Briefcase,
  Mail,
  Home,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedActionButton } from "@/components/ui/AnimatedActionButton";
import { OptimizedImage } from "@/components/optimization/OptimizedImage";
import { LazyComponent } from "@/components/optimization/LazyComponent";
import { usePDFDownload } from "@/hooks/usePDFDowload";
import { getSafeColors } from "@/lib/colors";
import { PDFModal } from "@/components/ui/PDFModal";

const NAV_ITEMS = [
  { name: "Início", href: "#hero", icon: Home },
  { name: "Sobre", href: "#about", icon: User },
  { name: "Habilidades", href: "#skills", icon: Code },
  { name: "Projetos", href: "#projects", icon: Briefcase },
  { name: "Contato", href: "#contact", icon: Mail },
];

interface HeaderProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

export const Header = ({ activeSection, onNavClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(0.3);
  const [hasInteracted, setHasInteracted] = useState(false);
  const colors = getSafeColors();

  const {
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
  } = usePDFDownload();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = document.getElementById("hero")?.offsetHeight || 600;

      const opacity = Math.min(0.95, 0.3 + (scrollY / heroHeight) * 0.8);
      setHeaderOpacity(opacity);
      setIsScrolled(scrollY > 50);

      if (scrollY > 100 && !hasInteracted) {
        setHasInteracted(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasInteracted]);

  const handleNavClick = (sectionId: string) => {
    onNavClick(sectionId);
    setIsMobileMenuOpen(false);
    setHasInteracted(true);
  };

  const handleDownloadCV = async () => {
    try {
      await downloadPDF({
        fileName: "Erick-Reis-Curriculo.pdf",
      });
    } catch (error) {
      console.error("Erro no download:", error);
    }
  };

  const handlePreviewCV = async () => {
    try {
      await previewPDF();
    } catch (error) {
      console.error("Erro na visualização:", error);
    }
  };

  const handleModalDownload = async () => {
    try {
      await downloadPDF({
        fileName: "Erick-Reis-Curriculo.pdf",
      });
      closeModal();
    } catch (error) {
      console.error("Erro no download:", error);
    }
  };

  const shouldShowIcon = (sectionName: string) => {
    if (!hasInteracted && sectionName === "hero") return true;
    return hasInteracted && activeSection === sectionName;
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          background: `rgba(15, 23, 42, ${headerOpacity})`,
          backdropFilter: `blur(${
            isScrolled ? "20px" : "12px"
          }) saturate(180%)`,
          borderBottom: isScrolled
            ? `1px solid rgba(6, 182, 212, 0.15)`
            : "1px solid transparent",
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <motion.div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: isScrolled ? 1 : 0,
            scaleX: isScrolled ? 1 : 0.5,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <LazyComponent animation="fadeIn" delay={200}>
            <motion.button
              onClick={() => handleNavClick("hero")}
              className="flex items-center gap-2 group focus:outline-none rounded-lg p-1 relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2 p-2 rounded-xl bg-gradient-to-r from-gray-900/10 to-gray-800/5 backdrop-blur-sm border border-cyan-500/10 group-hover:border-cyan-400/20 transition-all duration-300 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-blue-400/5"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative"
                >
                  <OptimizedImage
                    src="/images/hashblue.svg"
                    alt="Erick Reis Logo"
                    width={32}
                    height={32}
                    priority={true}
                    className="brightness-125 drop-shadow-lg"
                  />
                  <motion.div
                    className="absolute inset-0 bg-cyan-400/10 rounded-lg"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
                <div className="text-left hidden sm:block">
                  <motion.h3
                    className="text-base font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    ÉRICK REIS
                  </motion.h3>
                  <motion.p
                    className="text-xs font-mono text-cyan-400/80 tracking-widest"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    FULLSTACK ENGINEER
                  </motion.p>
                </div>
              </div>
            </motion.button>
          </LazyComponent>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item, index) => {
              const sectionName = item.href.replace("#", "");
              const isActive = activeSection === sectionName;
              const Icon = item.icon;
              const showIcon = shouldShowIcon(sectionName);

              return (
                <LazyComponent
                  key={item.name}
                  animation="fadeIn"
                  delay={300 + index * 100}
                >
                  <motion.button
                    onClick={() => handleNavClick(sectionName)}
                    className={`
                      relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                      group overflow-hidden min-w-[100px] flex items-center justify-center
                      ${
                        isActive
                          ? "text-cyan-400"
                          : "text-gray-300 hover:text-white"
                      }
                      focus:outline-none
                    `}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className={`
                        absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/10 to-blue-400/5 border border-cyan-400/20
                        ${isActive ? "opacity-100" : "opacity-0"}
                      `}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    <span className="relative z-10 font-semibold tracking-wide flex items-center gap-2 justify-center w-full">
                      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                        <AnimatePresence mode="wait">
                          {showIcon && (
                            <motion.div
                              key={`icon-${sectionName}`}
                              initial={{
                                scale: 0,
                                rotate: -180,
                                opacity: 0,
                              }}
                              animate={{
                                scale: isActive ? 1.2 : 1,
                                rotate: isActive ? 5 : 0,
                                opacity: 1,
                              }}
                              exit={{
                                scale: 0,
                                rotate: 180,
                                opacity: 0,
                              }}
                              transition={{
                                duration: 0.4,
                                ease: "backOut",
                                scale: { duration: 0.3 },
                                rotate: { duration: 0.5 },
                              }}
                              className="flex-shrink-0"
                            >
                              <Icon className="w-4 h-4" />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {!showIcon && (
                          <div className="w-4 h-4 opacity-0">
                            <Icon className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      <span className="flex-shrink-0">{item.name}</span>
                    </span>

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX: isActive ? 1 : 0,
                        opacity: isActive ? 1 : 0.8,
                      }}
                      whileHover={{ scaleX: 1 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.4, 0, 0.2, 1],
                        scaleX: { duration: 0.3 },
                      }}
                    />

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-lg"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.button>
                </LazyComponent>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <LazyComponent animation="fadeIn" delay={800}>
            <motion.div
              className="hidden lg:flex items-center gap-2 relative"
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
            >
              <AnimatedActionButton
                title={
                  isDownloading || isPreviewing
                    ? "PROCESSANDO..."
                    : "VISUALIZAR CV"
                }
                subtitle={
                  isDownloading || isPreviewing
                    ? `${progress}%`
                    : "ABRIR PREVIEW"
                }
                icon={Eye}
                size="sm"
                onClick={handlePreviewCV}
                loading={isDownloading || isPreviewing}
                progress={progress}
                disabled={isDownloading || isPreviewing}
                className="hover:scale-105 transition-transform duration-200"
                showArrow={false}
              />

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    className="absolute top-full mt-2 right-0 p-3 bg-red-500/10 border border-red-500/20 rounded-lg backdrop-blur-sm z-50"
                  >
                    <p className="text-red-400 text-sm">{error}</p>
                    <button
                      onClick={() => resetError()}
                      className="text-red-300 text-xs hover:text-white mt-1"
                    >
                      Fechar
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </LazyComponent>

          {/* Mobile Menu Button */}
          <LazyComponent animation="fadeIn" delay={500}>
            <motion.div
              className="flex lg:hidden items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <AnimatedActionButton
                title="CV"
                subtitle="PDF"
                icon={Download}
                size="sm"
                onClick={handlePreviewCV}
                loading={isDownloading || isPreviewing}
                progress={progress}
                disabled={isDownloading || isPreviewing}
                className="hover:scale-105"
                showArrow={false}
              />

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-10 h-10 rounded-xl text-white/80 hover:text-white bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
                >
                  <motion.div
                    animate={{
                      rotate: isMobileMenuOpen ? 180 : 0,
                      scale: isMobileMenuOpen ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-4 h-4" />
                    ) : (
                      <Menu className="w-4 h-4" />
                    )}
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          </LazyComponent>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4 }}
              className="absolute top-full left-0 right-0 bg-gray-950/98 backdrop-blur-xl border-b border-cyan-800/20 lg:hidden overflow-hidden"
              style={{
                background: `rgba(15, 23, 42, 0.98)`,
                backdropFilter: "blur(20px) saturate(180%)",
              }}
            >
              <nav className="p-4 space-y-2">
                {NAV_ITEMS.map((item, index) => {
                  const sectionName = item.href.replace("#", "");
                  const isActive = activeSection === sectionName;
                  const Icon = item.icon;
                  const showIcon = shouldShowIcon(sectionName);

                  return (
                    <LazyComponent
                      key={item.name}
                      animation="fadeIn"
                      delay={index * 80}
                    >
                      <motion.button
                        onClick={() => handleNavClick(sectionName)}
                        className={`
                          w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 border relative overflow-hidden
                          ${
                            isActive
                              ? "text-cyan-400 bg-gradient-to-r from-cyan-400/10 to-blue-400/5 border-cyan-400/20"
                              : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-white/5 hover:to-cyan-400/5 border-transparent"
                          }
                          focus:outline-none
                        `}
                        initial={{ x: -30, opacity: 0, scale: 0.9 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        whileHover={{ x: 8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className={`
                            absolute left-3 w-1 h-6 rounded-full bg-gradient-to-b from-cyan-400 to-blue-400
                            ${isActive ? "opacity-100" : "opacity-0"}
                          `}
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{
                            scaleX: isActive ? 1 : 0,
                            opacity: isActive ? 1 : 0,
                          }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        />

                        <span className="relative z-10 font-semibold ml-6 flex items-center gap-3">
                          <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                            <AnimatePresence mode="wait">
                              {showIcon && (
                                <motion.div
                                  key={`mobile-icon-${sectionName}`}
                                  initial={{
                                    scale: 0,
                                    rotate: -180,
                                    opacity: 0,
                                  }}
                                  animate={{
                                    scale: isActive ? 1.2 : 1,
                                    rotate: isActive ? 5 : 0,
                                    opacity: 1,
                                  }}
                                  exit={{
                                    scale: 0,
                                    rotate: 180,
                                    opacity: 0,
                                  }}
                                  transition={{
                                    duration: 0.4,
                                    ease: "backOut",
                                    scale: { duration: 0.3 },
                                    rotate: { duration: 0.5 },
                                  }}
                                  className="flex-shrink-0"
                                >
                                  <Icon className="w-4 h-4" />
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {!showIcon && (
                              <div className="w-4 h-4 opacity-0">
                                <Icon className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                          {item.name}
                        </span>

                        {isActive && (
                          <motion.div
                            className="w-2 h-2 bg-cyan-400 rounded-full"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              delay: 0.3,
                              type: "spring",
                              stiffness: 200,
                            }}
                          />
                        )}
                      </motion.button>
                    </LazyComponent>
                  );
                })}

                <LazyComponent animation="fadeIn" delay={500}>
                  <motion.div
                    className="pt-4 border-t border-gray-700/30"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <AnimatedActionButton
                        title="VISUALIZAR"
                        subtitle="VER PDF"
                        icon={Eye}
                        size="sm"
                        onClick={handlePreviewCV}
                        loading={isPreviewing}
                        progress={progress}
                        disabled={isPreviewing}
                        className="w-full justify-center hover:scale-105"
                        showArrow={false}
                      />
                      <AnimatedActionButton
                        title="BAIXAR"
                        subtitle="PDF"
                        icon={Download}
                        size="sm"
                        onClick={handleDownloadCV}
                        loading={isDownloading}
                        progress={progress}
                        disabled={isDownloading}
                        className="w-full justify-center hover:scale-105"
                        showArrow={false}
                      />
                    </div>
                  </motion.div>
                </LazyComponent>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Modal de Visualização do PDF */}
      <PDFModal
        isOpen={isModalOpen}
        onClose={closeModal}
        pdfUrl={pdfUrl}
        onDownload={handleModalDownload}
        isLoading={isPreviewing && !pdfUrl}
        isGenerating={isPreviewing}
        progress={progress}
      />
    </>
  );
};

export default Header;
