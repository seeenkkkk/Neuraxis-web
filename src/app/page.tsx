"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import NeuraxisLogo from "@/components/brand/NeuraxisLogo";
import NexMascot from "@/components/brand/NexMascot";
import NeonButton from "@/components/ui/NeonButton";
import NeonBadge from "@/components/ui/NeonBadge";
import GradientText from "@/components/ui/GradientText";

const FEATURES = [
  { icon: "🤖", title: "Agentes IA", desc: "Automatiza ventas, soporte y onboarding con agentes 24/7" },
  { icon: "⚡", title: "Workflows n8n", desc: "10+ automatizaciones listas para desplegar en minutos" },
  { icon: "🎓", title: "Academia", desc: "Roadmap de 6 pasos para construir tu agencia de IA" },
  { icon: "📊", title: "Excel IA", desc: "Genera reportes y análisis con inteligencia artificial" },
  { icon: "📅", title: "Calendly Pro", desc: "Gestión de citas integrada con tus agentes de ventas" },
  { icon: "⭐", title: "Neurax-Points", desc: "Sistema de XP gamificado para acelerar tu aprendizaje" },
];

const PLANS = [
  {
    name: "Free",
    price: "0€",
    period: "/mes",
    features: ["1 agente IA", "50 conversaciones/mes", "3 workflows", "Academia básica"],
    cta: "Empezar gratis",
    variant: "secondary" as const,
    highlighted: false,
  },
  {
    name: "Pro",
    price: "17€",
    period: "/mes",
    features: ["5 agentes IA", "500 conversaciones/mes", "Workflows ilimitados", "Academia completa", "850 Neurax-Points"],
    cta: "Comenzar Pro",
    variant: "primary" as const,
    highlighted: true,
  },
  {
    name: "Premium",
    price: "30€",
    period: "/mes",
    features: ["Agentes ilimitados", "Conversaciones ilimitadas", "Workflows premium", "Soporte prioritario", "2000 Neurax-Points"],
    cta: "Ir Premium",
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
        style={{ background: "rgba(13,13,20,0.85)", borderBottom: "1px solid var(--border-subtle)", backdropFilter: "blur(20px)" }}
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
            Agentes IA, workflows n8n, academia gamificada y herramientas de automatización.
            Todo lo que necesitas para escalar tu agencia de inteligencia artificial.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link href="/register">
              <NeonButton size="lg">Empezar gratis →</NeonButton>
            </Link>
            <Link href="/dashboard">
              <NeonButton variant="secondary" size="lg">Ver demo en vivo</NeonButton>
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

      {/* ── Features ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0.1)} className="text-center mb-12">
            <h2
              className="text-3xl font-black mb-3"
              style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}
            >
              Todo lo que necesita tu <GradientText>agencia de IA</GradientText>
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              Una plataforma completa. Sin dispersión.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.05 * i)}
                className="p-5 rounded-2xl border group transition-all duration-200 hover:-translate-y-1"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-card)",
                }}
              >
                <span className="text-3xl mb-3 block">{feat.icon}</span>
                <h3
                  className="font-bold mb-1.5"
                  style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}
                >
                  {feat.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plans ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp(0.1)} className="text-center mb-12">
            <h2
              className="text-3xl font-black mb-3"
              style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}
            >
              Planes simples y <GradientText>transparentes</GradientText>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
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

                <Link href="/register" className="block">
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
