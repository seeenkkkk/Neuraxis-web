"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

/* ─── Types ──────────────────────────────────────────── */
type Intelligence = "basico" | "avanzado" | "elite";
type Personality = "formal" | "amigable" | "directo" | "empatico";
type AgentData = {
  name: string;
  role: string;
  intelligence: Intelligence;
  personality: Personality;
};

/* ─── Step config ────────────────────────────────────── */
const ROLES = [
  { id: "ventas", label: "Ventas", icon: "💼", color: "#6a11cb" },
  { id: "soporte", label: "Soporte", icon: "🎧", color: "#22d4fd" },
  { id: "marketing", label: "Marketing", icon: "📣", color: "#10b981" },
  { id: "analisis", label: "Análisis", icon: "📊", color: "#f59e0b" },
  { id: "operaciones", label: "Operaciones", icon: "⚙️", color: "#3b82f6" },
  { id: "rrhh", label: "RRHH", icon: "👥", color: "#ec4899" },
];

const INTELLIGENCE: { id: Intelligence; label: string; desc: string; neon: number }[] = [
  { id: "basico", label: "Básico", desc: "Tareas simples y FAQs", neon: 1 },
  { id: "avanzado", label: "Avanzado", desc: "Razonamiento complejo, contexto largo", neon: 2 },
  { id: "elite", label: "Élite", desc: "IA de vanguardia, máxima autonomía", neon: 3 },
];

const PERSONALITIES: { id: Personality; label: string; icon: string; desc: string }[] = [
  { id: "formal", label: "Formal", icon: "🎩", desc: "Profesional y preciso" },
  { id: "amigable", label: "Amigable", icon: "😊", desc: "Cercano y cálido" },
  { id: "directo", label: "Directo", icon: "⚡", desc: "Conciso y orientado a resultados" },
  { id: "empatico", label: "Empático", icon: "💜", desc: "Comprensivo y humano" },
];

const STEP_LABELS = ["Identidad", "Rol", "Cerebro", "Personalidad", "Despliegue"];

/* ─── Particle for deploy animation ─────────────────── */
function DeployParticle({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{ left: "50%", top: "50%", background: color }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x, y, opacity: 0, scale: 0 }}
      transition={{ duration: 1.2 + Math.random() * 0.8, ease: "easeOut" }}
    />
  );
}

/* ─── Main component ─────────────────────────────────── */
export default function AgentBuilder() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<AgentData>({
    name: "",
    role: "",
    intelligence: "avanzado",
    personality: "amigable",
  });
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  /* Deploy logic */
  useEffect(() => {
    if (!deploying) return;
    const colors = ["#6a11cb", "#22d4fd", "#8b3cf7", "#67e8f9", "#10b981"];
    const newParticles = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 300,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);

    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => {
          setDeploying(false);
          setDeployed(true);
        }, 400);
      }
      setProgress(Math.min(p, 100));
    }, 180);

    return () => clearInterval(interval);
  }, [deploying]);

  const canProceed = () => {
    if (step === 0) return data.name.trim().length >= 2;
    if (step === 1) return data.role !== "";
    return true;
  };

  const handleNext = () => {
    if (step === 4) {
      setDeploying(true);
      setProgress(0);
      setDeployed(false);
    } else {
      setStep((s) => s + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setData({ name: "", role: "", intelligence: "avanzado", personality: "amigable" });
    setDeployed(false);
    setDeploying(false);
    setProgress(0);
    setParticles([]);
  };

  const roleColor = ROLES.find((r) => r.id === data.role)?.color || "#6a11cb";

  return (
    <section id="builder" ref={ref} className="py-28 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-brand-purple text-sm font-bold uppercase tracking-widest mb-4">
            Agent Builder
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary mb-4">
            Diseña tu agente en{" "}
            <span className="gradient-neon-text">5 pasos</span>
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            Configura la identidad, rol, inteligencia y personalidad de tu agente IA
            en minutos.
          </p>
        </motion.div>

        {/* Builder card */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="glass-white-strong rounded-3xl shadow-card-hover overflow-hidden"
        >
          {/* Progress bar */}
          <div className="p-8 pb-6">
            <div className="flex items-center justify-between mb-3">
              {STEP_LABELS.map((label, i) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-400 ${
                      i < step
                        ? "bg-gradient-to-br from-brand-purple to-brand-cyan text-white"
                        : i === step
                        ? "bg-gradient-to-br from-brand-purple to-brand-cyan text-white shadow-neon-purple"
                        : "bg-gray-100 text-text-muted"
                    }`}
                  >
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span className={`text-[10px] font-medium hidden sm:block ${i === step ? "text-brand-purple" : "text-text-muted"}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
            {/* Line */}
            <div className="h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan"
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Step content */}
          <div className="px-8 pb-8 min-h-[320px]">
            <AnimatePresence mode="wait">
              {/* ── Step 0: Identidad ── */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    ¿Cómo se llamará tu agente?
                  </h3>
                  <p className="text-text-secondary text-sm mb-8">
                    Dale una identidad única. Este será su nombre público.
                  </p>

                  <div className="relative">
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      placeholder="Ej: ARIA, NEXUS, LUNA..."
                      maxLength={20}
                      className="w-full px-5 py-4 text-lg font-semibold rounded-2xl bg-gray-50 border-2 border-gray-200 focus:border-brand-purple focus:outline-none focus:shadow-neon-purple transition-all duration-300 text-text-primary placeholder:text-gray-300"
                    />
                    {data.name && (
                      <div
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-black"
                        style={{
                          background: "linear-gradient(135deg,#6a11cb,#22d4fd)",
                          boxShadow: "0 0 12px rgba(106,17,203,0.4)",
                        }}
                      >
                        {data.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {data.name.length > 0 && data.name.length < 2 && (
                    <p className="text-xs text-red-400 mt-2">Mínimo 2 caracteres</p>
                  )}
                </motion.div>
              )}

              {/* ── Step 1: Rol ── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    ¿Cuál será su especialidad?
                  </h3>
                  <p className="text-text-secondary text-sm mb-8">
                    Selecciona el área donde operará tu agente.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {ROLES.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => setData({ ...data, role: role.id })}
                        className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300 text-left"
                        style={{
                          borderColor: data.role === role.id ? role.color : "#e5e7eb",
                          background:
                            data.role === role.id ? `${role.color}10` : "rgba(255,255,255,0.6)",
                          boxShadow:
                            data.role === role.id
                              ? `0 0 16px ${role.color}30, 0 0 32px ${role.color}15`
                              : undefined,
                          transform: data.role === role.id ? "scale(1.03)" : "scale(1)",
                        }}
                      >
                        <span className="text-2xl">{role.icon}</span>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: data.role === role.id ? role.color : "#374151" }}
                        >
                          {role.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── Step 2: Cerebro ── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    ¿Qué nivel de inteligencia necesitas?
                  </h3>
                  <p className="text-text-secondary text-sm mb-8">
                    Mayor nivel = más capacidad de razonamiento y autonomía.
                  </p>

                  <div className="flex flex-col gap-3">
                    {INTELLIGENCE.map((intel) => (
                      <button
                        key={intel.id}
                        onClick={() => setData({ ...data, intelligence: intel.id })}
                        className="flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300"
                        style={{
                          borderColor: data.intelligence === intel.id ? "#6a11cb" : "#e5e7eb",
                          background:
                            data.intelligence === intel.id
                              ? "rgba(106,17,203,0.06)"
                              : "rgba(255,255,255,0.6)",
                          boxShadow:
                            data.intelligence === intel.id
                              ? "0 0 16px rgba(106,17,203,0.25)"
                              : undefined,
                        }}
                      >
                        {/* Neon intensity indicator */}
                        <div className="flex gap-1 items-center">
                          {[1, 2, 3].map((dot) => (
                            <div
                              key={dot}
                              className="w-3 h-3 rounded-full transition-all duration-300"
                              style={{
                                background:
                                  dot <= intel.neon
                                    ? "linear-gradient(135deg,#6a11cb,#22d4fd)"
                                    : "#e5e7eb",
                                boxShadow:
                                  dot <= intel.neon && data.intelligence === intel.id
                                    ? "0 0 6px rgba(106,17,203,0.6)"
                                    : undefined,
                              }}
                            />
                          ))}
                        </div>
                        <div className="text-left flex-1">
                          <p className="font-bold text-sm text-text-primary">
                            {intel.label}
                          </p>
                          <p className="text-xs text-text-muted">{intel.desc}</p>
                        </div>
                        {data.intelligence === intel.id && (
                          <span className="text-brand-purple font-bold text-sm">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── Step 3: Personalidad ── */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    ¿Cómo se comunicará tu agente?
                  </h3>
                  <p className="text-text-secondary text-sm mb-8">
                    Define el tono que usará en todas sus interacciones.
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {PERSONALITIES.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setData({ ...data, personality: p.id })}
                        className="flex flex-col gap-2 p-5 rounded-2xl border-2 transition-all duration-300"
                        style={{
                          borderColor: data.personality === p.id ? "#22d4fd" : "#e5e7eb",
                          background:
                            data.personality === p.id
                              ? "rgba(34,212,253,0.06)"
                              : "rgba(255,255,255,0.6)",
                          boxShadow:
                            data.personality === p.id
                              ? "0 0 16px rgba(34,212,253,0.3)"
                              : undefined,
                          transform: data.personality === p.id ? "scale(1.02)" : "scale(1)",
                        }}
                      >
                        <span className="text-2xl">{p.icon}</span>
                        <div>
                          <p className="font-bold text-sm text-text-primary">{p.label}</p>
                          <p className="text-xs text-text-muted">{p.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── Step 4: Despliegue ── */}
              {step === 4 && !deploying && !deployed && (
                <motion.div
                  key="step4-preview"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    Resumen de tu agente
                  </h3>
                  <p className="text-text-secondary text-sm mb-8">
                    Revisa la configuración antes de desplegar.
                  </p>

                  <div className="glass-white rounded-2xl p-6 flex flex-col gap-4">
                    {/* Agent preview */}
                    <div className="flex items-center gap-4">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
                        style={{
                          background: `linear-gradient(135deg, ${roleColor}, #22d4fd)`,
                          boxShadow: `0 0 20px ${roleColor}40`,
                        }}
                      >
                        {data.name.slice(0, 2).toUpperCase() || "AI"}
                      </div>
                      <div>
                        <p className="text-xl font-extrabold text-text-primary">
                          {data.name || "Sin nombre"}
                        </p>
                        <p className="text-sm text-text-muted capitalize">{data.role || "Sin rol"}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {[
                        {
                          label: "Inteligencia",
                          value: INTELLIGENCE.find((i) => i.id === data.intelligence)?.label,
                        },
                        {
                          label: "Personalidad",
                          value: PERSONALITIES.find((p) => p.id === data.personality)?.label,
                        },
                      ].map((item) => (
                        <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                          <p className="text-xs text-text-muted mb-0.5">{item.label}</p>
                          <p className="text-sm font-semibold text-text-primary">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Deploying ── */}
              {deploying && (
                <motion.div
                  key="deploying"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center min-h-[280px] relative"
                >
                  {/* Particles */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                    {particles.map((p) => (
                      <DeployParticle key={p.id} x={p.x} y={p.y} color={p.color} />
                    ))}
                  </div>

                  {/* Central orb */}
                  <div className="relative mb-8">
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-black text-white"
                      style={{
                        background: `linear-gradient(135deg, ${roleColor}, #22d4fd)`,
                        boxShadow: `0 0 30px ${roleColor}60, 0 0 60px ${roleColor}30`,
                        animation: "pulseOrb 1.2s ease-in-out infinite",
                      }}
                    >
                      {data.name.slice(0, 2).toUpperCase()}
                    </div>
                    {/* Rotating ring */}
                    <div
                      className="absolute inset-0 rounded-full border-2 border-dashed animate-spin-slow"
                      style={{ borderColor: `${roleColor}40`, margin: "-10px" }}
                    />
                  </div>

                  <p className="text-base font-bold text-text-primary mb-1">
                    Desplegando agente...
                  </p>
                  <p className="text-sm text-text-muted mb-6">
                    Configurando neuronas y conectando APIs
                  </p>

                  {/* Progress bar */}
                  <div className="w-full max-w-xs h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <p className="text-xs text-text-muted mt-2">
                    {Math.round(progress)}%
                  </p>
                </motion.div>
              )}

              {/* ── Deployed success ── */}
              {deployed && (
                <motion.div
                  key="deployed"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center min-h-[280px] text-center"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6"
                    style={{
                      background: "linear-gradient(135deg,#10b981,#059669)",
                      boxShadow: "0 0 30px rgba(16,185,129,0.5)",
                    }}
                  >
                    ✓
                  </div>
                  <h3 className="text-2xl font-extrabold text-text-primary mb-2">
                    ¡{data.name} está activo!
                  </h3>
                  <p className="text-text-secondary mb-8 max-w-xs">
                    Tu agente está listo para trabajar. Puedes ajustarlo desde el panel de control.
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="#planes"
                      className="px-6 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90 transition-all shadow-neon-purple"
                    >
                      Ver planes
                    </a>
                    <button
                      onClick={reset}
                      className="px-6 py-3 rounded-full text-sm font-medium border-2 border-gray-200 text-text-secondary hover:border-brand-purple/40 hover:text-brand-purple transition-all"
                    >
                      Crear otro
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            {!deploying && !deployed && (
              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="px-6 py-3 rounded-full text-sm font-medium border-2 border-gray-200 text-text-secondary hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  ← Atrás
                </button>

                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="px-8 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-brand-purple to-brand-cyan text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-neon-purple"
                >
                  {step === 4 ? "🚀 Desplegar agente" : "Siguiente →"}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
