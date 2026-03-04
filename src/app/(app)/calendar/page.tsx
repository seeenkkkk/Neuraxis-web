"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradientText from "@/components/ui/GradientText";
import NeonBadge from "@/components/ui/NeonBadge";
import NeonCard from "@/components/ui/NeonCard";
import NeonButton from "@/components/ui/NeonButton";

type EventType = "reunión" | "llamada" | "demo" | "seguimiento" | "otro";

interface CalEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  duration: string;
  type: EventType;
  client: string;
  notes: string;
}

const TYPE_CONFIG: Record<EventType, { color: string; badge: "blue" | "green" | "purple" | "cyan" | "orange" }> = {
  reunión:     { color: "#00AAFF", badge: "blue" },
  llamada:     { color: "#00FF88", badge: "green" },
  demo:        { color: "#A855F7", badge: "purple" },
  seguimiento: { color: "#00D4FF", badge: "cyan" },
  otro:        { color: "#FF6B35", badge: "orange" },
};

const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const DEFAULT_EVENTS: CalEvent[] = [
  { id: "e1", title: "Demo Clínica Estética Norte", date: "2026-03-05", time: "10:00", duration: "30 min", type: "demo", client: "Clínica Estética Norte", notes: "Mostrar agente ARIA y flujo de booking" },
  { id: "e2", title: "Reunión mensual Tech Solutions", date: "2026-03-06", time: "11:30", duration: "1h", type: "reunión", client: "Tech Solutions SL", notes: "Revisión de KPIs y propuesta upsell" },
  { id: "e3", title: "Llamada de cierre — Lead Pedro F.", date: "2026-03-10", time: "16:00", duration: "45 min", type: "llamada", client: "Agencia Marketing Pro", notes: "Propuesta enviada, probabilidad 70%" },
  { id: "e4", title: "Seguimiento post-demo Grupo Sur", date: "2026-03-12", time: "09:00", duration: "15 min", type: "seguimiento", client: "Grupo Inmobiliario Sur", notes: "Verificar si recibieron la propuesta" },
  { id: "e5", title: "Onboarding Academia Online Elite", date: "2026-03-15", time: "10:00", duration: "2h", type: "reunión", client: "Academia Online Elite", notes: "Kickoff y configuración inicial del agente" },
  { id: "e6", title: "Demo Restaurant Chain", date: "2026-03-17", time: "14:00", duration: "30 min", type: "demo", client: "Restaurant Chain ESP", notes: "Agente de reservas y gestión WhatsApp" },
  { id: "e7", title: "Llamada de descubrimiento — Nuevo lead", date: "2026-03-19", time: "12:00", duration: "30 min", type: "llamada", client: "Por definir", notes: "Lead de LinkedIn, sector coaching" },
  { id: "e8", title: "Revisión trimestral Clínica Norte", date: "2026-03-25", time: "11:00", duration: "1h", type: "reunión", client: "Clínica Estética Norte", notes: "Q1 review + propuesta de expansión" },
];

const STORAGE_KEY = "neuraxis_calendar_events";

function loadEvents(): CalEvent[] {
  if (typeof window === "undefined") return DEFAULT_EVENTS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_EVENTS;
  } catch {
    return DEFAULT_EVENTS;
  }
}

function saveEvents(events: CalEvent[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export default function CalendarPage() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [events, setEvents] = useState<CalEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<CalEvent, "id">>({ title: "", date: "", time: "10:00", duration: "30 min", type: "reunión", client: "", notes: "" });
  const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null);

  useEffect(() => {
    setEvents(loadEvents());
    const d = today.toISOString().split("T")[0];
    setSelectedDate(d);
    setForm((f) => ({ ...f, date: d }));
  }, []);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const formatDate = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const eventsForDate = (dateStr: string) => events.filter((e) => e.date === dateStr);

  const addEvent = () => {
    const newEvent: CalEvent = { ...form, id: `e${Date.now()}` };
    const updated = [...events, newEvent];
    setEvents(updated);
    saveEvents(updated);
    setShowForm(false);
    setForm({ title: "", date: selectedDate ?? "", time: "10:00", duration: "30 min", type: "reunión", client: "", notes: "" });
  };

  const deleteEvent = (id: string) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    saveEvents(updated);
    setSelectedEvent(null);
  };

  const selectedEvents = selectedDate ? eventsForDate(selectedDate) : [];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
            <GradientText>Calendario</GradientText> y Citas
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Gestiona reuniones, demos y llamadas de tu agencia</p>
        </div>
        <NeonButton size="sm" onClick={() => { setShowForm(true); setForm((f) => ({ ...f, date: selectedDate ?? "" })); }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nueva cita
        </NeonButton>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar grid */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="lg:col-span-2">
          <NeonCard className="p-4">
            {/* Month header */}
            <div className="flex items-center justify-between mb-4">
              <button onClick={prevMonth} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[rgba(255,255,255,0.06)]" style={{ color: "var(--text-secondary)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <h2 className="text-sm font-bold" style={{ fontFamily: "var(--font-syne)", color: "var(--text-primary)" }}>
                {MONTHS[viewMonth]} {viewYear}
              </h2>
              <button onClick={nextMonth} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[rgba(255,255,255,0.06)]" style={{ color: "var(--text-secondary)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>

            {/* Day names */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map((d) => (
                <div key={d} className="text-center text-[10px] font-medium py-1" style={{ color: "var(--text-muted)" }}>{d}</div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = formatDate(viewYear, viewMonth, day);
                const dayEvents = eventsForDate(dateStr);
                const isToday = dateStr === today.toISOString().split("T")[0];
                const isSelected = dateStr === selectedDate;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className="relative aspect-square rounded-lg flex flex-col items-center justify-start pt-1 transition-all"
                    style={{
                      background: isSelected ? "rgba(0,170,255,0.12)" : "transparent",
                      border: `1px solid ${isSelected ? "rgba(0,170,255,0.4)" : isToday ? "rgba(0,255,136,0.3)" : "transparent"}`,
                    }}
                  >
                    <span className="text-xs font-medium" style={{ color: isToday ? "#00FF88" : isSelected ? "#00AAFF" : "var(--text-secondary)" }}>
                      {day}
                    </span>
                    {dayEvents.length > 0 && (
                      <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center">
                        {dayEvents.slice(0, 3).map((e) => (
                          <span key={e.id} className="w-1.5 h-1.5 rounded-full" style={{ background: TYPE_CONFIG[e.type].color }} />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-4 pt-3" style={{ borderTop: "1px solid var(--border-subtle)" }}>
              {(Object.entries(TYPE_CONFIG) as [EventType, typeof TYPE_CONFIG[EventType]][]).map(([type, cfg]) => (
                <div key={type} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: cfg.color }} />
                  <span className="text-[10px] capitalize" style={{ color: "var(--text-muted)" }}>{type}</span>
                </div>
              ))}
            </div>
          </NeonCard>
        </motion.div>

        {/* Selected day events */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-3">
          <NeonCard className="p-4">
            <h3 className="text-xs font-semibold mb-3" style={{ fontFamily: "var(--font-syne)", color: "var(--text-secondary)" }}>
              {selectedDate ? new Date(selectedDate + "T12:00:00").toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" }) : "Selecciona un día"}
            </h3>

            {selectedEvents.length === 0 ? (
              <p className="text-xs text-center py-4" style={{ color: "var(--text-muted)" }}>Sin citas este día</p>
            ) : (
              <div className="space-y-2">
                {selectedEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className="w-full text-left p-3 rounded-xl transition-all hover:opacity-80"
                    style={{ background: `${TYPE_CONFIG[event.type].color}10`, border: `1px solid ${TYPE_CONFIG[event.type].color}25` }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{event.time}</span>
                      <NeonBadge color={TYPE_CONFIG[event.type].badge} size="sm">{event.type}</NeonBadge>
                    </div>
                    <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{event.title}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>{event.client} · {event.duration}</p>
                  </button>
                ))}
              </div>
            )}
          </NeonCard>

          {/* Upcoming */}
          <NeonCard className="p-4">
            <h3 className="text-xs font-semibold mb-3" style={{ fontFamily: "var(--font-syne)", color: "var(--text-secondary)" }}>
              Próximas citas
            </h3>
            <div className="space-y-2">
              {events
                .filter((e) => e.date >= today.toISOString().split("T")[0])
                .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
                .slice(0, 4)
                .map((event) => (
                  <div key={event.id} className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ background: TYPE_CONFIG[event.type].color }} />
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>{event.title}</p>
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                        {new Date(event.date + "T12:00:00").toLocaleDateString("es-ES", { day: "numeric", month: "short" })} · {event.time}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </NeonCard>
        </motion.div>
      </div>

      {/* Add event modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
            onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold" style={{ fontFamily: "var(--font-syne)", color: "var(--text-primary)" }}>Nueva cita</h3>
                <button onClick={() => setShowForm(false)} style={{ color: "var(--text-muted)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Título", key: "title", type: "text", placeholder: "Ej: Demo Clínica Estética" },
                  { label: "Cliente", key: "client", type: "text", placeholder: "Nombre del cliente" },
                  { label: "Fecha", key: "date", type: "date", placeholder: "" },
                  { label: "Hora", key: "time", type: "time", placeholder: "" },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key} className="flex flex-col gap-1">
                    <label className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{label}</label>
                    <input type={type} placeholder={placeholder} className="input-dark"
                      value={(form as Record<string, string>)[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} />
                  </div>
                ))}

                <div className="flex gap-3">
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Tipo</label>
                    <select className="select-dark" value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as EventType }))}>
                      {(Object.keys(TYPE_CONFIG) as EventType[]).map((t) => (
                        <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Duración</label>
                    <select className="select-dark" value={form.duration} onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}>
                      {["15 min", "30 min", "45 min", "1h", "1h 30min", "2h"].map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Notas</label>
                  <textarea className="input-dark resize-none" rows={2} placeholder="Notas de la cita..."
                    value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
                </div>

                <div className="flex gap-2 pt-1">
                  <NeonButton variant="ghost" size="sm" onClick={() => setShowForm(false)} className="flex-1 justify-center">Cancelar</NeonButton>
                  <NeonButton size="sm" onClick={addEvent} disabled={!form.title || !form.date} className="flex-1 justify-center">Guardar cita</NeonButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Event detail modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
            onClick={(e) => e.target === e.currentTarget && setSelectedEvent(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-2xl p-5" style={{ background: "var(--bg-card)", border: `1px solid ${TYPE_CONFIG[selectedEvent.type].color}40` }}>
              <div className="flex items-start justify-between mb-3">
                <NeonBadge color={TYPE_CONFIG[selectedEvent.type].badge} size="sm">{selectedEvent.type}</NeonBadge>
                <button onClick={() => setSelectedEvent(null)} style={{ color: "var(--text-muted)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <h3 className="text-sm font-bold mb-1" style={{ fontFamily: "var(--font-syne)", color: "var(--text-primary)" }}>{selectedEvent.title}</h3>
              <p className="text-xs mb-3" style={{ color: "var(--text-secondary)" }}>{selectedEvent.client}</p>
              <div className="space-y-1.5 text-xs mb-4">
                <div className="flex gap-2" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--text-muted)" }}>Fecha:</span>
                  {new Date(selectedEvent.date + "T12:00:00").toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}
                </div>
                <div className="flex gap-2" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--text-muted)" }}>Hora:</span> {selectedEvent.time} ({selectedEvent.duration})
                </div>
                {selectedEvent.notes && (
                  <div style={{ color: "var(--text-secondary)" }}>
                    <span style={{ color: "var(--text-muted)" }}>Notas:</span> {selectedEvent.notes}
                  </div>
                )}
              </div>
              <NeonButton variant="danger" size="sm" className="w-full justify-center" onClick={() => deleteEvent(selectedEvent.id)}>
                Eliminar cita
              </NeonButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
