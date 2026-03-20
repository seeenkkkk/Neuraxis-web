"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const BRAND_GRADIENT = "linear-gradient(135deg, #7B2FBE 0%, #00A8D6 100%)";

const STEPS = [
  {
    num: "01",
    title: "Elige tu automatización",
    desc: "Selecciona el workflow que necesita tu negocio. Tenemos soluciones para WhatsApp, email, captación de leads y mucho más.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="8" stroke="#7B2FBE" strokeWidth="2.5" fill="none"/>
        <path d="M24 4v6M24 38v6M4 24h6M38 24h6" stroke="#7B2FBE" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M10.1 10.1l4.24 4.24M33.66 33.66l4.24 4.24M10.1 37.9l4.24-4.24M33.66 14.34l4.24-4.24" stroke="#00A8D6" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Lo instalamos por ti",
    desc: "Nuestro equipo conecta todo con tus credenciales y herramientas. Sin código, sin complicaciones, en 24-48 horas.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 6L30 18H42L32 26L36 38L24 30L12 38L16 26L6 18H18L24 6Z" stroke="#7B2FBE" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
        <path d="M24 14v10M24 24l6 4" stroke="#00A8D6" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Empieza a generar resultados",
    desc: "Tu negocio trabaja solo mientras tú te dedicas a crecer. Mide resultados desde el primer día.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 38L16 26L22 32L30 18L42 10" stroke="#7B2FBE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M34 10h8v8" stroke="#00A8D6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 42h36" stroke="#7B2FBE" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
      </svg>
    ),
  },
];

function StepCard({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="flex-1 relative"
    >
      <div
        className="rounded-2xl p-8 h-full relative overflow-hidden transition-all duration-300"
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(0,168,214,0.15)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(0,168,214,0.35)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(123,47,190,0.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(0,168,214,0.15)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Step number watermark */}
        <span
          className="absolute -top-2 -right-1 font-black select-none pointer-events-none leading-none"
          style={{
            fontSize: "100px",
            background: BRAND_GRADIENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            opacity: 0.06,
            fontFamily: "var(--font-syne, sans-serif)",
          }}
        >
          {step.num}
        </span>

        {/* Step badge */}
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6"
          style={{
            background: "rgba(123,47,190,0.06)",
            border: "1px solid rgba(123,47,190,0.15)",
            color: "#7B2FBE",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#7B2FBE" }}
          />
          Paso {step.num}
        </div>

        {/* SVG Icon */}
        <div className="mb-6">{step.icon}</div>

        {/* Title */}
        <h3
          className="text-xl font-black mb-3"
          style={{ fontFamily: "var(--font-syne, sans-serif)", color: "#1a1a2e" }}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function HowItWorksNew() {
  return (
    <section
      id="como-funciona"
      className="py-28 px-6"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.25em] mb-4"
            style={{ color: "#00A8D6" }}
          >
            Proceso
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ fontFamily: "var(--font-syne, sans-serif)", color: "#1a1a2e" }}
          >
            Así funciona{" "}
            <span
              style={{
                background: BRAND_GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Neuraxis
            </span>
          </h2>
          <p className="text-lg max-w-lg mx-auto" style={{ color: "rgba(0,0,0,0.4)" }}>
            Tres pasos simples para automatizar tu negocio sin complicaciones.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="flex flex-col lg:flex-row gap-5">
          {STEPS.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>


      </div>
    </section>
  );
}
