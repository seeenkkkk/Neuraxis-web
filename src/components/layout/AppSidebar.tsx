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
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "Prompts",
    href: "/prompts",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
  { type: "section", label: "Construye" },
  {
    label: "Creador de Agentes",
    href: "/agents",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M8 8H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1M16 8h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1" />
        <path d="M9 14h6l1 6H8l1-6z" />
      </svg>
    ),
  },
  {
    label: "Neuraxis Chat",
    href: "/chat",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  { type: "section", label: "Delega" },
  {
    label: "Delega",
    href: "/delegate",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Planes",
    href: "/billing",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
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
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
  const NavItemComponent = ({ item }: { item: NavLinkItem }) => {
    const isActive = !item.external && (pathname === item.href || pathname.startsWith(item.href + "/"));
    const isRevly = item.label === "Revly";

    const baseClass = "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors duration-150 group";

    if (item.external) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className={`${baseClass} hover:bg-gray-50`}
          style={{
            color: isRevly ? "#0d9488" : "#374151",
            borderLeft: "2px solid transparent",
          }}
        >
          <span className="flex-shrink-0" style={{ color: isRevly ? "#0d9488" : "#9ca3af" }}>
            {item.icon}
          </span>
          <span className="font-medium">{item.label}</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="ml-auto opacity-30 flex-shrink-0 group-hover:opacity-60 transition-opacity">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      );
    }

    return (
      <Link
        href={item.href}
        onClick={onClose}
        className={`${baseClass} ${!isActive ? "hover:bg-gray-50" : ""}`}
        style={{
          color: isActive ? "#0d9488" : "#374151",
          background: isActive ? "#f0fdfa" : undefined,
          borderLeft: isActive ? "2px solid #0d9488" : "2px solid transparent",
          fontWeight: isActive ? 600 : 500,
        }}
      >
        <span
          className="flex-shrink-0"
          style={{ color: isActive ? "#0d9488" : "#9ca3af" }}
        >
          {item.icon}
        </span>
        <span>{item.label}</span>
        {item.badge && (
          <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-md font-medium"
            style={{ color: "#7c3aed", background: "#f5f3ff", border: "1px solid #ddd6fe" }}>
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full" style={{ background: "#ffffff" }}>
      {/* Logo */}
      <div className="flex items-center px-4 h-14 flex-shrink-0" style={{ borderBottom: "1px solid #f3f4f6" }}>
        <NeuraxisLogo size="sm" animated />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        {NAV_ITEMS.map((item, i) =>
          item.type === "section" ? (
            <div key={`section-${i}`} className="px-3 pt-5 pb-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#9ca3af" }}>
                {item.label}
              </span>
            </div>
          ) : (
            <NavItemComponent key={item.href} item={item} />
          )
        )}
      </nav>

      {/* Divider */}
      <div className="mx-4 h-px" style={{ background: "#f3f4f6" }} />

      {/* Profile section */}
      <div className="p-3 flex-shrink-0">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-150 hover:bg-gray-50"
          style={{
            border: "1px solid " + (profileOpen ? "#e5e7eb" : "transparent"),
            background: profileOpen ? "#f9fafb" : "transparent",
          }}
        >
          <div
            className="w-8 h-8 rounded-full flex-shrink-0 relative flex items-center justify-center font-bold text-sm"
            style={{
              background: "linear-gradient(135deg, #00AAFF, #7C3AED)",
              color: "#fff",
              fontFamily: "var(--font-syne)",
            }}
          >
            {userName.charAt(0).toUpperCase()}
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white"
              style={{ background: "#10b981" }}
            />
          </div>

          <div className="flex-1 text-left min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: "#111827" }}>
              {userName}
            </p>
            <p className="text-[10px] truncate" style={{ color: "#6b7280" }}>
              {userEmail || "Arquitecto de IAs"}
            </p>
          </div>

          <motion.span animate={{ rotate: profileOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ color: "#9ca3af" }}>
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
                <div className="p-3 rounded-xl" style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-medium" style={{ color: "#6b7280" }}>Neurax-Points</span>
                    <span className="text-[10px] font-bold" style={{ color: "#0d9488" }}>2.840 / 5.000</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full" style={{ background: "#e5e7eb" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "56.8%" }}
                      transition={{ duration: 1, ease: "easeOut" as const }}
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #0d9488, #06b6d4)" }}
                    />
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                      <polygon points="7,1 12,4 12,10 7,13 2,10 2,4" fill="#0d9488" fillOpacity="0.2" stroke="#0d9488" strokeWidth="1" />
                    </svg>
                    <span className="text-[10px]" style={{ color: "#6b7280" }}>850 créditos disponibles</span>
                  </div>
                </div>

                <div className="flex gap-1.5">
                  <Link
                    href="/settings"
                    onClick={onClose}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-medium transition-colors hover:bg-gray-100"
                    style={{ color: "#374151", background: "#f3f4f6", border: "1px solid #e5e7eb" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                    Config
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-medium transition-colors hover:bg-red-50"
                    style={{ color: "#ef4444", background: "#fff5f5", border: "1px solid #fecaca" }}
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
        style={{ borderRight: "1px solid #e5e7eb" }}
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
              style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 z-50"
              style={{ borderRight: "1px solid #e5e7eb" }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
