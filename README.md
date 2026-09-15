# Krown — GitHub Pages

Sitio estático para Krown, pensado como showroom de servicios y portfolio de proyectos reales. No requiere backend, base de datos, CMS ni servidor.

## Estructura

- `index.html` — página principal
- `trabajos.html` — portfolio / casos reales
- `css/style.css` — estilos globales y responsive
- `js/main.js` — contenido y comportamiento de la página principal
- `js/trabajos.js` — datos y comportamiento del portfolio
- `assets/logo/` — logo y favicon
- `assets/backgrounds/` — video y poster del Hero
- `assets/trabajos/` — fotografías de proyectos terminados
- `assets/equipos/` — fotografías de equipos actualmente disponibles
- `robots.txt` / `sitemap.xml` — SEO básico para GitHub Pages

## Portfolio

La página de Trabajos usa un flujo de dos niveles:

1. **Exploración:** tarjetas visuales en una grilla para revisar varios proyectos rápidamente.
2. **Detalle:** al seleccionar un proyecto se abre una ficha completa con galería, miniaturas, navegación, especificaciones, proceso, testing, resultado y CTA a WhatsApp.

Cada proyecto admite hasta 10 fotografías. La primera imagen se utiliza como fotografía principal.

### Agregar un nuevo trabajo

1. Crea una carpeta `assets/trabajos/trabajo-XXX/`.
2. Sube las fotografías del proyecto.
3. Abre `js/trabajos.js`.
4. Agrega un nuevo objeto dentro de `WORKS`.
5. Usa rutas como `assets/trabajos/trabajo-002/foto-01.jpg`.
6. Para un build usa `type: "build"` e `images: [...]`.
7. Para mantenimiento con comparación usa `type: "maintenance"`, `before` y `after`.
8. Usa `status: "sold"` para un proyecto vendido o `status: "available"` cuando corresponda.

El sistema se encarga de la tarjeta, modal, galería, contador de fotografías, navegación y CTA contextual.

## Equipos disponibles

Los equipos para venta/showroom se gestionan por separado en `js/main.js` dentro de `EQUIPMENT`. Los proyectos terminados o vendidos pertenecen a `assets/trabajos/`.

## WhatsApp

El número está centralizado en `SITE_CONFIG` de `js/main.js` y `js/trabajos.js`.

## GitHub Pages

Configuración recomendada: `Deploy from a branch` → `main` → `/ (root)`.
