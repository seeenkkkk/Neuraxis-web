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

const SITE_URL = "https://neuraxis-web.vercel.app";
const SITE_DESC =
  "Neuraxis IA crea páginas web para empresas, automatiza procesos (email, chatbots, WhatsApp, CRM) y produce contenido y marketing con inteligencia artificial. Pide presupuesto sin compromiso.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Neuraxis IA — Webs, automatización y contenido con IA para empresas",
  description: SITE_DESC,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "Neuraxis IA",
    title: "Neuraxis IA — Webs, automatización y contenido con IA",
    description: SITE_DESC,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Neuraxis IA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neuraxis IA — Webs, automatización y contenido con IA",
    description: SITE_DESC,
    images: ["/og-image.png"],
  },
};

// Datos estructurados para Google (ficha de empresa)
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Neuraxis IA",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/og-image.png`,
  description: SITE_DESC,
  areaServed: "ES",
  sameAs: ["https://www.instagram.com/neuraxis.ia"],
  knowsAbout: ["Diseño web", "Automatización de procesos", "Chatbots", "Marketing de contenidos", "Inteligencia artificial"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </body>
    </html>
  );
}
