(() => {
  const menuButton = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-main-nav]");

  if (menuButton && menu) {
    const closeMenu = () => {
      menu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    };
    menuButton.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
    menu.addEventListener("click", closeMenu);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  const lessons = [
    ["01", "Definir el problema", "Distinguir causas, efectos y síntomas."],
    ["02", "Imaginar el futuro", "Narrar el cambio antes de diseñar la solución."],
    ["03", "Marcar la cancha", "Leer restricciones y oportunidades del entorno."],
    ["04", "Idear soluciones", "Abrir alternativas y revisar sesgos del equipo."],
    ["05", "Trazar la ruta", "Convertir el proyecto en una cadena de valor."],
    ["06", "Encontrar el eslabón", "Unir acciones, resultados e impacto esperado."],
    ["07", "Diseñar la medición", "Construir metas SMART e indicadores útiles."],
    ["08", "Pensar dentro de la caja", "Alinear ambición, capacidad y recursos reales."],
    ["09", "Evaluar y decidir", "Usar evidencia, contrafactuales y rediseño."],
    ["10", "Escalar", "Expandir impacto sin perder aprendizaje local."]
  ];

  const card = document.querySelector("[data-learning-card]");
  if (card) {
    const count = card.querySelector("[data-progress-count]");
    const bar = card.querySelector("[data-progress-bar]");
    const number = card.querySelector("[data-lesson-number]");
    const title = card.querySelector("[data-lesson-title]");
    const note = card.querySelector("[data-lesson-note]");
    const next = card.querySelector("[data-next-lesson]");
    const time = card.querySelector("[data-lesson-time]");
    const button = card.querySelector("[data-advance-lesson]");
    let completed = Math.min(10, Math.max(0, Number(localStorage.getItem("mig-progress")) || 0));

    const render = () => {
      const lesson = lessons[Math.min(completed, lessons.length - 1)];
      count.textContent = completed + "/10";
      bar.style.width = completed * 10 + "%";
      number.textContent = lesson[0];
      title.textContent = completed === 10 ? "Ruta completada" : lesson[1];
      note.textContent = completed === 10
        ? "Ya conoces el ciclo completo. El siguiente paso es llevarlo a tu organización."
        : lesson[2];
      button.disabled = completed === 10;
      button.firstChild.textContent = completed === 10 ? "Recorrido completo " : "Marcar y continuar ";
      next.textContent = completed === 10
        ? "Siguiente · Diagnóstico de madurez"
        : "Después · " + lessons[Math.min(completed + 1, 9)][1];
      time.textContent = completed === 10 ? "5 niveles" : "6 min";
    };

    button.addEventListener("click", () => {
      completed = Math.min(10, completed + 1);
      localStorage.setItem("mig-progress", String(completed));
      render();
    });
    render();
  }

  const classroom = document.querySelector("[data-classroom]");
  if (classroom) {
    const tabs = [...classroom.querySelectorAll("[data-module-tab]")];
    const panels = [...classroom.querySelectorAll("[data-module-panel]")];
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.moduleTab;
        tabs.forEach((item) => {
          const active = item === tab;
          item.classList.toggle("active", active);
          item.setAttribute("aria-selected", String(active));
        });
        panels.forEach((panel) => {
          const active = panel.dataset.modulePanel === target;
          panel.classList.toggle("active", active);
          panel.hidden = !active;
        });
      });
    });
  }

  const readingProgress = document.querySelector("[data-reading-progress]");
  if (readingProgress) {
    const updateProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const amount = total > 0 ? (window.scrollY / total) * 100 : 0;
      readingProgress.style.width = Math.min(100, Math.max(0, amount)) + "%";
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }
})();
