function saveState() {
  const state = windows.map(w => ({
    title: w.dataset.title,
    left: w.style.left,
    top: w.style.top
  }));

  localStorage.setItem("miniOSState", JSON.stringify(state));
}

function loadState() {
  const saved = JSON.parse(localStorage.getItem("miniOSState"));
  if (!saved) return;

  saved.forEach(s => {
    launchApp(s.title);
  });
}

document.addEventListener("DOMContentLoaded", loadState);
