"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type AgentProject = {
  id: string;
  agent_type?: string | null;
  problem_statement?: string | null;
  niche_sector?: string | null;
  pricing_tiers?: unknown;
  generated_prompt?: string | null;
  n8n_json?: unknown;
};

interface GateScreenProps {
  project: AgentProject;
}

const CHECK_ICON = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SINGLE_FEATURES = [
  "Prompt completo del agente",
  "JSON n8n listo para importar",
  "Agente guardado en tu dashboard",
  "Solo este agente",
];

const STARTER_FEATURES = [
  "Todo lo del pago único incluido",
  "Agentes ilimitados este mes",
  "Agentes de 10€ anteriores desbloqueados",
  "Academia completa",
  "Chat IA con Claude Sonnet",
  "500 Neurax-Points mensuales",
];

export default function GateScreen({ project }: GateScreenProps) {
  const [loadingSingle, setLoadingSingle] = useState(false);
  const [loadingStarter, setLoadingStarter] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async (type: "single" | "starter") => {
    setError("");
    if (type === "single") setLoadingSingle(true);
    else setLoadingStarter(true);

    try {
      const res = await fetch("/api/stripe/wizard-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, agentProjectId: project.id }),
      });
      const data = await res.json() as { url?: string; error?: string };

      if (data.error) throw new Error(data.error);
      if (data.url) window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar el pago");
      setLoadingSingle(false);
      setLoadingStarter(false);
    }
  };

  // ─── Resumen del agente ──────────────────────────────────
  const summaryCards = [
    {
      label: "Problema",
      value: project.problem_statement || "Sin definir",
      icon: "⚡",
    },
    {
      label: "Nicho",
      value: project.niche_sector || "Sin definir",
      icon: "🎯",
    },
    {
      label: "Pricing",
      value: project.pricing_tiers
        ? "Configurado"
        : "Sin definir",
      icon: "💰",
    },
    {
      label: "Tipo de Agente",
      value: project.agent_type || "Sin definir",
      icon: "🤖",
    },
  ];

  const promptPreview =
    project.generated_prompt ||
    "system: Eres un agente de IA especializado en automatizar procesos de negocio. Tu objetivo es ayudar a los usuarios a...\n\nuser: {{input}}\n\nassistant: Basándome en los datos proporcionados, procederé a...";

  const jsonPreview =
    project.n8n_json
      ? JSON.stringify(project.n8n_json, null, 2).slice(0, 280) + "\n..."
      : `{\n  "nodes": [\n    {\n      "type": "n8n-nodes-base.trigger",\n      "parameters": { "path": "/agent-webhook" }\n    },\n    {\n      "type": "n8n-nodes-base.ai",\n      "parameters": { "model": "claude-sonnet-4-6" }\n    }\n  ]\n}`;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* ─── Título ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-1"
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3"
          style={{
            background: "rgba(168,85,247,0.1)",
            border: "1px solid var(--border-purple)",
            color: "#A855F7",
          }}
        >
          🔒 Paso 6 — Exportar Agente
        </div>
        <h2
          className="text-xl font-bold"
          style={{ color: "var(--text-primary)", fontFamily: "var(--font-syne, sans-serif)" }}
        >
          Tu agente está listo
        </h2>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Desbloquea el prompt completo y el JSON de n8n para lanzarlo hoy
        </p>
      </motion.div>

      {/* ─── Resumen del agente (4 cards) ───────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl p-3 flex flex-col gap-1.5"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-card)",
            }}
          >
            <span className="text-lg">{card.icon}</span>
            <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              {card.label}
            </p>
            <p
              className="text-xs font-medium leading-snug line-clamp-2"
              style={{ color: "var(--text-secondary)" }}
            >
              {card.value}
            </p>
          </div>
        ))}
      </motion.div>

      {/* ─── Preview bloqueada ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14 }}
        className="grid sm:grid-cols-2 gap-3"
      >
        {/* Prompt */}
        <div className="relative rounded-xl overflow-hidden" style={{ border: "1px solid var(--border-purple)", boxShadow: "0 0 12px rgba(168,85,247,0.1)" }}>
          <div className="p-3 pb-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "#A855F7" }}>
              Prompt del Agente
            </p>
          </div>
          <pre
            className="text-[10px] leading-relaxed px-3 pb-3 overflow-hidden"
            style={{
              color: "var(--text-secondary)",
              filter: "blur(4px)",
              userSelect: "none",
              whiteSpace: "pre-wrap",
              maxHeight: 140,
              background: "var(--bg-card)",
            }}
          >
            {promptPreview}
          </pre>
          {/* Overlay */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ background: "rgba(13,13,20,0.55)", backdropFilter: "blur(1px)" }}
          >
            <span className="text-2xl">🔒</span>
            <p className="text-[11px] font-semibold" style={{ color: "var(--text-secondary)" }}>
              Desbloquea para copiar
            </p>
          </div>
        </div>

        {/* JSON n8n */}
        <div className="relative rounded-xl overflow-hidden" style={{ border: "1px solid var(--border-purple)", boxShadow: "0 0 12px rgba(168,85,247,0.1)" }}>
          <div className="p-3 pb-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "#A855F7" }}>
              JSON n8n Workflow
            </p>
          </div>
          <pre
            className="text-[10px] leading-relaxed px-3 pb-3 overflow-hidden"
            style={{
              color: "var(--neon-green)",
              filter: "blur(4px)",
              userSelect: "none",
              whiteSpace: "pre-wrap",
              maxHeight: 140,
              background: "var(--bg-card)",
            }}
          >
            {jsonPreview}
          </pre>
          {/* Overlay */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ background: "rgba(13,13,20,0.55)", backdropFilter: "blur(1px)" }}
          >
            <span className="text-2xl">🔒</span>
            <p className="text-[11px] font-semibold" style={{ color: "var(--text-secondary)" }}>
              Desbloquea para importar
            </p>
          </div>
        </div>
      </motion.div>

      {/* ─── Opciones de pago ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid sm:grid-cols-2 gap-4"
      >
        {/* Opción 1: Pago único 10€ */}
        <div
          className="rounded-2xl p-5 flex flex-col gap-4"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-card)",
          }}
        >
          <div>
            <p
              className="text-2xl font-black"
              style={{ color: "var(--text-primary)", fontFamily: "var(--font-syne, sans-serif)" }}
            >
              10€
            </p>
            <p className="text-xs font-medium mt-0.5" style={{ color: "var(--text-muted)" }}>
              Por este agente · Para siempre
            </p>
          </div>

          <ul className="space-y-2 flex-1">
            {SINGLE_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span style={{ color: "var(--neon-green)" }}>{CHECK_ICON}</span>
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  {f}
                </span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => void handleCheckout("single")}
            disabled={loadingSingle || loadingStarter}
            className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-neon)",
              color: "var(--neon-blue)",
            }}
          >
            {loadingSingle && (
              <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
            )}
            Pagar 10€ · Solo este agente
          </button>
        </div>

        {/* Opción 2: Plan Starter 29€ */}
        <div
          className="rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-neon)",
            boxShadow: "var(--glow-blue)",
          }}
        >
          {/* Badge recomendado */}
          <div
            className="absolute top-0 right-0 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-bl-xl rounded-tr-xl"
            style={{
              background: "var(--grad-primary)",
              color: "#fff",
            }}
          >
            Recomendado
          </div>

          <div>
            <p
              className="text-2xl font-black"
              style={{
                background: "var(--grad-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "var(--font-syne, sans-serif)",
              }}
            >
              29€
              <span className="text-base font-medium" style={{ WebkitTextFillColor: "var(--text-muted)" }}>
                /mes
              </span>
            </p>
            <p className="text-xs font-medium mt-0.5" style={{ color: "var(--text-muted)" }}>
              Plan Starter · Cancela cuando quieras
            </p>
          </div>

          <ul className="space-y-2 flex-1">
            {STARTER_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span style={{ color: "var(--neon-blue)" }}>{CHECK_ICON}</span>
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  {f}
                </span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => void handleCheckout("starter")}
            disabled={loadingSingle || loadingStarter}
            className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            style={{
              background: "var(--grad-primary)",
              color: "#fff",
              boxShadow: "0 0 16px rgba(0,170,255,0.3)",
            }}
          >
            {loadingStarter && (
              <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            )}
            Empezar Starter →
          </button>
        </div>
      </motion.div>

      {/* Error */}
      {error && (
        <p
          className="text-xs text-center p-2.5 rounded-xl"
          style={{
            background: "rgba(255,68,68,0.08)",
            border: "1px solid rgba(255,68,68,0.2)",
            color: "var(--neon-red)",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
