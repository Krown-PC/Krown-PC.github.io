/**
 * KROWN — render dinámico del portafolio (trabajos.html)
 * Construye los botones de filtro y las tarjetas a partir de KROWN_PORTFOLIO
 * (js/portfolio-data.js), para que agregar un trabajo nuevo no requiera tocar HTML.
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("portfolio-grid");
    const filtersEl = document.getElementById("portfolio-filters");
    const emptyEl = document.getElementById("portfolio-empty");
    if (!grid || !filtersEl || typeof KROWN_PORTFOLIO === "undefined") return;

    const categorias = [{ valor: "todos", etiqueta: "Todos" }];
    KROWN_PORTFOLIO.forEach((p) => {
      if (!categorias.some((c) => c.valor === p.categoria.valor)) {
        categorias.push(p.categoria);
      }
    });

    let activo = "todos";

    function svgFlecha() {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 7 3 12 8 17"/><polyline points="16 7 21 12 16 17"/></svg>';
    }

    function cardHTML(p) {
      return `
        <article class="trabajo-card reveal is-visible" data-categoria="${p.categoria.valor}">
          <div class="ba-slider">
            <span class="ba-label ba-label--before">Antes</span>
            <span class="ba-label ba-label--after">Después</span>
            <img class="ba-after" src="${p.despues.src}" alt="${p.despues.alt}" />
            <div class="ba-before-wrap">
              <img src="${p.antes.src}" alt="${p.antes.alt}" />
            </div>
            <div class="ba-handle">
              <div class="ba-handle-grip">${svgFlecha()}</div>
            </div>
          </div>
          <div class="trabajo-info">
            <span class="tag">${p.categoria.etiqueta}</span>
            <h3>${p.titulo}</h3>
            <p>${p.descripcion}</p>
            <div class="trabajo-meta">
              ${p.meta.map((m) => `<span>${m}</span>`).join("")}
            </div>
            <a href="#" class="btn btn-ghost btn-sm" data-wa="trabajoSimilar" data-wa-param="${p.titulo} — ${p.categoria.etiqueta}">Cotizar algo similar</a>
          </div>
        </article>`;
    }

    function renderFiltros() {
      filtersEl.innerHTML = categorias
        .map(
          (c) =>
            `<button class="filter-btn${c.valor === activo ? " is-active" : ""}" data-filtro="${c.valor}">${c.etiqueta}</button>`
        )
        .join("");

      filtersEl.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          activo = btn.getAttribute("data-filtro");
          renderFiltros();
          renderGrid();
        });
      });
    }

    function renderGrid() {
      const items =
        activo === "todos" ? KROWN_PORTFOLIO : KROWN_PORTFOLIO.filter((p) => p.categoria.valor === activo);

      grid.innerHTML = items.map(cardHTML).join("");
      emptyEl.classList.toggle("is-visible", items.length === 0);

      // Re-inicializa sliders y botones de WhatsApp para las tarjetas recién creadas
      if (window.KrownBeforeAfter) window.KrownBeforeAfter.init();
      wireWaButtons(grid);
    }

    function wireWaButtons(scope) {
      scope.querySelectorAll("[data-wa]").forEach((el) => {
        const type = el.getAttribute("data-wa");
        const param = el.getAttribute("data-wa-param") || "";
        let message = "";
        if (type === "trabajoSimilar") message = KROWN_WA_MESSAGES.trabajoSimilar(param);
        else if (typeof KROWN_WA_MESSAGES[type] === "function") message = KROWN_WA_MESSAGES[type](param);
        else message = KROWN_WA_MESSAGES[type] || KROWN_WA_MESSAGES.general;

        el.setAttribute("href", krownWaLink(message));
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
      });
    }

    renderFiltros();
    renderGrid();
  });
})();
