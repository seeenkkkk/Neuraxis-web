"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import NeuraxisLogo from "@/components/brand/NeuraxisLogo";
import NexMascot from "@/components/brand/NexMascot";

// ── Data ────────────────────────────────────────────────────────────────────

const PLANS = [
  {
    name: "Free",
    price: "0€",
    features: [
      "1 agente IA básico",
      "20 mensajes/día",
      "Prompts básicos",
      "Dashboard básico",
      "Soporte comunidad",
    ],
    cta: "Empezar gratis",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "29€",
    features: [
      "2 agentes IA completos",
      "200 conversaciones/mes",
      "5 workflows n8n",
      "500 Neurax-Points",
      "Soporte por email",
    ],
    cta: "Empezar Starter",
    href: "/billing",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "99€",
    features: [
      "10 agentes con integraciones",
      "2.000 conversaciones/mes",
      "Workflows ilimitados",
      "Chat IA con Claude",
      "2.000 Neurax-Points",
    ],
    cta: "Comenzar Pro",
    href: "/billing",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "299€",
    features: [
      "Agentes IA ilimitados",
      "Conversaciones ilimitadas",
      "Implementación completa",
      "API acceso total",
      "Soporte 24/7 dedicado",
    ],
    cta: "Contactar ventas",
    href: "/billing",
    highlighted: false,
  },
];

const STATS = [
  { value: "+50", label: "Agencias activas" },
  { value: "+10K", label: "Conversaciones IA" },
  { value: "98%", label: "Satisfacción cliente" },
  { value: "€0", label: "Setup inicial" },
];

const STEPS = [
  {
    number: "01",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M8 8H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1M16 8h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1" />
        <path d="M9 14h6l1 6H8l1-6z" />
      </svg>
    ),
    title: "Crea tu agente",
    desc: "Elige el tipo, personaliza el comportamiento y conecta tus herramientas favoritas.",
  },
  {
    number: "02",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    title: "Configura en minutos",
    desc: "Define workflows, automatizaciones y conecta plataformas sin escribir código.",
  },
  {
    number: "03",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: "Empieza a vender",
    desc: "Tu agente trabaja 24/7 captando leads y cerrando ventas mientras duermes.",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

// ── Component ────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Navbar ────────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-200"
        style={{
          borderBottom: scrolled ? "1px solid #e2e8f0" : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 4px rgba(0,0,0,0.05)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-14">
          <NeuraxisLogo size="sm" animated={false} />
          <div className="flex items-center gap-2">
            <Link href="/login">
              <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                Iniciar sesión
              </button>
            </Link>
            <Link href="/register">
              <button className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors"
                style={{ background: "#0d9488" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#0f766e")}
                onMouseLeave={e => (e.currentTarget.style.background = "#0d9488")}
              >
                Empezar gratis
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <motion.div {...fadeUp(0)}>
            {/* Badge pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-7 border"
              style={{ background: "#f0fdfc", color: "#0d9488", borderColor: "#ccfbf1" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#0d9488" }} />
              Plataforma #1 para Agencias IA en España
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-[1.05]"
              style={{ color: "#0f172a" }}>
              Tu agencia IA.<br />
              <span style={{ color: "#0d9488" }}>Automatizada.</span>
            </h1>

            <p className="text-lg mb-8 leading-relaxed max-w-md" style={{ color: "#64748b" }}>
              Construye agentes IA propios, delega la implementación a expertos y automatiza tu negocio desde el primer día.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-7">
              <Link href="/register">
                <button
                  className="px-6 py-3 text-sm font-semibold text-white rounded-lg transition-colors shadow-sm"
                  style={{ background: "#0d9488" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#0f766e")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#0d9488")}
                >
                  Empezar gratis →
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="px-6 py-3 text-sm font-semibold rounded-lg border transition-colors"
                  style={{ background: "#fff", color: "#334155", borderColor: "#e2e8f0" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
                >
                  Ver demo en vivo
                </button>
              </Link>
            </div>

            {/* Trust line */}
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-1.5">
                {[1, 2, 3, 4, 5].map(n => (
                  <Image
                    key={n}
                    src={`/images/avatar${n}.png.png`}
                    alt={`Agency ${n}`}
                    width={24}
                    height={24}
                    className="rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <p className="text-xs" style={{ color: "#94a3b8" }}>
                Sin tarjeta de crédito ·{" "}
                <span className="font-semibold" style={{ color: "#64748b" }}>+50 agencias</span>{" "}
                confían en Neuraxis
              </p>
            </div>
          </motion.div>

          {/* Right — NexMascot floating */}
          <motion.div {...fadeUp(0.15)} className="flex justify-center lg:justify-end">
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" as const }}
            >
              <NexMascot emotion="happy" size="xl" message="¡Bienvenido a Neuraxis! 🚀" />
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ── Social Proof Bar ──────────────────────────────────────────────── */}
      <div className="border-y py-4 px-6" style={{ borderColor: "#f1f5f9", background: "#f8fafc" }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-4 justify-center md:justify-between">
          <span className="text-xs font-medium" style={{ color: "#94a3b8" }}>
            Agencias activas en — Madrid · Barcelona · Valencia · Bilbao · Sevilla
          </span>
          <div className="flex items-center">
            <div className="flex -space-x-2 mr-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                <Image
                  key={n}
                  src={`/images/avatar${n}.png.png`}
                  alt={`Agency ${n}`}
                  width={28}
                  height={28}
                  className="rounded-full border-2 border-white shadow-sm"
                />
              ))}
            </div>
            <div className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-[9px] font-bold shadow-sm"
              style={{ background: "#0d9488" }}>
              +50
            </div>
          </div>
        </div>
      </div>

      {/* ── Value Props ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0.05)} className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3" style={{ color: "#0f172a" }}>
              Un sistema de{" "}
              <span style={{ color: "#0d9488" }}>2 capas de valor</span>
            </h2>
            <p style={{ color: "#64748b" }}>Empieza donde estás. Escala cuando quieras.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* CONSTRUYE */}
            <motion.div {...fadeUp(0.1)} className="value-card group p-8 rounded-2xl border bg-white"
              style={{ borderColor: "#e2e8f0" }}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-md"
                    style={{ background: "#f0fdfc", color: "#0d9488" }}>
                    CONSTRUYE
                  </span>
                  <p className="text-7xl font-black mt-2 leading-none select-none" style={{ color: "#f1f5f9" }}>01</p>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#f0fdfc", color: "#0d9488" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M8 8H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1M16 8h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1" />
                    <path d="M9 14h6l1 6H8l1-6z" />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2" style={{ color: "#0f172a" }}>Construye Agentes</h3>
              <p className="text-sm mb-5 leading-relaxed" style={{ color: "#64748b" }}>
                Despliega agentes de IA propios. Desde un agente básico hasta integraciones enterprise completas.
              </p>

              <ul className="space-y-2.5 mb-7">
                {["Agentes IA activos 24/7", "Chat con Claude Sonnet", "Excel IA + generación de contenido", "Integraciones enterprise"].map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "#475569" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.5" className="flex-shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/register" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                style={{ color: "#0d9488" }}>
                Empezar gratis
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </motion.div>

            {/* DELEGA */}
            <motion.div {...fadeUp(0.15)} className="value-card group p-8 rounded-2xl border bg-white"
              style={{ borderColor: "#e2e8f0" }}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-md"
                    style={{ background: "#f0fdfc", color: "#0d9488" }}>
                    DELEGA
                  </span>
                  <p className="text-7xl font-black mt-2 leading-none select-none" style={{ color: "#f1f5f9" }}>02</p>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#f0fdfc", color: "#0d9488" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2" style={{ color: "#0f172a" }}>Delega a Expertos</h3>
              <p className="text-sm mb-5 leading-relaxed" style={{ color: "#64748b" }}>
                Implementación llave en mano. Nuestro equipo construye, configura y mantiene tu sistema de IA.
              </p>

              <ul className="space-y-2.5 mb-7">
                {["Consultoría estratégica IA", "Setup completo con agentes", "Integraciones a medida", "Soporte dedicado mensual"].map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "#475569" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.5" className="flex-shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/register" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                style={{ color: "#0d9488" }}>
                Hablar con el equipo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Stats Dark ────────────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "#0f172a" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {STATS.map((stat, i) => (
              <motion.div key={i} {...fadeUp(0.06 * i)} className="text-center">
                <p className="text-4xl font-bold mb-2" style={{ color: "#2dd4bf" }}>{stat.value}</p>
                <p className="text-sm" style={{ color: "#94a3b8" }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0.05)} className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3" style={{ color: "#0f172a" }}>
              Elige tu plan
            </h2>
            <p style={{ color: "#64748b" }}>Empieza gratis. Escala cuando tu agencia crezca.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PLANS.map((plan, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.05 * i)}
                className="relative flex flex-col p-6 rounded-2xl"
                style={{
                  border: plan.highlighted ? "2px solid #0d9488" : "1px solid #e2e8f0",
                  background: plan.highlighted ? "#f0fdfc" : "#ffffff",
                  boxShadow: plan.highlighted
                    ? "0 4px 24px rgba(13,148,136,0.12)"
                    : "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 text-xs font-bold text-white rounded-full"
                      style={{ background: "#0d9488" }}>
                      Más popular
                    </span>
                  </div>
                )}

                <h3 className="text-base font-semibold mb-1" style={{ color: "#0f172a" }}>{plan.name}</h3>
                <div className="flex items-end gap-1 mb-5">
                  <span className="text-4xl font-bold" style={{ color: "#0f172a" }}>{plan.price}</span>
                  <span className="text-sm mb-1.5" style={{ color: "#94a3b8" }}>/mes</span>
                </div>

                <ul className="space-y-2.5 mb-7 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "#475569" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.5"
                        className="flex-shrink-0 mt-0.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href={plan.href}>
                  <button
                    className="w-full py-2.5 text-sm font-semibold rounded-lg transition-colors"
                    style={
                      plan.highlighted
                        ? { background: "#0d9488", color: "#fff" }
                        : { background: "#f1f5f9", color: "#334155" }
                    }
                  >
                    {plan.cta}
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "#f8fafc" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0.05)} className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3" style={{ color: "#0f172a" }}>Cómo funciona</h2>
            <p style={{ color: "#64748b" }}>Tres pasos para automatizar tu agencia de IA.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {STEPS.map((step, i) => (
              <motion.div key={i} {...fadeUp(0.08 * i)} className="relative flex flex-col">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-px -translate-x-1/2 z-0"
                    style={{ background: "#e2e8f0" }} />
                )}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "#f0fdfc", border: "1px solid #ccfbf1", color: "#0d9488" }}>
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold" style={{ color: "#cbd5e1" }}>{step.number}</span>
                  <h3 className="text-base font-semibold mt-1 mb-2" style={{ color: "#0f172a" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Web Service ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0.05)} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 border"
              style={{ background: "#f0fdfc", color: "#0d9488", borderColor: "#ccfbf1" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Servicio adicional
            </div>
            <h2 className="text-3xl font-bold mb-3" style={{ color: "#0f172a" }}>
              Tu negocio merece una web <span style={{ color: "#0d9488" }}>que venda</span>
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: "#64748b" }}>
              Diseñamos y desarrollamos tu presencia online desde cero. Sin plantillas, sin código, sin complicaciones.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {[
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                ),
                title: "Diseño único y a medida",
                desc: "Cada web es creada desde cero, adaptada a tu marca y pensada para convertir visitantes en clientes.",
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                ),
                title: "SEO desde el primer día",
                desc: "Optimización técnica incluida: velocidad, estructura, metadatos y contenido indexable desde el lanzamiento.",
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
                title: "Entrega en 7 días",
                desc: "Proceso ágil y directo. Sin reuniones interminables, sin sorpresas. Tu web lista en una semana.",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.08 * i)}
                className="p-6 rounded-2xl border bg-white transition-all duration-200 hover:shadow-md"
                style={{ borderColor: "#e2e8f0" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "#f0fdfc", color: "#0d9488" }}>
                  {card.icon}
                </div>
                <h3 className="font-semibold text-base mb-2" style={{ color: "#0f172a" }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{card.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/web">
              <button
                className="px-6 py-3 text-sm font-semibold rounded-lg border transition-colors"
                style={{ background: "#fff", color: "#0d9488", borderColor: "#0d9488" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#f0fdfc"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
              >
                Ver más sobre este servicio →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Revly ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "#f8fafc" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            {...fadeUp(0.05)}
            className="rounded-2xl p-10 md:p-14 border"
            style={{
              background: "#fff",
              borderColor: "#e2e8f0",
              boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
            }}
          >
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
                style={{ background: "#f0fdfc", color: "#0d9488", borderColor: "#ccfbf1" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                Creado por Neuraxis
              </div>

              <h2 className="text-3xl font-bold mb-4" style={{ color: "#0f172a" }}>
                Conoce <span style={{ color: "#0d9488" }}>Revly</span> — tu agente de ventas en WhatsApp
              </h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: "#64748b" }}>
                Responde clientes 24/7, califica leads y cierra ventas mientras duermes.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                {["500 conversaciones/mes desde €14.99", "Setup en minutos", "Sin conocimientos técnicos"].map(pill => (
                  <span key={pill} className="px-3.5 py-1.5 rounded-full text-xs font-medium border"
                    style={{ background: "#f0fdfc", color: "#0d9488", borderColor: "#ccfbf1" }}>
                    {pill}
                  </span>
                ))}
              </div>

              <a href="https://revly.app" target="_blank" rel="noopener noreferrer">
                <button
                  className="px-7 py-3 text-sm font-semibold text-white rounded-lg transition-colors shadow-sm"
                  style={{ background: "#0d9488" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#0f766e")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#0d9488")}
                >
                  Probar Revly gratis →
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "#0d9488" }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp(0.05)}>
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Listo para construir tu agencia de IA?
            </h2>
            <p className="text-lg mb-8" style={{ color: "#99f6e4" }}>
              Únete a +50 agencias que ya automatizan con Neuraxis. Sin setup, sin tarjeta de crédito.
            </p>
            <Link href="/register">
              <button
                className="px-8 py-3.5 bg-white font-semibold rounded-lg transition-colors text-sm shadow-sm"
                style={{ color: "#0d9488" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f0fdfc")}
                onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
              >
                Empezar gratis →
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer style={{ background: "#0f172a", color: "#94a3b8" }}>
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-4 gap-10 mb-10">

            {/* Brand */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <NeuraxisLogo size="sm" animated={false} />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
                La plataforma para construir y escalar tu agencia de IA en España.
              </p>
            </div>

            {/* Plataforma */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#64748b" }}>
                Plataforma
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Dashboard", href: "/dashboard" },
                  { label: "Agentes IA", href: "/agents" },
                  { label: "Neuraxis Chat", href: "/chat" },
                  { label: "Workflows", href: "/dashboard" },
                ].map(l => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Servicios */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#64748b" }}>
                Servicios
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Crea tu Web", href: "/web" },
                  { label: "Revly", href: "https://revly.app" },
                  { label: "Delegar", href: "/delegate" },
                  { label: "Planes", href: "/billing" },
                ].map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm transition-colors hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#64748b" }}>
                Empresa
              </h4>
              <ul className="space-y-2.5">
                {["Términos de uso", "Privacidad", "Cookies", "Contacto"].map(l => (
                  <li key={l}>
                    <Link href="/" className="text-sm transition-colors hover:text-white">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-3"
            style={{ borderTop: "1px solid #1e293b" }}>
            <p className="text-xs" style={{ color: "#475569" }}>© 2025 Neuraxis IA · Todos los derechos reservados</p>
            <p className="text-xs" style={{ color: "#475569" }}>Hecho con ❤️ en España</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
