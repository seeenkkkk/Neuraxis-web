"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    num: "01",
    icon: "🎯",
    title: "Captás el lead",
    desc: "Un potencial cliente llena un formulario, te escribe por Instagram o WhatsApp. El sistema lo detecta automáticamente.",
    color: "from-brand-purple to-brand-cyan",
  },
  {
    num: "02",
    icon: "🤖",
    title: "La IA lo gestiona",
    desc: "Nuestros agentes responden al instante, califican el lead, agendan citas y hacen seguimiento sin intervención humana.",
    color: "from-brand-cyan to-brand-green",
  },
  {
    num: "03",
    icon: "💰",
    title: "Tú cerrás la venta",
    desc: "Recibes leads listos para comprar, con su historial completo. Solo te queda cerrar el trato y cobrar.",
    color: "from-brand-green to-brand-purple",
  },
];

export default function HowItWorksSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="como-funciona" ref={ref} className="py-24 bg-[#0d0d14]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-brand-cyan text-sm font-semibold uppercase tracking-widest mb-4">
            Proceso
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Así funciona{" "}
            <span className="gradient-text-purple-cyan">Neuraxis</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative flex flex-col lg:flex-row gap-0 lg:gap-0 items-stretch">
          {/* Connecting line desktop */}
          <div className="hidden lg:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-white/10 z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
              style={{ originX: 0 }}
              className="h-full bg-gradient-to-r from-brand-purple to-brand-cyan"
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
              className="flex-1 flex flex-col items-center text-center px-6 relative z-10"
            >
              {/* Icon circle */}
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-2xl mb-6 shadow-glow-purple`}
              >
                {step.icon}
              </div>

              {/* Number */}
              <span className="text-xs font-bold text-white/20 uppercase tracking-widest mb-2">
                Paso {step.num}
              </span>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">{step.desc}</p>

              {/* Mobile arrow */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.2 }}
                  className="lg:hidden mt-8 text-brand-cyan text-2xl"
                >
                  ↓
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
