"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ── Constants ─────────────────────────────────────────────────────────────────

const BRAND_GRADIENT = "linear-gradient(135deg, #8BC34A 0%, #7B1FA2 50%, #00BCD4 100%)";

const AGENTS = [
  {
    id: "aria",
    name: "ARIA",
    role: "Agente de Ventas",
    model: "GPT-4o",
    status: "active" as const,
    conversations: 48,
    color: "#8BC34A",
    description: "Especialista en calificación de leads y cierre de ventas consultivas para clínicas estéticas.",
    tools: ["Calendly", "CRM", "WhatsApp"],
  },
  {
    id: "nex",
    name: "NEX",
    role: "Soporte 24/7",
    model: "Claude 3.5",
    status: "active" as const,
    conversations: 94,
    color: "#00BCD4",
    description: "Agente de atención al cliente que resuelve dudas frecuentes y escala casos complejos.",
    tools: ["Email", "Telegram", "Notion"],
  },
  {
    id: "luma",
    name: "LUMA",
    role: "Generador de Contenido",
    model: "GPT-4o",
    status: "loading" as const,
    conversations: 12,
    color: "#7B1FA2",
    description: "Crea contenido para redes sociales, blogs y newsletters adaptado al tono de marca.",
    tools: ["Buffer", "Canva API", "WordPress"],
  },
];

interface AgentCardProps {
  agent: (typeof AGENTS)[0];
  onEdit: (id: string) => void;
}

function AgentCard({ agent, onEdit }: AgentCardProps) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col transition-all duration-200"
      style={{
        background: "#111827",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black"
          style={{
            background: `${agent.color}18`,
            border: `1.5px solid ${agent.color}40`,
            color: agent.color,
          }}
        >
          {agent.name[0]}
        </div>
        <div className="flex items-center gap-2">
          {/* Status dot */}
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: agent.status === "active" ? "#8BC34A" : "#6b7280",
              boxShadow: agent.status === "active" ? "0 0 6px rgba(139,195,74,0.7)" : "none",
            }}
          />
          {/* Model badge */}
          <span
            className="text-[10px] font-semibold px-2 py-1 rounded-lg"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.10)" }}
          >
            {agent.model}
          </span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-0.5">{agent.name}</h3>
      <p className="text-sm mb-3" style={{ color: "#9ca3af" }}>{agent.role}</p>
      <p className="text-xs leading-relaxed mb-4" style={{ color: "#6b7280" }}>{agent.description}</p>

      {/* Tools */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {agent.tools.map((tool) => (
          <span
            key={tool}
            className="text-[10px] font-medium px-2 py-1 rounded-lg"
            style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {tool}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between pt-3 mt-auto"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span className="text-xs" style={{ color: "#6b7280" }}>
          {agent.conversations} conversaciones
        </span>
        <div className="flex items-center gap-3">
          <Link
            href={`/agents/${agent.id}`}
            className="text-xs font-semibold transition-colors hover:opacity-80"
            style={{ color: "#00BCD4" }}
          >
            Ver conversaciones
          </Link>
          <button
            onClick={() => onEdit(agent.id)}
            className="text-xs font-medium px-3 py-1.5 rounded-xl transition-all"
            style={{
              border: "1px solid rgba(255,255,255,0.20)",
              color: "rgba(255,255,255,0.7)",
              background: "transparent",
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.40)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)")}
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AgentsPage() {
  const router = useRouter();
  const [creating, setCreating] = useState(false);

  function goCreate() {
    router.push("/agents/create");
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" as const }}
        className="flex items-start justify-between gap-4 flex-wrap"
      >
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Mis <span className="grad-text-brand">Agentes IA</span>
          </h1>
          <p className="text-sm" style={{ color: "#9ca3af" }}>
            {AGENTS.length} agentes configurados · {AGENTS.filter((a) => a.status === "active").length} activos
          </p>
        </div>
        <button
          onClick={goCreate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: BRAND_GRADIENT }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Crear Agente
        </button>
      </motion.div>

      {/* Agents grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {AGENTS.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, ease: "easeOut" as const }}
          >
            <AgentCard agent={agent} onEdit={(id) => console.log("edit", id)} />
          </motion.div>
        ))}

        {/* Add new card */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * AGENTS.length, ease: "easeOut" as const }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={goCreate}
          className="min-h-[220px] rounded-2xl flex flex-col items-center justify-center gap-3 border-2 border-dashed transition-all duration-200"
          style={{ borderColor: "rgba(255,255,255,0.20)", color: "#6b7280" }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = "#00BCD4";
            (e.currentTarget as HTMLElement).style.color = "#00BCD4";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.20)";
            (e.currentTarget as HTMLElement).style.color = "#6b7280";
          }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <span className="text-sm font-medium">Nuevo Agente</span>
        </motion.button>
      </div>

      {/* Create modal placeholder */}
      <AnimatePresence>
        {creating && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
              onClick={() => setCreating(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setCreating(false)}
            >
              <div
                className="w-full max-w-md p-6 rounded-2xl"
                style={{ background: "#111827", border: "1px solid rgba(0,188,212,0.35)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-bold text-white mb-2">
                  Crear nuevo agente
                </h3>
                <p className="text-sm mb-6" style={{ color: "#9ca3af" }}>
                  El wizard de creación de agentes está en desarrollo. Completa el Roadmap → Paso 3 para desbloquearlo.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCreating(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{ border: "1px solid rgba(255,255,255,0.20)", color: "rgba(255,255,255,0.7)" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.40)")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)")}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => { setCreating(false); window.location.href = "/roadmap"; }}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: BRAND_GRADIENT }}
                  >
                    Ir al Roadmap
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
