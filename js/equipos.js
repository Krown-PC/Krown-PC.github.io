/**
 * KROWN — render dinámico de la sección Equipos (index.html)
 * Lee js/equipos-data.js y genera las tarjetas + el estado vacío elegante
 * cuando no hay ningún equipo con estado "disponible".
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("equipos-grid");
    if (!grid || typeof KROWN_EQUIPOS === "undefined") return;

    const disponibles = KROWN_EQUIPOS.filter((e) => e.estado === "disponible");
    const noDisponibles = KROWN_EQUIPOS.filter((e) => e.estado !== "disponible");

    let html = "";

    // Estado vacío elegante: se activa solo si no hay NINGÚN equipo disponible.
    if (disponibles.length === 0) {
      html += `
        <div class="equipos-empty reveal is-visible">
          <p class="lead">Actualmente no hay equipos disponibles.</p>
          <a href="#" class="btn btn-primary" data-wa="cotizarGeneral">¿Buscas un equipo similar? Cotiza tu proyecto →</a>
        </div>`;
    }

    KROWN_EQUIPOS.forEach((e) => {
      html += equipoCardHTML(e);
    });

    // La tarjeta "Arma el tuyo" siempre está presente: no es un equipo real,
    // es una invitación a cotizar cuando nada del catálogo calza.
    html += `
      <article class="card equipo-card reveal is-visible">
        <div class="equipo-media">
          <span class="equipo-status arma">Cotización a medida</span>
          <img src="assets/img/equipos/arma-el-tuyo.svg" alt="Arma tu equipo a medida" loading="lazy" decoding="async" />
        </div>
        <div class="equipo-body">
          <h3>¿No encontraste lo que buscabas?</h3>
          <p style="font-size:13.5px; margin-bottom:0;">Armamos un equipo pensado en tu presupuesto y uso — gaming, trabajo o ambos. Tú defines, nosotros ejecutamos y probamos antes de entregar.</p>
          <div class="equipo-footer">
            <span></span>
            <a href="#" class="btn btn-primary btn-sm" data-wa="cotizarGeneral">Cotizar mi equipo</a>
          </div>
        </div>
      </article>`;

    grid.innerHTML = html;
    wireWaButtons(grid);
  });

  function equipoCardHTML(e) {
    const muted = e.estado !== "disponible" ? " is-muted" : "";
    let statusBadge = "";
    let footer = "";

    if (e.estado === "disponible") {
      statusBadge = `<span class="equipo-status disponible"><span class="dot"></span> Disponible</span>`;
      const precioTxt = e.precio
        ? `${e.precio}`
        : `Consultar<br /><small>Precio vigente por WhatsApp</small>`;
      footer = `
        <span class="equipo-price">${precioTxt}</span>
        <a href="#" class="btn btn-primary btn-sm" data-wa="equipoDisponible" data-wa-param="${e.nombre}">Consultar</a>`;
    } else if (e.estado === "vendido") {
      statusBadge = `<span class="equipo-status entregado">Vendido</span>`;
      footer = `
        <span class="equipo-price" style="color:var(--text-dim); font-size:13px;">Ya no disponible</span>
        <a href="#" class="btn btn-ghost btn-sm" data-wa="equipoSimilar" data-wa-param="${e.nombre}">Uno similar</a>`;
    } else {
      statusBadge = `<span class="equipo-status entregado">No disponible</span>`;
      footer = `
        <span class="equipo-price" style="color:var(--text-dim); font-size:13px;">No disponible</span>
        <a href="#" class="btn btn-ghost btn-sm" data-wa="equipoSimilar" data-wa-param="${e.nombre}">Uno similar</a>`;
    }

    return `
      <article class="card equipo-card${muted} reveal is-visible" id="${e.id}">
        <div class="equipo-media">
          ${statusBadge}
          <img src="${e.imagen.src}" alt="${e.imagen.alt}" loading="lazy" decoding="async" />
        </div>
        <div class="equipo-body">
          <h3>${e.nombre}</h3>
          <ul class="equipo-specs">
            ${e.specs.map((s) => `<li>${s}</li>`).join("")}
          </ul>
          <div class="equipo-footer">
            ${footer}
          </div>
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
