window.Storage = (function () {
  const KEY = "historia.progress.v1";
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }
  function save(p) { localStorage.setItem(KEY, JSON.stringify(p)); }
  function get() { return load(); }
  function set(patch) {
    const p = load();
    Object.assign(p, patch);
    save(p);
    return p;
  }
  function markFlash(topic, idx, knew) {
    const p = load();
    p.flash = p.flash || {};
    p.flash[topic] = p.flash[topic] || {};
    p.flash[topic][idx] = knew ? "good" : "bad";
    save(p);
  }
  function markQuiz(topic, idx, correct) {
    const p = load();
    p.quiz = p.quiz || {};
    p.quiz[topic] = p.quiz[topic] || {};
    p.quiz[topic][idx] = !!correct;
    save(p);
  }
  function reset() { localStorage.removeItem(KEY); }
  function progressPercent() {
    const p = load();
    let total = 0, done = 0;
    ["antiguo","liberales","francesa","colonial"].forEach(t => {
      const data = window.DATA[t];
      if (!data) return;
      total += data.flash.length + data.quiz.length;
      const f = (p.flash && p.flash[t]) || {};
      const q = (p.quiz  && p.quiz[t])  || {};
      done += Object.values(f).filter(v => v === "good").length;
      done += Object.values(q).filter(Boolean).length;
    });
    return total ? Math.round(done * 100 / total) : 0;
  }
  return { get, set, markFlash, markQuiz, reset, progressPercent };
})();
