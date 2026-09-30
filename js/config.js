/**
 * KROWN — configuración central del sitio.
 * Edita estos valores y se propagan a todos los botones de WhatsApp,
 * enlaces de contacto y datos de contacto del footer.
 */
const KROWN_CONFIG = {
  // TODO: reemplazar por el número real en formato internacional sin '+' ni espacios.
  // Ejemplo Chile: 56 9 1234 5678  ->  "56912345678"
  whatsappNumber: "56957374233",

  // TODO: reemplazar por el correo real de contacto (opcional, se usa en el footer).
  email: "krown.cl@gmail.com",

  // TODO: reemplazar por el Instagram real (opcional, se usa en el footer). Dejar "" para ocultar.
  instagram: "@krown.cl",

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
