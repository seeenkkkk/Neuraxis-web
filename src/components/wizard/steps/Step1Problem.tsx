"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useStepComplete } from "@/hooks/useStepComplete";

const PAIN_TAGS = [
  "Pierdo tiempo en tareas repetitivas",
  "Mi equipo no escala",
  "No tengo sistema de ventas",
  "Atención al cliente lenta",
  "No genero contenido suficiente",
];

type Props = {
  project: {
    id: string;
    current_step: number;
    problem_statement?: string | null;
    pain_tags?: string[] | null;
  };
};

export default function Step1Problem({ project }: Props) {
  const [statement, setStatement] = useState(project.problem_statement ?? "");
  const [tags, setTags] = useState<string[]>(project.pain_tags ?? []);
  const [submitting, setSubmitting] = useState(false);
  const { completeStep } = useStepComplete(project.id, 1, project.current_step);

  const isValid = statement.trim().length >= 50;

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (!isValid) return;
    setSubmitting(true);
    await completeStep({ problem_statement: statement.trim(), pain_tags: tags });
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
            style={{ background: "var(--neon-green)", color: "#000" }}
          >
            1
          </span>
          <h2
            className="text-lg font-bold"
            style={{ color: "var(--text-primary)", fontFamily: "var(--font-syne, sans-serif)" }}
          >
            Identificar el Problema
          </h2>
        </div>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Define el dolor específico que tu agente IA va a resolver
        </p>
      </div>

      {/* Form card */}
      <div
        className="rounded-2xl p-6 space-y-6"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}
      >
        {/* Textarea */}
        <div className="space-y-2">
          <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
            ¿Qué problema resuelves con tu agente?
          </label>
          <textarea
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            placeholder="Ej: Mis clientes tardan días en recibir respuesta porque el equipo de soporte está saturado. Perdemos leads porque nadie los contacta en las primeras 24h..."
            rows={5}
            className="input-dark resize-none"
            style={{ lineHeight: 1.6 }}
          />
          <div className="flex items-center justify-between">
            <p className="text-[10px]" style={{ color: isValid ? "var(--neon-green)" : "var(--text-muted)" }}>
              {statement.length}/50 caracteres mínimo
            </p>
            {!isValid && statement.length > 0 && (
              <p className="text-[10px]" style={{ color: "var(--neon-orange)" }}>
                Necesitas {50 - statement.length} caracteres más
              </p>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-3">
          <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
            Pain points relacionados{" "}
            <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(selecciona los que aplican)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {PAIN_TAGS.map((tag) => {
              const selected = tags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className="text-xs px-3 py-1.5 rounded-lg border transition-all duration-150"
                  style={{
                    background: selected ? "rgba(0,255,136,0.08)" : "var(--bg-elevated)",
                    border: `1px solid ${selected ? "rgba(0,255,136,0.4)" : "var(--border-subtle)"}`,
                    color: selected ? "var(--neon-green)" : "var(--text-secondary)",
                  }}
                >
                  {selected ? "✓ " : ""}{tag}
                </button>
              );
            })}
          </div>
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
