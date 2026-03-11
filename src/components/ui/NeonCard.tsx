"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import React from "react";

interface NeonCardProps {
  children: ReactNode;
  variant?: "default" | "blue" | "purple" | "elevated";
  hover?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const VARIANTS = {
  default: "bg-[--bg-card] border border-[--border-card]",
  blue: "bg-[--bg-card] border border-[--border-neon] shadow-[var(--glow-blue)]",
  purple: "bg-[--bg-card] border border-[--border-purple] shadow-[var(--glow-purple)]",
  elevated: "bg-[--bg-elevated] border border-[--border-card]",
};

export default function NeonCard({
  children,
  variant = "default",
  hover = false,
  className = "",
  style,
  onClick,
}: NeonCardProps) {
  const isClickable = !!onClick;

  return (
    <motion.div
      whileHover={hover || isClickable ? { y: -2, scale: 1.005 } : {}}
      onClick={onClick}
      className={`
        rounded-xl overflow-hidden
        ${VARIANTS[variant]}
        ${isClickable ? "cursor-pointer" : ""}
        ${hover ? "transition-shadow duration-200 hover:shadow-[0_0_24px_rgba(0,122,255,0.15)]" : ""}
        ${className}
      `}
      style={style}
    >
      {children}
    </motion.div>
  );
}
