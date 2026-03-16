"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// ── Constants ─────────────────────────────────────────────────────────────────

const BRAND_GRADIENT = "linear-gradient(135deg, #8BC34A 0%, #7B1FA2 50%, #00BCD4 100%)";

const SERVICES = [
  {
    icon: "🎯",
    title: "Consultoría Estratégica",
    desc: "Sesión 1:1 de 1h para definir tu hoja de ruta de IA. Diagnóstico, priorización y plan de acción.",
    price: "97€",
    tag: "Pago único",
    tagColor: "#8BC34A",
    hoverBorder: "#8BC34A",
  },
  {
    icon: "⚡",
    title: "Setup Completo",
    desc: "Implementamos 3 agentes IA, configuramos workflows n8n e integramos con tus herramientas actuales.",
    price: "497€",
    tag: "Más popular",
    tagColor: "#00BCD4",
    hoverBorder: "#00BCD4",
    highlighted: true,
  },
  {
    icon: "🚀",
    title: "Agencia IA Llave en Mano",
    desc: "Construimos tu agencia de IA de principio a fin: agentes, automatizaciones, formación del equipo y soporte continuo.",
    price: "Personalizado",
    tag: "Enterprise",
    tagColor: "#7B1FA2",
    hoverBorder: "#7B1FA2",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: "easeOut" as const },
});

export default function DelegatePage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission — replace with real API call
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div {...fadeUp(0)}>
        <div className="flex items-start justify-between gap-6">
          <div>
            <div
              className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: "rgba(139,195,74,0.12)", color: "#8BC34A", border: "1px solid rgba(139,195,74,0.25)" }}
            >
              CAPA 3
            </div>
            <h1 className="text-2xl font-bold mb-2">
              <span className="grad-text-brand">Delega con Neuraxis</span>
            </h1>
            <p className="text-sm max-w-xl" style={{ color: "#9ca3af" }}>
              ¿Prefieres que lo hagamos nosotros? Nuestro equipo diseña, implementa y mantiene tu sistema de IA
              para que tú te centres en hacer crecer tu negocio.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/avatar2.png-removebg-preview.png"
            alt=""
            className="w-32 flex-shrink-0 nex-float hidden md:block"
          />
        </div>
      </motion.div>

      {/* Services */}
      <motion.div {...fadeUp(0.08)} className="grid sm:grid-cols-3 gap-5">
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className="rounded-2xl p-6 flex flex-col gap-3 transition-all duration-200"
            style={{
              background: "#111827",
              border: s.highlighted ? `2px solid ${s.hoverBorder}` : "1px solid rgba(255,255,255,0.08)",
              boxShadow: s.highlighted ? `0 0 30px ${s.hoverBorder}18` : "none",
            }}
            onMouseEnter={e => {
              if (!s.highlighted) (e.currentTarget as HTMLElement).style.borderColor = s.hoverBorder;
            }}
            onMouseLeave={e => {
              if (!s.highlighted) (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            <div className="flex items-start justify-between">
              <span className="text-2xl">{s.icon}</span>
              {s.highlighted && (
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ background: BRAND_GRADIENT }}
                >
                  {s.tag}
                </span>
              )}
              {!s.highlighted && (
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${s.tagColor}15`, color: s.tagColor }}
                >
                  {s.tag}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1 text-white">{s.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "#9ca3af" }}>{s.desc}</p>
            </div>
            <div className="mt-auto pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="text-4xl font-black grad-text-brand">{s.price}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Contact form */}
      <motion.div {...fadeUp(0.16)}>
        <div
          className="rounded-2xl p-6 transition-all duration-200"
          style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <h2 className="text-base font-bold mb-1 text-white">
            Cuéntanos tu proyecto
          </h2>
          <p className="text-xs mb-6" style={{ color: "#9ca3af" }}>
            Respuesta en menos de 24h. Primera consulta gratuita.
          </p>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 flex flex-col items-center gap-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/avatar3.png-removebg-preview.png" alt="" className="w-24" />
              <div>
                <p className="font-bold mb-1" style={{ color: "#8BC34A" }}>¡Mensaje enviado!</p>
                <p className="text-sm" style={{ color: "#9ca3af" }}>Te contactamos en menos de 24h.</p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
              {[
                { id: "name", label: "Nombre", type: "text", placeholder: "Tu nombre" },
                { id: "email", label: "Email", type: "email", placeholder: "tu@empresa.com" },
                { id: "company", label: "Empresa", type: "text", placeholder: "Nombre de tu empresa" },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: "#9ca3af" }}>{label}</label>
                  <input
                    type={type}
                    required
                    placeholder={placeholder}
                    value={form[id as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                    className="px-3 py-2.5 rounded-xl text-sm text-white outline-none transition-all"
                    style={{
                      background: "rgba(0,0,0,0.40)",
                      border: "1px solid rgba(255,255,255,0.10)",
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#00BCD4")}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
                  />
                </div>
              ))}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-semibold" style={{ color: "#9ca3af" }}>¿Qué necesitas?</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe tu proyecto, qué quieres automatizar o qué problema quieres resolver..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="px-3 py-2.5 rounded-xl text-sm text-white outline-none resize-none transition-all"
                  style={{
                    background: "rgba(0,0,0,0.40)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#00BCD4")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ background: BRAND_GRADIENT }}
                >
                  {loading ? "Enviando..." : "Enviar consulta →"}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
