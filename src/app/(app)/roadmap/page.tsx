"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NeonBadge from "@/components/ui/NeonBadge";
import NeonButton from "@/components/ui/NeonButton";
import GradientText from "@/components/ui/GradientText";

const STEPS_DATA = [
  {
    id: 1,
    title: "Identificar Problemas",
    subtitle: "Define los pain points de tus clientes objetivo",
    description:
      "Analiza el mercado, identifica los problemas más críticos que tu agencia puede resolver con IA. Define el ICP (Ideal Customer Profile) y los problemas específicos a resolver. Sin esto, cualquier solución que construyas no tendrá mercado.",
    xp: 300,
    color: "#00FF88",
    tasks: ["Mapa de empatía del cliente", "Lista de top 5 problemas", "Validación con 3 entrevistas"],
  },
  {
    id: 2,
    title: "Soluciones con IA",
    subtitle: "Mapea qué herramientas IA resuelven cada problema",
    description:
      "Para cada problema identificado, diseña una solución con IA: qué agente, qué modelo, qué workflow automatiza el proceso. Crea tu catálogo de soluciones. Aquí defines si usarás Claude, GPT-4, Gemini o modelos open-source.",
    xp: 400,
    color: "#00AAFF",
    tasks: ["Matriz problema-solución", "Selección de modelos IA", "Diseño de workflows n8n"],
  },
  {
    id: 3,
    title: "Definir tu Nicho",
    subtitle: "Especialízate para dominar un segmento del mercado",
    description:
      "Elige el nicho donde tu agencia tendrá el mayor impacto y diferenciación. Clínicas estéticas, inmobiliarias, coaches, e-commerce... enfoca para amplificar. El especialista siempre gana al generalista en conversión y pricing.",
    xp: 500,
    color: "#A855F7",
    tasks: ["Análisis competencia por nicho", "Propuesta de valor única", "Posicionamiento de marca"],
  },
  {
    id: 4,
    title: "Pricing y Paquetes",
    subtitle: "Diseña tu modelo de negocio y precios",
    description:
      "Estructura tus servicios en paquetes claros con precios que reflejen el valor entregado. Crea tu tabla de precios, define retainers y servicios puntuales. Un buen pricing puede triplicar tus ingresos con los mismos clientes.",
    xp: 450,
    color: "#FFD700",
    tasks: ["3 niveles de paquetes", "Calculadora de ROI para clientes", "Contratos y términos"],
  },
  {
    id: 5,
    title: "Landing Page",
    subtitle: "Crea tu presencia digital que convierte",
    description:
      "Diseña y lanza tu landing page con copy persuasivo, casos de éxito, social proof y CTA claro hacia Calendly. Tu escaparate digital para atraer clientes ideales. La landing page es tu vendedor 24/7.",
    xp: 600,
    color: "#FF6B35",
    tasks: ["Copy de propuesta de valor", "3 casos de estudio", "Integración Calendly + píxel"],
  },
  {
    id: 6,
    title: "SignalCore",
    subtitle: "Sistema de captación y conversión automatizado",
    description:
      "Implementa tu sistema completo de captación: leads desde meta ads → CRM → nurture automatizado con agente IA → cierre en llamada. El ciclo completo de ventas automatizado. Con SignalCore operativo, tu agencia genera clientes en piloto automático.",
    xp: 800,
    color: "#7C3AED",
    tasks: ["Meta Ads configurado", "CRM integrado con n8n", "Secuencia de nurture IA"],
  },
];

type StepStatus = "completed" | "active" | "pending" | "locked";
const STORAGE_KEY = "neuraxis_roadmap";

function loadProgress(): Record<number, StepStatus> {
  if (typeof window === "undefined") return {};
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  // Default: step 1 active, rest locked
  return { 1: "active", 2: "locked", 3: "locked", 4: "locked", 5: "locked", 6: "locked" };
}

function saveProgress(progress: Record<number, StepStatus>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

const STATUS_CONFIG = {
  completed: { label: "Completado",  badge: "green"  as const },
  active:    { label: "En progreso", badge: "blue"   as const },
  pending:   { label: "Pendiente",   badge: "purple" as const },
  locked:    { label: "Bloqueado",   badge: "orange" as const },
};

export default function RoadmapPage() {
  const [progress, setProgress] = useState<Record<number, StepStatus>>({});
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [taskChecks, setTaskChecks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = loadProgress();
    setProgress(saved);
    const activeId = Object.entries(saved).find(([, v]) => v === "active");
    if (activeId) setActiveStep(Number(activeId[0]));

    try {
      const checks = localStorage.getItem("neuraxis_roadmap_tasks");
      if (checks) setTaskChecks(JSON.parse(checks));
    } catch {}
  }, []);

  const completeStep = (stepId: number) => {
    const newProgress = { ...progress };
    newProgress[stepId] = "completed";
    if (stepId < 6) {
      newProgress[stepId + 1] = "active";
      setActiveStep(stepId + 1);
    }
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  const toggleTask = (key: string) => {
    const updated = { ...taskChecks, [key]: !taskChecks[key] };
    setTaskChecks(updated);
    localStorage.setItem("neuraxis_roadmap_tasks", JSON.stringify(updated));
  };

  const steps = STEPS_DATA.map((s) => ({ ...s, status: progress[s.id] ?? "locked" as StepStatus }));
  const completedCount = steps.filter((s) => s.status === "completed").length;
  const totalXP = steps.filter((s) => s.status === "completed").reduce((a, s) => a + s.xp, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
          Roadmap del <GradientText>Arquitecto IA</GradientText>
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>6 pasos para construir y escalar tu agencia de IA</p>
      </motion.div>

      {/* Progress bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="p-4 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Progreso general</span>
          <div className="flex items-center gap-3">
            <NeonBadge color="cyan">{completedCount}/{STEPS_DATA.length} pasos</NeonBadge>
            <NeonBadge color="gold">+{totalXP.toLocaleString()} XP</NeonBadge>
          </div>
        </div>
        <div className="w-full h-2 rounded-full" style={{ background: "var(--bg-input)" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / STEPS_DATA.length) * 100}%` }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="h-full rounded-full xp-bar-fill"
          />
        </div>
      </motion.div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, i) => {
          const isOpen = activeStep === step.id;
          const sc = STATUS_CONFIG[step.status];
          const isLocked = step.status === "locked";
          const tasksCompleted = step.tasks.filter((_, ti) => taskChecks[`${step.id}-${ti}`]).length;
          const allTasksDone = tasksCompleted === step.tasks.length;

          return (
            <motion.div key={step.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
              <div className="rounded-2xl overflow-hidden" style={{
                background: "var(--bg-card)",
                border: `1px solid ${isOpen ? step.color + "40" : "var(--border-card)"}`,
                boxShadow: isOpen ? `0 0 20px ${step.color}15` : "none",
                opacity: isLocked ? 0.5 : 1,
              }}>
                <button className="w-full flex items-center gap-4 p-4 text-left"
                  onClick={() => !isLocked && setActiveStep(isOpen ? null : step.id)} disabled={isLocked}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold" style={{
                    background: step.status === "completed" ? "#00FF8820" : step.status === "active" ? `${step.color}20` : "var(--bg-elevated)",
                    border: `1.5px solid ${step.status === "completed" ? "#00FF88" : step.status === "active" ? step.color : "var(--border-subtle)"}`,
                    color: step.status === "completed" ? "#00FF88" : step.status === "active" ? step.color : "var(--text-muted)",
                  }}>
                    {step.status === "completed" ? "✓" : step.id}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
                        {step.title}
                      </span>
                      <NeonBadge color={sc.badge} size="sm">{sc.label}</NeonBadge>
                      <NeonBadge color="gold" size="sm">+{step.xp} XP</NeonBadge>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{step.subtitle}</p>
                  </div>

                  {!isLocked ? (
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ color: "var(--text-muted)" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </motion.span>
                  ) : (
                    <span style={{ color: "var(--text-muted)" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <div className="px-4 pb-5 space-y-4" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                        <p className="text-sm pt-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                          {step.description}
                        </p>

                        <div className="space-y-2">
                          <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                            Tareas del paso ({tasksCompleted}/{step.tasks.length})
                          </p>
                          {step.tasks.map((task, ti) => {
                            const key = `${step.id}-${ti}`;
                            const checked = !!taskChecks[key] || step.status === "completed";
                            return (
                              <button
                                key={ti}
                                onClick={() => step.status !== "completed" && toggleTask(key)}
                                className="flex items-center gap-2.5 w-full text-left"
                                disabled={step.status === "completed"}
                              >
                                <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all" style={{
                                  background: checked ? "#00FF8820" : "var(--bg-elevated)",
                                  border: `1px solid ${checked ? "#00FF88" : "var(--border-subtle)"}`,
                                }}>
                                  {checked && (
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="3">
                                      <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                  )}
                                </div>
                                <span className="text-xs" style={{ color: checked ? "var(--text-primary)" : "var(--text-secondary)", textDecoration: checked ? "line-through" : "none" }}>
                                  {task}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          {step.status === "active" && (
                            <NeonButton
                              size="sm"
                              disabled={!allTasksDone}
                              onClick={() => allTasksDone && completeStep(step.id)}
                            >
                              {allTasksDone ? "Marcar como completado ✓" : `Completa las tareas (${tasksCompleted}/${step.tasks.length})`}
                            </NeonButton>
                          )}
                          {step.status === "pending" && (
                            <NeonButton variant="secondary" size="sm">Previsualizar contenido</NeonButton>
                          )}
                          {step.status === "completed" && (
                            <NeonButton variant="ghost" size="sm">Revisar material ✓</NeonButton>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
