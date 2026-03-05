import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const AGENT_PLANS = {
  agent_basic: {
    name: "Neuraxis — Agente IA Básico",
    description: "1 agente IA configurado · System prompt completo · Workflow n8n · Soporte por email",
    amount: 1000, // 10€ in cents
    mode: "payment" as const,
  },
  agent_pro: {
    name: "Neuraxis — Plan Pro",
    description: "5 agentes IA activos · Workflows n8n ilimitados · Soporte prioritario · Dashboard",
    amount: 2900, // 29€ in cents
    mode: "subscription" as const,
  },
  agent_setup: {
    name: "Neuraxis — Configuración Completa",
    description: "Configuración técnica completa por el equipo Neuraxis · API keys · Integraciones · Pruebas",
    amount: 4900, // 49€ in cents
    mode: "payment" as const,
  },
} as const;

export async function POST(req: NextRequest) {
  try {
    const { planId } = await req.json();

    const plan = AGENT_PLANS[planId as keyof typeof AGENT_PLANS];
    if (!plan) {
      return NextResponse.json({ error: "Plan no encontrado" }, { status: 400 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const baseUrl = req.nextUrl.origin;

    const lineItem = {
      price_data: {
        currency: "eur",
        product_data: {
          name: plan.name,
          description: plan.description,
        },
        unit_amount: plan.amount,
        ...(plan.mode === "subscription" ? { recurring: { interval: "month" as const } } : {}),
      },
      quantity: 1,
    };

    const session = await stripe.checkout.sessions.create({
      mode: plan.mode,
      payment_method_types: ["card"],
      customer_email: user?.email,
      metadata: {
        userId: user?.id ?? "",
        planId,
      },
      line_items: [lineItem],
      success_url: `${baseUrl}/dashboard?checkout=success&plan=${planId}`,
      cancel_url: `${baseUrl}/agents/create?checkout=cancelled`,
      locale: "es",
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
