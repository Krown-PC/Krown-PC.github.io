const WORKS = [
  // Agrega aquí trabajos reales. No inventes fotografías, resultados ni datos.
  // {
  //   id: "001",
  //   title: "Nombre del proyecto",
  //   category: "mantenimiento",
  //   service: "Mantenimiento Nivel 2",
  //   description: "Descripción real del trabajo.",
  //   before: "assets/trabajos/proyecto-001-antes.webp",
  //   after: "assets/trabajos/proyecto-001-despues.webp"
  // }
];

const CATEGORIES = [
  ["all","Todos"],["armado","Armado"],["mantenimiento","Mantenimiento"],["optimizacion","Optimización"],["diagnostico","Diagnóstico"],["personalizacion","Personalización"]
];

function whatsappUrl(message) {
  return `https://wa.me/569XXXXXXXX?text=${encodeURIComponent(message)}`;
}

function beforeAfter(work) {
  if (!work.before && !work.after) return `<div class="work-media" aria-label="Placeholder para fotografías reales"></div>`;
  return `
    <div class="work-media">
      <div class="before-after" style="--split:50%">
        <div class="pane before" style="${work.before ? `background-image:url('${work.before}');background-size:cover;background-position:center` : ""}">ANTES</div>
        <div class="pane after" style="${work.after ? `background-image:url('${work.after}');background-size:cover;background-position:center` : ""}">DESPUÉS</div>
        <div class="divider"></div><div class="handle">↔</div>
        <input type="range" min="0" max="100" value="50" aria-label="Comparar antes y después">
      </div>
    </div>`;
}

function renderFilters(active = "all") {
  const root = document.querySelector("#filter-bar");
  root.innerHTML = CATEGORIES.map(([key,label]) => `<button class="filter-btn ${key===active?"active":""}" type="button" data-filter="${key}">${label}</button>`).join("");
  root.querySelectorAll(".filter-btn").forEach(btn => btn.addEventListener("click", () => {
    renderFilters(btn.dataset.filter);
    renderWorks(btn.dataset.filter);
  }));
}

function renderWorks(filter = "all") {
  const root = document.querySelector("#portfolio-grid");
  const list = filter === "all" ? WORKS : WORKS.filter(w => w.category === filter);
  if (!list.length) {
    root.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><p class="eyebrow">PORTFOLIO / CONTENIDO</p><h3>Aún no hay trabajos publicados en esta categoría.</h3><p>Los casos reales se agregarán aquí a medida que Krown PC's los documente.</p></div>`;
    return;
  }
  root.innerHTML = list.map(w => `
    <article class="portfolio-card">
      ${beforeAfter(w)}
      <div class="portfolio-info">
        <p class="eyebrow">PROYECTO #${w.id} / ${w.service}</p>
        <h3>${w.title}</h3>
        <p>${w.description}</p>
        <a class="text-link" href="https://wa.me/569XXXXXXXX?text=${encodeURIComponent(`Hola Krown PC's, quiero consultar por un trabajo similar al proyecto ${w.title}.`)}" target="_blank" rel="noopener noreferrer">Consultar por un trabajo similar →</a>
      </div>
    </article>
  `).join("");
  root.querySelectorAll(".before-after input").forEach(input => input.addEventListener("input", e => {
    e.currentTarget.closest(".before-after").style.setProperty("--split", `${e.currentTarget.value}%`);
  }));
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#year")?.append(String(new Date().getFullYear()));
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  window.addEventListener("scroll", () => header?.classList.toggle("scrolled", window.scrollY > 18), {passive:true});
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  renderFilters();
  renderWorks();
});
