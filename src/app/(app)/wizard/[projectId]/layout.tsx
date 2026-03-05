import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { canAccessStep6 } from "@/lib/wizard/canAccessStep6";
import WizardStepper from "@/components/wizard/WizardStepper";

interface WizardLayoutProps {
  children: React.ReactNode;
  params: { projectId: string };
}

export default async function WizardLayout({ children, params }: WizardLayoutProps) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Cargar proyecto (verificando ownership)
  const { data: project, error } = await supabase
    .from("agent_projects")
    .select("id, current_step, agent_type")
    .eq("id", params.projectId)
    .eq("user_id", user.id)
    .single();

  if (error || !project) redirect("/agents");

  const { access: hasStep6Access } = await canAccessStep6(user.id, params.projectId);

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <WizardStepper project={project} hasStep6Access={hasStep6Access} />
      {children}
    </div>
  );
}
