import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { H2 } from "@/components/legal/LegalPage";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de cookies — Neuraxis IA",
  description: "Qué cookies usa la web de Neuraxis IA.",
  alternates: { canonical: "/cookies" },
};

// Revisado el 14-11-2026: la web no carga analítica, publicidad ni contenidos de terceros que pongan cookies.
// La única cookie es la de sesión de Supabase en el área de clientes. Si algún día se añade analítica
// (Google Analytics, píxel de Meta…), esta página y un banner de consentimiento pasan a ser obligatorios.
export default function Cookies() {
  return (
    <LegalPage title="Política de cookies">
      <H2>1. Qué son las cookies</H2>
      <p>
        Son pequeños archivos que una web guarda en tu navegador para recordar información, por ejemplo, que has iniciado
        sesión.
      </p>

      <H2>2. Qué cookies usamos</H2>
      <p>
        La parte pública de esta web <strong>no usa cookies de análisis, de publicidad ni de seguimiento</strong>, y no
        incluye contenidos de terceros que las instalen. Por eso no te pedimos consentimiento al entrar.
      </p>
      <p>Solo usamos una cookie técnica, imprescindible, cuando entras en el área de clientes:</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.15)" }}>
              <th className="text-left py-2 pr-4">Cookie</th>
              <th className="text-left py-2 pr-4">Para qué</th>
              <th className="text-left py-2 pr-4">Quién la pone</th>
              <th className="text-left py-2">Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
              <td className="py-2 pr-4 font-mono text-xs">sb-…-auth-token</td>
              <td className="py-2 pr-4">Mantener tu sesión abierta en el área de clientes</td>
              <td className="py-2 pr-4">{LEGAL.marca} (servicio de Supabase)</td>
              <td className="py-2">Hasta que cierres sesión o caduque</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Las cookies técnicas imprescindibles para un servicio que pides de forma expresa, como iniciar sesión, están
        exentas de consentimiento (art. 22.2 de la LSSI-CE).
      </p>

      <H2>3. Cómo borrarlas o bloquearlas</H2>
      <p>
        Puedes borrar las cookies o bloquearlas desde la configuración de tu navegador (Chrome, Safari, Firefox o Edge). Si
        bloqueas la de sesión, no podrás entrar en el área de clientes.
      </p>

      <H2>4. Cambios</H2>
      <p>
        Si en el futuro usamos cookies de análisis o publicidad, actualizaremos esta página y te pediremos consentimiento
        antes de instalarlas. Más información sobre tus datos en la{" "}
        <Link className="underline" href="/privacidad">política de privacidad</Link>.
      </p>
    </LegalPage>
  );
}
