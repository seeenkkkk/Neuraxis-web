"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// ── Global effects (dynamic = no SSR) ─────────────────────────────────────
const LoadingScreen = dynamic(
  () => import("../components/landing/LoadingScreen"),
  { ssr: false }
);
const CustomCursor = dynamic(
  () => import("../components/landing/CustomCursor"),
  { ssr: false }
);
const ScrollProgressBar = dynamic(
  () => import("../components/landing/ScrollProgressBar"),
  { ssr: false }
);
const SmoothScrollProvider = dynamic(
  () => import("../components/landing/SmoothScrollProvider"),
  { ssr: false }
);

// ── New sections ───────────────────────────────────────────────────────────
const HeroNew = dynamic(
  () => import("../components/landing/HeroNew"),
  { ssr: false }
);
const AgentsSectionNew = dynamic(
  () => import("../components/landing/AgentsSectionNew"),
  { ssr: false }
);
const HowItWorksNew = dynamic(
  () => import("../components/landing/HowItWorksNew"),
  { ssr: false }
);

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

const BRAND_GRADIENT = "linear-gradient(135deg, #9B30FF 0%, #00C4FF 100%)";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

// ── Navbar ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Agentes", href: "#agentes" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Planes", href: "#planes" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Active section spy
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(13,13,26,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-black"
            style={{
              background: BRAND_GRADIENT,
              boxShadow: "0 0 16px rgba(155,48,255,0.4)",
            }}
          >
            N
          </motion.div>
          <span
            className="text-base font-black tracking-tight text-white"
            style={{ fontFamily: "var(--font-syne, sans-serif)" }}
          >
            NEURAXIS{" "}
            <span style={{ color: "#00C4FF" }}>IA</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="relative transition-colors duration-200"
              style={{ color: active === l.href.replace("#", "") ? "white" : "rgba(255,255,255,0.5)" }}
            >
              {l.label}
              {/* Active indicator */}
              {active === l.href.replace("#", "") && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute -bottom-1 left-0 right-0 h-px rounded-full"
                  style={{ background: BRAND_GRADIENT }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <button
              className="px-4 py-2 text-sm font-medium rounded-xl transition-colors"
              style={{ color: "rgba(255,255,255,0.55)", background: "transparent" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
            >
              Iniciar sesión
            </button>
          </Link>
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(155,48,255,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 text-sm font-bold rounded-xl text-white"
              style={{ background: BRAND_GRADIENT }}
            >
              Empezar gratis
            </motion.button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menú"
        >
          <motion.span
            className="block w-5 h-0.5 rounded-full bg-white"
            animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
          />
          <motion.span
            className="block w-5 h-0.5 rounded-full bg-white"
            animate={{ opacity: mobileOpen ? 0 : 1 }}
          />
          <motion.span
            className="block w-5 h-0.5 rounded-full bg-white"
            animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t flex flex-col px-6 py-5 gap-4"
          style={{
            background: "rgba(13,13,26,0.97)",
            borderColor: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              {l.label}
            </a>
          ))}
          <Link href="/register">
            <button
              className="w-full py-3 text-sm font-bold rounded-xl text-white"
              style={{ background: BRAND_GRADIENT }}
            >
              Empezar gratis
            </button>
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}

// ── Main ────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <SmoothScrollProvider>
      <div style={{ background: "#0D0D1A", minHeight: "100vh", color: "white" }}>

        {/* ── Global effects ──────────────────────────────────────────────── */}
        <LoadingScreen />
        <CustomCursor />
        <ScrollProgressBar />

        {/* ── Navbar ──────────────────────────────────────────────────────── */}
        <Navbar />

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <HeroNew />

        {/* ── Social Proof Bar ────────────────────────────────────────────── */}
        <div
          className="py-4 px-6 border-y overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.02)",
            borderColor: "rgba(255,255,255,0.05)",
          }}
        >
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-3 text-sm"
            style={{ color: "rgba(255,255,255,0.3)" }}>
            <span>Usado por agencias en</span>
            {["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Málaga"].map((city, i) => (
              <span key={city} className="flex items-center gap-3">
                {i > 0 && <span style={{ color: "#00C4FF", fontSize: "7px" }}>●</span>}
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* ── Agents Section (NEW) ─────────────────────────────────────────── */}
        <AgentsSectionNew />

        {/* ── How It Works (NEW) ──────────────────────────────────────────── */}
        <HowItWorksNew />

        {/* ── Value Section ───────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: "#0A0A18" }}>
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUp(0.05)} className="text-center mb-14">
              <h2
                className="text-3xl font-bold mb-3 text-white"
                style={{ fontFamily: "var(--font-syne, sans-serif)" }}
              >
                Un sistema de{" "}
                <span
                  style={{
                    background: BRAND_GRADIENT,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  2 capas de valor
                </span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.4)" }}>Empieza donde estás. Escala cuando quieras.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* CONSTRUYE */}
              <motion.div
                {...fadeUp(0.1)}
                className="relative overflow-hidden rounded-2xl p-8 transition-all duration-300 group"
                style={{
                  background: "rgba(13,13,26,0.85)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(155,48,255,0.4)";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(155,48,255,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="mb-5">
                  <span
                    className="text-7xl font-black leading-none select-none"
                    style={{
                      background: BRAND_GRADIENT,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    01
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🤖</span>
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-syne, sans-serif)" }}>
                    Construye
                  </h3>
                </div>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Despliega agentes de IA propios. Desde un agente básico hasta integraciones enterprise completas.
                </p>
                <ul className="space-y-2.5">
                  {["Crea agentes IA en minutos", "Sin código, sin fricciones", "Entrena con tus datos", "Múltiples canales"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                      <span style={{ color: "#9B30FF" }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/avatar8.png-removebg-preview.png"
                  alt=""
                  aria-hidden
                  className="absolute bottom-4 right-4 w-32 opacity-60 pointer-events-none select-none"
                  style={{ filter: "drop-shadow(0 0 20px rgba(155,48,255,0.3))" }}
                />
              </motion.div>

              {/* DELEGA */}
              <motion.div
                {...fadeUp(0.15)}
                className="relative overflow-hidden rounded-2xl p-8 transition-all duration-300 group"
                style={{
                  background: "rgba(13,13,26,0.85)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,196,255,0.4)";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(0,196,255,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="mb-5">
                  <span
                    className="text-7xl font-black leading-none select-none"
                    style={{
                      background: BRAND_GRADIENT,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    02
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🚀</span>
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-syne, sans-serif)" }}>
                    Delega
                  </h3>
                </div>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Implementación llave en mano. Nuestro equipo construye, configura y mantiene tu sistema de IA.
                </p>
                <ul className="space-y-2.5">
                  {["Expertos en automatización IA", "Setup completo en 48h", "Soporte continuo dedicado", "ROI garantizado"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                      <span style={{ color: "#00C4FF" }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Stats Row ───────────────────────────────────────────────────── */}
        <section
          className="py-16 px-6 border-y"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}
        >
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div key={i} {...fadeUp(0.06 * i)} className="text-center">
                <p
                  className="text-5xl font-black mb-2"
                  style={{
                    background: BRAND_GRADIENT,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontFamily: "var(--font-syne, sans-serif)",
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Pricing ─────────────────────────────────────────────────────── */}
        <section id="planes" className="py-24 px-6" style={{ background: "#0D0D1A" }}>
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUp(0.05)} className="text-center mb-14">
              <h2
                className="text-3xl font-bold mb-3 text-white"
                style={{ fontFamily: "var(--font-syne, sans-serif)" }}
              >
                Elige tu plan
              </h2>
              <p style={{ color: "rgba(255,255,255,0.4)" }}>
                Empieza gratis. Escala cuando tu agencia crezca.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              {PLANS.map((plan, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(0.05 * i)}
                  className="relative flex flex-col p-6 rounded-2xl transition-all duration-300"
                  style={{
                    background: plan.highlighted ? "rgba(155,48,255,0.08)" : "rgba(13,13,26,0.85)",
                    border: plan.highlighted
                      ? "1px solid rgba(155,48,255,0.4)"
                      : "1px solid rgba(255,255,255,0.07)",
                    boxShadow: plan.highlighted
                      ? "0 0 40px rgba(155,48,255,0.15), 0 0 80px rgba(0,196,255,0.08)"
                      : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!plan.highlighted) {
                      e.currentTarget.style.borderColor = "rgba(155,48,255,0.25)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!plan.highlighted) {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    }
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
                    <span className="text-4xl font-black text-white" style={{ fontFamily: "var(--font-syne, sans-serif)" }}>
                      {plan.price}
                    </span>
                    <span className="text-sm mb-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>/mes</span>
                  </div>
                  <ul className="space-y-2.5 mb-7 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                        <span style={{ color: "#9B30FF", flexShrink: 0, marginTop: 1 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href}>
                    <button
                      className="w-full py-2.5 text-sm font-bold rounded-xl transition-all hover:opacity-90 hover:scale-[1.02]"
                      style={
                        plan.highlighted
                          ? { background: BRAND_GRADIENT, color: "white" }
                          : {
                              background: "rgba(255,255,255,0.05)",
                              color: "rgba(255,255,255,0.65)",
                              border: "1px solid rgba(255,255,255,0.1)",
                            }
                      }
                    >
                      {plan.cta}
                    </button>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mascot */}
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/avatar3.png-removebg-preview.png"
                alt="Nex mascot happy"
                className="w-36 mx-auto"
                style={{ filter: "drop-shadow(0 8px 32px rgba(155,48,255,0.3))" }}
              />
            </div>
          </div>
        </section>

        {/* ── Web Service ─────────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: "#0A0A18" }}>
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUp(0.05)} className="text-center mb-14">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
                style={{
                  background: "rgba(0,196,255,0.08)",
                  color: "#00C4FF",
                  border: "1px solid rgba(0,196,255,0.2)",
                }}
              >
                Servicio adicional
              </div>
              <h2
                className="text-3xl font-bold mb-3 text-white"
                style={{ fontFamily: "var(--font-syne, sans-serif)" }}
              >
                Tu negocio merece una web{" "}
                <span style={{ color: "#00C4FF" }}>que venda</span>
              </h2>
              <p className="max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
                Diseñamos y desarrollamos tu presencia online desde cero.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5 mb-10">
              {[
                {
                  icon: "🎨",
                  title: "Diseño único y a medida",
                  desc: "Cada web creada desde cero, adaptada a tu marca y pensada para convertir visitantes en clientes.",
                  color: "#9B30FF",
                },
                {
                  icon: "🔍",
                  title: "SEO desde el primer día",
                  desc: "Optimización técnica incluida: velocidad, estructura, metadatos y contenido indexable desde el lanzamiento.",
                  color: "#00C4FF",
                },
                {
                  icon: "⚡",
                  title: "Entrega en 7 días",
                  desc: "Proceso ágil y directo. Sin reuniones interminables, sin sorpresas. Tu web lista en una semana.",
                  color: "#00CC6A",
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(0.08 * i)}
                  className="p-6 rounded-2xl transition-all duration-200 group"
                  style={{
                    background: "rgba(13,13,26,0.85)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = card.color + "35";
                    e.currentTarget.style.boxShadow = `0 0 20px ${card.color}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div className="text-3xl mb-4">{card.icon}</div>
                  <h3 className="font-semibold text-base mb-2 text-white">{card.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/web">
                <button
                  className="px-6 py-3 text-sm font-semibold rounded-xl transition-all hover:scale-105"
                  style={{
                    background: "transparent",
                    color: "#00C4FF",
                    border: "1px solid rgba(0,196,255,0.4)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(0,196,255,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  Ver más sobre este servicio →
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Revly ───────────────────────────────────────────────────────── */}
        <section className="py-20 px-6" style={{ background: "#0D0D1A" }}>
          <div className="max-w-5xl mx-auto">
            <motion.div
              {...fadeUp(0.05)}
              className="rounded-2xl p-10 md:p-14 text-center relative overflow-hidden"
              style={{
                background: "rgba(0,196,255,0.04)",
                border: "1px solid rgba(0,196,255,0.18)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(0,196,255,0.05) 0%, transparent 70%)",
                }}
              />
              <div className="relative z-10">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                  style={{
                    background: "rgba(0,196,255,0.08)",
                    color: "#00C4FF",
                    border: "1px solid rgba(0,196,255,0.2)",
                  }}
                >
                  Creado por Neuraxis
                </div>
                <h2
                  className="text-3xl font-bold mb-4 text-white"
                  style={{ fontFamily: "var(--font-syne, sans-serif)" }}
                >
                  Conoce <span style={{ color: "#00C4FF" }}>Revly</span> — tu agente de ventas en WhatsApp
                </h2>
                <p
                  className="text-lg mb-8 leading-relaxed max-w-2xl mx-auto"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Responde clientes 24/7, califica leads y cierra ventas mientras duermes.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                  {["500 conversaciones/mes desde €14.99", "Setup en minutos", "Sin conocimientos técnicos"].map((pill) => (
                    <span
                      key={pill}
                      className="px-3.5 py-1.5 rounded-full text-xs font-medium"
                      style={{
                        background: "rgba(0,196,255,0.08)",
                        color: "#00C4FF",
                        border: "1px solid rgba(0,196,255,0.18)",
                      }}
                    >
                      {pill}
                    </span>
                  ))}
                </div>
                <a href="https://revly.app" target="_blank" rel="noopener noreferrer">
                  <button
                    className="px-8 py-3.5 text-sm font-bold rounded-xl transition-all hover:scale-105 hover:opacity-90"
                    style={{ background: BRAND_GRADIENT, color: "white" }}
                  >
                    Probar Revly gratis →
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Final CTA ───────────────────────────────────────────────────── */}
        <section
          className="py-24 px-6 relative overflow-hidden"
          style={{ background: BRAND_GRADIENT }}
        >
          {/* Overlay pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.div {...fadeUp(0.05)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/avatar2.png-removebg-preview.png"
                alt="Nex celebrating"
                className="w-40 mx-auto mb-8"
                style={{
                  filter: "drop-shadow(0 10px 40px rgba(0,0,0,0.4))",
                  animation: "nex-float-brand 3s ease-in-out infinite",
                }}
              />
              <h2
                className="text-4xl font-black text-white mb-5"
                style={{ fontFamily: "var(--font-syne, sans-serif)" }}
              >
                Tu agencia IA empieza hoy
              </h2>
              <p className="text-xl mb-10" style={{ color: "rgba(255,255,255,0.8)" }}>
                Únete a +50 agencias que ya automatizan con Neuraxis.
                <br />
                Sin setup, sin tarjeta de crédito.
              </p>
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,0,0,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  className="px-10 py-4 font-black rounded-2xl text-base"
                  style={{ background: "#0D0D1A", color: "white" }}
                >
                  Empezar gratis →
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <footer
          className="py-14 px-6"
          style={{ background: "#0D0D1A", borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-10 mb-10">
              {/* Brand */}
              <div className="md:col-span-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo1.png-removebg-preview.png"
                  alt="Neuraxis"
                  className="h-8 object-contain mb-4"
                />
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.28)" }}>
                  La plataforma para construir y escalar tu agencia de IA en España.
                </p>
              </div>
              {/* Producto */}
              <div>
                <h4
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  Producto
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Agentes IA", href: "/agents" },
                    { label: "Neuraxis Chat", href: "/chat" },
                    { label: "Workflows", href: "/workflows" },
                  ].map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm transition-colors"
                        style={{ color: "rgba(255,255,255,0.38)" }}
                        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
                          (e.currentTarget.style.color = "white")
                        }
                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
                          (e.currentTarget.style.color = "rgba(255,255,255,0.38)")
                        }
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Empresa */}
              <div>
                <h4
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  Empresa
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { label: "Crea tu Web", href: "/web" },
                    { label: "Revly", href: "https://revly.app" },
                    { label: "Delegar", href: "/delegate" },
                    { label: "Planes", href: "/billing" },
                  ].map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm transition-colors"
                        style={{ color: "rgba(255,255,255,0.38)" }}
                        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
                          (e.currentTarget.style.color = "white")
                        }
                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
                          (e.currentTarget.style.color = "rgba(255,255,255,0.38)")
                        }
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Legal */}
              <div>
                <h4
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  Legal
                </h4>
                <ul className="space-y-2.5">
                  {["Términos de uso", "Privacidad", "Cookies", "Contacto"].map((l) => (
                    <li key={l}>
                      <Link
                        href="/"
                        className="text-sm transition-colors"
                        style={{ color: "rgba(255,255,255,0.38)" }}
                        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
                          (e.currentTarget.style.color = "white")
                        }
                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
                          (e.currentTarget.style.color = "rgba(255,255,255,0.38)")
                        }
                      >
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
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.18)" }}>
                © 2025 Neuraxis IA · Todos los derechos reservados
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.18)" }}>
                Hecho con ❤️ en España
              </p>
            </div>
          </div>
        </footer>

      </div>
    </SmoothScrollProvider>
  );
}
