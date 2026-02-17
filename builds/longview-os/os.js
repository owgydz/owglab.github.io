let highestZ = 10;
let windows = [];

function launchApp(appName) {
  const content = window[appName + "App"]();
  createWindow(appName, content);
}

function createWindow(title, content) {
  const win = document.createElement("div");
  win.className = "window";
  win.dataset.title = title;
  win.style.left = 100 + Math.random() * 100 + "px";
  win.style.top = 80 + Math.random() * 80 + "px";
  win.style.zIndex = highestZ++;

  win.innerHTML = `
    <div class="window-header">
      <span>${title}</span>
      <div>
        <button onclick="minimizeWindow(this)">_</button>
        <button onclick="closeWindow(this)">X</button>
      </div>
    </div>
    <div class="window-body">${content}</div>
  `;

  makeDraggable(win);
  focusWindow(win);

  document.getElementById("desktop").appendChild(win);
  windows.push(win);

  updateTaskManager();
}

function focusWindow(win) {
  win.style.zIndex = highestZ++;
}

function closeWindow(btn) {
  const win = btn.closest(".window");
  win.remove();
  windows = windows.filter(w => w !== win);
  updateTaskManager();
}

function minimizeWindow(btn) {
  const win = btn.closest(".window");
  win.style.display = "none";
  updateTaskManager();
}

function restoreWindow(win) {
  win.style.display = "block";
  focusWindow(win);
}

function makeDraggable(win) {
  const header = win.querySelector(".window-header");

  header.onmousedown = function(e) {
    focusWindow(win);
    const offsetX = e.clientX - win.offsetLeft;
    const offsetY = e.clientY - win.offsetTop;

    document.onmousemove = function(e) {
      win.style.left = e.clientX - offsetX + "px";
      win.style.top = e.clientY - offsetY + "px";
    };

    document.onmouseup = function() {
      document.onmousemove = null;
    };
  };
}
