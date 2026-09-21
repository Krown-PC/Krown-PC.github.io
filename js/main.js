/**
 * KROWN — comportamiento general del sitio (nav, scroll-spy, FAQ, marquee,
 * botones de WhatsApp contextuales, hero video).
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    initHeaderScroll();
    initMobileNav();
    initScrollSpy();
    initFaq();
    initMarqueePause();
    initWaButtons();
    initReveal();
    initHeroVideo();
    initYear();
  });

  /* Header cambia de fondo al hacer scroll */
  function initHeaderScroll() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Menú móvil */
  function initMobileNav() {
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector(".nav-mobile");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* Resalta el link de nav correspondiente a la sección visible */
  function initScrollSpy() {
    const links = document.querySelectorAll(".nav-desktop a[href^='#'], .nav-mobile a[href^='#']");
    if (!links.length) return;

    const sections = [];
    links.forEach((link) => {
      const id = link.getAttribute("href").slice(1);
      const section = document.getElementById(id);
      if (section) sections.push({ id, section, link });
    });
    if (!sections.length) return;

    const setActive = (id) => {
      links.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sections.find((s) => s.section === entry.target);
            if (match) setActive(match.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s.section));
  }

  /* Acordeón FAQ */
  function initFaq() {
    document.querySelectorAll(".faq-item").forEach((item) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      if (!question || !answer) return;

      question.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");

        // Cierra los demás para mantener la lista compacta
        item.parentElement.querySelectorAll(".faq-item.is-open").forEach((openItem) => {
          if (openItem !== item) {
            openItem.classList.remove("is-open");
            openItem.querySelector(".faq-answer").style.maxHeight = null;
            openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          }
        });

        item.classList.toggle("is-open", !isOpen);
        question.setAttribute("aria-expanded", String(!isOpen));
        answer.style.maxHeight = !isOpen ? answer.scrollHeight + "px" : null;
      });
    });
  }

  /* Pausa el marquee de testimonios al tocar en móvil (touch) */
  function initMarqueePause() {
    document.querySelectorAll(".marquee").forEach((marquee) => {
      const track = marquee.querySelector(".marquee-track");
      if (!track) return;
      marquee.addEventListener("touchstart", () => track.classList.add("is-paused"), { passive: true });
      marquee.addEventListener("touchend", () => {
        setTimeout(() => track.classList.remove("is-paused"), 1200);
      });
    });
  }

  /* Genera hrefs de WhatsApp contextualizados a partir de data-wa-* */
  function initWaButtons() {
    document.querySelectorAll("[data-wa]").forEach((el) => {
      const type = el.getAttribute("data-wa");
      const param = el.getAttribute("data-wa-param") || "";
      let message = "";

      switch (type) {
        case "general":
          message = KROWN_WA_MESSAGES.general;
          break;
        case "cotizarGeneral":
          message = KROWN_WA_MESSAGES.cotizarGeneral;
          break;
        case "servicio":
          message = KROWN_WA_MESSAGES.servicio(param);
          break;
        case "equipoDisponible":
          message = KROWN_WA_MESSAGES.equipoDisponible(param);
          break;
        case "equipoSimilar":
          message = KROWN_WA_MESSAGES.equipoSimilar(param);
          break;
        case "trabajoSimilar":
          message = KROWN_WA_MESSAGES.trabajoSimilar(param);
          break;
        case "diagnostico":
          message = KROWN_WA_MESSAGES.diagnostico;
          break;
        case "testing":
          message = KROWN_WA_MESSAGES.testing;
          break;
        default:
          message = KROWN_WA_MESSAGES.general;
      }

      el.setAttribute("href", krownWaLink(message));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }

  /* Aparición sutil de secciones al hacer scroll */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );

    items.forEach((el) => observer.observe(el));

    // Red de seguridad: si por cualquier motivo el observer no llega a
    // disparar para algún elemento (recorte de altura, timing del navegador,
    // captura automatizada, etc.), nunca debe quedar contenido invisible.
    window.setTimeout(() => {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
        el.classList.add("is-visible");
      });
    }, 2000);
  }

  /* Respeta prefers-reduced-motion pausando el video del Hero */
  function initHeroVideo() {
    const video = document.querySelector(".hero-media video");
    if (!video) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      video.pause();
      video.removeAttribute("autoplay");
    }
  }

  function initYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }
})();
