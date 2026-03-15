"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import NeuraxisLogo from "@/components/brand/NeuraxisLogo";
import { createClient } from "@/lib/supabase/client";

// ── Nav items ──────────────────────────────────────────────────────────────────
type NavItem =
  | { type?: undefined; label: string; href: string; icon: React.ReactNode; badge?: string; external?: boolean }
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
    label: "Roadmap",
    href: "/roadmap",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 12h18M3 6h12M3 18h8" strokeLinecap="round" />
      </svg>
    ),
    badge: "6 pasos",
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
  { type: "section", label: "Construye" },
  {
    label: "Construye",
    href: "/agents",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M8 8H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1M16 8h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1" />
        <path d="M9 14h6l1 6H8l1-6z" />
      </svg>
    ),
  },
  {
    label: "Chat IA",
    href: "/chat",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: "Contenido",
    href: "/content",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    label: "Excel IA",
    href: "/excel",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="16" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
  },
  { type: "section", label: "Delega" },
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
    label: "Clientes",
    href: "/clients",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Calendario",
    href: "/calendar",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
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
  { type: "section", label: "Servicios" },
  {
    label: "Crea tu web",
    href: "/web",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    label: "Revly",
    href: "https://revly.app",
    external: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
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
    const isActive = !item.external && (pathname === item.href || pathname.startsWith(item.href + "/"));
    const isRevly = item.label === "Revly";
    const activeColor = isRevly ? "#0d9488" : "var(--neon-blue)";
    const activeBg = isRevly ? "rgba(13,148,136,0.08)" : "rgba(0,170,255,0.08)";
    const activeGlow = isRevly ? "rgba(13,148,136,0.04)" : "rgba(0,170,255,0.04)";

    if (item.external) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group"
          style={{
            color: isRevly ? "#0d9488" : "var(--text-secondary)",
            background: "transparent",
            borderLeft: "2px solid transparent",
          }}
        >
          <span className="flex-shrink-0 transition-colors duration-150" style={{ color: isRevly ? "#0d9488" : "var(--text-muted)" }}>
            {item.icon}
          </span>
          <span>{item.label}</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto opacity-40 flex-shrink-0">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      );
    }

    return (
      <Link
        href={item.href}
        onClick={onClose}
        className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group"
        style={{
          color: isActive ? activeColor : "var(--text-secondary)",
          background: isActive ? activeBg : "transparent",
          borderLeft: isActive ? `2px solid ${activeColor}` : "2px solid transparent",
        }}
      >
        <span
          className="flex-shrink-0 transition-colors duration-150"
          style={{ color: isActive ? activeColor : "var(--text-muted)" }}
        >
          {item.icon}
        </span>
        <span>{item.label}</span>
        {item.badge && (
          <span
            className="ml-auto text-[10px] px-1.5 py-0.5 rounded-md border"
            style={{
              color: "var(--neon-purple)",
              background: "rgba(168,85,247,0.1)",
              borderColor: "rgba(168,85,247,0.25)",
            }}
          >
            {item.badge}
          </span>
        )}
        {isActive && (
          <motion.div
            layoutId="sidebar-active-glow"
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{ background: activeGlow }}
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
            <div key={`section-${i}`} className="px-3 pt-4 pb-1">
              <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
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
            background: profileOpen ? "rgba(0,170,255,0.06)" : "transparent",
            border: "1px solid " + (profileOpen ? "var(--border-neon)" : "transparent"),
          }}
        >
          <div
            className="w-9 h-9 rounded-full flex-shrink-0 relative flex items-center justify-center font-bold text-sm"
            style={{
              background: "linear-gradient(135deg, #00AAFF, #7C3AED)",
              boxShadow: "0 0 12px rgba(0,212,255,0.45), 0 0 24px rgba(0,212,255,0.15)",
              color: "#fff",
              fontFamily: "var(--font-syne)",
            }}
          >
            {userName.charAt(0).toUpperCase()}
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
              style={{ background: "#00FF88", borderColor: "var(--bg-panel)", boxShadow: "0 0 4px rgba(0,255,136,0.8)" }}
            />
          </div>

          <div className="flex-1 text-left min-w-0">
            <p
              className="text-xs font-bold truncate"
              style={{
                background: "linear-gradient(90deg, #00D4FF, #A855F7)",
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

          <motion.span animate={{ rotate: profileOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ color: "var(--text-muted)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.span>
        </button>

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
                <div className="p-3 rounded-xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-medium" style={{ color: "var(--text-secondary)" }}>Neurax-Points</span>
                    <span className="text-[10px] font-bold" style={{ color: "var(--neon-cyan)" }}>2.840 / 5.000</span>
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
                      <polygon points="7,1 12,4 12,10 7,13 2,10 2,4" fill="#00D4FF" fillOpacity="0.25" stroke="#00D4FF" strokeWidth="1" />
                    </svg>
                    <span className="text-[10px]" style={{ color: "var(--text-secondary)" }}>850 créditos disponibles</span>
                  </div>
                </div>

                <div className="flex gap-1.5">
                  <Link
                    href="/settings"
                    onClick={onClose}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-medium transition-colors"
                    style={{ color: "var(--text-secondary)", background: "var(--bg-card)", border: "1px solid var(--border-card)" }}
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
                    style={{ color: "var(--neon-red)", background: "rgba(255,68,68,0.06)", border: "1px solid rgba(255,68,68,0.2)" }}
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
