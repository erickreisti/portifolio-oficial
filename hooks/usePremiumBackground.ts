"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export const usePremiumBackground = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!backgroundRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        backgroundRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  return backgroundRef;
};
