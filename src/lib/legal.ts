// Datos del titular para las páginas legales (aviso legal, privacidad y cookies), en un solo sitio.
// Lo que va entre corchetes lo tiene que rellenar Mario antes de publicar: la LSSI (art. 10) exige
// identificar al titular con nombre, NIF y domicilio.

export const LEGAL = {
  /** Nombre y apellidos completos del titular (o razón social si se crea una sociedad). */
  titular: "Mario Sánchez [SEGUNDO APELLIDO]",
  /** NIF/DNI del titular. */
  nif: "[NIF]",
  /** Domicilio a efectos de notificaciones (el fiscal). */
  domicilio: "[CALLE Y NÚMERO], [CÓDIGO POSTAL] Talavera de la Reina (Toledo), España",
  email: "neuraxis.ia.global@gmail.com",
  marca: "Neuraxis IA",
  web: "https://neuraxis-web.vercel.app",
  actividad:
    "diseño y desarrollo de páginas web, automatización de procesos con inteligencia artificial (correo, chatbots, WhatsApp, CRM) y creación de contenido y marketing con IA",
  /** Fecha de la última revisión de los textos. */
  actualizado: "14 de noviembre de 2026",
};

/** true mientras quede algún dato entre corchetes: las páginas lo avisan arriba. */
export const LEGAL_PENDIENTE = Object.values(LEGAL).some((v) => /\[[^\]]+\]/.test(v));

export const LEGAL_LINKS = [
  { href: "/aviso-legal", label: "Aviso legal" },
  { href: "/privacidad", label: "Privacidad" },
  { href: "/cookies", label: "Cookies" },
];
