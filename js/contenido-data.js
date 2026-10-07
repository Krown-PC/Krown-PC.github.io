/**
 * KROWN — contenido de redes (sección "Contenido" de index.html)
 *
 * La sección está OCULTA mientras este arreglo esté vacío. En cuanto agregues
 * el primer video aparece sola (junto con su link "Contenido" en el menú).
 *
 * Se muestran los primeros 4: el primero (o el que tenga `destacado: true`)
 * va grande, y los siguientes 3 en la lista lateral. Pon el más nuevo o el
 * mejor primero.
 *
 * Campos:
 *  - plataforma: "youtube" | "instagram" | "tiktok"
 *  - titulo: título corto del video
 *  - descripcion: (opcional) una línea; solo se muestra en el destacado
 *  - url: link directo al video/reel/post (se abre en una pestaña nueva)
 *  - miniatura: (recomendado) ruta a la imagen, ej. "assets/img/contenido/mi-video.jpg".
 *      · YouTube: si la omites, se usa la miniatura oficial del video automáticamente.
 *      · Instagram / TikTok: no se puede obtener sola — guarda una captura del video
 *        (si la omites se muestra una tarjeta de color con el ícono de la red).
 *      · Los videos verticales (Reels/Shorts/TikTok) se recortan al centro en formato 16:9.
 *  - duracion: (opcional) ej. "8:24"
 *  - fecha: (opcional) texto libre, ej. "Oct 2026"
 *  - destacado: (opcional) true para forzar que este sea el grande
 *
 * Ejemplo:
 *  {
 *    plataforma: "youtube",
 *    titulo: "Armamos un PC gamer desde cero",
 *    descripcion: "Selección de piezas, armado y pruebas de estabilidad.",
 *    url: "https://www.youtube.com/watch?v=XXXXXXXXXXX",
 *    duracion: "12:40",
 *    fecha: "Oct 2026",
 *  },
 *
 * Los links a tus perfiles (botones "Ver canal" al final de la sección) se
 * configuran en js/config.js (youtube, instagram, tiktok).
 */
const KROWN_CONTENIDO = [];
