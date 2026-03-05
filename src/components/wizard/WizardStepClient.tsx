"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useWizardStore } from "@/store/wizardStore";

type AgentProject = {
  id: string;
  current_step: number;
};

interface WizardStepClientProps {
  step: number;
  project: AgentProject;
}

const STEP_META = [
  { label: "Define el Problema", desc: "¿Qué dolor de negocio resuelve tu agente?", sprint: "Sprint 2" },
  { label: "Enfoque de IA", desc: "¿Qué modelo y arquitectura vas a usar?", sprint: "Sprint 2" },
  { label: "Nicho y Mercado", desc: "Sector, buyer persona y estructura de precios", sprint: "Sprint 2" },
  { label: "Landing Page", desc: "Elige la plataforma para tu página de venta", sprint: "Sprint 2" },
  { label: "Configura tu Agente", desc: "Tipo de agente, nombre y parámetros", sprint: "Sprint 3" },
  { label: "Exportar Agente", desc: "Prompt completo + JSON n8n", sprint: "Sprint 3" },
];

export default function WizardStepClient({ step, project }: WizardStepClientProps) {
  const { loadProject, setCurrentStep } = useWizardStore();

  useEffect(() => {
    void loadProject(project.id);
    setCurrentStep(step);
  }, [project.id, step, loadProject, setCurrentStep]);

  const meta = STEP_META[step - 1];

  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="rounded-2xl p-8 flex flex-col items-center justify-center gap-6 min-h-[340px]"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-card)",
      }}
    >
      {/* Step badge */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
        style={{
          background: "rgba(0,170,255,0.08)",
          border: "1px solid var(--border-neon)",
          color: "var(--neon-blue)",
        }}
      >
        <span
          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
          style={{ background: "var(--neon-blue)", color: "#000" }}
        >
          {step}
        </span>
        {meta?.sprint ?? ""}
      </div>

      {/* Title */}
      <div className="text-center space-y-2">
        <h2
          className="text-xl font-bold"
          style={{
            color: "var(--text-primary)",
            fontFamily: "var(--font-syne, sans-serif)",
          }}
        >
          {meta?.label ?? `Paso ${step}`}
        </h2>
        <p className="text-sm max-w-xs" style={{ color: "var(--text-secondary)" }}>
          {meta?.desc}
        </p>
      </div>

      {/* Placeholder construction banner */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{
          background: "rgba(255,215,0,0.05)",
          border: "1px solid rgba(255,215,0,0.2)",
        }}
      >
        <span className="text-lg">🚧</span>
        <div>
          <p className="text-xs font-semibold" style={{ color: "#FFD700" }}>
            En construcción — {meta?.sprint}
          </p>
          <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
            La UI de este paso llegará en el siguiente sprint
          </p>
        </div>
      </div>
    </motion.div>
  );
}
