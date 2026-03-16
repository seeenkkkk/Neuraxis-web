"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// ── Constants ─────────────────────────────────────────────────────────────────

const BRAND_GRADIENT = "linear-gradient(135deg, #8BC34A 0%, #7B1FA2 50%, #00BCD4 100%)";

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
    hoverBorder: "#8BC34A",
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
    hoverBorder: "#00BCD4",
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
    hoverBorder: "#7B1FA2",
    highlighted: false,
    cta: "Solicitar Ecommerce",
  },
];

const FEATURES = [
  { icon: "✦", title: "Sin plantillas", desc: "Todo diseñado desde cero para tu marca. Nunca usamos temas prediseñados.", color: "#8BC34A" },
  { icon: "⬡", title: "SEO incluido", desc: "Optimización técnica, velocidad y estructura desde el primer commit.", color: "#00BCD4" },
  { icon: "◈", title: "7 días de entrega", desc: "Proceso ágil, comunicación directa. Sin sorpresas ni retrasos.", color: "#7B1FA2" },
  { icon: "⟐", title: "Soporte post-entrega", desc: "30 días de soporte incluido tras el lanzamiento de tu web.", color: "#8BC34A" },
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
      <motion.div {...fadeUp(0)} className="pt-4">
        <div className="flex items-start justify-between gap-6">
          <div>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-5"
              style={{ background: "rgba(0,188,212,0.12)", color: "#00BCD4", border: "1px solid rgba(0,188,212,0.25)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#00BCD4", boxShadow: "0 0 4px rgba(0,188,212,0.8)" }} />
              Servicio de desarrollo web
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-5 leading-tight">
              <span className="grad-text-brand">Crea tu Web con IA</span>
            </h1>
            <p className="text-lg max-w-xl mb-8" style={{ color: "#9ca3af" }}>
              Diseñamos y desarrollamos tu presencia online desde cero. Sin plantillas, sin código, sin complicaciones.
              Tú enfócate en tu negocio — nosotros nos encargamos de todo.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer">
              <button
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: BRAND_GRADIENT }}
              >
                Solicitar presupuesto →
              </button>
            </a>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/avatar1.png.png"
            alt=""
            className="w-28 flex-shrink-0 nex-float hidden md:block"
          />
        </div>
      </motion.div>

      {/* ── Features ── */}
      <motion.div {...fadeUp(0.08)} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURES.map((f, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 transition-all duration-200"
            style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.08)" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-lg font-black"
              style={{ background: `${f.color}15`, color: f.color }}
            >
              {f.icon}
            </div>
            <p className="text-sm font-bold mb-1 text-white">{f.title}</p>
            <p className="text-xs" style={{ color: "#9ca3af" }}>{f.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* ── Plans ── */}
      <div>
        <motion.div {...fadeUp(0.1)} className="text-center mb-10">
          <h2 className="text-3xl font-black mb-3">
            Elige tu <span className="grad-text-brand">tipo de web</span>
          </h2>
          <p className="text-sm" style={{ color: "#9ca3af" }}>
            Precio único sin mensualidades · Hosting no incluido
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.06 * i)}
              className="rounded-2xl p-7 flex flex-col relative transition-all duration-200"
              style={{
                background: "#111827",
                border: plan.highlighted ? `2px solid ${plan.hoverBorder}` : "1px solid rgba(255,255,255,0.08)",
                boxShadow: plan.highlighted ? `0 0 30px ${plan.hoverBorder}18` : "none",
              }}
              onMouseEnter={e => { if (!plan.highlighted) (e.currentTarget as HTMLElement).style.borderColor = plan.hoverBorder; }}
              onMouseLeave={e => { if (!plan.highlighted) (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: BRAND_GRADIENT }}
                  >
                    Recomendado
                  </span>
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-lg font-black mb-3 text-white">{plan.name}</h3>
                <div className="flex items-end gap-1.5">
                  <span className="text-4xl font-black grad-text-brand">{plan.price}</span>
                  <span className="text-sm mb-1.5" style={{ color: "#6b7280" }}>pago {plan.period}</span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: "#d1d5db" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8BC34A" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a href={WA_URL} target="_blank" rel="noopener noreferrer">
                <button
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: "#25D366" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#128C7E")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#25D366")}
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
        className="rounded-2xl p-8 text-center transition-all duration-200"
        style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.08)" }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)")}
        onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
      >
        <p className="text-lg font-bold mb-2 text-white">
          ¿Tienes dudas? Habla con nosotros
        </p>
        <p className="text-sm mb-6" style={{ color: "#9ca3af" }}>
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
        <p className="text-sm mb-4" style={{ color: "#6b7280" }}>
          También puedes ver el resto de servicios de Neuraxis
        </p>
        <Link href="/dashboard">
          <button
            className="px-6 py-3 rounded-xl text-sm font-medium transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.20)", color: "rgba(255,255,255,0.7)" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.40)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)")}
          >
            Volver al dashboard →
          </button>
        </Link>
      </motion.div>

    </div>
  );
}
