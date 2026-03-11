"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import NeuraxisLogo from "@/components/brand/NeuraxisLogo";
import { createClient } from "@/lib/supabase/client";

// ── Nav items ──────────────────────────────────────────────────────────────────
type NavItem =
  | { type?: undefined; label: string; href: string; icon: React.ReactNode; badge?: string }
  | { type: "section"; label: string };

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "Crear Agente",
    href: "/roadmap",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 12h18M3 6h12M3 18h8" strokeLinecap="round" />
      </svg>
    ),
    badge: "6 pasos",
  },
  { type: "section", label: "Aprende" },
  {
    label: "Aprende",
    href: "/academy",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    label: "Prompts",
    href: "/prompts",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
  {
    label: "Workflows",
    href: "/workflows",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="7" width="6" height="4" rx="1" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <rect x="9" y="13" width="6" height="4" rx="1" />
        <rect x="16" y="7" width="6" height="4" rx="1" />
        <path d="M8 9h1M15 5v2M15 15v2M15 9h1" strokeLinecap="round" />
      </svg>
    ),
  },
  { type: "section", label: "Cuenta" },
  {
    label: "Delega",
    href: "/delegate",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Facturación",
    href: "/billing",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
];

interface AppSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AppSidebar({ isOpen = true, onClose }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const [userName, setUserName] = useState("Admin Neuraxis");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserEmail(user.email ?? "");
        const fullName = user.user_metadata?.full_name;
        setUserName(fullName || user.email?.split("@")[0] || "Admin Neuraxis");
      }
    });
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  type NavLinkItem = Extract<NavItem, { href: string }>;
  const NavItem = ({ item }: { item: NavLinkItem }) => {
    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group"
        style={{
          color: isActive ? "var(--neon-blue)" : "var(--text-secondary)",
          background: isActive ? "rgba(0,122,255,0.07)" : "transparent",
          borderLeft: isActive ? "2px solid var(--neon-blue)" : "2px solid transparent",
        }}
      >
        <span
          className="flex-shrink-0 transition-colors duration-150"
          style={{ color: isActive ? "var(--neon-blue)" : "var(--text-muted)" }}
        >
          {item.icon}
        </span>
        <span>{item.label}</span>
        {item.badge && (
          <span
            className="ml-auto text-[10px] px-1.5 py-0.5 rounded-md border"
            style={{
              color: "var(--neon-purple)",
              background: "rgba(155,48,255,0.08)",
              borderColor: "rgba(155,48,255,0.25)",
            }}
          >
            {item.badge}
          </span>
        )}
        {/* Active glow */}
        {isActive && (
          <motion.div
            layoutId="sidebar-active-glow"
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{ background: "rgba(0,122,255,0.04)" }}
          />
        )}
      </Link>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full" style={{ background: "var(--bg-panel)" }}>
      {/* Logo */}
      <div className="flex items-center px-4 h-14 flex-shrink-0" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <NeuraxisLogo size="sm" animated />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map((item, i) =>
          item.type === "section" ? (
            <div
              key={`section-${i}`}
              className="px-3 pt-4 pb-1"
            >
              <span
                className="text-[9px] font-black uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                {item.label}
              </span>
            </div>
          ) : (
            <NavItem key={item.href} item={item} />
          )
        )}
      </nav>

      {/* Divider */}
      <div className="mx-4 h-px" style={{ background: "var(--border-subtle)" }} />

      {/* Profile section */}
      <div className="p-3 flex-shrink-0">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-150"
          style={{
            background: profileOpen ? "rgba(0,122,255,0.06)" : "transparent",
            border: "1px solid " + (profileOpen ? "var(--border-neon)" : "transparent"),
          }}
        >
          {/* Avatar with glow */}
          <div
            className="w-9 h-9 rounded-full flex-shrink-0 relative flex items-center justify-center font-bold text-sm"
            style={{
              background: "linear-gradient(135deg, #007AFF, #9B30FF)",
              boxShadow: "0 0 12px rgba(0,122,255,0.40), 0 0 24px rgba(155,48,255,0.20)",
              color: "#fff",
              fontFamily: "var(--font-syne)",
            }}
          >
            {userName.charAt(0).toUpperCase()}
            {/* Online indicator */}
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
              style={{
                background: "#00FF88",
                borderColor: "var(--bg-panel)",
                boxShadow: "0 0 4px rgba(0,255,136,0.8)",
              }}
            />
          </div>

          {/* Info */}
          <div className="flex-1 text-left min-w-0">
            <p
              className="text-xs font-bold truncate"
              style={{
                background: "linear-gradient(90deg, #007AFF, #9B30FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {userName}
            </p>
            <p className="text-[10px] truncate" style={{ color: "var(--text-secondary)" }}>
              {userEmail || "Arquitecto de IAs"}
            </p>
          </div>

          {/* Chevron */}
          <motion.span
            animate={{ rotate: profileOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ color: "var(--text-muted)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.span>
        </button>

        {/* Profile expanded panel */}
        <AnimatePresence>
          {profileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-2 space-y-2">
                {/* XP / Neurax-Points bar */}
                <div
                  className="p-3 rounded-xl"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-medium" style={{ color: "var(--text-secondary)" }}>
                      Neurax-Points
                    </span>
                    <span className="text-[10px] font-bold" style={{ color: "var(--neon-cyan)" }}>
                      2.840 / 5.000
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full" style={{ background: "var(--bg-input)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "56.8%" }}
                      transition={{ duration: 1, ease: "easeOut" as const }}
                      className="h-full rounded-full xp-bar-fill"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <polygon points="7,1 12,4 12,10 7,13 2,10 2,4" fill="#007AFF" fillOpacity="0.20" stroke="#007AFF" strokeWidth="1" />
                    </svg>
                    <span className="text-[10px]" style={{ color: "var(--text-secondary)" }}>
                      850 créditos disponibles
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-1.5">
                  <Link
                    href="/settings"
                    onClick={onClose}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-medium transition-colors"
                    style={{
                      color: "var(--text-secondary)",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-card)",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                    Config
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-medium transition-colors"
                    style={{
                      color: "var(--neon-red)",
                      background: "rgba(255,68,68,0.06)",
                      border: "1px solid rgba(255,68,68,0.2)",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Salir
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-60 z-30"
        style={{ borderRight: "1px solid var(--border-subtle)" }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 z-50"
              style={{ borderRight: "1px solid var(--border-subtle)" }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
