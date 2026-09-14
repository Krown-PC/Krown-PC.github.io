# Krown PC's — sitio estático

Primera versión funcional preparada para GitHub Pages.

## Estructura

- `index.html` — Home / showroom
- `trabajos.html` — Portafolio
- `css/style.css` — estilos
- `js/main.js` — contenido editable de servicios, equipos y FAQ + WhatsApp
- `js/trabajos.js` — contenido editable del portafolio
- `assets/` — fotografías, logo, vídeo e iconos
- `assets/backgrounds/krown-hero.mp4` — vídeo del Hero, optimizado para web y sin audio
- `assets/backgrounds/krown-hero-poster.webp` — poster/fallback del vídeo

## Configuración rápida

### 1. WhatsApp

En `js/main.js` y `js/trabajos.js`, cambia:

```js
whatsappNumber: "569XXXXXXXX"
```

por el número real, sin `+`, espacios ni guiones. Mantén ambos valores iguales.

### 2. Equipos

En `js/main.js`, edita el array `EQUIPMENT`.

Los equipos no disponibles no deben incluirse como disponibles. El precio se muestra solamente cuando `status === "available"` y existe `price`.

### 3. Trabajos

En `js/trabajos.js`, agrega objetos al array `WORKS` con información real.

Las rutas de las fotografías deben apuntar a `assets/trabajos/...`.

### 4. Fotografías

No se incluyen fotografías ficticias. Los placeholders pueden reemplazarse directamente por fotografías reales.

### 5. Quiénes somos

Los campos de Misión, Visión y Propuesta de valor están deliberadamente como `Contenido por definir`, según el brief.

### 6. Testimonios

No se muestran testimonios ficticios. El componente de la Home está preparado como estado de espera y puede sustituirse por testimonios reales posteriormente.

## GitHub Pages

Sube el contenido de esta carpeta al repositorio y configura GitHub Pages para publicar desde la rama/carpeta elegida.

No requiere Node.js, PHP, backend, base de datos ni build step.

## Notas

- El sitio utiliza HTML5, CSS3 y JavaScript vanilla.
- No depende de librerías externas.
- Los enlaces internos son relativos para funcionar bajo una ruta de proyecto de GitHub Pages.
- Se incluye soporte para `prefers-reduced-motion`.


### 7. Vídeo del Hero

El vídeo del Hero está configurado para reproducción automática, sin sonido, en loop y con `playsinline`. Se utilizó una versión optimizada a 720×720 px / 30 fps / H.264 sin pista de audio para reducir el peso de descarga. El poster se muestra como fallback visual y cuando el usuario tiene activado `prefers-reduced-motion`.
