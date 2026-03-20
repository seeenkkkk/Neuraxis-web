"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate load progress
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 18;
      });
    }, 120);

    const hide = setTimeout(() => setShow(false), 2600);
    return () => {
      clearInterval(interval);
      clearTimeout(hide);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "#0D0D1A" }}
        >
          {/* Aurora blobs */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(155,48,255,0.18) 0%, transparent 65%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(0,196,255,0.15) 0%, transparent 65%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Rotating ring */}
          <motion.div
            className="absolute w-48 h-48 rounded-full"
            style={{
              border: "1px solid rgba(155,48,255,0.25)",
              boxShadow: "0 0 40px rgba(155,48,255,0.1)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-72 h-72 rounded-full"
            style={{
              border: "1px dashed rgba(0,196,255,0.15)",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo block */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6 relative"
              style={{
                background: "linear-gradient(135deg, #9B30FF, #00C4FF)",
                boxShadow: "0 0 60px rgba(155,48,255,0.5), 0 0 100px rgba(0,196,255,0.3)",
              }}
            >
              <span
                className="text-white text-4xl font-black"
                style={{ fontFamily: "var(--font-syne, sans-serif)" }}
              >
                N
              </span>
              {/* Scan line */}
              <motion.div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                aria-hidden
              >
                <motion.div
                  className="absolute left-0 right-0 h-[2px]"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)" }}
                  initial={{ top: "-10%" }}
                  animate={{ top: "110%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                />
              </motion.div>
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="text-center mb-8"
            >
              <p
                className="text-white text-xl font-black tracking-[0.15em] uppercase mb-1"
                style={{ fontFamily: "var(--font-syne, sans-serif)" }}
              >
                NEURAXIS{" "}
                <span style={{ color: "#00C4FF" }}>IA</span>
              </p>
              <p className="text-white/30 text-xs tracking-[0.4em] uppercase">
                Iniciando plataforma...
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 200 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="relative h-[2px] rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: "linear-gradient(90deg, #9B30FF, #00C4FF, #00CC6A)" }}
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.div>

            {/* Percentage */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-3 text-xs text-white/20 tabular-nums"
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
