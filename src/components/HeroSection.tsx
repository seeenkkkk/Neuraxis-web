"use client";

import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.65, delay, ease: "easeOut" as const },
});

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">

      {/* Ambient blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-brand-purple/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-brand-cyan/8 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-brand-purple/5 via-transparent to-brand-cyan/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Badge */}
        <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full glass-white border border-brand-purple/20 text-sm font-medium text-text-secondary shadow-card">
          <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse-cyan shadow-neon-cyan" />
          Plataforma de Agentes IA · Nuevo Builder 2.0
        </motion.div>

        {/* Headline */}
        <motion.h1 {...fadeUp(0.1)} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-text-primary mb-6 text-balance">
          Tu negocio funciona solo{" "}
          <br className="hidden sm:block" />
          con{" "}
          <span className="gradient-neon-text">
            Inteligencia Artificial
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p {...fadeUp(0.2)} className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
          Diseña, entrena y despliega agentes IA personalizados que capturan leads,
          gestionan clientes y cierran ventas — todo sin intervención humana.
        </motion.p>

        {/* CTA buttons */}
        <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#builder"
            className="group px-8 py-4 rounded-full text-base font-bold bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-95 hover:scale-105 transition-all duration-300 shadow-neon-purple w-full sm:w-auto text-center"
          >
            Crear mi agente IA
            <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
          </a>
          <a
            href="#agentes"
            className="btn-crystal px-8 py-4 rounded-full text-base font-semibold w-full sm:w-auto text-center"
          >
            Ver los 5 agentes
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          {...fadeUp(0.45)}
          className="flex flex-wrap items-center justify-center gap-8 text-sm"
        >
          {[
            { val: "+500", label: "Automatizaciones activas" },
            { val: "+50", label: "Empresas usando Neuraxis" },
            { val: "98%", label: "Tasa de satisfacción" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="font-bold gradient-neon-text text-lg">{s.val}</span>
              <span className="text-text-muted">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Floating visual hint */}
        <motion.div
          {...fadeUp(0.6)}
          className="mt-20 flex justify-center"
        >
          <div className="relative glass-white rounded-2xl px-8 py-5 shadow-card flex items-center gap-6 border border-white/90">
            {/* Mini agent avatars */}
            {["A", "N", "L", "S", "C"].map((l, i) => (
              <div
                key={l}
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                style={{
                  background: [
                    "linear-gradient(135deg,#6a11cb,#8b3cf7)",
                    "linear-gradient(135deg,#22d4fd,#06b6d4)",
                    "linear-gradient(135deg,#10b981,#059669)",
                    "linear-gradient(135deg,#f59e0b,#d97706)",
                    "linear-gradient(135deg,#3b82f6,#2563eb)",
                  ][i],
                  boxShadow: i === 0
                    ? "0 0 12px rgba(106,17,203,0.4)"
                    : i === 1
                    ? "0 0 12px rgba(34,212,253,0.5)"
                    : undefined,
                }}
              >
                {l}
              </div>
            ))}
            <div className="h-6 w-px bg-gray-200" />
            <div className="text-sm text-text-secondary">
              <span className="font-semibold text-text-primary">5 agentes</span> listos para trabajar
            </div>
            <div className="w-2 h-2 rounded-full bg-brand-cyan animate-ping-slow shadow-neon-cyan" />
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
