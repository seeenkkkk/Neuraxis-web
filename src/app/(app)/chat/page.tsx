"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Constants ─────────────────────────────────────────────────────────────────

const BRAND_GRADIENT = "linear-gradient(135deg, #8BC34A 0%, #7B1FA2 50%, #00BCD4 100%)";
const USER_GRADIENT = "linear-gradient(135deg, #7B1FA2, #00BCD4)";

type Message = { role: "user" | "assistant"; content: string; ts: Date };

const WELCOME = "¡Hola! Soy Neuraxis, tu asistente IA especializado en agencias de inteligencia artificial. Puedo ayudarte con estrategias, automatizaciones n8n, prompts, y todo lo que necesitas para escalar tu agencia. ¿En qué empezamos?";

const QUICK_PROMPTS = [
  "¿Cómo capturo leads con un agente IA?",
  "Crea un workflow de onboarding en n8n",
  "¿Cuál es el mejor nicho para una agencia IA?",
  "Dame una estrategia de precios para mi agencia",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([{ role: "assistant", content: WELCOME, ts: new Date() }]);
  }, []);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = { role: "user", content, ts: new Date() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages
            .filter((m) => m.role === "user" || m.role === "assistant")
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const reply: Message = { role: "assistant", content: data.content, ts: new Date() };
      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Error de conexión";
      const errorReply: Message = {
        role: "assistant",
        content: `⚠️ Error: ${errMsg}. Asegúrate de configurar ANTHROPIC_API_KEY en tu archivo .env.local`,
        ts: new Date(),
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setLoading(false);
    }
  };

  const fmtTime = (d: Date) =>
    d.toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-96px)] flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo2.png-removebg-preview.png"
          alt="Neuraxis"
          className="w-8 h-8 rounded-xl object-contain flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.06)", padding: "4px" }}
        />
        <div>
          <p className="text-sm font-bold text-white">Neuraxis Chat</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#8BC34A", boxShadow: "0 0 4px rgba(139,195,74,0.8)" }} />
            <span className="text-[10px]" style={{ color: "#9ca3af" }}>Powered by Claude Sonnet · Agente activo</span>
          </div>
        </div>
        <div className="ml-auto">
          <span
            className="text-[10px] font-semibold px-2.5 py-1 rounded-lg"
            style={{ background: "rgba(123,31,162,0.15)", color: "#7B1FA2", border: "1px solid rgba(123,31,162,0.30)" }}
          >
            Soporte 24/7
          </span>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 rounded-2xl"
        style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              {msg.role === "assistant" ? (
                <div
                  className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-black"
                  style={{ background: "rgba(123,31,162,0.20)", border: "1px solid rgba(123,31,162,0.35)", color: "#7B1FA2" }}
                >
                  N
                </div>
              ) : (
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                  style={{ background: USER_GRADIENT }}
                >
                  <span className="text-white">A</span>
                </div>
              )}

              {/* Bubble */}
              <div className={`max-w-[75%] space-y-1 ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                <div
                  className="px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap"
                  style={{
                    background: msg.role === "user" ? USER_GRADIENT : "#1f2937",
                    border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
                    color: msg.role === "user" ? "#ffffff" : "#e5e7eb",
                    borderRadius: msg.role === "user" ? "1rem 1rem 0.25rem 1rem" : "1rem 1rem 1rem 0.25rem",
                  }}
                >
                  {msg.content}
                </div>
                <span className="text-[10px] px-1" style={{ color: "#6b7280" }}>
                  {fmtTime(msg.ts)}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Loading */}
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-black"
                style={{ background: "rgba(123,31,162,0.20)", border: "1px solid rgba(123,31,162,0.35)", color: "#7B1FA2" }}>
                N
              </div>
              <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm flex gap-1 items-center"
                style={{ background: "#1f2937", border: "1px solid rgba(255,255,255,0.08)" }}>
                {[0, 1, 2].map((j) => (
                  <motion.span key={j} className="w-1.5 h-1.5 rounded-full" style={{ background: "#00BCD4" }}
                    animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: j * 0.2 }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 flex-shrink-0">
          {QUICK_PROMPTS.map((qp) => (
            <button
              key={qp}
              onClick={() => send(qp)}
              className="text-xs px-3 py-2 rounded-xl transition-all duration-150"
              style={{
                background: "#111827",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#d1d5db",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#00BCD4")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
            >
              {qp}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 flex-shrink-0">
        <input
          className="flex-1 text-sm text-white outline-none px-4 py-3 rounded-2xl transition-all"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          style={{
            background: "#111827",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
          onFocus={e => (e.currentTarget.style.borderColor = "#00BCD4")}
          onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
        />
        <button
          onClick={() => send()}
          disabled={!input.trim() || loading}
          className="px-4 py-3 rounded-xl font-medium text-sm transition-all disabled:opacity-40"
          style={{
            background: BRAND_GRADIENT,
            color: "white",
            cursor: input.trim() && !loading ? "pointer" : "not-allowed",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
