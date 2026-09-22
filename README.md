# KROWN — Sitio web

Sitio estático (HTML + CSS + JS, sin frameworks ni build step) listo para publicar en GitHub Pages.

## Estructura

```
krown/
├── index.html                   → Página principal (todas las secciones)
├── trabajos.html                 → Portafolio completo, con filtros por categoría
├── css/
│   └── styles.css                → Todo el sistema de diseño (colores, tipografía, componentes)
├── js/
│   ├── config.js                 → Número de WhatsApp, correo, Instagram, mensajes contextuales
│   ├── main.js                   → Nav, scroll-spy, marquee, botones WhatsApp, hero video, footer
│   ├── before-after.js           → Componente del slider Antes/Después (mouse, touch, teclado)
│   ├── equipos-data.js           → Datos de cada equipo (edita/agrega/elimina acá)
│   ├── equipos.js                → Renderiza la sección Equipos a partir de equipos-data.js
│   ├── testimonials-data.js      → Testimonios reales (arranca vacío a propósito)
│   ├── testimonials.js           → Muestra la franja de testimonios solo si hay datos reales
│   ├── faq-data.js               → Preguntas y respuestas del acordeón FAQ
│   ├── faq.js                    → Renderiza y wirea el acordeón FAQ
│   ├── portfolio-data.js         → Datos de cada trabajo del portafolio (edita/agrega acá)
│   └── portfolio.js              → Renderiza trabajos.html a partir de portfolio-data.js
├── assets/
│   ├── logo/                      → Logo real de la marca (ver sección de assets de marca)
│   ├── fonts/                     → Technos, Bebas Neue y Oswald autoalojadas (ver sección de tipografía)
│   ├── video/                    → Video en loop del Hero + poster de respaldo
│   ├── img/equipos/               → Fotos de equipos disponibles / vendidos
│   ├── img/trabajos/               → Fotos antes/después de cada proyecto
│   └── img/misc/                  → Banco de pruebas, taller
├── favicon.ico, favicon-32x32.png, favicon-16x16.png,
│   apple-touch-icon.png, android-chrome-*.png, site.webmanifest
│                                  → Set completo de favicon (deben quedar en la RAÍZ del sitio)
└── scripts/gen_placeholders.py    → Regenera los placeholders SVG restantes (equipos/trabajos)
```

Toda la sección **Equipos**, la franja de **Testimonios**, el acordeón **FAQ** y el **Portafolio** completo se generan dinámicamente desde su archivo `*-data.js` correspondiente. Editar el sitio significa, en la gran mayoría de los casos, editar un arreglo de JavaScript — nunca HTML repetido.

## 1. Lo primero que debes cambiar

### Número de WhatsApp (obligatorio)
Abre `js/config.js` y reemplaza:
```js
whatsappNumber: "56900000000",
```
por tu número real, en formato internacional sin `+` ni espacios (ej: `56912345678`).

Todos los botones de "Cotizar", el flotante de WhatsApp y los links de cada servicio/equipo/trabajo usan este mismo número — no hay que tocar nada más.

### Correo e Instagram (opcional)
En el mismo archivo:
```js
email: "contacto@krown.cl",
instagram: "", // deja vacío para ocultar el link en el footer
```

### Mensajes de WhatsApp
También en `js/config.js`, dentro de `KROWN_WA_MESSAGES`. Puedes editar el texto de cada mensaje sin tocar el HTML.

## 2. Reemplazar el video del Hero

El Hero trae un video de marcador de posición (un loop genérico con la paleta de colores de la marca) para que el sitio se vea completo desde ya. El recuadro del Hero está ajustado en **formato cuadrado (1:1)**, así que tu video debe venir grabado o exportado en 1:1 para que se vea completo (sin recortes en los costados).

1. Comprime tu clip a **MP4 (H.264)**, sin audio, idealmente entre 5–10 segundos, bajo 5MB, en **1:1 (cuadrado)**.
2. Guarda una versión también en **WebM** si quieres el formato más liviano (opcional — el MP4 solo también funciona en todos los navegadores modernos).
3. Reemplaza estos archivos manteniendo el mismo nombre:
   - `assets/video/hero-loop.mp4`
   - `assets/video/hero-loop.webm` (opcional, bórralo del HTML si no lo generas)
   - `assets/video/hero-poster.jpg` — una captura de un fotograma del video (se muestra mientras carga o si el navegador no puede reproducirlo). Puedes sacarla con:
     ```bash
     ffmpeg -i tu-video.mp4 -vframes 1 -q:v 3 assets/video/hero-poster.jpg
     ```

No necesitas tocar el HTML — los nombres de archivo ya están enlazados. Si más adelante cambias de opinión y quieres un formato distinto (por ejemplo 16:9), ajusta `aspect-ratio` en `.hero-media` dentro de `css/styles.css`.

## 3. Reemplazar fotos (equipos, trabajos, taller, testing)

Todas las imágenes reales van en `assets/img/...` reemplazando los placeholders (archivos `.svg` con un rótulo indicando qué foto va ahí).

- **Fotos de equipos y trabajos:** cambia el `src` dentro de `js/equipos-data.js` o `js/portfolio-data.js` (ver puntos 4 y 5) para que apunte a tu foto real (ej. `assets/img/equipos/vanguard.jpg`).
- **Banco de pruebas y taller:** reemplaza el `src` directamente en `index.html` (son las dos únicas fotos que no vienen de un archivo de datos).

Ubicaciones:
- `assets/img/equipos/` → fotos de equipos disponibles y vendidos
- `assets/img/trabajos/` → pares antes/después de cada proyecto
- `assets/img/misc/` → favicon, banco de pruebas (sección Proceso), taller (sección Nosotros), imagen para redes

## 4. Agregar, editar o quitar un equipo

Abre `js/equipos-data.js` y edita el arreglo `KROWN_EQUIPOS`. No hay que tocar `index.html`.

- `estado` acepta `"disponible"`, `"vendido"` o `"no-disponible"`.
- Un equipo `"disponible"` muestra precio (o "Consultar" si `precio` es `null`) y botón de compra.
- Si **ningún** equipo tiene estado `"disponible"`, la sección muestra automáticamente el mensaje "Actualmente no hay equipos disponibles." — no hay que activarlo a mano, ni esconder nada.
- La tarjeta "¿No encontraste lo que buscabas?" siempre aparece al final, sin necesidad de agregarla a los datos.

## 5. Agregar un trabajo nuevo al portafolio

Abre `js/portfolio-data.js` y copia un objeto del arreglo `KROWN_PORTFOLIO`, edítalo con los datos del nuevo trabajo y agrégale sus dos fotos (antes/después) a `assets/img/trabajos/`. El campo `filtro.valor` agrupa el botón de filtro (usa el mismo valor para trabajos del mismo tipo general, ej. todos los mantenimientos comparten `"mantenimiento"` aunque sean Nivel 1 o 2); el campo `tag` es lo que se muestra en la tarjeta y puede ser más específico. No hay que tocar `trabajos.html` — los filtros y las tarjetas se generan solos.

Cada trabajo destacado en `index.html` puede enlazar a su versión completa en el portafolio vía `trabajos.html#proyecto-00X` (el botón "Ver proyecto") — el número debe coincidir con el `id` del objeto en `portfolio-data.js`.

## 6. Testimonios

Por diseño, el sitio **no trae testimonios inventados** y la sección permanece **oculta** hasta que agregues al menos uno real. Abre `js/testimonials-data.js` y agrega objetos al arreglo `KROWN_TESTIMONIOS`:

```js
const KROWN_TESTIMONIOS = [
  { estrellas: 5, texto: "Excelente trabajo, súper transparentes.", autor: "Cliente — Mantenimiento Nivel 2" },
];
```

Apenas el arreglo tenga un elemento, la franja aparece automáticamente en `index.html`.

## 7. Preguntas frecuentes

Edita `js/faq-data.js` — cada objeto es `{ pregunta, respuesta }`. El acordeón se genera y funciona solo.

## 8. Misión, visión y propuesta de valor

Quedó pendiente a propósito (tal como definimos). En `index.html`, dentro de la sección "Nosotros", hay un comentario `<!-- TODO: Bastian — agregar aquí misión, visión y propuesta de valor -->` donde puedes agregar ese contenido cuando esté listo.

## 9. Assets de marca (logo real)

Ya están integrados en el sitio:

- **`assets/logo/krown-icon.png`** — el ícono corona + K con fondo transparente, recortado ajustado. Se usa junto al texto "KROWN" en el header y el footer de ambas páginas (`<img class="logo-icon">`). Si quieres cambiar su tamaño, ajusta `.logo-icon { height: ... }` en `css/styles.css`.
- **`assets/logo/krown-lockup-dark.png`** — el lockup completo (ícono + wordmark + "Servicio y personalización de PC's") sobre fondo negro. Se usa como imagen de vista previa (`og:image`) cuando alguien comparte el link del sitio en WhatsApp, redes o el chat.
- **`assets/logo/krown-lockup-purple.png`** y **`krown-brand-sheet.png`** — quedan guardados como referencia/uso externo (redes sociales, papelería), no están enlazados en el sitio.
- **Favicon:** el set completo generado (favicon.ico + PNG en varios tamaños + ícono para Android/iOS) reemplaza el ícono de marcador de posición anterior. Estos archivos deben quedar en la **raíz** del sitio (junto a `index.html`), no dentro de `assets/`, para que funcionen igual en cualquier navegador y dispositivo.

**Nota de color:** el logo original traía un morado (`#5B3D91` aprox.) distinto al acento del sitio (`#6929B2`). Ya se unificó todo a `#6929B2`: se recoloreó el ícono, el favicon completo (todos los tamaños) y los lockups, así que ahora el morado del logo, los botones y todos los detalles del sitio son exactamente el mismo tono.

**Alineación del logo:** el ícono (corona + K) y el texto "KROWN" ahora quedan alineados por su base (`align-items: flex-end` en `.logo`, en `css/styles.css`), en vez de centrados verticalmente — así el ícono ya no se ve más abajo que el texto en el header ni en el footer.

## 10. Tipografía (Technos, Bebas Neue, Oswald)

El sitio usa tres fuentes autoalojadas (no dependen de Google Fonts ni de ninguna conexión externa) — los archivos están en `assets/fonts/` y se cargan con `@font-face` al inicio de `css/styles.css`:

- **Technos** (`--font-brand`) — el nombre de marca "KROWN": se usa en el logo del header/footer y en el título grande del Hero (`<h1>KROWN</h1>`). El paquete que enviaste no traía archivo de licencia — confirma que tienes los derechos de uso de Technos para este sitio.
- **Bebas Neue** (`--font-display`) — subtítulos y encabezados: todos los `h1`-`h4` (salvo el "KROWN" del Hero), badges, botones, nav, tags y etiquetas. Licencia SIL Open Font License (uso libre), ver `assets/fonts/BebasNeue-OFL.txt`.
- **Oswald** (`--font-body`) — texto normal: párrafos, listas de specs, texto de las tarjetas. Se incluyeron los pesos Light/Regular/Medium/SemiBold/Bold. Licencia SIL Open Font License (uso libre), ver `assets/fonts/Oswald-OFL.txt`.

Si en algún momento quieres volver a cambiar alguna, solo edita las variables `--font-brand`, `--font-display` y `--font-body` dentro de `:root` en `css/styles.css` (y agrega los `@font-face` correspondientes si es una fuente nueva).

## 11. Probar el sitio localmente

No necesitas instalar nada. Desde la carpeta `krown/`:

```bash
python3 -m http.server 8000
```

Y abre `http://localhost:8000` en tu navegador.

## 12. Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (ej. `krown-web` o `tu-usuario.github.io` si quieres que sea tu dominio raíz).
2. Sube el **contenido de esta carpeta** (`index.html`, `css/`, `js/`, `assets/`, etc.) a la raíz del repositorio.
3. En el repositorio: **Settings → Pages → Source**, selecciona la rama `main` y la carpeta `/ (root)`.
4. GitHub te va a dar una URL tipo `https://tu-usuario.github.io/krown-web/`.

No hay build step ni dependencias — es HTML/CSS/JS puro, así que se publica tal cual.

## Accesibilidad y rendimiento

- **Teclado:** hay un link "Saltar al contenido" (visible solo al presionar Tab) para saltar la navegación, foco visible en morado en todos los botones/links/campos, y el slider Antes/Después es operable con las flechas ← → una vez enfocado.
- **`prefers-reduced-motion`:** el video del Hero se pausa automáticamente y todas las transiciones se acortan si el visitante lo tiene activado en su sistema.
- **Red de seguridad en las animaciones de aparición:** si por cualquier motivo el efecto de aparición al hacer scroll no se dispara, el contenido igual se muestra a los 2 segundos — nunca queda nada oculto permanentemente.
- **Imágenes:** todas las fotos bajo el pliegue (equipos, trabajos, taller, banco de pruebas) usan `loading="lazy"` para no descargarlas hasta que el visitante se acerca a ellas.
- **Favicon propio:** favicon dedicado en la raíz del sitio (`favicon.ico` + PNG en varios tamaños), generado a partir del ícono real de la marca — distinto del lockup rectangular usado como imagen de vista previa al compartir el link.
- El sitio no usa `localStorage` ni cookies, no tiene carrito ni checkout, y no requiere backend.

## Notas de la auditoría UX/UI

Esta versión incorpora una revisión de experiencia de usuario sobre la primera entrega:

1. **Equipos, testimonios y FAQ pasaron a ser data-driven** (antes solo el portafolio lo era), siguiendo el mismo patrón: agregar/quitar contenido es editar un arreglo, nunca HTML repetido.
2. **Testimonios ahora se ocultan por completo** si no hay reseñas reales cargadas — antes se mostraban tarjetas con texto placeholder visible ("[Testimonio real...]"), lo cual se veía poco profesional en un sitio en vivo.
3. **Estado de equipos:** se unificó a "Disponible" / "Vendido" / "No disponible" y el estado vacío ("Actualmente no hay equipos disponibles") ahora se activa solo, sin intervención manual.
4. **Categorías del portafolio consolidadas:** los filtros ahora agrupan por tipo general de servicio (ej. "Mantenimiento" en vez de separar Nivel 1 / Nivel 2), evitando filtros con uno o dos trabajos cada uno mientras el portafolio es chico.
5. **Navegación:** se agregó "Inicio" explícito al menú (antes solo el logo cumplía esa función) para usuarios menos familiarizados con esa convención.
6. **Accesibilidad:** foco visible en toda la navegación por teclado, link para saltar al contenido, `aria-hidden` en íconos decorativos que acompañan texto visible, y roles/`aria-controls` en el acordeón FAQ.
7. **Proceso más concreto:** se agregó el flujo ARMAMOS → TESTEAMOS → VERIFICAMOS → ENTREGAMOS como resumen visual antes del detalle de herramientas de testing.
8. **Favicon dedicado:** antes se reutilizaba la imagen para redes sociales (rectangular) como ícono de pestaña, lo que se ve deformado. Ahora hay un favicon cuadrado propio.
9. **Conexión Home ↔ Portafolio:** cada trabajo destacado en la portada ahora tiene un botón "Ver proyecto" que lleva directo a su ficha completa en `trabajos.html`.
10. **Código:** se eliminó la duplicación del script de footer entre `index.html` y `trabajos.html` (ahora vive una sola vez en `main.js`).
11. **Logo real integrado:** se reemplazó el favicon y el ícono de marca (hechos como marcador de posición) por los archivos reales del logo, y se agregó el set completo de favicon para todos los dispositivos (antes solo había un ícono SVG simplificado).
12. **Tipografía de marca:** se reemplazaron las fuentes genéricas (Space Grotesk / Inter) por las fuentes reales de la marca — Technos para el nombre "KROWN", Bebas Neue para subtítulos/encabezados y Oswald para el texto normal — autoalojadas para no depender de Google Fonts.
13. **Alineación del logo:** se corrigió el ícono (corona + K) para que quede alineado por su base con el texto "KROWN" en vez de centrado, ya que el diseño del ícono (corona liviana arriba, letra K más pesada abajo) se veía descentrado al centrarlo verticalmente.
14. **Video del Hero en 1:1:** el recuadro del Hero se ajustó a formato cuadrado para calzar con el video real que se va a usar (antes era un rectángulo 16:10, pensado para el video de marcador de posición).
