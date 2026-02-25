"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const pillars = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
      </svg>
    ),
    num: "01",
    title: "Diseño Inteligente",
    desc: "Cada agente se diseña con propósito. Analizamos tu negocio, tus flujos y tus cuellos de botella para crear una solución 100% adaptada.",
    highlight: "IA a medida",
    accent: "#6a11cb",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
    num: "02",
    title: "Entrenamiento Continuo",
    desc: "Nuestros agentes aprenden de cada interacción. Se refinan solos con tus datos reales para mejorar semana a semana.",
    highlight: "Auto-mejora",
    accent: "#22d4fd",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
    ),
    num: "03",
    title: "Integración Total",
    desc: "Se conecta a tu CRM, WhatsApp, Instagram, email y más de 200 apps via n8n y Zapier — sin código, sin fricciones.",
    highlight: "+200 integraciones",
    accent: "#10b981",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    num: "04",
    title: "Métricas en Tiempo Real",
    desc: "Dashboard con KPIs en vivo: conversiones, tiempo de respuesta, leads gestionados y ROI calculado automáticamente.",
    highlight: "ROI visible",
    accent: "#f59e0b",
  },
];

export default function MetodologiaSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="metodologia" ref={ref} className="py-28 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-16 items-center mb-20"
        >
          <div>
            <p className="text-brand-cyan text-sm font-bold uppercase tracking-widest mb-4">
              Metodología
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary mb-6 leading-tight">
              Cómo convertimos datos en{" "}
              <span className="gradient-neon-text">resultados reales</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              Cada implementación sigue un proceso probado en más de 50 negocios.
              No vendemos tecnología — vendemos resultados medibles.
            </p>
          </div>

          {/* Decorative stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { val: "7 días", label: "Tiempo de implementación", color: "#6a11cb" },
              { val: "3×", label: "Promedio de ROI en 90 días", color: "#22d4fd" },
              { val: "24/7", label: "Operación ininterrumpida", color: "#10b981" },
              { val: "0 código", label: "Requerido de tu parte", color: "#f59e0b" },
            ].map((s) => (
              <div key={s.label} className="glass-white rounded-2xl p-5 shadow-card">
                <p
                  className="text-2xl font-extrabold mb-1"
                  style={{ color: s.color }}
                >
                  {s.val}
                </p>
                <p className="text-xs text-text-muted leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="glass-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group hover:-translate-y-1"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${p.accent}12`,
                  color: p.accent,
                }}
              >
                {p.icon}
              </div>

              {/* Step number */}
              <span className="text-xs font-black text-text-muted mb-2 block">
                {p.num}
              </span>

              {/* Title */}
              <h3 className="text-base font-bold text-text-primary mb-3">
                {p.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {p.desc}
              </p>

              {/* Highlight tag */}
              <span
                className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: `${p.accent}12`, color: p.accent }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.accent }} />
                {p.highlight}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
