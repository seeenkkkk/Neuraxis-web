"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import NeuraxisLogo from "@/components/brand/NeuraxisLogo";
import NexMascot from "@/components/brand/NexMascot";
import NeonButton from "@/components/ui/NeonButton";
import NeonBadge from "@/components/ui/NeonBadge";
import GradientText from "@/components/ui/GradientText";

const LAYERS = [
  {
    num: "01",
    tag: "APRENDE",
    title: "Aprende IA",
    desc: "Cursos, prompts y workflows listos para usar. Aprende a tu ritmo con un roadmap gamificado.",
    items: ["Cursos de IA paso a paso", "50+ prompts premium", "Workflows n8n listos", "Neurax-Points & certificados"],
    color: "#9B30FF",
    cta: "Ver cursos",
    href: "/register",
  },
  {
    num: "02",
    tag: "CONSTRUYE",
    title: "Construye Agentes",
    desc: "Despliega agentes de IA propios. Desde un agente básico hasta integraciones enterprise completas.",
    items: ["Agentes IA 24/7", "Chat con Claude", "Excel IA + Contenido", "Integraciones avanzadas"],
    color: "#007AFF",
    cta: "Empezar gratis",
    href: "/register",
  },
  {
    num: "03",
    tag: "DELEGA",
    title: "Delega a Expertos",
    desc: "Implementación llave en mano. Nuestro equipo construye, configura y mantiene tu sistema de IA.",
    items: ["Consultoría estratégica", "Setup completo con agentes", "Integraciones a medida", "Soporte dedicado"],
    color: "#00FF88",
    cta: "Hablar con equipo",
    href: "/register",
  },
];

const PLANS = [
  {
    name: "Free",
    price: "0€",
    period: "/mes",
    features: ["1 agente IA básico", "20 mensajes/día", "Acceso a Aprende (fundamentos)", "Prompts básicos"],
    cta: "Empezar gratis",
    planId: "free",
    variant: "secondary" as const,
    highlighted: false,
  },
  {
    name: "Starter",
    price: "29€",
    period: "/mes",
    features: ["2 agentes IA completos", "200 conversaciones/mes", "5 workflows n8n", "Aprende completo", "500 Neurax-Points"],
    cta: "Empezar Starter",
    planId: "starter",
    variant: "secondary" as const,
    highlighted: false,
  },
  {
    name: "Pro",
    price: "99€",
    period: "/mes",
    features: ["10 agentes con integraciones", "2.000 conversaciones/mes", "Workflows ilimitados", "Chat IA con Claude", "2.000 Neurax-Points"],
    cta: "Comenzar Pro",
    planId: "pro",
    variant: "primary" as const,
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "299€",
    period: "/mes",
    features: ["Agentes IA ilimitados", "Conversaciones ilimitadas", "Implementación completa", "API acceso total", "Soporte 24/7 dedicado"],
    cta: "Ir Enterprise",
    planId: "agency",
    variant: "primary" as const,
    highlighted: false,
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-root)" }}>
      {/* ── Navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14"
        style={{ background: "rgba(255,255,255,0.85)", borderBottom: "1px solid var(--border-subtle)", backdropFilter: "blur(20px)" }}
      >
        <NeuraxisLogo size="sm" animated />
        <div className="flex items-center gap-3">
          <Link href="/login">
            <NeonButton variant="ghost" size="sm">Iniciar sesión</NeonButton>
          </Link>
          <Link href="/register">
            <NeonButton size="sm">Empezar gratis</NeonButton>
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-24 px-6 text-center overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-hero)" }}
        />
        {/* Hex grid */}
        <div className="absolute inset-0 hex-grid-bg opacity-40 pointer-events-none" />

        <motion.div {...fadeUp(0)} className="relative z-10 max-w-3xl mx-auto">
          <NeonBadge color="cyan" dot className="mb-6">
            Plataforma SaaS de IA para Agencias
          </NeonBadge>

          <h1
            className="text-4xl md:text-6xl font-black mb-6 leading-tight"
            style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}
          >
            Construye tu <GradientText>Agencia de IA</GradientText>{" "}
            en tiempo récord
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            <strong style={{ color: "var(--text-primary)" }}>Aprende</strong> con cursos y prompts.{" "}
            <strong style={{ color: "var(--text-primary)" }}>Construye</strong> agentes IA propios.{" "}
            <strong style={{ color: "var(--text-primary)" }}>Delega</strong> la implementación a expertos.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link href="/register">
              <NeonButton size="lg">Empezar gratis →</NeonButton>
            </Link>
            <Link href="/dashboard">
              <NeonButton variant="secondary" size="lg">Ver demo en vivo →</NeonButton>
            </Link>
          </div>

          {/* Mascot */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" as const }}
            className="flex justify-center"
          >
            <NexMascot emotion="happy" size="xl" message="¡Bienvenido a Neuraxis IA! 🚀" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── 3 Capas de Valor ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0.1)} className="text-center mb-12">
            <h2
              className="text-3xl font-black mb-3"
              style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}
            >
              Un sistema de <GradientText>3 capas de valor</GradientText>
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              Empieza donde estás. Escala cuando quieras.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {LAYERS.map((layer, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.08 * i)}
                className="p-6 rounded-2xl flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1"
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid ${layer.color}30`,
                  boxShadow: `0 0 20px ${layer.color}10`,
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2 py-0.5 rounded-md" style={{ background: `${layer.color}20`, color: layer.color }}>
                    {layer.tag}
                  </span>
                  <span className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>{layer.num}</span>
                </div>
                <div>
                  <h3 className="font-black text-lg mb-1.5" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
                    {layer.title}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{layer.desc}</p>
                </div>
                <ul className="space-y-1.5 flex-1">
                  {layer.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                      <span style={{ color: layer.color }} className="font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href={layer.href}>
                  <NeonButton variant="ghost" className="w-full justify-center text-xs" style={{ borderColor: `${layer.color}40`, color: layer.color }}>
                    {layer.cta} →
                  </NeonButton>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plans ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0.1)} className="text-center mb-12">
            <h2
              className="text-3xl font-black mb-3"
              style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}
            >
              Capa 2 — <GradientText>Construye</GradientText>: elige tu plan
            </h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Acceso a Aprende incluido en todos los planes · Delega disponible por consulta
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PLANS.map((plan, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.05 * i)}
                className="p-6 rounded-2xl flex flex-col"
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid ${plan.highlighted ? "var(--border-neon)" : "var(--border-card)"}`,
                  boxShadow: plan.highlighted ? "var(--glow-blue)" : "none",
                  position: "relative",
                }}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <NeonBadge color="blue">Más popular</NeonBadge>
                  </div>
                )}

                <h3
                  className="font-black text-lg mb-1"
                  style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}
                >
                  {plan.name}
                </h3>

                <div className="flex items-end gap-1 mb-5">
                  <span
                    className="text-4xl font-black"
                    style={{
                      background: plan.highlighted ? "var(--grad-primary)" : undefined,
                      WebkitBackgroundClip: plan.highlighted ? "text" : undefined,
                      WebkitTextFillColor: plan.highlighted ? "transparent" : undefined,
                      color: plan.highlighted ? undefined : "var(--text-primary)",
                      fontFamily: "var(--font-syne, sans-serif)",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-sm mb-1.5" style={{ color: "var(--text-muted)" }}>
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href={plan.planId === "free" ? "/register" : "/billing"} className="block">
                  <NeonButton variant={plan.variant} className="w-full justify-center">
                    {plan.cta}
                  </NeonButton>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeUp(0.1)}>
            <h2
              className="text-3xl font-black mb-4"
              style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}
            >
              ¿Listo para construir tu <GradientText>agencia de IA</GradientText>?
            </h2>
            <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
              Únete a cientos de agencias que ya automatizan con Neuraxis IA
            </p>
            <Link href="/register">
              <NeonButton size="lg">Empezar ahora — es gratis →</NeonButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="py-8 px-6 text-center"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        <NeuraxisLogo size="sm" animated={false} className="inline-flex mb-3" />
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          © 2025 Neuraxis IA · Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
}
