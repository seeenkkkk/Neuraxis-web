"use client";

import { motion } from "framer-motion";
import { CONTACT_HREF } from "../../lib/contact";

const BRAND_GRADIENT = "linear-gradient(135deg, #7B2FBE 0%, #00A8D6 100%)";

const SERVICES = [
  { icon: "🌐", label: "Páginas web", color: "#7B2FBE" },
  { icon: "⚙️", label: "Automatización", color: "#00A8D6" },
  { icon: "🎬", label: "Contenido con IA", color: "#00CC6A" },
];

const POINTS = ["Presupuesto sin compromiso", "Todo a medida", "Un único equipo"];

export default function HeroNew() {
  return (
    <section
      id="hero-content"
      style={{ background: "#FFFFFF" }}
      className="flex items-center px-6 pt-28 pb-16 lg:min-h-screen lg:py-24"
    >
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-5 gap-10 lg:gap-12 items-center">
        {/* Texto */}
        <div className="lg:col-span-3 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: "rgba(0,168,214,0.08)", color: "#0087AD", border: "1px solid rgba(0,168,214,0.2)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#00CC6A" }} />
            Agencia de IA para empresas
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2.5rem] sm:text-5xl lg:text-6xl font-black leading-[1.06] mb-6"
            style={{ fontFamily: "var(--font-syne, sans-serif)", color: "#1a1a2e" }}
          >
            Tu web, tus redes y tu día a día,{" "}
            <span
              style={{
                background: BRAND_GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              funcionando con IA.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
            style={{ color: "#4a4a6a" }}
          >
            Creamos tu página web, automatizamos las tareas que te quitan tiempo y producimos el
            contenido de tus redes. Tú te ocupas de tus clientes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8"
          >
            <motion.a
              href={CONTACT_HREF}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 text-sm font-bold rounded-xl text-white text-center"
              style={{ background: BRAND_GRADIENT, boxShadow: "0 6px 24px rgba(123,47,190,0.3)" }}
            >
              Pedir presupuesto
            </motion.a>
            <motion.a
              href="#servicios"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 text-sm font-bold rounded-xl text-center"
              style={{ color: "#1a1a2e", border: "1px solid rgba(26,26,46,0.15)", background: "#FFFFFF" }}
            >
              Ver servicios ↓
            </motion.a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-x-5 gap-y-2 text-sm"
            style={{ color: "rgba(26,26,46,0.6)" }}
          >
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-1.5">
                <span style={{ color: "#00A85A" }}>✓</span>
                {p}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Nex + servicios */}
        <motion.div
          className="lg:col-span-2 relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-full max-w-[300px] sm:max-w-sm aspect-square">
            {/* Halo */}
            <div
              aria-hidden
              className="absolute inset-[8%] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(123,47,190,0.22) 0%, rgba(0,168,214,0.14) 45%, transparent 70%)" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/journey/nex-saluda.webp"
              alt="Nex, la mascota de Neuraxis, saludando"
              width={324}
              height={318}
              className="hero-nex absolute inset-0 m-auto w-[62%] h-auto select-none"
              style={{ filter: "drop-shadow(0 20px 40px rgba(123,47,190,0.35))" }}
              draggable={false}
            />
            {/* Chips de servicios */}
            {SERVICES.map((s, i) => (
              <motion.a
                key={s.label}
                href="#servicios"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
                className="absolute flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap"
                style={{
                  background: "#FFFFFF",
                  color: "#1a1a2e",
                  border: `1px solid ${s.color}55`,
                  boxShadow: `0 8px 28px ${s.color}30`,
                  ...(i === 0 ? { top: "4%", left: "0%" } : i === 1 ? { top: "40%", right: "-2%" } : { bottom: "4%", left: "4%" }),
                }}
              >
                <span className="text-base">{s.icon}</span>
                {s.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
      <style>{`
        @keyframes hero-nex-float { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-12px) rotate(2deg); } }
        .hero-nex { animation: hero-nex-float 3.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .hero-nex { animation: none; } }
      `}</style>
    </section>
  );
}
