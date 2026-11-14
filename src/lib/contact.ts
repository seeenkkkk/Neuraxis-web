// Datos de contacto de la landing, en un solo sitio.
const SUBJECT = encodeURIComponent("Presupuesto para mi negocio");
const BODY = encodeURIComponent(
  ["Hola, me gustaría pedir presupuesto.", "", "Mi negocio: ", "Lo que necesito: "].join("\n")
);

/** Abre el correo con el asunto ya escrito. */
export const CONTACT_HREF = `mailto:neuraxis.ia.global@gmail.com?subject=${SUBJECT}&body=${BODY}`;
/** Abre un mensaje directo de Instagram a @neuraxis.ia. */
export const IG_DM_HREF = "https://ig.me/m/neuraxis.ia";
export const IG_PROFILE_HREF = "https://www.instagram.com/neuraxis.ia";
export const IG_HANDLE = "@neuraxis.ia";
