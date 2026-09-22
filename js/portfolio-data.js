/**
 * KROWN — datos del portafolio (trabajos.html)
 *
 * Para agregar un trabajo nuevo, copia un objeto de este arreglo y edítalo.
 * No se necesita tocar el HTML: la página se genera automáticamente a
 * partir de esta lista, incluyendo los botones de filtro por categoría.
 *
 * Campos:
 *  - id: identificador único (usar el siguiente número correlativo). Se usa
 *    también como ancla (ej. trabajos.html#proyecto-001), así que el Hero
 *    de la página principal puede enlazar directo a un caso específico.
 *  - filtro: { valor, etiqueta } — el valor agrupa el filtro (usa el MISMO
 *    valor para trabajos del mismo tipo general, ej. todos los
 *    mantenimientos comparten "mantenimiento" aunque sean Nivel 1 o 2).
 *    La etiqueta es el nombre del botón de filtro.
 *  - tag: etiqueta específica que se muestra en la tarjeta (puede ser más
 *    detallada que la del filtro, ej. "Mantenimiento Nivel 2").
 *  - titulo: nombre corto del caso ("Proyecto #00X")
 *  - descripcion: resumen del trabajo realizado (sin inventar resultados
 *    de testing que no hayan sido verificados realmente)
 *  - meta: lista corta de chips (qué se hizo)
 *  - antes / despues: { src, alt } de las fotos del slider
 */
const KROWN_PORTFOLIO = [
  {
    id: "001",
    filtro: { valor: "mantenimiento", etiqueta: "Mantenimiento" },
    tag: "Mantenimiento Nivel 2 · KROWN // CORE",
    titulo: "Proyecto #001",
    descripcion:
      "Equipo con acumulación de polvo importante y temperaturas elevadas bajo carga. Desarme completo, limpieza profunda, cambio de pasta térmica en CPU y GPU, cable management y test de estabilidad antes de la entrega.",
    meta: ["Desarme completo", "Pasta térmica CPU + GPU", "Cable management", "Test de estabilidad"],
    antes: { src: "assets/img/trabajos/proyecto-001-antes.svg", alt: "Equipo antes del mantenimiento nivel 2" },
    despues: { src: "assets/img/trabajos/proyecto-001-despues.svg", alt: "Equipo después del mantenimiento nivel 2" },
  },
  {
    id: "002",
    filtro: { valor: "armado", etiqueta: "Armado" },
    tag: "Armado a Medida · KROWN // BUILD",
    titulo: "Proyecto #002",
    descripcion:
      "Armado completo a partir de una selección de componentes definida junto al cliente, priorizando flujo de aire y silencio. Cable management desde cero y testing de temperaturas y estabilidad antes de la entrega.",
    meta: ["Armado completo", "Cable management", "Test de temperaturas", "Windows instalado"],
    antes: { src: "assets/img/trabajos/proyecto-002-antes.svg", alt: "Componentes antes del armado" },
    despues: { src: "assets/img/trabajos/proyecto-002-despues.svg", alt: "Equipo armado a medida, resultado final" },
  },
  {
    id: "003",
    filtro: { valor: "personalizacion", etiqueta: "Personalización" },
    tag: "Personalización Estética · KROWN // CUSTOM",
    titulo: "Proyecto #003",
    descripcion:
      "Gabinete repintado y personalizado con vinilos, sumado a una mantención general del equipo. El resultado combina identidad visual propia con un funcionamiento verificado.",
    meta: ["Pintura de gabinete", "Vinilos", "Mantenimiento incluido"],
    antes: { src: "assets/img/trabajos/proyecto-003-antes.svg", alt: "Gabinete antes de la personalización estética" },
    despues: { src: "assets/img/trabajos/proyecto-003-despues.svg", alt: "Gabinete después de la personalización estética" },
  },
  {
    id: "004",
    filtro: { valor: "mantenimiento", etiqueta: "Mantenimiento" },
    tag: "Mantenimiento Nivel 1 · KROWN // CLEAN",
    titulo: "Proyecto #004",
    descripcion:
      "Mantención preventiva sobre un equipo con temperaturas algo altas en uso prolongado. Limpieza superficial, cambio de pasta térmica del CPU, cable management y test de temperaturas.",
    meta: ["Limpieza superficial", "Pasta térmica CPU", "Cable management", "Test de temperaturas"],
    antes: { src: "assets/img/trabajos/proyecto-004-antes.svg", alt: "Equipo antes del mantenimiento nivel 1" },
    despues: { src: "assets/img/trabajos/proyecto-004-despues.svg", alt: "Equipo después del mantenimiento nivel 1" },
  },
  {
    id: "005",
    filtro: { valor: "diagnostico", etiqueta: "Diagnóstico" },
    tag: "Diagnóstico y Reparación · KROWN // CHECK",
    titulo: "Proyecto #005",
    descripcion:
      "Equipo con fallas intermitentes de encendido. Diagnóstico dirigido para aislar el componente responsable, presupuesto previo aprobado por el cliente y reemplazo del componente afectado.",
    meta: ["Diagnóstico dirigido", "Presupuesto previo", "Reemplazo de componente"],
    antes: { src: "assets/img/trabajos/proyecto-005-antes.svg", alt: "Equipo antes del diagnóstico" },
    despues: { src: "assets/img/trabajos/proyecto-005-despues.svg", alt: "Equipo después de la reparación" },
  },
  {
    id: "006",
    filtro: { valor: "armado", etiqueta: "Armado" },
    tag: "Armado a Medida · KROWN // BUILD",
    titulo: "Proyecto #006",
    descripcion:
      "Segundo armado a medida, enfocado en aprovechar componentes que el cliente ya tenía y sumar solo lo necesario para cumplir su objetivo de uso. Cable management y testing incluidos.",
    meta: ["Componentes del cliente", "Cable management", "Test de estabilidad"],
    antes: { src: "assets/img/trabajos/proyecto-006-antes.svg", alt: "Componentes antes del segundo armado a medida" },
    despues: { src: "assets/img/trabajos/proyecto-006-despues.svg", alt: "Resultado final del segundo armado a medida" },
  },
];
