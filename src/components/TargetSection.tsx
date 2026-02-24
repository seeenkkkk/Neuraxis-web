"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const targets = [
  {
    emoji: "💉",
    sector: "Clínicas Estéticas",
    color: "from-brand-purple/20 to-brand-cyan/5",
    border: "border-brand-purple/20",
    problems: [
      { icon: "📱", text: "Leads de Instagram sin responder durante horas" },
      { icon: "📅", text: "Citas no confirmadas que generan ausencias" },
      { icon: "📋", text: "Seguimiento post-tratamiento manual e inconsistente" },
    ],
    solution:
      "Neuraxis responde en segundos, agenda automáticamente y hace seguimiento post-visita para maximizar retención.",
  },
  {
    emoji: "🏠",
    sector: "Inmobiliarias",
    color: "from-brand-cyan/20 to-brand-purple/5",
    border: "border-brand-cyan/20",
    problems: [
      { icon: "❄️", text: "Leads fríos sin seguimiento que se pierden" },
      { icon: "😤", text: "Agentes saturados con consultas repetitivas" },
      { icon: "🔔", text: "Visitas sin recordatorio que acaban en no-show" },
    ],
    solution:
      "Calificamos leads automáticamente, gestionamos consultas comunes y enviamos recordatorios de visitas sin esfuerzo.",
  },
];

export default function TargetSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="para-quien" ref={ref} className="py-24 bg-[#0d0d14]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-brand-cyan text-sm font-semibold uppercase tracking-widest mb-4">
            Para quién
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Diseñado para tu sector
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Soluciones específicas para los retos que enfrentan los negocios de hoy.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {targets.map((t, i) => (
            <motion.div
              key={t.sector}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className={`glass-card rounded-2xl p-8 border ${t.border} bg-gradient-to-br ${t.color} hover:scale-[1.02] transition-transform duration-300`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{t.emoji}</span>
                <h3 className="text-2xl font-bold text-white">{t.sector}</h3>
              </div>

              {/* Problems */}
              <div className="flex flex-col gap-3 mb-6">
                {t.problems.map((p) => (
                  <div
                    key={p.text}
                    className="flex items-start gap-3 text-sm text-white/60"
                  >
                    <span className="text-base flex-shrink-0">{p.icon}</span>
                    <span>{p.text}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-white/10 mb-6" />

              {/* Solution */}
              <div className="flex items-start gap-3">
                <span className="text-brand-cyan text-lg flex-shrink-0">✦</span>
                <p className="text-sm text-white/70 leading-relaxed">{t.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
