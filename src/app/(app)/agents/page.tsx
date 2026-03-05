"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import NeonCard from "@/components/ui/NeonCard";
import NeonBadge from "@/components/ui/NeonBadge";
import NeonButton from "@/components/ui/NeonButton";
import StatusDot from "@/components/ui/StatusDot";
import GradientText from "@/components/ui/GradientText";

const AGENTS = [
  {
    id: "aria",
    name: "ARIA",
    role: "Agente de Ventas",
    model: "GPT-4o",
    status: "active" as const,
    conversations: 48,
    color: "#00AAFF",
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
    color: "#A855F7",
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
    color: "#00D4FF",
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
    <NeonCard hover className="p-5">
      <div className="flex items-start justify-between mb-4">
        {/* Avatar */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black"
          style={{
            fontFamily: "var(--font-syne, sans-serif)",
            background: `${agent.color}20`,
            border: `1.5px solid ${agent.color}50`,
            color: agent.color,
            boxShadow: `0 0 16px ${agent.color}25`,
          }}
        >
          {agent.name[0]}
        </div>
        <div className="flex items-center gap-2">
          <StatusDot status={agent.status} />
          <NeonBadge color="purple" size="sm">{agent.model}</NeonBadge>
        </div>
      </div>

      <h3
        className="font-bold text-base mb-0.5"
        style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}
      >
        {agent.name}
      </h3>
      <p className="text-xs mb-3" style={{ color: agent.color }}>
        {agent.role}
      </p>
      <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
        {agent.description}
      </p>

      {/* Tools */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {agent.tools.map((tool) => (
          <NeonBadge key={tool} color="blue" size="sm">{tool}</NeonBadge>
        ))}
      </div>

      {/* Stats */}
      <div
        className="flex items-center justify-between pt-3"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          {agent.conversations} conversaciones
        </span>
        <NeonButton variant="secondary" size="sm" onClick={() => onEdit(agent.id)}>
          Editar
        </NeonButton>
      </div>
    </NeonCard>
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
          <h1
            className="text-2xl font-bold mb-1"
            style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}
          >
            Mis <GradientText>Agentes IA</GradientText>
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {AGENTS.length} agentes configurados · {AGENTS.filter((a) => a.status === "active").length} activos
          </p>
        </div>
        <NeonButton onClick={goCreate}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Crear Agente
        </NeonButton>
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
          className="min-h-[220px] rounded-xl flex flex-col items-center justify-center gap-3 border-2 border-dashed transition-colors"
          style={{ borderColor: "var(--border-card)", color: "var(--text-muted)" }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-card)" }}
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
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-neon)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}
                >
                  Crear nuevo agente
                </h3>
                <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                  El wizard de creación de agentes está en desarrollo. Completa el Roadmap → Paso 3 para desbloquearlo.
                </p>
                <div className="flex gap-2">
                  <NeonButton variant="ghost" onClick={() => setCreating(false)}>
                    Cancelar
                  </NeonButton>
                  <NeonButton onClick={() => { setCreating(false); window.location.href = "/roadmap"; }}>
                    Ir al Roadmap
                  </NeonButton>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
