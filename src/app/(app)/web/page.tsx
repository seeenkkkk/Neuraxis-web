"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import GradientText from "@/components/ui/GradientText";
import NeonButton from "@/components/ui/NeonButton";
import NeonBadge from "@/components/ui/NeonBadge";

const PLANS = [
  {
    name: "Landing Page",
    price: "497€",
    period: "única",
    features: [
      "1 página de aterrizaje",
      "Diseño premium a medida",
      "SEO técnico básico",
      "Formulario de contacto",
      "Adaptado a móvil",
      "Entrega en 7 días",
    ],
    color: "#00AAFF",
    highlighted: false,
    cta: "Solicitar Landing",
  },
  {
    name: "Web Corporativa",
    price: "997€",
    period: "única",
    features: [
      "Hasta 5 páginas",
      "Diseño premium a medida",
      "Blog integrado",
      "Formulario de contacto",
      "SEO completo",
      "Adaptado a móvil",
      "Entrega en 7 días",
    ],
    color: "#A855F7",
    highlighted: true,
    cta: "Solicitar Web Corporativa",
  },
  {
    name: "Ecommerce",
    price: "1.997€",
    period: "única",
    features: [
      "Tienda online completa",
      "Pasarela de pago integrada",
      "Gestión de productos",
      "Panel de administración",
      "SEO para ecommerce",
      "Soporte post-lanzamiento",
    ],
    color: "#00FF88",
    highlighted: false,
    cta: "Solicitar Ecommerce",
  },
];

const FEATURES = [
  { icon: "✦", title: "Sin plantillas", desc: "Todo diseñado desde cero para tu marca. Nunca usamos temas prediseñados." },
  { icon: "⬡", title: "SEO incluido", desc: "Optimización técnica, velocidad y estructura desde el primer commit." },
  { icon: "◈", title: "7 días de entrega", desc: "Proceso ágil, comunicación directa. Sin sorpresas ni retrasos." },
  { icon: "⟐", title: "Soporte post-entrega", desc: "30 días de soporte incluido tras el lanzamiento de tu web." },
];

const WA_NUMBER = "34TUNUMERO";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=Hola,%20me%20interesa%20una%20web%20profesional%20con%20Neuraxis`;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: "easeOut" as const },
});

export default function WebPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-16">

      {/* ── Hero ── */}
      <motion.div {...fadeUp(0)} className="text-center pt-6">
        <NeonBadge color="blue" dot className="mb-5">
          Servicio de desarrollo web
        </NeonBadge>
        <h1
          className="text-4xl md:text-5xl font-black mb-5 leading-tight"
          style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}
        >
          Tu web profesional <GradientText>en 7 días</GradientText>
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "var(--text-secondary)" }}>
          Diseñamos y desarrollamos tu presencia online desde cero. Sin plantillas, sin código, sin complicaciones.
          Tú enfócate en tu negocio — nosotros nos encargamos de todo.
        </p>
        <a href={WA_URL} target="_blank" rel="noopener noreferrer">
          <NeonButton size="lg">Solicitar presupuesto →</NeonButton>
        </a>
      </motion.div>

      {/* ── Features ── */}
      <motion.div {...fadeUp(0.08)} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURES.map((f, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-lg font-black"
              style={{ background: "rgba(0,170,255,0.1)", color: "var(--neon-blue)" }}
            >
              {f.icon}
            </div>
            <p className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)", fontFamily: "var(--font-syne, sans-serif)" }}>
              {f.title}
            </p>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{f.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* ── Plans ── */}
      <div>
        <motion.div {...fadeUp(0.1)} className="text-center mb-10">
          <h2
            className="text-3xl font-black mb-3"
            style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}
          >
            Elige tu <GradientText>tipo de web</GradientText>
          </h2>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Precio único sin mensualidades · Hosting no incluido
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.06 * i)}
              className="p-7 rounded-2xl flex flex-col relative"
              style={{
                background: "var(--bg-card)",
                border: `1px solid ${plan.highlighted ? plan.color + "50" : "var(--border-card)"}`,
                boxShadow: plan.highlighted ? `0 0 30px ${plan.color}15` : "none",
              }}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <NeonBadge color="purple">Más popular</NeonBadge>
                </div>
              )}

              <div className="mb-5">
                <h3
                  className="text-lg font-black mb-3"
                  style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}
                >
                  {plan.name}
                </h3>
                <div className="flex items-end gap-1.5">
                  <span
                    className="text-4xl font-black"
                    style={{
                      fontFamily: "var(--font-syne, sans-serif)",
                      background: plan.highlighted ? `linear-gradient(135deg, ${plan.color}, #00AAFF)` : undefined,
                      WebkitBackgroundClip: plan.highlighted ? "text" : undefined,
                      WebkitTextFillColor: plan.highlighted ? "transparent" : undefined,
                      color: plan.highlighted ? undefined : "var(--text-primary)",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-sm mb-1.5" style={{ color: "var(--text-muted)" }}>
                    pago {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a href={WA_URL} target="_blank" rel="noopener noreferrer">
                <button
                  className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                  style={{
                    background: plan.highlighted ? `linear-gradient(135deg, ${plan.color}90, #00AAFF90)` : "var(--bg-elevated)",
                    color: plan.highlighted ? "#fff" : "var(--text-secondary)",
                    border: `1px solid ${plan.highlighted ? plan.color + "50" : "var(--border-card)"}`,
                  }}
                >
                  {plan.cta} →
                </button>
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Doubts / Contact ── */}
      <motion.div
        {...fadeUp(0.1)}
        className="rounded-2xl p-8 text-center"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}
      >
        <p className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)", fontFamily: "var(--font-syne, sans-serif)" }}>
          ¿Tienes dudas? Habla con nosotros
        </p>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          Cuéntanos tu proyecto y te respondemos en menos de 24h. Sin compromiso.
        </p>
        <a href={WA_URL} target="_blank" rel="noopener noreferrer">
          <button
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-black text-sm text-white transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", boxShadow: "0 0 24px rgba(37,211,102,0.3)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Hablar por WhatsApp →
          </button>
        </a>
      </motion.div>

      {/* ── Final CTA ── */}
      <motion.div {...fadeUp(0.12)} className="text-center">
        <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
          También puedes ver el resto de servicios de Neuraxis
        </p>
        <Link href="/dashboard">
          <NeonButton variant="secondary">Volver al dashboard →</NeonButton>
        </Link>
      </motion.div>

    </div>
  );
}
