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
│   ├── servicios-data.js         → Servicios individuales y paquetes combinados (precios acá)
│   ├── servicios.js              → Renderiza Servicios + Paquetes a partir de servicios-data.js
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

## 2. Video del Hero

El Hero ya trae integrado el video real del armado RGB (720×720, formato cuadrado 1:1, sin audio, H.264) — no es un marcador de posición.

- `assets/video/hero-loop.mp4` — único formato usado, a propósito (ver nota abajo).
- `assets/video/hero-poster.jpg` — fotograma de respaldo mientras carga o si el navegador no puede reproducir video.

**Por qué el sitio usa solo MP4 (sin WebM):** la primera entrega traía también una versión `.webm` (VP9) como fuente preferida, porque pesa menos. Eso causó que el video se reprodujera bien en el teléfono pero se quedara pegado en algunos PC — algunos navegadores de escritorio (típicamente Chrome/Edge en Windows con ciertas combinaciones de tarjeta gráfica/drivers) tienen fallas conocidas decodificando VP9 por hardware que hacen que el video se cuelgue en vez de fallar limpiamente y pasar al MP4 de respaldo; el teléfono en cambio nunca llegaba a intentar el WebM (muchos navegadores móviles, sobre todo iPhone, no lo soportan y usan el MP4 directamente) — por eso ahí sí andaba. La solución fue dejar **solo MP4 (H.264)**, el formato con el soporte más parejo y confiable entre navegadores y dispositivos, sacrificando algo de peso de archivo a cambio de que se reproduzca igual en todos lados.

Si en el futuro quieres volver a agregar un WebM (por ejemplo, para ahorrar ancho de banda en visitas desde el teléfono), pruébalo primero en 2-3 computadores con navegadores distintos antes de dejarlo como fuente preferida — o dejarlo como *segunda* fuente (después del MP4 en el HTML) para que el navegador ya tenga el MP4 funcionando de base.

**Por qué el video no arrancaba solo en algunos PC (aunque se reproducía perfecto al darle "Reproducir" manualmente):** no era el archivo ni la caché — era el propio código del sitio. La primera versión pausaba el video automáticamente y le quitaba el autoplay si el sistema tenía activada la preferencia "reducir movimiento" (`prefers-reduced-motion`), pensado como gesto de accesibilidad. El problema es que esa preferencia se activa sola en muchos computadores sin que la persona la haya elegido a propósito — por ejemplo, el **Ahorro de batería de Windows/Edge** la activa automáticamente en notebooks, y "Efectos de animación" desactivado en Configuración de Windows también cuenta. El teléfono normalmente no la tiene activada, por eso ahí sí se reproducía. Se quitó ese auto-pausado: el video del Hero (silencioso, en loop, sin controles) ahora se reproduce siempre, sin depender de esa preferencia del sistema — las demás animaciones y transiciones del sitio sí la siguen respetando (ver "Accesibilidad y rendimiento" más abajo).

Para reemplazar el video por otro clip más adelante:

1. Comprime tu clip a **MP4 (H.264)**, sin audio, idealmente entre 5–10 segundos, bajo 5MB, en **1:1 (cuadrado)**.
2. Reemplaza `assets/video/hero-loop.mp4` con el mismo nombre.
3. Saca un nuevo fotograma de respaldo (evita el frame 0 si tu clip empieza con un fade a negro — mejor 1 segundo adentro):
   ```bash
   ffmpeg -ss 00:00:01.0 -i tu-video.mp4 -vframes 1 -q:v 3 -f image2 assets/video/hero-poster.jpg
   ```
4. **Importante — sube el número de versión en `index.html`:** el `<video>` del Hero referencia los archivos como `hero-loop.mp4?v=2` y `hero-poster.jpg?v=2`. Cada vez que reemplaces el video o el poster (manteniendo el mismo nombre de archivo), sube ese número (`?v=3`, `?v=4`, ...) en las dos líneas dentro de la sección `<div class="hero-media hud-frame reveal">`. Si no lo subes, es muy probable que quien ya visitó el sitio antes (tú mismo probando en tu PC, o un cliente que ya entró una vez) siga viendo la versión vieja del video — los navegadores guardan el archivo de video en caché de forma agresiva por su peso, y sin un cambio en la URL no vuelven a descargarlo aunque el archivo en el servidor ya sea otro.

No necesitas tocar nada más del HTML — el resto de los nombres de archivo ya están enlazados. Si más adelante quieres un formato distinto (por ejemplo 16:9), ajusta `aspect-ratio` en `.hero-media` dentro de `css/styles.css`.

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

## 6. Servicios, niveles y paquetes combinados

La sección **Servicios** (tarjetas individuales), la tabla comparativa de niveles y **Paquetes combinados** (packs con descuento) se generan desde `js/servicios-data.js` — no hay que tocar `index.html` para agregar, quitar o repreciar nada.

- **`KROWN_SERVICIOS`** — un objeto por servicio individual (`KROWN // BUILD`, `CLEAN`, `CORE`, `OS`, `CHECK`, `UPGRADE`, `CUSTOM`). Cada uno tiene `slug` (el nombre técnico tipo "KROWN // ALGO"), `nombre` (el nombre en español que ve el cliente), `descripcion`, y **o bien** `lista` (bullets simples, ej. Nivel 1/Nivel 2) **o bien** `tiers` (sub-opciones con su propio precio, ej. Upgrade Quick/Full o Custom Exterior/Complete/Vinyls) — nunca ambos a la vez.
- **`KROWN_PAQUETES`** — un objeto por paquete combinado (`KROWN // BOOT`, `PATCH`, `DEPLOY`, `RESKIN`, `RESKIN FULL`, `PRIME`), con `incluye` (lista de servicios que agrupa), `precio` y `ahorro` (el badge verde, ej. `"Ahorro ~9%"`).
- **Precios de lanzamiento vs. estables:** el sitio muestra **solo el precio de lanzamiento** en el campo `precio` de cada objeto, tal como se pidió para este lanzamiento. El precio "estable" (el que rige una vez pasado el período de lanzamiento) está documentado en un comentario junto a cada servicio/paquete dentro de `js/servicios-data.js`, pero no se muestra en ningún lado del sitio. Cuando llegue el momento de subir a precios estables, basta con reemplazar el valor de `precio` por el precio estable correspondiente (ya anotado en el comentario) — no hay que tocar el HTML ni el CSS.
- El botón de cada tarjeta usa `data-wa="servicio"` o `data-wa="paquete"` con el nombre como parámetro, así el mensaje de WhatsApp que se abre ya menciona el servicio o paquete exacto por el que preguntó el cliente.

## 7. Testimonios

Por diseño, el sitio **no trae testimonios inventados** y la sección permanece **oculta** hasta que agregues al menos uno real. Abre `js/testimonials-data.js` y agrega objetos al arreglo `KROWN_TESTIMONIOS`:

```js
const KROWN_TESTIMONIOS = [
  { estrellas: 5, texto: "Excelente trabajo, súper transparentes.", autor: "Cliente — Mantenimiento Nivel 2" },
];
```

Apenas el arreglo tenga un elemento, la franja aparece automáticamente en `index.html`.

## 8. Preguntas frecuentes

Edita `js/faq-data.js` — cada objeto es `{ pregunta, respuesta }`. El acordeón se genera y funciona solo.

## 9. Misión, visión y propuesta de valor

Quedó pendiente a propósito (tal como definimos). En `index.html`, dentro de la sección "Nosotros", hay un comentario `<!-- TODO: Bastian — agregar aquí misión, visión y propuesta de valor -->` donde puedes agregar ese contenido cuando esté listo.

## 10. Assets de marca (logo real)

Ya están integrados en el sitio:

- **`assets/logo/krown-icon.png`** — el ícono corona + K con fondo transparente, recortado ajustado. Se usa junto al texto "KROWN" en el header y el footer de ambas páginas (`<img class="logo-icon">`). Si quieres cambiar su tamaño, ajusta `.logo-icon { height: ... }` en `css/styles.css`.
- **`assets/logo/krown-lockup-dark.png`** — el lockup completo (ícono + wordmark + "Servicio y personalización de PC's") sobre fondo negro. Se usa como imagen de vista previa (`og:image`) cuando alguien comparte el link del sitio en WhatsApp, redes o el chat.
- **`assets/logo/krown-lockup-purple.png`** y **`krown-brand-sheet.png`** — quedan guardados como referencia/uso externo (redes sociales, papelería), no están enlazados en el sitio.
- **Favicon:** el set completo generado (favicon.ico + PNG en varios tamaños + ícono para Android/iOS) reemplaza el ícono de marcador de posición anterior. Estos archivos deben quedar en la **raíz** del sitio (junto a `index.html`), no dentro de `assets/`, para que funcionen igual en cualquier navegador y dispositivo.

**Nota de color:** el logo original traía un morado (`#5B3D91` aprox.) distinto al acento del sitio (`#6929B2`). Ya se unificó todo a `#6929B2`: se recoloreó el ícono, el favicon completo (todos los tamaños) y los lockups, así que ahora el morado del logo, los botones y todos los detalles del sitio son exactamente el mismo tono.

**Alineación del logo:** el ícono (corona + K) y el texto "KROWN" quedan centrados entre sí — el ícono se subió un poco y el texto se bajó un poco (`.logo-icon` y `.logo-text` en `css/styles.css`, cada uno con su propio `transform: translateY(...)`) hasta compensar que el dibujo del ícono (corona liviana arriba, K pesada abajo) no tiene su "centro visual" en el centro geométrico del archivo. Si más adelante cambias el ícono por otra versión, puede que necesites reajustar esos dos valores a ojo.

**Sin punto final:** el wordmark "KROWN" ya no lleva el punto morado decorativo al final (`.logo-dot`) en ningún lugar del sitio — se quitó del header y el footer de ambas páginas. El punto que aparece en el texto legal del footer ("© KROWN. Todos los derechos reservados.") es gramatical, no de marca, y se mantiene.

## 11. Tipografía (Technos, Bebas Neue, Oswald)

El sitio usa tres fuentes autoalojadas (no dependen de Google Fonts ni de ninguna conexión externa) — los archivos están en `assets/fonts/` y se cargan con `@font-face` al inicio de `css/styles.css`:

- **Technos** (`--font-brand`) — el nombre de marca "KROWN": se usa en el logo del header/footer y en el título grande del Hero (`<h1>KROWN</h1>`). El paquete que enviaste no traía archivo de licencia — confirma que tienes los derechos de uso de Technos para este sitio.
- **Bebas Neue** (`--font-display`) — subtítulos y encabezados: todos los `h1`-`h4` (salvo el "KROWN" del Hero), badges, botones, nav, tags y etiquetas. Licencia SIL Open Font License (uso libre), ver `assets/fonts/BebasNeue-OFL.txt`.
- **Oswald** (`--font-body`) — texto normal: párrafos, listas de specs, texto de las tarjetas. Se incluyeron los pesos Light/Regular/Medium/SemiBold/Bold. Licencia SIL Open Font License (uso libre), ver `assets/fonts/Oswald-OFL.txt`.

Si en algún momento quieres volver a cambiar alguna, solo edita las variables `--font-brand`, `--font-display` y `--font-body` dentro de `:root` en `css/styles.css` (y agrega los `@font-face` correspondientes si es una fuente nueva).

## 12. Probar el sitio localmente

No necesitas instalar nada. Desde la carpeta `krown/`:

```bash
python3 -m http.server 8000
```

Y abre `http://localhost:8000` en tu navegador.

## 13. Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (ej. `krown-web` o `tu-usuario.github.io` si quieres que sea tu dominio raíz).
2. Sube el **contenido de esta carpeta** (`index.html`, `css/`, `js/`, `assets/`, etc.) a la raíz del repositorio.
3. En el repositorio: **Settings → Pages → Source**, selecciona la rama `main` y la carpeta `/ (root)`.
4. GitHub te va a dar una URL tipo `https://tu-usuario.github.io/krown-web/`.

No hay build step ni dependencias — es HTML/CSS/JS puro, así que se publica tal cual.

## Accesibilidad y rendimiento

- **Teclado:** hay un link "Saltar al contenido" (visible solo al presionar Tab) para saltar la navegación, foco visible en morado en todos los botones/links/campos, y el slider Antes/Después es operable con las flechas ← → una vez enfocado.
- **`prefers-reduced-motion`:** todas las transiciones y animaciones de aparición se acortan si el visitante lo tiene activado en su sistema. El video del Hero es la excepción a propósito — ver nota en la sección 2 (Video del Hero) sobre por qué se sacó el auto-pausado.
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
15. **Legibilidad — tamaños de texto:** se subió el tamaño de prácticamente todo el texto del sitio (cuerpo, botones, nav, badges, tablas, tarjetas) entre 1 y 2px, manteniendo la proporción entre títulos y texto secundario. El body pasó de 16px a 18px base.
16. **Contraste de color (accesibilidad):** el gris usado para texto secundario (`--text-dim`) y el morado usado como acento de texto (`--purple-light`) estaban por debajo del mínimo recomendado (WCAG AA, 4.5:1) para texto normal sobre el fondo oscuro. Se aclararon ligeramente ambos tokens (mismo tono, un escalón más claro) — ahora todo el texto secundario y los links/acentos en morado pasan el estándar de contraste sin cambiar la identidad visual.
17. **Alineación del logo (revisión 2):** el ajuste anterior (alinear por la base) seguía viéndose descentrado porque las métricas verticales de la fuente Technos no coinciden con las del ícono. Se resolvió centrando ambos elementos y aplicando un pequeño desplazamiento independiente a cada uno (`.logo-icon` sube, `.logo-text` baja) hasta calzar visualmente — la solución robusta hubiera sido ajustar los metadatos de la fuente, pero un ajuste manual por CSS es más simple de mantener para un logo que no va a cambiar seguido.
18. **Wordmark sin punto:** se quitó el punto morado decorativo al final de "KROWN" en el header y footer de ambas páginas — el nombre de marca ahora aparece limpio en todas sus apariciones como texto solo (el punto del footer legal, que es gramatical, se mantuvo intacto).
19. **Servicios rebrandeados y data-driven:** la sección Servicios pasó de 7 tarjetas fijas en el HTML a generarse desde `js/servicios-data.js`, con la nomenclatura técnica propia de la marca ("KROWN // BUILD", "KROWN // CLEAN", etc.) como identificador secundario sobre el nombre del servicio en español — así se suma personalidad de marca sin sacrificar claridad para un cliente que no conoce la jerga. La tabla comparativa de niveles también se actualizó para usar "KROWN // CLEAN" y "KROWN // CORE" como encabezados de columna.
20. **Paquetes combinados (nuevo):** se agregó una sección "Paquetes combinados" bajo Servicios, con 6 packs (`KROWN // BOOT`, `PATCH`, `DEPLOY`, `RESKIN`, `RESKIN FULL`, `PRIME`) que agrupan servicios de la lista con un precio y un badge de ahorro (ej. "Ahorro ~9%"), reutilizando el mismo sistema de tarjetas de Servicios para mantener consistencia visual. Solo se muestran los precios de lanzamiento (ver sección 6) — los precios estables quedaron documentados en comentarios para activarlos más adelante sin rediseñar nada.
21. **Cohesión de marca en Portafolio y FAQ:** para que la nueva nomenclatura de Servicios no quedara aislada, se actualizaron también las etiquetas de cada trabajo en `trabajos.html` y en los "Trabajos destacados" de la portada (ej. "Mantenimiento Nivel 2 · KROWN // CORE") y las respuestas del FAQ que mencionan servicios específicos, además de sumar una pregunta nueva sobre los paquetes combinados. El objetivo fue que un visitante que llega por cualquier sección del sitio vea siempre el mismo vocabulario de marca.
22. **Video real del Hero integrado:** se reemplazó el video de marcador de posición por el clip real (armado RGB, 720×720, sin audio) y se generó un nuevo fotograma de respaldo.
23. **Video del Hero: WebM removido por incompatibilidad en PC:** una primera versión agregó también un `.webm` (VP9) como fuente preferida para aligerar peso. Eso reproducía bien en el teléfono pero se quedaba pegado en computadores — un problema conocido de decodificación VP9 por hardware en ciertos navegadores/GPUs de escritorio, que el teléfono nunca sufría porque ni siquiera intentaba esa fuente. Se resolvió dejando el Hero con **un solo formato, MP4 (H.264)**, el de soporte más parejo entre dispositivos — ver sección 2 para el detalle.
24. **Video del Hero: versión en la URL para evitar caché vieja:** además del cambio de formato, se agregó `?v=2` a las URLs del video y el poster del Hero. Como el archivo se llama igual que antes (`hero-loop.mp4`), un navegador que ya había cargado el sitio podía seguir mostrando la copia vieja guardada en caché aunque el archivo en el servidor ya fuera otro — típico de que "en mi PC sigue sin funcionar" mientras en un dispositivo que nunca había visitado el sitio sí funcionaba. Subir el número de versión fuerza al navegador a descargar el archivo de nuevo. Ver sección 2, punto 4, para subir ese número la próxima vez que cambies el video.
25. **Video del Hero: causa real encontrada — autoplay bloqueado por el propio código:** ni el formato ni la caché eran la causa final (el video ya se reproducía perfecto al iniciarlo manualmente). El sitio pausaba el video a propósito cuando el sistema tenía activada la preferencia de accesibilidad "reducir movimiento" — una preferencia que Windows/Edge activan solos en notebooks con Ahorro de batería, sin que el usuario la haya elegido pensando en videos. Se quitó ese auto-pausado específicamente para el video del Hero (ver sección 2 para el detalle completo); el resto de las animaciones del sitio sigue respetando esa preferencia con normalidad.
