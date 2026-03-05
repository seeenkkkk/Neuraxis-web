import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const body = await req.json();

    const {
      agentName,
      agentType,
      niche,
      problem,
      painTags,
      companySize,
      clientType,
      buyerPersona,
      instructions,
      tone,
      language,
      brain,
      connectCalendly,
      connectWhatsApp,
      connectEmail,
      systemPrompt,
      n8nJson,
    } = body;

    // Save project record
    const { data: project, error: projectError } = await supabase
      .from("agent_projects")
      .insert({
        user_id: user.id,
        problem_statement: problem,
        pain_tags: painTags,
        niche_sector: niche,
        company_size: companySize,
        buyer_persona: buyerPersona,
        agent_type: agentType,
        generated_prompt: systemPrompt,
        n8n_json: n8nJson,
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (projectError) {
      console.error("project insert error:", projectError);
    }

    // Save agent record
    const { error: agentError } = await supabase.from("agents").insert({
      user_id: user.id,
      project_id: project?.id ?? null,
      name: agentName || "Agente sin nombre",
      agent_type: agentType,
      status: "active",
      config: {
        niche,
        instructions,
        tone,
        language,
        brain,
        connectCalendly,
        connectWhatsApp,
        connectEmail,
        clientType,
        systemPrompt,
      },
    });

    if (agentError) {
      console.error("agent insert error:", agentError);
      return NextResponse.json({ error: agentError.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, projectId: project?.id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
