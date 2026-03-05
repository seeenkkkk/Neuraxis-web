"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import NeonBadge from "@/components/ui/NeonBadge";
import GradientText from "@/components/ui/GradientText";
import { createClient } from "@/lib/supabase/client";

// ─── Datos de los pasos ────────────────────────────────────────
const STEPS_DATA = [
  {
    id: 1,
    title: "Identificar Problemas",
    subtitle: "Define los pain points de tus clientes objetivo",
    xp: 300,
    color: "#00FF88",
    cta: "Definir problema",
  },
  {
    id: 2,
    title: "Soluciones con IA",
    subtitle: "Mapea qué herramientas IA resuelven cada problema",
    xp: 400,
    color: "#00AAFF",
    cta: "Explorar soluciones",
  },
  {
    id: 3,
    title: "Definir tu Nicho",
    subtitle: "Especialízate para dominar un segmento del mercado",
    xp: 500,
    color: "#A855F7",
    cta: "Elegir nicho",
  },
  {
    id: 4,
    title: "Pricing y Paquetes",
    subtitle: "Diseña tu modelo de negocio y precios",
    xp: 450,
    color: "#FFD700",
    cta: "Crear pricing",
  },
  {
    id: 5,
    title: "Landing Page",
    subtitle: "Crea tu presencia digital que convierte",
    xp: 600,
    color: "#FF6B35",
    cta: "Crear landing",
  },
  {
    id: 6,
    title: "Design Core",
    subtitle: "Tipo de agente + prompt + workflow n8n",
    xp: 800,
    color: "#7C3AED",
    cta: "Generar agente",
  },
];

type StepStatus = "completed" | "active" | "pending" | "locked";

const STATUS_CONFIG: Record<StepStatus, { label: string; badge: "green" | "blue" | "purple" | "orange" }> = {
  completed: { label: "Completado",  badge: "green"  },
  active:    { label: "En progreso", badge: "blue"   },
  pending:   { label: "Pendiente",   badge: "purple" },
  locked:    { label: "Bloqueado",   badge: "orange" },
};

type ProjectRow = {
  id: string;
  current_step: number;
  status: string;
};

export default function RoadmapPage() {
  const router = useRouter();
  const [projectId, setProjectId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [planTier, setPlanTier] = useState<string>("free");
  const [loading, setLoading] = useState(true);
  const [navigatingStep, setNavigatingStep] = useState<number | null>(null);

  // Cargar proyecto y plan del usuario
  useEffect(() => {
    const init = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setLoading(false); return; }

        const [{ data: project }, { data: profile }] = await Promise.all([
          supabase
            .from("agent_projects")
            .select("id, current_step, status")
            .eq("user_id", user.id)
            .in("status", ["draft", "in_progress"])
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle(),
          supabase
            .from("profiles")
            .select("plan_tier")
            .eq("id", user.id)
            .single(),
        ]);

        if (project) {
          setProjectId((project as ProjectRow).id);
          setCurrentStep((project as ProjectRow).current_step ?? 1);
        }
        if (profile && profile.plan_tier) {
          setPlanTier(profile.plan_tier as string);
        }
      } catch {
        // Silencioso — muestra roadmap sin progreso
      } finally {
        setLoading(false);
      }
    };
    void init();
  }, []);

  // Crear proyecto si no existe
  const getOrCreateProject = useCallback(async (): Promise<string | null> => {
    if (projectId) return projectId;
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from("agent_projects")
        .insert({ user_id: user.id, current_step: 1, status: "draft" })
        .select("id")
        .single();

      if (data?.id) {
        setProjectId(data.id as string);
        return data.id as string;
      }
    } catch { /* silencioso */ }
    return null;
  }, [projectId]);

  // Clic en un paso
  const handleStepClick = async (stepId: number, status: StepStatus) => {
    if (status === "locked") return;

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push(`/login?next=/roadmap`);
      return;
    }

    setNavigatingStep(stepId);
    const pid = await getOrCreateProject();
    if (!pid) { setNavigatingStep(null); return; }

    router.push(`/wizard/${pid}/${stepId}`);
  };

  // Calcular estado de cada paso
  const getStatus = (stepId: number): StepStatus => {
    if (loading) return "pending";
    if (stepId === 6 && planTier === "free") return "locked";
    if (!projectId) return stepId === 1 ? "active" : "pending";
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "active";
    return "pending";
  };

  const steps = STEPS_DATA.map((s) => ({ ...s, status: getStatus(s.id) }));
  const completedCount = steps.filter((s) => s.status === "completed").length;
  const totalXP = steps.filter((s) => s.status === "completed").reduce((a, s) => a + s.xp, 0);
  const progressPct = (completedCount / STEPS_DATA.length) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
          Roadmap del <GradientText>Arquitecto IA</GradientText>
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          6 pasos para construir y escalar tu agencia de IA
        </p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="p-4 rounded-2xl"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Progreso general</span>
          <div className="flex items-center gap-2">
            <NeonBadge color="cyan">{completedCount}/{STEPS_DATA.length} pasos</NeonBadge>
            <NeonBadge color="gold">+{totalXP.toLocaleString()} XP</NeonBadge>
          </div>
        </div>
        <div className="w-full h-2 rounded-full" style={{ background: "var(--bg-input)" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="h-full rounded-full xp-bar-fill"
          />
        </div>
        {completedCount > 0 && (
          <p className="text-[10px] mt-2" style={{ color: "var(--text-muted)" }}>
            {completedCount === STEPS_DATA.length
              ? "🎉 ¡Roadmap completo! Tu agencia de IA está lista para escalar."
              : `${STEPS_DATA.length - completedCount} pasos restantes para completar el roadmap`}
          </p>
        )}
      </motion.div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, i) => {
          const sc = STATUS_CONFIG[step.status];
          const isLocked = step.status === "locked";
          const isCompleted = step.status === "completed";
          const isNavigating = navigatingStep === step.id;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <div
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid ${step.status === "active" ? step.color + "40" : isCompleted ? "rgba(0,255,136,0.2)" : "var(--border-card)"}`,
                  boxShadow: step.status === "active" ? `0 0 20px ${step.color}12` : "none",
                  opacity: isLocked ? 0.5 : 1,
                }}
              >
                <button
                  className="w-full flex items-center gap-4 p-4 text-left group"
                  onClick={() => void handleStepClick(step.id, step.status)}
                  disabled={isLocked || isNavigating}
                >
                  {/* Step number / check */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold transition-all"
                    style={{
                      background: isCompleted
                        ? "#00FF8820"
                        : step.status === "active"
                        ? `${step.color}20`
                        : "var(--bg-elevated)",
                      border: `1.5px solid ${isCompleted ? "#00FF88" : step.status === "active" ? step.color : "var(--border-subtle)"}`,
                      color: isCompleted ? "#00FF88" : step.status === "active" ? step.color : "var(--text-muted)",
                    }}
                  >
                    {isCompleted ? "✓" : step.id}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span
                        className="font-semibold text-sm"
                        style={{
                          fontFamily: "var(--font-syne, sans-serif)",
                          color: isCompleted ? "var(--neon-green)" : step.status === "active" ? step.color : "var(--text-primary)",
                          textDecoration: isCompleted ? "line-through" : "none",
                          opacity: isCompleted ? 0.7 : 1,
                        }}
                      >
                        {step.title}
                      </span>
                      <NeonBadge color={sc.badge} size="sm">{sc.label}</NeonBadge>
                      <NeonBadge color="gold" size="sm">+{step.xp} XP</NeonBadge>
                    </div>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Right action */}
                  <div className="flex-shrink-0 flex items-center gap-2">
                    {isLocked ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "#A855F7" }}>
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    ) : isNavigating ? (
                      <span className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: step.color, borderTopColor: "transparent" }} />
                    ) : isCompleted ? (
                      <span
                        className="text-xs px-2.5 py-1 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: "rgba(0,255,136,0.08)", color: "var(--neon-green)", border: "1px solid rgba(0,255,136,0.2)" }}
                      >
                        Revisar
                      </span>
                    ) : (
                      <span
                        className="text-xs px-2.5 py-1 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: `${step.color}15`, color: step.color, border: `1px solid ${step.color}30` }}
                      >
                        {step.cta} →
                      </span>
                    )}
                  </div>
                </button>

                {/* Completed bottom bar */}
                {isCompleted && (
                  <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.3), transparent)" }} />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom info for locked step 6 */}
      {planTier === "free" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between p-4 rounded-2xl"
          style={{ background: "rgba(168,85,247,0.05)", border: "1px solid var(--border-purple)" }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: "#A855F7" }}>
              🔒 Design Core — Plan de pago
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              El paso 6 genera el prompt + workflow n8n. Requiere Starter (29€/mes) o pago único (10€).
            </p>
          </div>
          <button
            onClick={() => router.push("/billing")}
            className="flex-shrink-0 ml-4 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
            style={{ background: "var(--grad-primary)", color: "#fff" }}
          >
            Ver planes →
          </button>
        </motion.div>
      )}
    </div>
  );
}
