(function () {
  function bind(input) {
    const counter = document.querySelector(`[data-counter-for="${input.id}"]`);
    if (!counter) return;

    const limit = Number(input.dataset.recommended);

    const update = () => {
      const len = input.value.length;
      counter.textContent = `${len} / ${limit}`;
      counter.dataset.over = String(len > limit);
    };

    input.addEventListener("input", update);
    update();
  }

  function initAll(scope) {
    (scope || document).querySelectorAll("[data-recommended]").forEach(bind);
  }

  document.addEventListener("DOMContentLoaded", () => initAll(document));
  window.CharCounter = { init: initAll };
})();
