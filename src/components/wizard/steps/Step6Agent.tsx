"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useStepComplete } from "@/hooks/useStepComplete";

const AGENT_TYPES = [
  { id: "email_outreach",    emoji: "📧", label: "Email Outreach" },
  { id: "chatbot_web",       emoji: "💬", label: "Chatbot Web" },
  { id: "content_writer",    emoji: "📝", label: "Content Writer" },
  { id: "data_analyst",      emoji: "📊", label: "Data Analyst" },
  { id: "lead_qualifier",    emoji: "🔔", label: "Lead Qualifier" },
  { id: "scheduler",         emoji: "📅", label: "Scheduler" },
  { id: "invoice_manager",   emoji: "🧾", label: "Invoice Manager" },
  { id: "research_agent",    emoji: "🔍", label: "Research Agent" },
  { id: "ecommerce_helper",  emoji: "🛒", label: "E-commerce Helper" },
  { id: "social_media",      emoji: "📣", label: "Social Media" },
  { id: "hr_screener",       emoji: "🧑‍💼", label: "HR Screener" },
  { id: "project_manager",   emoji: "🏗️", label: "Project Manager" },
  { id: "onboarding_bot",    emoji: "🎓", label: "Onboarding Bot" },
  { id: "tech_support",      emoji: "🔧", label: "Tech Support" },
  { id: "custom_webhook",    emoji: "⚡", label: "Custom Webhook" },
];

type GeneratedResult = {
  generated_prompt: string;
  n8n_json: unknown;
};

type Props = {
  project: {
    id: string;
    current_step: number;
    agent_type?: string | null;
    generated_prompt?: string | null;
    n8n_json?: unknown;
    problem_statement?: string | null;
    niche_sector?: string | null;
    company_size?: string | null;
    buyer_persona?: string | null;
    ai_approach?: string | null;
    pricing_tiers?: unknown;
  };
  hasAccess: boolean;
};

export default function Step6Agent({ project, hasAccess }: Props) {
  const [selectedType, setSelectedType] = useState(project.agent_type ?? "");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<GeneratedResult | null>(
    project.generated_prompt
      ? { generated_prompt: project.generated_prompt, n8n_json: project.n8n_json }
      : null
  );
  const [genError, setGenError] = useState("");
  const [copied, setCopied] = useState<"prompt" | "json" | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loadingSingle, setLoadingSingle] = useState(false);
  const [loadingStarter, setLoadingStarter] = useState(false);
  const [payError, setPayError] = useState("");

  const { completeStep } = useStepComplete(project.id, 6, project.current_step);

  const handleSelectType = async (typeId: string) => {
    if (!hasAccess) return;
    setSelectedType(typeId);
    setResult(null);
    setGenError("");
    setGenerating(true);

    try {
      const res = await fetch("/api/wizard/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentProjectId: project.id,
          agent_type: typeId,
          problem_statement: project.problem_statement,
          niche_sector: project.niche_sector,
          company_size: project.company_size,
          buyer_persona: project.buyer_persona,
          ai_approach: project.ai_approach,
          pricing_tiers: project.pricing_tiers,
        }),
      });
      const data = (await res.json()) as GeneratedResult & { error?: string };
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setGenError(err instanceof Error ? err.message : "Error al generar");
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = async (type: "prompt" | "json") => {
    if (!result) return;
    const text = type === "prompt"
      ? result.generated_prompt
      : JSON.stringify(result.n8n_json, null, 2);
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result.n8n_json, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedType}_workflow.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePayment = async (type: "single" | "starter") => {
    setPayError("");
    if (type === "single") setLoadingSingle(true);
    else setLoadingStarter(true);

    try {
      const res = await fetch("/api/stripe/wizard-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, agentProjectId: project.id }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.error) throw new Error(data.error);
      if (data.url) window.location.href = data.url;
    } catch (err) {
      setPayError(err instanceof Error ? err.message : "Error al iniciar pago");
      setLoadingSingle(false);
      setLoadingStarter(false);
    }
  };

  const isValid = !!result && !!selectedType;

  const CHECK = (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

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
          <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold" style={{ background: "#7C3AED", color: "#fff" }}>6</span>
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-syne, sans-serif)" }}>Design Core</h2>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background: "rgba(255,215,0,0.1)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.25)" }}>+800 XP</span>
          {!hasAccess && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background: "rgba(168,85,247,0.1)", color: "#A855F7", border: "1px solid var(--border-purple)" }}>
              🔒 Plan de pago
            </span>
          )}
        </div>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Elige el tipo de agente y genera tu prompt + workflow n8n
        </p>
      </div>

      {/* Agent type grid */}
      <div className="rounded-2xl p-5 space-y-4" style={{ background: "var(--bg-card)", border: `1px solid ${hasAccess ? "var(--border-card)" : "var(--border-purple)"}` }}>
        <p className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
          Selecciona el tipo de agente
        </p>

        {/* Relative wrapper for gate overlay */}
        <div className="relative">
          <div
            className="grid grid-cols-3 sm:grid-cols-5 gap-2"
            style={{ filter: hasAccess ? "none" : "blur(3px)", pointerEvents: hasAccess ? "auto" : "none", userSelect: hasAccess ? "auto" : "none" }}
          >
            {AGENT_TYPES.map((agent) => {
              const isSelected = selectedType === agent.id;
              return (
                <button
                  key={agent.id}
                  onClick={() => void handleSelectType(agent.id)}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-150"
                  style={{
                    background: isSelected ? "rgba(124,58,237,0.12)" : "var(--bg-elevated)",
                    border: `1px solid ${isSelected ? "#7C3AED" : "var(--border-subtle)"}`,
                    boxShadow: isSelected ? "0 0 12px rgba(124,58,237,0.25)" : "none",
                  }}
                >
                  <span className="text-xl leading-none">{agent.emoji}</span>
                  <span className="text-[9px] font-medium text-center leading-tight" style={{ color: isSelected ? "#A855F7" : "var(--text-secondary)" }}>
                    {agent.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Gate overlay */}
          {!hasAccess && (
            <div
              className="absolute inset-0 flex items-center justify-center rounded-xl"
              style={{ background: "rgba(13,13,20,0.75)", backdropFilter: "blur(2px)" }}
            >
              <div className="text-center space-y-2">
                <span className="text-3xl">🔒</span>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Desbloquea el paso 6</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Necesitas un plan de pago para elegir</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Generating spinner */}
      <AnimatePresence>
        {generating && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center gap-3 p-4 rounded-2xl"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
            <span className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin flex-shrink-0" style={{ borderColor: "#7C3AED", borderTopColor: "transparent" }} />
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Generando con Claude IA...</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Creando prompt personalizado + workflow n8n</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      {genError && !generating && (
        <p className="text-xs p-3 rounded-xl" style={{ background: "rgba(255,68,68,0.08)", color: "var(--neon-red)", border: "1px solid rgba(255,68,68,0.2)" }}>
          {genError} — <button onClick={() => void handleSelectType(selectedType)} className="underline">Reintentar</button>
        </p>
      )}

      {/* Generated result */}
      <AnimatePresence>
        {result && !generating && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            {/* Prompt */}
            <div className="rounded-2xl p-4 space-y-3" style={{ background: "var(--bg-card)", border: "1px solid var(--border-neon)" }}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--neon-blue)" }}>System Prompt</p>
                <button onClick={() => void handleCopy("prompt")}
                  className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg transition-all"
                  style={{ background: copied === "prompt" ? "rgba(0,255,136,0.1)" : "var(--bg-elevated)", color: copied === "prompt" ? "var(--neon-green)" : "var(--text-secondary)", border: `1px solid ${copied === "prompt" ? "rgba(0,255,136,0.3)" : "var(--border-subtle)"}` }}>
                  {copied === "prompt" ? "✓ Copiado" : "Copiar"}
                </button>
              </div>
              <pre className="text-xs leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto" style={{ color: "var(--text-secondary)", fontFamily: "monospace" }}>
                {result.generated_prompt}
              </pre>
            </div>

            {/* JSON n8n */}
            <div className="rounded-2xl p-4 space-y-3" style={{ background: "var(--bg-card)", border: "1px solid rgba(0,255,136,0.25)" }}>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--neon-green)" }}>JSON n8n Workflow</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => void handleCopy("json")}
                    className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg transition-all"
                    style={{ background: copied === "json" ? "rgba(0,255,136,0.1)" : "var(--bg-elevated)", color: copied === "json" ? "var(--neon-green)" : "var(--text-secondary)", border: `1px solid ${copied === "json" ? "rgba(0,255,136,0.3)" : "var(--border-subtle)"}` }}>
                    {copied === "json" ? "✓ Copiado" : "Copiar"}
                  </button>
                  <button onClick={handleDownload}
                    className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg transition-all"
                    style={{ background: "var(--bg-elevated)", color: "var(--neon-blue)", border: "1px solid var(--border-neon)" }}>
                    Descargar
                  </button>
                </div>
              </div>
              <pre className="text-xs leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto" style={{ color: "var(--neon-green)", fontFamily: "monospace", opacity: 0.85 }}>
                {JSON.stringify(result.n8n_json, null, 2).slice(0, 400)}...
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GATE: pricing comparison (only when no access) */}
      {!hasAccess && (
        <div className="space-y-4">
          <p className="text-xs font-semibold text-center" style={{ color: "var(--text-secondary)" }}>
            Desbloquea el Design Core
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Single */}
            <div className="rounded-2xl p-5 space-y-4" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-card)" }}>
              <div>
                <p className="text-2xl font-black" style={{ color: "var(--text-primary)", fontFamily: "var(--font-syne, sans-serif)" }}>10€</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Solo este agente · Para siempre</p>
              </div>
              <ul className="space-y-1.5">
                {["Prompt completo", "JSON n8n para importar", "Agente en dashboard"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span style={{ color: "var(--neon-green)" }}>{CHECK}</span>
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{f}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => void handlePayment("single")} disabled={loadingSingle || loadingStarter}
                className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-neon)", color: "var(--neon-blue)" }}>
                {loadingSingle && <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />}
                Pagar 10€ →
              </button>
            </div>

            {/* Starter */}
            <div className="rounded-2xl p-5 space-y-4 relative overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border-neon)", boxShadow: "var(--glow-blue)" }}>
              <div className="absolute top-0 right-0 px-3 py-1 text-[10px] font-black uppercase rounded-bl-xl rounded-tr-xl" style={{ background: "var(--grad-primary)", color: "#fff" }}>
                Recomendado
              </div>
              <div>
                <p className="text-2xl font-black" style={{ background: "var(--grad-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "var(--font-syne, sans-serif)" }}>
                  29€<span className="text-base font-medium" style={{ WebkitTextFillColor: "var(--text-muted)" }}>/mes</span>
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Starter · Cancela cuando quieras</p>
              </div>
              <ul className="space-y-1.5">
                {["Agentes ilimitados", "Academia completa", "Chat IA con Claude", "500 Neurax-Points/mes"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span style={{ color: "var(--neon-blue)" }}>{CHECK}</span>
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{f}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => void handlePayment("starter")} disabled={loadingSingle || loadingStarter}
                className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                style={{ background: "var(--grad-primary)", color: "#fff", boxShadow: "0 0 16px rgba(0,170,255,0.3)" }}>
                {loadingStarter && <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />}
                Empezar Starter →
              </button>
            </div>
          </div>
          {payError && <p className="text-xs text-center" style={{ color: "var(--neon-red)" }}>{payError}</p>}
        </div>
      )}

      {/* Actions (only when has access + result) */}
      {hasAccess && (
        <div className="flex justify-between items-center">
          <Link href="/roadmap">
            <button className="px-4 py-2 rounded-xl text-sm transition-all hover:opacity-70" style={{ color: "var(--text-muted)", border: "1px solid var(--border-subtle)" }}>
              Cancelar
            </button>
          </Link>
          <button onClick={() => void completeStep({ agent_type: selectedType }).then(() => setSubmitting(false))} disabled={!isValid || submitting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
            style={{ background: isValid ? "linear-gradient(135deg, #00AAFF, #7C3AED)" : "var(--bg-elevated)", color: isValid ? "#fff" : "var(--text-muted)", boxShadow: isValid ? "0 0 16px rgba(0,170,255,0.3)" : "none" }}>
            {submitting && <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />}
            Completar · +800 XP 🎉
          </button>
        </div>
      )}
    </motion.div>
  );
}
