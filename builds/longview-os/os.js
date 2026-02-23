let highestZ = 10;

function launchApp(name) {
  const content = window[name + "App"]();
  createWindow(name, content);
}

function createWindow(title, content) {
  const win = document.createElement("div");
  win.className = "window";
  win.style.left = 100 + Math.random()*200 + "px";
  win.style.top = 80 + Math.random()*150 + "px";
  win.style.zIndex = highestZ++;

  win.innerHTML = `
    <div class="window-header">
      <div class="traffic-btn red" onclick="closeWindow(this)"></div>
      <div class="traffic-btn yellow" onclick="minimizeWindow(this)"></div>
      <div class="traffic-btn green" onclick="focusWindow(this.closest('.window'))"></div>
      <span style="margin-left:10px;color:white;">${title}</span>
    </div>
    <div class="window-body">${content}</div>
  `;

  makeDraggable(win);
  document.getElementById("desktop").appendChild(win);
}

function closeWindow(btn) {
  btn.closest(".window").remove();
}

function minimizeWindow(btn) {
  btn.closest(".window").style.display = "none";
}

function focusWindow(win) {
  win.style.zIndex = highestZ++;
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