(() => {
  const monthIndexes = {
    ene: 0,
    feb: 1,
    mar: 2,
    abr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    ago: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dic: 11
  };

  const parseVisibleExpiry = (element) => {
    if (!element) return null;

    const normalized = element.textContent
      .trim()
      .toLocaleLowerCase("es-MX")
      .normalize("NFD")
      .replace(/[\u0300-\u036f.]/g, "");
    const match = normalized.match(/([a-z]+)\s+(\d{4})/);

    if (!match) return null;

    const month = monthIndexes[match[1].slice(0, 3)];
    const year = Number(match[2]);

    if (month === undefined || !Number.isInteger(year)) return null;

    return new Date(year, month + 1, 0, 23, 59, 59, 999);
  };

  const parseSemanticExpiry = (element) => {
    const value = element?.getAttribute("datetime") || "";
    const match = value.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);

    if (!match) return null;

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = match[3] ? Number(match[3]) : new Date(year, month, 0).getDate();
    const expiry = new Date(year, month - 1, day, 23, 59, 59, 999);

    return Number.isNaN(expiry.getTime()) ? null : expiry;
  };

  const cards = document.querySelectorAll(".credential-card");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  cards.forEach((card) => {
    const status = card.querySelector("[data-validity-status]");
    const expiryElement = card.querySelector(".credential-expiry");
    const expiry = parseVisibleExpiry(expiryElement) || parseSemanticExpiry(expiryElement);

    if (!status || !expiry) return;

    const isValid = expiry >= today;
    expiryElement.setAttribute(
      "datetime",
      `${expiry.getFullYear()}-${String(expiry.getMonth() + 1).padStart(2, "0")}`
    );

    status.textContent = isValid ? "Vigente" : "Vencida";
    status.classList.toggle("is-valid", isValid);
    status.classList.toggle("is-expired", !isValid);
    status.setAttribute(
      "aria-label",
      isValid ? "La credencial se encuentra vigente" : "La credencial se encuentra vencida"
    );
  });
})();
