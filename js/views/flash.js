window.Views = window.Views || {};
window.Views.flash = function (topic, root) {
  const data = window.DATA[topic];
  if (!data || !data.flash) { root.innerHTML = "<p>Sin flashcards.</p>"; return; }
  const cards = data.flash;
  let i = 0;

  function render() {
    const c = cards[i];
    root.innerHTML = `
      <h2 class="section-title">${data.title} · Flashcards</h2>
      <p class="section-lead">Pulsa la tarjeta para girarla. Marca si la sabías o no.</p>
      <div class="flash-wrap">
        <div class="flash" id="flash">
          <div class="flash-inner">
            <div class="flash-face">${c.q}</div>
            <div class="flash-face flash-back">${c.a}</div>
          </div>
        </div>
        <div class="flash-meta">Tarjeta ${i+1} / ${cards.length}</div>
        <div class="flash-controls">
          <button class="bad"  id="bad">No la sabía</button>
          <button class="good" id="good">La sabía</button>
        </div>
        <div class="flash-controls">
          <button id="prev">← Anterior</button>
          <button id="next">Siguiente →</button>
        </div>
      </div>
    `;
    const el = document.getElementById("flash");
    el.onclick = () => el.classList.toggle("flipped");
    document.getElementById("good").onclick = () => { window.Storage.markFlash(topic, i, true); next(); };
    document.getElementById("bad").onclick  = () => { window.Storage.markFlash(topic, i, false); next(); };
    document.getElementById("prev").onclick = () => { i = (i - 1 + cards.length) % cards.length; render(); };
    document.getElementById("next").onclick = next;
  }
  function next() { i = (i + 1) % cards.length; render(); window.App.refreshProgress(); }
  render();
};
