"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AGENTS = [
  {
    initial: "A",
    name: "ARIA",
    role: "Agente de Ventas",
    tagline: "Convierte leads en clientes",
    specialty:
      "Califica prospectos, gestiona el pipeline y cierra deals con seguimiento automático e inteligencia predictiva.",
    color: "#9B30FF",
    glow: "rgba(155,48,255,0.55)",
    gradient: "linear-gradient(135deg, #9B30FF 0%, #6B0FD4 100%)",
    tag: "Ventas",
    stats: [
      { label: "Tasa conversión", val: "97%" },
      { label: "Disponibilidad", val: "24/7" },
      { label: "Integraciones", val: "CRM+WA" },
    ],
    backStats: [
      "Pipeline automático",
      "Seguimiento IA",
      "Cierre predictivo",
      "Lead scoring",
    ],
    img: "/images/avatar1.png-removebg-preview.png",
  },
  {
    initial: "N",
    name: "NEX",
    role: "Agente de Soporte",
    tagline: "Resuelve incidencias al instante",
    specialty:
      "Responde tickets en < 2 segundos, escala a humanos cuando es necesario y aprende de cada interacción.",
    color: "#00C4FF",
    glow: "rgba(0,196,255,0.55)",
    gradient: "linear-gradient(135deg, #00C4FF 0%, #0084C4 100%)",
    tag: "Soporte",
    stats: [
      { label: "Respuesta", val: "<2s" },
      { label: "Idiomas", val: "Multi" },
      { label: "Escalado", val: "Auto" },
    ],
    backStats: [
      "Tickets en tiempo real",
      "Base de conocimiento",
      "Escalado inteligente",
      "Multi-canal",
    ],
    img: "/images/avatar2.png-removebg-preview.png",
  },
  {
    initial: "L",
    name: "LUMA",
    role: "Agente de Marketing",
    tagline: "Genera contenido y lanza campañas",
    specialty:
      "Crea copies, publica en redes, lanza A/B tests y optimiza el ROI de tus anuncios de forma autónoma.",
    color: "#00CC6A",
    glow: "rgba(0,204,106,0.55)",
    gradient: "linear-gradient(135deg, #00CC6A 0%, #009950 100%)",
    tag: "Marketing",
    stats: [
      { label: "A/B Testing", val: "Auto" },
      { label: "Canales", val: "Multi" },
      { label: "ROI", val: "Tracking" },
    ],
    backStats: [
      "Copy con IA",
      "Publicación automática",
      "Análisis de audiencia",
      "Optimización de ads",
    ],
    img: "/images/avatar3.png-removebg-preview.png",
  },
  {
    initial: "S",
    name: "SAGE",
    role: "Agente de Análisis",
    tagline: "Métricas en tiempo real",
    specialty:
      "Monitorea KPIs, detecta anomalías y genera reportes ejecutivos automatizados con recomendaciones accionables.",
    color: "#007AFF",
    glow: "rgba(0,122,255,0.55)",
    gradient: "linear-gradient(135deg, #007AFF 0%, #0050C4 100%)",
    tag: "Análisis",
    stats: [
      { label: "Dashboards", val: "Live" },
      { label: "Alertas", val: "IA" },
      { label: "Reportes", val: "Auto" },
    ],
    backStats: [
      "Análisis predictivo",
      "Detección de anomalías",
      "Reportes ejecutivos",
      "KPIs personalizados",
    ],
    img: "/images/avatar4.png-removebg-preview.png",
  },
  {
    initial: "C",
    name: "CORE",
    role: "Agente de Operaciones",
    tagline: "Conecta todo tu stack tecnológico",
    specialty:
      "Automatiza workflows internos, sincroniza apps vía webhooks y mantiene todo tu ecosistema digital operativo.",
    color: "#FF6B35",
    glow: "rgba(255,107,53,0.55)",
    gradient: "linear-gradient(135deg, #FF6B35 0%, #CC4400 100%)",
    tag: "Operaciones",
    stats: [
      { label: "Integraciones", val: "+200" },
      { label: "Webhooks", val: "Real-time" },
      { label: "Uptime", val: "99.9%" },
    ],
    backStats: [
      "Workflows complejos",
      "Zero-downtime",
      "Sync automático",
      "API access total",
    ],
    img: "/images/avatar5.png-removebg-preview.png",
  },
];

function AgentCard({
  agent,
  delay,
  inView,
}: {
  agent: (typeof AGENTS)[0];
  delay: number;
  inView: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className="perspective-1000"
      style={{ cursor: "default" }}
    >
      <motion.div
        className="relative preserve-3d"
        style={{
          height: 340,
          transition: "transform 0.65s cubic-bezier(0.22,1,0.36,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setFlipped(false);
        }}
      >
        {/* ── Front face ── */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden"
          style={{
            background: "#F8F9FF",
            border: `1px solid ${hovered ? agent.color + "55" : "rgba(0,0,0,0.07)"}`,
            boxShadow: hovered
              ? `0 0 30px ${agent.glow}, 0 0 60px ${agent.color}22, inset 0 0 30px rgba(0,0,0,0.3)`
              : "0 4px 24px rgba(0,0,0,0.3)",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}
        >
          {/* Holographic overlay on hover */}
          {hovered && (
            <div
              className="absolute inset-0 animate-holographic pointer-events-none z-10"
              style={{
                background: `linear-gradient(135deg, ${agent.color}08 0%, transparent 50%, ${agent.color}05 100%)`,
              }}
            />
          )}

          {/* Top gradient band */}
          <div
            className="h-1.5 w-full"
            style={{ background: agent.gradient }}
          />

          <div className="p-6 flex flex-col h-full">
            {/* Avatar + tag */}
            <div className="flex items-start justify-between mb-5">
              <div className="relative">
                {/* Glow halo */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${agent.glow} 0%, transparent 70%)`,
                    filter: "blur(12px)",
                    transform: "scale(1.8)",
                    opacity: hovered ? 1 : 0.6,
                    transition: "opacity 0.3s",
                  }}
                />
                {/* Avatar */}
                <div
                  className="relative w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center text-white text-xl font-black"
                  style={{ background: agent.gradient }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={agent.img}
                    alt={agent.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fb = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fb) fb.style.display = "flex";
                    }}
                  />
                  <span
                    className="absolute inset-0 items-center justify-center text-2xl font-black hidden"
                    aria-hidden
                  >
                    {agent.initial}
                  </span>
                </div>
              </div>

              {/* Tag + flip button */}
              <div className="flex flex-col items-end gap-2">
                <span
                  className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{
                    background: `${agent.color}18`,
                    color: agent.color,
                    border: `1px solid ${agent.color}35`,
                  }}
                >
                  {agent.tag}
                </span>
                <button
                  onClick={() => setFlipped(true)}
                  className="text-[10px] font-medium rounded-full px-2 py-0.5 transition-all"
                  style={{
                    color: "rgba(0,0,0,0.35)",
                    border: "1px solid rgba(0,0,0,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = agent.color;
                    e.currentTarget.style.borderColor = agent.color + "55";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(0,0,0,0.35)";
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                  }}
                >
                  Ver más ↻
                </button>
              </div>
            </div>

            {/* Name + role */}
            <h3
              className="text-xl font-black mb-0.5"
              style={{ color: "#1a1a2e", fontFamily: "var(--font-syne, sans-serif)" }}
            >
              {agent.name}
            </h3>
            <p className="text-xs font-medium mb-3" style={{ color: "rgba(0,0,0,0.35)" }}>
              {agent.role}
            </p>

            {/* Tagline */}
            <p
              className="text-sm font-semibold mb-4"
              style={{ color: agent.color }}
            >
              {agent.tagline}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mt-auto">
              {agent.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-2.5 text-center"
                  style={{
                    background: `${agent.color}0C`,
                    border: `1px solid ${agent.color}22`,
                  }}
                >
                  <p
                    className="text-sm font-black mb-0.5"
                    style={{ color: agent.color }}
                  >
                    {s.val}
                  </p>
                  <p className="text-[9px] leading-tight" style={{ color: "rgba(0,0,0,0.35)" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Back face ── */}
        <div
          className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: `linear-gradient(160deg, ${agent.color}18 0%, #F8F9FF 50%)`,
            border: `1px solid ${agent.color}45`,
            boxShadow: `0 0 40px ${agent.glow}, 0 0 80px ${agent.color}22`,
          }}
        >
          {/* Top gradient */}
          <div className="h-1.5 w-full" style={{ background: agent.gradient }} />

          <div className="p-6 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-5">
              <h3
                className="text-2xl font-black"
                style={{
                  fontFamily: "var(--font-syne, sans-serif)",
                  background: agent.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {agent.name}
              </h3>
              <button
                onClick={() => setFlipped(false)}
                className="text-xs rounded-full px-3 py-1 transition-all"
                style={{
                  color: agent.color,
                  border: `1px solid ${agent.color}45`,
                  background: `${agent.color}10`,
                }}
              >
                ← Volver
              </button>
            </div>

            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "rgba(0,0,0,0.5)" }}
            >
              {agent.specialty}
            </p>

            <div className="space-y-3 mt-auto">
              {agent.backStats.map((feat, i) => (
                <motion.div
                  key={feat}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.2 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px]"
                    style={{
                      background: `${agent.color}20`,
                      border: `1px solid ${agent.color}40`,
                      color: agent.color,
                    }}
                  >
                    ✓
                  </div>
                  <span className="text-sm" style={{ color: "rgba(0,0,0,0.6)" }}>{feat}</span>
                </motion.div>
              ))}
            </div>

            {/* Bottom glow decoration */}
            <div
              className="absolute bottom-0 right-0 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${agent.color}18 0%, transparent 70%)`,
                filter: "blur(20px)",
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AgentsSectionNew() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="agentes"
      ref={ref}
      className="py-28 relative overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(155,48,255,0.06) 0%, rgba(0,196,255,0.04) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.25em] mb-4"
            style={{ color: "#9B30FF" }}
          >
            Tu equipo IA
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black mb-5"
            style={{ fontFamily: "var(--font-syne, sans-serif)", color: "#1a1a2e" }}
          >
            Los{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #9B30FF, #00C4FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              5 Agentes
            </span>{" "}
            Neuraxis
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(0,0,0,0.5)" }}>
            Cinco especialistas IA operando 24/7. Pasa el cursor para ver sus capacidades
            y haz click en{" "}
            <span style={{ color: "#9B30FF" }}>Ver más</span> para girar la card.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {AGENTS.map((agent, i) => (
            <AgentCard
              key={agent.name}
              agent={agent}
              delay={i * 0.1}
              inView={inView}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-14 text-center"
        >
          <a
            href="#builder"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #9B30FF, #00C4FF)",
              boxShadow: "0 0 30px rgba(155,48,255,0.35), 0 0 60px rgba(0,196,255,0.2)",
            }}
          >
            Configurar mi agente IA →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
