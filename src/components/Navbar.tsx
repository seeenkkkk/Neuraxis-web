"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold gradient-text-purple-cyan tracking-tight">
          NEURAXIS IA
        </span>

        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#planes" className="hover:text-white transition-colors">
            Planes
          </a>
          <a href="#como-funciona" className="hover:text-white transition-colors">
            Cómo funciona
          </a>
          <a href="#para-quien" className="hover:text-white transition-colors">
            Para quién
          </a>
          <a href="#contacto" className="hover:text-white transition-colors">
            Contacto
          </a>
        </div>

        <a
          href="#planes"
          className="text-sm font-semibold px-5 py-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90 transition-opacity"
        >
          Empieza gratis
        </a>
      </div>
    </motion.nav>
  );
}
