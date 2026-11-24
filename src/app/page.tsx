"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SmoothScrollProvider from "../components/landing/SmoothScrollProvider";
import HeroNew from "../components/landing/HeroNew";
import HowItWorksNew from "../components/landing/HowItWorksNew";
import { CONTACT_HREF, IG_DM_HREF, IG_PROFILE_HREF, IG_HANDLE } from "../lib/contact";
import { LEGAL_LINKS } from "../lib/legal";

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

// ── New sections ───────────────────────────────────────────────────────────
const BackgroundCanvas = dynamic(
  () => import("../components/landing/BackgroundCanvas"),
  { ssr: false }
);
const ScrollZoomIntro = dynamic(
  () => import("../components/landing/ScrollZoomIntro"),
  { ssr: false }
);
const ScrollJourney = dynamic(
  () => import("../components/landing/ScrollJourney"),
  { ssr: false }
);

// ── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: "🌐",
    title: "Páginas web para empresas",
    desc: "Webs a medida, rápidas y pensadas para convertir visitas en clientes. Diseño único, adaptado a tu marca.",
    features: ["Diseño a medida y responsive", "SEO desde el primer día", "Formularios y reservas conectados", "Lista en días, no en meses"],
    color: "#7B2FBE",
  },
  {
    icon: "⚙️",
    title: "Automatización de procesos",
    desc: "Quitamos las tareas repetitivas de tu día a día y las dejamos funcionando solas, 24/7.",
    features: ["Gmail y correo automático", "Chatbots para web y WhatsApp", "Conexión con tu CRM y tus herramientas", "Avisos, informes y seguimiento de clientes"],
    color: "#00A8D6",
  },
];



const BRAND_GRADIENT = "linear-gradient(135deg, #7B2FBE 0%, #00A8D6 100%)";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

// ── Navbar ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Por qué Neuraxis", href: "#por-que" },
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
        background: "#FFFFFF",
        borderBottom: "1px solid rgba(0,168,214,0.15)",
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <a href="#" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logoletras2_png-removebg-preview.png"
            alt="Neuraxis IA"
            className="h-9 w-auto object-contain"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="relative transition-colors duration-200"
              style={{ color: active === l.href.replace("#", "") ? "#7B2FBE" : "rgba(0,0,0,0.55)" }}
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
          <a href={CONTACT_HREF}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 text-sm font-bold rounded-xl text-white"
              style={{ background: BRAND_GRADIENT }}
            >
              Pedir presupuesto
            </motion.button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menú"
        >
          <motion.span
            className="block w-5 h-0.5 rounded-full bg-[#1a1a2e]"
            animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
          />
          <motion.span
            className="block w-5 h-0.5 rounded-full bg-[#1a1a2e]"
            animate={{ opacity: mobileOpen ? 0 : 1 }}
          />
          <motion.span
            className="block w-5 h-0.5 rounded-full bg-[#1a1a2e]"
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
            background: "#FFFFFF",
            borderColor: "rgba(0,168,214,0.15)",
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium"
              style={{ color: "rgba(0,0,0,0.6)" }}
            >
              {l.label}
            </a>
          ))}
          <a href={CONTACT_HREF}>
            <button
              className="w-full py-3 text-sm font-bold rounded-xl text-white"
              style={{ background: BRAND_GRADIENT }}
            >
              Pedir presupuesto
            </button>
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}

// ── Main ────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <SmoothScrollProvider>
      <div style={{ background: "transparent", minHeight: "100vh", color: "#1a1a2e" }}>

        {/* ── Background canvas (fixed, z-index -1) ───────────────────────── */}
        <BackgroundCanvas />

        {/* ── Global effects ──────────────────────────────────────────────── */}
        <LoadingScreen />
        <CustomCursor />
        <ScrollProgressBar />

        {/* ── Navbar ──────────────────────────────────────────────────────── */}
        <Navbar />

        {/* ── Scroll Zoom Intro ───────────────────────────────────────────── */}
        <ScrollZoomIntro />

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <HeroNew />

        {/* ── Social Proof Bar ────────────────────────────────────────────── */}
        <div
          className="py-4 px-6 border-y overflow-hidden"
          style={{
            background: "#F8F9FF",
            borderColor: "rgba(0,168,214,0.15)",
          }}
        >
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-3 text-sm"
            style={{ color: "rgba(0,0,0,0.35)" }}>
            <span>Lo que hacemos:</span>
            {["Webs a medida", "SEO", "Chatbots", "Automatizaciones"].map((city, i) => (
              <span key={city} className="flex items-center gap-3">
                {i > 0 && <span style={{ color: "#00A8D6", fontSize: "7px" }}>●</span>}
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* ── Scroll Journey (prototipo tipo Apple) ─────────────────────── */}
        <ScrollJourney />

        {/* ── Servicios ───────────────────────────────────────────────────── */}
        <section id="servicios" className="py-24 px-6" style={{ background: "#FFFFFF", borderTop: "1px solid rgba(0,168,214,0.15)" }}>
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUp(0.05)} className="text-center mb-14">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
                style={{
                  background: "rgba(0,168,214,0.08)",
                  color: "#00A8D6",
                  border: "1px solid rgba(0,168,214,0.18)",
                }}
              >
                Nuestros servicios
              </div>
              <h2
                className="text-3xl font-bold mb-3"
                style={{ fontFamily: "var(--font-syne, sans-serif)", color: "#1a1a2e" }}
              >
                Todo lo que tu empresa necesita para{" "}
                <span
                  style={{
                    background: BRAND_GRADIENT,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  crecer con IA
                </span>
              </h2>
              <p className="max-w-xl mx-auto" style={{ color: "rgba(0,0,0,0.45)" }}>
                Cada proyecto es a medida. Cuéntanos qué necesitas y te preparamos una propuesta adaptada a tu negocio.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
              {SERVICES.map((s, i) => (
                <motion.div
                  key={s.title}
                  {...fadeUp(0.08 * i)}
                  className="relative flex flex-col p-7 rounded-2xl transition-all duration-300"
                  style={{
                    background: "#F8F9FF",
                    border: "1px solid rgba(0,0,0,0.07)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = s.color + "55";
                    e.currentTarget.style.boxShadow = `0 4px 24px ${s.color}14`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.07)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="text-5xl font-black leading-none select-none"
                      style={{
                        background: BRAND_GRADIENT,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-3xl">{s.icon}</span>
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ fontFamily: "var(--font-syne, sans-serif)", color: "#1a1a2e" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm mb-5 leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>
                    {s.desc}
                  </p>
                  <ul className="space-y-2.5 mb-7 flex-1">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "rgba(0,0,0,0.6)" }}>
                        <span style={{ color: s.color, flexShrink: 0, marginTop: 1 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={CONTACT_HREF}>
                    <button
                      className="w-full py-2.5 text-sm font-bold rounded-xl transition-all hover:opacity-90 hover:scale-[1.02]"
                      style={{ background: BRAND_GRADIENT, color: "white" }}
                    >
                      Pedir presupuesto
                    </button>
                  </a>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-sm" style={{ color: "rgba(0,0,0,0.55)" }}>
              ¿Prefieres escribirnos por Instagram?{" "}
              <a
                href={IG_DM_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline underline-offset-4"
                style={{ color: "#7B2FBE" }}
              >
                Mándanos un mensaje a {IG_HANDLE}
              </a>
            </p>
          </div>
        </section>

        {/* ── How It Works (NEW) ──────────────────────────────────────────── */}
        <div style={{ borderTop: "1px solid rgba(0,168,214,0.2)" }}>
          <HowItWorksNew />
        </div>

        {/* ── Value Section ───────────────────────────────────────────────── */}
        <section id="por-que" className="py-24 px-6" style={{ background: "#FFFFFF", borderTop: "1px solid rgba(0,168,214,0.15)" }}>
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUp(0.05)} className="text-center mb-14">
              <h2
                className="text-3xl font-bold mb-3"
                style={{ fontFamily: "var(--font-syne, sans-serif)", color: "#1a1a2e" }}
              >
                Por qué elegir{" "}
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
              <p style={{ color: "rgba(0,0,0,0.45)" }}>Diseño, tecnología e IA en un mismo equipo.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* CONSTRUYE */}
              <motion.div
                {...fadeUp(0.1)}
                className="relative overflow-hidden rounded-2xl p-8 transition-all duration-300 group"
                style={{
                  background: "#F8F9FF",
                  border: "1px solid rgba(0,0,0,0.07)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(123,47,190,0.3)";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(123,47,190,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.07)";
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
                  <span className="text-2xl">✨</span>
                  <h3 className="text-2xl font-bold" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "#1a1a2e" }}>
                    Hecho a medida
                  </h3>
                </div>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>
                  Nada de plantillas. Tu web y tus automatizaciones se crean desde cero para tu marca y tu tipo de cliente.
                </p>
                <ul className="space-y-2.5">
                  {["Diseño único para tu marca", "Pensado para convertir visitas en clientes", "Automatizaciones adaptadas a tu forma de trabajar", "Todo con la misma imagen de marca"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(0,0,0,0.6)" }}>
                      <span style={{ color: "#7B2FBE" }}>✓</span>
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
                  background: "#F8F9FF",
                  border: "1px solid rgba(0,0,0,0.07)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,168,214,0.3)";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,168,214,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.07)";
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
                  <h3 className="text-2xl font-bold" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "#1a1a2e" }}>
                    Nos encargamos de todo
                  </h3>
                </div>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>
                  Tú nos cuentas qué necesitas y nosotros lo hacemos realidad. Sin tecnicismos y sin perder tu tiempo.
                </p>
                <ul className="space-y-2.5">
                  {["Un único equipo para web y automatización", "Entregas rápidas y sin sorpresas", "La IA trabaja a tu favor", "Soporte cercano cuando lo necesites"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(0,0,0,0.6)" }}>
                      <span style={{ color: "#00A8D6" }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ───────────────────────────────────────────────────── */}
        <section
          className="py-24 px-6 relative overflow-hidden"
          style={{ background: BRAND_GRADIENT, borderTop: "1px solid rgba(0,168,214,0.2)" }}
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
                ¿Hablamos de tu proyecto?
              </h2>
              <p className="text-xl mb-10" style={{ color: "rgba(255,255,255,0.8)" }}>
                Cuéntanos qué necesitas y te preparamos una propuesta sin compromiso.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <motion.a
                  href={CONTACT_HREF}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,0,0,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-10 py-4 font-black rounded-2xl text-base"
                  style={{ background: "#0D0D1A", color: "white" }}
                >
                  Pedir presupuesto
                </motion.a>
                <motion.a
                  href={IG_DM_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-10 py-4 font-black rounded-2xl text-base"
                  style={{ background: "rgba(255,255,255,0.14)", color: "white", border: "1px solid rgba(255,255,255,0.45)" }}
                >
                  Escríbenos por Instagram
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <footer
          className="py-14 px-6"
          style={{ background: "#F8F9FF", borderTop: "1px solid rgba(0,0,0,0.07)" }}
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
                <p className="text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.4)" }}>
                  Webs y automatización con IA para empresas que quieren crecer.
                </p>
              </div>
              {/* Servicios */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(0,0,0,0.5)" }}>
                  Servicios
                </h4>
                <ul className="space-y-2.5">
                  {SERVICES.map((sv) => (
                    <li key={sv.title}>
                      <a href="#servicios" className="text-sm transition-colors text-black/60 hover:text-[#1a1a2e]">
                        {sv.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Empresa */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(0,0,0,0.5)" }}>
                  Empresa
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { label: "Cómo funciona", href: "#como-funciona" },
                    { label: "Por qué Neuraxis", href: "#por-que" },
                    { label: "Área de clientes", href: "/login" },
                  ].map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-sm transition-colors text-black/60 hover:text-[#1a1a2e]">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Contacto */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(0,0,0,0.5)" }}>
                  Contacto
                </h4>
                <ul className="space-y-2.5">
                  <li>
                    <a href={CONTACT_HREF} className="text-sm transition-colors text-black/60 hover:text-[#1a1a2e]">
                      Pedir presupuesto por correo
                    </a>
                  </li>
                  <li>
                    <a href={IG_PROFILE_HREF} target="_blank" rel="noopener noreferrer" className="text-sm transition-colors text-black/60 hover:text-[#1a1a2e]">
                      Instagram {IG_HANDLE}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="pt-8 flex flex-col md:flex-row items-center justify-between gap-3"
              style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
            >
              <p className="text-xs" style={{ color: "rgba(0,0,0,0.3)" }}>
                © {new Date().getFullYear()} Neuraxis IA · Todos los derechos reservados
              </p>
              <nav className="flex items-center gap-4 text-xs">
                {LEGAL_LINKS.map((l) => (
                  <a key={l.href} href={l.href} className="text-black/40 hover:text-[#1a1a2e] transition-colors">
                    {l.label}
                  </a>
                ))}
              </nav>
              <p className="text-xs" style={{ color: "rgba(0,0,0,0.3)" }}>
                Hecho con ❤️ en España
              </p>
            </div>
          </div>
        </footer>

      </div>
    </SmoothScrollProvider>
  );
}
