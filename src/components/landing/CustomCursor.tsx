"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Spring-based lagging ring
  const springConfig = { damping: 22, stiffness: 180, mass: 0.5 };
  const ringX = useSpring(-100, springConfig);
  const ringY = useSpring(-100, springConfig);

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setIsHovering(!!el.closest("a, button, [role='button'], [data-hover]"));
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [ringX, ringY, isVisible]);

  const dotSize = isClicking ? 4 : 6;
  const ringSize = isHovering ? 52 : isClicking ? 24 : 36;

  return (
    <>
      {/* Dot — instant tracking */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: dotSize,
          height: dotSize,
          x: pos.x - dotSize / 2,
          y: pos.y - dotSize / 2,
          background: "#00C4FF",
          boxShadow: "0 0 10px rgba(0,196,255,0.9), 0 0 20px rgba(0,196,255,0.5)",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Ring — lagged spring tracking */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          width: ringSize,
          height: ringSize,
          x: ringX,
          y: ringY,
          translateX: -(ringSize / 2),
          translateY: -(ringSize / 2),
          border: isHovering
            ? "1.5px solid rgba(155,48,255,0.9)"
            : "1.5px solid rgba(0,196,255,0.5)",
          boxShadow: isHovering
            ? "0 0 16px rgba(155,48,255,0.3), inset 0 0 16px rgba(155,48,255,0.05)"
            : "0 0 8px rgba(0,196,255,0.2)",
          opacity: isVisible ? 1 : 0,
          background: isHovering ? "rgba(155,48,255,0.06)" : "transparent",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          translateX: -(ringSize / 2),
          translateY: -(ringSize / 2),
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </>
  );
}
