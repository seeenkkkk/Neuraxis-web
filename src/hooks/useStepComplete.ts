"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function useStepComplete(
  projectId: string,
  stepId: number,
  currentProjectStep: number
) {
  const router = useRouter();

  const completeStep = async (stepData: Record<string, unknown> = {}) => {
    const supabase = createClient();

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

    router.push("/roadmap");
    router.refresh();
  };

  return { completeStep };
}
