/**
 * KROWN — capturas reales del banco de pruebas (index.html, sección #proceso)
 *
 * Cada elemento aparece como una miniatura; al tocarla se ve grande arriba.
 * La primera es la que se muestra al cargar. Para agregar una captura, guarda
 * la imagen en assets/img/banco/ y suma un objeto al arreglo.
 *
 * Campos:
 *  - src: ruta de la imagen.
 *  - equipo: nombre del equipo o proyecto al que pertenece.
 *  - prueba: qué herramienta/prueba muestra (texto corto).
 *  - detalle: (opcional) una línea con lo que se ve en la captura.
 */
const KROWN_BENCH = [
  {
    src: "assets/img/banco/nexus-furmark-rtx4060.webp",
    equipo: "KROWN // NEXUS",
    prueba: "FurMark · RTX 4060",
    detalle: "Prueba de estrés de GPU durante 14 min al 100 % de uso: 72 °C de GPU y 85 °C de hotspot.",
  },
  {
    src: "assets/img/banco/nexus-occt-ryzen5500.webp",
    equipo: "KROWN // NEXUS",
    prueba: "OCCT · Ryzen 5 5500",
    detalle: "Prueba CPU + RAM de 10 min: sin errores detectados.",
  },
  {
    src: "assets/img/banco/nexus-crystaldiskinfo.webp",
    equipo: "KROWN // NEXUS",
    prueba: "CrystalDiskInfo · SSD",
    detalle: "Estado de salud del SSD Kingston KC600 1TB: 100 %.",
  },
  {
    src: "assets/img/banco/vector-furmark-cinebench.webp",
    equipo: "KROWN // VECTOR",
    prueba: "FurMark + Cinebench R23",
    detalle: "GTX 1060 6GB bajo estrés (76 °C) y CPU i7-6700 en Cinebench R23.",
  },
  {
    src: "assets/img/trabajos/proyecto-002-banco-antes.webp",
    equipo: "Proyecto #002",
    prueba: "HWiNFO · antes",
    detalle: "Temperatura en reposo antes de la mantención: 41 °C.",
  },
  {
    src: "assets/img/trabajos/proyecto-002-banco-despues.webp",
    equipo: "Proyecto #002",
    prueba: "HWiNFO · después",
    detalle: "Temperatura en reposo después de la mantención: 34 °C.",
  },
];
