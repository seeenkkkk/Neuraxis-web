"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NeonCard from "@/components/ui/NeonCard";
import NeonButton from "@/components/ui/NeonButton";
import NeonBadge from "@/components/ui/NeonBadge";
import GradientText from "@/components/ui/GradientText";

export default function SettingsPage() {
  const [name, setName] = useState("Admin Neuraxis");
  const [email, setEmail] = useState("admin@neuraxis.ia");
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" as const }}>
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
          <GradientText>Configuración</GradientText>
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Gestiona tu perfil y preferencias</p>
      </motion.div>

      {/* Profile */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, ease: "easeOut" as const }}>
        <NeonCard className="p-5 space-y-4">
          <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-syne, sans-serif)" }}>
            Perfil
          </h2>

          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden" style={{ boxShadow: "0 0 16px rgba(0,196,255,0.4)" }}>
              <img src="/avatar.png" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <NeonBadge color="cyan">Arquitecto de IAs</NeonBadge>
              <p className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>Nivel 3 · 2,840 XP</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div>
              <label className="block text-xs mb-1.5" style={{ color: "var(--text-secondary)" }}>Nombre</label>
              <input className="input-dark" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: "var(--text-secondary)" }}>Email</label>
              <input className="input-dark" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <NeonButton onClick={save} loading={saved}>
            {saved ? "Guardado ✓" : "Guardar cambios"}
          </NeonButton>
        </NeonCard>
      </motion.div>

      {/* Integrations */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease: "easeOut" as const }}>
        <NeonCard className="p-5 space-y-4">
          <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-syne, sans-serif)" }}>
            Integraciones
          </h2>
          {[
            { name: "Supabase",  connected: true,  color: "#00FF88" },
            { name: "n8n",       connected: true,  color: "#007AFF" },
            { name: "Calendly",  connected: false, color: "#9B30FF" },
            { name: "Stripe",    connected: false, color: "#FFD700" },
          ].map((int) => (
            <div key={int.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: int.connected ? "#00FF88" : "var(--text-muted)" }} />
                <span className="text-sm" style={{ color: "var(--text-primary)" }}>{int.name}</span>
              </div>
              <NeonButton variant={int.connected ? "ghost" : "secondary"} size="sm">
                {int.connected ? "Configurar" : "Conectar"}
              </NeonButton>
            </div>
          ))}
        </NeonCard>
      </motion.div>

      {/* Danger zone */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, ease: "easeOut" as const }}>
        <NeonCard className="p-5 space-y-3" style={{ borderColor: "rgba(255,68,68,0.15)" }}>
          <h2 className="text-sm font-semibold" style={{ color: "#FF4444", fontFamily: "var(--font-syne, sans-serif)" }}>
            Zona peligrosa
          </h2>
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            Estas acciones son irreversibles. Procede con cuidado.
          </p>
          <NeonButton variant="danger" size="sm">Eliminar cuenta</NeonButton>
        </NeonCard>
      </motion.div>
    </div>
  );
}
