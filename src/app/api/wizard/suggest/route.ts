import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    // Verificar auth
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

    const { problem_statement, pain_tags = [] } = (await req.json()) as {
      problem_statement: string;
      pain_tags?: string[];
    };

    if (!problem_statement || problem_statement.length < 10) {
      return NextResponse.json({ error: "Problem statement demasiado corto" }, { status: 400 });
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const prompt = `Eres un experto en agencias de IA. Un emprendedor tiene este problema de negocio:

Problema: "${problem_statement}"
Pain points específicos: ${pain_tags.length > 0 ? pain_tags.join(", ") : "No especificados"}

Genera exactamente 3 soluciones con IA para este problema. Cada solución debe ser específica, práctica y diferente.

Responde SOLO con este JSON exacto (sin markdown, sin explicaciones):
{
  "suggestions": [
    {
      "title": "Nombre del agente (máx 5 palabras)",
      "description": "Qué hace exactamente (máx 25 palabras)",
      "approach": "Modelos y herramientas: Claude/GPT + n8n/Zapier/API (máx 15 palabras)"
    },
    {
      "title": "...",
      "description": "...",
      "approach": "..."
    },
    {
      "title": "...",
      "description": "...",
      "approach": "..."
    }
  ]
}`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 600,
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.content[0];
    if (content.type !== "text") throw new Error("Unexpected response type");

    // Parse JSON — Claude might wrap in markdown, strip it
    const raw = content.text.replace(/```json\n?|```\n?/g, "").trim();
    const parsed = JSON.parse(raw) as { suggestions: unknown[] };

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
