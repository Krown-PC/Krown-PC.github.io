/* Krown PC's — Portfolio
   El contenido editable vive en js/data.js.
*/

const CATEGORIES = [
  ["all", "Todos"],
  ["armado", "Armados"],
  ["mantenimiento", "Mantenimiento"],
  ["optimizacion", "Optimización"],
  ["diagnostico", "Diagnóstico"],
  ["personalizacion", "Personalización"],
  ["upgrade", "Upgrades"]
];

let activeWork = null;
let activeImage = 0;
let lastFocusedElement = null;

function escapeHTML(value = "") {
  return String(value).replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);
}

function whatsappUrl(message) {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function typeLabel(work) {
  return ({ build: "BUILD / ARMADO", maintenance: "MANTENIMIENTO", upgrade: "UPGRADE", diagnostic: "DIAGNÓSTICO" })[work.type] || "PROYECTO";
}

function statusBadge(work) {
  if (work.status === "sold") return '<span class="work-status sold">PROYECTO VENDIDO</span>';
  if (work.status === "available") return '<span class="work-status available">DISPONIBLE</span>';
  return "";
}

function categoryCount(filter) {
  return filter === "all" ? WORKS.length : WORKS.filter(work => work.category === filter).length;
}

function renderFilters(active = "all") {
  const root = document.querySelector("#filter-bar");
  if (!root) return;

  root.innerHTML = `
    <div class="filter-list" role="group" aria-label="Filtrar trabajos">
      ${CATEGORIES.map(([key, label]) => `
        <button class="filter-btn ${key === active ? "active" : ""}" type="button" data-filter="${key}" ${categoryCount(key) === 0 ? "disabled" : ""}>
          <span>${label}</span><small>${categoryCount(key)}</small>
        </button>
      `).join("")}
    </div>
    <span class="portfolio-total">${categoryCount(active)} ${categoryCount(active) === 1 ? "proyecto" : "proyectos"}</span>
  `;

  root.querySelectorAll(".filter-btn:not(:disabled)").forEach(btn => btn.addEventListener("click", () => {
    renderFilters(btn.dataset.filter);
    renderWorks(btn.dataset.filter);
  }));
}

function renderCard(work) {
  const images = Array.isArray(work.images) ? work.images.filter(Boolean).slice(0, 10) : [];
  const featured = images[0] || "";
  const previewImages = images.slice(1, 4);
  const quickSpecs = Array.isArray(work.components) ? work.components.slice(0, 3) : [];

  return `
    <article class="work-card">
      <div class="work-card-media">
        ${featured ? `
          <button class="card-feature js-open-work" type="button" data-work-id="${escapeHTML(work.id)}" aria-label="Abrir ${escapeHTML(work.title)}">
            <img src="${escapeHTML(featured)}" alt="${escapeHTML(work.title)} — fotografía principal" loading="lazy">
          </button>
          ${previewImages.length ? `<div class="card-preview-grid">${previewImages.map((src, index) => `
            <button class="js-open-work" type="button" data-work-id="${escapeHTML(work.id)}" aria-label="Ver fotografía ${index + 2} de ${images.length}">
              <img src="${escapeHTML(src)}" alt="" loading="lazy">
            </button>`).join("")}</div>` : ""}` : `<div class="media-empty">FOTOGRAFÍAS / POR AGREGAR</div>`}
        <div class="work-card-topline"><span>${escapeHTML(typeLabel(work))}</span>${statusBadge(work)}</div>
        ${images.length ? `<span class="work-photo-count">${images.length} FOTOGRAFÍAS</span>` : ""}
        <button class="work-image-action js-open-work" type="button" data-work-id="${escapeHTML(work.id)}" aria-label="Ver caso completo de ${escapeHTML(work.title)}"><span>Ver caso</span><b>↗</b></button>
      </div>
      <div class="work-card-body">
        <div class="work-card-meta"><span>PROYECTO #${escapeHTML(work.id)}</span><span>${escapeHTML(work.service)}</span></div>
        <h3>${escapeHTML(work.title)}</h3>
        <p>${escapeHTML(work.description)}</p>
        ${quickSpecs.length ? `<div class="work-quick-specs">${quickSpecs.map(spec => `<span>${escapeHTML(spec)}</span>`).join("")}</div>` : ""}
        <button class="work-card-link js-open-work" type="button" data-work-id="${escapeHTML(work.id)}">Ver caso completo <span>→</span></button>
      </div>
    </article>`;
}

function renderWorks(filter = "all") {
  const root = document.querySelector("#portfolio-grid");
  if (!root) return;
  const list = filter === "all" ? WORKS : WORKS.filter(work => work.category === filter);

  if (!list.length) {
    root.innerHTML = `<div class="portfolio-empty"><span class="eyebrow">${escapeHTML(filter)}</span><h3>Aún no hay proyectos aquí.</h3><p>Esta categoría se irá completando con trabajos reales.</p></div>`;
    return;
  }

  root.innerHTML = list.map(renderCard).join("");
  root.querySelectorAll(".js-open-work").forEach(button => button.addEventListener("click", () => openWork(button.dataset.workId)));
}

function renderDetail(work) {
  const images = Array.isArray(work.images) ? work.images.filter(Boolean).slice(0, 10) : [];
  const components = Array.isArray(work.components) && work.components.length ? `
    <section class="modal-detail-section"><span class="detail-label">ESPECIFICACIONES</span><div class="component-grid">${work.components.map(item => `<div>${escapeHTML(item)}</div>`).join("")}</div></section>` : "";
  const process = Array.isArray(work.process) && work.process.length ? `
    <section class="modal-detail-section"><span class="detail-label">PROCESO</span><ol class="work-process">${work.process.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ol></section>` : "";
  const testing = Array.isArray(work.testing) && work.testing.length ? `
    <section class="modal-detail-section"><span class="detail-label">TESTING</span><div class="testing-list">${work.testing.map(item => `<span>${escapeHTML(item)}</span>`).join("")}</div></section>` : "";
  const result = work.result ? `<div class="work-result"><span class="detail-label">RESULTADO</span><p>${escapeHTML(work.result)}</p></div>` : "";

  const gallery = images.length ? `
    <div class="case-gallery">
      <div class="case-gallery-main">
        <img id="case-main-image" src="${escapeHTML(images[0])}" alt="${escapeHTML(work.title)} — fotografía 1">
        <button class="case-gallery-prev" type="button" data-case-prev aria-label="Fotografía anterior">‹</button>
        <button class="case-gallery-next" type="button" data-case-next aria-label="Fotografía siguiente">›</button>
        <button class="case-gallery-zoom" type="button" id="case-zoom" aria-label="Ampliar fotografía">↗</button>
        <span class="case-gallery-index" id="case-index">1 / ${images.length}</span>
      </div>
      <div class="case-gallery-thumbs" id="case-thumbs">
        ${images.map((src, index) => `<button class="case-thumb ${index === 0 ? "active" : ""}" type="button" data-case-index="${index}" aria-label="Ver fotografía ${index + 1}"><img src="${escapeHTML(src)}" alt="" loading="lazy"></button>`).join("")}
      </div>
    </div>` : `<div class="modal-no-image">FOTOGRAFÍAS / POR AGREGAR</div>`;

  return `
    <div class="case-modal-inner">
      <div class="case-modal-media">${gallery}</div>
      <div class="case-modal-info">
        <div class="case-kicker"><span>PROYECTO #${escapeHTML(work.id)}</span><span>${escapeHTML(typeLabel(work))}</span></div>
        ${statusBadge(work)}
        <h2>${escapeHTML(work.title)}</h2>
        <p class="case-description">${escapeHTML(work.description)}</p>
        ${components}${process}${testing}${result}
        <a class="button button-primary case-whatsapp" id="case-whatsapp" href="#" target="_blank" rel="noopener noreferrer">Consultar un proyecto similar <span>↗</span></a>
      </div>
    </div>`;
}

function initCaseModal() {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="case-modal" id="case-modal" hidden aria-hidden="true">
      <div class="case-modal-backdrop" data-close-case></div>
      <div class="case-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="case-modal-title">
        <button class="case-modal-close" type="button" data-close-case aria-label="Cerrar proyecto">×</button>
        <div id="case-modal-content"></div>
      </div>
    </div>`);

  const modal = document.querySelector("#case-modal");
  modal.addEventListener("click", event => {
    if (event.target.closest("[data-close-case]")) closeWork();
    if (event.target.closest("[data-case-index]")) setCaseImage(Number(event.target.closest("[data-case-index]").dataset.caseIndex));
    if (event.target.closest("[data-case-prev]")) setCaseImage(activeImage - 1);
    if (event.target.closest("[data-case-next]")) setCaseImage(activeImage + 1);
    if (event.target.closest("#case-zoom")) openImageViewer(activeWork, activeImage);
  });
}

function setCaseImage(index) {
  if (!activeWork?.images?.length) return;
  const images = activeWork.images.filter(Boolean).slice(0, 10);
  activeImage = (index + images.length) % images.length;
  const main = document.querySelector("#case-main-image");
  if (main) {
    main.src = images[activeImage];
    main.alt = `${activeWork.title} — fotografía ${activeImage + 1}`;
  }
  const counter = document.querySelector("#case-index");
  if (counter) counter.textContent = `${activeImage + 1} / ${images.length}`;
  document.querySelectorAll(".case-thumb").forEach((thumb, i) => thumb.classList.toggle("active", i === activeImage));
}

function openWork(id) {
  const work = WORKS.find(item => item.id === id);
  if (!work) return;
  activeWork = work;
  activeImage = 0;
  lastFocusedElement = document.activeElement;
  const modal = document.querySelector("#case-modal");
  const content = document.querySelector("#case-modal-content");
  content.innerHTML = renderDetail(work).replace("<h2>", `<h2 id="case-modal-title">`);
  const wa = content.querySelector("#case-whatsapp");
  if (wa) wa.href = whatsappUrl(`Hola Krown PC's, quiero consultar por un trabajo similar al proyecto ${work.title}.`);
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => modal.classList.add("is-visible"));
  modal.querySelector(".case-modal-close")?.focus();
}

function closeWork() {
  const modal = document.querySelector("#case-modal");
  if (!modal) return;
  modal.classList.remove("is-visible");
  setTimeout(() => {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    lastFocusedElement?.focus?.();
  }, 180);
}

function initImageViewer() {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="image-viewer" id="image-viewer" hidden aria-hidden="true">
      <div class="image-viewer-backdrop" data-close-viewer></div>
      <div class="image-viewer-dialog" role="dialog" aria-modal="true" aria-label="Fotografía ampliada">
        <button class="image-viewer-close" type="button" data-close-viewer aria-label="Cerrar fotografía">×</button>
        <button class="image-viewer-prev" type="button" data-viewer-prev aria-label="Fotografía anterior">‹</button>
        <img id="viewer-image" src="" alt="">
        <button class="image-viewer-next" type="button" data-viewer-next aria-label="Fotografía siguiente">›</button>
        <div class="image-viewer-caption"><strong id="viewer-title"></strong><span id="viewer-index"></span></div>
      </div>
    </div>`);

  const viewer = document.querySelector("#image-viewer");
  viewer.addEventListener("click", event => {
    if (event.target.closest("[data-close-viewer]")) closeImageViewer();
    if (event.target.closest("[data-viewer-prev]")) moveImageViewer(-1);
    if (event.target.closest("[data-viewer-next]")) moveImageViewer(1);
  });
}

function openImageViewer(work, index = 0) {
  if (!work?.images?.length) return;
  activeWork = work;
  activeImage = index;
  const viewer = document.querySelector("#image-viewer");
  viewer.hidden = false;
  viewer.setAttribute("aria-hidden", "false");
  document.body.classList.add("viewer-open");
  updateImageViewer();
  viewer.querySelector(".image-viewer-close")?.focus();
}

function updateImageViewer() {
  const images = activeWork?.images?.filter(Boolean).slice(0, 10) || [];
  if (!images.length) return;
  activeImage = (activeImage + images.length) % images.length;
  const image = document.querySelector("#viewer-image");
  image.src = images[activeImage];
  image.alt = `${activeWork.title} — fotografía ${activeImage + 1}`;
  document.querySelector("#viewer-title").textContent = activeWork.title;
  document.querySelector("#viewer-index").textContent = `${activeImage + 1} / ${images.length}`;
}

function moveImageViewer(delta) {
  activeImage += delta;
  updateImageViewer();
}

function closeImageViewer() {
  const viewer = document.querySelector("#image-viewer");
  if (!viewer) return;
  viewer.hidden = true;
  viewer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("viewer-open");
}

function initKeyboard() {
  document.addEventListener("keydown", event => {
    const modal = document.querySelector("#case-modal");
    const viewer = document.querySelector("#image-viewer");
    if (viewer && !viewer.hidden) {
      if (event.key === "Escape") closeImageViewer();
      if (event.key === "ArrowLeft") moveImageViewer(-1);
      if (event.key === "ArrowRight") moveImageViewer(1);
      return;
    }
    if (modal && !modal.hidden) {
      if (event.key === "Escape") closeWork();
      if (event.key === "ArrowLeft") setCaseImage(activeImage - 1);
      if (event.key === "ArrowRight") setCaseImage(activeImage + 1);
    }
  });
}

function initNavigation() {
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
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#year")?.append(String(new Date().getFullYear()));
  initNavigation();
  initCaseModal();
  initImageViewer();
  initKeyboard();
  document.querySelectorAll(".js-whatsapp").forEach(link => {
    link.href = whatsappUrl("Hola Krown PC's, quiero cotizar un proyecto y me gustaría recibir orientación.");
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
  renderFilters();
  renderWorks();
});
