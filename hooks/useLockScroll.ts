"use client";

import { useEffect } from "react";

type SavedStyles = {
  overflow?: string;
  overscrollBehavior?: string;
};

let lockCount = 0;
let savedBodyStyles: SavedStyles | null = null;
let savedHtmlStyles: SavedStyles | null = null;

function applyLock() {
  if (typeof window === "undefined") return;

  if (lockCount === 1) {
    savedBodyStyles = {
      overflow: document.body.style.overflow,
      overscrollBehavior: (document.body.style as any).overscrollBehavior,
    };

    savedHtmlStyles = {
      overflow: document.documentElement.style.overflow,
      overscrollBehavior: (document.documentElement.style as any)
        .overscrollBehavior,
    };

    try {
      document.body.style.overflow = "hidden";
      (document.body.style as any).overscrollBehavior = "none";
    } catch {}

    try {
      document.documentElement.style.overflow = "hidden";
      (document.documentElement.style as any).overscrollBehavior = "none";
    } catch {}
  }
}

function restoreStyles() {
  try {
    if (savedBodyStyles) {
      document.body.style.overflow = savedBodyStyles.overflow || "";
      (document.body.style as any).overscrollBehavior =
        savedBodyStyles.overscrollBehavior || "";
    } else {
      document.body.style.overflow = "";
      (document.body.style as any).overscrollBehavior = "";
    }
  } catch {}

  try {
    if (savedHtmlStyles) {
      document.documentElement.style.overflow = savedHtmlStyles.overflow || "";
      (document.documentElement.style as any).overscrollBehavior =
        savedHtmlStyles.overscrollBehavior || "";
    } else {
      document.documentElement.style.overflow = "";
      (document.documentElement.style as any).overscrollBehavior = "";
    }
  } catch {}
}

function releaseLock() {
  if (typeof window === "undefined") return;

  if (lockCount === 0) {
    restoreStyles();
    savedBodyStyles = null;
    savedHtmlStyles = null;
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
