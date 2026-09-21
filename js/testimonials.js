/**
 * KROWN — render de la franja de testimonios.
 * La sección (#testimonios) arranca oculta en el HTML (atributo `hidden`).
 * Este script solo la muestra y la rellena si js/testimonials-data.js
 * (KROWN_TESTIMONIOS) tiene al menos un testimonio real cargado.
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const section = document.getElementById("testimonios");
    const track = document.getElementById("testimonios-track");
    if (!section || !track || typeof KROWN_TESTIMONIOS === "undefined") return;
    if (!KROWN_TESTIMONIOS.length) return; // se mantiene oculta

    const itemHTML = (t) => `
      <div class="testimonio-item">
        <div class="testimonio-stars">${"★".repeat(t.estrellas || 5)}</div>
        <p>${t.texto}</p>
        <div class="testimonio-autor">${t.autor}</div>
      </div>`;

    // Se duplica el set para que el loop del marquee se vea continuo.
    const originales = KROWN_TESTIMONIOS.map(itemHTML).join("");
    const duplicados = KROWN_TESTIMONIOS.map(itemHTML).join("");
    track.innerHTML = originales + duplicados;

    section.hidden = false;
  });
})();
