"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useWizardStore } from "@/store/wizardStore";
import XPToast from "./XPToast";

const STEPS = [
  { label: "Problema", xp: 300 },
  { label: "Enfoque IA", xp: 400 },
  { label: "Nicho", xp: 500 },
  { label: "Landing", xp: 450 },
  { label: "Agente", xp: 600 },
  { label: "Exportar", xp: 800 },
] as const;

const TOTAL_XP = STEPS.reduce((s, st) => s + st.xp, 0); // 3050

type Project = {
  id: string;
  current_step: number;
};

interface WizardStepperProps {
  project: Project;
  hasStep6Access: boolean;
}

export default function WizardStepper({ project, hasStep6Access }: WizardStepperProps) {
  const { loadProject } = useWizardStore();
  const pathname = usePathname();

  // Paso actual por URL
  const urlSegments = pathname.split("/");
  const urlStep = parseInt(urlSegments[urlSegments.length - 1]) || 1;

  // XP acumulado = suma de los pasos completados (antes del actual)
  const completedSteps = Math.min(urlStep - 1, STEPS.length);
  const xpEarned = STEPS.slice(0, completedSteps).reduce((s, st) => s + st.xp, 0);
  const xpPct = Math.min((xpEarned / TOTAL_XP) * 100, 100);

  useEffect(() => {
    void loadProject(project.id);
  }, [project.id, loadProject]);

  return (
    <>
      <div
        className="rounded-2xl p-4 space-y-4"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-card)",
        }}
      >
        {/* Paso items */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide pb-0.5">
          {STEPS.map((step, i) => {
            const stepNum = i + 1;
            const isCompleted = stepNum < urlStep;
            const isActive = stepNum === urlStep;
            const isLocked = stepNum === 6 && !hasStep6Access;
            const isFuture = stepNum > urlStep;

            return (
              <div key={i} className="flex items-center gap-1 flex-shrink-0">
                <div
                  className="flex items-center gap-2 px-2.5 py-2 rounded-xl transition-all duration-200"
                  style={{
                    background: isActive
                      ? "rgba(0,170,255,0.08)"
                      : isCompleted
                      ? "rgba(0,255,136,0.05)"
                      : "var(--bg-elevated)",
                    border: `1px solid ${
                      isActive
                        ? "var(--neon-blue)"
                        : isCompleted
                        ? "rgba(0,255,136,0.35)"
                        : isLocked
                        ? "var(--border-purple)"
                        : "var(--border-card)"
                    }`,
                    boxShadow: isActive
                      ? "0 0 12px rgba(0,170,255,0.2)"
                      : isLocked
                      ? "0 0 10px rgba(168,85,247,0.1)"
                      : "none",
                    opacity: isFuture && !isLocked ? 0.4 : 1,
                  }}
                >
                  {/* Número / check / candado */}
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                    style={{
                      background: isCompleted
                        ? "var(--neon-green)"
                        : isActive
                        ? "var(--neon-blue)"
                        : isLocked
                        ? "rgba(168,85,247,0.15)"
                        : "var(--bg-card)",
                      color:
                        isCompleted || isActive ? "#000" : isLocked ? "#A855F7" : "var(--text-muted)",
                    }}
                  >
                    {isLocked ? "🔒" : isCompleted ? "✓" : stepNum}
                  </span>

                  {/* Label */}
                  <span
                    className="text-xs font-medium hidden sm:block whitespace-nowrap"
                    style={{
                      color: isActive
                        ? "var(--neon-blue)"
                        : isCompleted
                        ? "var(--neon-green)"
                        : isLocked
                        ? "#A855F7"
                        : "var(--text-secondary)",
                      textDecoration: isCompleted ? "line-through" : "none",
                      opacity: isCompleted ? 0.65 : 1,
                    }}
                  >
                    {step.label}
                  </span>

                  {/* XP badge en el activo */}
                  {isActive && (
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-md hidden md:block"
                      style={{
                        background: "rgba(255,215,0,0.1)",
                        color: "#FFD700",
                        border: "1px solid rgba(255,215,0,0.25)",
                      }}
                    >
                      +{step.xp} XP
                    </span>
                  )}
                </div>

                {/* Conector */}
                {i < STEPS.length - 1 && (
                  <div
                    className="w-3 h-px flex-shrink-0"
                    style={{
                      background:
                        isCompleted ? "rgba(0,255,136,0.4)" : "var(--border-subtle)",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* XP progress bar */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
            XP Wizard
          </span>

          <div
            className="flex-1 h-1.5 rounded-full overflow-hidden"
            style={{ background: "var(--bg-input)" }}
          >
            <motion.div
              animate={{ width: `${xpPct}%` }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, var(--neon-violet), var(--neon-blue))",
                boxShadow: "0 0 8px rgba(0,170,255,0.4)",
              }}
            />
          </div>

          <span
            className="text-[10px] font-bold whitespace-nowrap"
            style={{ color: "#FFD700" }}
          >
            {xpEarned.toLocaleString()} / {TOTAL_XP.toLocaleString()} XP
          </span>
        </div>
      </div>

      {/* Toast global */}
      <XPToast />
    </>
  );
}
