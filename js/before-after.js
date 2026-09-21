/**
 * KROWN — Slider Antes/Después
 * Componente reutilizable, sin dependencias. Funciona con mouse, touch y teclado.
 * Uso: agregar data-ba-slider a un contenedor .ba-slider con la estructura
 * definida en index.html / trabajos.html. Se inicializa automáticamente.
 */
(function () {
  "use strict";

  function initSlider(root) {
    const handle = root.querySelector(".ba-handle");
    const beforeWrap = root.querySelector(".ba-before-wrap");
    if (!handle || !beforeWrap) return;

    let dragging = false;
    let rect = null;

    function setPosition(percent) {
      const clamped = Math.min(100, Math.max(0, percent));
      beforeWrap.style.width = clamped + "%";
      handle.style.left = clamped + "%";
      root.style.setProperty("--ba-img-w", (10000 / clamped).toFixed(2) + "%");
      // Evita división por 0 cuando el slider está casi en el borde izquierdo
      if (clamped < 1) {
        root.style.setProperty("--ba-img-w", "10000%");
      }
      handle.setAttribute("aria-valuenow", Math.round(clamped));
    }

    function percentFromClientX(clientX) {
      rect = root.getBoundingClientRect();
      const x = clientX - rect.left;
      return (x / rect.width) * 100;
    }

    function onMove(clientX) {
      setPosition(percentFromClientX(clientX));
    }

    // Mouse
    handle.addEventListener("mousedown", (e) => {
      dragging = true;
      e.preventDefault();
    });
    root.addEventListener("mousedown", (e) => {
      // Permite iniciar el arrastre haciendo click en cualquier parte del slider
      dragging = true;
      onMove(e.clientX);
    });
    window.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      onMove(e.clientX);
    });
    window.addEventListener("mouseup", () => {
      dragging = false;
    });

    // Touch
    root.addEventListener(
      "touchstart",
      (e) => {
        dragging = true;
        onMove(e.touches[0].clientX);
      },
      { passive: true }
    );
    root.addEventListener(
      "touchmove",
      (e) => {
        if (!dragging) return;
        onMove(e.touches[0].clientX);
      },
      { passive: true }
    );
    root.addEventListener("touchend", () => {
      dragging = false;
    });

    // Teclado (accesibilidad)
    handle.setAttribute("tabindex", "0");
    handle.setAttribute("role", "slider");
    handle.setAttribute("aria-label", "Comparar antes y después");
    handle.setAttribute("aria-valuemin", "0");
    handle.setAttribute("aria-valuemax", "100");
    handle.addEventListener("keydown", (e) => {
      const current = parseFloat(beforeWrap.style.width) || 50;
      if (e.key === "ArrowLeft") {
        setPosition(current - 5);
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        setPosition(current + 5);
        e.preventDefault();
      }
    });

    setPosition(50);
  }

  function init() {
    document.querySelectorAll(".ba-slider").forEach(initSlider);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expuesto por si trabajos.html necesita re-inicializar sliders
  // renderizados dinámicamente después de un filtro.
  window.KrownBeforeAfter = { init, initSlider };
})();
