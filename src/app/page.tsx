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
    tag: "CONSTRUYE",
    title: "Construye Agentes",
    desc: "Despliega agentes de IA propios. Desde un agente básico hasta integraciones enterprise completas.",
    items: ["Agentes IA 24/7", "Chat con Claude", "Excel IA + Contenido", "Integraciones avanzadas"],
    color: "#00AAFF",
    cta: "Empezar gratis",
    href: "/register",
  },
  {
    num: "02",
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
    features: ["1 agente IA básico", "20 mensajes/día", "Prompts básicos"],
    cta: "Empezar gratis",
    planId: "free",
    variant: "secondary" as const,
    highlighted: false,
  },
  {
    name: "Starter",
    price: "29€",
    period: "/mes",
    features: ["2 agentes IA completos", "200 conversaciones/mes", "5 workflows n8n", "500 Neurax-Points"],
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
        <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--grad-hero)" }} />
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
            <strong style={{ color: "var(--text-primary)" }}>Construye</strong> agentes IA propios.{" "}
            <strong style={{ color: "var(--text-primary)" }}>Delega</strong> la implementación a expertos.{" "}
            <strong style={{ color: "var(--text-primary)" }}>Automatiza</strong> tu negocio desde hoy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link href="/register">
              <NeonButton size="lg">Empezar gratis →</NeonButton>
            </Link>
            <Link href="/dashboard">
              <NeonButton variant="secondary" size="lg">Ver demo en vivo →</NeonButton>
            </Link>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" as const }}
            className="flex justify-center"
          >
            <NexMascot emotion="happy" size="xl" message="¡Bienvenido a Neuraxis IA! 🚀" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2 Capas de Valor ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0.1)} className="text-center mb-12">
            <h2
              className="text-3xl font-black mb-3"
              style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}
            >
              Un sistema de <GradientText>2 capas de valor</GradientText>
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              Empieza donde estás. Escala cuando quieras.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
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
              Capa 1 — <GradientText>Construye</GradientText>: elige tu plan
            </h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Delega disponible por consulta
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

                <h3 className="font-black text-lg mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
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
                  <span className="text-sm mb-1.5" style={{ color: "var(--text-muted)" }}>{plan.period}</span>
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
            <h2 className="text-3xl font-black mb-4" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
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

      {/* ── Tu web profesional ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0.1)} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5" style={{ background: "rgba(0,170,255,0.08)", color: "var(--neon-blue)", border: "1px solid rgba(0,170,255,0.2)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              Servicio adicional
            </div>
            <h2 className="text-3xl font-black mb-3" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
              Tu negocio merece una web <GradientText>que venda</GradientText>
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              Diseñamos y desarrollamos tu presencia online desde cero. Sin plantillas, sin código, sin complicaciones.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: "✦", title: "Diseño único y a medida", desc: "Cada web es creada desde cero, adaptada a tu marca y pensada para convertir visitantes en clientes.", color: "#00AAFF" },
              { icon: "⬡", title: "SEO desde el primer día", desc: "Optimización técnica incluida: velocidad, estructura, metadatos y contenido indexable desde el lanzamiento.", color: "#A855F7" },
              { icon: "◈", title: "Entrega en 7 días", desc: "Proceso ágil y directo. Sin reuniones interminables, sin sorpresas. Tu web lista en una semana.", color: "#00FF88" },
            ].map((card, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.08 * i)}
                className="p-6 rounded-2xl"
                style={{ background: "var(--bg-card)", border: `1px solid ${card.color}25`, boxShadow: `0 0 20px ${card.color}08` }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-lg font-black" style={{ background: `${card.color}15`, color: card.color }}>
                  {card.icon}
                </div>
                <h3 className="font-black text-base mb-2" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>{card.title}</h3>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{card.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/web">
              <NeonButton size="lg">Ver más sobre este servicio →</NeonButton>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Revly / WhatsApp ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            {...fadeUp(0.1)}
            className="rounded-3xl p-10 md:p-14 text-center"
            style={{ background: "linear-gradient(135deg, rgba(13,148,136,0.12) 0%, rgba(13,148,136,0.04) 100%)", border: "1px solid rgba(13,148,136,0.25)", boxShadow: "0 0 60px rgba(13,148,136,0.08)" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-6" style={{ background: "rgba(13,148,136,0.15)", color: "#0d9488", border: "1px solid rgba(13,148,136,0.3)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              Creado por Neuraxis
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
              Conoce <span style={{ color: "#0d9488" }}>Revly</span> — tu agente de ventas en WhatsApp
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "var(--text-secondary)" }}>
              Responde clientes 24/7, califica leads y cierra ventas mientras duermes. Creado por Neuraxis.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              {["500 conversaciones/mes desde €14.99", "Setup en minutos", "Sin conocimientos técnicos"].map((pill) => (
                <span key={pill} className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: "rgba(13,148,136,0.12)", color: "#0d9488", border: "1px solid rgba(13,148,136,0.25)" }}>
                  {pill}
                </span>
              ))}
            </div>
            <a href="https://revly.app" target="_blank" rel="noopener noreferrer">
              <button
                className="px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider text-white transition-all hover:opacity-90 hover:scale-105"
                style={{ background: "linear-gradient(135deg, #0d9488, #059669)", boxShadow: "0 0 24px rgba(13,148,136,0.4)" }}
              >
                Probar Revly gratis →
              </button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 text-center" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <NeuraxisLogo size="sm" animated={false} className="inline-flex mb-3" />
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          © 2025 Neuraxis IA · Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
}
