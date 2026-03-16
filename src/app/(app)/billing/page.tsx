"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { PLANS } from "@/lib/stripe";

// ── Constants ─────────────────────────────────────────────────────────────────

const BRAND_GRADIENT = "linear-gradient(135deg, #8BC34A 0%, #7B1FA2 50%, #00BCD4 100%)";

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
        <div className="flex items-center gap-3 mb-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/avatar9.png.png" alt="" className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
          <div>
            <h1 className="text-2xl font-bold grad-text-brand">Planes y Facturación</h1>
            <p className="text-sm" style={{ color: "#9ca3af" }}>
              Elige tu plan · Acceso a <strong className="text-white">Aprende</strong> incluido ·{" "}
              <a href="/delegate" className="transition-colors hover:opacity-80" style={{ color: "#00BCD4" }}>
                Ver Delega →
              </a>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Success / Error banners */}
      {successMsg && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl text-sm flex items-center gap-2"
          style={{ background: "rgba(139,195,74,0.10)", border: "1px solid #8BC34A", color: "#8BC34A" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {successMsg}
        </motion.div>
      )}
      {error && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl text-sm"
          style={{ background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,1)", color: "#ef4444" }}>
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
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: BRAND_GRADIENT }}
                >
                  Más popular
                </span>
              </div>
            )}

            <div
              className="rounded-2xl p-6 flex flex-col h-full transition-all duration-200"
              style={{
                background: "#111827",
                border: plan.highlighted ? "2px solid #00BCD4" : "1px solid rgba(255,255,255,0.08)",
                boxShadow: plan.highlighted ? "0 0 30px rgba(0,188,212,0.15)" : "none",
              }}
              onMouseEnter={e => { if (!plan.highlighted) (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.20)"; }}
              onMouseLeave={e => { if (!plan.highlighted) (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
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
                  <span className="text-4xl font-black text-white">
                    {plan.priceLabel}
                  </span>
                  <span className="text-sm mb-1.5" style={{ color: "#6b7280" }}>{plan.period}</span>
                </div>
                <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs" style={{ color: "#d1d5db" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8BC34A" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                disabled={loadingPlan === plan.id}
                onClick={() => handleCheckout(plan.id)}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ background: BRAND_GRADIENT }}
              >
                {loadingPlan === plan.id ? "Redirigiendo..." : `Suscribirse — ${plan.priceLabel}/mes`}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Manage subscription */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <div
          className="rounded-2xl p-5 transition-all duration-200"
          style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.08)" }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-sm font-semibold mb-1 text-white">Gestionar suscripción</h2>
              <p className="text-xs" style={{ color: "#9ca3af" }}>
                Modifica, pausa o cancela tu plan actual desde el portal de Stripe.
              </p>
            </div>
            <button
              disabled={loadingPortal}
              onClick={handlePortal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
              style={{ border: "1px solid rgba(255,255,255,0.20)", color: "rgba(255,255,255,0.7)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.40)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              {loadingPortal ? "Cargando..." : "Portal de facturación →"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* FAQ */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div
          className="rounded-2xl p-5 space-y-4 transition-all duration-200"
          style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.08)" }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
        >
          <h2 className="text-sm font-semibold text-white">Preguntas frecuentes</h2>
          {[
            { q: "¿Puedo cambiar de plan en cualquier momento?", a: "Sí. Puedes actualizar o degradar tu plan desde el portal de facturación. Los cambios se aplican de forma prorrateada." },
            { q: "¿Cómo funciona la facturación?", a: "Se cobra mensualmente el día de contratación. Aceptamos tarjetas de crédito/débito a través de Stripe, el sistema de pagos más seguro del mundo." },
            { q: "¿Hay permanencia mínima?", a: "No. Puedes cancelar cuando quieras sin penalización. Mantendrás el acceso hasta el final del período pagado." },
            { q: "¿Ofrecéis factura con IVA?", a: "Sí. Una vez realizado el pago, recibirás la factura automáticamente por email con todos los datos fiscales." },
          ].map(({ q, a }, i) => (
            <div key={i} className="pb-4 last:pb-0" style={{ borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <p className="text-xs font-semibold mb-1.5 text-white">{q}</p>
              <p className="text-xs leading-relaxed" style={{ color: "#9ca3af" }}>{a}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="max-w-5xl mx-auto py-10 text-center" style={{ color: "#6b7280" }}>Cargando...</div>}>
      <BillingContent />
    </Suspense>
  );
}
