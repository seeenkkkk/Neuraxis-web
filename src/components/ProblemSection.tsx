"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const problems = [
  {
    emoji: "📭",
    title: "Leads que no responden",
    desc: "Captás potenciales clientes pero se enfrían antes de que puedas contactarlos. Cada hora sin respuesta es dinero perdido.",
  },
  {
    emoji: "😓",
    title: "Seguimiento manual agotador",
    desc: "Tu equipo pierde horas enviando correos y mensajes uno a uno. Es imposible escalar así sin multiplicar el equipo.",
  },
  {
    emoji: "⏳",
    title: "Tiempo perdido en tareas repetitivas",
    desc: "Agendar citas, recordatorios, reportes… tareas que consumen tiempo que deberías dedicar a hacer crecer tu negocio.",
  },
];

export default function ProblemSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="problema" ref={ref} className="py-24 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-brand-cyan text-sm font-semibold uppercase tracking-widest mb-4">
            El problema
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            ¿Te suena esto?
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card rounded-2xl p-8 flex flex-col gap-4 group hover:border-brand-purple/30 hover:bg-white/[0.06] transition-all duration-300"
            >
              <span className="text-4xl">{p.emoji}</span>
              <h3 className="text-xl font-semibold text-white">{p.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
