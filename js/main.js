/* Krown PC's — interacción de la página principal */

function escapeHTML(value = "") {
  return String(value).replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);
}

function whatsappUrl(message) {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const waText = {
  general: "Hola Krown PC's, quiero cotizar un proyecto y me gustaría recibir orientación."
};

function initWhatsApp() {
  document.querySelectorAll(".js-whatsapp").forEach(link => {
    const key = link.dataset.message || "general";
    const message = waText[key] || `Hola Krown PC's, estoy interesado en el servicio de ${key}. Me gustaría obtener información y un presupuesto.`;
    link.href = whatsappUrl(message);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

function renderServices() {
  const root = document.querySelector("#services-grid");
  if (!root) return;
  root.innerHTML = SERVICES.map((service, i) => `
    <article class="service-card">
      <div class="service-top">
        <span class="card-index">${String(i + 1).padStart(2, "0")}</span>
        <span class="service-arrow">↗</span>
      </div>
      <div>
        <h3>${escapeHTML(service.name)}</h3>
        <p>${escapeHTML(service.description)}</p>
        ${service.items
          ? `<ul>${service.items.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ul>`
          : `<p class="service-detail">${escapeHTML(service.detail || "")}</p>`}
      </div>
      <a class="card-link js-whatsapp" data-message="${escapeHTML(service.name)}" href="#">Cotizar servicio <span>→</span></a>
    </article>
  `).join("");
  initWhatsApp();
}

function renderEquipment() {
  const root = document.querySelector("#equipment-grid");
  if (!root) return;

  if (!EQUIPMENT.length) {
    root.innerHTML = `
      <div class="equipment-empty">
        <div class="empty-icon">+</div>
        <div>
          <span class="eyebrow">SHOWROOM / STOCK ACTUAL</span>
          <h3>No hay equipos publicados ahora.</h3>
          <p>Los equipos disponibles se incorporarán aquí cuando exista stock. Si buscas una configuración específica, podemos cotizarla contigo.</p>
        </div>
        <a class="button button-light js-whatsapp" data-message="general" href="#">Cotizar un equipo <span>↗</span></a>
      </div>`;
    initWhatsApp();
    return;
  }

  root.innerHTML = EQUIPMENT.map((item, i) => `
    <article class="equipment-card">
      <div class="equipment-media">
        ${item.image ? `<img loading="lazy" src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}">` : `<span>FOTOGRAFÍA / POR AGREGAR</span>`}
        <span class="equipment-number">${String(i + 1).padStart(2, "0")}</span>
      </div>
      <div class="equipment-info">
        <div class="equipment-meta">
          <span class="status ${item.status === "available" ? "available" : "sold"}">${item.status === "available" ? "DISPONIBLE" : "NO DISPONIBLE"}</span>
          ${item.price ? `<strong>${escapeHTML(item.price)}</strong>` : ""}
        </div>
        <h3>${escapeHTML(item.name)}</h3>
        <div class="specs">
          <span>CPU · ${escapeHTML(item.cpu || "—")}</span>
          <span>GPU · ${escapeHTML(item.gpu || "—")}</span>
          <span>RAM · ${escapeHTML(item.ram || "—")}</span>
          <span>STORAGE · ${escapeHTML(item.storage || "—")}</span>
        </div>
        <p>${escapeHTML(item.description || "")}</p>
        ${item.status === "available" ? `<a class="button button-primary js-whatsapp" data-message="${escapeHTML(item.name)}" href="#">Consultar disponibilidad <span>↗</span></a>` : ""}
      </div>
    </article>
  `).join("");
  initWhatsApp();
}

function renderFeaturedWork() {
  const root = document.querySelector("#featured-work");
  if (!root) return;
  const featured = WORKS.slice(0, 2);
  if (!featured.length) {
    root.innerHTML = `<div class="empty-state"><p class="eyebrow">PORTFOLIO</p><h3>Próximamente.</h3><p>Los trabajos reales aparecerán aquí a medida que se incorporen al portafolio.</p></div>`;
    return;
  }

  root.innerHTML = featured.map(work => {
    const image = work.images?.[0] || "";
    const specs = work.components?.slice(0, 4) || [];
    return `
      <article class="featured-card">
        <a class="featured-media" href="trabajos.html" aria-label="Ver ${escapeHTML(work.title)}">
          ${image ? `<img src="${escapeHTML(image)}" alt="${escapeHTML(work.title)} — fotografía principal" loading="lazy">` : ""}
          <span class="featured-overlay"><b>PROYECTO #${escapeHTML(work.id)}</b><strong>Ver caso ↗</strong></span>
        </a>
        <div class="featured-body">
          <div class="featured-meta"><span>${escapeHTML(work.service)}</span><span>${work.status === "sold" ? "PROYECTO VENDIDO" : "PROYECTO"}</span></div>
          <h3>${escapeHTML(work.title)}</h3>
          <p>${escapeHTML(work.description)}</p>
          <div class="work-tags">${specs.map(spec => `<span>${escapeHTML(spec)}</span>`).join("")}</div>
          <a class="text-link" href="trabajos.html">Ver proyecto completo <span>→</span></a>
        </div>
      </article>`;
  }).join("");
}

function renderFAQ() {
  const root = document.querySelector("#faq-list");
  if (!root) return;
  root.innerHTML = FAQ.map(([q, a]) => `
    <article class="faq-item">
      <button class="faq-question" type="button" aria-expanded="false">
        <span>${escapeHTML(q)}</span><span aria-hidden="true">+</span>
      </button>
      <div class="faq-answer"><div>${escapeHTML(a)}</div></div>
    </article>
  `).join("");
  root.querySelectorAll(".faq-question").forEach(btn => btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const open = item.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
    btn.lastElementChild.textContent = open ? "−" : "+";
  }));
}

function initHeroVideo() {
  const video = document.querySelector(".hero-video");
  if (!video) return;
  video.play().catch(() => {});
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
  initHeroVideo();
  renderServices();
  renderEquipment();
  renderFeaturedWork();
  renderFAQ();
  initWhatsApp();
});
