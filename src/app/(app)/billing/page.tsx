"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import GradientText from "@/components/ui/GradientText";
import NeonBadge from "@/components/ui/NeonBadge";
import NeonCard from "@/components/ui/NeonCard";
import NeonButton from "@/components/ui/NeonButton";
import { PLANS } from "@/lib/stripe";

function BillingContent() {
  const searchParams = useSearchParams();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (searchParams.get("checkout") === "success") {
      const plan = searchParams.get("plan");
      setSuccessMsg(`¡Suscripción al plan ${plan ? plan.charAt(0).toUpperCase() + plan.slice(1) : ""} activada con éxito!`);
    }
    if (searchParams.get("checkout") === "cancelled") {
      setError("Pago cancelado. Puedes intentarlo de nuevo cuando quieras.");
    }
  }, [searchParams]);

  const handleCheckout = async (planId: string) => {
    setLoadingPlan(planId);
    setError("");
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar el pago");
      setLoadingPlan(null);
    }
  };

  const handlePortal = async () => {
    setLoadingPortal(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al abrir el portal");
      setLoadingPortal(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
          Capa 2 — <GradientText>Construye</GradientText>
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Elige tu plan · Acceso a <strong>Aprende</strong> incluido · ¿Quieres que lo hagamos por ti?{" "}
          <a href="/delegate" className="underline" style={{ color: "var(--neon-cyan)" }}>Ver Delega →</a>
        </p>
      </motion.div>

      {/* Success / Error banners */}
      {successMsg && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl text-sm flex items-center gap-2"
          style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.25)", color: "#00FF88" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {successMsg}
        </motion.div>
      )}
      {error && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl text-sm"
          style={{ background: "rgba(255,68,68,0.08)", border: "1px solid rgba(255,68,68,0.2)", color: "#FF4444" }}>
          {error}
        </motion.div>
      )}

      {/* Plans grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i }}
            className="relative"
          >
            {plan.highlighted && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                <NeonBadge color="purple">Más popular</NeonBadge>
              </div>
            )}

            <NeonCard
              variant={plan.highlighted ? "purple" : "default"}
              className="p-6 flex flex-col h-full"
            >
              {/* Plan header */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: plan.color, boxShadow: `0 0 8px ${plan.color}80` }}
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: plan.color }}>
                    {plan.name}
                  </span>
                </div>
                <div className="flex items-end gap-1">
                  <span
                    className="text-4xl font-black"
                    style={{
                      fontFamily: "var(--font-syne)",
                      background: plan.highlighted ? "linear-gradient(135deg, #A855F7, #7C3AED)" : undefined,
                      WebkitBackgroundClip: plan.highlighted ? "text" : undefined,
                      WebkitTextFillColor: plan.highlighted ? "transparent" : undefined,
                      color: plan.highlighted ? undefined : "var(--text-primary)",
                    }}
                  >
                    {plan.priceLabel}
                  </span>
                  <span className="text-sm mb-1.5" style={{ color: "var(--text-muted)" }}>{plan.period}</span>
                </div>
                <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <NeonButton
                variant={plan.highlighted ? "primary" : "secondary"}
                className="w-full justify-center"
                loading={loadingPlan === plan.id}
                onClick={() => handleCheckout(plan.id)}
              >
                {loadingPlan === plan.id ? "Redirigiendo..." : `Suscribirse — ${plan.priceLabel}/mes`}
              </NeonButton>
            </NeonCard>
          </motion.div>
        ))}
      </div>

      {/* Manage subscription */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <NeonCard className="p-5">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-sm font-semibold mb-1" style={{ fontFamily: "var(--font-syne)", color: "var(--text-primary)" }}>
                Gestionar suscripción
              </h2>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Modifica, pausa o cancela tu plan actual desde el portal de Stripe.
              </p>
            </div>
            <NeonButton
              variant="ghost"
              loading={loadingPortal}
              onClick={handlePortal}
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              }
            >
              Portal de facturación →
            </NeonButton>
          </div>
        </NeonCard>
      </motion.div>

      {/* FAQ */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <NeonCard className="p-5 space-y-4">
          <h2 className="text-sm font-semibold" style={{ fontFamily: "var(--font-syne)", color: "var(--text-primary)" }}>
            Preguntas frecuentes
          </h2>
          {[
            { q: "¿Puedo cambiar de plan en cualquier momento?", a: "Sí. Puedes actualizar o degradar tu plan desde el portal de facturación. Los cambios se aplican de forma prorrateada." },
            { q: "¿Cómo funciona la facturación?", a: "Se cobra mensualmente el día de contratación. Aceptamos tarjetas de crédito/débito a través de Stripe, el sistema de pagos más seguro del mundo." },
            { q: "¿Hay permanencia mínima?", a: "No. Puedes cancelar cuando quieras sin penalización. Mantendrás el acceso hasta el final del período pagado." },
            { q: "¿Ofrecéis factura con IVA?", a: "Sí. Una vez realizado el pago, recibirás la factura automáticamente por email con todos los datos fiscales." },
          ].map(({ q, a }, i) => (
            <div key={i} className="pb-4 last:pb-0" style={{ borderBottom: i < 3 ? "1px solid var(--border-subtle)" : "none" }}>
              <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--text-primary)" }}>{q}</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{a}</p>
            </div>
          ))}
        </NeonCard>
      </motion.div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="max-w-5xl mx-auto py-10 text-center" style={{ color: "var(--text-muted)" }}>Cargando...</div>}>
      <BillingContent />
    </Suspense>
  );
}
