"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function CtaSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      id="contacto"
      ref={ref}
      className="py-32 relative overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/40 via-[#0a0a0f] to-brand-cyan/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/80" />

      {/* Glowing orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-brand-purple/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-brand-cyan/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-6"
        >
          <span className="text-5xl">🚀</span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            ¿Listo para{" "}
            <span className="gradient-text">automatizar tu negocio</span>?
          </h2>

          <p className="text-xl text-white/60 max-w-md">
            Primera consulta gratuita. Sin compromisos. Descubre cuánto tiempo
            y dinero puedes ahorrar con IA.
          </p>

          <motion.a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 inline-flex items-center gap-2 px-10 py-4 rounded-full text-lg font-bold text-white bg-gradient-to-r from-brand-purple to-brand-cyan shadow-glow-brand hover:opacity-95 transition-all duration-200"
          >
            Agenda tu llamada gratuita →
          </motion.a>

          <div className="flex items-center gap-6 mt-2 text-sm text-white/40">
            <span>✓ Sin tarjeta de crédito</span>
            <span>✓ 100% gratuita</span>
            <span>✓ Respuesta en 24h</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
