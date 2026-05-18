window.App = (function () {
  const state = { view: "antiguo", mode: "lectura" };
  const content = document.getElementById("content");
  const tabs = document.querySelectorAll(".tab");
  const modes = document.querySelectorAll(".mode-btn");
  const progressEl = document.getElementById("progress");

  function render() {
    if (state.view === "conexiones") {
      window.Views.conexiones(null, content);
    } else {
      const fn = window.Views[state.mode];
      if (fn) fn(state.view, content);
    }
    tabs.forEach(t => t.classList.toggle("active", t.dataset.view === state.view));
    modes.forEach(m => {
      m.classList.toggle("active", m.dataset.mode === state.mode);
      m.disabled = state.view === "conexiones";
      m.style.opacity = state.view === "conexiones" ? 0.4 : 1;
    });
    refreshProgress();
  }

  function refreshProgress() {
    progressEl.textContent = window.Storage.progressPercent();
  }

  tabs.forEach(t => t.onclick = () => { state.view = t.dataset.view; render(); });
  modes.forEach(m => m.onclick = () => {
    if (state.view === "conexiones") return;
    state.mode = m.dataset.mode; render();
  });
  document.getElementById("reset").onclick = () => {
    if (confirm("¿Reiniciar tu progreso?")) { window.Storage.reset(); render(); }
  };

  render();
  return { refreshProgress };
})();
