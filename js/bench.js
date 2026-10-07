/**
 * KROWN — galería del banco de pruebas (index.html, #proceso)
 * Lee js/bench-data.js. Si el arreglo está vacío no hace nada y queda la
 * imagen estática del HTML.
 */
(function () {
  "use strict";

  const esc = (str) =>
    String(str == null ? "" : str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("bench");
    if (!root || typeof KROWN_BENCH === "undefined" || !KROWN_BENCH.length) return;

    const items = KROWN_BENCH;
    root.innerHTML = `
      <div class="bench-stage" id="bench-stage">
        <img id="bench-img" alt="" decoding="async" />
      </div>
      <p class="bench-caption" id="bench-caption" aria-live="polite"></p>
      <div class="bench-thumbs" role="tablist" aria-label="Capturas del banco de pruebas">
        ${items
          .map(
            (it, i) => `
          <button type="button" class="bench-thumb" role="tab" data-i="${i}" aria-selected="false" aria-label="${esc(it.equipo)} — ${esc(it.prueba)}">
            <img src="${esc(it.src)}" alt="" loading="lazy" decoding="async" />
          </button>`
          )
          .join("")}
      </div>`;

    const img = root.querySelector("#bench-img");
    const cap = root.querySelector("#bench-caption");
    const thumbs = root.querySelectorAll(".bench-thumb");

    function show(i) {
      const it = items[i];
      img.src = it.src;
      img.alt = `${it.equipo}: ${it.prueba}`;
      cap.innerHTML = `<strong>${esc(it.equipo)}</strong> · ${esc(it.prueba)}${it.detalle ? `<span>${esc(it.detalle)}</span>` : ""}`;
      thumbs.forEach((t, k) => {
        t.classList.toggle("is-active", k === i);
        t.setAttribute("aria-selected", String(k === i));
      });
    }

    thumbs.forEach((t) => t.addEventListener("click", () => show(Number(t.dataset.i))));
    show(0);
  });
})();
