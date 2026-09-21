/**
 * KROWN — render + acordeón de la sección FAQ (index.html)
 * Lee js/faq-data.js y genera la lista completa; el acordeón se wirea
 * apenas se renderiza (sin depender de main.js).
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("faq-list");
    if (!list || typeof KROWN_FAQ === "undefined") return;

    list.innerHTML = KROWN_FAQ.map(
      (item, i) => `
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${i}" id="faq-question-${i}">
          ${item.pregunta}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <div class="faq-answer" id="faq-answer-${i}" role="region" aria-labelledby="faq-question-${i}">
          <div class="faq-answer-inner">${item.respuesta}</div>
        </div>
      </div>`
    ).join("");

    list.querySelectorAll(".faq-item").forEach((item) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");

      question.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");

        list.querySelectorAll(".faq-item.is-open").forEach((openItem) => {
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
  });
})();
