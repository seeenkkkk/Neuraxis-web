"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(() => import("./ParticlesBackground"), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0f]">
      {/* Particles */}
      <ParticlesBackground />

      {/* Radial glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-brand-purple/40 bg-brand-purple/10 text-brand-cyan text-sm font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse-slow" />
              Automatización con IA · Activo 24/7
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
            >
              Automatiza tu negocio con{" "}
              <span className="gradient-text">
                Inteligencia Artificial
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/60 leading-relaxed max-w-lg"
            >
              Workflows, agentes IA y automatizaciones que trabajan por ti
              24/7. Captura leads, gestiona clientes y cierra ventas de forma
              automática.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <a
                href="#planes"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-brand-purple to-brand-cyan hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-glow-brand"
              >
                Empieza gratis
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base font-semibold text-white border border-white/30 hover:border-brand-cyan/60 hover:bg-white/5 transition-all duration-200"
              >
                Agenda una llamada
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6 pt-2 text-sm text-white/40"
            >
              <span>✓ Sin tarjeta de crédito</span>
              <span>✓ Setup en minutos</span>
              <span>✓ Cancela cuando quieras</span>
            </motion.div>
          </div>

          {/* Right: Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center relative"
          >
            {/* Outer glow ring */}
            <div className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-brand-purple/30 to-brand-cyan/20 blur-2xl animate-pulse-slow" />
            <div className="absolute w-72 h-72 rounded-full border border-brand-cyan/20 animate-pulse-slow" />
            <div className="absolute w-64 h-64 rounded-full border border-brand-purple/20" />

            {/* Floating avatar */}
            <div className="relative animate-float">
              <div className="relative w-56 h-56 sm:w-72 sm:h-72">
                {/* Glow behind image */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan opacity-30 blur-xl" />
                <Image
                  src="/avatar.png"
                  alt="Neuraxis IA Avatar"
                  fill
                  className="object-contain relative z-10"
                  style={{
                    filter:
                      "drop-shadow(0 0 30px rgba(34,212,253,0.5)) drop-shadow(0 0 60px rgba(106,17,203,0.3))",
                  }}
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </section>
  );
}
