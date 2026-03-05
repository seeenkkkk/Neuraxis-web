"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useWizardStore } from "@/store/wizardStore";

const STEP_XP: Record<number, number> = {
  1: 300,
  2: 400,
  3: 500,
  4: 450,
  5: 600,
  6: 800,
};

export function useStepComplete(
  projectId: string,
  stepId: number,
  currentProjectStep: number
) {
  const router = useRouter();
  const { addXP } = useWizardStore();

  const completeStep = async (stepData: Record<string, unknown> = {}) => {
    const supabase = createClient();

    // Solo avanza current_step si es el paso actual o superior
    const newCurrentStep =
      stepId >= currentProjectStep ? stepId + 1 : currentProjectStep;

    const isLastStep = stepId === 6;

    await supabase
      .from("agent_projects")
      .update({
        ...stepData,
        current_step: newCurrentStep,
        status: isLastStep ? "completed" : "in_progress",
        ...(isLastStep ? { completed_at: new Date().toISOString() } : {}),
      })
      .eq("id", projectId);

    await addXP(STEP_XP[stepId] ?? 0);

    router.push("/roadmap");
    router.refresh();
  };

  return { completeStep };
}
