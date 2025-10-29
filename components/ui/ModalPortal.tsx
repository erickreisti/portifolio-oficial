"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ModalPortalProps = {
  children: React.ReactNode;
};

/**
 * Renderiza children em document.body para evitar problemas de stacking context /
 * transforms aplicados em ancestrais (isso garante que modais fixed sempre
 * fiquem visíveis e centralizados).
 */
export const ModalPortal = ({ children }: ModalPortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;
  return createPortal(children, document.body);
};

export default ModalPortal;
