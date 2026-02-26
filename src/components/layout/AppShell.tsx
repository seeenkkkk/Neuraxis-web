"use client";

import { useState } from "react";
import Topbar from "./Topbar";
import AppSidebar from "./AppSidebar";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-root)" }}>
      {/* Sidebar */}
      <AppSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Topbar */}
      <Topbar
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />

      {/* Main content */}
      <main className="lg:pl-60 pt-14 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
