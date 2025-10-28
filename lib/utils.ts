import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility functions for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// SEO helpers
export function generateMetaDescription(
  text: string,
  maxLength: number = 160
): string {
  return text.length > maxLength
    ? text.substring(0, maxLength - 3) + "..."
    : text;
}

// Performance metrics
export function measurePerformance<T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T {
  return ((...args: Parameters<T>) => {
    if (process.env.NODE_ENV === "development") {
      const start = performance.now();
      const result = fn(...args);
      const end = performance.now();
      console.log(`${name} took ${end - start} milliseconds`);
      return result;
    }
    return fn(...args);
  }) as T;
}

// Additional utility functions
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

// Date utilities
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function getRelativeTimeString(date: Date): string {
  // Correção: usar RelativeTimeFormat em vez de RelativeTimeFormatter
  const rtf = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });
  const now = new Date();
  const diffInMs = date.getTime() - now.getTime();
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  if (Math.abs(diffInDays) < 1) {
    const diffInHours = Math.round(diffInMs / (1000 * 60 * 60));
    return rtf.format(diffInHours, "hour");
  } else if (Math.abs(diffInDays) < 30) {
    return rtf.format(diffInDays, "day");
  } else if (Math.abs(diffInDays) < 365) {
    const diffInMonths = Math.round(diffInDays / 30);
    return rtf.format(diffInMonths, "month");
  } else {
    const diffInYears = Math.round(diffInDays / 365);
    return rtf.format(diffInYears, "year");
  }
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Array utilities
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function uniqueArray<T>(array: T[]): T[] {
  return [...new Set(array)];
}

// Number utilities
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("pt-BR").format(num);
}

export function formatCurrency(
  amount: number,
  currency: string = "BRL"
): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
  }).format(amount);
}

// Local storage utilities with error handling
export function getLocalStorage(key: string): string | null {
  try {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  } catch {
    return null;
  }
}

export function setLocalStorage(key: string, value: string): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  } catch {
    // Silently fail in case of storage issues
  }
}

// Cookie utilities
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export function setCookie(
  name: string,
  value: string,
  days: number = 365
): void {
  if (typeof document === "undefined") return;

  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`;
}

// Device detection
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;

  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

// Animation helpers
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Color utilities
export function hexToRgb(
  hex: string
): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function getContrastColor(hexColor: string): "black" | "white" {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return "black";

  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5 ? "black" : "white";
}

// String utilities
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// URL utilities
export function getQueryParam(param: string): string | null {
  if (typeof window === "undefined") return null;

  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

export function updateQueryParam(param: string, value: string): void {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  url.searchParams.set(param, value);
  window.history.replaceState({}, "", url.toString());
}

// Time utilities
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}
