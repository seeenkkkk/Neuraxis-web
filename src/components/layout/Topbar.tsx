"use client";

import { useState } from "react";
import Link from "next/link";
import NeuraxisLogo from "@/components/brand/NeuraxisLogo";
import StatusDot from "@/components/ui/StatusDot";

interface TopbarProps {
  userName?: string;
  userAvatar?: string;
  onMenuToggle?: () => void;
  sidebarOpen?: boolean;
}

export default function Topbar({
  userName = "Admin Neuraxis",
  userAvatar = "/avatar.png",
  onMenuToggle,
  sidebarOpen,
}: TopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header
      className="fixed top-0 right-0 left-0 z-40 flex items-center gap-3 px-4 h-14"
      style={{
        background: "var(--bg-panel)",
        borderBottom: "1px solid var(--border-subtle)",
        fontFamily: "var(--font-dm-sans, sans-serif)",
      }}
    >
      {/* Hamburger (mobile) */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden flex flex-col gap-1.5 p-1.5 rounded-lg"
        style={{ color: "var(--text-secondary)" }}
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${sidebarOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${sidebarOpen ? "opacity-0" : ""}`} />
        <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${sidebarOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Logo (mobile only — desktop shows in sidebar) */}
      <div className="lg:hidden">
        <NeuraxisLogo size="sm" animated={false} />
      </div>

      {/* Logoletras — desktop left */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logoletras-removebg-preview.png"
        className="hidden lg:block h-8 w-auto"
        alt="Neuraxis IA"
      />

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-lg transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {/* Unread dot */}
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: "#007AFF", boxShadow: "0 0 6px rgba(0,122,255,0.8)" }}
            />
          </button>
        </div>

        {/* Status indicator */}
        <StatusDot status="active" label="Sistema OK" className="hidden md:flex" />

        {/* User avatar */}
        <Link
          href="/settings"
          className="flex items-center gap-2 px-2 py-1.5 rounded-xl transition-colors"
          style={{ border: "1px solid var(--border-subtle)" }}
        >
          <div
            className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0"
            style={{ boxShadow: "0 0 8px rgba(0,196,255,0.4)" }}
          >
            <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
          </div>
          <span className="hidden md:block text-xs font-medium" style={{ color: "var(--text-primary)" }}>
            {userName.split(" ")[0]}
          </span>
        </Link>
      </div>
    </header>
  );
}
