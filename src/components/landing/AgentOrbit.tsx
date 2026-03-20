"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const AGENTS = [
  {
    name: "ARIA",
    role: "Ventas",
    initial: "A",
    color: "#9B30FF",
    glow: "rgba(155,48,255,0.7)",
    img: "/images/avatar1.png-removebg-preview.png",
    angleDeg: 0,
  },
  {
    name: "NEX",
    role: "Soporte",
    initial: "N",
    color: "#00C4FF",
    glow: "rgba(0,196,255,0.7)",
    img: "/images/avatar2.png-removebg-preview.png",
    angleDeg: 72,
  },
  {
    name: "LUMA",
    role: "Marketing",
    initial: "L",
    color: "#00CC6A",
    glow: "rgba(0,204,106,0.7)",
    img: "/images/avatar3.png-removebg-preview.png",
    angleDeg: 144,
  },
  {
    name: "SAGE",
    role: "Análisis",
    initial: "S",
    color: "#007AFF",
    glow: "rgba(0,122,255,0.7)",
    img: "/images/avatar4.png-removebg-preview.png",
    angleDeg: 216,
  },
  {
    name: "CORE",
    role: "Operaciones",
    initial: "C",
    color: "#FF6B35",
    glow: "rgba(255,107,53,0.7)",
    img: "/images/avatar5.png-removebg-preview.png",
    angleDeg: 288,
  },
];

export default function AgentOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const angleRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const orbits = container.querySelectorAll<HTMLDivElement>("[data-orbit]");
    const RADIUS = window.innerWidth < 768 ? 100 : 155;
    const SPEED = 0.003; // radians per frame

    const animate = () => {
      angleRef.current += SPEED;
      orbits.forEach((el, i) => {
        const baseAngle = AGENTS[i].angleDeg * (Math.PI / 180);
        const angle = baseAngle + angleRef.current;
        const x = Math.cos(angle) * RADIUS;
        // Slight elliptical y-axis for 3D depth illusion
        const y = Math.sin(angle) * RADIUS * 0.38;
        const depth = Math.sin(angle); // -1 to 1
        const scale = 0.75 + (depth + 1) * 0.175; // 0.75 – 1.1
        const zIndex = Math.round(50 + depth * 40);
        const opacity = 0.65 + (depth + 1) * 0.175; // 0.65 – 1

        el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        el.style.zIndex = String(zIndex);
        el.style.opacity = String(opacity);
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 380, height: 380 }}
    >
      {/* Orbit rings */}
      <div
        className="absolute rounded-full"
        style={{
          width: 320,
          height: 125,
          border: "1px solid rgba(155,48,255,0.12)",
          transform: "rotateX(70deg)",
          boxShadow: "0 0 30px rgba(155,48,255,0.06)",
        }}
        aria-hidden
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 350,
          height: 138,
          border: "1px dashed rgba(0,196,255,0.07)",
          transform: "rotateX(70deg)",
        }}
        aria-hidden
      />

      {/* Central core glow */}
      <motion.div
        className="absolute w-28 h-28 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(155,48,255,0.25) 0%, rgba(0,196,255,0.12) 50%, transparent 70%)",
          boxShadow: "0 0 40px rgba(155,48,255,0.3), 0 0 80px rgba(0,196,255,0.15)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Central logo */}
      <motion.div
        className="absolute w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-black z-50"
        style={{
          background: "linear-gradient(135deg, #9B30FF, #00C4FF)",
          boxShadow: "0 0 30px rgba(155,48,255,0.5), 0 0 60px rgba(0,196,255,0.3)",
          fontFamily: "var(--font-syne, sans-serif)",
        }}
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        N
      </motion.div>

      {/* Orbiting agents */}
      <div ref={containerRef} className="absolute inset-0 flex items-center justify-center">
        {AGENTS.map((agent, i) => (
          <div
            key={agent.name}
            data-orbit={i}
            className="absolute transition-none"
            style={{ willChange: "transform, opacity" }}
          >
            <div
              className="relative group"
              style={{ width: 56, height: 56 }}
            >
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${agent.glow} 0%, transparent 65%)`,
                  filter: "blur(8px)",
                  transform: "scale(1.6)",
                }}
              />
              {/* Orb */}
              <div
                className="relative w-full h-full rounded-full flex items-center justify-center text-white text-sm font-black border border-white/20 overflow-hidden"
                style={{
                  background: `radial-gradient(circle at 35% 35%, ${agent.color}cc, ${agent.color}55)`,
                  boxShadow: `0 0 16px ${agent.glow}, 0 0 32px ${agent.color}44`,
                }}
              >
                {/* Avatar image or initial */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={agent.img}
                  alt={agent.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const next = e.currentTarget.nextElementSibling as HTMLElement;
                    if (next) next.style.display = "flex";
                  }}
                />
                <span
                  className="absolute inset-0 items-center justify-center text-lg font-black hidden"
                  aria-hidden
                >
                  {agent.initial}
                </span>
              </div>

              {/* Tooltip label */}
              <div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ color: agent.color, textShadow: `0 0 8px ${agent.color}` }}
              >
                {agent.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
