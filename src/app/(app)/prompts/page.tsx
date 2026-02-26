"use client";
import { motion } from "framer-motion";
import NexMascot from "@/components/brand/NexMascot";
import GradientText from "@/components/ui/GradientText";
import NeonBadge from "@/components/ui/NeonBadge";

export default function PromptsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" as const }}>
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
          Biblioteca de <GradientText>Prompts</GradientText>
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>Plantillas de prompts optimizados para cada caso de uso</p>
      </motion.div>
      <div className="flex flex-col items-center gap-4 py-16">
        <NexMascot emotion="happy" size="lg" message="Esta sección está en desarrollo" />
        <NeonBadge color="blue">Próximamente</NeonBadge>
      </div>
    </div>
  );
}
