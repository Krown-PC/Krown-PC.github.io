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
    id: "krown-nexus",
    nombre: "KROWN // NEXUS",
    estado: "vendido",
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
    imagen: { src: "assets/img/equipos/equipo-002-nexus.webp", alt: "KROWN // NEXUS: gabinete Gamdias con vidrio panorámico e iluminación RGB violeta" },
  },
  {
    id: "krown-vector",
    nombre: "KROWN // VECTOR",
    estado: "vendido",
    precio: null,
    specs: [
      "Intel Core i7-6700",
      "GTX 1060 6GB",
      "16GB DDR4 Ballistix",
      "MSI H110M PRO-VH PLUS",
      "SSD Crucial 120GB + SSD Kingston A400 1TB",
      "Fuente MSI MAG A650BN 650W",
      "Gabinete GameMax Storm BK",
      "Windows 11 instalado y activado",
    ],
    imagen: { src: "assets/img/equipos/equipo-001-vector.webp", alt: "KROWN // VECTOR: gabinete negro con frontal de malla e iluminación RGB violeta" },
  },
];
