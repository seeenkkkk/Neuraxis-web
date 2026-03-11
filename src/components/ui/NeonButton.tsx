"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

const VARIANTS = {
  primary: {
    base: "bg-gradient-to-r from-[#007AFF] to-[#9B30FF] text-white border-transparent",
    hover: "hover:shadow-[0_0_20px_rgba(0,122,255,0.45)]",
    glow: "rgba(0,122,255,0.35)",
  },
  secondary: {
    base: "bg-transparent text-[--neon-blue] border-[--border-neon]",
    hover: "hover:bg-[rgba(0,122,255,0.07)] hover:border-[--neon-blue]",
    glow: "rgba(0,122,255,0.20)",
  },
  ghost: {
    base: "bg-transparent text-[--text-secondary] border-[--border-subtle]",
    hover: "hover:text-[--text-primary] hover:border-[--border-card]",
    glow: "rgba(0,0,0,0.04)",
  },
  danger: {
    base: "bg-transparent text-[--neon-red] border-[rgba(239,68,68,0.3)]",
    hover: "hover:bg-[rgba(239,68,68,0.07)]",
    glow: "rgba(239,68,68,0.20)",
  },
};

const SIZES = {
  sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
  md: "px-4 py-2 text-sm rounded-xl gap-2",
  lg: "px-6 py-3 text-base rounded-xl gap-2.5",
};

export default function NeonButton({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  children,
  className = "",
  disabled,
  ...props
}: NeonButtonProps) {
  const v = VARIANTS[variant];
  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileHover={isDisabled ? {} : { scale: 1.02 }}
      whileTap={isDisabled ? {} : { scale: 0.97 }}
      className={`
        inline-flex items-center justify-center font-medium border
        transition-all duration-150 cursor-pointer select-none
        ${SIZES[size]} ${v.base} ${v.hover}
        ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      disabled={isDisabled}
      {...(props as object)}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
          {children}
        </span>
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
}
