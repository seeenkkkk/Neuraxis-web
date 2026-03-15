"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import GradientText from "@/components/ui/GradientText";

const STATS = [
  {
    label: "Agentes Activos",
    value: "0",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M8 8H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1M16 8h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1" />
        <path d="M9 14h6l1 6H8l1-6z" />
      </svg>
    ),
  },
  {
    label: "Conversaciones",
    value: "0",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: "Workflows",
    value: "0",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
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
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const QUICK_LINKS = [
  {
    label: "Crear Agente",
    desc: "Configura un nuevo agente IA",
    href: "/agents",
    color: "#00AAFF",
    external: false,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M9 14h6l1 6H8l1-6z" />
      </svg>
    ),
  },
  {
    label: "Mi Web",
    desc: "Tu presencia online profesional",
    href: "/web",
    color: "#A855F7",
    external: false,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    label: "Revly",
    desc: "Tu agente de ventas en WhatsApp",
    href: "https://revly.app",
    color: "#0d9488",
    external: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    label: "Delegar",
    desc: "Implementación por expertos",
    href: "/delegate",
    color: "#00FF88",
    external: false,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

  const today = new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Header */}
      <motion.div {...fadeUp(0)}>
        <h1
          className="text-2xl font-black mb-1"
          style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}
        >
          Hola, <GradientText>{userName || "Arquitecto"}</GradientText> 👋
        </h1>
        <p className="text-sm capitalize mb-1" style={{ color: "var(--text-muted)" }}>
          {today}
        </p>
        <p className="text-sm" style={{ color: "var(--text-muted)", opacity: 0.7 }}>
          Tu agencia IA está creciendo.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div {...fadeUp(0.05)} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="rounded-xl p-4"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center mb-3"
              style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}
            >
              {stat.icon}
            </div>
            <p className="text-2xl font-bold mb-0.5" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
              {stat.value}
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Content row */}
      <div className="grid lg:grid-cols-5 gap-4">

        {/* Activity */}
        <motion.div {...fadeUp(0.1)} className="lg:col-span-3">
          <div className="rounded-xl p-5 h-full" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--text-muted)", fontFamily: "var(--font-syne, sans-serif)" }}>
              Actividad Reciente
            </p>
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ color: "var(--text-muted)", opacity: 0.4 }}>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
              </svg>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Aún no hay actividad</p>
              <p className="text-xs text-center max-w-[180px]" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
                Las acciones que realices aparecerán aquí
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick access */}
        <motion.div {...fadeUp(0.12)} className="lg:col-span-2">
          <div className="rounded-xl p-5 h-full" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--text-muted)", fontFamily: "var(--font-syne, sans-serif)" }}>
              Accesos Rápidos
            </p>
            <div className="space-y-2">
              {QUICK_LINKS.map((link) => {
                const inner = (
                  <>
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${link.color}15`, color: link.color }}>
                      {link.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{link.label}</p>
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{link.desc}</p>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </>
                );
                const sharedStyle = { background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" };
                const sharedClass = "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group";
                return link.external ? (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={sharedClass} style={sharedStyle}>
                    {inner}
                  </a>
                ) : (
                  <Link key={link.href} href={link.href} className={sharedClass} style={sharedStyle}>
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
