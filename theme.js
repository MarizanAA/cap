(() => {
  const storageKey = "cap-lab-theme";
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem(storageKey);
  } catch {
    // If storage is unavailable, use the device preference for this visit.
  }

  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#101516" : "#ffffff");
    const button = document.getElementById("theme-toggle");
    if (button) {
      const nextTheme = theme === "dark" ? "claro" : "oscuro";
      button.setAttribute("aria-label", `Cambiar a tema ${nextTheme}`);
      button.title = `Cambiar a tema ${nextTheme}`;
    }
  };

  applyTheme(savedTheme === "dark" || savedTheme === "light"
    ? savedTheme
    : (systemTheme.matches ? "dark" : "light"));

  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("theme-toggle");
    if (!button) return;

    button.addEventListener("click", () => {
      const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      savedTheme = theme;
      applyTheme(theme);
      try {
        localStorage.setItem(storageKey, theme);
      } catch {
        // The selected theme remains active until this page is closed.
      }
    });

    systemTheme.addEventListener("change", (event) => {
      if (!savedTheme) applyTheme(event.matches ? "dark" : "light");
    });
  });
})();
