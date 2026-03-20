"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return Math.min(p + Math.random() * 20, 100);
      });
    }, 110);

    const hide = setTimeout(() => setShow(false), 2400);
    return () => { clearInterval(interval); clearTimeout(hide); };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#0D0D1A" }}
        >
          {/* Logo image */}
          <motion.img
            src="/images/logo2.png-removebg-preview.png"
            alt="Neuraxis IA"
            className="w-32 h-32 object-contain mb-8"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.35, ease: "easeOut" }}
            className="relative rounded-full overflow-hidden"
            style={{ width: 180, height: "1.5px", background: "rgba(255,255,255,0.07)" }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: "linear-gradient(90deg, #7B2FBE, #00A8D6)",
                width: `${Math.min(progress, 100)}%`,
                transition: "width 0.25s ease-out",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
