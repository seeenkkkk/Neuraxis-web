"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const agents = [
  {
    initial: "A",
    name: "ARIA",
    role: "Agente de Ventas",
    specialty: "Convierte leads en clientes con seguimiento automático y cierre inteligente.",
    gradient: "linear-gradient(135deg, #6a11cb, #8b3cf7)",
    glow: "0 0 30px rgba(106,17,203,0.5), 0 0 60px rgba(106,17,203,0.25)",
    tag: "Ventas",
    color: "#6a11cb",
    stats: ["97% conversión", "24/7 activo", "CRM integrado"],
  },
  {
    initial: "N",
    name: "NEX",
    role: "Agente de Soporte",
    specialty: "Resuelve incidencias al instante y escala a humanos cuando lo necesita.",
    gradient: "linear-gradient(135deg, #22d4fd, #06b6d4)",
    glow: "0 0 30px rgba(34,212,253,0.6), 0 0 60px rgba(34,212,253,0.3)",
    tag: "Soporte",
    color: "#22d4fd",
    stats: ["< 2s respuesta", "Multi-idioma", "Escala automático"],
  },
  {
    initial: "L",
    name: "LUMA",
    role: "Agente de Marketing",
    specialty: "Genera contenido, lanza campañas y optimiza anuncios de forma autónoma.",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    glow: "0 0 30px rgba(16,185,129,0.5), 0 0 60px rgba(16,185,129,0.25)",
    tag: "Marketing",
    color: "#10b981",
    stats: ["A/B testing", "Multi-canal", "ROI tracking"],
  },
  {
    initial: "S",
    name: "SAGE",
    role: "Agente de Análisis",
    specialty: "Monitorea métricas en tiempo real y genera reportes ejecutivos automatizados.",
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    glow: "0 0 30px rgba(245,158,11,0.5), 0 0 60px rgba(245,158,11,0.25)",
    tag: "Análisis",
    color: "#f59e0b",
    stats: ["Tiempo real", "Dashboards", "Alertas IA"],
  },
  {
    initial: "C",
    name: "CORE",
    role: "Agente de Operaciones",
    specialty: "Automatiza workflows internos, conecta apps y mantiene todo sincronizado.",
    gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
    glow: "0 0 30px rgba(59,130,246,0.5), 0 0 60px rgba(59,130,246,0.25)",
    tag: "Operaciones",
    color: "#3b82f6",
    stats: ["+200 integraciones", "Webhooks", "Zero-downtime"],
  },
];

export default function AgentsSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="agentes" ref={ref} className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-brand-purple text-sm font-bold uppercase tracking-widest mb-4">
            Los 5 Agentes
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary mb-4">
            Tu equipo de IA completo
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-lg">
            Cinco agentes especializados, entrenados y listos para operar
            en todos los frentes de tu negocio.
          </p>
        </motion.div>

        {/* Agents grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 32, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="flex flex-col items-center text-center cursor-default group"
            >
              {/* Circle */}
              <div
                className="relative w-20 h-20 rounded-full flex items-center justify-center text-2xl font-extrabold text-white mb-5 transition-all duration-500 agent-circle"
                style={{
                  background: agent.gradient,
                  boxShadow: hovered === i ? agent.glow : "0 4px 20px rgba(0,0,0,0.1)",
                  transform: hovered === i ? "scale(1.15)" : "scale(1)",
                  transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                {agent.initial}

                {/* Outer ring on hover */}
                {hovered === i && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.3 }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: `1px solid ${agent.color}`,
                      opacity: 0.4,
                    }}
                  />
                )}
              </div>

              {/* Tag */}
              <span
                className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3"
                style={{
                  background: `${agent.color}18`,
                  color: agent.color,
                }}
              >
                {agent.tag}
              </span>

              {/* Name */}
              <h3 className="text-base font-extrabold text-text-primary mb-1">
                {agent.name}
              </h3>
              <p className="text-xs font-medium text-text-muted mb-3">{agent.role}</p>

              {/* Specialty — visible on hover */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: hovered === i ? 1 : 0,
                  height: hovered === i ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-xs text-text-secondary leading-relaxed mb-3">
                  {agent.specialty}
                </p>
                <div className="flex flex-col gap-1">
                  {agent.stats.map((s) => (
                    <span
                      key={s}
                      className="text-xs font-medium"
                      style={{ color: agent.color }}
                    >
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <a
            href="#builder"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-neon-purple"
          >
            Configurar mi agente →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
