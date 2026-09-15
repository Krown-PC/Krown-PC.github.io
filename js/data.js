/* Krown PC's — contenido editable
   Edita este archivo para actualizar servicios, equipos, FAQ y portfolio.
*/

const SITE_CONFIG = {
  whatsappNumber: "56957374233",
  brand: "Krown PC's",
  slogan: "Potencia tu reino."
};

const SERVICES = [
  {
    name: "Armado de PC",
    description: "Armado y configuración de computadores según el objetivo, presupuesto y componentes del proyecto.",
    items: ["Compatibilidad de componentes", "Armado y cable management", "Configuración", "Pruebas finales"]
  },
  {
    name: "Mantenimiento Nivel 1",
    description: "Mantenimiento preventivo para conservar el equipo limpio, ordenado y funcionando correctamente.",
    items: ["Limpieza superficial", "Pasta térmica CPU", "Cable management", "Test de temperaturas"]
  },
  {
    name: "Mantenimiento Nivel 2",
    description: "Intervención completa para una limpieza profunda y una revisión más exhaustiva del equipo.",
    items: ["Desarme completo", "Limpieza profunda", "Pasta térmica CPU + GPU", "Test de estabilidad"]
  },
  {
    name: "Diagnóstico",
    description: "Revisión técnica del problema para determinar la causa y definir el camino de reparación.",
    detail: "Cuando corresponde, se entrega presupuesto antes de intervenir."
  },
  {
    name: "Windows / Optimización",
    description: "Instalación, configuración y optimización del sistema cuando el proyecto lo requiere.",
    items: ["Instalación de Windows", "Drivers", "Configuración", "Optimización"]
  },
  {
    name: "Personalización",
    description: "Modificaciones estéticas para darle al equipo una identidad propia sin sacrificar funcionalidad.",
    items: ["Pintura de gabinete", "Stickers", "Vinilos", "Elementos estéticos"]
  }
];

const EQUIPMENT = [];

const FAQ = [
  ["¿Dónde realizan los servicios?", "Los servicios técnicos están dirigidos principalmente a clientes de Santiago, Chile."],
  ["¿Trabajan con componentes que ya tengo?", "Sí. El armado puede realizarse utilizando componentes proporcionados por el cliente o adquiridos para el proyecto."],
  ["¿Puedo cotizar un PC personalizado?", "Sí. Cuéntanos qué necesitas, qué componentes tienes —si ya tienes alguno— y qué uso tendrá el equipo."],
  ["¿Qué incluye el Mantenimiento Nivel 1?", "Limpieza superficial, cambio de pasta térmica del CPU, cable management y test de temperaturas."],
  ["¿Qué incluye el Mantenimiento Nivel 2?", "Desarme completo, limpieza profunda, cambio de pastas térmicas de CPU y GPU, cable management, test de estabilidad y optimización y/o instalación de Windows."],
  ["¿Realizan diagnóstico antes de reparar?", "Sí. El objetivo es identificar el problema antes de definir reparaciones o reemplazos. Cuando corresponde, se entrega un presupuesto previo."],
  ["¿Puedo solicitar personalizaciones estéticas?", "Sí. Krown contempla pintura de gabinete, stickers, vinilos y otros elementos estéticos según el proyecto."],
  ["¿Los equipos disponibles tienen pruebas realizadas?", "El proceso de testing depende del tipo de equipo y proyecto. Cuando corresponde, los resultados pueden documentarse para el cliente."],
  ["¿Realizan envíos de computadores a regiones?", "Los envíos pueden evaluarse caso a caso. Consulta disponibilidad, embalaje y condiciones antes de comprar."],
  ["¿Cómo solicito una cotización?", "Escríbenos por WhatsApp con una breve descripción de lo que necesitas. Te orientamos sobre el servicio o proyecto adecuado."]
];

const WORKS = [
  {
    id: "001",
    type: "build",
    category: "armado",
    status: "sold",
    title: "KROWN BUILD #001",
    service: "Armado de PC",
    description: "PC gaming armado desde cero, configurado y probado antes de la entrega.",
    images: [
      "assets/trabajos/trabajo-001/principal.jpg",
      "assets/trabajos/trabajo-001/vista-01.jpg",
      "assets/trabajos/trabajo-001/vista-02.jpg",
      "assets/trabajos/trabajo-001/interior.jpg",
      "assets/trabajos/trabajo-001/detalle.jpg",
      "assets/trabajos/trabajo-001/trasera.jpg",
      "assets/trabajos/trabajo-001/cajas.jpg"
    ],
    components: [
      "CPU · Ryzen 5 5500",
      "GPU · Galax RTX 4060",
      "Motherboard · MSI A520M Pro",
      "RAM · 16 GB (2×8 GB) Hiksemi Future 3200 MHz",
      "Storage · Samsung PM9A1 512 GB + Kingston KC600 1 TB",
      "PSU · MSI MAG A650BN 650 W",
      "Case · Gamdias Atlas M3"
    ],
    process: [
      "Selección y compatibilidad de componentes",
      "Armado completo del equipo",
      "Cable management y organización interna",
      "Configuración del sistema",
      "Pruebas de estabilidad y temperaturas"
    ],
    testing: ["OCCT", "Cinebench", "FurMark", "HWiNFO"],
    result: "Equipo terminado, configurado y entregado al cliente. Proyecto vendido."
  }
];
