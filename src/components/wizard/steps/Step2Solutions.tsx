"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useStepComplete } from "@/hooks/useStepComplete";

type Suggestion = {
  title: string;
  description: string;
  approach: string;
};

type Props = {
  project: {
    id: string;
    current_step: number;
    problem_statement?: string | null;
    pain_tags?: string[] | null;
    ai_approach?: string | null;
    ai_suggestions?: unknown;
  };
};

const CARD_COLORS = ["#00AAFF", "#A855F7", "#00FF88"];

export default function Step2Solutions({ project }: Props) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [customIdea, setCustomIdea] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { completeStep } = useStepComplete(project.id, 2, project.current_step);

  // Cargar sugerencias previas o generar nuevas
  useEffect(() => {
    const saved = project.ai_suggestions;
    if (Array.isArray(saved) && (saved as Suggestion[]).length > 0) {
      setSuggestions(saved as Suggestion[]);
      // Restaurar selección previa
      if (project.ai_approach) {
        const idx = (saved as Suggestion[]).findIndex(
          (s) => s.title === project.ai_approach
        );
        if (idx >= 0) setSelected(idx);
        else {
          setUseCustom(true);
          setCustomIdea(project.ai_approach);
        }
      }
      return;
    }

    if (!project.problem_statement) return;
    generateSuggestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateSuggestions = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/wizard/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problem_statement: project.problem_statement,
          pain_tags: project.pain_tags ?? [],
        }),
      });
      const data = (await res.json()) as { suggestions?: Suggestion[]; error?: string };
      if (data.error) throw new Error(data.error);
      if (data.suggestions) setSuggestions(data.suggestions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al generar sugerencias");
    } finally {
      setLoading(false);
    }
  };

  const chosenApproach = useCustom
    ? customIdea.trim()
    : selected !== null
    ? suggestions[selected]?.title
    : "";

  const isValid = chosenApproach.length > 0;

  const handleSubmit = async () => {
    if (!isValid) return;
    setSubmitting(true);
    await completeStep({
      ai_approach: chosenApproach,
      ai_suggestions: suggestions,
    });
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
            style={{ background: "var(--neon-blue)", color: "#000" }}
          >
            2
          </span>
          <h2
            className="text-lg font-bold"
            style={{ color: "var(--text-primary)", fontFamily: "var(--font-syne, sans-serif)" }}
          >
            Soluciones con IA
          </h2>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-md"
            style={{ background: "rgba(255,215,0,0.1)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.25)" }}
          >
            +400 XP
          </span>
        </div>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Elige el enfoque de IA para resolver el problema
        </p>
      </div>

      {/* Problem context */}
      {project.problem_statement && (
        <div
          className="rounded-xl px-4 py-3"
          style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
        >
          <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
            Problema del paso 1
          </p>
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>
            {project.problem_statement}
          </p>
        </div>
      )}

      {/* Suggestions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
            Sugerencias generadas por IA
          </label>
          {!loading && suggestions.length > 0 && (
            <button
              onClick={() => void generateSuggestions()}
              className="text-[10px] transition-opacity hover:opacity-70"
              style={{ color: "var(--neon-blue)" }}
            >
              ↻ Regenerar
            </button>
          )}
        </div>

        {/* Loading skeleton */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl p-4 animate-shimmer"
                  style={{ height: 88, background: "var(--bg-elevated)", border: "1px solid var(--border-card)" }}
                />
              ))}
            </motion.div>
          )}

          {!loading && suggestions.length > 0 && (
            <motion.div key="suggestions" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              {suggestions.map((s, i) => {
                const color = CARD_COLORS[i];
                const isSelected = selected === i && !useCustom;
                return (
                  <button
                    key={i}
                    onClick={() => { setSelected(i); setUseCustom(false); }}
                    className="w-full rounded-2xl p-4 text-left transition-all duration-150"
                    style={{
                      background: isSelected ? `${color}10` : "var(--bg-elevated)",
                      border: `1px solid ${isSelected ? color + "60" : "var(--border-card)"}`,
                      boxShadow: isSelected ? `0 0 16px ${color}20` : "none",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5"
                        style={{
                          background: isSelected ? color : "var(--bg-card)",
                          border: `1.5px solid ${isSelected ? color : "var(--border-subtle)"}`,
                          color: isSelected ? "#000" : "var(--text-muted)",
                        }}
                      >
                        {isSelected ? "✓" : i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold mb-0.5" style={{ color: isSelected ? color : "var(--text-primary)" }}>
                          {s.title}
                        </p>
                        <p className="text-xs leading-relaxed mb-1" style={{ color: "var(--text-secondary)" }}>
                          {s.description}
                        </p>
                        <p
                          className="text-[10px] px-2 py-0.5 rounded-md inline-block"
                          style={{
                            background: `${color}15`,
                            color,
                            border: `1px solid ${color}30`,
                          }}
                        >
                          {s.approach}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {error && !loading && (
          <p className="text-xs p-3 rounded-xl" style={{ background: "rgba(255,68,68,0.08)", color: "var(--neon-red)", border: "1px solid rgba(255,68,68,0.2)" }}>
            {error} —{" "}
            <button onClick={() => void generateSuggestions()} className="underline">
              Reintentar
            </button>
          </p>
        )}

        {/* Custom idea */}
        <div className="space-y-2">
          <button
            onClick={() => { setUseCustom(!useCustom); setSelected(null); }}
            className="flex items-center gap-2 text-xs transition-opacity hover:opacity-80"
            style={{ color: useCustom ? "var(--neon-purple)" : "var(--text-muted)" }}
          >
            <div
              className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
              style={{
                background: useCustom ? "rgba(168,85,247,0.15)" : "var(--bg-elevated)",
                border: `1px solid ${useCustom ? "#A855F7" : "var(--border-subtle)"}`,
              }}
            >
              {useCustom && <span style={{ color: "#A855F7", fontSize: 8 }}>✓</span>}
            </div>
            Tengo otra idea propia
          </button>

          <AnimatePresence>
            {useCustom && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <input
                  className="input-dark"
                  placeholder="Describe tu idea de solución con IA..."
                  value={customIdea}
                  onChange={(e) => setCustomIdea(e.target.value)}
                  autoFocus
                />
              </motion.div>
            )}
          </AnimatePresence>
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
            background: isValid ? "linear-gradient(135deg, #00AAFF, #7C3AED)" : "var(--bg-elevated)",
            color: isValid ? "#fff" : "var(--text-muted)",
            boxShadow: isValid ? "0 0 16px rgba(0,170,255,0.3)" : "none",
          }}
        >
          {submitting && (
            <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
          )}
          Completar paso · +400 XP →
        </button>
      </div>
    </motion.div>
  );
}
