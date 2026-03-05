"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useWizardStore } from "@/store/wizardStore";

const STEPS = [
  { label: "Problema" },
  { label: "Enfoque IA" },
  { label: "Nicho" },
  { label: "Pricing" },
  { label: "Landing" },
  { label: "Agente" },
] as const;

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

  const urlSegments = pathname.split("/");
  const urlStep = parseInt(urlSegments[urlSegments.length - 1]) || 1;

  useEffect(() => {
    void loadProject(project.id);
  }, [project.id, loadProject]);

  return (
    <div
      className="rounded-2xl p-4"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}
    >
      <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
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
                  boxShadow: isActive ? "0 0 12px rgba(0,170,255,0.2)" : "none",
                  opacity: isFuture && !isLocked ? 0.4 : 1,
                }}
              >
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
                    color: isCompleted || isActive ? "#000" : isLocked ? "#A855F7" : "var(--text-muted)",
                  }}
                >
                  {isLocked ? "🔒" : isCompleted ? "✓" : stepNum}
                </span>
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
              </div>

              {i < STEPS.length - 1 && (
                <div
                  className="w-3 h-px flex-shrink-0"
                  style={{ background: isCompleted ? "rgba(0,255,136,0.4)" : "var(--border-subtle)" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
