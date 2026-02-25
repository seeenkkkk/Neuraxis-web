"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Agentes", href: "#agentes" },
  { label: "Builder", href: "#builder" },
  { label: "Academy", href: "#academy" },
  { label: "Planes", href: "#planes" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-white-strong shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center text-white text-xs font-black">
            N
          </span>
          <span className="text-lg font-bold text-text-primary tracking-tight">
            NEURAXIS <span className="gradient-neon-text">IA</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="hover:text-text-primary transition-colors duration-200 hover:gradient-neon-text"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#planes"
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            Iniciar sesión
          </a>
          <a
            href="#planes"
            className="text-sm font-semibold px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-neon-purple"
          >
            Empieza gratis
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          aria-label="Menu"
        >
          <span className={`w-5 h-0.5 bg-text-primary transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-5 h-0.5 bg-text-primary transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`w-5 h-0.5 bg-text-primary transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-white-strong border-t border-white/80 px-6 py-4 flex flex-col gap-4"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-text-secondary hover:text-text-primary"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#planes"
            className="text-sm font-semibold px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan text-white text-center"
          >
            Empieza gratis
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
