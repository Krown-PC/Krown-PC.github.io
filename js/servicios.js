/**
 * KROWN — render dinámico de la sección Servicios (index.html)
 * Lee js/servicios-data.js y genera las tarjetas de servicios individuales
 * (#servicios-grid) y de paquetes combinados (#paquetes-grid).
 */
(function () {
  "use strict";

  const ICONS = {
    build: `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="15" x2="4" y2="15"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="15" x2="22" y2="15"/></svg>`,
    clean: `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    core: `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    os: `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    check: `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    upgrade: `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>`,
    custom: `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>`,
    paquete: `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
  };

  const ARROW = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;

  document.addEventListener("DOMContentLoaded", () => {
    const serviciosGrid = document.getElementById("servicios-grid");
    if (serviciosGrid && typeof KROWN_SERVICIOS !== "undefined") {
      serviciosGrid.innerHTML = KROWN_SERVICIOS.map(servicioCardHTML).join("");
      wireWaButtons(serviciosGrid);
    }

    const paquetesGrid = document.getElementById("paquetes-grid");
    if (paquetesGrid && typeof KROWN_PAQUETES !== "undefined") {
      paquetesGrid.innerHTML = KROWN_PAQUETES.map(paqueteCardHTML).join("");
      wireWaButtons(paquetesGrid);
    }
  });

  function waAttrs(s) {
    return s.waTipo === "diagnostico"
      ? `data-wa="diagnostico"`
      : `data-wa="servicio" data-wa-param="${s.waParam}"`;
  }

  function servicioCardHTML(s) {
    const lista = s.lista
      ? `<ul class="servicio-list">${s.lista.map((li) => `<li>${li}</li>`).join("")}</ul>`
      : "";

    const tiers = s.tiers
      ? `<ul class="servicio-tiers">${s.tiers
          .map(
            (t) => `
        <li class="servicio-tier">
          <span class="servicio-tier-name">${t.nombre}<span>${t.descripcion}</span></span>
          <span class="servicio-tier-price">${t.precio}</span>
        </li>`
          )
          .join("")}</ul>`
      : "";

    const precioTxt = s.esDesde ? `Desde ${s.precio}` : s.precio;

    return `
      <article class="card servicio-card reveal is-visible">
        <div class="servicio-icon">${ICONS[s.icono] || ""}</div>
        <span class="servicio-slug">${s.slug}</span>
        <h3>${s.nombre}</h3>
        <p>${s.descripcion}</p>
        ${lista}
        ${tiers}
        <div class="servicio-footer">
          <span class="servicio-price">${precioTxt}</span>
          <a href="#" class="servicio-link" ${waAttrs(s)}>
            ${s.ctaLabel}
            ${ARROW}
          </a>
        </div>
      </article>`;
  }

  function paqueteCardHTML(p) {
    const incluye = `<ul class="servicio-list">${p.incluye.map((li) => `<li>${li}</li>`).join("")}</ul>`;

    return `
      <article class="card servicio-card paquete-card reveal is-visible">
        <div class="paquete-head">
          <div class="servicio-icon">${ICONS.paquete}</div>
          <span class="paquete-ahorro">${p.ahorro}</span>
        </div>
        <span class="servicio-slug">${p.slug}</span>
        <h3>${p.nombre}</h3>
        ${incluye}
        <div class="servicio-footer">
          <span class="servicio-price">${p.precio}</span>
          <a href="#" class="servicio-link" data-wa="paquete" data-wa-param="${p.waParam}">
            Cotizar paquete
            ${ARROW}
          </a>
        </div>
      </article>`;
  }

  function wireWaButtons(scope) {
    scope.querySelectorAll("[data-wa]").forEach((el) => {
      const type = el.getAttribute("data-wa");
      const param = el.getAttribute("data-wa-param") || "";
      let message = "";
      if (typeof KROWN_WA_MESSAGES[type] === "function") message = KROWN_WA_MESSAGES[type](param);
      else message = KROWN_WA_MESSAGES[type] || KROWN_WA_MESSAGES.general;

      el.setAttribute("href", krownWaLink(message));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }
})();
