(function () {
  const MONTHS_ID = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function toISO(y, m, d) {
    return `${y}-${pad(m + 1)}-${pad(d)}`;
  }

  function formatDisplay(y, m, d) {
    return `${d} ${MONTHS_ID[m]} ${y}`;
  }

  function parseISO(str) {
    if (!str) return null;
    const [y, m, d] = str.split("-").map(Number);
    if (!y || !m || !d) return null;
    return { y, m: m - 1, d };
  }

  function isSameYMD(y1, m1, d1, y2, m2, d2) {
    return y1 === y2 && m1 === m2 && d1 === d2;
  }

  function renderMonthLabel(root, state) {
    root.querySelector("[data-dp-month-label]").textContent =
      `${MONTHS_ID[state.viewMonth]} ${state.viewYear}`;
  }

  function commitSelection(root, state) {
    const hidden = root.querySelector("[data-dp-value]");
    const display = root.querySelector("[data-dp-display]");
    hidden.value = toISO(state.selected.y, state.selected.m, state.selected.d);
    display.textContent = formatDisplay(
      state.selected.y,
      state.selected.m,
      state.selected.d,
    );
    display.classList.remove("text-paper/40");
    display.classList.add("text-paper");
    root.dispatchEvent(
      new CustomEvent("dp-change", { detail: hidden.value, bubbles: true }),
    );
  }

  function clearSelection(root, state, placeholder) {
    state.selected = null;
    const hidden = root.querySelector("[data-dp-value]");
    const display = root.querySelector("[data-dp-display]");
    hidden.value = "";
    display.textContent =
      placeholder || display.dataset.dpPlaceholder || "Pilih tanggal";
    display.classList.remove("text-paper");
    display.classList.add("text-paper/40");
  }

  function openPanel(root) {
    root.querySelector("[data-dp-panel]").classList.remove("hidden");
    root.setAttribute("data-dp-open", "true");
  }

  function closePanel(root) {
    root.querySelector("[data-dp-panel]").classList.add("hidden");
    root.removeAttribute("data-dp-open");
  }

  function togglePanel(root) {
    if (root.hasAttribute("data-dp-open")) closePanel(root);
    else openPanel(root);
  }

  function buildDaysGrid(root, state) {
    const grid = root.querySelector("[data-dp-days]");
    grid.innerHTML = "";

    const firstOfMonth = new Date(state.viewYear, state.viewMonth, 1);
    const startWeekday = firstOfMonth.getDay();
    const daysInMonth = new Date(
      state.viewYear,
      state.viewMonth + 1,
      0,
    ).getDate();
    const daysInPrevMonth = new Date(
      state.viewYear,
      state.viewMonth,
      0,
    ).getDate();
    const today = new Date();
    const totalCells = Math.ceil((startWeekday + daysInMonth) / 7) * 7;

    for (let i = 0; i < totalCells; i++) {
      let y = state.viewYear;
      let m = state.viewMonth;
      let d;
      let outside = false;

      if (i < startWeekday) {
        d = daysInPrevMonth - startWeekday + i + 1;
        m -= 1;
        outside = true;
        if (m < 0) {
          m = 11;
          y -= 1;
        }
      } else if (i >= startWeekday + daysInMonth) {
        d = i - startWeekday - daysInMonth + 1;
        m += 1;
        outside = true;
        if (m > 11) {
          m = 0;
          y += 1;
        }
      } else {
        d = i - startWeekday + 1;
      }

      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = String(d);

      const isToday =
        !outside &&
        isSameYMD(
          y,
          m,
          d,
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
        );
      const isSelected =
        state.selected &&
        isSameYMD(
          y,
          m,
          d,
          state.selected.y,
          state.selected.m,
          state.selected.d,
        );

      let cls =
        "h-8 w-8 rounded-md text-sm font-mono flex items-center justify-center transition-colors ";
      if (isSelected) {
        cls += "bg-accent text-ink font-semibold";
      } else if (outside) {
        cls += "text-paper/30 hover:text-paper/60";
      } else {
        cls += "text-paper hover:bg-accent/20";
        if (isToday) cls += " ring-1 ring-accent/70";
      }
      btn.className = cls;

      btn.addEventListener("click", () => {
        state.selected = { y, m, d };
        state.viewYear = y;
        state.viewMonth = m;
        commitSelection(root, state);
        renderMonthLabel(root, state);
        buildDaysGrid(root, state);
        closePanel(root);
      });

      grid.appendChild(btn);
    }
  }

  const registry = new WeakMap();

  function initOne(root) {
    if (root.dataset.dpInitialized) return;
    root.dataset.dpInitialized = "true";

    const displayEl = root.querySelector("[data-dp-display]");
    if (displayEl && !displayEl.dataset.dpPlaceholder) {
      displayEl.dataset.dpPlaceholder = displayEl.textContent.trim();
    }

    const initialISO = root.querySelector("[data-dp-value]").value;
    const parsed = parseISO(initialISO);
    const today = new Date();

    const state = {
      selected: parsed,
      viewYear: parsed ? parsed.y : today.getFullYear(),
      viewMonth: parsed ? parsed.m : today.getMonth(),
    };

    registry.set(root, state);

    renderMonthLabel(root, state);
    buildDaysGrid(root, state);

    root.querySelector("[data-dp-trigger]").addEventListener("click", (e) => {
      e.stopPropagation();
      if (e.currentTarget.disabled) return;
      togglePanel(root);
    });

    root.querySelector("[data-dp-prev]").addEventListener("click", (e) => {
      e.stopPropagation();
      state.viewMonth -= 1;
      if (state.viewMonth < 0) {
        state.viewMonth = 11;
        state.viewYear -= 1;
      }
      renderMonthLabel(root, state);
      buildDaysGrid(root, state);
    });

    root.querySelector("[data-dp-next]").addEventListener("click", (e) => {
      e.stopPropagation();
      state.viewMonth += 1;
      if (state.viewMonth > 11) {
        state.viewMonth = 0;
        state.viewYear += 1;
      }
      renderMonthLabel(root, state);
      buildDaysGrid(root, state);
    });

    root.addEventListener("click", (e) => e.stopPropagation());
  }

  function initAll(scope) {
    (scope || document).querySelectorAll("[data-datepicker]").forEach(initOne);
  }

  function setDisabled(target, disabled) {
    const root =
      target.matches && target.matches("[data-datepicker]")
        ? target
        : target.querySelector("[data-datepicker]");
    if (!root) return;

    const trigger = root.querySelector("[data-dp-trigger]");
    const hidden = root.querySelector("[data-dp-value]");
    const state = registry.get(root);

    if (!trigger || !hidden) return;

    trigger.disabled = disabled;
    hidden.disabled = disabled;
    root.classList.toggle("opacity-50", disabled);
    root.classList.toggle("pointer-events-none", disabled);

    if (disabled) {
      closePanel(root);
      if (state) {
        clearSelection(root, state);
        buildDaysGrid(root, state);
      }
    }
  }

  document.addEventListener("DOMContentLoaded", () => initAll(document));
  document.addEventListener("click", () => {
    document
      .querySelectorAll("[data-datepicker][data-dp-open]")
      .forEach(closePanel);
  });

  window.DatePicker = { init: initAll, setDisabled };
})();
