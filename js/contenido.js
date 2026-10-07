/**
 * KROWN — render de la sección "Contenido" (videos de redes).
 * La sección arranca oculta (atributo `hidden`) y solo se muestra si
 * js/contenido-data.js (KROWN_CONTENIDO) tiene al menos un video.
 */
(function () {
  "use strict";

  const PLATAFORMAS = {
    youtube: {
      nombre: "YouTube",
      icon: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z" fill="currentColor"/>',
    },
    instagram: {
      nombre: "Instagram",
      icon: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
    },
    tiktok: {
      nombre: "TikTok",
      icon: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.3 2.4 2 4.2 5 4.5"/>',
    },
  };

  const svg = (inner) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

  const esc = (str) =>
    String(str == null ? "" : str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function youtubeId(url) {
    const m = String(url).match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  }

  function miniaturaSrc(v) {
    if (v.miniatura) return v.miniatura;
    if (v.plataforma === "youtube") {
      const id = youtubeId(v.url);
      if (id) return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    }
    return null;
  }

  function tarjetaHTML(v, grande) {
    const p = PLATAFORMAS[v.plataforma] || PLATAFORMAS.youtube;
    const src = miniaturaSrc(v);
    const media = src
      ? `<img src="${esc(src)}" alt="" loading="lazy" decoding="async" />`
      : `<span class="video-fallback">${svg(p.icon)}</span>`;
    const meta = [v.fecha, v.duracion].filter(Boolean).map(esc).join(" · ");
    const desc = grande && v.descripcion ? `<p>${esc(v.descripcion)}</p>` : "";

    return `
      <a class="video-card${grande ? " video-card--grande" : ""} reveal is-visible" href="${esc(v.url)}" target="_blank" rel="noopener" aria-label="Ver en ${p.nombre}: ${esc(v.titulo)}">
        <span class="video-thumb">
          ${media}
          <span class="video-plataforma">${svg(p.icon)} ${p.nombre}</span>
          ${v.duracion ? `<span class="video-duracion">${esc(v.duracion)}</span>` : ""}
          <span class="video-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z"/></svg></span>
        </span>
        <span class="video-info">
          <span class="video-titulo">${esc(v.titulo)}</span>
          ${desc}
          ${meta ? `<span class="video-meta">${meta}</span>` : ""}
        </span>
      </a>`;
  }

  function redesHTML() {
    const cfg = typeof KROWN_CONFIG !== "undefined" ? KROWN_CONFIG : {};
    const links = [
      ["youtube", cfg.youtube, "Ver canal en YouTube"],
      ["instagram", cfg.instagram, "Seguir en Instagram"],
      ["tiktok", cfg.tiktok, "Seguir en TikTok"],
    ].filter(([, url]) => url);
    return links
      .map(
        ([key, url, label]) =>
          `<a class="btn btn-ghost" href="${esc(url)}" target="_blank" rel="noopener">${svg(PLATAFORMAS[key].icon)} ${label}</a>`
      )
      .join("");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const section = document.getElementById("contenido");
    const layout = document.getElementById("contenido-layout");
    if (!section || !layout || typeof KROWN_CONTENIDO === "undefined") return;
    if (!KROWN_CONTENIDO.length) return; // se mantiene oculta

    const items = KROWN_CONTENIDO.slice();
    const idxDest = Math.max(0, items.findIndex((v) => v.destacado));
    const destacado = items.splice(idxDest, 1)[0];
    const resto = items.slice(0, 3);

    layout.classList.toggle("contenido-layout--solo", resto.length === 0);
    layout.innerHTML =
      tarjetaHTML(destacado, true) +
      (resto.length ? `<div class="contenido-lista">${resto.map((v) => tarjetaHTML(v, false)).join("")}</div>` : "");

    const redes = document.getElementById("contenido-redes");
    const html = redesHTML();
    if (redes && html) {
      redes.innerHTML = html;
      redes.hidden = false;
    }

    section.hidden = false;
    document.querySelectorAll("[data-contenido-nav]").forEach((el) => (el.hidden = false));
  });
})();
