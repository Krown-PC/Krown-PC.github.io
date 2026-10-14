/**
 * KROWN — Google Analytics 4 con Consent Mode y aviso de cookies.
 *
 * - El ID se configura en js/config.js (gaMeasurementId). Si está vacío, no
 *   se carga nada y no aparece el aviso.
 * - Hasta que la persona acepte, las cookies de analítica están denegadas
 *   (Consent Mode): Google solo recibe pings anónimos, sin cookies.
 * - La elección se guarda en el navegador y se puede cambiar desde el link
 *   "Preferencias de cookies" del footer.
 * - Evento propio: "whatsapp_click" cada vez que alguien toca un botón de
 *   WhatsApp (con la sección y el texto del botón). Márcalo como "evento
 *   clave" en GA4 para verlo como conversión.
 */
(function () {
  "use strict";

  const ID = typeof KROWN_CONFIG !== "undefined" ? KROWN_CONFIG.gaMeasurementId : "";
  if (!ID) return;

  const KEY = "krown-cookies";
  const read = () => {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  };
  const save = (v) => {
    try { localStorage.setItem(KEY, v); } catch (e) { /* sin almacenamiento: se pregunta de nuevo */ }
  };

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  const estado = (granted) => ({
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
  });

  gtag("consent", "default", estado(read() === "granted"));
  gtag("js", new Date());
  gtag("config", ID);

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ID);
  document.head.appendChild(s);

  /* ---- Clics a WhatsApp ---- */
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a[href*='wa.me']");
    if (!a) return;
    const sec = a.closest("section, header, footer");
    gtag("event", "whatsapp_click", {
      link_text: (a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80),
      seccion: sec ? sec.id || sec.className.split(" ")[0] : "flotante",
      transport_type: "beacon",
    });
  });

  /* ---- Aviso de cookies ---- */
  let banner = null;

  function cerrar() {
    if (banner) { banner.remove(); banner = null; }
  }

  function elegir(granted) {
    save(granted ? "granted" : "denied");
    gtag("consent", "update", estado(granted));
    cerrar();
  }

  function mostrar() {
    if (banner) return;
    banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Aviso de cookies");
    banner.innerHTML =
      '<p>Usamos cookies de analítica para saber cuánta gente visita el sitio y mejorarlo. Tú eliges.</p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="btn btn-ghost btn-sm" data-cookie="denied">Rechazar</button>' +
      '<button type="button" class="btn btn-primary btn-sm" data-cookie="granted">Aceptar</button>' +
      "</div>";
    banner.querySelectorAll("[data-cookie]").forEach((b) =>
      b.addEventListener("click", () => elegir(b.getAttribute("data-cookie") === "granted"))
    );
    document.body.appendChild(banner);
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!read()) mostrar();
    document.querySelectorAll("[data-cookie-prefs]").forEach((el) =>
      el.addEventListener("click", mostrar)
    );
  });
})();
