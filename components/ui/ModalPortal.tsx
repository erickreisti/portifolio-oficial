"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLockScroll } from "@/hooks/useLockScroll";

type ModalPortalProps = {
  children: React.ReactNode;
  isOpen?: boolean;
};

export const ModalPortal = ({ children, isOpen = true }: ModalPortalProps) => {
  const [mounted, setMounted] = useState(false);

  useLockScroll(isOpen);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Prevenir SSR issues
  if (!mounted) return null;

  return createPortal(
    <div role="dialog" aria-modal="true">
      {children}
    </div>,
    document.body
  );
};

export default ModalPortal;
