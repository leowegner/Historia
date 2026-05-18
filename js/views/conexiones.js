window.Views = window.Views || {};
window.Views.conexiones = function (_topic, root) {
  const data = window.DATA.conexiones;
  const items = data.items.map(it => {
    const pills = it.from.map(f => `<span class="pill warm">${f}</span>`).join("");
    return `<div class="card conn">
      <div class="from-to">${pills}</div>
      <h3>${it.h}</h3>
      <p>${it.body}</p>
    </div>`;
  }).join("");
  root.innerHTML = `
    <h2 class="section-title">${data.title}</h2>
    <p class="section-lead">${data.lead}</p>
    <div class="connections">${items}</div>
  `;
};
