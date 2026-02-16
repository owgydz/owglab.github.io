function taskmanagerApp() {
  return `
    <ul>
      ${windows.map(w =>
        `<li>${w.dataset.title}
          <button onclick="forceClose('${w.dataset.title}')">Kill</button>
        </li>`
      ).join("")}
    </ul>
  `;
}

function forceClose(title) {
  const win = windows.find(w => w.dataset.title === title);
  if (win) {
    win.remove();
    windows = windows.filter(w => w !== win);
  }
}
