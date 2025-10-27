// components/layout/Header/Header.tsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      setIsScrolled(window.scrollY > 50);

      // Atualizar seção ativa
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
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsOpen(false);
  };

  return (
    <header
      className={`${styles.header} ${
        isScrolled ? styles.headerScrolled : styles.headerTransparent
      }`}
    >
      <div className={styles.container}>
        <div className={styles.headerContent}>
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className={styles.logoButton}
          >
            <div className={styles.logoContainer}>
              <div className={styles.logoWrapper}>
                <Image
                  src="/images/hashblue.svg"
                  alt="Erick Reis Logo"
                  width={56}
                  height={56}
                  className={styles.logoImage}
                  priority
                />
              </div>
              <div className={styles.logoText}>
                <span className={styles.logoName}>Érick Reis</span>
                <span className={styles.logoTitle}>FULLSTACK DEV</span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {navItems.map((item) => {
              const sectionName = item.href.replace("#", "");
              const isActive = activeSection === sectionName;

              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(sectionName)}
                  className={`${styles.navLink} ${
                    isActive ? styles.navLinkActive : styles.navLinkInactive
                  }`}
                >
                  {item.name.toUpperCase()}
                  {isActive && <div className={styles.navIndicator} />}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className={styles.desktopActions}>
            <Button asChild className={styles.downloadButton}>
              <a href="/docs/curriculo-erick-reis.pdf" download>
                <Download className={styles.downloadIcon} />
                <span className={styles.downloadText}>DOWNLOAD CV</span>
                <div className={styles.buttonGlow} />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className={styles.mobileActions}>
            <Button asChild size="sm" className={styles.mobileDownloadButton}>
              <a href="/docs/curriculo-erick-reis.pdf" download>
                <Download className={styles.mobileDownloadIcon} />
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className={styles.menuButton}
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
        {isOpen && (
          <div className={styles.mobileMenu}>
            <nav className={styles.mobileNav}>
              {navItems.map((item) => {
                const sectionName = item.href.replace("#", "");
                const isActive = activeSection === sectionName;

                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(sectionName)}
                    className={`${styles.mobileNavLink} ${
                      isActive
                        ? styles.mobileNavLinkActive
                        : styles.mobileNavLinkInactive
                    }`}
                  >
                    <span className={styles.mobileNavText}>
                      {item.name.toUpperCase()}
                    </span>
                    {isActive && <div className={styles.mobileNavIndicator} />}
                  </button>
                );
              })}

              {/* Botão Download no mobile menu */}
              <div className={styles.mobileDownloadSection}>
                <Button
                  asChild
                  className={styles.mobileMenuDownloadButton}
                  onClick={() => setIsOpen(false)}
                >
                  <a href="/docs/curriculo-erick-reis.pdf" download>
                    <Download className={styles.mobileMenuDownloadIcon} />
                    <span className={styles.mobileMenuDownloadText}>
                      DOWNLOAD CV COMPLETO
                    </span>
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
