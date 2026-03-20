import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-syne", // keeping var name for backward compat
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEURAXIS IA — Plataforma de Agencia de Inteligencia Artificial",
  description:
    "Automatiza tu agencia con agentes IA, workflows n8n, academia, generación de Excels e integraciones con Calendly. La plataforma SaaS más completa para agencias de IA.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "NEURAXIS IA",
    description: "Plataforma SaaS de Inteligencia Artificial para agencias",
    images: [{ url: "/assets/og-image.svg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${dmSans.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased bg-[--bg-root] text-[--text-primary]"
        style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
