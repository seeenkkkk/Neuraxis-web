import Link from "next/link";
import type { ReactNode } from "react";
import { LEGAL, LEGAL_LINKS, LEGAL_PENDIENTE } from "@/lib/legal";

// Plantilla común de las páginas legales: cabecera sencilla, texto legible y enlaces entre ellas.
export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "#F8F9FF", color: "#1a1a2e" }}>
      <header className="px-6 py-5" style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo1.png-removebg-preview.png" alt="Neuraxis" className="h-7 object-contain" />
          </Link>
          <Link href="/" className="text-sm text-black/60 hover:text-[#1a1a2e]">
            ← Volver a la web
          </Link>
        </div>
      </header>

      <main className="px-6 py-12">
        <article className="max-w-3xl mx-auto legal-text">
          {LEGAL_PENDIENTE && (
            <p className="mb-8 rounded-lg px-4 py-3 text-sm" style={{ background: "#FFF4D6", border: "1px solid #F2C94C" }}>
              Faltan datos del titular por completar en esta página.
            </p>
          )}
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
          <p className="text-sm mb-10" style={{ color: "rgba(0,0,0,0.45)" }}>
            Última actualización: {LEGAL.actualizado}
          </p>
          <div className="space-y-6 text-[15px] leading-relaxed" style={{ color: "rgba(0,0,0,0.75)" }}>
            {children}
          </div>
        </article>
      </main>

      <footer className="px-6 py-8" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <nav className="max-w-3xl mx-auto flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {LEGAL_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-black/60 hover:text-[#1a1a2e]">
              {l.label}
            </Link>
          ))}
          <span className="ml-auto text-black/40">© {new Date().getFullYear()} {LEGAL.marca}</span>
        </nav>
      </footer>
    </div>
  );
}

/** Subtítulo de sección dentro de una página legal. */
export function H2({ children }: { children: ReactNode }) {
  return <h2 className="text-xl font-semibold pt-4" style={{ color: "#1a1a2e" }}>{children}</h2>;
}
