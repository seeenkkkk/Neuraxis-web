"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import NeonButton from "@/components/ui/NeonButton";
import GradientText from "@/components/ui/GradientText";

// ═══ DATA ═════════════════════════════════════════════════════════════════════

const PAIN_TAGS = [
  "Atención al cliente lenta",
  "Pierdo tiempo en tareas repetitivas",
  "No tengo sistema de ventas",
  "Mi equipo no escala",
  "No genero contenido suficiente",
  "Gestión de citas y reservas",
  "Seguimiento de leads",
  "Soporte técnico saturado",
];

const NICHES = [
  { id: "salud", label: "Salud", icon: "🏥" },
  { id: "legal", label: "Legal", icon: "⚖️" },
  { id: "inmobiliaria", label: "Inmobiliaria", icon: "🏠" },
  { id: "educacion", label: "Educación", icon: "🎓" },
  { id: "consultoria", label: "Consultoría", icon: "💼" },
  { id: "ecommerce", label: "E-commerce", icon: "🛒" },
  { id: "restaurantes", label: "Restaurantes", icon: "🍽️" },
  { id: "servicios", label: "Servicios técnicos", icon: "🔧" },
  { id: "saas", label: "SaaS", icon: "📱" },
  { id: "fitness", label: "Fitness", icon: "🏋️" },
  { id: "belleza", label: "Belleza", icon: "💇" },
  { id: "construccion", label: "Construcción", icon: "🏗️" },
];

const AGENT_TYPES = [
  { id: "chatbot", icon: "💬", label: "Chatbot Web", desc: "Atiende visitantes en tu web 24/7 y cualifica leads automáticamente." },
  { id: "email_outreach", icon: "📧", label: "Email Outreach", desc: "Envía secuencias de emails personalizados para captar y nutrir prospectos." },
  { id: "lead_qualifier", icon: "🔔", label: "Cualificador Leads", desc: "Filtra y puntúa leads automáticamente según tu criterio ideal." },
  { id: "appointment", icon: "📅", label: "Agendador Citas", desc: "Gestiona tu calendario y agenda citas sin intervención manual." },
  { id: "content_creator", icon: "📝", label: "Creador Contenido", desc: "Genera posts, artículos y newsletters con tu voz de marca." },
  { id: "data_analyzer", icon: "📊", label: "Analizador Datos", desc: "Procesa datos de negocio para generar insights accionables." },
  { id: "invoice_manager", icon: "🧾", label: "Gestor Facturas", desc: "Automatiza creación, envío y seguimiento de facturas y pagos." },
  { id: "researcher", icon: "🔍", label: "Investigador", desc: "Recopila información de mercado y competencia de forma autónoma." },
  { id: "sales_assistant", icon: "🛒", label: "Asistente Ventas", desc: "Acompaña al cliente en el proceso de compra y sube la conversión." },
  { id: "social_media", icon: "📣", label: "Social Media", desc: "Planifica, crea y publica contenido en redes sociales automáticamente." },
  { id: "hr", icon: "🧑‍💼", label: "RRHH", desc: "Gestiona selección, onboarding y comunicación interna sin fricción." },
  { id: "project_manager", icon: "🏗️", label: "Project Manager", desc: "Coordina tareas, plazos y equipos para que los proyectos no se retrasen." },
  { id: "onboarding", icon: "🎓", label: "Onboarding", desc: "Guía a nuevos clientes o empleados paso a paso desde el primer día." },
  { id: "tech_support", icon: "🔧", label: "Soporte Técnico", desc: "Resuelve dudas técnicas y tickets de soporte de forma automática." },
  { id: "webhook", icon: "⚡", label: "Webhook Custom", desc: "Conecta cualquier sistema vía webhooks para automatizaciones 100% custom." },
];

const BUYER_PERSONA_SUGGESTIONS: Record<string, string> = {
  salud: "Paciente 35-55 años, activo en redes, busca clínica de confianza. Precio secundario a calidad y respuesta rápida.",
  legal: "Empresario PYME 40-55 años, saturado. Busca asesoría preventiva sin jerga técnica ni sorpresas.",
  inmobiliaria: "Comprador primera vivienda 28-40 años. Compara mucho, necesita seguridad y transparencia total.",
  educacion: "Profesional 25-40 años que se forma mientras trabaja. Valora flexibilidad y resultados rápidos.",
  consultoria: "Director 45-60 años, orientado a resultados. Quiere ROI claro antes de comprometer presupuesto.",
  ecommerce: "Consumidor 20-45 años, compra desde móvil. Abandona carrito ante cualquier fricción.",
  restaurantes: "Cliente local 25-50 años. Reserva desde WhatsApp, valora confirmación inmediata y recordatorios.",
  servicios: "Propietario 35-55 años. Necesita soluciones rápidas con garantía y seguimiento post-servicio.",
  saas: "Tech lead o founder 28-45 años, analítico. Busca integraciones nativas y documentación clara.",
  fitness: "Persona activa 25-40 años buscando resultados. Necesita flexibilidad horaria y seguimiento personalizado.",
  belleza: "Mujer 25-45 años que reserva con anticipación. Valora recordatorios y confirmaciones por WhatsApp.",
  construccion: "Promotor o particular 35-60 años. Necesita presupuestos detallados y cumplimiento de plazos.",
};

const STEPS_LABELS = ["Problema", "Nicho", "Audiencia", "Tipo", "Configura", "Resultado"];

// ═══ TYPES ════════════════════════════════════════════════════════════════════

interface WizardData {
  problem: string;
  painTags: string[];
  niche: string;
  companySize: string;
  clientType: string;
  buyerPersona: string;
  agentType: string;
  agentName: string;
  instructions: string;
  tone: string;
  language: string;
  connectCalendly: boolean;
  connectWhatsApp: boolean;
  connectEmail: boolean;
  brain: string;
  systemPrompt: string;
  n8nJson: Record<string, unknown> | null;
}

const INITIAL: WizardData = {
  problem: "",
  painTags: [],
  niche: "",
  companySize: "",
  clientType: "",
  buyerPersona: "",
  agentType: "",
  agentName: "",
  instructions: "",
  tone: "Profesional",
  language: "Español",
  connectCalendly: false,
  connectWhatsApp: false,
  connectEmail: false,
  brain: "",
  systemPrompt: "",
  n8nJson: null,
};

// ═══ SHARED UI ════════════════════════════════════════════════════════════════

const BASE_INPUT: React.CSSProperties = {
  background: "#f5f7ff",
  borderRadius: "12px",
  color: "#0D0D1A",
  padding: "10px 14px",
  fontSize: "14px",
  width: "100%",
  outline: "none",
  transition: "border-color 0.15s",
  fontFamily: "inherit",
};

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [focus, setFocus] = useState(false);
  return (
    <input
      {...props}
      style={{ ...BASE_INPUT, border: `1px solid ${focus ? "#007AFF" : "rgba(0,0,0,0.08)"}` }}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focus, setFocus] = useState(false);
  return (
    <textarea
      {...props}
      style={{ ...BASE_INPUT, border: `1px solid ${focus ? "#007AFF" : "rgba(0,0,0,0.08)"}`, resize: "vertical", minHeight: 96 }}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [focus, setFocus] = useState(false);
  return (
    <select
      {...props}
      style={{ ...BASE_INPUT, border: `1px solid ${focus ? "#007AFF" : "rgba(0,0,0,0.08)"}`, appearance: "none", cursor: "pointer" }}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  );
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div
      className="flex items-center justify-between py-2.5 px-3 rounded-xl"
      style={{ background: "#f5f7ff", border: "1px solid rgba(0,0,0,0.08)" }}
    >
      <span className="text-sm" style={{ color: "#0D0D1A" }}>{label}</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className="relative w-9 h-5 rounded-full transition-colors duration-200 flex-shrink-0"
        style={{ background: value ? "#007AFF" : "rgba(0,0,0,0.12)" }}
      >
        <span
          className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200"
          style={{ transform: value ? "translateX(16px)" : "translateX(0)" }}
        />
      </button>
    </div>
  );
}

// ═══ STEPPER ══════════════════════════════════════════════════════════════════

function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {STEPS_LABELS.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300"
                style={{
                  background: done ? "#007AFF" : active ? "rgba(0,122,255,0.12)" : "transparent",
                  borderColor: done || active ? "#007AFF" : "rgba(0,0,0,0.10)",
                  color: done ? "#fff" : active ? "#007AFF" : "#4B5570",
                  boxShadow: active ? "0 0 14px rgba(0,122,255,0.45)" : done ? "0 0 8px rgba(0,122,255,0.2)" : "none",
                }}
              >
                {done ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : step}
              </div>
              <span className="text-[10px] hidden sm:block font-medium" style={{ color: active ? "#007AFF" : "#4B5570" }}>
                {label}
              </span>
            </div>
            {i < STEPS_LABELS.length - 1 && (
              <div
                className="w-6 sm:w-10 h-px mx-1.5 mb-5 transition-all duration-300"
                style={{ background: done ? "#007AFF" : "rgba(0,0,0,0.09)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ═══ STEP 1: PROBLEMA ════════════════════════════════════════════════════════

function Step1({ data, up }: { data: WizardData; up: (p: Partial<WizardData>) => void }) {
  function toggleTag(tag: string) {
    up({ painTags: data.painTags.includes(tag) ? data.painTags.filter((t) => t !== tag) : [...data.painTags, tag] });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "#0D0D1A" }}>
          ¿Qué problema quieres resolver?
        </h2>
        <p className="text-sm" style={{ color: "#4B5570" }}>
          Describe el reto principal que enfrenta tu negocio hoy.
        </p>
      </div>

      <div>
        <Textarea
          placeholder="Ej: Perdemos clientes potenciales porque no podemos responder rápido a las consultas. El equipo está saturado y necesitamos automatizar la primera respuesta y la cualificación..."
          value={data.problem}
          onChange={(e) => up({ problem: e.target.value })}
          rows={4}
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs" style={{ color: data.problem.length >= 50 ? "#007AFF" : "#4B5570" }}>
            {data.problem.length} / 50 caracteres mínimo
          </span>
          {data.problem.length >= 50 && (
            <span className="text-xs font-semibold" style={{ color: "#007AFF" }}>✓ Listo</span>
          )}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-3" style={{ color: "#4B5570" }}>
          O selecciona los problemas que más te identifican:
        </p>
        <div className="flex flex-wrap gap-2">
          {PAIN_TAGS.map((tag) => {
            const sel = data.painTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium border transition-all duration-150"
                style={{
                  background: sel ? "rgba(0,122,255,0.1)" : "transparent",
                  borderColor: sel ? "#007AFF" : "rgba(0,0,0,0.10)",
                  color: sel ? "#007AFF" : "#4B5570",
                  boxShadow: sel ? "0 0 8px rgba(0,122,255,0.2)" : "none",
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ═══ STEP 2: NICHO ════════════════════════════════════════════════════════════

function Step2({ data, up }: { data: WizardData; up: (p: Partial<WizardData>) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "#0D0D1A" }}>
          ¿En qué sector trabajas?
        </h2>
        <p className="text-sm" style={{ color: "#4B5570" }}>
          Selecciona tu nicho para adaptar el agente a tu industria.
        </p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {NICHES.map((niche) => {
          const sel = data.niche === niche.id;
          return (
            <motion.button
              key={niche.id}
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => up({ niche: niche.id })}
              className="p-4 rounded-xl border flex flex-col items-center gap-2 transition-all duration-150"
              style={{
                background: sel ? "rgba(0,122,255,0.08)" : "#ffffff",
                borderColor: sel ? "#007AFF" : "rgba(0,0,0,0.08)",
                boxShadow: sel ? "0 0 18px rgba(0,122,255,0.25)" : "none",
              }}
            >
              <span className="text-2xl">{niche.icon}</span>
              <span className="text-xs font-medium text-center leading-tight" style={{ color: sel ? "#007AFF" : "#0D0D1A" }}>
                {niche.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ═══ STEP 3: AUDIENCIA ════════════════════════════════════════════════════════

function Step3({ data, up }: { data: WizardData; up: (p: Partial<WizardData>) => void }) {
  const suggestion = data.niche ? BUYER_PERSONA_SUGGESTIONS[data.niche] : null;
  const nicheLabel = NICHES.find((n) => n.id === data.niche)?.label;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "#0D0D1A" }}>
          ¿A quién va dirigido?
        </h2>
        <p className="text-sm" style={{ color: "#4B5570" }}>
          Define tu cliente ideal para que el agente hable su idioma.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-2" style={{ color: "#4B5570" }}>Tamaño de empresa</label>
          <Select value={data.companySize} onChange={(e) => up({ companySize: e.target.value })}>
            <option value="">Seleccionar...</option>
            <option>Freelance</option>
            <option>1-10</option>
            <option>11-50</option>
            <option>51-200</option>
            <option>200+</option>
          </Select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-2" style={{ color: "#4B5570" }}>Tipo de cliente</label>
          <Select value={data.clientType} onChange={(e) => up({ clientType: e.target.value })}>
            <option value="">Seleccionar...</option>
            <option>B2B</option>
            <option>B2C</option>
            <option>Ambos</option>
          </Select>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium" style={{ color: "#4B5570" }}>Buyer Persona</label>
          {suggestion && (
            <button
              type="button"
              onClick={() => up({ buyerPersona: suggestion })}
              className="text-xs font-medium transition-colors"
              style={{ color: "#007AFF" }}
            >
              Usar sugerencia de {nicheLabel} →
            </button>
          )}
        </div>
        <Textarea
          placeholder="Describe tu cliente ideal: edad, sector, problemas principales, qué busca, cómo toma decisiones..."
          value={data.buyerPersona}
          onChange={(e) => up({ buyerPersona: e.target.value })}
          rows={4}
        />
        {suggestion && !data.buyerPersona && (
          <div
            className="mt-2 p-3 rounded-xl text-xs"
            style={{ background: "rgba(0,122,255,0.05)", border: "1px solid rgba(0,122,255,0.15)", color: "#4B5570" }}
          >
            <span className="font-semibold" style={{ color: "#007AFF" }}>Ejemplo {nicheLabel}: </span>
            {suggestion}
          </div>
        )}
        <span className="text-xs mt-2 block" style={{ color: data.buyerPersona.length >= 30 ? "#007AFF" : "#4B5570" }}>
          {data.buyerPersona.length} / 30 caracteres mínimo
        </span>
      </div>
    </div>
  );
}

// ═══ STEP 4: TIPO DE AGENTE ═══════════════════════════════════════════════════

function Step4({ data, up }: { data: WizardData; up: (p: Partial<WizardData>) => void }) {
  const selected = AGENT_TYPES.find((a) => a.id === data.agentType);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "#0D0D1A" }}>
          ¿Qué tipo de agente necesitas?
        </h2>
        <p className="text-sm" style={{ color: "#4B5570" }}>
          Elige el agente que mejor resuelve tu problema.
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {AGENT_TYPES.map((agent) => {
          const sel = data.agentType === agent.id;
          return (
            <motion.button
              key={agent.id}
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => up({ agentType: agent.id })}
              className="p-3 rounded-xl border flex flex-col items-center gap-1.5 text-center transition-all duration-150"
              style={{
                background: sel ? "rgba(0,122,255,0.08)" : "#ffffff",
                borderColor: sel ? "#007AFF" : "rgba(0,0,0,0.08)",
                boxShadow: sel ? "0 0 16px rgba(0,122,255,0.22)" : "none",
              }}
            >
              <span className="text-xl leading-none">{agent.icon}</span>
              <span className="text-[10px] font-medium leading-tight" style={{ color: sel ? "#007AFF" : "#0D0D1A" }}>
                {agent.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="p-4 rounded-xl flex items-start gap-3"
            style={{ background: "rgba(0,122,255,0.06)", border: "1px solid rgba(0,122,255,0.2)" }}
          >
            <span className="text-2xl mt-0.5 flex-shrink-0">{selected.icon}</span>
            <div>
              <p className="text-sm font-bold mb-0.5" style={{ color: "#007AFF" }}>{selected.label}</p>
              <p className="text-xs leading-relaxed" style={{ color: "#4B5570" }}>{selected.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══ STEP 5: PERSONALIZA ══════════════════════════════════════════════════════

function Step5({
  data,
  up,
  onSetupCheckout,
}: {
  data: WizardData;
  up: (p: Partial<WizardData>) => void;
  onSetupCheckout: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "#0D0D1A" }}>
          Personaliza tu agente
        </h2>
        <p className="text-sm" style={{ color: "#4B5570" }}>
          Dale identidad y define su comportamiento exacto.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-2" style={{ color: "#4B5570" }}>Nombre del agente *</label>
          <Input
            placeholder="Ej: ARIA, NEX, Luna, Max..."
            value={data.agentName}
            onChange={(e) => up({ agentName: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-2" style={{ color: "#4B5570" }}>Tono de comunicación</label>
          <Select value={data.tone} onChange={(e) => up({ tone: e.target.value })}>
            <option>Profesional</option>
            <option>Amigable</option>
            <option>Técnico</option>
            <option>Directo</option>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium mb-2" style={{ color: "#4B5570" }}>Instrucciones específicas</label>
        <Textarea
          placeholder="Qué debe hacer y qué NO debe hacer tu agente. Ej: Siempre ofrece una cita al final de la conversación. Nunca menciones precios exactos. Redirige quejas complejas al equipo humano..."
          value={data.instructions}
          onChange={(e) => up({ instructions: e.target.value })}
          rows={3}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-2" style={{ color: "#4B5570" }}>Idioma de respuesta</label>
          <Select value={data.language} onChange={(e) => up({ language: e.target.value })}>
            <option>Español</option>
            <option>Inglés</option>
            <option>Ambos</option>
          </Select>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium mb-3" style={{ color: "#4B5570" }}>Integraciones</p>
        <div className="space-y-2">
          <Toggle value={data.connectCalendly} onChange={(v) => up({ connectCalendly: v })} label="🗓️ Conectar con Calendly" />
          <Toggle value={data.connectWhatsApp} onChange={(v) => up({ connectWhatsApp: v })} label="💬 Conectar con WhatsApp" />
          <Toggle value={data.connectEmail} onChange={(v) => up({ connectEmail: v })} label="📧 Conectar con Email" />
        </div>
      </div>

      {/* Brain selection */}
      <div>
        <p className="text-sm font-bold mb-3" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "#0D0D1A" }}>
          Elige el cerebro de tu agente *
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          {/* Anthropic */}
          <div
            onClick={() => up({ brain: "anthropic" })}
            className="p-4 rounded-xl border cursor-pointer transition-all duration-150"
            style={{
              background: data.brain === "anthropic" ? "rgba(0,122,255,0.07)" : "#ffffff",
              borderColor: data.brain === "anthropic" ? "#007AFF" : "rgba(0,0,0,0.08)",
              boxShadow: data.brain === "anthropic" ? "0 0 18px rgba(0,122,255,0.20)" : "none",
            }}
          >
            <p className="font-bold text-sm mb-1" style={{ color: data.brain === "anthropic" ? "#007AFF" : "#0D0D1A" }}>
              ⚡ Anthropic (Claude)
            </p>
            <p className="text-xs mb-3 leading-relaxed" style={{ color: "#4B5570" }}>
              Mejor para razonamiento y conversaciones complejas
            </p>
            <a
              href="https://console.anthropic.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-medium underline transition-opacity hover:opacity-80"
              style={{ color: "#007AFF" }}
            >
              Añadir créditos en Anthropic →
            </a>
          </div>

          {/* OpenAI */}
          <div
            onClick={() => up({ brain: "openai" })}
            className="p-4 rounded-xl border cursor-pointer transition-all duration-150"
            style={{
              background: data.brain === "openai" ? "rgba(155,48,255,0.07)" : "#ffffff",
              borderColor: data.brain === "openai" ? "#9B30FF" : "rgba(0,0,0,0.08)",
              boxShadow: data.brain === "openai" ? "0 0 18px rgba(155,48,255,0.20)" : "none",
            }}
          >
            <p className="font-bold text-sm mb-1" style={{ color: data.brain === "openai" ? "#9B30FF" : "#0D0D1A" }}>
              🔮 OpenAI (GPT)
            </p>
            <p className="text-xs mb-3 leading-relaxed" style={{ color: "#4B5570" }}>
              Mejor para velocidad y tareas creativas
            </p>
            <a
              href="https://platform.openai.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-medium underline transition-opacity hover:opacity-80"
              style={{ color: "#9B30FF" }}
            >
              Añadir créditos en OpenAI →
            </a>
          </div>

          {/* Done for you */}
          <div
            onClick={() => up({ brain: "done_for_you" })}
            className="p-4 rounded-xl border cursor-pointer transition-all duration-150"
            style={{
              background: data.brain === "done_for_you" ? "rgba(0,196,255,0.07)" : "#ffffff",
              borderColor: data.brain === "done_for_you" ? "#00C4FF" : "rgba(0,0,0,0.08)",
              boxShadow: data.brain === "done_for_you" ? "0 0 18px rgba(0,196,255,0.22)" : "none",
            }}
          >
            <p className="font-bold text-sm mb-1" style={{ color: data.brain === "done_for_you" ? "#00C4FF" : "#0D0D1A" }}>
              🚀 Lo hacemos nosotros
            </p>
            <p className="text-xs mb-2 leading-relaxed" style={{ color: "#4B5570" }}>
              Nos encargamos de toda la configuración técnica
            </p>
            <p className="text-xs font-bold mb-3" style={{ color: "#00C4FF" }}>+49€ pago único</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                up({ brain: "done_for_you" });
                onSetupCheckout();
              }}
              className="w-full text-xs font-semibold py-1.5 rounded-lg transition-all hover:opacity-80"
              style={{ background: "rgba(0,196,255,0.15)", color: "#00C4FF", border: "1px solid rgba(0,196,255,0.3)" }}
            >
              Quiero que lo hagáis vosotros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══ STEP 6: RESULTADO ════════════════════════════════════════════════════════

interface Step6Props {
  data: WizardData;
  generating: boolean;
  showModal: boolean;
  setShowModal: (v: boolean) => void;
  copied: boolean;
  onCopy: () => void;
  onDownload: () => void;
  onCheckout: (planId: string) => void;
  checkoutLoading: string | null;
}

function Step6({ data, generating, showModal, setShowModal, copied, onCopy, onDownload, onCheckout, checkoutLoading }: Step6Props) {
  const nicheInfo = NICHES.find((n) => n.id === data.niche);
  const agentTypeInfo = AGENT_TYPES.find((a) => a.id === data.agentType);

  if (generating) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-5">
        <div
          className="w-14 h-14 rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: "#007AFF", borderTopColor: "transparent" }}
        />
        <div className="text-center">
          <p className="text-sm font-semibold mb-1" style={{ color: "#007AFF" }}>Generando tu agente con IA...</p>
          <p className="text-xs" style={{ color: "#4B5570" }}>Creando system prompt personalizado y workflow n8n</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "#0D0D1A" }}>
          Tu agente está listo
        </h2>
        <p className="text-sm" style={{ color: "#4B5570" }}>
          Aquí tienes todo lo que necesitas para desplegarlo.
        </p>
      </div>

      {/* Summary card */}
      <div
        className="p-5 rounded-2xl"
        style={{ background: "#ffffff", border: "1px solid rgba(0,122,255,0.25)", boxShadow: "0 0 32px rgba(0,122,255,0.08)" }}
      >
        <div className="flex items-center gap-4 mb-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: "rgba(0,122,255,0.12)", border: "1.5px solid rgba(0,122,255,0.3)" }}
          >
            {agentTypeInfo?.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "#0D0D1A" }}>
              {data.agentName}
            </h3>
            <p className="text-sm" style={{ color: "#007AFF" }}>{agentTypeInfo?.label}</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-y-2 gap-x-4 text-sm">
          {[
            ["Sector", `${nicheInfo?.icon} ${nicheInfo?.label}`],
            ["Audiencia", `${data.companySize} · ${data.clientType}`],
            ["Tono", data.tone],
            ["Idioma", data.language],
            ["Cerebro", data.brain === "anthropic" ? "Claude (Anthropic)" : data.brain === "openai" ? "GPT (OpenAI)" : "Gestionado por Neuraxis"],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-2">
              <span style={{ color: "#4B5570" }}>{k}:</span>
              <span style={{ color: "#0D0D1A" }}>{v}</span>
            </div>
          ))}
          {(data.connectCalendly || data.connectWhatsApp || data.connectEmail) && (
            <div className="flex gap-2 sm:col-span-2">
              <span style={{ color: "#4B5570" }}>Integraciones:</span>
              <span style={{ color: "#0D0D1A" }}>
                {[data.connectCalendly && "Calendly", data.connectWhatsApp && "WhatsApp", data.connectEmail && "Email"].filter(Boolean).join(", ")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <NeonButton variant="secondary" onClick={() => setShowModal(true)}>
          Ver prompt completo
        </NeonButton>
        {data.n8nJson && (
          <NeonButton variant="secondary" onClick={onDownload}>
            Descargar workflow n8n
          </NeonButton>
        )}
        <NeonButton variant="ghost" onClick={onCopy}>
          {copied ? "✓ Copiado" : "Copiar prompt"}
        </NeonButton>
      </div>

      {/* Divider */}
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px" style={{ background: "rgba(0,0,0,0.08)" }} />
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 text-sm font-medium" style={{ background: "#ffffff", color: "#4B5570" }}>
            Para usar tu agente, elige un plan
          </span>
        </div>
      </div>

      {/* Plans */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Basico */}
        <div
          className="p-5 rounded-2xl flex flex-col"
          style={{ background: "#f8f9ff", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "#4B5570" }}>Básico</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "#0D0D1A" }}>10€</span>
              <span className="text-sm" style={{ color: "#4B5570" }}>pago único</span>
            </div>
          </div>
          <ul className="space-y-2 mb-6 flex-1">
            {["1 agente IA configurado", "System prompt completo", "Workflow n8n incluido", "Soporte por email"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "#4B5570" }}>
                <span style={{ color: "#007AFF" }}>✓</span> {f}
              </li>
            ))}
          </ul>
          <NeonButton
            variant="secondary"
            onClick={() => onCheckout("agent_basic")}
            loading={checkoutLoading === "agent_basic"}
          >
            Obtener este agente por 10€
          </NeonButton>
        </div>

        {/* Pro */}
        <div
          className="p-5 rounded-2xl flex flex-col relative"
          style={{ background: "#f8f9ff", border: "2px solid #007AFF", boxShadow: "0 0 32px rgba(0,122,255,0.15)" }}
        >
          <div className="absolute -top-3.5 left-4">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #007AFF, #9B30FF)", color: "#fff" }}
            >
              Más popular
            </span>
          </div>
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "#4B5570" }}>Pro</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "#0D0D1A" }}>29€</span>
              <span className="text-sm" style={{ color: "#4B5570" }}>/mes</span>
            </div>
          </div>
          <ul className="space-y-2 mb-6 flex-1">
            {["5 agentes IA activos", "Workflows n8n ilimitados", "Soporte prioritario", "Actualizaciones mensuales", "Dashboard de conversaciones"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "#4B5570" }}>
                <span style={{ color: "#007AFF" }}>✓</span> {f}
              </li>
            ))}
          </ul>
          <NeonButton
            onClick={() => onCheckout("agent_pro")}
            loading={checkoutLoading === "agent_pro"}
          >
            Empezar por 29€/mes
          </NeonButton>
        </div>
      </div>

      {/* Done for you CTA */}
      {data.brain === "done_for_you" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl"
          style={{ background: "rgba(0,196,255,0.05)", border: "1px solid rgba(0,196,255,0.25)" }}
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="font-bold text-sm mb-1" style={{ color: "#00C4FF" }}>🚀 Configuración completa por nosotros</p>
              <p className="text-xs leading-relaxed" style={{ color: "#4B5570" }}>
                Nos encargamos de toda la configuración técnica: API keys, integraciones, pruebas y entrega lista para usar en producción.
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-bold text-xl" style={{ color: "#00C4FF" }}>49€</p>
              <p className="text-xs" style={{ color: "#4B5570" }}>único</p>
            </div>
          </div>
          <NeonButton
            className="w-full"
            onClick={() => onCheckout("agent_setup")}
            loading={checkoutLoading === "agent_setup"}
          >
            Quiero que lo hagáis vosotros — 49€
          </NeonButton>
        </motion.div>
      )}

      {/* Prompt modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-4 sm:inset-8 z-50 flex items-center justify-center"
            >
              <div
                className="w-full max-w-2xl max-h-full flex flex-col rounded-2xl overflow-hidden"
                style={{ background: "#ffffff", border: "1px solid rgba(0,122,255,0.25)" }}
              >
                <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                  <h3 className="font-bold" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "#0D0D1A" }}>
                    System Prompt — {data.agentName}
                  </h3>
                  <button type="button" onClick={() => setShowModal(false)} style={{ color: "#4B5570" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-5">
                  <pre
                    className="text-xs leading-relaxed whitespace-pre-wrap"
                    style={{ color: "#4B5570", fontFamily: "monospace" }}
                  >
                    {data.systemPrompt || "Generando..."}
                  </pre>
                </div>
                <div className="p-4 border-t flex justify-end gap-2" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                  <NeonButton variant="ghost" onClick={() => setShowModal(false)}>Cerrar</NeonButton>
                  <NeonButton variant="secondary" onClick={onCopy}>{copied ? "✓ Copiado" : "Copiar prompt"}</NeonButton>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══ MAIN COMPONENT ═══════════════════════════════════════════════════════════

export default function CreateAgentPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(INITIAL);
  const [generating, setGenerating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  const up = useCallback((patch: Partial<WizardData>) => setData((d) => ({ ...d, ...patch })), []);

  // Auto-generate when entering step 6
  useEffect(() => {
    if (step === 6 && !data.systemPrompt && !generating) {
      generateAgent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  async function generateAgent() {
    setGenerating(true);
    try {
      const res = await fetch("/api/agents/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.systemPrompt) {
        const patch = { systemPrompt: result.systemPrompt, n8nJson: result.n8nJson };
        up(patch);
        // Save agent to Supabase (non-blocking)
        fetch("/api/agents/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, ...patch }),
        }).catch(() => {});
      }
    } finally {
      setGenerating(false);
    }
  }

  async function handleCheckout(planId: string) {
    setCheckoutLoading(planId);
    try {
      const res = await fetch("/api/stripe/agent-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const { url, error } = await res.json();
      if (url) window.location.href = url;
      else console.error(error);
    } finally {
      setCheckoutLoading(null);
    }
  }

  function handleSetupCheckout() {
    handleCheckout("agent_setup");
  }

  function downloadN8n() {
    if (!data.n8nJson) return;
    const blob = new Blob([JSON.stringify(data.n8nJson, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(data.agentName || "agente").toLowerCase().replace(/\s+/g, "-")}-workflow.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function copyPrompt() {
    navigator.clipboard.writeText(data.systemPrompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function canNext(): boolean {
    if (step === 1) return data.problem.length >= 50;
    if (step === 2) return !!data.niche;
    if (step === 3) return !!data.companySize && !!data.clientType && data.buyerPersona.length >= 30;
    if (step === 4) return !!data.agentType;
    if (step === 5) return !!data.agentName && !!data.brain;
    return true;
  }

  return (
    <div className="max-w-3xl mx-auto pb-16">
      {/* Back */}
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm mb-6 transition-opacity hover:opacity-70"
        style={{ color: "#4B5570" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Volver a agentes
      </button>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "#0D0D1A" }}>
          Crea tu <GradientText>Agente IA</GradientText>
        </h1>
        <p className="text-sm" style={{ color: "#4B5570" }}>
          Configura tu agente personalizado en 6 pasos. Sin código.
        </p>
      </div>

      <Stepper current={step} />

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.18 }}
        >
          {step === 1 && <Step1 data={data} up={up} />}
          {step === 2 && <Step2 data={data} up={up} />}
          {step === 3 && <Step3 data={data} up={up} />}
          {step === 4 && <Step4 data={data} up={up} />}
          {step === 5 && <Step5 data={data} up={up} onSetupCheckout={handleSetupCheckout} />}
          {step === 6 && (
            <Step6
              data={data}
              generating={generating}
              showModal={showModal}
              setShowModal={setShowModal}
              copied={copied}
              onCopy={copyPrompt}
              onDownload={downloadN8n}
              onCheckout={handleCheckout}
              checkoutLoading={checkoutLoading}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {step < 6 && (
        <div className="flex justify-between mt-8 pt-6" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
          <NeonButton
            variant="ghost"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
          >
            ← Anterior
          </NeonButton>
          <NeonButton onClick={() => setStep((s) => Math.min(6, s + 1))} disabled={!canNext()}>
            {step === 5 ? "Generar agente →" : "Siguiente →"}
          </NeonButton>
        </div>
      )}
    </div>
  );
}
