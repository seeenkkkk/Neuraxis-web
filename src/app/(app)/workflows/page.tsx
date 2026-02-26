"use client";

import { motion } from "framer-motion";
import NeonCard from "@/components/ui/NeonCard";
import NeonBadge from "@/components/ui/NeonBadge";
import NeonButton from "@/components/ui/NeonButton";
import GradientText from "@/components/ui/GradientText";
import StatusDot from "@/components/ui/StatusDot";

const WORKFLOWS = [
  { id: 1, name: "Lead Capture → CRM",       triggers: 142, status: "active"   as const, category: "Ventas",     color: "#00AAFF" },
  { id: 2, name: "Onboarding Automatizado",  triggers: 38,  status: "active"   as const, category: "Clientes",   color: "#00FF88" },
  { id: 3, name: "Nurture Email Sequence",   triggers: 89,  status: "active"   as const, category: "Marketing",  color: "#A855F7" },
  { id: 4, name: "Reporte Semanal IA",       triggers: 12,  status: "loading"  as const, category: "Reportes",   color: "#FFD700" },
  { id: 5, name: "Agenda Calendly → Notion", triggers: 27,  status: "inactive" as const, category: "Calendly",   color: "#FF6B35" },
];

const TEMPLATES = [
  { name: "Lead Magnet Funnel",      nodes: 8,  category: "Ventas"   },
  { name: "Soporte con IA",          nodes: 12, category: "Soporte"  },
  { name: "Newsletter Automatizado", nodes: 6,  category: "Contenido"},
];

export default function WorkflowsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" as const }}
        className="flex items-start justify-between gap-4 flex-wrap"
      >
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
            <GradientText>Workflows</GradientText> n8n
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Automatizaciones activas en tu agencia
          </p>
        </div>
        <NeonButton>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nuevo Workflow
        </NeonButton>
      </motion.div>

      {/* Active workflows */}
      <div className="space-y-3">
        {WORKFLOWS.map((wf, i) => (
          <motion.div key={wf.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i, ease: "easeOut" as const }}>
            <NeonCard hover className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${wf.color}15`, border: `1.5px solid ${wf.color}40` }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={wf.color} strokeWidth="1.8">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{wf.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <NeonBadge color="blue" size="sm">{wf.category}</NeonBadge>
                    <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{wf.triggers} ejecuciones</span>
                  </div>
                </div>
                <StatusDot status={wf.status} />
                <NeonButton variant="ghost" size="sm">Editar</NeonButton>
              </div>
            </NeonCard>
          </motion.div>
        ))}
      </div>

      {/* Templates */}
      <div>
        <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-syne, sans-serif)" }}>
          Plantillas disponibles
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {TEMPLATES.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.04, ease: "easeOut" as const }}>
              <NeonCard hover className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <NeonBadge color="purple" size="sm">{t.category}</NeonBadge>
                  <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{t.nodes} nodos</span>
                </div>
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{t.name}</p>
                <NeonButton variant="secondary" size="sm">Usar plantilla</NeonButton>
              </NeonCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
