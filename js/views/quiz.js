window.Views = window.Views || {};
window.Views.quiz = function (topic, root) {
  const data = window.DATA[topic];
  if (!data || !data.quiz) { root.innerHTML = "<p>Sin quiz.</p>"; return; }

  root.innerHTML = `
    <h2 class="section-title">${data.title} · Quiz</h2>
    <p class="section-lead">Selecciona la respuesta correcta. Verás la explicación tras responder.</p>
    <div id="quiz-list"></div>
    <div id="quiz-score" class="card" style="margin-top:16px;"></div>
  `;
  const list = document.getElementById("quiz-list");
  data.quiz.forEach((q, idx) => {
    const opts = q.opts.map((o, i) =>
      `<button class="opt" data-i="${i}">${o}</button>`
    ).join("");
    const div = document.createElement("div");
    div.className = "quiz-q";
    div.innerHTML = `<div class="q">${idx+1}. ${q.q}</div>${opts}<div class="explain" style="display:none;"></div>`;
    list.appendChild(div);

    const buttons = div.querySelectorAll(".opt");
    const explain = div.querySelector(".explain");
    buttons.forEach(b => {
      b.onclick = () => {
        const pick = parseInt(b.dataset.i, 10);
        const correct = pick === q.correct;
        buttons.forEach((bb, j) => {
          bb.disabled = true;
          if (j === q.correct) bb.classList.add("correct");
          else if (j === pick) bb.classList.add("wrong");
        });
        explain.style.display = "block";
        explain.textContent = (correct ? "✓ Correcto. " : "✗ Incorrecto. ") + (q.explain || "");
        window.Storage.markQuiz(topic, idx, correct);
        updateScore();
        window.App.refreshProgress();
      };
    });
  });

  function updateScore() {
    const p = window.Storage.get();
    const t = (p.quiz && p.quiz[topic]) || {};
    const total = data.quiz.length;
    const ok = Object.values(t).filter(Boolean).length;
    const answered = Object.keys(t).length;
    document.getElementById("quiz-score").innerHTML =
      `<strong>Puntuación:</strong> ${ok} / ${total} (respondidas: ${answered})`;
  }
  updateScore();
};
