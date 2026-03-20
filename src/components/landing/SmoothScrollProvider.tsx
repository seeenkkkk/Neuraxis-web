"use client";

import { useEffect } from "react";

/**
 * SmoothScrollProvider — initializes Lenis if available, otherwise
 * uses native CSS smooth scroll (already set in globals.css).
 * Run: npm install lenis  to enable the full Lenis experience.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let rafId: number;

    const init = async () => {
      try {
        // Dynamic import — works only if lenis is installed
        const LenisModule = await import("lenis");
        const Lenis = LenisModule.default;

        lenis = new Lenis({
          duration: 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          wheelMultiplier: 0.9,
          touchMultiplier: 1.5,
        } as ConstructorParameters<typeof Lenis>[0]);

        const raf = (time: number) => {
          lenis!.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      } catch {
        // Lenis not installed — CSS scroll-behavior:smooth handles it
      }
    };

    init();

    return () => {
      if (lenis) lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <>{children}</>;
}
