"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

/* ─── Types ──────────────────────────────────────────── */
type StepId = "identify" | "solutions" | "niche" | "landing" | "config";

interface AgentConfig {
  name: string;
  gradientIdx: number;
  solutions: string[];
  niche: string;
  landingFeatures: string[];
  intelligence: string;
  language: string;
}

/* ─── Step definitions ───────────────────────────────── */
const STEPS: {
  id: StepId;
  label: string;
  icon: string;
  color: string;
  bg: string;
  desc: string;
}[] = [
  {
    id: "identify",
    label: "Identificar Agente",
    icon: "🎯",
    color: "#6a11cb",
    bg: "rgba(106,17,203,0.06)",
    desc: "Nombre, tipo e identidad visual",
  },
  {
    id: "solutions",
    label: "Soluciones IA",
    icon: "💡",
    color: "#22d4fd",
    bg: "rgba(34,212,253,0.06)",
    desc: "Capacidades y funciones activas",
  },
  {
    id: "niche",
    label: "Seleccionar Nicho",
    icon: "🎪",
    color: "#10b981",
    bg: "rgba(16,185,129,0.06)",
    desc: "Sector e industria objetivo",
  },
  {
    id: "landing",
    label: "Landing Pages",
    icon: "🌐",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.06)",
    desc: "Integraciones web y captación",
  },
  {
    id: "config",
    label: "Configuración",
    icon: "⚙️",
    color: "#ec4899",
    bg: "rgba(236,72,153,0.06)",
    desc: "IA, idioma y despliegue",
  },
];

const GRADIENTS = [
  "linear-gradient(135deg,#6a11cb,#8b3cf7)",
  "linear-gradient(135deg,#22d4fd,#06b6d4)",
  "linear-gradient(135deg,#10b981,#059669)",
  "linear-gradient(135deg,#f59e0b,#d97706)",
  "linear-gradient(135deg,#ec4899,#be185d)",
  "linear-gradient(135deg,#3b82f6,#2563eb)",
];

const SOLUTIONS_LIST = [
  { id: "atention", icon: "🎧", label: "Atención al cliente 24/7" },
  { id: "leads", icon: "📨", label: "Captación de leads" },
  { id: "followup", icon: "🔔", label: "Seguimiento automático" },
  { id: "booking", icon: "📅", label: "Booking y citas" },
  { id: "analytics", icon: "📊", label: "Análisis de datos" },
  { id: "email", icon: "✉️", label: "Campañas de email" },
];

const NICHES = [
  { id: "clinica", icon: "💉", label: "Clínicas Estéticas" },
  { id: "inmobiliaria", icon: "🏠", label: "Inmobiliarias" },
  { id: "ecommerce", icon: "🛒", label: "E-commerce" },
  { id: "restauracion", icon: "🍽️", label: "Restauración" },
  { id: "consultoria", icon: "💼", label: "Consultoría" },
  { id: "otros", icon: "✨", label: "Otros" },
];

const LANDING_FEATURES = [
  { id: "chatbot", label: "Chatbot en landing page" },
  { id: "form", label: "Formulario de captura" },
  { id: "whatsapp", label: "Integración WhatsApp" },
  { id: "popup", label: "Pop-up de salida" },
];

/* ─── Toggle component ───────────────────────────────── */
function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`relative w-10 h-5 rounded-full transition-all duration-300 focus:outline-none ${
        checked ? "bg-gradient-to-r from-brand-purple to-brand-cyan" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

/* ─── Modal contents per step ────────────────────────── */
function ModalContent({
  stepId,
  config,
  onUpdate,
}: {
  stepId: StepId;
  config: AgentConfig;
  onUpdate: (patch: Partial<AgentConfig>) => void;
}) {
  if (stepId === "identify") {
    return (
      <div className="flex flex-col gap-5">
        <div>
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 block">
            Nombre del agente
          </label>
          <input
            value={config.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="Ej: ARIA, NEXUS, LUMA..."
            maxLength={16}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-purple focus:outline-none focus:shadow-neon-purple transition-all text-base font-semibold text-text-primary bg-white placeholder:text-gray-300"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 block">
            Color del avatar
          </label>
          <div className="grid grid-cols-6 gap-2">
            {GRADIENTS.map((g, i) => (
              <button
                key={i}
                onClick={() => onUpdate({ gradientIdx: i })}
                className="w-9 h-9 rounded-full transition-transform duration-200 hover:scale-110"
                style={{
                  background: g,
                  outline: config.gradientIdx === i ? "2.5px solid #6a11cb" : "none",
                  outlineOffset: "2px",
                  boxShadow: config.gradientIdx === i ? "0 0 10px rgba(106,17,203,0.5)" : undefined,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (stepId === "solutions") {
    return (
      <div className="grid grid-cols-2 gap-2.5">
        {SOLUTIONS_LIST.map((s) => {
          const selected = config.solutions.includes(s.id);
          return (
            <button
              key={s.id}
              onClick={() =>
                onUpdate({
                  solutions: selected
                    ? config.solutions.filter((x) => x !== s.id)
                    : [...config.solutions, s.id],
                })
              }
              className="flex items-center gap-2.5 p-3 rounded-xl border-2 text-left transition-all duration-200"
              style={{
                borderColor: selected ? "#22d4fd" : "#e5e7eb",
                background: selected ? "rgba(34,212,253,0.06)" : "white",
                boxShadow: selected ? "0 0 10px rgba(34,212,253,0.2)" : undefined,
              }}
            >
              <span className="text-lg">{s.icon}</span>
              <span
                className="text-xs font-semibold leading-tight"
                style={{ color: selected ? "#22d4fd" : "#374151" }}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  if (stepId === "niche") {
    return (
      <div className="grid grid-cols-2 gap-2.5">
        {NICHES.map((n) => (
          <button
            key={n.id}
            onClick={() => onUpdate({ niche: n.id })}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition-all duration-200"
            style={{
              borderColor: config.niche === n.id ? "#10b981" : "#e5e7eb",
              background: config.niche === n.id ? "rgba(16,185,129,0.06)" : "white",
              boxShadow: config.niche === n.id ? "0 0 10px rgba(16,185,129,0.25)" : undefined,
              transform: config.niche === n.id ? "scale(1.03)" : "scale(1)",
            }}
          >
            <span className="text-2xl">{n.icon}</span>
            <span
              className="text-xs font-semibold"
              style={{ color: config.niche === n.id ? "#10b981" : "#374151" }}
            >
              {n.label}
            </span>
          </button>
        ))}
      </div>
    );
  }

  if (stepId === "landing") {
    return (
      <div className="flex flex-col gap-3">
        {LANDING_FEATURES.map((f) => {
          const enabled = config.landingFeatures.includes(f.id);
          return (
            <div
              key={f.id}
              className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 border border-gray-100"
            >
              <span className="text-sm font-medium text-text-secondary">{f.label}</span>
              <Toggle
                checked={enabled}
                onChange={() =>
                  onUpdate({
                    landingFeatures: enabled
                      ? config.landingFeatures.filter((x) => x !== f.id)
                      : [...config.landingFeatures, f.id],
                  })
                }
              />
            </div>
          );
        })}
      </div>
    );
  }

  if (stepId === "config") {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2.5 block">
            Nivel de inteligencia
          </label>
          <div className="flex gap-2">
            {["Básico", "Avanzado", "Élite"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => onUpdate({ intelligence: lvl })}
                className="flex-1 py-2.5 rounded-xl border-2 text-xs font-bold transition-all duration-200"
                style={{
                  borderColor: config.intelligence === lvl ? "#6a11cb" : "#e5e7eb",
                  background: config.intelligence === lvl ? "rgba(106,17,203,0.06)" : "white",
                  color: config.intelligence === lvl ? "#6a11cb" : "#6b7280",
                  boxShadow: config.intelligence === lvl ? "0 0 10px rgba(106,17,203,0.2)" : undefined,
                }}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2.5 block">
            Idioma principal
          </label>
          <select
            value={config.language}
            onChange={(e) => onUpdate({ language: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-brand-purple focus:outline-none text-sm font-medium text-text-primary bg-white"
          >
            <option value="es">🇪🇸 Español</option>
            <option value="en">🇬🇧 English</option>
            <option value="pt">🇵🇹 Português</option>
            <option value="fr">🇫🇷 Français</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2.5 block">
            Entorno de despliegue
          </label>
          <div className="flex gap-2">
            {["Test", "Producción"].map((env) => (
              <button key={env} className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-xs font-semibold text-text-muted hover:border-brand-cyan/40 transition-all">
                {env}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

/* ─── Main component ─────────────────────────────────── */
export default function AgentBuilder() {
  const [completed, setCompleted] = useState<Set<StepId>>(new Set());
  const [activeModal, setActiveModal] = useState<StepId | null>(null);
  const [deployed, setDeployed] = useState(false);
  const [config, setConfig] = useState<AgentConfig>({
    name: "",
    gradientIdx: 0,
    solutions: [],
    niche: "",
    landingFeatures: [],
    intelligence: "Avanzado",
    language: "es",
  });
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleUpdate = (patch: Partial<AgentConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  };

  const handleSaveStep = (id: StepId) => {
    setCompleted((prev) => new Set(Array.from(prev).concat(id)));
    setActiveModal(null);
  };

  const progress = (completed.size / STEPS.length) * 100;
  const agentName = config.name || "MI AGENTE";
  const agentGradient = GRADIENTS[config.gradientIdx];
  const nicheLabel = NICHES.find((n) => n.id === config.niche)?.label || "Sin definir";
  const canDeploy = completed.size >= 3;

  return (
    <section id="builder" ref={ref} className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-brand-purple text-sm font-bold uppercase tracking-widest mb-3">
            Agent Builder 2.0
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary">
              Tu panel de{" "}
              <span className="gradient-neon-text">control</span>
            </h2>
            <p className="text-text-secondary max-w-sm text-base">
              Configura cada módulo y observa tu agente cobrar vida en tiempo real.
            </p>
          </div>
        </motion.div>

        {/* Dashboard grid */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6"
        >
          {/* ── Left: Action grid ── */}
          <div className="glass-white-strong rounded-3xl p-6 shadow-card">
            {/* Panel header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse-cyan shadow-neon-cyan" />
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Módulos de configuración
                </span>
              </div>
              <span className="text-xs font-semibold text-brand-purple">
                {completed.size}/{STEPS.length} completados
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-gray-100 rounded-full mb-8 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {STEPS.map((step, i) => {
                const isDone = completed.has(step.id);
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.3 + i * 0.08 }}
                    className="relative group"
                  >
                    <button
                      onClick={() => setActiveModal(step.id)}
                      className="w-full text-left p-5 rounded-2xl border-2 transition-all duration-300"
                      style={{
                        borderColor: isDone ? step.color : "#e5e7eb",
                        background: isDone ? step.bg : "rgba(255,255,255,0.8)",
                        boxShadow: isDone
                          ? `0 0 16px ${step.color}25`
                          : "0 2px 8px rgba(0,0,0,0.04)",
                        transform: "scale(1)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = isDone
                          ? `0 0 20px ${step.color}40`
                          : `0 4px 20px ${step.color}20`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = isDone
                          ? `0 0 16px ${step.color}25`
                          : "0 2px 8px rgba(0,0,0,0.04)";
                      }}
                    >
                      {/* Status badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl">{isDone ? "✅" : step.icon}</span>
                        {isDone ? (
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{
                              background: `${step.color}15`,
                              color: step.color,
                            }}
                          >
                            Completado
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-text-muted px-2 py-0.5 rounded-full bg-gray-100">
                            Pendiente
                          </span>
                        )}
                      </div>

                      <h3
                        className="text-sm font-bold mb-1 transition-colors"
                        style={{ color: isDone ? step.color : "#0f0f1a" }}
                      >
                        {step.label}
                      </h3>
                      <p className="text-xs text-text-muted">{step.desc}</p>

                      {/* Action hint */}
                      <div className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color: step.color }}>
                        <span>{isDone ? "Editar" : "Configurar"}</span>
                        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Right: Agent Preview ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-white-strong rounded-3xl p-6 shadow-card flex flex-col"
          >
            {/* Preview header */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-brand-purple animate-pulse-neon" />
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                Vista previa
              </span>
            </div>

            {/* Agent avatar */}
            <div className="flex flex-col items-center text-center mb-6 flex-1">
              <div className="relative mb-4">
                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-40 animate-pulse-slow"
                  style={{ background: agentGradient, margin: "-12px" }}
                />
                <div
                  className="relative w-24 h-24 rounded-full flex items-center justify-center text-3xl font-black text-white"
                  style={{
                    background: agentGradient,
                    boxShadow: `0 0 30px ${GRADIENTS[config.gradientIdx].includes("6a11cb") ? "rgba(106,17,203,0.5)" : "rgba(34,212,253,0.5)"}`,
                  }}
                >
                  {agentName.slice(0, 2).toUpperCase()}
                </div>
              </div>

              <h3 className="text-2xl font-extrabold text-text-primary mb-1">
                {agentName}
              </h3>
              <p className="text-sm text-text-muted mb-4">{nicheLabel}</p>

              {/* Solutions chips */}
              {config.solutions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                  {config.solutions.slice(0, 3).map((sid) => {
                    const sol = SOLUTIONS_LIST.find((s) => s.id === sid);
                    return sol ? (
                      <span key={sid} className="text-[10px] font-semibold px-2 py-1 rounded-full bg-brand-purple/8 text-brand-purple">
                        {sol.icon} {sol.label}
                      </span>
                    ) : null;
                  })}
                  {config.solutions.length > 3 && (
                    <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-gray-100 text-text-muted">
                      +{config.solutions.length - 3} más
                    </span>
                  )}
                </div>
              )}

              {/* Progress */}
              <div className="w-full mb-2">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-text-muted">Configuración</span>
                  <span className="font-bold" style={{ color: "#6a11cb" }}>
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-1.5 mb-6">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    canDeploy ? "bg-brand-cyan animate-ping-slow" : "bg-gray-300"
                  }`}
                />
                <span className="text-xs text-text-muted">
                  {deployed
                    ? "✓ Desplegado"
                    : canDeploy
                    ? "Listo para desplegar"
                    : "En configuración"}
                </span>
              </div>
            </div>

            {/* Deploy button */}
            {deployed ? (
              <div className="w-full py-3.5 rounded-xl text-sm font-bold text-center bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
                ✓ {agentName} activo
              </div>
            ) : (
              <button
                onClick={() => canDeploy && setDeployed(true)}
                disabled={!canDeploy}
                className="w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-300"
                style={
                  canDeploy
                    ? {
                        background: "linear-gradient(135deg,#6a11cb,#22d4fd)",
                        color: "white",
                        boxShadow: "0 0 20px rgba(106,17,203,0.4)",
                      }
                    : {
                        background: "#f3f4f6",
                        color: "#9ca3af",
                        cursor: "not-allowed",
                      }
                }
              >
                {canDeploy ? "🚀 Desplegar agente" : `Faltan ${STEPS.length - completed.size} módulos`}
              </button>
            )}
            {!canDeploy && (
              <p className="text-center text-[11px] text-text-muted mt-2">
                Completa al menos 3 módulos
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {activeModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 z-50 bg-black/25 backdrop-blur-sm"
            />

            {/* Modal panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4"
            >
              <div className="glass-white-strong rounded-3xl shadow-card-hover overflow-hidden">
                {/* Modal header */}
                {(() => {
                  const step = STEPS.find((s) => s.id === activeModal)!;
                  return (
                    <>
                      <div
                        className="px-6 py-5 flex items-center justify-between"
                        style={{ background: step.bg, borderBottom: `1px solid ${step.color}20` }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{step.icon}</span>
                          <div>
                            <h3 className="font-extrabold text-text-primary">{step.label}</h3>
                            <p className="text-xs text-text-muted">{step.desc}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setActiveModal(null)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:bg-white/80 hover:text-text-primary transition-all"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Modal body */}
                      <div className="p-6">
                        <ModalContent
                          stepId={activeModal}
                          config={config}
                          onUpdate={handleUpdate}
                        />
                      </div>

                      {/* Modal footer */}
                      <div className="px-6 pb-6 flex gap-3">
                        <button
                          onClick={() => setActiveModal(null)}
                          className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-text-secondary hover:border-gray-300 transition-all"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => handleSaveStep(activeModal)}
                          className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-105"
                          style={{
                            background: `linear-gradient(135deg, ${step.color}, #22d4fd)`,
                            boxShadow: `0 0 16px ${step.color}40`,
                          }}
                        >
                          Guardar ✓
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
