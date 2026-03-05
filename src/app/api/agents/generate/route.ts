import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// ─── n8n workflow generator ────────────────────────────────────────────────

function buildN8nWorkflow(data: {
  agentName: string;
  agentType: string;
  brain: string;
  systemPrompt: string;
}) {
  const name = data.agentName || "Mi Agente";
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  const useWebhook = ["chatbot", "appointment", "sales_assistant", "lead_qualifier", "tech_support", "onboarding", "hr", "webhook"].includes(data.agentType);

  const trigId = "trigger-node-01";
  const aiId = "ai-agent-node-01";
  const outId = "output-node-01";

  const triggerNode = useWebhook
    ? {
        parameters: { httpMethod: "POST", path: `${slug}-webhook`, responseMode: "responseNode", options: {} },
        id: trigId,
        name: "Webhook Trigger",
        type: "n8n-nodes-base.webhook",
        typeVersion: 2,
        position: [240, 300],
      }
    : {
        parameters: { rule: { interval: [{ field: "cronExpression", expression: "0 9 * * 1-5" }] } },
        id: trigId,
        name: "Schedule Trigger",
        type: "n8n-nodes-base.scheduleTrigger",
        typeVersion: 1.2,
        position: [240, 300],
      };

  const aiNode =
    data.brain === "anthropic"
      ? {
          parameters: {
            model: "claude-sonnet-4-6",
            messages: {
              values: [
                { role: "system", content: data.systemPrompt },
                { role: "user", content: useWebhook ? "={{ $json.message ?? $json.body?.message ?? '' }}" : "Ejecuta tu tarea programada y genera el resultado esperado." },
              ],
            },
            options: { maxTokens: 2048 },
          },
          id: aiId,
          name: name,
          type: "@n8n/n8n-nodes-langchain.lmChatAnthropic",
          typeVersion: 1.3,
          position: [460, 300],
          credentials: { anthropicApi: { id: "anthropic-creds", name: "Anthropic API" } },
        }
      : {
          parameters: {
            model: "gpt-4o",
            messages: {
              values: [
                { role: "system", content: data.systemPrompt },
                { role: "user", content: useWebhook ? "={{ $json.message ?? $json.body?.message ?? '' }}" : "Ejecuta tu tarea programada y genera el resultado esperado." },
              ],
            },
            options: { temperature: 0.7, maxTokens: 2048 },
          },
          id: aiId,
          name: name,
          type: "@n8n/n8n-nodes-langchain.lmChatOpenAi",
          typeVersion: 1.2,
          position: [460, 300],
          credentials: { openAiApi: { id: "openai-creds", name: "OpenAI API" } },
        };

  const outputNode = useWebhook
    ? {
        parameters: { respondWith: "text", responseBody: "={{ $json.text ?? $json.content?.[0]?.text ?? 'OK' }}" },
        id: outId,
        name: "Respond to Webhook",
        type: "n8n-nodes-base.respondToWebhook",
        typeVersion: 1.1,
        position: [680, 300],
      }
    : {
        parameters: {
          subject: `Informe automatizado — ${name}`,
          emailType: "text",
          message: "={{ $json.text ?? $json.content?.[0]?.text ?? '' }}",
        },
        id: outId,
        name: "Send Email Report",
        type: "n8n-nodes-base.emailSend",
        typeVersion: 2.1,
        position: [680, 300],
      };

  const triggerName = triggerNode.name;

  return {
    name: `${name} — Neuraxis Workflow`,
    nodes: [triggerNode, aiNode, outputNode],
    connections: {
      [triggerName]: { main: [[{ node: name, type: "main", index: 0 }]] },
      [name]: { main: [[{ node: outputNode.name, type: "main", index: 0 }]] },
    },
    active: false,
    settings: { executionOrder: "v1" },
    meta: { instanceId: "neuraxis-generated", templateCredsSetupCompleted: false },
  };
}

// ─── Route handler ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      agentName = "Agente",
      agentType = "chatbot",
      niche = "",
      problem = "",
      buyerPersona = "",
      companySize = "",
      clientType = "",
      instructions = "",
      tone = "Profesional",
      language = "Español",
      brain = "anthropic",
      connectCalendly = false,
      connectWhatsApp = false,
      connectEmail = false,
      painTags = [] as string[],
    } = data;

    const langMap: Record<string, string> = { Español: "Spanish", Inglés: "English", Ambos: "both Spanish and English" };
    const outputLang = langMap[language] ?? "Spanish";

    const integrations = [connectCalendly && "Calendly", connectWhatsApp && "WhatsApp", connectEmail && "Email"]
      .filter(Boolean)
      .join(", ") || "None";

    const systemPromptRequest = `Generate a detailed, production-ready system prompt in ${outputLang} for an AI agent with these specifications:

Agent Name: ${agentName}
Industry/Niche: ${niche}
Agent Type: ${agentType}
Problem it solves: ${problem}
Pain points addressed: ${painTags.join(", ")}
Target audience: ${buyerPersona}
Company size context: ${companySize}
Client type: ${clientType}
Communication tone: ${tone}
Integrations available: ${integrations}
Specific instructions: ${instructions || "Follow best practices for this agent type"}

The system prompt must:
1. Start with a clear identity statement ("Eres [Name], un agente IA especializado en...")
2. Define the agent's main objective and scope
3. List specific behaviors and rules (dos and don'ts)
4. Include tone and communication style guidelines
5. Handle edge cases (escalation to humans, out-of-scope questions)
6. Include integration-specific instructions if any integrations are enabled
7. End with a concise reminder of the primary goal

Write ONLY the system prompt content, no explanations or metadata. Make it comprehensive but focused (300-500 words).`;

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [{ role: "user", content: systemPromptRequest }],
    });

    const systemPrompt =
      message.content[0].type === "text" ? message.content[0].text : "Error generating prompt.";

    const n8nJson = buildN8nWorkflow({ agentName, agentType, brain, systemPrompt });

    return NextResponse.json({ systemPrompt, n8nJson });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
