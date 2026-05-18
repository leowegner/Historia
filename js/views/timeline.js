window.Views = window.Views || {};
window.Views.timeline = function (topic, root) {
  const data = window.DATA[topic];
  if (!data || !data.timeline) {
    root.innerHTML = "<p>Sin cronología para este tema.</p>";
    return;
  }
  const items = data.timeline.map(it =>
    `<div class="tl-item">
       <div><span class="tl-year">${it.y}</span> <span class="tl-title">${it.t}</span></div>
       <div class="tl-desc">${it.d || ""}</div>
     </div>`
  ).join("");
  root.innerHTML = `
    <h2 class="section-title">${data.title} · Cronología</h2>
    <p class="section-lead">Hitos principales en orden.</p>
    <div class="timeline">${items}</div>
  `;
};
