import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { canAccessStep6 } from "@/lib/wizard/canAccessStep6";
import GateScreen from "@/components/wizard/GateScreen";
import WizardStepClient from "@/components/wizard/WizardStepClient";

interface WizardStepPageProps {
  params: { projectId: string; step: string };
}

export default async function WizardStepPage({ params }: WizardStepPageProps) {
  const step = parseInt(params.step);

  // Paso fuera de rango → redirigir al 1
  if (isNaN(step) || step < 1 || step > 6) {
    redirect(`/wizard/${params.projectId}/1`);
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Cargar proyecto completo para este paso
  const { data: project, error } = await supabase
    .from("agent_projects")
    .select("*")
    .eq("id", params.projectId)
    .eq("user_id", user.id)
    .single();

  if (error || !project) redirect("/agents");

  // Evitar saltar pasos (solo puede ir al siguiente del actual o a los ya completados)
  const maxAllowedStep = (project.current_step ?? 1) + 1;
  if (step > maxAllowedStep) {
    redirect(`/wizard/${params.projectId}/${project.current_step}`);
  }

  // ─── Paso 6: verificar acceso ──────────────────────────
  if (step === 6) {
    const { access } = await canAccessStep6(user.id, params.projectId);
    if (!access) {
      return <GateScreen project={project} />;
    }
  }

  return <WizardStepClient step={step} project={project} />;
}
