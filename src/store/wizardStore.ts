"use client";

import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";

// XP por paso (índice 0 = paso 1)
const STEP_XP = [300, 400, 500, 450, 600, 800] as const;

export type StepData = Record<string, unknown>;

export interface WizardState {
  projectId: string | null;
  currentStep: number;
  stepData: Record<number, StepData>;
  xpEarned: number;
  xpToast: { amount: number; visible: boolean };

  // Actions
  setProjectId: (id: string) => void;
  setCurrentStep: (step: number) => void;
  setStepData: (step: number, data: StepData) => void;
  nextStep: () => void;
  prevStep: () => void;
  loadProject: (projectId: string) => Promise<void>;
  addXP: (amount: number) => Promise<void>;
  dismissXPToast: () => void;
}

let syncTimer: ReturnType<typeof setTimeout> | null = null;

// Mapping paso → columnas de agent_projects
const STEP_COLUMNS: Record<number, string[]> = {
  1: ["problem_statement", "pain_tags"],
  2: ["ai_approach", "ai_suggestions"],
  3: ["niche_sector", "company_size", "buyer_persona", "pricing_tiers"],
  4: ["landing_platform", "landing_redirect_at"],
  5: ["agent_type"],
  6: ["generated_prompt", "n8n_json"],
};

export const useWizardStore = create<WizardState>((set, get) => ({
  projectId: null,
  currentStep: 1,
  stepData: {},
  xpEarned: 0,
  xpToast: { amount: 0, visible: false },

  setProjectId: (id) => set({ projectId: id }),

  setCurrentStep: (step) => set({ currentStep: step }),

  setStepData: (step, data) => {
    set((state) => ({
      stepData: {
        ...state.stepData,
        [step]: { ...(state.stepData[step] ?? {}), ...data },
      },
    }));

    // Sync debounced a Supabase (800ms)
    if (syncTimer) clearTimeout(syncTimer);
    syncTimer = setTimeout(async () => {
      const { projectId, stepData } = get();
      if (!projectId) return;

      const columns = STEP_COLUMNS[step] ?? [];
      const payload: StepData = { current_step: step };
      const merged = { ...(stepData[step] ?? {}), ...data };
      for (const col of columns) {
        if (merged[col] !== undefined) payload[col] = merged[col];
      }

      const supabase = createClient();
      await supabase.from("agent_projects").update(payload).eq("id", projectId);
    }, 800);
  },

  nextStep: () => {
    const { currentStep, addXP } = get();
    if (currentStep >= 6) return;
    // Sumar XP del paso que se acaba de completar
    void addXP(STEP_XP[currentStep - 1]);
    set({ currentStep: currentStep + 1 });
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) set({ currentStep: currentStep - 1 });
  },

  loadProject: async (projectId) => {
    const supabase = createClient();
    const { data } = await supabase
      .from("agent_projects")
      .select("*")
      .eq("id", projectId)
      .single();

    if (!data) return;

    set({
      projectId,
      currentStep: data.current_step ?? 1,
      stepData: {
        1: { problem_statement: data.problem_statement, pain_tags: data.pain_tags },
        2: { ai_approach: data.ai_approach, ai_suggestions: data.ai_suggestions },
        3: {
          niche_sector: data.niche_sector,
          company_size: data.company_size,
          buyer_persona: data.buyer_persona,
          pricing_tiers: data.pricing_tiers,
        },
        4: {
          landing_platform: data.landing_platform,
          landing_redirect_at: data.landing_redirect_at,
        },
        5: { agent_type: data.agent_type },
        6: { generated_prompt: data.generated_prompt, n8n_json: data.n8n_json },
      },
    });
  },

  addXP: async (amount) => {
    set((state) => ({
      xpEarned: state.xpEarned + amount,
      xpToast: { amount, visible: true },
    }));

    // Persistir en Supabase
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase.rpc("increment_neurax_points", {
          p_user_id: user.id,
          p_amount: amount,
        });
      }
    } catch {
      // silencioso — XP local ya se actualizó
    }

    // Auto-dismiss tras 3s
    setTimeout(() => {
      set({ xpToast: { amount: 0, visible: false } });
    }, 3000);
  },

  dismissXPToast: () => set({ xpToast: { amount: 0, visible: false } }),
}));
