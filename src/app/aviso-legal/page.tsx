import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { H2 } from "@/components/legal/LegalPage";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Aviso legal — Neuraxis IA",
  description: "Datos del titular y condiciones de uso de la web de Neuraxis IA.",
  alternates: { canonical: "/aviso-legal" },
};

export default function AvisoLegal() {
  return (
    <LegalPage title="Aviso legal">
      <H2>1. Datos del titular</H2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio
        electrónico (LSSI-CE), se informa de los datos del titular de esta web:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Titular:</strong> {LEGAL.titular}</li>
        <li><strong>Nombre comercial:</strong> {LEGAL.marca}</li>
        <li><strong>NIF:</strong> {LEGAL.nif}</li>
        <li><strong>Domicilio:</strong> {LEGAL.domicilio}</li>
        <li><strong>Correo electrónico:</strong> <a className="underline" href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a></li>
        <li><strong>Web:</strong> {LEGAL.web}</li>
        <li><strong>Actividad:</strong> {LEGAL.actividad}.</li>
      </ul>

      <H2>2. Objeto</H2>
      <p>
        Esta web informa sobre los servicios de {LEGAL.marca} y permite pedir presupuesto y acceder al área de clientes.
        Navegar por ella atribuye la condición de usuario e implica aceptar este aviso legal. Si no estás de acuerdo, no
        uses la web.
      </p>

      <H2>3. Uso de la web</H2>
      <p>
        Te comprometes a usar la web de forma lícita, sin dañar su funcionamiento ni el de terceros, sin introducir
        programas maliciosos y sin intentar acceder a zonas restringidas, como el área de clientes, sin autorización.
      </p>

      <H2>4. Propiedad intelectual e industrial</H2>
      <p>
        Los textos, diseños, logotipos, la mascota Nex, las imágenes y el código de esta web pertenecen a {LEGAL.titular} o
        se usan con permiso de sus titulares. No se pueden reproducir, distribuir ni transformar sin autorización
        expresa, salvo para uso personal y privado. Las marcas de terceros que se mencionan pertenecen a sus dueños.
      </p>

      <H2>5. Responsabilidad</H2>
      <p>
        Cuidamos que la información sea correcta y esté al día, pero no garantizamos que no haya errores ni que la web esté
        disponible en todo momento. {LEGAL.marca} no responde de los daños derivados de un mal uso de la web ni de los
        contenidos de webs de terceros a las que se enlace (por ejemplo, Instagram). Si detectas algo ilícito, escríbenos y
        lo retiraremos.
      </p>

      <H2>6. Presupuestos y contratación</H2>
      <p>
        La información de la web no es una oferta vinculante. Los servicios se contratan mediante presupuesto
        personalizado, y las condiciones concretas (precio, plazos y alcance) se acuerdan por escrito con cada cliente.
      </p>

      <H2>7. Datos personales y cookies</H2>
      <p>
        El tratamiento de tus datos se explica en la <Link className="underline" href="/privacidad">política de
        privacidad</Link>, y el uso de cookies, en la <Link className="underline" href="/cookies">política de cookies</Link>.
      </p>

      <H2>8. Ley aplicable</H2>
      <p>
        Este aviso legal se rige por la ley española. Para cualquier conflicto serán competentes los juzgados y tribunales
        que correspondan según la normativa aplicable; si eres consumidor, los de tu domicilio.
      </p>
    </LegalPage>
  );
}
