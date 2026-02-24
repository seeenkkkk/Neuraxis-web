"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const plans = [
  {
    name: "Free",
    price: "0€",
    period: "",
    desc: "Empieza gratis y explora el poder de la IA",
    features: [
      "2 agentes IA",
      "20 mensajes / día",
      "Soporte por email",
      "1 workflow básico",
    ],
    cta: "Empieza gratis",
    highlight: false,
    tag: null,
  },
  {
    name: "Pro",
    price: "19€",
    period: "/mes",
    desc: "Para negocios que quieren crecer sin límites",
    features: [
      "Todos los agentes IA",
      "Mensajes ilimitados",
      "Workflows ilimitados",
      "Soporte prioritario",
      "Analíticas avanzadas",
      "Integraciones premium",
    ],
    cta: "Comenzar ahora",
    highlight: true,
    tag: "Más popular",
  },
  {
    name: "Pack Prompts",
    price: "20€",
    period: "pago único",
    desc: "50 prompts premium listos para usar",
    features: [
      "50 prompts probados",
      "Ventas, soporte y más",
      "Actualizaciones gratis",
      "Instrucciones incluidas",
    ],
    cta: "Comprar pack",
    highlight: false,
    tag: "One-time",
  },
  {
    name: "Pack Workflows",
    price: "35€",
    period: "pago único",
    desc: "Workflows probados de n8n listos para desplegar",
    features: [
      "Workflows de n8n probados",
      "Documentación completa",
      "Video tutoriales",
      "Soporte de configuración",
    ],
    cta: "Comprar pack",
    highlight: false,
    tag: "One-time",
  },
];

export default function PlansSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="planes" ref={ref} className="py-24 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-brand-cyan text-sm font-semibold uppercase tracking-widest mb-4">
            Planes
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Elige tu plan
          </h2>
          <p className="text-white/50 max-w-md mx-auto">
            Sin permanencias. Sin sorpresas. Cancela cuando quieras.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-2xl p-6 transition-all duration-300 group ${
                plan.highlight
                  ? "gradient-border shadow-glow-brand"
                  : "glass-card hover:border-white/15"
              }`}
              style={
                plan.highlight
                  ? { background: "rgba(106,17,203,0.08)" }
                  : {}
              }
            >
              {/* Tag */}
              {plan.tag && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                    plan.highlight
                      ? "bg-gradient-to-r from-brand-purple to-brand-cyan text-white"
                      : "bg-white/10 text-white/60"
                  }`}
                >
                  {plan.tag}
                </div>
              )}

              {/* Plan name */}
              <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-xs text-white/40 mb-4 leading-relaxed">{plan.desc}</p>

              {/* Price */}
              <div className="mb-6">
                <span
                  className={`text-4xl font-bold ${
                    plan.highlight ? "gradient-text-purple-cyan" : "text-white"
                  }`}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-white/40 text-sm ml-1">{plan.period}</span>
                )}
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-2.5 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                    <span className="text-brand-cyan mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contacto"
                className={`w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  plan.highlight
                    ? "bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90 hover:scale-105"
                    : "border border-white/15 text-white/70 hover:border-brand-cyan/40 hover:text-white hover:bg-white/5"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
