"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import NeuraxisLogo from "@/components/brand/NeuraxisLogo";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement register logic
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--bg-root)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" as const }}
        className="w-full max-w-sm"
      >
        <div
          className="rounded-2xl p-8 flex flex-col gap-6"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-card)",
          }}
        >
          {/* Logo */}
          <div className="flex justify-center">
            <NeuraxisLogo />
          </div>

          {/* Heading */}
          <div className="text-center">
            <h1
              className="text-xl font-bold mb-1"
              style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}
            >
              Crear cuenta
            </h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Únete a Neuraxis y potencia tu agencia
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-xs font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Nombre completo
              </label>
              <input
                id="name"
                type="text"
                className="input-dark"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-xs font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                className="input-dark"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-xs font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                className="input-dark"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="confirmPassword"
                className="text-xs font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="input-dark"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 mt-2"
              style={{
                background: "var(--accent-blue)",
                color: "#fff",
              }}
            >
              Crear cuenta
            </button>
          </form>

          {/* Footer link */}
          <p className="text-center text-sm" style={{ color: "var(--text-secondary)" }}>
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="font-medium transition-opacity hover:opacity-80"
              style={{ color: "var(--accent-blue)" }}
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
