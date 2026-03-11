"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GradientText from "@/components/ui/GradientText";
import NeonCard from "@/components/ui/NeonCard";
import NeonButton from "@/components/ui/NeonButton";

const SERVICES = [
  {
    icon: "🎯",
    title: "Consultoría Estratégica",
    desc: "Sesión 1:1 de 1h para definir tu hoja de ruta de IA. Diagnóstico, priorización y plan de acción.",
    price: "97€",
    tag: "Pago único",
    color: "#9B30FF",
  },
  {
    icon: "⚡",
    title: "Setup Completo",
    desc: "Implementamos 3 agentes IA, configuramos workflows n8n e integramos con tus herramientas actuales.",
    price: "497€",
    tag: "Proyecto",
    color: "#007AFF",
  },
  {
    icon: "🚀",
    title: "Agencia IA Llave en Mano",
    desc: "Construimos tu agencia de IA de principio a fin: agentes, automatizaciones, formación del equipo y soporte continuo.",
    price: "Personalizado",
    tag: "Enterprise",
    color: "#00FF88",
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
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.2)" }}>
          CAPA 3
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
          <GradientText>Delega</GradientText> a nuestro equipo
        </h1>
        <p className="text-sm max-w-xl" style={{ color: "var(--text-secondary)" }}>
          ¿Prefieres que lo hagamos nosotros? Nuestro equipo diseña, implementa y mantiene tu sistema de IA
          para que tú te centres en hacer crecer tu negocio.
        </p>
      </motion.div>

      {/* Services */}
      <motion.div {...fadeUp(0.08)} className="grid sm:grid-cols-3 gap-5">
        {SERVICES.map((s) => (
          <NeonCard key={s.title} className="p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: `${s.color}15`, color: s.color }}>
                {s.tag}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1" style={{ color: "var(--text-primary)" }}>{s.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{s.desc}</p>
            </div>
            <div className="mt-auto pt-2" style={{ borderTop: "1px solid var(--border-subtle)" }}>
              <span className="text-lg font-black" style={{ color: s.color }}>{s.price}</span>
            </div>
          </NeonCard>
        ))}
      </motion.div>

      {/* Contact form */}
      <motion.div {...fadeUp(0.16)}>
        <NeonCard className="p-6">
          <h2 className="text-base font-bold mb-1" style={{ fontFamily: "var(--font-syne)", color: "var(--text-primary)" }}>
            Cuéntanos tu proyecto
          </h2>
          <p className="text-xs mb-6" style={{ color: "var(--text-secondary)" }}>
            Respuesta en menos de 24h. Primera consulta gratuita.
          </p>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="text-4xl mb-3">✅</div>
              <p className="font-bold mb-1" style={{ color: "var(--text-primary)" }}>¡Mensaje enviado!</p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Te contactamos en menos de 24h.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
              {[
                { id: "name", label: "Nombre", type: "text", placeholder: "Tu nombre" },
                { id: "email", label: "Email", type: "email", placeholder: "tu@empresa.com" },
                { id: "company", label: "Empresa", type: "text", placeholder: "Nombre de tu empresa" },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>{label}</label>
                  <input
                    type={type}
                    required
                    placeholder={placeholder}
                    value={form[id as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                    className="px-3 py-2 rounded-xl text-sm outline-none focus:ring-1 transition-all"
                    style={{
                      background: "var(--bg-input)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
              ))}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>¿Qué necesitas?</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe tu proyecto, qué quieres automatizar o qué problema quieres resolver..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="px-3 py-2 rounded-xl text-sm outline-none resize-none focus:ring-1 transition-all"
                  style={{
                    background: "var(--bg-input)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
              <div className="sm:col-span-2">
                <NeonButton type="submit" loading={loading} className="w-full justify-center">
                  {loading ? "Enviando..." : "Enviar consulta →"}
                </NeonButton>
              </div>
            </form>
          )}
        </NeonCard>
      </motion.div>
    </div>
  );
}
