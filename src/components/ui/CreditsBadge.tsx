"use client";

import { motion } from "framer-motion";

interface CreditsBadgeProps {
  credits: number;
  onClick?: () => void;
  className?: string;
}

export default function CreditsBadge({ credits, onClick, className = "" }: CreditsBadgeProps) {
  const isLow = credits < 100;
  const color = isLow ? "#FFD700" : "#00D4FF";
  const glow = isLow ? "rgba(255,215,0,0.35)" : "rgba(0,212,255,0.35)";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold cursor-pointer select-none ${className}`}
      style={{
        color,
        background: isLow ? "rgba(255,215,0,0.08)" : "rgba(0,212,255,0.08)",
        borderColor: isLow ? "rgba(255,215,0,0.3)" : "rgba(0,212,255,0.25)",
        boxShadow: `0 0 10px ${glow}`,
      }}
    >
      {/* Hex coin icon */}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <polygon
          points="7,1 12,4 12,10 7,13 2,10 2,4"
          fill={color}
          fillOpacity="0.2"
          stroke={color}
          strokeWidth="1"
        />
        <text x="7" y="9.5" textAnchor="middle" fontSize="5" fontWeight="bold" fill={color}>N</text>
      </svg>
      {credits.toLocaleString()}
      {isLow && (
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="text-[10px]"
        >
          ⚠
        </motion.span>
      )}
    </motion.button>
  );
}
