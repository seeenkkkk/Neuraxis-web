"use client";

import { motion } from "framer-motion";
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
  },
];

const CATEGORY_COLORS: Record<string, "green" | "blue" | "purple" | "gold" | "orange" | "cyan"> = {
  "Básico": "green",
  "Intermedio": "blue",
  "Avanzado": "purple",
  "Negocio": "gold",
  "Caso de Estudio": "orange",
};

export default function AcademyPage() {
  const totalXP = 2840;
  const nextLevelXP = 5000;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" as const }}
      >
        <h1
          className="text-2xl font-bold mb-1"
          style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}
        >
          Academia <GradientText>Neuraxis</GradientText>
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Domina la IA y sube de nivel como arquitecto digital
        </p>
      </motion.div>

      {/* XP Progress card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, ease: "easeOut" as const }}
      >
        <NeonCard variant="blue" className="p-5">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
            <div>
              <p
                className="text-lg font-black"
                style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}
              >
                Arquitecto de IAs
              </p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Nivel actual
              </p>
            </div>
            <div className="flex items-center gap-3">
              <NeonBadge color="cyan">
                {totalXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
              </NeonBadge>
              <NeonBadge color="gold">
                {COURSES.filter((c) => c.progress === 100).length} completados
              </NeonBadge>
            </div>
          </div>
          <div className="w-full h-2.5 rounded-full" style={{ background: "var(--bg-input)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(totalXP / nextLevelXP) * 100}%` }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" as const }}
              className="h-full rounded-full xp-bar-fill"
            />
          </div>
          <p className="text-[10px] mt-1.5" style={{ color: "var(--text-muted)" }}>
            {(nextLevelXP - totalXP).toLocaleString()} XP para el siguiente nivel: Master IA
          </p>
        </NeonCard>
      </motion.div>

      {/* Courses grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {COURSES.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.05, ease: "easeOut" as const }}
          >
            <NeonCard
              hover={!course.locked}
              className={`p-4 h-full flex flex-col ${course.locked ? "opacity-50" : ""}`}
            >
              {/* Category + lock */}
              <div className="flex items-center justify-between mb-3">
                <NeonBadge
                  color={CATEGORY_COLORS[course.category] || "blue"}
                  size="sm"
                >
                  {course.category}
                </NeonBadge>
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

              {/* Title */}
              <h3
                className="font-bold text-sm mb-2 flex-1"
                style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}
              >
                {course.title}
              </h3>

              {/* Meta */}
              <div className="flex items-center gap-3 mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
                <span>{course.lessons} lecciones</span>
                <span>·</span>
                <span>{course.duration}</span>
              </div>

              {/* Progress */}
              {!course.locked && (
                <div className="mb-3">
                  <div className="flex justify-between text-[10px] mb-1.5" style={{ color: "var(--text-muted)" }}>
                    <span>Progreso</span>
                    <span style={{ color: course.progress > 0 ? course.color : undefined }}>{course.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full" style={{ background: "var(--bg-input)" }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${course.progress}%`, background: course.color }}
                    />
                  </div>
                </div>
              )}

              {/* CTA */}
              <NeonButton
                variant={course.progress === 100 ? "ghost" : course.progress > 0 ? "primary" : "secondary"}
                size="sm"
                disabled={course.locked}
                className="w-full justify-center"
              >
                {course.locked
                  ? "Bloqueado"
                  : course.progress === 100
                  ? "Revisar ✓"
                  : course.progress > 0
                  ? "Continuar →"
                  : "Comenzar"}
              </NeonButton>
            </NeonCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
