"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useStepComplete } from "@/hooks/useStepComplete";

type Tier = { name: string; price: string; features: string[] };
type Currency = "EUR" | "USD" | "GBP";
type Billing = "monthly" | "annual";

const CURRENCY_SYMBOLS: Record<Currency, string> = { EUR: "€", USD: "$", GBP: "£" };

const DEFAULT_TIERS: Tier[] = [
  { name: "Básico", price: "497", features: ["Agente IA configurado", "Integración básica", "Soporte por email"] },
];

type Props = {
  project: {
    id: string;
    current_step: number;
    pricing_tiers?: unknown;
  };
};

function parseSaved(data: unknown): { tiers: Tier[]; currency: Currency; billing: Billing } | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  if (Array.isArray(d.tiers)) return { tiers: d.tiers as Tier[], currency: (d.currency as Currency) ?? "EUR", billing: (d.billing as Billing) ?? "monthly" };
  return null;
}

export default function Step4Pricing({ project }: Props) {
  const saved = parseSaved(project.pricing_tiers);
  const [tiers, setTiers] = useState<Tier[]>(saved?.tiers ?? DEFAULT_TIERS);
  const [currency, setCurrency] = useState<Currency>(saved?.currency ?? "EUR");
  const [billing, setBilling] = useState<Billing>(saved?.billing ?? "monthly");
  const [submitting, setSubmitting] = useState(false);

  const { completeStep } = useStepComplete(project.id, 4, project.current_step);

  const sym = CURRENCY_SYMBOLS[currency];
  const isValid = tiers.every((t) => t.name && t.price && t.features.some((f) => f.trim()));

  // Tier helpers
  const updateTier = (i: number, field: keyof Tier, value: string | string[]) => {
    setTiers((prev) => prev.map((t, idx) => idx === i ? { ...t, [field]: value } : t));
  };
  const addTier = () => {
    if (tiers.length >= 3) return;
    setTiers((prev) => [...prev, { name: "", price: "", features: [""] }]);
  };
  const removeTier = (i: number) => setTiers((prev) => prev.filter((_, idx) => idx !== i));

  // Feature helpers
  const updateFeature = (ti: number, fi: number, value: string) => {
    const updated = [...tiers[ti].features];
    updated[fi] = value;
    updateTier(ti, "features", updated);
  };
  const addFeature = (ti: number) => updateTier(ti, "features", [...tiers[ti].features, ""]);
  const removeFeature = (ti: number, fi: number) => {
    const updated = tiers[ti].features.filter((_, idx) => idx !== fi);
    updateTier(ti, "features", updated.length ? updated : [""]);
  };

  const handleSubmit = async () => {
    if (!isValid) return;
    setSubmitting(true);
    await completeStep({ pricing_tiers: { tiers, currency, billing } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28 }}
      className="max-w-2xl mx-auto space-y-5"
    >
      {/* Back */}
      <Link href="/roadmap" className="inline-flex items-center gap-1.5 text-xs transition-opacity hover:opacity-70" style={{ color: "var(--text-muted)" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
        Volver al roadmap
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold" style={{ background: "#FFD700", color: "#000" }}>4</span>
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-syne, sans-serif)" }}>Pricing y Paquetes</h2>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background: "rgba(255,215,0,0.1)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.25)" }}>+450 XP</span>
        </div>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Diseña tu modelo de precios para clientes</p>
      </div>

      <div className="rounded-2xl p-6 space-y-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>

        {/* Controls */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Billing toggle */}
          <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
            {(["monthly", "annual"] as const).map((b) => (
              <button key={b} onClick={() => setBilling(b)} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{ background: billing === b ? "var(--neon-blue)" : "transparent", color: billing === b ? "#000" : "var(--text-muted)" }}>
                {b === "monthly" ? "Mensual" : "Anual −20%"}
              </button>
            ))}
          </div>

          {/* Currency */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="select-dark text-xs rounded-xl px-3 py-2"
          >
            <option value="EUR">€ EUR</option>
            <option value="USD">$ USD</option>
            <option value="GBP">£ GBP</option>
          </select>
        </div>

        {/* Tiers */}
        <div className="space-y-4">
          <AnimatePresence>
            {tiers.map((tier, ti) => (
              <motion.div
                key={ti}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-xl p-4 space-y-4"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-card)" }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: "rgba(0,170,255,0.1)", color: "var(--neon-blue)", border: "1px solid rgba(0,170,255,0.2)" }}>
                    Tier {ti + 1}
                  </span>
                  {tiers.length > 1 && (
                    <button onClick={() => removeTier(ti)} className="ml-auto text-[10px] transition-opacity hover:opacity-70" style={{ color: "var(--neon-red)" }}>
                      Eliminar tier
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold" style={{ color: "var(--text-muted)" }}>Nombre</label>
                    <input className="input-dark text-sm" placeholder="Básico, Pro, Enterprise..." value={tier.name}
                      onChange={(e) => updateTier(ti, "name", e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold" style={{ color: "var(--text-muted)" }}>
                      Precio {sym} / {billing === "monthly" ? "mes" : "año"}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--text-muted)" }}>{sym}</span>
                      <input className="input-dark text-sm pl-7" type="number" placeholder="497" value={tier.price}
                        onChange={(e) => updateTier(ti, "price", e.target.value)} />
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold" style={{ color: "var(--text-muted)" }}>
                    Features incluidas
                  </label>
                  {tier.features.map((feat, fi) => (
                    <div key={fi} className="flex items-center gap-2">
                      <span style={{ color: "var(--neon-green)", fontSize: 10 }}>✓</span>
                      <input className="input-dark flex-1 text-xs py-1.5" placeholder={`Feature ${fi + 1}...`}
                        value={feat} onChange={(e) => updateFeature(ti, fi, e.target.value)} />
                      {tier.features.length > 1 && (
                        <button onClick={() => removeFeature(ti, fi)} style={{ color: "var(--text-muted)" }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </button>
                      )}
                    </div>
                  ))}
                  <button onClick={() => addFeature(ti)} className="text-[10px] transition-opacity hover:opacity-70" style={{ color: "var(--neon-blue)" }}>
                    + Añadir feature
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {tiers.length < 3 && (
            <button onClick={addTier}
              className="w-full py-3 rounded-xl text-xs font-medium transition-all hover:opacity-80 border-dashed"
              style={{ border: "1px dashed var(--border-neon)", color: "var(--neon-blue)", background: "rgba(0,170,255,0.03)" }}>
              + Añadir tier {tiers.length + 1}
            </button>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <Link href="/roadmap">
          <button className="px-4 py-2 rounded-xl text-sm transition-all hover:opacity-70" style={{ color: "var(--text-muted)", border: "1px solid var(--border-subtle)" }}>
            Cancelar
          </button>
        </Link>
        <button onClick={handleSubmit} disabled={!isValid || submitting}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
          style={{ background: isValid ? "linear-gradient(135deg, #00AAFF, #7C3AED)" : "var(--bg-elevated)", color: isValid ? "#fff" : "var(--text-muted)", boxShadow: isValid ? "0 0 16px rgba(0,170,255,0.3)" : "none" }}>
          {submitting && <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />}
          Completar paso · +450 XP →
        </button>
      </div>
    </motion.div>
  );
}
