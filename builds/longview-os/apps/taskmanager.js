function taskmanagerApp() {
  return `
    <div id="taskList"></div>
  `;
}

function updateTaskManager() {
  const taskWindow = windows.find(w => w.dataset.title === "taskmanager");
  if (!taskWindow) return;

  const container = taskWindow.querySelector("#taskList");
  container.innerHTML = "";

  windows.forEach(win => {
    const div = document.createElement("div");
    div.innerHTML = `
      ${win.dataset.title}
      <button onclick="forceClose('${win.dataset.title}')">Kill</button>
    `;
    container.appendChild(div);
  });
}

function forceClose(title) {
  const win = windows.find(w => w.dataset.title === title);
  if (!win) return;

  win.remove();
  windows = windows.filter(w => w !== win);
  updateTaskManager();
}
