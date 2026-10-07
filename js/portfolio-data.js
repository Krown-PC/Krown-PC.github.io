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
 *  - ratio: proporción de las fotos del slider, ej. "3 / 4" (vertical) o "4 / 3"
 *      (horizontal). Debe ser la misma para el antes y el después.
 *  - antes / despues: { src, alt } de las fotos del slider
 *  - capturas: (opcional) lista de { src, label } con capturas del banco de
 *      pruebas; se muestran como miniaturas bajo la descripción.
 */
const KROWN_PORTFOLIO = [
  {
    id: "001",
    filtro: { valor: "mantenimiento", etiqueta: "Mantención" },
    tag: "Mantención Nivel 2 · KROWN // CORE",
    titulo: "Proyecto #001",
    descripcion:
      "Mantención completa de un equipo con acumulación de polvo: se cambió la pasta térmica del CPU y de la GPU y se limpió todo el interior.",
    meta: ["Pasta térmica CPU + GPU", "Limpieza completa"],
    ratio: "3 / 4",
    antes: { src: "assets/img/trabajos/proyecto-001-antes.webp", alt: "Interior del equipo antes de la mantención nivel 2, con polvo y cables desordenados" },
    despues: { src: "assets/img/trabajos/proyecto-001-despues.webp", alt: "Interior del equipo después de la mantención nivel 2, limpio" },
  },
  {
    id: "002",
    filtro: { valor: "mantenimiento", etiqueta: "Mantención" },
    tag: "Mantención Nivel 1 · KROWN // CLEAN",
    titulo: "Proyecto #002",
    descripcion:
      "Mantención preventiva de un equipo que marcaba 41 °C en reposo. Se cambió la pasta térmica del CPU y se hizo una limpieza superficial: después del trabajo la temperatura en reposo bajó a 34 °C.",
    meta: ["Pasta térmica CPU", "Limpieza superficial", "41 °C → 34 °C en reposo"],
    ratio: "3 / 4",
    antes: { src: "assets/img/trabajos/proyecto-002-antes.webp", alt: "Equipo con polvo acumulado antes de la mantención nivel 1" },
    despues: { src: "assets/img/trabajos/proyecto-002-despues.webp", alt: "Equipo limpio después de la mantención nivel 1" },
    capturas: [
      { src: "assets/img/trabajos/proyecto-002-banco-antes.webp", label: "Antes: 41 °C en reposo" },
      { src: "assets/img/trabajos/proyecto-002-banco-despues.webp", label: "Después: 34 °C en reposo" },
    ],
  },
  {
    id: "003",
    filtro: { valor: "mantenimiento", etiqueta: "Mantención" },
    tag: "Mantención Nivel 1 · KROWN // CLEAN",
    titulo: "Proyecto #003",
    descripcion:
      "Mantención preventiva: se cambió la pasta térmica del CPU y se hizo una limpieza superficial del equipo.",
    meta: ["Pasta térmica CPU", "Limpieza superficial"],
    ratio: "1 / 1",
    antes: { src: "assets/img/trabajos/proyecto-003-antes.webp", alt: "Equipo con polvo acumulado antes de la mantención nivel 1" },
    despues: { src: "assets/img/trabajos/proyecto-003-despues.webp", alt: "Equipo limpio después de la mantención nivel 1" },
  },
  {
    id: "004",
    filtro: { valor: "armado", etiqueta: "Armado" },
    tag: "Cambio de gabinete y componentes · KROWN // DEPLOY",
    titulo: "Proyecto #004",
    descripcion:
      "Cambio de gabinete y renovación de componentes: se instaló refrigeración líquida y RAM nuevas, además de la instalación del sistema operativo.",
    meta: ["Gabinete nuevo", "Refrigeración líquida", "RAM nueva", "Instalación del sistema operativo"],
    ratio: "4 / 3",
    antes: { src: "assets/img/trabajos/proyecto-004-antes.webp", alt: "Equipo en su gabinete original antes del cambio de componentes" },
    despues: { src: "assets/img/trabajos/proyecto-004-despues.webp", alt: "Equipo en gabinete blanco nuevo con refrigeración líquida e iluminación RGB" },
  },
];
