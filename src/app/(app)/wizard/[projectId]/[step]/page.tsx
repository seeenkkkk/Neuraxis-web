import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { canAccessStep6 } from "@/lib/wizard/canAccessStep6";
import WizardStepClient from "@/components/wizard/WizardStepClient";

interface WizardStepPageProps {
  params: { projectId: string; step: string };
}

export default async function WizardStepPage({ params }: WizardStepPageProps) {
  const step = parseInt(params.step);

  if (isNaN(step) || step < 1 || step > 6) {
    redirect(`/wizard/${params.projectId}/1`);
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: project, error } = await supabase
    .from("agent_projects")
    .select("*")
    .eq("id", params.projectId)
    .eq("user_id", user.id)
    .single();

  if (error || !project) redirect("/roadmap");

  // Evitar saltar pasos
  const maxAllowed = (project.current_step ?? 1) + 1;
  if (step > maxAllowed) {
    redirect(`/wizard/${params.projectId}/${project.current_step}`);
  }

  // Verificar acceso al paso 6
  const hasStep6Access =
    step === 6
      ? (await canAccessStep6(user.id, params.projectId)).access
      : true;

  return (
    <WizardStepClient
      step={step}
      project={project}
      hasStep6Access={hasStep6Access}
    />
  );
}
