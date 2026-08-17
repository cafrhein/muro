(() => {
  const cards = document.querySelectorAll("[data-expiry]");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  cards.forEach((card) => {
    const status = card.querySelector("[data-validity-status]");
    const expiry = new Date(`${card.dataset.expiry}T23:59:59`);
    const isValid = !Number.isNaN(expiry.getTime()) && expiry >= today;

    if (!status) return;

    status.textContent = isValid ? "Vigente" : "Vencida";
    status.classList.toggle("is-valid", isValid);
    status.classList.toggle("is-expired", !isValid);
    status.setAttribute(
      "aria-label",
      isValid ? "La credencial se encuentra vigente" : "La credencial se encuentra vencida"
    );
  });
})();
