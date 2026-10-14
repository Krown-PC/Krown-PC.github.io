/**
 * KROWN — configuración central del sitio.
 * Edita estos valores y se propagan a todos los botones de WhatsApp,
 * enlaces de contacto y datos de contacto del footer.
 */
const KROWN_CONFIG = {
  // Número de WhatsApp en formato internacional sin '+' ni espacios.
  whatsappNumber: "56957374233",

  // Correo de contacto (se usa en el footer).
  email: "contacto@krown.cl",

  // Instagram (footer y sección Contenido). Dejar "" para ocultar.
  instagram: "https://www.instagram.com/krown.cl/",

  // Perfiles de contenido (opcionales). Aparecen como botones al final de la
  // sección "Contenido". Dejar "" para ocultar el botón de esa red.
  youtube: "https://www.youtube.com/@krown-cl",
  tiktok: "https://www.tiktok.com/@krown_cl",

  // ID de medición de Google Analytics 4 (empieza con "G-"). Dejar "" para
  // desactivar la analítica y el aviso de cookies.
  gaMeasurementId: "G-2ZL73TGWSQ",

  // Ciudad principal de servicio (se usa en microcopy).
  ciudad: "Santiago",
};

/**
 * Genera un link de WhatsApp con mensaje pre-cargado y contextualizado.
 * @param {string} message
 * @returns {string}
 */
function krownWaLink(message) {
  const base = `https://wa.me/${KROWN_CONFIG.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Mensajes contextuales reutilizados por botones de WhatsApp en todo el sitio.
 * Mantener este objeto es la forma más simple de editar el copy de los mensajes
 * sin tocar el HTML.
 */
const KROWN_WA_MESSAGES = {
  general:
    "Hola Krown, me gustaría recibir más información sobre sus servicios.",
  cotizarGeneral:
    "Hola Krown, quiero cotizar un servicio o equipo. ¿Me pueden ayudar?",
  servicio: (nombre) =>
    `Hola Krown, estoy interesado en el servicio de ${nombre}. Me gustaría obtener más información y un presupuesto.`,
  equipoDisponible: (nombre) =>
    `Hola Krown, estoy interesado en el equipo ${nombre} y quisiera consultar su disponibilidad.`,
  equipoSimilar: (nombre) =>
    `Hola Krown, vi el proyecto "${nombre}" en su portafolio. Me gustaría cotizar un equipo similar.`,
  trabajoSimilar: (nombre) =>
    `Hola Krown, vi el trabajo "${nombre}" en su sitio. Me gustaría cotizar algo similar para mi equipo.`,
  paquete: (nombre) =>
    `Hola Krown, me interesa el paquete ${nombre}. ¿Me pueden dar más detalles y coordinar?`,
  diagnostico:
    "Hola Krown, mi computador está presentando problemas y me gustaría agendar un diagnóstico.",
  testing:
    "Hola Krown, vi cómo prueban los equipos antes de entregarlos y me gustaría cotizar un servicio.",
};
