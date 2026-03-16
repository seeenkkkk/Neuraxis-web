"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

// ── Constants ────────────────────────────────────────────────────────────────

const BRAND_GRADIENT = "linear-gradient(135deg, #8BC34A 0%, #7B1FA2 50%, #00BCD4 100%)";

// ── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  {
    label: "Agentes Activos",
    value: "0",
    color: "#8BC34A",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M8 8H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1M16 8h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1" />
        <path d="M9 14h6l1 6H8l1-6z" />
      </svg>
    ),
  },
  {
    label: "Conversaciones",
    value: "0",
    color: "#00BCD4",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: "Workflows",
    value: "0",
    color: "#7B1FA2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="7" width="6" height="4" rx="1" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <rect x="9" y="13" width="6" height="4" rx="1" />
        <rect x="16" y="7" width="6" height="4" rx="1" />
        <path d="M8 9h1M15 5v2M15 15v2M15 9h1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Clientes",
    value: "0",
    color: "#8BC34A",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const QUICK_ACTIONS = [
  {
    label: "Crear Agente",
    desc: "Configura un nuevo agente IA",
    href: "/agents",
    external: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M9 14h6l1 6H8l1-6z" />
        <path d="M12 2v2M12 14v-2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Mi Web",
    desc: "Tu presencia online profesional",
    href: "/web",
    external: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    label: "Revly",
    desc: "Agente de ventas en WhatsApp",
    href: "https://revly.app",
    external: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    label: "Delegar",
    desc: "Implementación por expertos",
    href: "/delegate",
    external: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: "easeOut" as const },
});

// ── Component ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "";
        setUserName(name.split(" ")[0]);
      }
    });
  }, []);

  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 px-1">

      {/* ── Header ── */}
      <motion.div {...fadeUp(0)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/avatar9.png-removebg-preview.png"
              alt="Avatar"
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              style={{ border: "2px solid rgba(139,195,74,0.4)" }}
            />
            <div>
              <h1 className="text-2xl font-bold text-white mb-0.5">
                Hola, {userName || "Mario"} 👋
              </h1>
              <p className="text-sm capitalize" style={{ color: "#9ca3af" }}>{today}</p>
              <p className="text-sm" style={{ color: "#9ca3af" }}>Tu agencia IA está creciendo.</p>
            </div>
          </div>
          <Link href="/agents">
            <button
              className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-opacity hover:opacity-90"
              style={{ background: BRAND_GRADIENT }}
            >
              + Crear Agente
            </button>
          </Link>
        </div>
      </motion.div>

      {/* ── Stats Grid ── */}
      <motion.div {...fadeUp(0.05)} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="rounded-xl p-5 transition-all duration-200 hover:scale-[1.02]"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
              style={{ background: `${stat.color}18`, color: stat.color }}
            >
              {stat.icon}
            </div>
            <p className="text-3xl font-bold mb-1 text-white">
              {stat.value}
            </p>
            <p className="text-xs font-medium" style={{ color: "#6b7280" }}>{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* ── Content Row ── */}
      <div className="grid lg:grid-cols-5 gap-5">

        {/* Recent Activity */}
        <motion.div {...fadeUp(0.1)} className="lg:col-span-3">
          <div
            className="rounded-xl p-6 h-full"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "#6b7280" }}>
              Actividad Reciente
            </p>

            {/* Empty state */}
            <div className="flex flex-col items-center justify-center py-8 gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/avatar4.png-removebg-preview.png"
                alt="Sin actividad"
                className="w-32 opacity-80"
              />
              <div className="text-center">
                <p className="text-sm font-medium mb-1 text-white">
                  Aún no hay actividad
                </p>
                <p className="text-xs max-w-[200px] leading-relaxed" style={{ color: "#6b7280" }}>
                  ¡Crea tu primer agente para empezar!
                </p>
              </div>
              <Link href="/agents">
                <button
                  className="px-4 py-2 text-xs font-semibold text-white rounded-lg transition-opacity hover:opacity-90 mt-1"
                  style={{ background: BRAND_GRADIENT }}
                >
                  Crear primer agente →
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div {...fadeUp(0.12)} className="lg:col-span-2">
          <div
            className="rounded-xl p-6 h-full"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "#6b7280" }}>
              Accesos Rápidos
            </p>
            <div className="space-y-2">
              {QUICK_ACTIONS.map(action => {
                const inner = (
                  <>
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(139,195,74,0.12)", color: "#8BC34A" }}
                    >
                      {action.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{action.label}</p>
                      <p className="text-xs" style={{ color: "#6b7280" }}>{action.desc}</p>
                    </div>
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "#8BC34A" }}
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </>
                );

                const cls = "flex items-center gap-3 px-3.5 py-3 rounded-xl group transition-all duration-150";
                const sty = {
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                };

                return action.external ? (
                  <a key={action.href} href={action.href} target="_blank" rel="noopener noreferrer"
                    className={cls} style={sty}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,195,74,0.4)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(139,195,74,0.06)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                    }}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link key={action.href} href={action.href} className={cls} style={sty}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,195,74,0.4)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(139,195,74,0.06)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                    }}
                  >
                    {inner}
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
