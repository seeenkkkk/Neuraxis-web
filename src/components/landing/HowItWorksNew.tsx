"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const BRAND_GRADIENT = "linear-gradient(135deg, #7B2FBE 0%, #00A8D6 100%)";

const STEPS = [
  {
    num: "01",
    title: "Nos cuentas tu negocio",
    desc: "Una llamada corta para conocer tu marca, tus clientes y qué quieres conseguir: más visitas, más ventas o más presencia en redes.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 10h32a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H20l-8 7v-7H8a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2Z" stroke="#7B2FBE" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M15 19h18M15 25h11" stroke="#00A8D6" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Creamos tu web y tu contenido",
    desc: "Diseñamos tu web a medida y preparamos vídeos, reels y publicaciones con IA, todo con la misma imagen de marca.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="8" width="38" height="28" rx="3" stroke="#7B2FBE" strokeWidth="2.5"/>
        <path d="M5 15h38" stroke="#7B2FBE" strokeWidth="2.5"/>
        <path d="M21 21v10l8-5-8-5Z" stroke="#00A8D6" strokeWidth="2.2" strokeLinejoin="round"/>
        <path d="M16 42h16" stroke="#7B2FBE" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Lanzas y creces",
    desc: "Publicamos, medimos qué funciona y lo mejoramos. Tú te ocupas de tus clientes; nosotros, de que te encuentren.",
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
            De la idea a una web que vende y unas redes que no paran, en tres pasos.
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
