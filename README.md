# KROWN — Sitio web

Sitio estático (HTML + CSS + JS, sin frameworks ni build step) listo para publicar en GitHub Pages.

## Estructura

```
krown/
├── index.html              → Página principal (todas las secciones)
├── trabajos.html            → Portafolio completo, con filtros por categoría
├── css/
│   └── styles.css           → Todo el sistema de diseño (colores, tipografía, componentes)
├── js/
│   ├── config.js            → Número de WhatsApp, correo, Instagram, mensajes contextuales
│   ├── main.js               → Nav, scroll-spy, FAQ, marquee, botones WhatsApp, hero video
│   ├── before-after.js       → Componente del slider Antes/Después (mouse, touch, teclado)
│   ├── portfolio-data.js     → Datos de cada trabajo del portafolio (edita/agrega acá)
│   └── portfolio.js          → Renderiza trabajos.html a partir de portfolio-data.js
├── assets/
│   ├── video/                → Video en loop del Hero + poster de respaldo
│   ├── img/equipos/          → Fotos de equipos disponibles / entregados
│   ├── img/trabajos/         → Fotos antes/después de cada proyecto
│   └── img/misc/             → Foto del banco de pruebas, del taller, imagen para redes
└── scripts/gen_placeholders.py → Regenera los placeholders SVG (no es necesario usarlo)
```

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

El Hero trae un video de marcador de posición (un loop genérico con la paleta de colores de la marca) para que el sitio se vea completo desde ya. Para poner tu video real:

1. Comprime tu clip a **MP4 (H.264)**, sin audio, idealmente entre 5–10 segundos, bajo 5MB.
2. Guarda una versión también en **WebM** si quieres el formato más liviano (opcional — el MP4 solo también funciona en todos los navegadores modernos).
3. Reemplaza estos archivos manteniendo el mismo nombre:
   - `assets/video/hero-loop.mp4`
   - `assets/video/hero-loop.webm` (opcional, bórralo del HTML si no lo generas)
   - `assets/video/hero-poster.jpg` — una captura de un fotograma del video (se muestra mientras carga o si el navegador no puede reproducirlo). Puedes sacarla con:
     ```bash
     ffmpeg -i tu-video.mp4 -vframes 1 -q:v 3 assets/video/hero-poster.jpg
     ```

No necesitas tocar el HTML — los nombres de archivo ya están enlazados.

## 3. Reemplazar fotos (equipos, trabajos, taller, testing)

Todas las imágenes reales van en `assets/img/...` reemplazando los placeholders (archivos `.svg` con un rótulo indicando qué foto va ahí). Puedes:

- **Opción simple:** reemplazar el archivo `.svg` por tu foto real con el mismo nombre pero extensión `.jpg`/`.png`, y actualizar el `src` correspondiente en el HTML (búscalo por el nombre del archivo).
- **Opción rápida:** exportar tu foto con el mismo nombre de archivo `.svg` no funciona (no son el mismo formato) — lo más simple es cambiar la extensión en el `src` del HTML al reemplazar.

Ubicaciones:
- `assets/img/equipos/` → fotos de equipos disponibles y entregados (index.html)
- `assets/img/trabajos/` → pares antes/después de cada proyecto (index.html y trabajos.html — están en `js/portfolio-data.js` para las de portafolio)
- `assets/img/misc/` → banco de pruebas (sección Proceso) y taller (sección Nosotros)

## 4. Agregar un trabajo nuevo al portafolio

Abre `js/portfolio-data.js` y copia un objeto del arreglo `KROWN_PORTFOLIO`, edítalo con los datos del nuevo trabajo y agrégale sus dos fotos (antes/después) a `assets/img/trabajos/`. No hay que tocar `trabajos.html` — los filtros y las tarjetas se generan solos a partir de esta lista.

## 5. Precio de equipos disponibles

En `index.html`, busca el comentario `<!-- TODO: reemplazar por el precio real vigente -->` dentro de la tarjeta "KROWN Vanguard" (o del equipo que corresponda) y reemplaza el texto "Consultar" por el precio, ej:

```html
<span class="equipo-price">$650.000 CLP<br /><small>IVA incluido</small></span>
```

Cuando un equipo deje de estar disponible, cambia su tarjeta al mismo patrón que la de "Proyecto entregado" (badge gris, sin precio).

## 6. Testimonios

Por diseño, el sitio **no trae testimonios inventados**. En `index.html`, busca la sección `<!-- ============ TESTIMONIOS ============ -->` y reemplaza cada bloque `[Testimonio real de un cliente...]` por una reseña real y el nombre del cliente. Mantén los bloques duplicados al final (marcados `aria-hidden="true"`) iguales a los primeros — son necesarios para que el loop del marquee se vea continuo.

## 7. Misión, visión y propuesta de valor

Quedó pendiente a propósito (tal como definimos). En `index.html`, dentro de la sección "Nosotros", hay un comentario `<!-- TODO: Bastian — agregar aquí misión, visión y propuesta de valor -->` donde puedes agregar ese contenido cuando esté listo.

## 8. Probar el sitio localmente

No necesitas instalar nada. Desde la carpeta `krown/`:

```bash
python3 -m http.server 8000
```

Y abre `http://localhost:8000` en tu navegador.

## 9. Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (ej. `krown-web` o `tu-usuario.github.io` si quieres que sea tu dominio raíz).
2. Sube el **contenido de esta carpeta** (`index.html`, `css/`, `js/`, `assets/`, etc.) a la raíz del repositorio.
3. En el repositorio: **Settings → Pages → Source**, selecciona la rama `main` y la carpeta `/ (root)`.
4. GitHub te va a dar una URL tipo `https://tu-usuario.github.io/krown-web/`.

No hay build step ni dependencias — es HTML/CSS/JS puro, así que se publica tal cual.

## Notas técnicas

- El antes/después funciona con mouse, touch y teclado (flechas ← → una vez enfocado el control).
- El video del Hero se pausa automáticamente si el visitante tiene activado "reducir movimiento" en su sistema.
- Todas las animaciones de aparición al hacer scroll tienen una red de seguridad: si por cualquier motivo no se disparan, el contenido igual se muestra a los 2 segundos — nunca queda nada oculto.
- El sitio no usa `localStorage` ni cookies, no tiene carrito ni checkout, y no requiere backend.
