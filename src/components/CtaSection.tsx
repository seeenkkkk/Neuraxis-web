"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function CtaSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section id="contacto" ref={ref} className="py-32 relative overflow-hidden bg-white">

      {/* Corner glow blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-brand-purple/12 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-brand-cyan/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-brand-purple/6 to-brand-cyan/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-8"
        >
          {/* Headline */}
          <div>
            <p className="text-brand-purple text-sm font-bold uppercase tracking-widest mb-6">
              Hablemos
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary leading-tight text-balance">
              ¿Listo para que la IA trabaje{" "}
              <span className="gradient-neon-text">por ti?</span>
            </h2>
          </div>

          <p className="text-xl text-text-secondary max-w-xl leading-relaxed">
            Primera consulta gratuita. Sin compromisos. Descubre exactamente
            cuánto tiempo y dinero puedes ahorrar esta semana.
          </p>

          {/* Main CTA */}
          <motion.a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-3 px-12 py-5 rounded-full text-xl font-black text-white overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #6a11cb 0%, #22d4fd 100%)",
              boxShadow: "0 0 30px rgba(106,17,203,0.4), 0 0 60px rgba(34,212,253,0.2), 0 4px 24px rgba(0,0,0,0.12)",
            }}
          >
            {/* Shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            <span className="relative">Agenda tu llamada gratuita</span>
            <span className="relative text-2xl group-hover:translate-x-1 transition-transform duration-300">→</span>
          </motion.a>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted">
            <span className="flex items-center gap-1.5">
              <span className="text-brand-cyan">✓</span> Sin tarjeta de crédito
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-brand-cyan">✓</span> Llamada de 30 min
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-brand-cyan">✓</span> Respuesta en menos de 24h
            </span>
          </div>

          {/* Social proof */}
          <div className="glass-white rounded-2xl px-8 py-5 shadow-card flex flex-col sm:flex-row items-center gap-4">
            <div className="flex -space-x-2">
              {["MG", "CM", "LF", "AR", "JS"].map((init, i) => (
                <div
                  key={init}
                  className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                  style={{
                    background: [
                      "linear-gradient(135deg,#6a11cb,#8b3cf7)",
                      "linear-gradient(135deg,#22d4fd,#06b6d4)",
                      "linear-gradient(135deg,#10b981,#059669)",
                      "linear-gradient(135deg,#f59e0b,#d97706)",
                      "linear-gradient(135deg,#ec4899,#be185d)",
                    ][i],
                    zIndex: 5 - i,
                  }}
                >
                  {init}
                </div>
              ))}
            </div>
            <div className="text-sm text-center sm:text-left">
              <span className="font-bold text-text-primary">+50 empresas</span>
              <span className="text-text-muted"> ya están automatizadas con Neuraxis IA</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
