"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradientText from "@/components/ui/GradientText";
import NeonBadge from "@/components/ui/NeonBadge";
import NeonCard from "@/components/ui/NeonCard";
import NeonButton from "@/components/ui/NeonButton";
import StatusDot from "@/components/ui/StatusDot";

type ClientStatus = "activo" | "trial" | "inactivo" | "lead";
type ClientPlan = "Free" | "Pro" | "Premium";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: ClientStatus;
  plan: ClientPlan;
  mrr: number;
  since: string;
  notes: string;
  agents: number;
}

const STATUS_CONFIG: Record<ClientStatus, { label: string; dot: "active" | "inactive" | "loading" | "error"; badge: "green" | "blue" | "orange" | "purple" }> = {
  activo:   { label: "Activo",   dot: "active",   badge: "green" },
  trial:    { label: "Trial",    dot: "loading",  badge: "blue" },
  inactivo: { label: "Inactivo", dot: "inactive", badge: "orange" },
  lead:     { label: "Lead",     dot: "loading",  badge: "purple" },
};

const DEFAULT_CLIENTS: Client[] = [
  { id: "c1", name: "María García", email: "maria@empresa.es", phone: "+34 611 234 567", company: "Tech Solutions SL", status: "activo", plan: "Pro", mrr: 340, since: "2024-01-15", notes: "Cliente satisfecho. Renovó en enero.", agents: 2 },
  { id: "c2", name: "Carlos Ruiz", email: "carlos@innovate.com", phone: "+34 622 345 678", company: "Innovate Digital", status: "trial", plan: "Free", mrr: 0, since: "2024-02-20", notes: "Evalúa plan Pro. Demo pendiente.", agents: 1 },
  { id: "c3", name: "Ana Martínez", email: "ana@clinica.es", phone: "+34 633 456 789", company: "Clínica Estética Norte", status: "activo", plan: "Premium", mrr: 600, since: "2023-11-05", notes: "Renovación en marzo. Interesada en más agentes.", agents: 4 },
  { id: "c4", name: "Javier López", email: "javier@inmobiliaria.es", phone: "+34 644 567 890", company: "Grupo Inmobiliario Sur", status: "activo", plan: "Pro", mrr: 340, since: "2024-01-30", notes: "Quiere integrar CRM propio.", agents: 2 },
  { id: "c5", name: "Laura Sánchez", email: "laura@ecommerce.com", phone: "+34 655 678 901", company: "TiendaOnline24", status: "inactivo", plan: "Free", mrr: 0, since: "2023-09-12", notes: "Canceló en diciembre. Razón: presupuesto.", agents: 0 },
  { id: "c6", name: "Pedro Fernández", email: "pedro@marketing.es", phone: "+34 666 789 012", company: "Agencia Marketing Pro", status: "lead", plan: "Free", mrr: 0, since: "2024-03-01", notes: "Lead de LinkedIn. Propuesta enviada 2.400€/mes.", agents: 0 },
];

const STORAGE_KEY = "neuraxis_clients";

function loadClients(): Client[] {
  if (typeof window === "undefined") return DEFAULT_CLIENTS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_CLIENTS;
  } catch { return DEFAULT_CLIENTS; }
}

function saveClients(clients: Client[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
}

const EMPTY_FORM: Omit<Client, "id"> = {
  name: "", email: "", phone: "", company: "", status: "lead", plan: "Free", mrr: 0, since: "", notes: "", agents: 0,
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<ClientStatus | "todos">("todos");
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [form, setForm] = useState<Omit<Client, "id">>(EMPTY_FORM);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => { setClients(loadClients()); }, []);

  const filtered = clients.filter((c) => {
    const matchSearch = search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "todos" || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalMRR = clients.filter((c) => c.status === "activo").reduce((a, c) => a + c.mrr, 0);
  const activeCount = clients.filter((c) => c.status === "activo").length;
  const trialCount = clients.filter((c) => c.status === "trial").length;
  const leadCount = clients.filter((c) => c.status === "lead").length;

  const openAdd = () => {
    setEditingClient(null);
    setForm({ ...EMPTY_FORM, since: new Date().toISOString().split("T")[0] });
    setShowForm(true);
  };

  const openEdit = (client: Client) => {
    setEditingClient(client);
    setForm({ name: client.name, email: client.email, phone: client.phone, company: client.company, status: client.status, plan: client.plan, mrr: client.mrr, since: client.since, notes: client.notes, agents: client.agents });
    setShowForm(true);
    setSelectedClient(null);
  };

  const save = () => {
    let updated: Client[];
    if (editingClient) {
      updated = clients.map((c) => c.id === editingClient.id ? { ...form, id: editingClient.id } : c);
    } else {
      updated = [...clients, { ...form, id: `c${Date.now()}` }];
    }
    setClients(updated);
    saveClients(updated);
    setShowForm(false);
  };

  const deleteClient = (id: string) => {
    const updated = clients.filter((c) => c.id !== id);
    setClients(updated);
    saveClients(updated);
    setSelectedClient(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
            Gestión de <GradientText>Clientes</GradientText>
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>CRM inteligente para tu agencia de IA</p>
        </div>
        <NeonButton size="sm" onClick={openAdd}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nuevo cliente
        </NeonButton>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "MRR Total", value: `${totalMRR.toLocaleString()}€`, color: "#00FF88", icon: "💰" },
          { label: "Clientes Activos", value: String(activeCount), color: "#007AFF", icon: "✅" },
          { label: "En Trial", value: String(trialCount), color: "#A855F7", icon: "🔄" },
          { label: "Leads Activos", value: String(leadCount), color: "#FFD700", icon: "🎯" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
            <NeonCard className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <span>{stat.icon}</span>
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{stat.label}</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: stat.color, fontFamily: "var(--font-syne)" }}>{stat.value}</p>
            </NeonCard>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          className="input-dark flex-1 min-w-48"
          placeholder="Buscar por nombre, empresa o email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          {(["todos", "activo", "trial", "lead", "inactivo"] as const).map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className="text-xs px-3 py-1.5 rounded-lg border transition-all capitalize"
              style={{
                background: filterStatus === s ? "rgba(0,170,255,0.12)" : "transparent",
                borderColor: filterStatus === s ? "rgba(0,170,255,0.4)" : "var(--border-subtle)",
                color: filterStatus === s ? "#007AFF" : "var(--text-secondary)",
              }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Clients table */}
      <NeonCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                {["Cliente", "Empresa", "Estado", "Plan", "MRR", "Agentes", "Desde", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold" style={{ color: "var(--text-muted)", fontFamily: "var(--font-syne)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((client, i) => {
                const sc = STATUS_CONFIG[client.status];
                return (
                  <motion.tr key={client.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.03 * i }}
                    className="transition-colors cursor-pointer"
                    style={{ borderBottom: "1px solid var(--border-subtle)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    onClick={() => setSelectedClient(client)}>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{client.name}</p>
                        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{client.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--text-secondary)" }}>{client.company}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <StatusDot status={sc.dot} />
                        <NeonBadge color={sc.badge} size="sm">{sc.label}</NeonBadge>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <NeonBadge color={client.plan === "Premium" ? "purple" : client.plan === "Pro" ? "blue" : "orange"} size="sm">{client.plan}</NeonBadge>
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold" style={{ color: client.mrr > 0 ? "#00FF88" : "var(--text-muted)" }}>
                      {client.mrr > 0 ? `${client.mrr}€` : "—"}
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--text-secondary)" }}>{client.agents}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--text-muted)" }}>
                      {new Date(client.since).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "2-digit" })}
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={(e) => { e.stopPropagation(); openEdit(client); }}
                        className="text-[10px] px-2 py-1 rounded-lg transition-colors"
                        style={{ color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}>
                        Editar
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-8 text-xs" style={{ color: "var(--text-muted)" }}>No se encontraron clientes</div>
          )}
        </div>
      </NeonCard>

      {/* Client detail panel */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
            onClick={(e) => e.target === e.currentTarget && setSelectedClient(null)}>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              className="w-full max-w-sm rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-bold" style={{ fontFamily: "var(--font-syne)", color: "var(--text-primary)" }}>{selectedClient.name}</p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{selectedClient.company}</p>
                </div>
                <button onClick={() => setSelectedClient(null)} style={{ color: "var(--text-muted)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="space-y-2 text-xs mb-4">
                {[
                  ["Email", selectedClient.email],
                  ["Teléfono", selectedClient.phone],
                  ["Plan", selectedClient.plan],
                  ["MRR", selectedClient.mrr > 0 ? `${selectedClient.mrr}€` : "—"],
                  ["Agentes", String(selectedClient.agents)],
                  ["Alta", new Date(selectedClient.since).toLocaleDateString("es-ES")],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span style={{ color: "var(--text-muted)" }}>{label}</span>
                    <span style={{ color: "var(--text-primary)" }}>{value}</span>
                  </div>
                ))}
              </div>

              {selectedClient.notes && (
                <div className="p-3 rounded-xl mb-4 text-xs" style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}>
                  {selectedClient.notes}
                </div>
              )}

              <div className="flex gap-2">
                <NeonButton variant="ghost" size="sm" className="flex-1 justify-center" onClick={() => openEdit(selectedClient)}>Editar</NeonButton>
                <NeonButton variant="danger" size="sm" className="flex-1 justify-center" onClick={() => deleteClient(selectedClient.id)}>Eliminar</NeonButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit form modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
            onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl p-6 my-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold" style={{ fontFamily: "var(--font-syne)", color: "var(--text-primary)" }}>
                  {editingClient ? "Editar cliente" : "Nuevo cliente"}
                </h3>
                <button onClick={() => setShowForm(false)} style={{ color: "var(--text-muted)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Nombre", key: "name" },
                    { label: "Empresa", key: "company" },
                    { label: "Email", key: "email" },
                    { label: "Teléfono", key: "phone" },
                  ].map(({ label, key }) => (
                    <div key={key} className="flex flex-col gap-1">
                      <label className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{label}</label>
                      <input type="text" className="input-dark" value={(form as Record<string, string | number>)[key] as string}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Estado</label>
                    <select className="select-dark" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as ClientStatus }))}>
                      {(Object.keys(STATUS_CONFIG) as ClientStatus[]).map((s) => (
                        <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Plan</label>
                    <select className="select-dark" value={form.plan} onChange={(e) => setForm((f) => ({ ...f, plan: e.target.value as ClientPlan }))}>
                      {(["Free", "Pro", "Premium"] as ClientPlan[]).map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>MRR (€)</label>
                    <input type="number" className="input-dark" value={form.mrr}
                      onChange={(e) => setForm((f) => ({ ...f, mrr: Number(e.target.value) }))} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Agentes IA</label>
                    <input type="number" className="input-dark" value={form.agents}
                      onChange={(e) => setForm((f) => ({ ...f, agents: Number(e.target.value) }))} />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Fecha de alta</label>
                  <input type="date" className="input-dark" value={form.since} onChange={(e) => setForm((f) => ({ ...f, since: e.target.value }))} />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Notas</label>
                  <textarea className="input-dark resize-none" rows={2} value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
                </div>

                <div className="flex gap-2 pt-1">
                  <NeonButton variant="ghost" size="sm" onClick={() => setShowForm(false)} className="flex-1 justify-center">Cancelar</NeonButton>
                  <NeonButton size="sm" onClick={save} disabled={!form.name || !form.company} className="flex-1 justify-center">
                    {editingClient ? "Guardar cambios" : "Añadir cliente"}
                  </NeonButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
