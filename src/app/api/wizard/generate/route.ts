import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { canAccessStep6 } from "@/lib/wizard/canAccessStep6";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

    const body = (await req.json()) as {
      agentProjectId: string;
      agent_type: string;
      problem_statement?: string;
      niche_sector?: string;
      company_size?: string;
      buyer_persona?: string;
      ai_approach?: string;
      pricing_tiers?: unknown;
    };

    // Validar acceso al paso 6 (nunca confiar solo en el cliente)
    const { access } = await canAccessStep6(user.id, body.agentProjectId);
    if (!access) {
      return NextResponse.json({ error: "Acceso no autorizado al paso 6" }, { status: 403 });
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const prompt = `Eres un arquitecto de agentes IA. Genera el sistema completo para este agente:

TIPO DE AGENTE: ${body.agent_type}
PROBLEMA QUE RESUELVE: ${body.problem_statement ?? "No especificado"}
NICHO/SECTOR: ${body.niche_sector ?? "General"} — Empresa ${body.company_size ?? "mediana"}
BUYER PERSONA: ${body.buyer_persona ?? "No especificado"}
ENFOQUE IA: ${body.ai_approach ?? "Claude AI"}

Genera:
1. Un system prompt completo y profesional para el agente (en español, listo para usar en producción)
2. Un workflow JSON de n8n funcional con 3-4 nodos relevantes para este tipo de agente

Responde SOLO con este JSON (sin markdown):
{
  "generated_prompt": "System prompt completo aquí...",
  "n8n_json": {
    "name": "${body.agent_type} Workflow",
    "nodes": [
      {
        "id": "1",
        "name": "Webhook",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [250, 300],
        "parameters": { "path": "agent-webhook", "responseMode": "lastNode", "responseData": "allEntries" }
      },
      {
        "id": "2",
        "name": "AI Agent",
        "type": "@n8n/n8n-nodes-langchain.agent",
        "typeVersion": 1,
        "position": [500, 300],
        "parameters": { "text": "={{ $json.body.message }}", "systemMessage": "SYSTEM_PROMPT_AQUI" }
      },
      {
        "id": "3",
        "name": "Respond",
        "type": "n8n-nodes-base.respondToWebhook",
        "typeVersion": 1,
        "position": [750, 300],
        "parameters": { "respondWith": "json", "responseBody": "={{ JSON.stringify($json) }}" }
      }
    ],
    "connections": {
      "Webhook": { "main": [[{ "node": "AI Agent", "type": "main", "index": 0 }]] },
      "AI Agent": { "main": [[{ "node": "Respond", "type": "main", "index": 0 }]] }
    },
    "settings": { "executionOrder": "v1" }
  }
}

Personaliza los nodos según el tipo de agente "${body.agent_type}". Añade nodos específicos si es relevante (ej: Send Email para Email Outreach, Google Sheets para Data Analyst).`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 3000,
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.content[0];
    if (content.type !== "text") throw new Error("Unexpected response type");

    const raw = content.text.replace(/```json\n?|```\n?/g, "").trim();
    const parsed = JSON.parse(raw) as {
      generated_prompt: string;
      n8n_json: unknown;
    };

    // Persistir en Supabase
    await supabase
      .from("agent_projects")
      .update({
        generated_prompt: parsed.generated_prompt,
        n8n_json: parsed.n8n_json,
        agent_type: body.agent_type,
      })
      .eq("id", body.agentProjectId);

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
