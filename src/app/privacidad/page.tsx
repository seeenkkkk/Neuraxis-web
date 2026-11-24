import type { Metadata } from "next";
import LegalPage, { H2 } from "@/components/legal/LegalPage";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de privacidad — Neuraxis IA",
  description: "Cómo trata Neuraxis IA tus datos personales y cómo ejercer tus derechos.",
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return (
    <LegalPage title="Política de privacidad">
      <p>
        Aquí te explicamos qué datos personales tratamos, para qué y cuáles son tus derechos, según el Reglamento (UE)
        2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).
      </p>

      <H2>1. Responsable del tratamiento</H2>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Responsable:</strong> {LEGAL.titular} ({LEGAL.marca})</li>
        <li><strong>NIF:</strong> {LEGAL.nif}</li>
        <li><strong>Domicilio:</strong> {LEGAL.domicilio}</li>
        <li><strong>Contacto:</strong> <a className="underline" href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a></li>
      </ul>

      <H2>2. Qué datos tratamos y para qué</H2>
      <p><strong>a) Cuando nos escribes para pedir presupuesto</strong> (por correo o por mensaje en Instagram):</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Datos: nombre, correo o usuario de Instagram, el nombre de tu negocio y lo que nos cuentes en el mensaje.</li>
        <li>Para qué: contestarte, preparar el presupuesto y hacer seguimiento de tu petición.</li>
        <li>Base legal: aplicar a petición tuya medidas precontractuales (art. 6.1.b RGPD).</li>
        <li>Cuánto tiempo: mientras dure la conversación y, si no llegamos a trabajar juntos, como máximo 1 año.</li>
      </ul>
      <p><strong>b) Si eres cliente</strong> (área de clientes, servicios contratados y pagos):</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Datos: nombre, correo, contraseña (guardada cifrada), datos de tu negocio, la información y los archivos que
          subas para el servicio, y los datos de facturación. Los datos de la tarjeta los trata directamente el procesador
          de pagos; nosotros no los vemos.</li>
        <li>Para qué: darte acceso al área de clientes, prestar el servicio contratado, cobrarlo y facturarlo.</li>
        <li>Base legal: la ejecución del contrato (art. 6.1.b RGPD) y, para la facturación, el cumplimiento de obligaciones
          legales (art. 6.1.c RGPD).</li>
        <li>Cuánto tiempo: mientras seas cliente y, después, el tiempo que exijan las leyes fiscales y mercantiles (por
          ejemplo, 6 años para la documentación contable según el Código de Comercio).</li>
      </ul>
      <p><strong>c) Herramientas de inteligencia artificial.</strong> Algunas funciones del área de clientes (chat y creación
        de agentes) envían el texto que escribes a un proveedor de IA para generar la respuesta. No metas en ellas datos
        especialmente sensibles (salud, datos bancarios, etc.) que no hagan falta para el servicio.</p>
      <p>No tomamos decisiones automatizadas que produzcan efectos jurídicos sobre ti ni elaboramos perfiles con esos
        fines. No vendemos ni cedemos tus datos a terceros para su publicidad.</p>

      <H2>3. Quién más puede tratar tus datos</H2>
      <p>No comunicamos tus datos a terceros salvo obligación legal. Para que la web y los servicios funcionen, usamos
        proveedores que tratan datos por nuestra cuenta (encargados del tratamiento):</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Vercel</strong>: alojamiento de la web.</li>
        <li><strong>Supabase</strong>: base de datos y cuentas del área de clientes.</li>
        <li><strong>Stripe</strong>: cobros con tarjeta.</li>
        <li><strong>Anthropic</strong>: funciones de inteligencia artificial del área de clientes.</li>
        <li><strong>Google</strong> (Gmail): correo electrónico.</li>
      </ul>
      <p>
        Algunos de estos proveedores están en Estados Unidos o pueden acceder a los datos desde allí. Esas transferencias
        internacionales se hacen con las garantías del RGPD, como el Marco de Privacidad de Datos UE-EE. UU. o las cláusulas
        contractuales tipo de la Comisión Europea. Si nos escribes por Instagram, Meta trata además esos mensajes según su
        propia política de privacidad.
      </p>

      <H2>4. Tus derechos</H2>
      <p>
        Puedes pedir el acceso, la rectificación o la supresión de tus datos, la limitación del tratamiento, la
        portabilidad, y oponerte al tratamiento. Si algún tratamiento se basa en tu consentimiento, puedes retirarlo en
        cualquier momento. Para hacerlo, escribe a <a className="underline" href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
        {" "}indicando qué derecho quieres ejercer. Puede que te pidamos algo que acredite tu identidad.
      </p>
      <p>
        Si crees que no hemos tratado bien tus datos, puedes reclamar ante la Agencia Española de Protección de Datos
        (<a className="underline" href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>).
      </p>

      <H2>5. Menores</H2>
      <p>Los servicios de {LEGAL.marca} están dirigidos a empresas y profesionales. No tratamos a sabiendas datos de menores
        de 14 años.</p>

      <H2>6. Seguridad</H2>
      <p>Aplicamos medidas técnicas y organizativas razonables para proteger tus datos, como las conexiones cifradas
        (HTTPS), las contraseñas cifradas y el acceso restringido.</p>

      <H2>7. Cambios</H2>
      <p>Podemos actualizar esta política si cambian los servicios o la ley. La fecha de la última versión está arriba.</p>
    </LegalPage>
  );
}
