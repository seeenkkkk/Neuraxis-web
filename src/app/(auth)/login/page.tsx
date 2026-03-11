"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import NeuraxisLogo from "@/components/brand/NeuraxisLogo";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message === "Invalid login credentials"
        ? "Email o contraseña incorrectos"
        : authError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--bg-root)" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        <div className="rounded-2xl p-8 flex flex-col gap-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
          <div className="flex justify-center">
            <NeuraxisLogo />
          </div>

          <div className="text-center">
            <h1 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
              Iniciar sesión
            </h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Bienvenido de nuevo a Neuraxis</p>
          </div>

          {error && (
            <p className="text-xs text-center p-2.5 rounded-xl" style={{ background: "rgba(255,68,68,0.08)", color: "#FF4444", border: "1px solid rgba(255,68,68,0.2)" }}>
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                Correo electrónico
              </label>
              <input
                id="email" type="email" className="input-dark" placeholder="tu@email.com"
                value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                Contraseña
              </label>
              <input
                id="password" type="password" className="input-dark" placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password"
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all mt-2 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #007AFF, #7B2FFF)", color: "#fff" }}
            >
              {loading && <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />}
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="text-center text-sm" style={{ color: "var(--text-secondary)" }}>
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="font-medium" style={{ color: "#007AFF" }}>
              Regístrate
            </Link>
          </p>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px" style={{ background: "var(--border-subtle)" }} />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 text-xs" style={{ background: "var(--bg-card)", color: "var(--text-muted)" }}>o</span>
            </div>
          </div>

          <Link href="/dashboard">
            <button className="w-full py-2.5 rounded-xl text-sm font-semibold border transition-all hover:opacity-80"
              style={{ color: "var(--text-secondary)", borderColor: "var(--border-subtle)" }}>
              Ver demo sin registro →
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
