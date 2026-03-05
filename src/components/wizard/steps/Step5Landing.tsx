"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useStepComplete } from "@/hooks/useStepComplete";

const PLATFORMS = [
  {
    id: "framer",
    name: "Framer",
    desc: "Diseño visual + animaciones premium",
    url: "https://framer.com/templates",
    color: "#00AAFF",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 5h14v7H5zM5 12l7 7 7-7" />
      </svg>
    ),
  },
  {
    id: "webflow",
    name: "Webflow",
    desc: "Control total + CMS integrado",
    url: "https://webflow.com/templates",
    color: "#A855F7",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

type Props = {
  project: {
    id: string;
    current_step: number;
    landing_platform?: string | null;
  };
};

export default function Step5Landing({ project }: Props) {
  const [chosen, setChosen] = useState(project.landing_platform ?? "");
  const [alreadyHave, setAlreadyHave] = useState(project.landing_platform === "skip");
  const [submitting, setSubmitting] = useState(false);

  const { completeStep } = useStepComplete(project.id, 5, project.current_step);

  const handlePlatformClick = (platform: (typeof PLATFORMS)[number]) => {
    setAlreadyHave(false);
    setChosen(platform.id);
    window.open(platform.url, "_blank", "noopener,noreferrer");
  };

  const handleAlreadyHave = () => {
    setAlreadyHave(!alreadyHave);
    if (!alreadyHave) setChosen("skip");
    else setChosen("");
  };

  const isValid = chosen !== "";

  const handleSubmit = async () => {
    if (!isValid) return;
    setSubmitting(true);
    await completeStep({
      landing_platform: chosen,
      landing_redirect_at: chosen !== "skip" ? new Date().toISOString() : null,
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
      <Link href="/roadmap" className="inline-flex items-center gap-1.5 text-xs transition-opacity hover:opacity-70" style={{ color: "var(--text-muted)" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
        Volver al roadmap
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold" style={{ background: "#FF6B35", color: "#fff" }}>5</span>
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-syne, sans-serif)" }}>Landing Page</h2>
                  </div>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Tu escaparate digital — el vendedor 24/7 de tu agente</p>
      </div>

      <div className="rounded-2xl p-6 space-y-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>

        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          Elige la plataforma para crear tu landing page. Se abrirá en una nueva pestaña con las plantillas disponibles.
        </p>

        {/* Platform buttons */}
        <div className="grid sm:grid-cols-2 gap-4">
          {PLATFORMS.map((p) => {
            const isSelected = chosen === p.id && !alreadyHave;
            return (
              <button
                key={p.id}
                onClick={() => handlePlatformClick(p)}
                className="rounded-2xl p-5 text-left flex flex-col gap-4 transition-all duration-200 group"
                style={{
                  background: isSelected ? `${p.color}10` : "var(--bg-elevated)",
                  border: `1.5px solid ${isSelected ? p.color : "var(--border-card)"}`,
                  boxShadow: isSelected ? `0 0 20px ${p.color}25` : "none",
                }}
              >
                <div className="flex items-center justify-between">
                  <span style={{ color: isSelected ? p.color : "var(--text-muted)" }}>{p.icon}</span>
                  <span
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `${p.color}15`, color: p.color }}
                  >
                    Abrir →
                  </span>
                </div>
                <div>
                  <p className="font-bold text-sm mb-0.5" style={{ color: isSelected ? p.color : "var(--text-primary)", fontFamily: "var(--font-syne, sans-serif)" }}>
                    Crear en {p.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{p.desc}</p>
                </div>
                {isSelected && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--neon-green)" }} />
                    <span className="text-[10px]" style={{ color: "var(--neon-green)" }}>Plataforma seleccionada</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Separator */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>o</span>
          <div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
        </div>

        {/* Already have landing */}
        <button
          onClick={handleAlreadyHave}
          className="flex items-center gap-3 w-full p-4 rounded-xl transition-all"
          style={{
            background: alreadyHave ? "rgba(0,255,136,0.06)" : "var(--bg-elevated)",
            border: `1px solid ${alreadyHave ? "rgba(0,255,136,0.35)" : "var(--border-subtle)"}`,
          }}
        >
          <div
            className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
            style={{
              background: alreadyHave ? "var(--neon-green)" : "var(--bg-card)",
              border: `1.5px solid ${alreadyHave ? "var(--neon-green)" : "var(--border-subtle)"}`,
            }}
          >
            {alreadyHave && (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
          <div className="text-left">
            <p className="text-sm font-medium" style={{ color: alreadyHave ? "var(--neon-green)" : "var(--text-primary)" }}>
              Ya tengo una landing page
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Marcar el paso como completado sin redirigir
            </p>
          </div>
        </button>
      </div>

      {/* Info */}
      {chosen && !alreadyHave && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-center px-4 py-2 rounded-xl"
          style={{ background: "rgba(0,170,255,0.05)", color: "var(--text-secondary)", border: "1px solid var(--border-neon)" }}>
          Se ha abierto {PLATFORMS.find((p) => p.id === chosen)?.name} en una nueva pestaña. Cuando termines de crear la landing, marca el paso como completado.
        </motion.p>
      )}

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
          Completar paso →
        </button>
      </div>
    </motion.div>
  );
}
