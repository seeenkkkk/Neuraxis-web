"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useWizardStore } from "@/store/wizardStore";

export default function XPToast() {
  const { xpToast, dismissXPToast } = useWizardStore();

  return (
    <AnimatePresence>
      {xpToast.visible && (
        <motion.button
          initial={{ opacity: 0, y: 24, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          onClick={dismissXPToast}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl cursor-pointer select-none"
          style={{
            background: "rgba(13,13,20,0.97)",
            border: "1px solid rgba(255,215,0,0.45)",
            boxShadow:
              "0 0 24px rgba(255,215,0,0.25), 0 0 48px rgba(255,215,0,0.08), 0 4px 24px rgba(0,0,0,0.5)",
          }}
        >
          {/* Hex icon */}
          <motion.div
            animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
              <polygon
                points="7,1 12,3.5 12,10.5 7,13 2,10.5 2,3.5"
                fill="rgba(255,215,0,0.2)"
                stroke="#FFD700"
                strokeWidth="1.2"
              />
              <text
                x="7"
                y="9.5"
                textAnchor="middle"
                fontSize="6"
                fontWeight="bold"
                fill="#FFD700"
              >
                ✦
              </text>
            </svg>
          </motion.div>

          {/* XP amount */}
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="text-base font-black"
            style={{
              color: "#FFD700",
              fontFamily: "var(--font-syne, sans-serif)",
              letterSpacing: "-0.01em",
            }}
          >
            +{xpToast.amount} XP
          </motion.span>

          <div className="flex flex-col leading-tight">
            <span className="text-[11px] font-semibold" style={{ color: "#FFD700" }}>
              Neurax-Points
            </span>
            <span className="text-[9px]" style={{ color: "var(--text-muted)" }}>
              ganados en este paso
            </span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
