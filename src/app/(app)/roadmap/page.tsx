"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import GradientText from "@/components/ui/GradientText";
import NeonButton from "@/components/ui/NeonButton";

// ═══ CONSTANTS ════════════════════════════════════════════════════════════════

const PAIN_TAGS = [
  "Pierdo tiempo en tareas repetitivas",
  "Mi equipo no escala",
  "No tengo sistema de ventas",
  "Atención al cliente lenta",
  "No genero contenido suficiente",
  "Gestión de citas y reservas",
  "Seguimiento de leads",
  "Soporte técnico saturado",
];

const SECTORS = [
  "SaaS", "E-commerce", "Consultoría", "Salud", "Legal",
  "Inmobiliaria", "Educación", "Hostelería", "Finanzas",
  "Fitness", "Belleza", "Construcción", "Otro",
];

const COMPANY_SIZES = [
  { value: "freelance", label: "Freelance / Solo" },
  { value: "1-10", label: "1–10 empleados" },
  { value: "11-50", label: "11–50 empleados" },
  { value: "51-200", label: "51–200 empleados" },
  { value: "200+", label: "Más de 200" },
];

const AGENT_TYPES = [
  { id: "email_outreach", emoji: "📧", label: "Email Outreach" },
  { id: "chatbot_web", emoji: "💬", label: "Chatbot Web" },
  { id: "content_writer", emoji: "📝", label: "Content Writer" },
  { id: "data_analyst", emoji: "📊", label: "Data Analyst" },
  { id: "lead_qualifier", emoji: "🔔", label: "Lead Qualifier" },
  { id: "scheduler", emoji: "📅", label: "Scheduler" },
  { id: "invoice_manager", emoji: "🧾", label: "Invoice Manager" },
  { id: "research_agent", emoji: "🔍", label: "Research Agent" },
  { id: "ecommerce_helper", emoji: "🛒", label: "E-commerce Helper" },
  { id: "social_media", emoji: "📣", label: "Social Media" },
  { id: "hr_screener", emoji: "🧑‍💼", label: "HR Screener" },
  { id: "project_manager", emoji: "🏗️", label: "Project Manager" },
  { id: "onboarding_bot", emoji: "🎓", label: "Onboarding Bot" },
  { id: "tech_support", emoji: "🔧", label: "Tech Support" },
  { id: "custom_webhook", emoji: "⚡", label: "Custom Webhook" },
];

const LANDING_PLATFORMS = [
  { id: "framer", name: "Framer", desc: "Diseño visual + animaciones premium", url: "https://framer.com/templates", color: "#00AAFF" },
  { id: "webflow", name: "Webflow", desc: "Control total + CMS integrado", url: "https://webflow.com/templates", color: "#A855F7" },
];

const STEP_TITLES = [
  "Identificar el Problema",
  "Soluciones con IA",
  "Definir tu Nicho",
  "Pricing y Paquetes",
  "Landing Page",
  "Agente + Pago",
];

const STEP_SUBTITLES = [
  "Define el dolor específico que tu agente resolverá",
  "Elige el enfoque de IA que mejor resuelve el problema",
  "Especialízate para dominar un segmento del mercado",
  "Diseña tu modelo de negocio y precios",
  "Crea tu presencia digital que convierte",
  "Tu agente configurado listo para activar",
];

const STEP_COLORS = ["#00FF88", "#00AAFF", "#A855F7", "#FFD700", "#FF6B35", "#7C3AED"];

// ═══ TYPES ════════════════════════════════════════════════════════════════════

interface Suggestion { title: string; description: string; approach: string; }
interface PricingTier { name: string; price: string; features: string[]; }
interface ProjectData {
  id?: string;
  current_step?: number;
  status?: string;
  problem_statement?: string | null;
  pain_tags?: string[] | null;
  ai_approach?: string | null;
  ai_suggestions?: Suggestion[] | null;
  niche_sector?: string | null;
  company_size?: string | null;
  buyer_persona?: string | null;
  pricing_tiers?: { tiers: PricingTier[]; currency: string; billing: string } | null;
  landing_platform?: string | null;
  agent_type?: string | null;
  generated_prompt?: string | null;
  n8n_json?: unknown;
}

// ═══ SHARED INPUT STYLES ══════════════════════════════════════════════════════

const iBase: React.CSSProperties = {
  background: "#0F0F1C", borderRadius: "10px", color: "#F0F0FF",
  padding: "9px 12px", fontSize: "13px", width: "100%", outline: "none",
  transition: "border-color 0.15s", fontFamily: "inherit",
};

function SInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [f, setF] = useState(false);
  return <input {...props} style={{ ...iBase, border: `1px solid ${f ? "#00AAFF" : "rgba(255,255,255,0.06)"}` }} onFocus={() => setF(true)} onBlur={() => setF(false)} />;
}
function STextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [f, setF] = useState(false);
  return <textarea {...props} style={{ ...iBase, border: `1px solid ${f ? "#00AAFF" : "rgba(255,255,255,0.06)"}`, resize: "vertical", minHeight: 90 }} onFocus={() => setF(true)} onBlur={() => setF(false)} />;
}
function SSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [f, setF] = useState(false);
  return <select {...props} style={{ ...iBase, border: `1px solid ${f ? "#00AAFF" : "rgba(255,255,255,0.06)"}`, appearance: "none", cursor: "pointer" }} onFocus={() => setF(true)} onBlur={() => setF(false)} />;
}

// ═══ STEP 1 FORM ══════════════════════════════════════════════════════════════

function Step1Form({ project, onSave }: { project: ProjectData; onSave: (d: Record<string, unknown>) => Promise<void> }) {
  const [statement, setStatement] = useState(project.problem_statement ?? "");
  const [tags, setTags] = useState<string[]>(project.pain_tags ?? []);
  const [saving, setSaving] = useState(false);
  const isValid = statement.trim().length >= 50;

  const toggleTag = (tag: string) =>
    setTags((p) => p.includes(tag) ? p.filter((t) => t !== tag) : [...p, tag]);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
          ¿Qué problema resuelves con tu agente?
        </label>
        <STextarea
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
          placeholder="Ej: Mis clientes tardan días en recibir respuesta porque el equipo de soporte está saturado. Perdemos leads porque nadie los contacta en las primeras 24h..."
          rows={4}
        />
        <div className="flex items-center justify-between">
          <p className="text-[10px]" style={{ color: isValid ? "var(--neon-green)" : "var(--text-muted)" }}>
            {statement.length}/50 caracteres mínimo
          </p>
          {!isValid && statement.length > 0 && (
            <p className="text-[10px]" style={{ color: "#FF6B35" }}>
              {50 - statement.length} más
            </p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
          Pain points relacionados <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(selecciona los que aplican)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {PAIN_TAGS.map((tag) => {
            const sel = tags.includes(tag);
            return (
              <button key={tag} type="button" onClick={() => toggleTag(tag)}
                className="text-xs px-3 py-1.5 rounded-lg border transition-all duration-150"
                style={{ background: sel ? "rgba(0,170,255,0.08)" : "var(--bg-elevated)", border: `1px solid ${sel ? "rgba(0,170,255,0.4)" : "var(--border-subtle)"}`, color: sel ? "#00AAFF" : "var(--text-secondary)" }}>
                {sel ? "✓ " : ""}{tag}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end">
        <NeonButton disabled={!isValid || saving} loading={saving}
          onClick={async () => { setSaving(true); await onSave({ problem_statement: statement.trim(), pain_tags: tags }); setSaving(false); }}>
          Guardar y continuar →
        </NeonButton>
      </div>
    </div>
  );
}

// ═══ STEP 2 — TAG SUGGESTIONS MAP ════════════════════════════════════════════

const TAG_SUGGESTIONS: Record<string, Suggestion[]> = {
  "Pierdo tiempo en tareas repetitivas": [
    { title: "Agente automatizador de tareas", description: "Detecta y automatiza las tareas repetitivas de tu flujo de trabajo con IA.", approach: "Automatización con n8n + IA" },
    { title: "Workflow n8n repetitivo", description: "Crea flujos n8n que ejecuten tus procesos recurrentes sin intervención humana.", approach: "Workflow n8n" },
    { title: "Bot de gestión interna", description: "Un bot interno que gestiona solicitudes, recordatorios y procesos del equipo.", approach: "Bot interno con IA" },
  ],
  "Mi equipo no escala": [
    { title: "Agente de onboarding automático", description: "Incorpora nuevos miembros o clientes de forma automatizada sin carga manual.", approach: "Onboarding IA" },
    { title: "Delegador de tareas IA", description: "Distribuye y asigna tareas al equipo según prioridades y carga de trabajo.", approach: "Delegación inteligente" },
    { title: "Sistema de documentación automática", description: "Genera y mantiene documentación actualizada sin esfuerzo manual.", approach: "Documentación con IA" },
  ],
  "No tengo sistema de ventas": [
    { title: "Agente cualificador de leads", description: "Evalúa y prioriza leads automáticamente según criterios de compra definidos.", approach: "Lead scoring IA" },
    { title: "Secuencia email automática", description: "Envía emails personalizados en el momento justo para convertir leads.", approach: "Email automation" },
    { title: "CRM con IA", description: "Gestiona contactos, seguimientos y oportunidades de venta con IA integrada.", approach: "CRM automatizado" },
  ],
  "Atención al cliente lenta": [
    { title: "Chatbot 24/7", description: "Responde consultas de clientes en tiempo real sin importar la hora.", approach: "Chatbot IA" },
    { title: "Agente de soporte automático", description: "Resuelve tickets y solicitudes comunes sin intervención del equipo.", approach: "Soporte IA" },
    { title: "Sistema de tickets IA", description: "Clasifica, prioriza y responde tickets de soporte automáticamente.", approach: "Ticketing IA" },
  ],
  "No genero contenido suficiente": [
    { title: "Agente redactor de contenido", description: "Genera artículos, posts y copys de calidad a partir de tus briefings.", approach: "Generación de contenido" },
    { title: "Autoposter redes sociales", description: "Planifica y publica contenido en redes sociales de forma automática.", approach: "Social media automation" },
    { title: "Generador de emails", description: "Crea newsletters y secuencias de email personalizadas con IA.", approach: "Email copywriting IA" },
  ],
  "Gestión de citas y reservas": [
    { title: "Agente de agendamiento", description: "Gestiona reservas y citas automáticamente sin llamadas ni emails manuales.", approach: "Agendamiento IA" },
    { title: "Integración Calendly automática", description: "Conecta tu calendario con recordatorios y seguimientos automáticos.", approach: "Calendly + automatización" },
    { title: "Recordatorios automáticos", description: "Envía recordatorios personalizados para reducir cancelaciones y no-shows.", approach: "Recordatorios IA" },
  ],
  "Seguimiento de leads": [
    { title: "Agente de seguimiento automático", description: "Contacta leads en el momento óptimo con mensajes personalizados.", approach: "Follow-up IA" },
    { title: "Secuencia nurturing", description: "Nutre leads con contenido relevante hasta que estén listos para comprar.", approach: "Lead nurturing" },
    { title: "CRM automatizado", description: "Actualiza automáticamente el estado de cada lead según sus interacciones.", approach: "CRM con IA" },
  ],
  "Soporte técnico saturado": [
    { title: "Bot de soporte técnico", description: "Responde dudas técnicas comunes con respuestas precisas y actualizadas.", approach: "Soporte técnico IA" },
    { title: "Base de conocimiento IA", description: "Crea una base de conocimiento que se actualiza sola con cada caso resuelto.", approach: "Knowledge base IA" },
    { title: "Sistema escalado automático", description: "Filtra y escala los tickets críticos al equipo humano adecuado.", approach: "Escalado inteligente" },
  ],
};

const DEFAULT_SUGGESTIONS: Suggestion[] = [
  { title: "Agente de automatización general", description: "Automatiza flujos de trabajo clave para liberar tiempo del equipo.", approach: "Automatización con IA" },
  { title: "Chatbot de atención", description: "Responde consultas frecuentes de clientes de forma automática.", approach: "Chatbot IA" },
  { title: "Agente de seguimiento", description: "Hace seguimiento automático de leads y oportunidades de venta.", approach: "Follow-up IA" },
];

// ═══ STEP 2 FORM ══════════════════════════════════════════════════════════════

function Step2Form({ project, onSave }: { project: ProjectData; onSave: (d: Record<string, unknown>) => Promise<void> }) {
  const suggestions: Suggestion[] = (() => {
    const tags = project.pain_tags ?? [];
    if (tags.length > 0 && TAG_SUGGESTIONS[tags[0]]) return TAG_SUGGESTIONS[tags[0]];
    for (const tag of tags) {
      if (TAG_SUGGESTIONS[tag]) return TAG_SUGGESTIONS[tag];
    }
    return DEFAULT_SUGGESTIONS;
  })();

  const [selected, setSelected] = useState<number | null>(() => {
    if (!project.ai_approach) return null;
    const idx = suggestions.findIndex((s) => s.title === project.ai_approach);
    return idx >= 0 ? idx : null;
  });
  const [useCustom, setUseCustom] = useState(!!(project.ai_approach && !suggestions.find((s) => s.title === project.ai_approach)));
  const [customIdea, setCustomIdea] = useState(() => {
    if (project.ai_approach && !suggestions.find((s) => s.title === project.ai_approach)) return project.ai_approach;
    return "";
  });
  const [saving, setSaving] = useState(false);

  const COLORS = ["#00AAFF", "#A855F7", "#00FF88"];
  const chosenApproach = useCustom ? customIdea.trim() : selected !== null ? suggestions[selected]?.title : "";
  const isValid = chosenApproach.length > 0;

  return (
    <div className="space-y-5">
      {project.problem_statement && (
        <div className="rounded-xl px-4 py-3" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
          <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>Problema (paso 1)</p>
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>{project.problem_statement}</p>
        </div>
      )}

      <div className="space-y-3">
        <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
          Soluciones recomendadas{project.pain_tags?.[0] ? ` para "${project.pain_tags[0]}"` : ""}
        </label>

        <div className="space-y-3">
          {suggestions.map((s, i) => {
            const color = COLORS[i];
            const isSel = selected === i && !useCustom;
            return (
              <button key={i} type="button" onClick={() => { setSelected(i); setUseCustom(false); }}
                className="w-full rounded-2xl p-4 text-left transition-all duration-150"
                style={{ background: isSel ? `${color}10` : "var(--bg-elevated)", border: `1px solid ${isSel ? color + "60" : "var(--border-card)"}`, boxShadow: isSel ? `0 0 14px ${color}20` : "none" }}>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5"
                    style={{ background: isSel ? color : "var(--bg-card)", border: `1.5px solid ${isSel ? color : "var(--border-subtle)"}`, color: isSel ? "#000" : "var(--text-muted)" }}>
                    {isSel ? "✓" : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold mb-0.5" style={{ color: isSel ? color : "var(--text-primary)" }}>{s.title}</p>
                    <p className="text-xs leading-relaxed mb-1" style={{ color: "var(--text-secondary)" }}>{s.description}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-md" style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>{s.approach}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="space-y-2">
          <button type="button" onClick={() => { setUseCustom(!useCustom); setSelected(null); }}
            className="flex items-center gap-2 text-xs transition-opacity hover:opacity-80"
            style={{ color: useCustom ? "var(--neon-purple)" : "var(--text-muted)" }}>
            <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
              style={{ background: useCustom ? "rgba(168,85,247,0.15)" : "var(--bg-elevated)", border: `1px solid ${useCustom ? "#A855F7" : "var(--border-subtle)"}` }}>
              {useCustom && <span style={{ color: "#A855F7", fontSize: 8 }}>✓</span>}
            </div>
            Tengo mi propia idea
          </button>
          {useCustom && (
            <SInput placeholder="Describe tu idea de solución con IA..." value={customIdea} onChange={(e) => setCustomIdea(e.target.value)} autoFocus />
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <NeonButton disabled={!isValid || saving} loading={saving}
          onClick={async () => { setSaving(true); await onSave({ ai_approach: chosenApproach, ai_suggestions: suggestions }); setSaving(false); }}>
          Guardar y continuar →
        </NeonButton>
      </div>
    </div>
  );
}

// ═══ STEP 3 FORM ══════════════════════════════════════════════════════════════

function Step3Form({ project, onSave }: { project: ProjectData; onSave: (d: Record<string, unknown>) => Promise<void> }) {
  const [sector, setSector] = useState(project.niche_sector ?? "");
  const [size, setSize] = useState(project.company_size ?? "");
  const [persona, setPersona] = useState(project.buyer_persona ?? "");
  const [saving, setSaving] = useState(false);
  const isValid = sector && size && persona.trim().length >= 20;

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>Sector / Industria</label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {SECTORS.map((s) => {
            const sel = sector === s;
            return (
              <button key={s} type="button" onClick={() => setSector(s)}
                className="px-2 py-2 rounded-xl text-xs font-medium transition-all"
                style={{ background: sel ? "rgba(168,85,247,0.12)" : "var(--bg-elevated)", border: `1px solid ${sel ? "#A855F7" : "var(--border-subtle)"}`, color: sel ? "#A855F7" : "var(--text-secondary)" }}>
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>Tamaño de empresa objetivo</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {COMPANY_SIZES.map((cs) => {
            const sel = size === cs.value;
            return (
              <button key={cs.value} type="button" onClick={() => setSize(cs.value)}
                className="px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all"
                style={{ background: sel ? "rgba(168,85,247,0.12)" : "var(--bg-elevated)", border: `1px solid ${sel ? "#A855F7" : "var(--border-subtle)"}`, color: sel ? "#A855F7" : "var(--text-secondary)" }}>
                {sel && <span className="mr-1">✓</span>}{cs.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
          Buyer persona <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(¿A quién le vendes?)</span>
        </label>
        <STextarea value={persona} onChange={(e) => setPersona(e.target.value)}
          placeholder="Ej: Dueños de clínicas estéticas con 2-5 empleados que ya usan Instagram pero no tienen tiempo de responder DMs y pierden reservas..." rows={3} />
        <p className="text-[10px]" style={{ color: persona.trim().length >= 20 ? "var(--neon-green)" : "var(--text-muted)" }}>
          {persona.trim().length}/20 caracteres mínimo
        </p>
      </div>

      <div className="flex justify-end">
        <NeonButton disabled={!isValid || saving} loading={saving}
          onClick={async () => { setSaving(true); await onSave({ niche_sector: sector, company_size: size, buyer_persona: persona.trim() }); setSaving(false); }}>
          Guardar y continuar →
        </NeonButton>
      </div>
    </div>
  );
}

// ═══ STEP 4 FORM ══════════════════════════════════════════════════════════════

function Step4Form({ project, onSave }: { project: ProjectData; onSave: (d: Record<string, unknown>) => Promise<void> }) {
  const saved = project.pricing_tiers;
  const [tiers, setTiers] = useState<PricingTier[]>(saved?.tiers ?? [{ name: "Básico", price: "497", features: ["Agente IA configurado", "Integración básica", "Soporte por email"] }]);
  const [currency, setCurrency] = useState(saved?.currency ?? "EUR");
  const [billing, setBilling] = useState(saved?.billing ?? "monthly");
  const [saving, setSaving] = useState(false);
  const sym = currency === "USD" ? "$" : currency === "GBP" ? "£" : "€";
  const isValid = tiers.every((t) => t.name && t.price && t.features.some((f) => f.trim()));

  const updateTier = (i: number, field: keyof PricingTier, value: string | string[]) =>
    setTiers((prev) => prev.map((t, idx) => idx === i ? { ...t, [field]: value } : t));
  const updateFeature = (ti: number, fi: number, val: string) => {
    const updated = [...tiers[ti].features]; updated[fi] = val;
    updateTier(ti, "features", updated);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
          {(["monthly", "annual"] as const).map((b) => (
            <button key={b} type="button" onClick={() => setBilling(b)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ background: billing === b ? "var(--neon-blue)" : "transparent", color: billing === b ? "#000" : "var(--text-muted)" }}>
              {b === "monthly" ? "Mensual" : "Anual −20%"}
            </button>
          ))}
        </div>
        <SSelect value={currency} onChange={(e) => setCurrency(e.target.value)} style={{ width: "auto", padding: "8px 12px" }}>
          <option value="EUR">€ EUR</option>
          <option value="USD">$ USD</option>
          <option value="GBP">£ GBP</option>
        </SSelect>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {tiers.map((tier, ti) => (
            <motion.div key={ti} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}
              className="rounded-xl p-4 space-y-4" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-card)" }}>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: "rgba(0,170,255,0.1)", color: "var(--neon-blue)", border: "1px solid rgba(0,170,255,0.2)" }}>Tier {ti + 1}</span>
                {tiers.length > 1 && (
                  <button type="button" onClick={() => setTiers((p) => p.filter((_, i) => i !== ti))} className="ml-auto text-[10px] hover:opacity-70" style={{ color: "var(--neon-red)" }}>Eliminar</button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-semibold block mb-1" style={{ color: "var(--text-muted)" }}>Nombre</label>
                  <SInput placeholder="Básico, Pro..." value={tier.name} onChange={(e) => updateTier(ti, "name", e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-semibold block mb-1" style={{ color: "var(--text-muted)" }}>Precio {sym}/{billing === "monthly" ? "mes" : "año"}</label>
                  <SInput type="number" placeholder="497" value={tier.price} onChange={(e) => updateTier(ti, "price", e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-semibold" style={{ color: "var(--text-muted)" }}>Features incluidas</label>
                {tier.features.map((feat, fi) => (
                  <div key={fi} className="flex items-center gap-2">
                    <span style={{ color: "var(--neon-green)", fontSize: 10 }}>✓</span>
                    <SInput value={feat} onChange={(e) => updateFeature(ti, fi, e.target.value)} placeholder={`Feature ${fi + 1}...`} style={{ padding: "6px 10px", fontSize: "12px" }} />
                    {tier.features.length > 1 && (
                      <button type="button" onClick={() => { const updated = tier.features.filter((_, i) => i !== fi); updateTier(ti, "features", updated.length ? updated : [""]); }} style={{ color: "var(--text-muted)" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => updateTier(ti, "features", [...tier.features, ""])} className="text-[10px] hover:opacity-70" style={{ color: "var(--neon-blue)" }}>+ Añadir feature</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {tiers.length < 3 && (
          <button type="button" onClick={() => setTiers((p) => [...p, { name: "", price: "", features: [""] }])}
            className="w-full py-3 rounded-xl text-xs font-medium border-dashed hover:opacity-80 transition-opacity"
            style={{ border: "1px dashed var(--border-neon)", color: "var(--neon-blue)", background: "rgba(0,170,255,0.03)" }}>
            + Añadir tier {tiers.length + 1}
          </button>
        )}
      </div>

      <div className="flex justify-end">
        <NeonButton disabled={!isValid || saving} loading={saving}
          onClick={async () => { setSaving(true); await onSave({ pricing_tiers: { tiers, currency, billing } }); setSaving(false); }}>
          Guardar y continuar →
        </NeonButton>
      </div>
    </div>
  );
}

// ═══ STEP 5 FORM ══════════════════════════════════════════════════════════════

function Step5Form({ project, onSave }: { project: ProjectData; onSave: (d: Record<string, unknown>) => Promise<void> }) {
  const [chosen, setChosen] = useState(project.landing_platform ?? "");
  const [alreadyHave, setAlreadyHave] = useState(project.landing_platform === "skip");
  const [saving, setSaving] = useState(false);
  const isValid = chosen !== "";

  const handlePlatform = (p: typeof LANDING_PLATFORMS[0]) => {
    setAlreadyHave(false); setChosen(p.id);
    window.open(p.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-5">
      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
        Elige la plataforma para crear tu landing page. Se abrirá en una nueva pestaña con las plantillas disponibles.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {LANDING_PLATFORMS.map((p) => {
          const isSel = chosen === p.id && !alreadyHave;
          return (
            <button key={p.id} type="button" onClick={() => handlePlatform(p)}
              className="rounded-2xl p-5 text-left flex flex-col gap-3 transition-all duration-200 group"
              style={{ background: isSel ? `${p.color}10` : "var(--bg-elevated)", border: `1.5px solid ${isSel ? p.color : "var(--border-card)"}`, boxShadow: isSel ? `0 0 18px ${p.color}25` : "none" }}>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold" style={{ color: isSel ? p.color : "var(--text-muted)", fontFamily: "var(--font-syne, sans-serif)" }}>{p.name}</span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `${p.color}15`, color: p.color }}>Abrir →</span>
              </div>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{p.desc}</p>
              {isSel && <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--neon-green)" }} /><span className="text-[10px]" style={{ color: "var(--neon-green)" }}>Seleccionada</span></div>}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>o</span>
        <div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
      </div>

      <button type="button" onClick={() => { setAlreadyHave(!alreadyHave); setChosen(!alreadyHave ? "skip" : ""); }}
        className="flex items-center gap-3 w-full p-4 rounded-xl transition-all"
        style={{ background: alreadyHave ? "rgba(0,255,136,0.06)" : "var(--bg-elevated)", border: `1px solid ${alreadyHave ? "rgba(0,255,136,0.35)" : "var(--border-subtle)"}` }}>
        <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0" style={{ background: alreadyHave ? "var(--neon-green)" : "var(--bg-card)", border: `1.5px solid ${alreadyHave ? "var(--neon-green)" : "var(--border-subtle)"}` }}>
          {alreadyHave && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
        </div>
        <div className="text-left">
          <p className="text-sm font-medium" style={{ color: alreadyHave ? "var(--neon-green)" : "var(--text-primary)" }}>Ya tengo una landing page</p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Marcar el paso como completado</p>
        </div>
      </button>

      {chosen && !alreadyHave && (
        <p className="text-xs text-center px-4 py-2 rounded-xl" style={{ background: "rgba(0,170,255,0.05)", color: "var(--text-secondary)", border: "1px solid var(--border-neon)" }}>
          Se abrió {LANDING_PLATFORMS.find((p) => p.id === chosen)?.name} en una nueva pestaña. Cuando termines, guarda el paso.
        </p>
      )}

      <div className="flex justify-end">
        <NeonButton disabled={!isValid || saving} loading={saving}
          onClick={async () => { setSaving(true); await onSave({ landing_platform: chosen, landing_redirect_at: chosen !== "skip" ? new Date().toISOString() : null }); setSaving(false); }}>
          Guardar y continuar →
        </NeonButton>
      </div>
    </div>
  );
}

// ═══ STEP 6 FORM ══════════════════════════════════════════════════════════════

function Step6Form({ project, onSave }: { project: ProjectData; onSave: (d: Record<string, unknown>) => Promise<void> }) {
  const [selectedType, setSelectedType] = useState(project.agent_type ?? "");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<{ generated_prompt: string; n8n_json: unknown } | null>(
    project.generated_prompt ? { generated_prompt: project.generated_prompt, n8n_json: project.n8n_json } : null
  );
  const [genError, setGenError] = useState("");
  const [copied, setCopied] = useState<"prompt" | "json" | null>(null);
  const [saving, setSaving] = useState(false);
  const [loadingSingle, setLoadingSingle] = useState(false);
  const [loadingStarter, setLoadingStarter] = useState(false);
  const [payError, setPayError] = useState("");
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  // Check access on mount
  useEffect(() => {
    void checkAccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkAccess() {
    if (!project.id) { setHasAccess(false); return; }
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setHasAccess(false); return; }
      const { data: profile } = await supabase.from("profiles").select("plan_tier, subscription_status").eq("id", user.id).single();
      const paidTiers = ["starter", "pro", "enterprise"];
      if (profile && paidTiers.includes(profile.plan_tier) && profile.subscription_status === "active") {
        setHasAccess(true); return;
      }
      const { data: purchase } = await supabase.from("agent_purchases").select("id").eq("user_id", user.id).eq("agent_project_id", project.id).eq("purchase_type", "single").eq("status", "paid").maybeSingle();
      setHasAccess(!!purchase);
    } catch { setHasAccess(false); }
  }

  async function handleSelectType(typeId: string) {
    if (!hasAccess) return;
    setSelectedType(typeId); setResult(null); setGenError(""); setGenerating(true);
    try {
      const res = await fetch("/api/wizard/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentProjectId: project.id, agent_type: typeId, problem_statement: project.problem_statement, niche_sector: project.niche_sector, company_size: project.company_size, buyer_persona: project.buyer_persona, ai_approach: project.ai_approach }),
      });
      const data = await res.json() as { generated_prompt?: string; n8n_json?: unknown; error?: string };
      if (data.error) throw new Error(data.error);
      if (data.generated_prompt) setResult({ generated_prompt: data.generated_prompt, n8n_json: data.n8n_json });
    } catch (e) {
      setGenError(e instanceof Error ? e.message : "Error al generar");
    } finally { setGenerating(false); }
  }

  async function handleCopy(type: "prompt" | "json") {
    if (!result) return;
    await navigator.clipboard.writeText(type === "prompt" ? result.generated_prompt : JSON.stringify(result.n8n_json, null, 2));
    setCopied(type); setTimeout(() => setCopied(null), 2000);
  }

  function handleDownload() {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result.n8n_json, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${selectedType}_workflow.json`; a.click(); URL.revokeObjectURL(url);
  }

  async function handlePayment(type: "single" | "starter") {
    setPayError("");
    if (type === "single") setLoadingSingle(true); else setLoadingStarter(true);
    try {
      const res = await fetch("/api/stripe/wizard-checkout", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, agentProjectId: project.id }),
      });
      const data = await res.json() as { url?: string; error?: string };
      if (data.error) throw new Error(data.error);
      if (data.url) window.location.href = data.url;
    } catch (e) {
      setPayError(e instanceof Error ? e.message : "Error al iniciar pago");
      setLoadingSingle(false); setLoadingStarter(false);
    }
  }

  if (hasAccess === null) {
    return <div className="flex justify-center py-8"><div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#7C3AED", borderTopColor: "transparent" }} /></div>;
  }

  const CHECK = <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl p-5 space-y-4" style={{ background: "var(--bg-elevated)", border: `1px solid ${hasAccess ? "var(--border-card)" : "var(--border-purple)"}` }}>
        <p className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>Selecciona el tipo de agente</p>
        <div className="relative">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2" style={{ filter: hasAccess ? "none" : "blur(3px)", pointerEvents: hasAccess ? "auto" : "none" }}>
            {AGENT_TYPES.map((agent) => {
              const isSel = selectedType === agent.id;
              return (
                <button key={agent.id} type="button" onClick={() => void handleSelectType(agent.id)}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-150"
                  style={{ background: isSel ? "rgba(124,58,237,0.12)" : "var(--bg-card)", border: `1px solid ${isSel ? "#7C3AED" : "var(--border-subtle)"}`, boxShadow: isSel ? "0 0 12px rgba(124,58,237,0.25)" : "none" }}>
                  <span className="text-xl leading-none">{agent.emoji}</span>
                  <span className="text-[9px] font-medium text-center leading-tight" style={{ color: isSel ? "#A855F7" : "var(--text-secondary)" }}>{agent.label}</span>
                </button>
              );
            })}
          </div>
          {!hasAccess && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl" style={{ background: "rgba(13,13,20,0.75)", backdropFilter: "blur(2px)" }}>
              <div className="text-center space-y-2">
                <span className="text-3xl">🔒</span>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Desbloquea el paso 6</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Necesitas un plan de pago</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {generating && (
        <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
          <span className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin flex-shrink-0" style={{ borderColor: "#7C3AED", borderTopColor: "transparent" }} />
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Generando con Claude IA...</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Creando prompt personalizado + workflow n8n</p>
          </div>
        </div>
      )}

      {genError && !generating && (
        <p className="text-xs p-3 rounded-xl" style={{ background: "rgba(255,68,68,0.08)", color: "var(--neon-red)", border: "1px solid rgba(255,68,68,0.2)" }}>
          {genError} — <button type="button" onClick={() => void handleSelectType(selectedType)} className="underline">Reintentar</button>
        </p>
      )}

      <AnimatePresence>
        {result && !generating && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div className="rounded-2xl p-4 space-y-3" style={{ background: "var(--bg-card)", border: "1px solid var(--border-neon)" }}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--neon-blue)" }}>System Prompt</p>
                <button type="button" onClick={() => void handleCopy("prompt")}
                  className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg transition-all"
                  style={{ background: copied === "prompt" ? "rgba(0,255,136,0.1)" : "var(--bg-elevated)", color: copied === "prompt" ? "var(--neon-green)" : "var(--text-secondary)", border: `1px solid ${copied === "prompt" ? "rgba(0,255,136,0.3)" : "var(--border-subtle)"}` }}>
                  {copied === "prompt" ? "✓ Copiado" : "Copiar"}
                </button>
              </div>
              <pre className="text-xs leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto" style={{ color: "var(--text-secondary)", fontFamily: "monospace" }}>
                {result.generated_prompt}
              </pre>
            </div>

            <div className="rounded-2xl p-4 space-y-3" style={{ background: "var(--bg-card)", border: "1px solid rgba(0,255,136,0.25)" }}>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--neon-green)" }}>JSON n8n Workflow</p>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => void handleCopy("json")}
                    className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg"
                    style={{ background: copied === "json" ? "rgba(0,255,136,0.1)" : "var(--bg-elevated)", color: copied === "json" ? "var(--neon-green)" : "var(--text-secondary)", border: `1px solid ${copied === "json" ? "rgba(0,255,136,0.3)" : "var(--border-subtle)"}` }}>
                    {copied === "json" ? "✓ Copiado" : "Copiar"}
                  </button>
                  <button type="button" onClick={handleDownload} className="text-xs px-3 py-1 rounded-lg" style={{ background: "var(--bg-elevated)", color: "var(--neon-blue)", border: "1px solid var(--border-neon)" }}>Descargar</button>
                </div>
              </div>
              <pre className="text-xs leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto" style={{ color: "var(--neon-green)", fontFamily: "monospace", opacity: 0.85 }}>
                {JSON.stringify(result.n8n_json, null, 2).slice(0, 400)}...
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!hasAccess && (
        <div className="space-y-4">
          <p className="text-xs font-semibold text-center" style={{ color: "var(--text-secondary)" }}>Desbloquea el Design Core</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl p-5 space-y-4" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-card)" }}>
              <div>
                <p className="text-2xl font-black" style={{ color: "var(--text-primary)", fontFamily: "var(--font-syne, sans-serif)" }}>10€</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Solo este agente · Para siempre</p>
              </div>
              <ul className="space-y-1.5">
                {["Prompt completo", "JSON n8n para importar", "Agente en dashboard"].map((f) => (
                  <li key={f} className="flex items-center gap-2"><span style={{ color: "var(--neon-green)" }}>{CHECK}</span><span className="text-xs" style={{ color: "var(--text-secondary)" }}>{f}</span></li>
                ))}
              </ul>
              <button type="button" onClick={() => void handlePayment("single")} disabled={loadingSingle || loadingStarter}
                className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-neon)", color: "var(--neon-blue)" }}>
                {loadingSingle && <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />}
                Pagar 10€ →
              </button>
            </div>
            <div className="rounded-2xl p-5 space-y-4 relative overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border-neon)", boxShadow: "var(--glow-blue)" }}>
              <div className="absolute top-0 right-0 px-3 py-1 text-[10px] font-black uppercase rounded-bl-xl" style={{ background: "var(--grad-primary)", color: "#fff" }}>Recomendado</div>
              <div>
                <p className="text-2xl font-black" style={{ background: "var(--grad-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "var(--font-syne, sans-serif)" }}>
                  29€<span className="text-base font-medium" style={{ WebkitTextFillColor: "var(--text-muted)" }}>/mes</span>
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Starter · Cancela cuando quieras</p>
              </div>
              <ul className="space-y-1.5">
                {["Agentes ilimitados", "Academia completa", "Chat IA con Claude", "Soporte prioritario"].map((f) => (
                  <li key={f} className="flex items-center gap-2"><span style={{ color: "var(--neon-blue)" }}>{CHECK}</span><span className="text-xs" style={{ color: "var(--text-secondary)" }}>{f}</span></li>
                ))}
              </ul>
              <button type="button" onClick={() => void handlePayment("starter")} disabled={loadingSingle || loadingStarter}
                className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                style={{ background: "var(--grad-primary)", color: "#fff", boxShadow: "0 0 16px rgba(0,170,255,0.3)" }}>
                {loadingStarter && <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />}
                Empezar Starter →
              </button>
            </div>
          </div>
          {payError && <p className="text-xs text-center" style={{ color: "var(--neon-red)" }}>{payError}</p>}
        </div>
      )}

      {hasAccess && result && (
        <div className="flex justify-end">
          <NeonButton disabled={!result || saving} loading={saving}
            onClick={async () => { setSaving(true); await onSave({ agent_type: selectedType, generated_prompt: result.generated_prompt, n8n_json: result.n8n_json }); setSaving(false); }}>
            Completar roadmap →
          </NeonButton>
        </div>
      )}
    </div>
  );
}

// ═══ STEP INDICATOR ═══════════════════════════════════════════════════════════

const STEP_LABELS = ["Problema", "Solución", "Nicho", "Pricing", "Landing", "Agente"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        const color = done ? "#00FF88" : active ? STEP_COLORS[i] : "var(--border-subtle)";
        return (
          <div key={n} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={{
                  background: done ? "#00FF8818" : active ? `${STEP_COLORS[i]}18` : "var(--bg-elevated)",
                  border: `1.5px solid ${color}`,
                  color: done ? "#00FF88" : active ? STEP_COLORS[i] : "var(--text-muted)",
                }}
              >
                {done ? "✓" : n}
              </div>
              <span className="text-[9px] hidden sm:block font-medium" style={{ color: active ? STEP_COLORS[i] : "var(--text-muted)" }}>
                {label}
              </span>
            </div>
            {n < 6 && (
              <div
                className="w-6 sm:w-8 h-px mb-4 transition-all duration-500"
                style={{ background: done ? "#00FF8840" : "var(--border-subtle)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ═══ AGENT SUMMARY CARD (shown in step 6) ═════════════════════════════════════

function AgentSummaryCard({ project }: { project: ProjectData }) {
  const tier = project.pricing_tiers?.tiers?.[0];
  const sym = project.pricing_tiers?.currency === "USD" ? "$" : project.pricing_tiers?.currency === "GBP" ? "£" : "€";
  return (
    <div className="rounded-2xl p-5 space-y-4" style={{ background: "linear-gradient(135deg, rgba(0,170,255,0.06), rgba(124,58,237,0.06))", border: "1px solid rgba(124,58,237,0.3)" }}>
      <div className="flex items-center gap-2">
        <span className="text-xl">🤖</span>
        <p className="font-bold text-sm" style={{ color: "var(--text-primary)", fontFamily: "var(--font-syne, sans-serif)" }}>
          Tu Agente IA — Configuración completa
        </p>
        <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-md" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>
          ✓ Listo
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {project.problem_statement && (
          <div className="col-span-2 rounded-xl p-3" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>Problema que resuelve</p>
            <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>{project.problem_statement}</p>
          </div>
        )}
        {project.ai_approach && (
          <div className="rounded-xl p-3" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>Enfoque IA</p>
            <p className="text-xs font-medium" style={{ color: "#00AAFF" }}>{project.ai_approach}</p>
          </div>
        )}
        {project.niche_sector && (
          <div className="rounded-xl p-3" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>Nicho</p>
            <p className="text-xs font-medium" style={{ color: "#A855F7" }}>{project.niche_sector}{project.company_size ? ` · ${project.company_size}` : ""}</p>
          </div>
        )}
        {tier && (
          <div className="rounded-xl p-3" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>Precio base</p>
            <p className="text-xs font-bold" style={{ color: "#FFD700" }}>{sym}{tier.price}/{project.pricing_tiers?.billing === "annual" ? "año" : "mes"}</p>
          </div>
        )}
        {project.landing_platform && project.landing_platform !== "skip" && (
          <div className="rounded-xl p-3" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>Landing page</p>
            <p className="text-xs font-medium capitalize" style={{ color: "#FF6B35" }}>{project.landing_platform}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══ MAIN PAGE ════════════════════════════════════════════════════════════════

export default function RoadmapPage() {
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [project, setProject] = useState<ProjectData>({});

  useEffect(() => { void loadProject(); }, []);

  async function loadProject() {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      const { data } = await supabase
        .from("agent_projects")
        .select("*")
        .eq("user_id", user.id)
        .in("status", ["draft", "in_progress"])
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (data) {
        setProjectId(data.id as string);
        setCurrentStep(Math.min((data.current_step as number) ?? 1, 6));
        setProject(data as ProjectData);
      }
    } catch { /* silent */ } finally { setLoading(false); }
  }

  const getOrCreateProject = useCallback(async (): Promise<string | null> => {
    if (projectId) return projectId;
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data } = await supabase
        .from("agent_projects")
        .insert({ user_id: user.id, current_step: 1, status: "draft" })
        .select("id")
        .single();
      if (data?.id) { setProjectId(data.id as string); return data.id as string; }
    } catch { /* silent */ }
    return null;
  }, [projectId]);

  function saveAndAdvance(stepId: number, data: Record<string, unknown>): Promise<void> {
    // Advance UI immediately — never block on DB
    const isLast = stepId === 6;
    const nextStep = isLast ? 6 : stepId + 1;
    setProject((prev) => ({ ...prev, ...data, current_step: nextStep }));
    if (!isLast) setCurrentStep(nextStep);

    // Persist to Supabase in background (fire-and-forget — never blocks the UI)
    void (async () => {
      try {
        const pid = await getOrCreateProject();
        if (!pid) return;
        const supabase = createClient();
        await supabase.from("agent_projects").update({
          ...data,
          current_step: nextStep,
          status: isLast ? "completed" : "in_progress",
          ...(isLast ? { completed_at: new Date().toISOString() } : {}),
        }).eq("id", pid);
        setProject((prev) => ({ ...prev, id: pid }));
      } catch { /* DB optional — UI already advanced */ }
    })();

    // Return resolved promise immediately so step forms reset saving=false right away
    return Promise.resolve();
  }

  const color = STEP_COLORS[currentStep - 1];

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="h-8 w-48 rounded-xl animate-pulse" style={{ background: "var(--bg-card)" }} />
        <div className="h-12 rounded-2xl animate-pulse" style={{ background: "var(--bg-card)" }} />
        <div className="h-80 rounded-2xl animate-pulse" style={{ background: "var(--bg-card)" }} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
          <GradientText>Crear tu Agente IA</GradientText>
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          6 pasos para construir y lanzar tu agente de IA
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex justify-center py-2">
        <StepIndicator current={currentStep} />
      </div>

      {/* Current step card */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", border: `1px solid ${color}30`, boxShadow: `0 0 24px ${color}08` }}>
        {/* Step header */}
        <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: `1px solid ${color}20` }}>
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{ background: `${color}20`, border: `1.5px solid ${color}`, color }}
          >
            {currentStep}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm" style={{ color: "var(--text-primary)", fontFamily: "var(--font-syne, sans-serif)" }}>
              {STEP_TITLES[currentStep - 1]}
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>{STEP_SUBTITLES[currentStep - 1]}</p>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md flex-shrink-0" style={{ background: `${color}12`, color, border: `1px solid ${color}30` }}>
            {currentStep}/6
          </span>
        </div>

        {/* Step form */}
        <div className="p-6 space-y-5">
          {currentStep === 6 && <AgentSummaryCard project={project} />}
          {currentStep === 1 && <Step1Form project={project} onSave={(d) => saveAndAdvance(1, d)} />}
          {currentStep === 2 && <Step2Form project={project} onSave={(d) => saveAndAdvance(2, d)} />}
          {currentStep === 3 && <Step3Form project={project} onSave={(d) => saveAndAdvance(3, d)} />}
          {currentStep === 4 && <Step4Form project={project} onSave={(d) => saveAndAdvance(4, d)} />}
          {currentStep === 5 && <Step5Form project={project} onSave={(d) => saveAndAdvance(5, d)} />}
          {currentStep === 6 && <Step6Form project={project} onSave={(d) => saveAndAdvance(6, d)} />}
        </div>
      </div>

      {/* Back navigation */}
      {currentStep > 1 && (
        <div className="flex justify-start">
          <button
            type="button"
            onClick={() => setCurrentStep((s) => s - 1)}
            className="flex items-center gap-1.5 text-xs transition-opacity hover:opacity-70"
            style={{ color: "var(--text-muted)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Volver al paso anterior
          </button>
        </div>
      )}
    </div>
  );
}
