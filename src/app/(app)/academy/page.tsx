"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NeonCard from "@/components/ui/NeonCard";
import NeonBadge from "@/components/ui/NeonBadge";
import NeonButton from "@/components/ui/NeonButton";
import GradientText from "@/components/ui/GradientText";

const COURSES = [
  {
    id: 1,
    title: "Fundamentos de Agentes IA",
    category: "Básico",
    lessons: 12,
    duration: "3h 20min",
    xp: 500,
    progress: 100,
    color: "#00FF88",
    description: "Aprende los conceptos clave de los agentes IA, cómo funcionan, y cómo diseñar tu primer agente desde cero.",
    lessonList: [
      { title: "¿Qué es un agente IA? Diferencias con chatbots", duration: "18 min", done: true },
      { title: "Arquitectura de un agente: LLM + Memoria + Herramientas", duration: "22 min", done: true },
      { title: "Los mejores modelos en 2024: Claude, GPT-4o, Gemini", duration: "25 min", done: true },
      { title: "Diseñando el system prompt perfecto", duration: "30 min", done: true },
      { title: "Memoria y contexto: cómo hacer agentes que recuerdan", duration: "20 min", done: true },
      { title: "Herramientas y funciones: agentes que actúan", duration: "25 min", done: true },
      { title: "RAG: conecta tu agente a documentos propios", duration: "28 min", done: true },
      { title: "Tu primer agente de ventas desde cero", duration: "35 min", done: true },
      { title: "Evaluación y métricas de un agente", duration: "15 min", done: true },
      { title: "Casos de uso por sector: clínicas, inmobiliarias, SaaS", duration: "22 min", done: true },
      { title: "Errores frecuentes y cómo evitarlos", duration: "18 min", done: true },
      { title: "Proyecto final: Agente completo para un cliente real", duration: "42 min", done: true },
    ],
  },
  {
    id: 2,
    title: "n8n para Automatización de Agencias",
    category: "Intermedio",
    lessons: 18,
    duration: "5h 10min",
    xp: 800,
    progress: 65,
    color: "#00AAFF",
    description: "Domina n8n para construir automatizaciones profesionales que conecten tus agentes IA con el resto de tu stack.",
    lessonList: [
      { title: "Introducción a n8n: instalación y primeros pasos", duration: "20 min", done: true },
      { title: "Nodos esenciales: HTTP, Code, IF, Switch", duration: "25 min", done: true },
      { title: "Webhooks: conectando el mundo externo con n8n", duration: "30 min", done: true },
      { title: "Integrando Claude API en tus workflows", duration: "35 min", done: true },
      { title: "Conectar n8n con Notion, Airtable y Google Sheets", duration: "28 min", done: true },
      { title: "Automatización de emails: campañas y seguimientos", duration: "25 min", done: true },
      { title: "WhatsApp Business API con n8n", duration: "32 min", done: true },
      { title: "Calendly + n8n: gestión automática de citas", duration: "20 min", done: true },
      { title: "Workflow: onboarding automático de clientes", duration: "40 min", done: true },
      { title: "Workflow: reporte semanal generado por IA", duration: "35 min", done: true },
      { title: "Workflow: nurture de leads automatizado", duration: "38 min", done: false },
      { title: "Manejo de errores y robustez en producción", duration: "22 min", done: false },
      { title: "n8n self-hosted en VPS: instalación segura", duration: "30 min", done: false },
      { title: "Escalabilidad: múltiples instancias y colas", duration: "25 min", done: false },
      { title: "Monitoreo y alertas de workflows", duration: "18 min", done: false },
      { title: "Caso: sistema completo de captación de leads", duration: "45 min", done: false },
      { title: "Caso: sistema de soporte automatizado 24/7", duration: "40 min", done: false },
      { title: "Examen final: workflow completo desde cero", duration: "50 min", done: false },
    ],
  },
  {
    id: 3,
    title: "Prompt Engineering Avanzado",
    category: "Avanzado",
    lessons: 15,
    duration: "4h 30min",
    xp: 700,
    progress: 30,
    color: "#A855F7",
    description: "Técnicas avanzadas para extraer el máximo rendimiento de los LLMs. Desde few-shot hasta prompts constitucionales.",
    lessonList: [
      { title: "Fundamentos: cómo piensan los LLMs", duration: "22 min", done: true },
      { title: "Zero-shot vs Few-shot vs Chain-of-Thought", duration: "28 min", done: true },
      { title: "XML structuring: la ventaja de Claude", duration: "25 min", done: true },
      { title: "Constitutional prompting: agentes seguros", duration: "20 min", done: true },
      { title: "Persona design: creando identidades de agente", duration: "30 min", done: false },
      { title: "Manejo de instrucciones complejas multi-step", duration: "35 min", done: false },
      { title: "Prompts para análisis y síntesis de documentos", duration: "28 min", done: false },
      { title: "Prompts de ventas de alta conversión", duration: "32 min", done: false },
      { title: "A/B testing de prompts con métricas", duration: "25 min", done: false },
      { title: "Prompts para generación de contenido estructurado", duration: "22 min", done: false },
      { title: "Manejo de alucinaciones y fact-checking", duration: "28 min", done: false },
      { title: "Prompts multilingual: escalar a otros mercados", duration: "20 min", done: false },
      { title: "Fine-tuning vs prompting: cuándo usar cada uno", duration: "30 min", done: false },
      { title: "Evaluación y scoring automático de respuestas", duration: "25 min", done: false },
      { title: "Proyecto: biblioteca de prompts para tu agencia", duration: "40 min", done: false },
    ],
  },
  {
    id: 4,
    title: "LangChain & LangGraph en Producción",
    category: "Avanzado",
    lessons: 22,
    duration: "6h 45min",
    xp: 1200,
    progress: 0,
    color: "#7C3AED",
    locked: true,
    description: "Construye agentes complejos con LangChain y LangGraph. Orquestación multi-agente, memoria persistente y despliegue en producción.",
    lessonList: [
      { title: "Introducción a LangChain: componentes clave", duration: "25 min", done: false },
      { title: "Chains: encadenando operaciones con LLMs", duration: "30 min", done: false },
      { title: "Memory en LangChain: tipos y cuándo usar cada uno", duration: "28 min", done: false },
      { title: "Tools y Toolkits: agentes que actúan en el mundo", duration: "35 min", done: false },
      { title: "Introducción a LangGraph: grafos de agentes", duration: "30 min", done: false },
      { title: "Nodos, edges y estado en LangGraph", duration: "32 min", done: false },
    ],
  },
  {
    id: 5,
    title: "Ventas y Cierre para Agencias IA",
    category: "Negocio",
    lessons: 10,
    duration: "2h 50min",
    xp: 600,
    progress: 0,
    color: "#FFD700",
    description: "Aprende a vender servicios de IA, manejar objeciones, fijar precios y cerrar contratos de alto valor.",
    lessonList: [
      { title: "El mindset del vendedor consultor vs vendedor de producto", duration: "20 min", done: false },
      { title: "Identificando y calificando al cliente ideal", duration: "22 min", done: false },
      { title: "La llamada de discovery: preguntas que revelan dolor", duration: "30 min", done: false },
      { title: "Calculadora de ROI: el arma de cierre más poderosa", duration: "25 min", done: false },
      { title: "Presentación de propuesta en 4 slides", duration: "28 min", done: false },
      { title: "Las 7 objeciones más comunes y cómo rebatirlas", duration: "35 min", done: false },
      { title: "Técnicas de cierre sin presión", duration: "18 min", done: false },
      { title: "Negociación de contratos y condiciones", duration: "22 min", done: false },
      { title: "Referidos y expansión de cuenta", duration: "15 min", done: false },
      { title: "Construyendo un pipeline de ventas predecible", duration: "25 min", done: false },
    ],
  },
  {
    id: 6,
    title: "Caso Completo: Agencia de Clínicas",
    category: "Caso de Estudio",
    lessons: 8,
    duration: "2h 15min",
    xp: 900,
    progress: 0,
    color: "#FF6B35",
    locked: true,
    description: "Caso real de principio a fin: cómo una agencia de IA implementó un sistema completo para una cadena de clínicas estéticas.",
    lessonList: [
      { title: "Brief del caso: la clínica y sus problemas", duration: "15 min", done: false },
      { title: "Diseño de la solución: agentes + workflows + CRM", duration: "20 min", done: false },
      { title: "Desarrollo del agente ARIA de ventas", duration: "35 min", done: false },
      { title: "Integración WhatsApp Business + n8n", duration: "30 min", done: false },
      { title: "CRM personalizado en Notion", duration: "22 min", done: false },
      { title: "Lanzamiento y primeras 2 semanas en producción", duration: "18 min", done: false },
      { title: "Resultados a los 3 meses: métricas reales", duration: "15 min", done: false },
      { title: "Lecciones aprendidas y qué haríamos diferente", duration: "20 min", done: false },
    ],
  },
];

const CATEGORY_COLORS: Record<string, "green" | "blue" | "purple" | "gold" | "orange" | "cyan"> = {
  "Básico": "green", "Intermedio": "blue", "Avanzado": "purple", "Negocio": "gold", "Caso de Estudio": "orange",
};

export default function AcademyPage() {
  const [selectedCourse, setSelectedCourse] = useState<typeof COURSES[0] | null>(null);
  const totalXP = 2840;
  const nextLevelXP = 5000;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
          Academia <GradientText>Neuraxis</GradientText>
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Domina la IA y sube de nivel como arquitecto digital</p>
      </motion.div>

      {/* XP Progress */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <NeonCard variant="blue" className="p-5">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
            <div>
              <p className="text-lg font-black" style={{ fontFamily: "var(--font-syne)", color: "var(--text-primary)" }}>Arquitecto de IAs</p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Nivel actual</p>
            </div>
            <div className="flex items-center gap-3">
              <NeonBadge color="cyan">{totalXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP</NeonBadge>
              <NeonBadge color="gold">{COURSES.filter((c) => c.progress === 100).length} completados</NeonBadge>
            </div>
          </div>
          <div className="w-full h-2.5 rounded-full" style={{ background: "var(--bg-input)" }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${(totalXP / nextLevelXP) * 100}%` }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }} className="h-full rounded-full xp-bar-fill" />
          </div>
          <p className="text-[10px] mt-1.5" style={{ color: "var(--text-muted)" }}>
            {(nextLevelXP - totalXP).toLocaleString()} XP para el siguiente nivel: Master IA
          </p>
        </NeonCard>
      </motion.div>

      {/* Courses grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {COURSES.map((course, i) => (
          <motion.div key={course.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.05 }}>
            <NeonCard hover={!course.locked} className={`p-4 h-full flex flex-col ${course.locked ? "opacity-50" : "cursor-pointer"}`}
              onClick={() => !course.locked && setSelectedCourse(course)}>
              <div className="flex items-center justify-between mb-3">
                <NeonBadge color={CATEGORY_COLORS[course.category] || "blue"} size="sm">{course.category}</NeonBadge>
                {course.locked ? (
                  <span style={{ color: "var(--text-muted)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                ) : (
                  <NeonBadge color="gold" size="sm">+{course.xp} XP</NeonBadge>
                )}
              </div>

              <h3 className="font-bold text-sm mb-1.5 flex-1" style={{ fontFamily: "var(--font-syne)", color: "var(--text-primary)" }}>
                {course.title}
              </h3>

              <p className="text-xs mb-3 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {course.description}
              </p>

              <div className="flex items-center gap-3 mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
                <span>{course.lessons} lecciones</span>
                <span>·</span>
                <span>{course.duration}</span>
              </div>

              {!course.locked && (
                <div className="mb-3">
                  <div className="flex justify-between text-[10px] mb-1.5" style={{ color: "var(--text-muted)" }}>
                    <span>Progreso</span>
                    <span style={{ color: course.progress > 0 ? course.color : undefined }}>{course.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full" style={{ background: "var(--bg-input)" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${course.progress}%`, background: course.color }} />
                  </div>
                </div>
              )}

              <NeonButton variant={course.progress === 100 ? "ghost" : course.progress > 0 ? "primary" : "secondary"}
                size="sm" disabled={course.locked} className="w-full justify-center">
                {course.locked ? "Bloqueado" : course.progress === 100 ? "Revisar ✓" : course.progress > 0 ? "Continuar →" : "Comenzar"}
              </NeonButton>
            </NeonCard>
          </motion.div>
        ))}
      </div>

      {/* Course detail modal */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 overflow-y-auto"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
            onClick={(e) => e.target === e.currentTarget && setSelectedCourse(null)}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-lg rounded-2xl p-6 mb-8" style={{ background: "var(--bg-card)", border: `1px solid ${selectedCourse.color}30` }}>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <NeonBadge color={CATEGORY_COLORS[selectedCourse.category] || "blue"} size="sm">{selectedCourse.category}</NeonBadge>
                    <NeonBadge color="gold" size="sm">+{selectedCourse.xp} XP</NeonBadge>
                  </div>
                  <h2 className="text-lg font-black" style={{ fontFamily: "var(--font-syne)", color: "var(--text-primary)" }}>
                    {selectedCourse.title}
                  </h2>
                </div>
                <button onClick={() => setSelectedCourse(null)} style={{ color: "var(--text-muted)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {selectedCourse.description}
              </p>

              <div className="flex items-center gap-4 mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
                <span>{selectedCourse.lessons} lecciones</span>
                <span>·</span>
                <span>{selectedCourse.duration}</span>
                <span>·</span>
                <span>{selectedCourse.progress}% completado</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full mb-5" style={{ background: "var(--bg-input)" }}>
                <div className="h-full rounded-full" style={{ width: `${selectedCourse.progress}%`, background: selectedCourse.color }} />
              </div>

              {/* Lesson list */}
              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                {selectedCourse.lessonList.map((lesson, li) => (
                  <div key={li} className="flex items-center gap-3 p-2.5 rounded-xl transition-all"
                    style={{ background: lesson.done ? `${selectedCourse.color}08` : "var(--bg-elevated)", border: `1px solid ${lesson.done ? selectedCourse.color + "25" : "transparent"}` }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: lesson.done ? `${selectedCourse.color}20` : "var(--bg-input)", border: `1.5px solid ${lesson.done ? selectedCourse.color : "var(--border-subtle)"}` }}>
                      {lesson.done ? (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={selectedCourse.color} strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <span className="text-[9px] font-bold" style={{ color: "var(--text-muted)" }}>{li + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs" style={{ color: lesson.done ? "var(--text-primary)" : "var(--text-secondary)" }}>{lesson.title}</p>
                    </div>
                    <span className="text-[10px] flex-shrink-0" style={{ color: "var(--text-muted)" }}>{lesson.duration}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <NeonButton variant="ghost" size="sm" onClick={() => setSelectedCourse(null)} className="flex-1 justify-center">Cerrar</NeonButton>
                <NeonButton size="sm" className="flex-1 justify-center">
                  {selectedCourse.progress === 100 ? "Revisar curso ✓" : selectedCourse.progress > 0 ? "Continuar →" : "Comenzar curso"}
                </NeonButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
