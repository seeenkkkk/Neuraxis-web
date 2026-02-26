"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

/* ─── Service packs ──────────────────────────────────── */
const PACKS = [
  {
    icon: "💬",
    name: "Pack Prompts",
    desc: "50 prompts premium probados",
    price: "20€",
    tag: "Pago único",
    color: "#6a11cb",
    features: ["50 prompts listos", "Ventas + Soporte", "Actualizaciones"],
  },
  {
    icon: "⚡",
    name: "Pack Workflows",
    desc: "Automatizaciones n8n listas",
    price: "35€",
    tag: "Pago único",
    color: "#22d4fd",
    features: ["Workflows n8n", "Documentación", "Videotutoriales"],
  },
  {
    icon: "🎯",
    name: "Pack Consultoría",
    desc: "Sesión estratégica 1:1 de 1h",
    price: "97€",
    tag: "Pago único",
    color: "#10b981",
    features: ["1h estrategia", "Hoja de ruta", "Grabación incluida"],
  },
  {
    icon: "🚀",
    name: "Pack Full Setup",
    desc: "Implementación completa llave en mano",
    price: "297€",
    tag: "Pago único",
    color: "#f59e0b",
    features: ["Setup completo", "3 agentes IA", "Soporte 30 días"],
  },
];

/* ─── Pricing plans ──────────────────────────────────── */
const PLANS = [
  {
    name: "Gratis",
    price: "0",
    period: "€/mes",
    desc: "Empieza a explorar el poder de los agentes IA",
    highlight: null,
    tag: null,
    accentColor: "#6b7280",
    features: [
      { text: "2 agentes IA activos", ok: true },
      { text: "20 mensajes / día", ok: true },
      { text: "1 workflow básico", ok: true },
      { text: "Academy (fundamentos)", ok: true },
      { text: "Soporte por email", ok: true },
      { text: "Agentes ilimitados", ok: false },
      { text: "Integraciones avanzadas", ok: false },
    ],
    cta: "Empezar gratis",
    ctaVariant: "outline",
  },
  {
    name: "Pro",
    price: "17",
    period: "€/mes",
    desc: "Para negocios que quieren escalar sin límites",
    highlight: "purple",
    tag: "Más popular",
    accentColor: "#6a11cb",
    features: [
      { text: "Todos los agentes IA", ok: true },
      { text: "Mensajes ilimitados", ok: true },
      { text: "Workflows ilimitados", ok: true },
      { text: "Academy completa + Cert.", ok: true },
      { text: "Soporte prioritario 24/7", ok: true },
      { text: "+200 integraciones", ok: true },
      { text: "Analíticas avanzadas", ok: true },
    ],
    cta: "Comenzar Pro",
    ctaVariant: "gradient",
  },
  {
    name: "Premium",
    price: "30",
    period: "€/mes",
    desc: "Máximo poder con soporte dedicado y onboarding",
    highlight: "cyan",
    tag: "Todo incluido",
    accentColor: "#22d4fd",
    features: [
      { text: "Todo lo del plan Pro", ok: true },
      { text: "Onboarding personalizado", ok: true },
      { text: "Manager de cuenta dedicado", ok: true },
      { text: "Acceso API completo", ok: true },
      { text: "SLA garantizado 99.9%", ok: true },
      { text: "White-label disponible", ok: true },
      { text: "Reportes ejecutivos semanales", ok: true },
    ],
    cta: "Activar Premium",
    ctaVariant: "cyan",
  },
];

export default function PlansSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section id="planes" ref={ref} className="py-28 bg-background">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-brand-purple text-sm font-bold uppercase tracking-widest mb-4">
            Planes & Precios
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary mb-4">
            Sin permanencias.{" "}
            <span className="gradient-neon-text">Sin sorpresas.</span>
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto text-lg">
            Elige tu plan mensual o compra un pack de servicios de pago único.
          </p>
        </motion.div>

        {/* ─── Service Packs Row ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" />
            <span className="text-xs font-black text-text-muted uppercase tracking-widest px-3">
              Packs de servicios
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PACKS.map((pack, i) => (
              <motion.div
                key={pack.name}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.08 }}
                className="glass-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 group hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{pack.icon}</span>
                  <span
                    className="text-[10px] font-black px-2 py-0.5 rounded-full"
                    style={{ background: `${pack.color}15`, color: pack.color }}
                  >
                    {pack.tag}
                  </span>
                </div>

                <h4 className="text-sm font-extrabold text-text-primary mb-1">{pack.name}</h4>
                <p className="text-xs text-text-muted mb-3 leading-snug">{pack.desc}</p>

                <div className="flex flex-col gap-1 mb-4">
                  {pack.features.map((f) => (
                    <span key={f} className="text-xs text-text-secondary flex items-center gap-1.5">
                      <span style={{ color: pack.color }} className="text-[10px] font-bold">✓</span>
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-black" style={{ color: pack.color }}>
                    {pack.price}
                  </span>
                  <button
                    className="text-xs font-bold px-4 py-1.5 rounded-full border-2 transition-all duration-200 group-hover:text-white"
                    style={{
                      borderColor: pack.color,
                      color: pack.color,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = pack.color;
                      (e.currentTarget as HTMLButtonElement).style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                      (e.currentTarget as HTMLButtonElement).style.color = pack.color;
                    }}
                  >
                    Comprar →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── Pricing Plans ─── */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" />
          <span className="text-xs font-black text-text-muted uppercase tracking-widest px-3">
            Planes mensuales
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: 0.3 + i * 0.12, ease: "easeOut" }}
              className={`relative flex flex-col rounded-2xl p-7 transition-all duration-300 ${
                plan.highlight === "purple"
                  ? "glass-white-strong border-neon-pulse md:scale-105 z-10"
                  : plan.highlight === "cyan"
                  ? "glass-white"
                  : "glass-white hover:shadow-card-hover hover:-translate-y-1"
              }`}
              style={
                plan.highlight === "cyan"
                  ? {
                      animation: "pulseCyanBorder 2.5s ease-in-out infinite",
                    }
                  : undefined
              }
            >
              {/* Tag */}
              {plan.tag && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black whitespace-nowrap"
                  style={
                    plan.highlight === "purple"
                      ? {
                          background: "linear-gradient(135deg,#6a11cb,#22d4fd)",
                          color: "white",
                          boxShadow: "0 0 14px rgba(106,17,203,0.45)",
                        }
                      : {
                          background: "linear-gradient(135deg,#22d4fd,#06b6d4)",
                          color: "white",
                          boxShadow: "0 0 14px rgba(34,212,253,0.4)",
                        }
                  }
                >
                  {plan.tag}
                </div>
              )}

              {/* Plan name */}
              <h3 className="text-xl font-extrabold text-text-primary mb-1">{plan.name}</h3>
              <p className="text-xs text-text-muted mb-6 leading-relaxed">{plan.desc}</p>

              {/* Price */}
              <div className="flex items-end gap-1.5 mb-7">
                <span
                  className="text-5xl font-black"
                  style={
                    plan.highlight === "purple"
                      ? { background: "linear-gradient(135deg,#6a11cb,#22d4fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }
                      : plan.highlight === "cyan"
                      ? { background: "linear-gradient(135deg,#22d4fd,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }
                      : { color: "#0f0f1a" }
                  }
                >
                  {plan.price}€
                </span>
                <span className="text-sm text-text-muted pb-2">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-2.5 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-2.5 text-sm">
                    <span
                      className="mt-0.5 font-bold text-xs flex-shrink-0"
                      style={{
                        color: f.ok ? plan.accentColor : "#d1d5db",
                      }}
                    >
                      {f.ok ? "✓" : "✕"}
                    </span>
                    <span className={f.ok ? "text-text-secondary" : "text-text-muted line-through"}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contacto"
                className={`w-full text-center py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  plan.ctaVariant === "gradient"
                    ? "text-white hover:opacity-90 hover:scale-105"
                    : plan.ctaVariant === "cyan"
                    ? "text-white hover:opacity-90 hover:scale-105"
                    : "border-2 hover:-translate-y-0.5 hover:shadow-card"
                }`}
                style={
                  plan.ctaVariant === "gradient"
                    ? {
                        background: "linear-gradient(135deg,#6a11cb,#22d4fd)",
                        boxShadow: "0 0 20px rgba(106,17,203,0.35)",
                      }
                    : plan.ctaVariant === "cyan"
                    ? {
                        background: "linear-gradient(135deg,#22d4fd,#06b6d4)",
                        boxShadow: "0 0 20px rgba(34,212,253,0.35)",
                      }
                    : {
                        borderColor: `${plan.accentColor}40`,
                        color: plan.accentColor,
                      }
                }
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Guarantee */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-sm text-text-muted mt-10"
        >
          🔒 Pago seguro · Cancela en 1 clic · 14 días de garantía
        </motion.p>
      </div>
    </section>
  );
}
