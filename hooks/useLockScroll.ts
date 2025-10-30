"use client";

import { useEffect } from "react";

type SavedStyles = {
  overflow: string;
  paddingRight: string;
  overscrollBehavior: string;
};

let lockCount = 0;
let savedBodyStyles: SavedStyles | null = null;

function getScrollbarWidth(): number {
  if (typeof window === "undefined") return 0;
  return window.innerWidth - document.documentElement.clientWidth;
}

function applyLock() {
  if (typeof window === "undefined" || !document.body) return;

  if (lockCount === 1) {
    const scrollbarWidth = getScrollbarWidth();

    savedBodyStyles = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
      overscrollBehavior: (document.body.style as any).overscrollBehavior,
    };

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    (document.body.style as any).overscrollBehavior = "none";
  }
}

function restoreStyles() {
  if (!savedBodyStyles || !document.body) return;

  document.body.style.overflow = savedBodyStyles.overflow;
  document.body.style.paddingRight = savedBodyStyles.paddingRight;
  (document.body.style as any).overscrollBehavior =
    savedBodyStyles.overscrollBehavior;
}

function releaseLock() {
  if (typeof window === "undefined") return;

  if (lockCount === 0 && savedBodyStyles) {
    restoreStyles();
    savedBodyStyles = null;
  }
}

export function forceReleaseAll() {
  if (typeof window === "undefined") return;
  lockCount = 0;
  releaseLock();
}

export function useLockScroll(isLocked: boolean) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isLocked) {
      lockCount++;
      applyLock();
    } else {
      lockCount = Math.max(0, lockCount - 1);
      releaseLock();
    }

    return () => {
      if (isLocked) {
        lockCount = Math.max(0, lockCount - 1);
        releaseLock();
      }
    };
  }, [isLocked]);
}

export default useLockScroll;
