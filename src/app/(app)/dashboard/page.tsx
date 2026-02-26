"use client";

import { motion } from "framer-motion";
import NexMascot from "@/components/brand/NexMascot";
import NeonCard from "@/components/ui/NeonCard";
import NeonBadge from "@/components/ui/NeonBadge";
import GradientText from "@/components/ui/GradientText";
import StatusDot from "@/components/ui/StatusDot";

const STATS = [
  { label: "Agentes Activos",    value: "3",    unit: "/ 5",   color: "blue"   as const, icon: "🤖" },
  { label: "Chats este mes",     value: "142",  unit: "conv",  color: "purple" as const, icon: "💬" },
  { label: "Workflows n8n",      value: "7",    unit: "activos", color: "cyan" as const, icon: "⚡" },
  { label: "Neurax-Points",      value: "2,840", unit: "XP",   color: "gold"   as const, icon: "⭐" },
];

const RECENT_ACTIVITY = [
  { text: "Agente ARIA completó flujo de onboarding",  time: "hace 5 min",    color: "blue"   as const },
  { text: "Workflow 'Lead Capture' ejecutado",         time: "hace 23 min",   color: "purple" as const },
  { text: "Academia: Paso 2 completado (+200 XP)",     time: "hace 1h",       color: "green"  as const },
  { text: "Nuevo cliente registrado via Calendly",     time: "hace 2h",       color: "cyan"   as const },
  { text: "Excel IA generó reporte mensual",           time: "hace 3h",       color: "orange" as const },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: "easeOut" as const },
});

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome header */}
      <motion.div {...fadeUp(0)} className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}
          >
            Bienvenido, <GradientText>Admin Neuraxis</GradientText>
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Tu plataforma de inteligencia artificial está operativa
          </p>
        </div>
        <StatusDot status="active" label="Sistema operativo" />
      </motion.div>

      {/* Stats grid */}
      <motion.div {...fadeUp(0.05)} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <NeonCard key={i} hover className="p-4">
            <div className="flex items-start justify-between mb-3">
              <span className="text-xl">{stat.icon}</span>
              <NeonBadge color={stat.color} size="sm">{stat.unit}</NeonBadge>
            </div>
            <p
              className="text-2xl font-bold mb-0.5"
              style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}
            >
              {stat.value}
            </p>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              {stat.label}
            </p>
          </NeonCard>
        ))}
      </motion.div>

      {/* Content row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity feed */}
        <motion.div {...fadeUp(0.1)} className="lg:col-span-2">
          <NeonCard className="p-5">
            <h2
              className="text-sm font-semibold mb-4"
              style={{ color: "var(--text-primary)", fontFamily: "var(--font-syne, sans-serif)" }}
            >
              Actividad Reciente
            </h2>
            <div className="space-y-3">
              {RECENT_ACTIVITY.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, ease: "easeOut" as const }}
                  className="flex items-start gap-3"
                >
                  <StatusDot status="active" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-primary)" }}>
                      {item.text}
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {item.time}
                    </p>
                  </div>
                  <NeonBadge color={item.color} size="sm" dot>•</NeonBadge>
                </motion.div>
              ))}
            </div>
          </NeonCard>
        </motion.div>

        {/* NexMascot + quick actions */}
        <motion.div {...fadeUp(0.12)} className="flex flex-col gap-4">
          {/* Mascot */}
          <NeonCard variant="blue" className="p-5 flex flex-col items-center text-center">
            <NexMascot emotion="waving" size="md" message="¡Todo listo para crear tu próximo agente!" />
          </NeonCard>

          {/* Quick links */}
          <NeonCard className="p-4 space-y-2">
            <p className="text-xs font-semibold mb-3" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-syne, sans-serif)" }}>
              Acceso Rápido
            </p>
            {[
              { label: "Crear Agente", href: "/agents", color: "#00AAFF" },
              { label: "Ver Roadmap",  href: "/roadmap", color: "#A855F7" },
              { label: "Ir a Academia", href: "/academy", color: "#00D4FF" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors"
                style={{
                  color: link.color,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                {link.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            ))}
          </NeonCard>
        </motion.div>
      </div>
    </div>
  );
}
