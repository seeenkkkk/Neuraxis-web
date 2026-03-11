"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useStepComplete } from "@/hooks/useStepComplete";

const SECTORS = [
  "SaaS", "E-commerce", "Consultoría", "Salud", "Legal",
  "Inmobiliaria", "Educación", "Hostelería", "Finanzas", "Otro",
];

const COMPANY_SIZES = [
  { value: "freelance", label: "Freelance / Solo" },
  { value: "1-10", label: "1–10 empleados" },
  { value: "11-50", label: "11–50 empleados" },
  { value: "51-200", label: "51–200 empleados" },
  { value: "200+", label: "Más de 200" },
];

type Props = {
  project: {
    id: string;
    current_step: number;
    niche_sector?: string | null;
    company_size?: string | null;
    buyer_persona?: string | null;
  };
};

export default function Step3Niche({ project }: Props) {
  const [sector, setSector] = useState(project.niche_sector ?? "");
  const [size, setSize] = useState(project.company_size ?? "");
  const [persona, setPersona] = useState(project.buyer_persona ?? "");
  const [submitting, setSubmitting] = useState(false);
  const { completeStep } = useStepComplete(project.id, 3, project.current_step);

  const isValid = sector && size && persona.trim().length >= 20;

  const handleSubmit = async () => {
    if (!isValid) return;
    setSubmitting(true);
    await completeStep({ niche_sector: sector, company_size: size, buyer_persona: persona.trim() });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28 }}
      className="max-w-2xl mx-auto space-y-5"
    >
      {/* Back */}
      <Link
        href="/roadmap"
        className="inline-flex items-center gap-1.5 text-xs transition-opacity hover:opacity-70"
        style={{ color: "var(--text-muted)" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Volver al roadmap
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold"
            style={{ background: "#9B30FF", color: "#fff" }}
          >
            3
          </span>
          <h2
            className="text-lg font-bold"
            style={{ color: "var(--text-primary)", fontFamily: "var(--font-syne, sans-serif)" }}
          >
            Definir tu Nicho
          </h2>
        </div>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Especialízate para dominar un segmento del mercado
        </p>
      </div>

      <div
        className="rounded-2xl p-6 space-y-6"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}
      >
        {/* Sector */}
        <div className="space-y-3">
          <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
            Sector / Industria
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {SECTORS.map((s) => {
              const selected = sector === s;
              return (
                <button
                  key={s}
                  onClick={() => setSector(s)}
                  className="px-2 py-2 rounded-xl text-xs font-medium transition-all"
                  style={{
                    background: selected ? "rgba(155,48,255,0.12)" : "var(--bg-elevated)",
                    border: `1px solid ${selected ? "#9B30FF" : "var(--border-subtle)"}`,
                    color: selected ? "#9B30FF" : "var(--text-secondary)",
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Company size */}
        <div className="space-y-3">
          <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
            Tamaño de empresa objetivo
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {COMPANY_SIZES.map((cs) => {
              const selected = size === cs.value;
              return (
                <button
                  key={cs.value}
                  onClick={() => setSize(cs.value)}
                  className="px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all"
                  style={{
                    background: selected ? "rgba(155,48,255,0.12)" : "var(--bg-elevated)",
                    border: `1px solid ${selected ? "#9B30FF" : "var(--border-subtle)"}`,
                    color: selected ? "#9B30FF" : "var(--text-secondary)",
                  }}
                >
                  {selected && <span className="mr-1">✓</span>}
                  {cs.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Buyer persona */}
        <div className="space-y-2">
          <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
            ¿A quién le venderías este agente?{" "}
            <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(buyer persona)</span>
          </label>
          <textarea
            value={persona}
            onChange={(e) => setPersona(e.target.value)}
            placeholder="Ej: Dueños de clínicas estéticas con 2-5 empleados, que ya usan Instagram para captar clientes pero no tienen tiempo de responder DMs y pierden reservas..."
            rows={4}
            className="input-dark resize-none"
            style={{ lineHeight: 1.6 }}
          />
          <p className="text-[10px]" style={{ color: persona.trim().length >= 20 ? "var(--neon-green)" : "var(--text-muted)" }}>
            {persona.trim().length}/20 caracteres mínimo
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <Link href="/roadmap">
          <button
            className="px-4 py-2 rounded-xl text-sm transition-all hover:opacity-70"
            style={{ color: "var(--text-muted)", border: "1px solid var(--border-subtle)" }}
          >
            Cancelar
          </button>
        </Link>

        <button
          onClick={handleSubmit}
          disabled={!isValid || submitting}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
          style={{
            background: isValid ? "linear-gradient(135deg, #007AFF, #7B2FFF)" : "var(--bg-elevated)",
            color: isValid ? "#fff" : "var(--text-muted)",
            boxShadow: isValid ? "0 0 16px rgba(0,122,255,0.3)" : "none",
          }}
        >
          {submitting && (
            <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
          )}
          Completar paso →
        </button>
      </div>
    </motion.div>
  );
}
