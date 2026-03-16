"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────

const PLANS = [
  {
    name: "Free",
    price: "0€",
    features: ["1 agente IA básico", "20 mensajes/día", "Prompts básicos", "Dashboard básico", "Soporte comunidad"],
    cta: "Empezar gratis",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "29€",
    features: ["2 agentes IA completos", "200 conversaciones/mes", "5 workflows n8n", "500 Neurax-Points", "Soporte por email"],
    cta: "Empezar Starter",
    href: "/billing",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "99€",
    features: ["10 agentes con integraciones", "2.000 conversaciones/mes", "Workflows ilimitados", "Chat IA con Claude", "2.000 Neurax-Points"],
    cta: "Comenzar Pro",
    href: "/billing",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "299€",
    features: ["Agentes IA ilimitados", "Conversaciones ilimitadas", "Implementación completa", "API acceso total", "Soporte 24/7 dedicado"],
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
    icon: "🤖",
    title: "Crea tu agente",
    desc: "Elige el tipo, personaliza el comportamiento y conecta tus herramientas.",
  },
  {
    number: "02",
    icon: "⚙️",
    title: "Configura en minutos",
    desc: "Define workflows y automatizaciones sin escribir una línea de código.",
  },
  {
    number: "03",
    icon: "🚀",
    title: "Empieza a vender",
    desc: "Tu agente trabaja 24/7 captando leads y cerrando ventas mientras duermes.",
  },
];

const BRAND_GRADIENT = "linear-gradient(135deg, #8BC34A 0%, #7B1FA2 50%, #00BCD4 100%)";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

// ── Component ─────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: "#0D0D1A", minHeight: "100vh", color: "white" }}>

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
        style={{
          background: scrolled ? "rgba(13,13,26,0.95)" : "#0D0D1A",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logoletras-removebg-preview.png" className="h-10 w-auto" alt="Neuraxis IA" />
          <div className="flex items-center gap-3">
            <Link href="/login">
              <button
                className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{ color: "rgba(255,255,255,0.7)", background: "transparent" }}
                onMouseEnter={e => (e.currentTarget.style.color = "white")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              >
                Iniciar sesión
              </button>
            </Link>
            <Link href="/register">
              <button
                className="px-5 py-2 text-sm font-bold rounded-lg transition-opacity hover:opacity-90"
                style={{ background: BRAND_GRADIENT, color: "white" }}
              >
                Empezar gratis
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="min-h-screen flex items-center px-6 pt-16"
        style={{ background: "#0D0D1A" }}
      >
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center py-20">

          {/* Left */}
          <motion.div {...fadeUp(0)}>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(139,195,74,0.4)",
                color: "#8BC34A",
              }}
            >
              <span>✦</span>
              Plataforma #1 para Agencias IA en España
            </div>

            <h1
              className="text-5xl lg:text-6xl font-black mb-6 leading-[1.05]"
              style={{ color: "white" }}
            >
              Construye tu<br />
              Agencia de{" "}
              <span style={{ color: "#00BCD4" }}>IA</span>
            </h1>

            <p className="text-lg mb-8 leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.5)" }}>
              Construye agentes IA propios, delega la implementación a expertos y automatiza tu negocio desde el primer día.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-7">
              <Link href="/register">
                <button
                  className="px-7 py-3.5 text-sm font-bold rounded-xl transition-opacity hover:opacity-90 shadow-lg"
                  style={{ background: BRAND_GRADIENT, color: "white" }}
                >
                  Empezar gratis →
                </button>
              </Link>
              <Link href="/dashboard">
                <button
                  className="px-7 py-3.5 text-sm font-semibold rounded-xl transition-colors"
                  style={{
                    background: "transparent",
                    color: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  Ver demo en vivo →
                </button>
              </Link>
            </div>

            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              Sin tarjeta de crédito · +50 agencias activas · Cancela cuando quieras
            </p>
          </motion.div>

          {/* Right — mascot + bg logo */}
          <motion.div {...fadeUp(0.15)} className="relative flex justify-center lg:justify-end">
            {/* Background logo decoration */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo2.png-removebg-preview.png"
              alt=""
              aria-hidden
              className="absolute w-96 opacity-5 blur-sm pointer-events-none select-none"
              style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            />
            {/* Mascot */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/avatar1.png-removebg-preview.png"
              alt="Nex mascot"
              className="nex-float relative z-10 w-80 drop-shadow-2xl"
              style={{ filter: "drop-shadow(0 20px 60px rgba(0,188,212,0.3))" }}
            />
          </motion.div>

        </div>
      </section>

      {/* ── Social Proof Bar ──────────────────────────────────────────────── */}
      <div
        className="py-4 px-6 border-y"
        style={{ background: "#111827", borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-3 text-sm"
          style={{ color: "rgba(255,255,255,0.35)" }}>
          <span>Usado por agencias en</span>
          {["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Málaga"].map((city, i) => (
            <span key={city} className="flex items-center gap-3">
              {i > 0 && <span style={{ color: "#00BCD4", fontSize: "8px" }}>●</span>}
              {city}
            </span>
          ))}
        </div>
      </div>

      {/* ── Value Section ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "#0D0D1A" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0.05)} className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3" style={{ color: "white" }}>
              Un sistema de{" "}
              <span className="grad-text-brand">2 capas de valor</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)" }}>Empieza donde estás. Escala cuando quieras.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* CONSTRUYE 01 */}
            <motion.div
              {...fadeUp(0.1)}
              className="relative overflow-hidden rounded-2xl p-8 transition-all duration-300 group"
              style={{
                background: "#111827",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#8BC34A")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
            >
              <div className="mb-5">
                <span className="text-7xl font-black grad-text-brand leading-none select-none">01</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🤖</span>
                <h3 className="text-2xl font-bold text-white">Construye</h3>
              </div>
              <p className="text-sm mb-5 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Despliega agentes de IA propios. Desde un agente básico hasta integraciones enterprise completas.
              </p>
              <ul className="space-y-2.5">
                {["Crea agentes IA en minutos", "Sin código, sin fricciones", "Entrena con tus datos", "Múltiples canales"].map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8BC34A" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              {/* Mascot bottom-right */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/avatar8.png-removebg-preview.png"
                alt=""
                aria-hidden
                className="absolute bottom-4 right-4 w-32 opacity-80 pointer-events-none select-none"
              />
            </motion.div>

            {/* DELEGA 02 */}
            <motion.div
              {...fadeUp(0.15)}
              className="relative overflow-hidden rounded-2xl p-8 transition-all duration-300 group"
              style={{
                background: "#111827",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#00BCD4")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
            >
              <div className="mb-5">
                <span className="text-7xl font-black grad-text-brand leading-none select-none">02</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🚀</span>
                <h3 className="text-2xl font-bold text-white">Delega</h3>
              </div>
              <p className="text-sm mb-5 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Implementación llave en mano. Nuestro equipo construye, configura y mantiene tu sistema de IA.
              </p>
              <ul className="space-y-2.5">
                {["Expertos en automatización IA", "Setup completo en 48h", "Soporte continuo dedicado", "ROI garantizado"].map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00BCD4" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Stats Row ─────────────────────────────────────────────────────── */}
      <section
        className="py-16 px-6 border-y"
        style={{ background: "#111827", borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div key={i} {...fadeUp(0.06 * i)} className="text-center">
              <p className="text-5xl font-black mb-2 grad-text-brand">{stat.value}</p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "#0D0D1A" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0.05)} className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3 text-white">Elige tu plan</h2>
            <p style={{ color: "rgba(255,255,255,0.4)" }}>Empieza gratis. Escala cuando tu agencia crezca.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {PLANS.map((plan, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.05 * i)}
                className="relative flex flex-col p-6 rounded-2xl"
                style={{
                  background: "#111827",
                  border: plan.highlighted ? "2px solid #00BCD4" : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: plan.highlighted ? "0 0 40px rgba(0,188,212,0.15)" : "none",
                }}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span
                      className="px-4 py-1.5 text-xs font-bold rounded-full text-white"
                      style={{ background: BRAND_GRADIENT }}
                    >
                      Más popular
                    </span>
                  </div>
                )}
                <h3 className="text-base font-semibold mb-1 text-white">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-5">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-sm mb-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>/mes</span>
                </div>
                <ul className="space-y-2.5 mb-7 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8BC34A" strokeWidth="2.5"
                        className="flex-shrink-0 mt-0.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href}>
                  <button
                    className="w-full py-2.5 text-sm font-bold rounded-xl transition-opacity hover:opacity-90"
                    style={
                      plan.highlighted
                        ? { background: BRAND_GRADIENT, color: "white" }
                        : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }
                    }
                  >
                    {plan.cta}
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mascot below pricing */}
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/avatar3.png-removebg-preview.png"
              alt="Nex mascot happy"
              className="w-40 mx-auto"
              style={{ filter: "drop-shadow(0 8px 24px rgba(139,195,74,0.3))" }}
            />
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "#111827" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0.05)} className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3 text-white">Cómo funciona</h2>
            <p style={{ color: "rgba(255,255,255,0.4)" }}>Tres pasos para automatizar tu agencia de IA.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {STEPS.map((step, i) => (
              <motion.div key={i} {...fadeUp(0.08 * i)} className="relative">
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden md:block absolute top-6 left-full w-full h-px z-0"
                    style={{ background: "rgba(255,255,255,0.06)", transform: "translateX(-50%)" }}
                  />
                )}
                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm mb-5"
                    style={{ background: BRAND_GRADIENT }}
                  >
                    {step.number}
                  </div>
                  <div className="text-2xl mb-3">{step.icon}</div>
                  <h3 className="text-base font-semibold mb-2 text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Web Service ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "#0D0D1A" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0.05)} className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ background: "rgba(0,188,212,0.1)", color: "#00BCD4", border: "1px solid rgba(0,188,212,0.25)" }}
            >
              Servicio adicional
            </div>
            <h2 className="text-3xl font-bold mb-3 text-white">
              Tu negocio merece una web <span style={{ color: "#00BCD4" }}>que venda</span>
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
              Diseñamos y desarrollamos tu presencia online desde cero. Sin plantillas, sin código, sin complicaciones.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {[
              { icon: "🎨", title: "Diseño único y a medida", desc: "Cada web creada desde cero, adaptada a tu marca y pensada para convertir visitantes en clientes." },
              { icon: "🔍", title: "SEO desde el primer día", desc: "Optimización técnica incluida: velocidad, estructura, metadatos y contenido indexable desde el lanzamiento." },
              { icon: "⚡", title: "Entrega en 7 días", desc: "Proceso ágil y directo. Sin reuniones interminables, sin sorpresas. Tu web lista en una semana." },
            ].map((card, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.08 * i)}
                className="p-6 rounded-2xl transition-all duration-200"
                style={{
                  background: "#111827",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
              >
                <div className="text-3xl mb-4">{card.icon}</div>
                <h3 className="font-semibold text-base mb-2 text-white">{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{card.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/web">
              <button
                className="px-6 py-3 text-sm font-semibold rounded-xl transition-all"
                style={{
                  background: "transparent",
                  color: "#00BCD4",
                  border: "1px solid #00BCD4",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,188,212,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                Ver más sobre este servicio →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Revly ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "#111827" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            {...fadeUp(0.05)}
            className="rounded-2xl p-10 md:p-14 text-center"
            style={{
              background: "rgba(0,188,212,0.04)",
              border: "1px solid rgba(0,188,212,0.2)",
            }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: "rgba(0,188,212,0.1)", color: "#00BCD4", border: "1px solid rgba(0,188,212,0.25)" }}
            >
              Creado por Neuraxis
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">
              Conoce <span style={{ color: "#00BCD4" }}>Revly</span> — tu agente de ventas en WhatsApp
            </h2>
            <p className="text-lg mb-8 leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
              Responde clientes 24/7, califica leads y cierra ventas mientras duermes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              {["500 conversaciones/mes desde €14.99", "Setup en minutos", "Sin conocimientos técnicos"].map(pill => (
                <span
                  key={pill}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium"
                  style={{ background: "rgba(0,188,212,0.1)", color: "#00BCD4", border: "1px solid rgba(0,188,212,0.2)" }}
                >
                  {pill}
                </span>
              ))}
            </div>
            <a href="https://revly.app" target="_blank" rel="noopener noreferrer">
              <button
                className="px-8 py-3.5 text-sm font-bold rounded-xl transition-opacity hover:opacity-90"
                style={{ background: BRAND_GRADIENT, color: "white" }}
              >
                Probar Revly gratis →
              </button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: BRAND_GRADIENT }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp(0.05)}>
            {/* Mascot */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/avatar2.png-removebg-preview.png"
              alt="Nex celebrating"
              className="nex-float w-48 mx-auto mb-8"
              style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))" }}
            />
            <h2 className="text-3xl font-bold text-white mb-4">
              Tu agencia IA empieza hoy
            </h2>
            <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.8)" }}>
              Únete a +50 agencias que ya automatizan con Neuraxis. Sin setup, sin tarjeta de crédito.
            </p>
            <Link href="/register">
              <button
                className="px-8 py-3.5 font-bold rounded-xl transition-opacity hover:opacity-90 text-sm"
                style={{ background: "#0D0D1A", color: "white" }}
              >
                Empezar gratis →
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer
        className="py-14 px-6"
        style={{ background: "#0D0D1A", borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="md:col-span-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo1.png-removebg-preview.png" alt="Neuraxis" className="h-8 object-contain mb-4" />
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.3)" }}>
                La plataforma para construir y escalar tu agencia de IA en España.
              </p>
            </div>
            {/* Producto */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
                Producto
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Dashboard", href: "/dashboard" },
                  { label: "Agentes IA", href: "/agents" },
                  { label: "Neuraxis Chat", href: "/chat" },
                  { label: "Workflows", href: "/workflows" },
                ].map(l => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm transition-colors"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "white")}
                      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Empresa */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
                Empresa
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Crea tu Web", href: "/web" },
                  { label: "Revly", href: "https://revly.app" },
                  { label: "Delegar", href: "/delegate" },
                  { label: "Planes", href: "/billing" },
                ].map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm transition-colors"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "white")}
                      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Legal */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
                Legal
              </h4>
              <ul className="space-y-2.5">
                {["Términos de uso", "Privacidad", "Cookies", "Contacto"].map(l => (
                  <li key={l}>
                    <Link href="/" className="text-sm transition-colors"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "white")}
                      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="pt-8 flex flex-col md:flex-row items-center justify-between gap-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>© 2025 Neuraxis IA · Todos los derechos reservados</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>Hecho con ❤️ en España</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
