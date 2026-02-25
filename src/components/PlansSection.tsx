"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const plans = [
  {
    name: "Starter",
    price: "0",
    period: "€/mes",
    desc: "Para explorar el poder de los agentes IA",
    highlight: false,
    tag: null,
    features: [
      { text: "2 agentes IA activos", included: true },
      { text: "20 mensajes / día", included: true },
      { text: "1 workflow básico", included: true },
      { text: "Acceso a Academy (fundamentos)", included: true },
      { text: "Soporte por email", included: true },
      { text: "Integraciones avanzadas", included: false },
      { text: "Agentes ilimitados", included: false },
    ],
    cta: "Empezar gratis",
    ctaStyle: "outline",
    color: "#6b7280",
  },
  {
    name: "Pro",
    price: "19",
    period: "€/mes",
    desc: "Para negocios que quieren crecer sin límites",
    highlight: true,
    tag: "Más popular",
    features: [
      { text: "Todos los agentes IA", included: true },
      { text: "Mensajes ilimitados", included: true },
      { text: "Workflows ilimitados", included: true },
      { text: "Academy completa + certificación", included: true },
      { text: "Soporte prioritario 24/7", included: true },
      { text: "+200 integraciones (n8n, Zapier)", included: true },
      { text: "Analíticas y reportes avanzados", included: true },
    ],
    cta: "Comenzar ahora",
    ctaStyle: "gradient",
    color: "#6a11cb",
  },
  {
    name: "Pack Prompts",
    price: "20",
    period: "€ único",
    desc: "50 prompts premium listos para usar",
    highlight: false,
    tag: "One-time",
    features: [
      { text: "50 prompts probados", included: true },
      { text: "Ventas, soporte y marketing", included: true },
      { text: "Guía de uso incluida", included: true },
      { text: "Actualizaciones gratuitas", included: true },
      { text: "Compatible con cualquier IA", included: true },
      { text: "Soporte de configuración", included: false },
      { text: "Agentes incluidos", included: false },
    ],
    cta: "Comprar pack",
    ctaStyle: "outline",
    color: "#22d4fd",
  },
  {
    name: "Pack Workflows",
    price: "35",
    period: "€ único",
    desc: "Workflows n8n probados, listos para desplegar",
    highlight: false,
    tag: "One-time",
    features: [
      { text: "Workflows n8n probados", included: true },
      { text: "Documentación completa", included: true },
      { text: "Videotutoriales paso a paso", included: true },
      { text: "Soporte de configuración", included: true },
      { text: "Actualizaciones incluidas", included: true },
      { text: "Agentes IA incluidos", included: false },
      { text: "Mensajes ilimitados", included: false },
    ],
    cta: "Comprar pack",
    ctaStyle: "outline",
    color: "#10b981",
  },
];

export default function PlansSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="planes" ref={ref} className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-brand-purple text-sm font-bold uppercase tracking-widest mb-4">
            Planes
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary mb-4">
            Sin permanencias.{" "}
            <span className="gradient-neon-text">Sin sorpresas.</span>
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto text-lg">
            Elige el plan que encaja con tu negocio. Cancela cuando quieras.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col rounded-2xl p-6 transition-all duration-300 ${
                plan.highlight
                  ? "glass-white-strong border-neon-pulse scale-[1.02] lg:scale-105 z-10"
                  : "glass-white hover:shadow-card-hover hover:-translate-y-1"
              }`}
            >
              {/* Tag */}
              {plan.tag && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black whitespace-nowrap"
                  style={
                    plan.highlight
                      ? {
                          background: "linear-gradient(135deg,#6a11cb,#22d4fd)",
                          color: "white",
                          boxShadow: "0 0 12px rgba(106,17,203,0.4)",
                        }
                      : {
                          background: `${plan.color}18`,
                          color: plan.color,
                          border: `1px solid ${plan.color}30`,
                        }
                  }
                >
                  {plan.tag}
                </div>
              )}

              {/* Name + desc */}
              <h3 className="text-lg font-extrabold text-text-primary mb-1">
                {plan.name}
              </h3>
              <p className="text-xs text-text-muted mb-5 leading-relaxed">{plan.desc}</p>

              {/* Price */}
              <div className="flex items-end gap-1 mb-6">
                <span
                  className={`text-5xl font-black ${
                    plan.highlight ? "gradient-neon-text" : "text-text-primary"
                  }`}
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
                      className={`mt-0.5 flex-shrink-0 font-bold text-xs ${
                        f.included ? "" : "opacity-30"
                      }`}
                      style={{ color: f.included ? plan.color : "#9ca3af" }}
                    >
                      {f.included ? "✓" : "✕"}
                    </span>
                    <span
                      className={
                        f.included ? "text-text-secondary" : "text-text-muted line-through"
                      }
                    >
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contacto"
                className={`w-full text-center py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  plan.ctaStyle === "gradient"
                    ? "bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90 hover:scale-105 shadow-neon-purple"
                    : "border-2 text-text-secondary hover:-translate-y-0.5 hover:shadow-card"
                }`}
                style={
                  plan.ctaStyle === "outline"
                    ? {
                        borderColor: `${plan.color}40`,
                        color: plan.color,
                      }
                    : undefined
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
          🔒 Pago seguro · Sin tarjeta para el plan Starter · Cancela en 1 clic
        </motion.p>
      </div>
    </section>
  );
}
