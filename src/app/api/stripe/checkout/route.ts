import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PLANS } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const { planId } = await req.json();

    const plan = PLANS.find((p) => p.id === planId);
    if (!plan) {
      return NextResponse.json({ error: "Plan no encontrado" }, { status: 400 });
    }

    // Get authenticated user
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const baseUrl = req.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: user?.email,
      metadata: {
        userId: user?.id ?? "",
        planId,
      },
      line_items: [
        {
          price_data: {
            currency: "eur",
            recurring: { interval: "month" },
            product_data: {
              name: `Neuraxis IA — Plan ${plan.name}`,
              description: plan.description,
              images: [],
            },
            unit_amount: plan.price * 100, // cents
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/dashboard?checkout=success&plan=${planId}`,
      cancel_url: `${baseUrl}/billing?checkout=cancelled`,
      locale: "es",
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
