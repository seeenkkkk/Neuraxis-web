import { createClient } from "@/lib/supabase/server";

export type AccessReason = "subscription" | "single_purchase" | "none";

export interface AccessResult {
  access: boolean;
  reason: AccessReason;
}

const PAID_TIERS = ["starter", "pro", "enterprise"] as const;

export async function canAccessStep6(
  userId: string,
  agentProjectId: string
): Promise<AccessResult> {
  const supabase = createClient();

  // 1. Verificar suscripción activa
  const { data: profile } = await supabase
    .from("profiles")
    .select("plan_tier, subscription_status")
    .eq("id", userId)
    .single();

  if (
    profile &&
    PAID_TIERS.includes(profile.plan_tier as (typeof PAID_TIERS)[number]) &&
    profile.subscription_status === "active"
  ) {
    return { access: true, reason: "subscription" };
  }

  // 2. Verificar pago único para este proyecto
  const { data: purchase } = await supabase
    .from("agent_purchases")
    .select("id")
    .eq("user_id", userId)
    .eq("agent_project_id", agentProjectId)
    .eq("purchase_type", "single")
    .eq("status", "paid")
    .maybeSingle();

  if (purchase) {
    return { access: true, reason: "single_purchase" };
  }

  return { access: false, reason: "none" };
}
