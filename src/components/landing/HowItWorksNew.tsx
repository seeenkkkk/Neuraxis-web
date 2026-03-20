"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const STEPS = [
  {
    num: "01",
    icon: "🎯",
    title: "Captás el lead",
    desc: "Un potencial cliente llega desde Instagram, WhatsApp o tu web. ARIA lo detecta y abre el expediente automáticamente.",
    color: "#9B30FF",
    glow: "rgba(155,48,255,0.5)",
    gradient: "linear-gradient(135deg, #9B30FF, #6B0FD4)",
  },
  {
    num: "02",
    icon: "🤖",
    title: "La IA lo gestiona",
    desc: "Nuestros agentes responden en < 2 segundos, califican el lead y agendan citas — sin intervención humana.",
    color: "#00C4FF",
    glow: "rgba(0,196,255,0.5)",
    gradient: "linear-gradient(135deg, #00C4FF, #0084C4)",
  },
  {
    num: "03",
    icon: "💰",
    title: "Tú cerrás la venta",
    desc: "Recibes leads precalificados con historial completo. Solo necesitas confirmar y cobrar.",
    color: "#00CC6A",
    glow: "rgba(0,204,106,0.5)",
    gradient: "linear-gradient(135deg, #00CC6A, #009950)",
  },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof STEPS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex-1 relative z-10"
    >
      {/* Card */}
      <div
        className="rounded-2xl p-7 h-full relative overflow-hidden group"
        style={{
          background: "rgba(13,13,26,0.85)",
          border: `1px solid rgba(255,255,255,0.07)`,
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = step.color + "45";
          e.currentTarget.style.boxShadow = `0 0 30px ${step.glow}, 0 0 60px ${step.color}18`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Number watermark */}
        <span
          className="absolute -top-4 -right-2 text-[90px] font-black select-none pointer-events-none leading-none"
          style={{
            color: step.color,
            opacity: 0.05,
            fontFamily: "var(--font-syne, sans-serif)",
          }}
        >
          {step.num}
        </span>

        {/* Step number badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6"
          style={{
            background: `${step.color}15`,
            border: `1px solid ${step.color}35`,
            color: step.color,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: step.color, boxShadow: `0 0 6px ${step.glow}` }}
          />
          Paso {step.num}
        </div>

        {/* Icon */}
        <motion.div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 relative"
          style={{ background: step.gradient }}
          animate={{ rotate: [0, 3, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
        >
          {step.icon}
          {/* Glow */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: `0 0 20px ${step.glow}, 0 0 40px ${step.color}30`,
            }}
          />
        </motion.div>

        {/* Title */}
        <h3
          className="text-xl font-black text-white mb-3"
          style={{ fontFamily: "var(--font-syne, sans-serif)" }}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>
          {step.desc}
        </p>

        {/* Bottom left glow */}
        <div
          className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, ${step.glow} 0%, transparent 70%)`,
            filter: "blur(20px)",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function HowItWorksNew() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-driven line draw
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 40%"],
  });

  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.4]);

  return (
    <section
      id="como-funciona"
      ref={containerRef}
      className="py-28 relative overflow-hidden"
      style={{ background: "#0D0D1A" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,196,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,196,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,196,255,0.06) 0%, rgba(155,48,255,0.04) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.25em] mb-4"
            style={{ color: "#00C4FF" }}
          >
            Proceso
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5"
            style={{ fontFamily: "var(--font-syne, sans-serif)" }}
          >
            Así funciona{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #9B30FF, #00C4FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Neuraxis
            </span>
          </h2>
          <p className="text-lg max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
            Tres pasos para convertir tu negocio en una máquina de ventas autónoma.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Animated connector line (desktop) */}
          <div className="hidden lg:block absolute top-[3.5rem] left-[calc(16.67%+1.75rem)] right-[calc(16.67%+1.75rem)] z-0">
            {/* Background track */}
            <div
              className="w-full h-px"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />
            {/* Animated fill */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px origin-left"
              style={{
                background: "linear-gradient(90deg, #9B30FF 0%, #00C4FF 50%, #00CC6A 100%)",
                scaleX: lineScaleX,
                opacity: lineOpacity,
                boxShadow:
                  "0 0 8px rgba(0,196,255,0.6), 0 0 16px rgba(155,48,255,0.4)",
              }}
            />

            {/* Travelling particle */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{
                background: "#00C4FF",
                boxShadow: "0 0 12px rgba(0,196,255,0.9), 0 0 24px rgba(0,196,255,0.5)",
                left: useTransform(lineScaleX, [0, 1], ["0%", "100%"]),
                opacity: lineOpacity,
              }}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-5 lg:gap-0">
            {STEPS.map((step, i) => (
              <div key={step.num} className="flex flex-col lg:flex-row flex-1 items-stretch">
                <StepCard step={step} index={i} />

                {/* Mobile connector */}
                {i < STEPS.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    whileInView={{ opacity: 1, scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 + 0.5, duration: 0.5 }}
                    className="lg:hidden mx-auto w-px h-10 origin-top"
                    style={{
                      background: `linear-gradient(to bottom, ${step.color}, ${STEPS[i + 1].color})`,
                      boxShadow: `0 0 8px ${step.glow}`,
                    }}
                  />
                )}

                {/* Desktop spacer */}
                {i < STEPS.length - 1 && <div className="hidden lg:block w-5 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA area */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/register"
            className="px-8 py-4 rounded-2xl text-sm font-bold text-white inline-flex items-center gap-2 hover:scale-105 transition-transform"
            style={{
              background: "linear-gradient(135deg, #9B30FF, #00C4FF)",
              boxShadow: "0 0 30px rgba(155,48,255,0.3), 0 0 60px rgba(0,196,255,0.15)",
            }}
          >
            Empezar ahora →
          </a>
          <a
            href="#agentes"
            className="px-8 py-4 rounded-2xl text-sm font-semibold transition-all hover:scale-105"
            style={{
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            Conocer los agentes
          </a>
        </motion.div>
      </div>
    </section>
  );
}
