/**
 * KROWN — datos de la sección Servicios (index.html)
 *
 * Para editar nombres, descripciones o precios, edita estos arreglos — no
 * hay que tocar el HTML. La sección se renderiza sola (ver js/servicios.js).
 *
 * IMPORTANTE — precios: por ahora solo existen "precios de lanzamiento"
 * (los que se muestran en el sitio). Cuando llegue el momento de subir a
 * los precios "estables" (una vez que el negocio tenga clientela y
 * reputación construida), basta con reemplazar el valor de `precio` (y el
 * de cada tier, y el de cada paquete) por el nuevo monto — la estructura
 * no cambia.
 *
 * Campos de KROWN_SERVICIOS:
 *  - id: identificador único.
 *  - slug: nombre de marca ("KROWN // BUILD"), se muestra sobre el título.
 *  - nombre: nombre en lenguaje simple, el que la mayoría de los clientes
 *    va a reconocer y buscar (ej. "Armado de PC").
 *  - icono: referencia al ícono en ICONS dentro de js/servicios.js.
 *  - descripcion: bajada corta del servicio.
 *  - lista: bullets opcionales (o null) — para servicios de alcance fijo.
 *  - tiers: variantes con su propio precio (o null) — para servicios con
 *    más de un nivel (ej. Upgrade Quick/Full, Custom Exterior/Complete/Vinyls).
 *  - precio: precio de lanzamiento a mostrar en la tarjeta. Si el servicio
 *    tiene tiers, este debe ser el precio del tier más económico.
 *  - esDesde: true si el precio mostrado es un piso ("Desde $X") en vez de
 *    un precio fijo.
 *  - ctaLabel: texto del botón de cotización.
 *  - waTipo / waParam: cómo arma el mensaje de WhatsApp (ver js/config.js).
 *    Si waTipo es "diagnostico" se usa el mensaje fijo de diagnóstico y
 *    waParam se ignora.
 */
const KROWN_SERVICIOS = [
  {
    id: "build",
    slug: "KROWN // BUILD",
    nombre: "Armado de PC",
    icono: "build",
    descripcion: "Ensamblaje con componentes del cliente o comprados a pedido.",
    lista: null,
    tiers: null,
    precio: "$34.990",
    esDesde: true,
    ctaLabel: "Cotizar armado",
    waTipo: "servicio",
    waParam: "Armado de PC (KROWN // BUILD)",
  },
  {
    id: "clean",
    slug: "KROWN // CLEAN",
    nombre: "Mantención Nivel 1",
    icono: "clean",
    descripcion: "Mantención preventiva rápida para que tu equipo respire y se mantenga fresco.",
    lista: [
      "Limpieza superficial",
      "Cambio de pasta térmica del CPU",
      "Cable management",
      "Test de temperaturas",
    ],
    tiers: null,
    precio: "$29.990",
    esDesde: false,
    ctaLabel: "Cotizar Nivel 1",
    waTipo: "servicio",
    waParam: "Mantención Nivel 1 (KROWN // CLEAN)",
  },
  {
    id: "core",
    slug: "KROWN // CORE",
    nombre: "Mantención Nivel 2",
    icono: "core",
    descripcion: "Intervención completa para equipos con más uso o que necesitan un reseteo a fondo.",
    lista: [
      "Desarme completo y limpieza profunda",
      "Pasta térmica CPU + GPU con thermal pads",
      "Cable management",
      "Test de estabilidad",
    ],
    tiers: null,
    precio: "$44.990",
    esDesde: false,
    ctaLabel: "Cotizar Nivel 2",
    waTipo: "servicio",
    waParam: "Mantención Nivel 2 (KROWN // CORE)",
  },
  {
    id: "os",
    slug: "KROWN // OS",
    nombre: "Instalación y optimización de Windows",
    icono: "os",
    descripcion: "Instalación limpia, retención selectiva de archivos, drivers, actualización de BIOS y optimización.",
    lista: null,
    tiers: null,
    precio: "$29.990",
    esDesde: false,
    ctaLabel: "Cotizar instalación",
    waTipo: "servicio",
    waParam: "Instalación y optimización de Windows (KROWN // OS)",
  },
  {
    id: "check",
    slug: "KROWN // CHECK",
    nombre: "Diagnóstico de problemas",
    icono: "check",
    descripcion: "Visita en terreno, revisión de componentes, estabilidad, sonido y pruebas pertinentes.",
    lista: null,
    tiers: null,
    precio: "$19.990",
    esDesde: false,
    ctaLabel: "Agendar diagnóstico",
    waTipo: "diagnostico",
    waParam: null,
  },
  {
    id: "upgrade",
    slug: "KROWN // UPGRADE",
    nombre: "Instalación de componentes",
    icono: "upgrade",
    descripcion: "Suma o reemplaza piezas con una instalación limpia, ordenada y probada.",
    lista: null,
    tiers: [
      {
        nombre: "Quick",
        descripcion: "RAM, SSD, HDD, NVMe, GPU, ventiladores, etc.",
        precio: "$9.990",
      },
      {
        nombre: "Full",
        descripcion: "Disipador CPU, cambio de CPU (incluye pasta térmica), cambio de PSU.",
        precio: "$14.990",
      },
    ],
    precio: "$9.990",
    esDesde: true,
    ctaLabel: "Cotizar instalación",
    waTipo: "servicio",
    waParam: "Instalación de componentes (KROWN // UPGRADE)",
  },
  {
    id: "custom",
    slug: "KROWN // CUSTOM",
    nombre: "Personalización estética",
    icono: "custom",
    descripcion: "Pintura de gabinete, vinilos y stickers para que tu equipo se vea tan bien como funciona.",
    lista: null,
    tiers: [
      {
        nombre: "Exterior",
        descripcion: "Desarme, lijado, primer, pintura, sellante, pulido y rearmado del gabinete exterior.",
        precio: "$69.990",
      },
      {
        nombre: "Complete",
        descripcion: "Mismo proceso aplicado a interior y exterior del gabinete.",
        precio: "$99.990",
      },
      {
        nombre: "Vinyls",
        descripcion: "Impresión e instalación de vinilos o stickers personalizados.",
        precio: "desde $9.990",
      },
    ],
    precio: "$9.990",
    esDesde: true,
    ctaLabel: "Cotizar personalización",
    waTipo: "servicio",
    waParam: "Personalización estética (KROWN // CUSTOM)",
  },
];

/**
 * Campos de KROWN_PAQUETES:
 *  - incluye: lista de servicios que combina el paquete (en texto simple).
 *  - ahorro: texto del badge de ahorro vs. contratar por separado.
 */
const KROWN_PAQUETES = [
  {
    id: "boot",
    slug: "KROWN // BOOT",
    nombre: "Check + Clean",
    incluye: ["Diagnóstico completo (check)", "Mantención Nivel 1 (clean)"],
    precio: "$44.990",
    ahorro: "Ahorro ~9%",
    waParam: "KROWN // BOOT — Check + Clean",
  },
  {
    id: "patch",
    slug: "KROWN // PATCH",
    nombre: "Clean + OS",
    incluye: ["Mantención Nivel 1 (clean)", "Instalación y optimización de Windows (os)"],
    precio: "$54.990",
    ahorro: "Ahorro ~9%",
    waParam: "KROWN // PATCH — Clean + OS",
  },
  {
    id: "deploy",
    slug: "KROWN // DEPLOY",
    nombre: "Build + OS",
    incluye: ["Armado de PC (build)", "Instalación y optimización de Windows (os)"],
    precio: "$59.990",
    ahorro: "Ahorro ~9%",
    waParam: "KROWN // DEPLOY — Build + OS",
  },
  {
    id: "reskin",
    slug: "KROWN // RESKIN",
    nombre: "Custom Exterior + Core",
    incluye: ["Personalización exterior (custom)", "Mantención Nivel 2 (core)"],
    precio: "$104.990",
    ahorro: "Ahorro ~9%",
    waParam: "KROWN // RESKIN — Custom Exterior + Core",
  },
  {
    id: "reskin-full",
    slug: "KROWN // RESKIN FULL",
    nombre: "Custom Complete + Vinyls + Core",
    incluye: [
      "Personalización interior y exterior (custom complete)",
      "Vinilos personalizados (vinyls)",
      "Mantención Nivel 2 (core)",
    ],
    precio: "$139.990",
    ahorro: "Ahorro ~7%",
    waParam: "KROWN // RESKIN FULL — Custom Complete + Vinyls + Core",
  },
  {
    id: "prime",
    slug: "KROWN // PRIME",
    nombre: "Build + OS + Core",
    incluye: [
      "Armado de PC (build)",
      "Instalación y optimización de Windows (os)",
      "Mantención Nivel 2 (core)",
    ],
    precio: "$99.990",
    ahorro: "Ahorro ~10%",
    waParam: "KROWN // PRIME — Build + OS + Core",
  },
];
