# Krown PC's — sitio estático

Primera versión funcional preparada para GitHub Pages.

## Estructura

- `index.html` — Home / showroom
- `trabajos.html` — Portafolio
- `css/style.css` — estilos
- `js/main.js` — contenido editable de servicios, equipos y FAQ + WhatsApp
- `js/trabajos.js` — contenido editable del portafolio
- `assets/` — fotografías, logo e iconos

## Configuración rápida

### 1. WhatsApp

En `js/main.js`, cambia:

```js
whatsappNumber: "569XXXXXXXX"
```

por el número real, sin `+`, espacios ni guiones.

En `js/trabajos.js`, reemplaza `569XXXXXXXX` por el mismo número si agregas trabajos.

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
