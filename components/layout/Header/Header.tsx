"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Header.module.css";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["hero", "about", "skills", "projects", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className={`${styles.header} ${
        isScrolled ? styles.headerScrolled : styles.headerTransparent
      }`}
    >
      <div className={styles.headerBackground}>
        <div className={styles.headerGradient} />
        <div className={styles.headerLightEffect} />
        {/* ELEMENTOS ORB ADICIONADOS */}
        <div className={styles.headerOrb1} />
        <div className={styles.headerOrb2} />
        <div className={styles.headerOrb3} />
      </div>

      <div className={styles.container}>
        <div className={styles.headerContent}>
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection("hero")}
            className={styles.logoButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <div className={styles.logoContainer}>
              <motion.div
                className={styles.logoWrapper}
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/images/hashblue.svg"
                  alt="Erick Reis Logo"
                  width={56}
                  height={56}
                  className={styles.logoImage}
                  priority
                />
              </motion.div>
              <div className={styles.logoText}>
                <span className={styles.logoName}>Érick Reis</span>
                <span className={styles.logoTitle}>
                  <Sparkles className={styles.titleIcon} />
                  FULLSTACK
                </span>
              </div>
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {navItems.map((item, index) => {
              const sectionName = item.href.replace("#", "");
              const isActive = activeSection === sectionName;

              return (
                <motion.button
                  key={item.name}
                  custom={index}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={() => scrollToSection(sectionName)}
                  className={`${styles.navLink} ${
                    isActive ? styles.navLinkActive : styles.navLinkInactive
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <span className={styles.navText}>
                    {item.name.toUpperCase()}
                  </span>
                  {isActive && (
                    <motion.div
                      className={styles.navIndicator}
                      layoutId="navIndicator"
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <motion.div
            className={styles.desktopActions}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button asChild className={styles.downloadButton}>
              <a
                href="/docs/curriculo-erick-reis.pdf"
                download
                onMouseDown={(e) => e.preventDefault()}
              >
                <Download className={styles.downloadIcon} />
                <span className={styles.downloadText}>DOWNLOAD CV</span>
                <div className={styles.buttonGlow} />
              </a>
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className={styles.mobileActions}>
            <Button asChild size="sm" className={styles.mobileDownloadButton}>
              <a
                href="/docs/curriculo-erick-reis.pdf"
                download
                onMouseDown={(e) => e.preventDefault()}
              >
                <Download className={styles.mobileDownloadIcon} />
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className={styles.menuButton}
              onMouseDown={(e) => e.preventDefault()}
            >
              {isOpen ? (
                <X className={styles.menuIcon} />
              ) : (
                <Menu className={styles.menuIcon} />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={styles.mobileMenu}
            >
              <div className={styles.mobileMenuBackground} />
              <nav className={styles.mobileNav}>
                {navItems.map((item, index) => {
                  const sectionName = item.href.replace("#", "");
                  const isActive = activeSection === sectionName;

                  return (
                    <motion.button
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => scrollToSection(sectionName)}
                      className={`${styles.mobileNavLink} ${
                        isActive
                          ? styles.mobileNavLinkActive
                          : styles.mobileNavLinkInactive
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ x: 0 }}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <span className={styles.mobileNavText}>
                        {item.name.toUpperCase()}
                      </span>
                      {isActive && (
                        <div className={styles.mobileNavIndicator} />
                      )}
                    </motion.button>
                  );
                })}

                <motion.div
                  className={styles.mobileDownloadSection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    asChild
                    className={styles.mobileMenuDownloadButton}
                    onClick={() => setIsOpen(false)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <a
                      href="/docs/curriculo-erick-reis.pdf"
                      download
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <Download className={styles.mobileMenuDownloadIcon} />
                      <span className={styles.mobileMenuDownloadText}>
                        DOWNLOAD CV
                      </span>
                    </a>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
