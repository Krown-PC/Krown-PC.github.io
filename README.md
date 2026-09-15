# Krown PC's — sitio estático

Sitio comercial estático compatible con GitHub Pages.

## Arquitectura
- `index.html` — página principal
- `trabajos.html` — portfolio/casos reales
- `css/style.css` — sistema visual y responsive
- `js/data.js` — **único archivo de contenido editable**
- `js/main.js` — interacción de inicio
- `js/trabajos.js` — filtros, casos y galerías
- `assets/logo/` — identidad y favicons
- `assets/backgrounds/` — video y poster del Hero
- `assets/trabajos/` — fotografías de proyectos

## Para agregar un trabajo
1. Crea una carpeta dentro de `assets/trabajos/`, por ejemplo `trabajo-002/`.
2. Sube las fotografías.
3. Agrega el objeto del proyecto al array `WORKS` en `js/data.js`.
4. No es necesario editar HTML ni CSS.

## Para agregar un equipo disponible
Edita `EQUIPMENT` en `js/data.js`.

## WhatsApp
El número se mantiene en `SITE_CONFIG` dentro de `js/data.js`.

## Hosting
GitHub Pages → `main` / `/ (root)`.
