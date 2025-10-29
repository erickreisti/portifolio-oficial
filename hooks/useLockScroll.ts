"use client";

/**
 * useLockScroll - lock page scroll by setting overflow/overscroll on html/body.
 *
 * - Uses a global lock counter so multiple callers can request lock independently.
 * - Saves inline styles and restores them when the last lock is released.
 * - Does NOT change position/top or call window.scrollTo, avoiding jumps/flashes.
 *
 * Exports:
 * - useLockScroll(isLocked: boolean)
 * - forceReleaseAll() -> forces a full restore (useful as a safety fallback)
 */

import { useEffect } from "react";

type SavedStyles = {
  overflow?: string;
  overscrollBehavior?: string;
  touchAction?: string;
};

let lockCount = 0;
let savedBodyStyles: SavedStyles | null = null;
let savedHtmlStyles: SavedStyles | null = null;

function applyLock() {
  if (typeof window === "undefined") return;

  if (lockCount === 1) {
    // first lock, save inline styles
    savedBodyStyles = {
      overflow: document.body.style.overflow,
      overscrollBehavior: (document.body.style as any).overscrollBehavior,
      touchAction: (document.body.style as any).touchAction,
    };

    savedHtmlStyles = {
      overflow: document.documentElement.style.overflow,
      overscrollBehavior: (document.documentElement.style as any)
        .overscrollBehavior,
      touchAction: (document.documentElement.style as any).touchAction,
    };

    // apply lock
    try {
      document.body.style.overflow = "hidden";
      (document.body.style as any).overscrollBehavior = "none";
      (document.body.style as any).touchAction = "none";
    } catch {
      // ignore
    }

    try {
      document.documentElement.style.overflow = "hidden";
      (document.documentElement.style as any).overscrollBehavior = "none";
      (document.documentElement.style as any).touchAction = "none";
    } catch {
      // ignore
    }
  }
}

function restoreStylesDirectly() {
  try {
    if (savedBodyStyles) {
      document.body.style.overflow = savedBodyStyles.overflow ?? "";
      (document.body.style as any).overscrollBehavior =
        savedBodyStyles.overscrollBehavior ?? "";
      (document.body.style as any).touchAction =
        savedBodyStyles.touchAction ?? "";
    } else {
      document.body.style.overflow = "";
      (document.body.style as any).overscrollBehavior = "";
      (document.body.style as any).touchAction = "";
    }
  } catch {
    // ignore
  }

  try {
    if (savedHtmlStyles) {
      document.documentElement.style.overflow = savedHtmlStyles.overflow ?? "";
      (document.documentElement.style as any).overscrollBehavior =
        savedHtmlStyles.overscrollBehavior ?? "";
      (document.documentElement.style as any).touchAction =
        savedHtmlStyles.touchAction ?? "";
    } else {
      document.documentElement.style.overflow = "";
      (document.documentElement.style as any).overscrollBehavior = "";
      (document.documentElement.style as any).touchAction = "";
    }
  } catch {
    // ignore
  }
}

function releaseLock() {
  if (typeof window === "undefined") return;

  // Only restore when lockCount is zero (caller should ensure that)
  if (lockCount === 0) {
    // restore inline styles immediately
    restoreStylesDirectly();

    // clear saved
    savedBodyStyles = null;
    savedHtmlStyles = null;
  }
}

/**
 * Forcefully release all locks and restore styles.
 * Use this as a safety fallback if, for some reason, locks remain.
 */
export function forceReleaseAll() {
  if (typeof window === "undefined") return;
  lockCount = 0;
  releaseLock();
}

/**
 * Hook: useLockScroll(isLocked)
 * - When isLocked true: increments global lock and applies lock if first.
 * - When isLocked false (or effect cleans up) -> decrements and possibly restores.
 */
export function useLockScroll(isLocked: boolean) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isLocked) {
      lockCount = Math.max(0, lockCount) + 1;
      applyLock();

      return () => {
        lockCount = Math.max(0, lockCount - 1);
        if (lockCount === 0) {
          releaseLock();
        }
      };
    }

    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLocked]);
}

export default useLockScroll;
