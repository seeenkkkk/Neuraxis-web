import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const { type, agentProjectId } = await req.json() as {
      type: "single" | "starter";
      agentProjectId: string;
    };

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const baseUrl = req.nextUrl.origin;
    const successBase = `${baseUrl}/wizard/${agentProjectId}/6`;

    // ─── Pago único 10€ ──────────────────────────────────────
    if (type === "single") {
      // Crear registro pending en agent_purchases
      await supabase.from("agent_purchases").upsert(
        {
          user_id: user.id,
          agent_project_id: agentProjectId,
          purchase_type: "single",
          amount_cents: 1000,
          status: "pending",
        },
        { onConflict: "user_id,agent_project_id" }
      );

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        customer_email: user.email,
        metadata: {
          userId: user.id,
          agentProjectId,
          purchase_type: "single",
        },
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: "Neuraxis IA — Agente Individual",
                description: "Prompt completo + JSON n8n · Solo este agente · Para siempre",
              },
              unit_amount: 1000,
            },
            quantity: 1,
          },
        ],
        success_url: `${successBase}?purchase=success`,
        cancel_url: `${successBase}?purchase=cancelled`,
        locale: "es",
      });

      return NextResponse.json({ url: session.url });
    }

    // ─── Suscripción Starter 29€/mes ─────────────────────────
    if (type === "starter") {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: user.email,
        metadata: {
          userId: user.id,
          planId: "starter",
          agentProjectId,
        },
        line_items: [
          {
            price_data: {
              currency: "eur",
              recurring: { interval: "month" },
              product_data: {
                name: "Neuraxis IA — Plan Starter",
                description: "Agentes ilimitados + acceso completo a la plataforma",
              },
              unit_amount: 2900,
            },
            quantity: 1,
          },
        ],
        success_url: `${successBase}?checkout=success&plan=starter`,
        cancel_url: `${successBase}?checkout=cancelled`,
        locale: "es",
        allow_promotion_codes: true,
      });

      return NextResponse.json({ url: session.url });
    }

    return NextResponse.json({ error: "Tipo no válido" }, { status: 400 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
