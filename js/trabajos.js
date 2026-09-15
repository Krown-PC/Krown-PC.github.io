/* Krown PC's — Portfolio / trabajos reales
   Edita únicamente WORKS para agregar nuevos proyectos.
*/

const WORKS = [
  {
    id: "001",
    type: "build",
    category: "armado",
    status: "sold",
    title: "KROWN BUILD #001",
    service: "Armado de PC",
    description: "PC gaming armado desde cero, configurado y probado antes de la entrega.",
    images: [
      "assets/trabajos/trabajo-001/principal.jpg",
      "assets/trabajos/trabajo-001/vista-01.jpg",
      "assets/trabajos/trabajo-001/vista-02.jpg",
      "assets/trabajos/trabajo-001/interior.jpg",
      "assets/trabajos/trabajo-001/detalle.jpg",
      "assets/trabajos/trabajo-001/trasera.jpg",
      "assets/trabajos/trabajo-001/cajas.jpg"
    ],
    components: [
      "CPU · Ryzen 5 5500",
      "GPU · Galax RTX 4060",
      "Motherboard · MSI A520M Pro",
      "RAM · 16 GB (2×8 GB) Hiksemi Future 3200 MHz",
      "Storage · Samsung PM9A1 512 GB + Kingston KC600 1 TB",
      "PSU · MSI MAG A650BN 650 W",
      "Case · Gamdias Atlas M3"
    ],
    process: [
      "Selección y compatibilidad de componentes",
      "Armado completo del equipo",
      "Cable management y organización interna",
      "Configuración del sistema",
      "Pruebas de estabilidad y temperaturas"
    ],
    testing: ["OCCT", "Cinebench", "FurMark", "HWiNFO"],
    result: "Equipo terminado, configurado y entregado al cliente. Proyecto vendido."
  }
];

const CATEGORIES = [
  ["all", "Todos"],
  ["armado", "Armado"],
  ["mantenimiento", "Mantenimiento"],
  ["optimizacion", "Optimización"],
  ["diagnostico", "Diagnóstico"],
  ["personalizacion", "Personalización"],
  ["upgrade", "Upgrade"]
];

const SITE_CONFIG = { whatsappNumber: "56957374233" };

function escapeHTML(value = "") {
  return String(value).replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);
}

function whatsappUrl(message) {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function typeLabel(work) {
  return {
    build: "BUILD / ARMADO",
    maintenance: "CASO / MANTENIMIENTO",
    upgrade: "UPGRADE / MEJORA",
    diagnostic: "CASO / DIAGNÓSTICO"
  }[work.type] || "PROYECTO";
}

function statusBadge(work) {
  if (work.status === "sold") return '<span class="work-status sold">PROYECTO VENDIDO</span>';
  if (work.status === "available") return '<span class="work-status available">DISPONIBLE</span>';
  return "";
}

function beforeAfter(work) {
  if (!work.before && !work.after) return "";
  return `
    <div class="work-media work-media-comparison">
      <div class="before-after" style="--split:50%">
        <div class="pane before" style="${work.before ? `background-image:url('${escapeHTML(work.before)}')` : ""}">${work.before ? "" : "ANTES"}</div>
        <div class="pane after" style="${work.after ? `background-image:url('${escapeHTML(work.after)}')` : ""}">${work.after ? "" : "DESPUÉS"}</div>
        <div class="divider" aria-hidden="true"></div>
        <div class="handle" aria-hidden="true">↔</div>
        <input type="range" min="0" max="100" value="50" aria-label="Comparar antes y después de ${escapeHTML(work.title)}">
      </div>
      <span class="media-label">ANTES / DESPUÉS</span>
    </div>`;
}

function buildShowcase(work) {
  const images = Array.isArray(work.images) ? work.images.filter(Boolean).slice(0, 10) : [];
  if (!images.length) return '<div class="work-media media-empty"><span>FOTOGRAFÍAS / POR AGREGAR</span></div>';

  const featured = images[0];
  return `
    <div class="work-media work-media-gallery" data-gallery="${escapeHTML(work.id)}">
      <button class="gallery-feature" type="button" data-gallery-feature="${escapeHTML(work.id)}" aria-label="Ampliar fotografía principal de ${escapeHTML(work.title)}">
        <img src="${escapeHTML(featured)}" alt="${escapeHTML(work.title)} — fotografía principal">
        <span class="gallery-expand" aria-hidden="true">↗</span>
      </button>
      <div class="gallery-thumbs" role="list" aria-label="Fotografías del proyecto ${escapeHTML(work.title)}">
        ${images.map((src, i) => `
          <button class="gallery-thumb ${i === 0 ? "active" : ""}" type="button" data-gallery-thumb="${escapeHTML(work.id)}" data-index="${i}" aria-label="Ver fotografía ${i + 1} de ${images.length}">
            <img src="${escapeHTML(src)}" alt="" loading="${i === 0 ? "eager" : "lazy"}">
          </button>
        `).join("")}
      </div>
      <div class="gallery-count">${images.length} FOTOGRAFÍAS</div>
    </div>`;
}

function renderMedia(work) {
  if (work.type === "maintenance" || work.before || work.after) return beforeAfter(work);
  return buildShowcase(work);
}

function renderDetails(work) {
  const components = Array.isArray(work.components) && work.components.length ? `
    <div class="work-detail-block">
      <span class="detail-label">ESPECIFICACIONES</span>
      <div class="component-grid">${work.components.map(x => `<span>${escapeHTML(x)}</span>`).join("")}</div>
    </div>` : "";

  const process = Array.isArray(work.process) && work.process.length ? `
    <div class="work-detail-block">
      <span class="detail-label">PROCESO</span>
      <ol class="work-process">${work.process.map(x => `<li>${escapeHTML(x)}</li>`).join("")}</ol>
    </div>` : "";

  const testing = Array.isArray(work.testing) && work.testing.length ? `
    <div class="work-detail-block">
      <span class="detail-label">TESTING</span>
      <div class="testing-list">${work.testing.map(x => `<span>${escapeHTML(x)}</span>`).join("")}</div>
    </div>` : "";

  const result = work.result ? `
    <div class="work-result">
      <span class="detail-label">RESULTADO</span>
      <p>${escapeHTML(work.result)}</p>
    </div>` : "";

  return `${components}${process}${testing}${result}`;
}

function renderFilters(active = "all") {
  const root = document.querySelector("#filter-bar");
  if (!root) return;
  root.innerHTML = CATEGORIES.map(([key, label]) => `<button class="filter-btn ${key === active ? "active" : ""}" type="button" data-filter="${key}">${label}</button>`).join("");
  root.querySelectorAll(".filter-btn").forEach(btn => btn.addEventListener("click", () => {
    renderFilters(btn.dataset.filter);
    renderWorks(btn.dataset.filter);
  }));
}

function renderWorks(filter = "all") {
  const root = document.querySelector("#portfolio-grid");
  if (!root) return;
  const list = filter === "all" ? WORKS : WORKS.filter(work => work.category === filter);

  if (!list.length) {
    root.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
      <p class="eyebrow">PORTFOLIO / CONTENIDO</p>
      <h3>${WORKS.length ? "No hay trabajos en esta categoría." : "Los primeros proyectos aparecerán aquí."}</h3>
      <p>${WORKS.length ? "Prueba otra categoría para ver trabajos publicados." : "Cada PC armado, mantenimiento, upgrade o personalización puede documentarse como un nuevo caso."}</p>
    </div>`;
    return;
  }

  root.innerHTML = list.map(work => `
    <article class="portfolio-card portfolio-card-${escapeHTML(work.type || "project")}">
      ${renderMedia(work)}
      <div class="portfolio-info">
        <div class="work-heading-line">
          <p class="eyebrow">PROYECTO #${escapeHTML(work.id)} / ${escapeHTML(typeLabel(work))}</p>
          ${statusBadge(work)}
        </div>
        <h3>${escapeHTML(work.title)}</h3>
        <p class="work-description">${escapeHTML(work.description)}</p>
        ${renderDetails(work)}
        <a class="text-link js-work-wa" data-work-title="${escapeHTML(work.title)}" href="#">Consultar por un trabajo similar <span>→</span></a>
      </div>
    </article>
  `).join("");

  root.querySelectorAll(".before-after input").forEach(input => input.addEventListener("input", event => {
    event.currentTarget.closest(".before-after").style.setProperty("--split", `${event.currentTarget.value}%`);
  }));

  root.querySelectorAll("[data-gallery-thumb]").forEach(thumb => thumb.addEventListener("click", () => {
    const id = thumb.dataset.galleryThumb;
    const index = Number(thumb.dataset.index);
    const work = WORKS.find(item => item.id === id);
    const images = work?.images || [];
    const gallery = thumb.closest(".work-media-gallery");
    const feature = gallery?.querySelector("[data-gallery-feature] img");
    if (!feature || !images[index]) return;
    feature.src = images[index];
    feature.alt = `${work.title} — fotografía ${index + 1}`;
    gallery.querySelectorAll(".gallery-thumb").forEach(item => item.classList.remove("active"));
    thumb.classList.add("active");
  }));

  root.querySelectorAll("[data-gallery-feature]").forEach(button => button.addEventListener("click", () => {
    const id = button.dataset.galleryFeature;
    const work = WORKS.find(item => item.id === id);
    const gallery = button.closest(".work-media-gallery");
    const active = gallery?.querySelector(".gallery-thumb.active");
    openLightbox(work, Number(active?.dataset.index || 0));
  }));

  root.querySelectorAll(".js-work-wa").forEach(link => {
    const title = link.dataset.workTitle;
    link.href = whatsappUrl(`Hola Krown PC's, quiero consultar por un trabajo similar al proyecto ${title}.`);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

function initLightbox() {
  if (document.querySelector("#portfolio-lightbox")) return;
  document.body.insertAdjacentHTML("beforeend", `
    <div class="portfolio-lightbox" id="portfolio-lightbox" hidden aria-hidden="true">
      <div class="lightbox-backdrop" data-lightbox-close></div>
      <div class="lightbox-dialog" role="dialog" aria-modal="true" aria-label="Galería de proyecto">
        <button class="lightbox-close" type="button" data-lightbox-close aria-label="Cerrar galería">×</button>
        <button class="lightbox-prev" type="button" data-lightbox-prev aria-label="Fotografía anterior">‹</button>
        <img class="lightbox-image" src="" alt="">
        <button class="lightbox-next" type="button" data-lightbox-next aria-label="Fotografía siguiente">›</button>
        <div class="lightbox-caption"><strong class="lightbox-title"></strong><span class="lightbox-index"></span></div>
      </div>
    </div>`);

  const box = document.querySelector("#portfolio-lightbox");
  box.addEventListener("click", event => {
    if (event.target.closest("[data-lightbox-close]")) closeLightbox();
    if (event.target.closest("[data-lightbox-prev]")) moveLightbox(-1);
    if (event.target.closest("[data-lightbox-next]")) moveLightbox(1);
  });
  document.addEventListener("keydown", event => {
    if (box.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") moveLightbox(-1);
    if (event.key === "ArrowRight") moveLightbox(1);
  });
}

let lightboxState = { work: null, index: 0 };

function updateLightbox() {
  const { work, index } = lightboxState;
  if (!work?.images?.length) return;
  const images = work.images;
  const safeIndex = (index + images.length) % images.length;
  lightboxState.index = safeIndex;
  const box = document.querySelector("#portfolio-lightbox");
  box.querySelector(".lightbox-image").src = images[safeIndex];
  box.querySelector(".lightbox-image").alt = `${work.title} — fotografía ${safeIndex + 1}`;
  box.querySelector(".lightbox-title").textContent = work.title;
  box.querySelector(".lightbox-index").textContent = `${safeIndex + 1} / ${images.length}`;
}

function openLightbox(work, index = 0) {
  if (!work?.images?.length) return;
  lightboxState = { work, index };
  const box = document.querySelector("#portfolio-lightbox");
  box.hidden = false;
  box.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  updateLightbox();
  box.querySelector(".lightbox-close")?.focus();
}

function closeLightbox() {
  const box = document.querySelector("#portfolio-lightbox");
  if (!box) return;
  box.hidden = true;
  box.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
}

function moveLightbox(delta) {
  lightboxState.index += delta;
  updateLightbox();
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#year")?.append(String(new Date().getFullYear()));
  initLightbox();

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  window.addEventListener("scroll", () => header?.classList.toggle("scrolled", window.scrollY > 18), { passive: true });

  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });

  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  }));

  nav?.querySelectorAll(".js-whatsapp").forEach(link => {
    link.href = whatsappUrl("Hola Krown PC's, quiero cotizar un proyecto y me gustaría recibir orientación.");
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  renderFilters();
  renderWorks();
});
