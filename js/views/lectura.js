window.Views = window.Views || {};
window.Views.lectura = function (topic, root) {
  const data = window.DATA[topic];
  if (!data) { root.innerHTML = "<p>Tema no disponible.</p>"; return; }
  const cards = data.cards.map(c => {
    const list = c.list ? `<ul>${c.list.map(li => `<li>${li}</li>`).join("")}</ul>` : "";
    const body = c.body ? `<p>${c.body}</p>` : "";
    return `<details class="card" open><summary>${c.h}</summary>${body}${list}</details>`;
  }).join("");
  root.innerHTML = `
    <h2 class="section-title">${data.title}</h2>
    <p class="section-lead">${data.lead}</p>
    ${cards}
  `;
};
