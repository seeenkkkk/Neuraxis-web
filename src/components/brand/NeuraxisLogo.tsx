"use client";

import { motion } from "framer-motion";

interface NeuraxisLogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  textOnly?: boolean;
  iconOnly?: boolean;
  className?: string;
}

const SIZES = { sm: 24, md: 32, lg: 48 };
const TEXT_SIZES = { sm: "text-sm", md: "text-base", lg: "text-xl" };

export default function NeuraxisLogo({
  size = "md",
  animated = true,
  textOnly = false,
  iconOnly = false,
  className = "",
}: NeuraxisLogoProps) {
  const s = SIZES[size];

  const Hex = () => (
    <motion.div
      animate={animated ? { filter: ["drop-shadow(0 0 4px #007AFF)", "drop-shadow(0 0 10px #7B2FFF)", "drop-shadow(0 0 4px #007AFF)"] } : {}}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="flex-shrink-0"
    >
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <defs>
          <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00AAFF"/>
            <stop offset="100%" stopColor="#7C3AED"/>
          </linearGradient>
        </defs>
        <polygon points="16,2 28,9 28,23 16,30 4,23 4,9"
          fill="url(#lg1)" fillOpacity="0.15"/>
        <polygon points="16,2 28,9 28,23 16,30 4,23 4,9"
          fill="none" stroke="url(#lg1)" strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="3" fill="#00C4FF"/>
        <line x1="16" y1="4" x2="16" y2="13" stroke="#00C4FF" strokeWidth="0.9"/>
        <line x1="27" y1="10" x2="19" y2="15" stroke="#9B30FF" strokeWidth="0.9"/>
        <line x1="27" y1="22" x2="19" y2="17" stroke="#00C4FF" strokeWidth="0.9"/>
        <line x1="16" y1="28" x2="16" y2="19" stroke="#9B30FF" strokeWidth="0.9"/>
        <line x1="5" y1="22" x2="13" y2="17" stroke="#00C4FF" strokeWidth="0.9"/>
        <line x1="5" y1="10" x2="13" y2="15" stroke="#9B30FF" strokeWidth="0.9"/>
      </svg>
    </motion.div>
  );

  if (iconOnly) return <Hex />;

  if (textOnly) {
    return (
      <span className={`font-bold tracking-tight ${TEXT_SIZES[size]}`}
        style={{ fontFamily: "var(--font-syne, sans-serif)" }}>
        <span style={{ color: "var(--text-primary)" }}>NEURAXIS</span>{" "}
        <span style={{ color: "var(--neon-cyan)", textShadow: "0 0 8px rgba(0,196,255,0.6)" }}>IA</span>
      </span>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Hex />
      <span className={`font-extrabold tracking-tight ${TEXT_SIZES[size]}`}
        style={{ fontFamily: "var(--font-syne, sans-serif)" }}>
        <span style={{ color: "var(--text-primary)" }}>NEURAXIS</span>{" "}
        <span style={{ color: "var(--neon-cyan)", textShadow: "0 0 8px rgba(0,196,255,0.6)" }}>IA</span>
      </span>
    </div>
  );
}
