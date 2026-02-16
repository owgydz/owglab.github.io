let highestZ = 1;
let windows = [];
let minimized = [];

function toggleAppMenu() {
  document.getElementById("app-menu").classList.toggle("hidden");
}

function launchApp(appName) {
  const content = window[appName + "App"]();
  createWindow(appName, content);
}

function createWindow(title, content) {
  const win = document.createElement("div");
  win.className = "window";
  win.dataset.title = title;
  win.style.left = Math.random() * 200 + "px";
  win.style.top = Math.random() * 150 + "px";
  win.style.zIndex = highestZ++;

  win.innerHTML = `
    <div class="window-header">
      <span>${title}</span>
      <span>
        <button onclick="minimizeWindow(this)">_</button>
        <button onclick="closeWindow(this)">X</button>
      </span>
    </div>
    <div class="window-body">${content}</div>
  `;

  makeDraggable(win);
  document.getElementById("desktop").appendChild(win);
  windows.push(win);
  saveState();
}

function closeWindow(btn) {
  const win = btn.closest(".window");
  windows = windows.filter(w => w !== win);
  win.remove();
  saveState();
}

function minimizeWindow(btn) {
  const win = btn.closest(".window");
  win.style.display = "none";
  minimized.push(win);
  updateTray();
  saveState();
}

function restoreWindow(index) {
  const win = minimized[index];
  win.style.display = "block";
  minimized.splice(index, 1);
  updateTray();
}

function updateTray() {
  const tray = document.getElementById("minimized-tray");
  tray.innerHTML = "";
  minimized.forEach((w, i) => {
    const btn = document.createElement("button");
    btn.textContent = w.dataset.title;
    btn.onclick = () => restoreWindow(i);
    tray.appendChild(btn);
  });
}

function makeDraggable(win) {
  const header = win.querySelector(".window-header");

  header.onmousedown = function(e) {
    let offsetX = e.clientX - win.offsetLeft;
    let offsetY = e.clientY - win.offsetTop;

    document.onmousemove = function(e) {
      win.style.left = e.clientX - offsetX + "px";
      win.style.top = e.clientY - offsetY + "px";
    };

    document.onmouseup = function() {
      document.onmousemove = null;
    };
  };
}
