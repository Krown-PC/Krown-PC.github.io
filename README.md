# Krown PC's — GitHub Pages

Sitio estático para Krown PC's. No requiere backend, base de datos, CMS ni servidor.

## Estructura

- `index.html` — página principal
- `trabajos.html` — portfolio / casos reales
- `css/style.css` — estilos globales
- `js/main.js` — contenido y comportamiento de la página principal
- `js/trabajos.js` — datos y renderizado del portfolio
- `assets/logo/` — logo y favicon
- `assets/backgrounds/` — video y poster del Hero
- `assets/trabajos/` — fotografías de proyectos terminados
- `assets/equipos/` — fotografías de equipos actualmente disponibles

## Agregar un nuevo trabajo

1. Crea una carpeta `assets/trabajos/trabajo-XXX/`.
2. Sube las fotografías del proyecto.
3. Abre `js/trabajos.js`.
4. Agrega un nuevo objeto dentro de `WORKS`.
5. Usa rutas relativas como `assets/trabajos/trabajo-002/foto-01.jpg`.
6. Para un build usa `type: "build"` e `images: [...]`.
7. Para mantenimiento con comparación usa `type: "maintenance"`, `before` y `after`.

El portfolio admite hasta 10 fotografías por proyecto. La galería incluye miniaturas, cambio de imagen principal y visor ampliado con navegación por teclado.

## Equipos disponibles

Los equipos para venta/showroom se gestionan por separado en `js/main.js` dentro de `EQUIPMENT`. Los proyectos vendidos o terminados pertenecen a `assets/trabajos/`.

## WhatsApp

El número se encuentra en `SITE_CONFIG` de `js/main.js` y `js/trabajos.js`.

## GitHub Pages

La configuración recomendada para este proyecto es `Deploy from a branch` → `main` → `/ (root)`.
