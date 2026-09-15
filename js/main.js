/* Krown — contenido editable */
const SITE_CONFIG = {
  whatsappNumber: "56957374233",
};

const SERVICES = [
  { name:"Armado de PC", description:"Armado profesional y configuración de computadores según las necesidades del proyecto.", detail:"Componentes del cliente o adquiridos para el proyecto." },
  { name:"Mantenimiento Nivel 1", description:"Limpieza y mantenimiento básico para conservar el equipo en buenas condiciones.", items:["Limpieza superficial","Pasta térmica CPU","Cable management","Test de temperaturas"] },
  { name:"Mantenimiento Nivel 2", description:"Intervención completa para una limpieza profunda y revisión más exhaustiva.", items:["Desarme completo","Limpieza profunda","Pasta térmica CPU","Pasta térmica GPU","Cable management","Test de estabilidad","Optimización / instalación de Windows"] },
  { name:"Windows / Optimización", description:"Instalación y optimización de Windows cuando el proyecto lo requiere." },
  { name:"Diagnóstico", description:"Revisión del problema y presupuesto previo cuando corresponda.", detail:"La reparación o reemplazo se define después de evaluar el caso." },
  { name:"Instalación de componentes", description:"Instalación de componentes, RGB y accesorios para completar o actualizar el equipo." },
  { name:"Personalización", description:"Modificaciones estéticas según el proyecto.", items:["Pintura de gabinete","Stickers","Vinilos","Otros elementos estéticos"] },
];

const EQUIPMENT = [
  // Agrega aquí equipos reales. Ejemplo:
  // { name:"Krown K-01", status:"available", price:"$XXX.XXX", cpu:"...", gpu:"...", ram:"...", storage:"...", image:"assets/equipos/k-01.webp", description:"..." }
];

const FAQ = [
  ["¿Dónde realizan los servicios?","Los servicios técnicos están dirigidos principalmente a clientes de Santiago, Chile."],
  ["¿Trabajan con componentes que ya tengo?","Sí. El armado puede realizarse utilizando componentes proporcionados por el cliente o adquiridos para el proyecto."],
  ["¿Puedo cotizar un PC personalizado?","Sí. Puedes contarnos qué necesitas y solicitar orientación para tu proyecto."],
  ["¿Realizan mantenimiento de tarjetas gráficas?","El Mantenimiento Nivel 2 contempla cambio de pasta térmica de la tarjeta gráfica."],
  ["¿Qué incluye el Mantenimiento Nivel 1?","Limpieza superficial, cambio de pasta térmica del CPU, cable management y test de temperaturas."],
  ["¿Qué incluye el Mantenimiento Nivel 2?","Desarme completo, limpieza profunda, cambio de pastas térmicas de CPU y GPU, cable management, test de estabilidad y optimización y/o instalación de Windows."],
  ["¿Realizan diagnóstico antes de reparar?","El diagnóstico puede incluir un presupuesto previo antes de realizar reparaciones o reemplazos."],
  ["¿Puedo solicitar personalizaciones estéticas?","Sí. Krown contempla pintura de gabinete, stickers, vinilos y otros elementos estéticos según el proyecto."],
  ["¿Los equipos disponibles tienen pruebas realizadas?","Los procesos de testing dependen del tipo de equipo y proyecto. Cuando corresponde, pueden documentarse resultados para el cliente."],
  ["¿Realizan envíos de computadores a regiones?","Los equipos eventualmente podrían enviarse a otras regiones de Chile. La disponibilidad de cada envío debe consultarse."],
];

const waText = {
  general: "Hola Krown, quiero cotizar un proyecto y me gustaría recibir orientación sobre la opción más adecuada para mi PC.",
  "Armado de PC": "Hola Krown, estoy interesado en el servicio de armado de PC. Me gustaría contarles qué equipo necesito y recibir orientación sobre componentes, compatibilidad y cotización.",
  "Mantenimiento Nivel 1": "Hola Krown, quiero cotizar un Mantenimiento Nivel 1 para mi PC. Me gustaría conocer la disponibilidad y el valor del servicio.",
  "Mantenimiento Nivel 2": "Hola Krown, quiero cotizar un Mantenimiento Nivel 2 para mi PC. Me gustaría conocer el alcance del servicio, disponibilidad y valor aproximado.",
  "Windows / Optimización": "Hola Krown, necesito ayuda con la instalación u optimización de Windows en mi PC. Me gustaría conocer el servicio y solicitar una cotización.",
  "Diagnóstico": "Hola Krown, mi PC presenta un problema y quisiera solicitar un diagnóstico. Me gustaría explicarles el caso y saber cómo funciona la evaluación y cotización.",
  "Instalación de componentes": "Hola Krown, necesito instalar un componente, RGB o accesorio en mi PC. Me gustaría consultar disponibilidad y cotizar el servicio.",
  "Personalización": "Hola Krown, estoy interesado en personalizar estéticamente mi PC. Me gustaría comentarles mi idea y recibir orientación sobre opciones y cotización."
};

function whatsappUrl(message) {
  const number = SITE_CONFIG.whatsappNumber;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function initWhatsApp() {
  document.querySelectorAll(".js-whatsapp").forEach(link => {
    const key = link.dataset.message || "general";
    let message = waText.general;
    if (key !== "general") message = waText[key] || `Hola Krown, estoy interesado en el servicio de ${key}. Me gustaría obtener información y una cotización.`;
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
      <div>
        <span class="card-index">${String(i+1).padStart(2,"0")}</span>
        <h3>${service.name}</h3>
        <p>${service.description}</p>
        ${service.items ? `<ul>${service.items.map(x => `<li>${x}</li>`).join("")}</ul>` : `<p>${service.detail || ""}</p>`}
      </div>
      <a class="card-link js-whatsapp" data-message="${service.name}" href="#">Cotizar este servicio <span>→</span></a>
    </article>
  `).join("");
  initWhatsApp();
}

function renderEquipment() {
  const root = document.querySelector("#equipment-grid");
  if (!root) return;
  if (!EQUIPMENT.length) {
    root.innerHTML = `
      <div class="empty-state">
        <p class="eyebrow">CATÁLOGO / ESTADO ACTUAL</p>
        <h3>Actualmente no hay equipos disponibles.</h3>
        <p>¿Buscas un equipo similar? Podemos revisar tu proyecto.</p>
        <a class="button button-primary js-whatsapp" data-message="general" href="#">Cotizar un equipo <span>↗</span></a>
      </div>`;
    initWhatsApp();
    return;
  }
  root.innerHTML = EQUIPMENT.map((item, i) => `
    <article class="equipment-card">
      <div class="equipment-media">${item.image ? `<img loading="lazy" src="${item.image}" alt="${item.name}">` : ""}</div>
      <div class="equipment-info">
        <span class="status ${item.status === "available" ? "available" : "sold"}">${item.status === "available" ? "DISPONIBLE" : item.status === "sold" ? "VENDIDO" : "NO DISPONIBLE"}</span>
        <h3>${item.name}</h3>
        <div class="specs"><span>CPU · ${item.cpu}</span><span>GPU · ${item.gpu}</span><span>RAM · ${item.ram}</span><span>STORAGE · ${item.storage}</span></div>
        ${item.status === "available" && item.price ? `<p><strong>${item.price}</strong></p><a class="button button-primary js-equipment-wa" data-equipment-index="${i}" href="#">Consultar disponibilidad <span>↗</span></a>` : `<p class="section-intro">Proyecto anterior. No disponible.</p>`}
      </div>
    </article>
  `).join("");
  root.querySelectorAll(".js-equipment-wa").forEach(link => {
    const item = EQUIPMENT[Number(link.dataset.equipmentIndex)];
    link.href = whatsappUrl(`Hola Krown, me interesa el equipo ${item.name}. Quisiera consultar su disponibilidad, especificaciones y precio.`);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

function renderFeaturedWork() {
  const root = document.querySelector("#featured-work");
  if (!root) return;
  root.innerHTML = `
    <article class="work-feature">
      <a class="work-feature-media" href="trabajos.html" aria-label="Ver Krown Build #001">
        <img src="assets/trabajos/trabajo-001/principal.jpg" alt="Krown Build #001 — PC gaming armado desde cero" loading="lazy">
        <span>PROYECTO #001 / ARMADO</span>
      </a>
      <div class="work-info">
        <p class="eyebrow">PROYECTO DESTACADO / BUILD #001</p>
        <h3>Krown Build #001</h3>
        <p>PC gaming armado desde cero, configurado y documentado como parte del portafolio de Krown.</p>
        <div class="work-tags"><span>RYZEN 5 5500</span><span>RTX 4060</span><span>16 GB</span><span>OCCT / CINEBENCH / FURMARK</span></div>
        <a class="text-link" href="trabajos.html">Ver proyecto completo <span>→</span></a>
      </div>
    </article>`;
}

function renderFAQ() {
  const root = document.querySelector("#faq-list");
  if (!root) return;
  root.innerHTML = FAQ.map(([q,a]) => `
    <article class="faq-item">
      <button class="faq-question" type="button" aria-expanded="false"><span>${q}</span><span>+</span></button>
      <div class="faq-answer"><div>${a}</div></div>
    </article>
  `).join("");
  root.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
      btn.lastElementChild.textContent = open ? "−" : "+";
    });
  });
}

function initHeroVideo() {
  const video = document.querySelector(".hero-video");
  if (!video) return;
  // Autoplay is intentionally muted and inline so the Hero video works on modern browsers.
  // Do not disable it for prefers-reduced-motion: the video is part of the visual Hero.
  video.play().catch(() => {});
}

function initNavigation() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  window.addEventListener("scroll", () => header?.classList.toggle("scrolled", window.scrollY > 18), { passive:true });
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });
  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded","false");
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
