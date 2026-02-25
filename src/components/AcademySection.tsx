"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

type NodeStatus = "completed" | "active" | "locked";

interface RoadmapNode {
  id: number;
  title: string;
  subtitle: string;
  xp: number;
  status: NodeStatus;
  gems: number;
  icon: string;
  color: string;
}

const NODES: RoadmapNode[] = [
  {
    id: 1,
    title: "Fundamentos IA",
    subtitle: "Conceptos clave, prompts y primeros pasos",
    xp: 500,
    status: "completed",
    gems: 3,
    icon: "🌱",
    color: "#10b981",
  },
  {
    id: 2,
    title: "Primeros Agentes",
    subtitle: "Configura y despliega tu primer agente",
    xp: 1000,
    status: "completed",
    gems: 3,
    icon: "🤖",
    color: "#6a11cb",
  },
  {
    id: 3,
    title: "Workflows n8n",
    subtitle: "Automatizaciones avanzadas y conexiones",
    xp: 2000,
    status: "active",
    gems: 4,
    icon: "⚡",
    color: "#22d4fd",
  },
  {
    id: 4,
    title: "IA Avanzada",
    subtitle: "Modelos, fine-tuning y RAG personalizado",
    xp: 3500,
    status: "locked",
    gems: 4,
    icon: "🧠",
    color: "#f59e0b",
  },
  {
    id: 5,
    title: "Certificación",
    subtitle: "Examen final y badge oficial Neuraxis",
    xp: 5000,
    status: "locked",
    gems: 5,
    icon: "🏆",
    color: "#ec4899",
  },
  {
    id: 6,
    title: "Expert Level",
    subtitle: "Mentoría 1:1 y acceso a comunidad VIP",
    xp: 8000,
    status: "locked",
    gems: 5,
    icon: "✦",
    color: "#6a11cb",
  },
];

function GemRow({ count, status }: { count: number; status: NodeStatus }) {
  return (
    <div className="flex gap-1.5 justify-center mt-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`xp-gem ${status === "active" ? "active" : ""} ${
            status === "locked" ? "locked" : ""
          }`}
        />
      ))}
    </div>
  );
}

export default function AcademySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="academy" ref={ref} className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-brand-cyan text-sm font-bold uppercase tracking-widest mb-4">
            Neuraxis Academy
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary mb-4">
            Domina la{" "}
            <span className="gradient-neon-text">IA paso a paso</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-lg">
            Un roadmap de aprendizaje gamificado. Gana XP, desbloquea niveles
            y obtén tu certificación oficial.
          </p>
        </motion.div>

        {/* Roadmap */}
        <div className="relative">
          {/* Desktop: horizontal path */}
          <div className="hidden lg:block">
            {/* Connecting line */}
            <div className="absolute top-[72px] left-[8%] right-[8%] h-px bg-gray-200 z-0">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                style={{ originX: 0 }}
                className="h-full bg-gradient-to-r from-brand-purple via-brand-cyan to-gray-200"
              />
            </div>

            <div className="grid grid-cols-6 gap-0 relative z-10">
              {NODES.map((node, i) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 24, scale: 0.9 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.55, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center"
                >
                  {/* Node circle */}
                  <div
                    className="relative w-14 h-14 rounded-full flex items-center justify-center text-xl mb-1 transition-all duration-300"
                    style={
                      node.status === "locked"
                        ? { background: "#f3f4f6", color: "#9ca3af" }
                        : node.status === "completed"
                        ? {
                            background: `linear-gradient(135deg, ${node.color}, ${node.color}99)`,
                            boxShadow: `0 0 16px ${node.color}40`,
                            color: "white",
                          }
                        : {
                            background: `linear-gradient(135deg, ${node.color}, ${node.color}cc)`,
                            boxShadow: `0 0 24px ${node.color}60, 0 0 48px ${node.color}30`,
                            color: "white",
                            animation: "pulseNeonBorder 2.5s ease-in-out infinite",
                          }
                    }
                  >
                    {node.status === "completed" ? "✓" : node.icon}
                  </div>

                  {/* XP Gems */}
                  <GemRow count={node.gems} status={node.status} />

                  {/* XP label */}
                  <span
                    className="text-[10px] font-bold mt-2 mb-3"
                    style={{
                      color: node.status === "locked" ? "#9ca3af" : node.color,
                    }}
                  >
                    {node.xp.toLocaleString()} XP
                  </span>

                  {/* Info card */}
                  <div
                    className={`text-center px-2 py-3 rounded-xl w-full transition-all duration-300 ${
                      node.status === "locked" ? "opacity-50" : ""
                    }`}
                  >
                    <p className="text-sm font-bold text-text-primary leading-snug">
                      {node.title}
                    </p>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">
                      {node.subtitle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical */}
          <div className="lg:hidden flex flex-col gap-0 relative">
            {/* Vertical line */}
            <div className="absolute left-7 top-7 bottom-7 w-px bg-gray-200 z-0">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.5 }}
                style={{ originY: 0 }}
                className="w-full bg-gradient-to-b from-brand-purple via-brand-cyan to-gray-200 h-full"
              />
            </div>

            {NODES.map((node, i) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className={`flex items-start gap-5 pb-8 relative z-10 ${
                  node.status === "locked" ? "opacity-50" : ""
                }`}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                  style={
                    node.status === "locked"
                      ? { background: "#f3f4f6", color: "#9ca3af" }
                      : {
                          background: `linear-gradient(135deg, ${node.color}, ${node.color}99)`,
                          boxShadow: `0 0 16px ${node.color}40`,
                          color: "white",
                        }
                  }
                >
                  {node.status === "completed" ? "✓" : node.icon}
                </div>

                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-text-primary">{node.title}</p>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: node.status === "locked" ? "#f3f4f6" : `${node.color}15`,
                        color: node.status === "locked" ? "#9ca3af" : node.color,
                      }}
                    >
                      {node.xp.toLocaleString()} XP
                    </span>
                  </div>
                  <p className="text-sm text-text-muted mb-2">{node.subtitle}</p>
                  <GemRow count={node.gems} status={node.status} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="glass-white inline-flex items-center gap-4 px-6 py-4 rounded-2xl shadow-card">
            <div className="xp-gem active" />
            <p className="text-sm text-text-secondary">
              <span className="font-bold text-text-primary">Empieza con 0 XP</span>{" "}
              · Gana gemas completando módulos
            </p>
            <a
              href="#planes"
              className="px-5 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90 transition-all shadow-neon-purple"
            >
              Unirme gratis
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
