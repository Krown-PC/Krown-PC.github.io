/**
 * KROWN — datos de equipos (index.html, sección #equipos)
 *
 * Para agregar, editar o eliminar un equipo, edita este arreglo — no hay
 * que tocar el HTML. La sección se renderiza sola a partir de esta lista.
 *
 * estado acepta: "disponible" | "vendido" | "no-disponible"
 *  - "disponible": muestra precio (o "Consultar" si precio es null) y el
 *    botón "Consultar disponibilidad".
 *  - "vendido" / "no-disponible": nunca muestran precio ni botón de compra,
 *    solo un botón "Uno similar" que cotiza un equipo equivalente.
 *
 * Si ningún equipo tiene estado "disponible", la sección muestra
 * automáticamente el mensaje "Actualmente no hay equipos disponibles."
 * (ver js/equipos.js) — no hay que activarlo a mano.
 */
const KROWN_EQUIPOS = [
  {
    id: "krown-vanguard",
    nombre: "KROWN Vanguard",
    estado: "disponible",
    // TODO: reemplazar por el precio real vigente, ej: "$650.000 CLP"
    precio: null,
    specs: [
      "AMD Ryzen 5 5500",
      "Galax RTX 4060",
      "16GB DDR4 Hiksemi",
      "MSI A520M Pro",
      "SSD Kingston KC600 1TB + NVMe Samsung PM9A1 512GB",
      "Fuente MSI MAG A650BN 650W",
      "Gabinete Gamdias Atlas M3M",
      "Windows 11 instalado y activado",
    ],
    imagen: { src: "assets/img/equipos/krown-vanguard.svg", alt: "KROWN Vanguard, equipo disponible" },
  },
  {
    id: "proyecto-i7-6700",
    nombre: "Proyecto entregado",
    estado: "vendido",
    precio: null,
    specs: ["Intel Core i7-6700", "Zotac GTX 1060 6GB"],
    imagen: { src: "assets/img/equipos/proyecto-i7-6700.svg", alt: "Proyecto vendido con procesador i7-6700 y GTX 1060" },
  },
];
